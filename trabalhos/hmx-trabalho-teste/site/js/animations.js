/* Interações da página. Os dados da pousada ficam em js/config.js. */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Dados da pousada (js/config.js) ----------
   Roda antes de tudo: preenche textos e links a partir do config e monta
   as partes repetidas da pagina (opcoes de quarto, colunas dos numeros)
   antes que carrossel e formularios comecem a ler o HTML.

   O HTML ja vem com os mesmos valores escritos, como reserva. Se o config
   faltar ou um campo estiver vazio, a pagina fica com o que esta escrito
   nela em vez de mostrar buraco. */
const POUSADA = window.POUSADA || {};

/* le "whatsapp.exibicao" dentro do config; devolve undefined se faltar */
const dadoDaPousada = (caminho) =>
  caminho.split('.').reduce((obj, chave) => (obj == null ? undefined : obj[chave]), POUSADA);

/* campos montados a partir de outros */
const DADOS_DERIVADOS = {
  cidadeUf: () => (POUSADA.cidade && POUSADA.uf ? `${POUSADA.cidade} · ${POUSADA.uf}` : undefined),
  ano: () => String(new Date().getFullYear()),
};

const linkWhatsApp = (mensagem) => {
  const numero = dadoDaPousada('whatsapp.numero');
  if (!numero) return null;
  const texto = mensagem || dadoDaPousada('whatsapp.mensagem') || '';
  return `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
};

const buscaDoMapa = () => dadoDaPousada('mapa.busca') || POUSADA.endereco;

const LINKS_DA_POUSADA = {
  whatsapp: (el) => linkWhatsApp(el.dataset.mensagem),
  telefone: () => (dadoDaPousada('telefone.numero') ? `tel:${dadoDaPousada('telefone.numero')}` : null),
  email: () => (POUSADA.email ? `mailto:${POUSADA.email}` : null),
  mapa: () => (buscaDoMapa()
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(buscaDoMapa())}`
    : null),
  rota: () => (buscaDoMapa()
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(buscaDoMapa())}`
    : null),
  instagram: () => dadoDaPousada('redes.instagram'),
  facebook: () => dadoDaPousada('redes.facebook'),
  avaliacoes: () => dadoDaPousada('avaliacoes.link'),
};

/* links que so existem se o dado existir: sem endereco, somem */
const LINKS_OPCIONAIS = ['instagram', 'facebook', 'avaliacoes'];

const aplicarDadosDaPousada = () => {
  document.querySelectorAll('[data-pousada]').forEach((el) => {
    const chave = el.dataset.pousada;
    const valor = DADOS_DERIVADOS[chave] ? DADOS_DERIVADOS[chave]() : dadoDaPousada(chave);
    if (typeof valor === 'string' || typeof valor === 'number') el.textContent = valor;
  });

  if (POUSADA.nome) {
    document.querySelectorAll('[data-pousada-aria]').forEach((el) => {
      el.setAttribute('aria-label', el.dataset.pousadaAria.replace('{nome}', POUSADA.nome));
    });
  }

  document.querySelectorAll('[data-link]').forEach((el) => {
    const montar = LINKS_DA_POUSADA[el.dataset.link];
    if (!montar) return;
    const href = montar(el);
    if (href) {
      el.href = href;
      el.hidden = false;
    } else if (LINKS_OPCIONAIS.includes(el.dataset.link)) {
      el.hidden = true;
    }
  });

  const mapa = document.querySelector('iframe[data-mapa]');
  if (mapa && buscaDoMapa()) {
    const zoom = Number(dadoDaPousada('mapa.zoom')) || 15;
    mapa.src = `https://www.google.com/maps?q=${encodeURIComponent(buscaDoMapa())}&z=${zoom}&output=embed`;
  }

  /* logo em imagem do cliente, quando houver: substitui simbolo + texto */
  const imagemDoLogo = dadoDaPousada('logo.imagem');
  if (imagemDoLogo) {
    document.querySelectorAll('[data-logo]').forEach((logo) => {
      const img = document.createElement('img');
      img.className = 'logo-imagem';
      img.src = imagemDoLogo;
      img.alt = POUSADA.nome || '';
      img.decoding = 'async';
      logo.replaceChildren(img);
    });
  }
};

/* As suites sao escritas uma vez so, nos cartoes da secao Acomodacoes. Daqui
   saem as opcoes dos dois formularios e o quarto que cada "Reservar agora"
   de cartao escolhe: renomear, acrescentar ou tirar uma suite e mexer num
   lugar so. */
/* Preco por noite de cada suite, lido do proprio cartao ("R$ 1.250" vira
   1250). Suite "Sob consulta" fica fora, e o resumo mostra so as noites. */
const PRECO_POR_QUARTO = new Map();

const montarOpcoesDeQuarto = () => {
  const cartoes = Array.from(document.querySelectorAll('#quartos [data-carrossel-slide]'));
  const nomes = cartoes
    .map((cartao) => {
      const nome = (cartao.dataset.nome || cartao.querySelector('h3')?.textContent || '').trim();
      cartao.querySelectorAll('[data-ir-reserva]').forEach((botao) => { botao.dataset.quarto = nome; });
      const preco = (cartao.querySelector('.quarto-preco strong')?.textContent || '')
        .split(',')[0]
        .replace(/\D/g, '');
      if (nome && preco) PRECO_POR_QUARTO.set(nome, Number(preco));
      return nome;
    })
    .filter(Boolean);
  if (!nomes.length) return;

  document.querySelectorAll('select[data-quartos-select]').forEach((campo) => {
    const opcoes = campo.dataset.quartosSelect === 'todos' ? ['Todos', ...nomes] : nomes;
    campo.replaceChildren(...opcoes.map((nome) => new Option(nome, nome)));
  });
};

/* Numeros da casa: o HTML traz uma coluna com os quatro numeros. Aqui ela
   ganha a repeticao do primeiro (que fecha o laco da animacao sem corte) e
   vira quatro colunas; o atraso de cada uma esta no CSS. So a primeira e
   lida pelo leitor de tela, as copias sao decoracao. */
const montarNumeros = () => {
  const grade = document.querySelector('[data-stats]');
  const coluna = grade?.querySelector('.stat-slot');
  const faixa = coluna?.querySelector('.stat-reel');
  if (!faixa || grade.querySelectorAll('.stat-slot').length > 1) return;

  const cartoes = faixa.querySelectorAll('.stat-card');
  if (!cartoes.length) return;
  const repeticao = cartoes[0].cloneNode(true);
  repeticao.setAttribute('aria-hidden', 'true');
  faixa.appendChild(repeticao);

  for (let i = 1; i < 4; i += 1) {
    const copia = coluna.cloneNode(true);
    copia.setAttribute('aria-hidden', 'true');
    grade.appendChild(copia);
  }
};

/* ---------- Datas da reserva ----------
   Os campos ja abrem preenchidos, como o de hospedes ja abre com "1
   hospede": check-in no dia em que a pessoa entrou no site e check-out no
   dia seguinte (uma noite). Datas passadas ficam bloqueadas, e o check-out
   nunca fica antes do check-in: se a pessoa empurra o check-in para depois
   dele, o check-out anda junto.

   Tudo em data local do aparelho, nao UTC, senao a noite viraria o dia
   seguinte. Campo que ja tem valor valido nao e tocado. */
const doisDigitos = (n) => String(n).padStart(2, '0');
const dataISO = (d) => `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}`;
const somarDias = (iso, dias) => {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return dataISO(new Date(ano, mes - 1, dia + dias));
};
const noitesEntre = (entrada, saida) => {
  if (!entrada || !saida) return 0;
  const [a1, m1, d1] = entrada.split('-').map(Number);
  const [a2, m2, d2] = saida.split('-').map(Number);
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86400000);
};
const formatarReais = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

/* noites e valor estimado do formulario completo, a partir das datas e do
   preco da suite escolhida */
const resumoDaReserva = () => {
  const form = document.querySelector('#formReserva');
  if (!form) return null;
  const noites = noitesEntre(form.elements.checkin?.value, form.elements.checkout?.value);
  const quarto = form.elements.quarto?.value || '';
  const preco = PRECO_POR_QUARTO.get(quarto);
  return { noites, quarto, total: preco && noites > 0 ? preco * noites : null };
};

const atualizarResumoDaReserva = () => {
  const alvo = document.querySelector('[data-resumo-reserva]');
  const resumo = resumoDaReserva();
  if (!alvo || !resumo) return;
  if (resumo.noites < 1) { alvo.hidden = true; return; }

  const noites = `${resumo.noites} ${resumo.noites === 1 ? 'noite' : 'noites'}`;
  const linha = document.createElement('strong');
  linha.textContent = resumo.total ? `${noites} · a partir de ${formatarReais(resumo.total)}` : noites;
  const partes = [linha];
  if (resumo.total) {
    const obs = document.createElement('small');
    obs.textContent = `${resumo.quarto}. Valor estimado, confirmado pela pousada no WhatsApp.`;
    partes.push(obs);
  }
  alvo.replaceChildren(...partes);
  alvo.hidden = false;
};

const prepararDatas = () => {
  const hoje = dataISO(new Date());
  document.querySelectorAll('#formReservaRapida, #formReserva').forEach((form) => {
    const entrada = form.elements.checkin;
    const saida = form.elements.checkout;
    if (!entrada || !saida) return;

    entrada.min = hoje;
    if (!entrada.value || entrada.value < hoje) entrada.value = hoje;

    const ajustarSaida = () => {
      const minimo = somarDias(entrada.value || hoje, 1);
      saida.min = minimo;
      if (!saida.value || saida.value < minimo) saida.value = minimo;
    };
    ajustarSaida();

    entrada.addEventListener('change', () => { ajustarSaida(); atualizarResumoDaReserva(); });
    saida.addEventListener('change', atualizarResumoDaReserva);
  });

  document.querySelector('#formReserva')?.elements.quarto?.addEventListener('change', atualizarResumoDaReserva);
  atualizarResumoDaReserva();
};

aplicarDadosDaPousada();
montarOpcoesDeQuarto();
montarNumeros();
prepararDatas();

/* ---------- Header: transparente sobre o hero, sólido ao rolar ---------- */
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const hero = document.querySelector('.hero');

  /* Duas coisas de uma vez:
     - is-scrolled: a barra vira pilula de vidro depois dos primeiros 40px;
     - esta-no-hero: enquanto a pilula estiver por cima da foto do hero, o
       menu fica branco e o vidro fica quase invisivel. Sem isto a pelicula
       teria de ser opaca para o texto escuro ler sobre a foto. */
  const syncHeader = () => {
    const y = window.scrollY;
    siteHeader.classList.toggle('is-scrolled', y > 40);
    const limite = hero ? hero.offsetHeight - siteHeader.offsetHeight - 20 : 0;
    siteHeader.classList.toggle('esta-no-hero', y < limite);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
  window.addEventListener('resize', syncHeader, { passive: true });
}

/* ---------- Parallax do hero ----------
   A foto sobe mais devagar que o texto enquanto a pagina rola.
   Escreve numa custom property para nao brigar com o zoom, que e outra camada. */
const heroMedia = document.querySelector(".hero-media");
const heroSection = document.querySelector(".hero");

if (heroMedia && heroSection) {
  const FATOR = 0.28;          // quanto a foto fica para tras do scroll
  let ticking = false;
  let ultimoValor = -1;

  const aplicar = () => {
    ticking = false;
    if (prefersReducedMotion.matches) {
      heroMedia.style.setProperty("--parallax", "0px");
      ultimoValor = 0;
      return;
    }
    const y = window.scrollY;
    const altura = heroSection.offsetHeight;
    if (y > altura) return;                       // hero ja saiu da tela
    const deslocamento = Math.round(y * FATOR);
    if (deslocamento === ultimoValor) return;     // nada mudou, nao escreve
    ultimoValor = deslocamento;
    heroMedia.style.setProperty("--parallax", deslocamento + "px");
  };

  const aoRolar = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(aplicar);
    }
  };

  window.addEventListener("scroll", aoRolar, { passive: true });
  window.addEventListener("resize", aoRolar, { passive: true });
  aplicar();

  // ligar ou desligar o movimento no sistema vale na hora
  prefersReducedMotion.addEventListener("change", aplicar);
}

/* ---------- Ambientacao do fundo ----------
   Escreve uma unica custom property (--amb, de 0 a 1) com o quanto da pagina
   ja foi percorrido. Quem desloca as manchas e o CSS, via transform — o JS
   nao toca em estilo de elemento nenhum.

   Fracao em vez de pixels: numa pagina de 8000px, um fator sobre o scroll
   arrastaria as manchas para fora da tela; com a fracao o curso total e
   sempre o mesmo. */
const ambiente = document.querySelector("#ambiente");

if (ambiente) {
  let pendente = false;
  let ultimo = -1;

  const aplicarAmbiente = () => {
    pendente = false;
    /* a preferencia e consultada aqui, a cada quadro, em vez de decidir
       uma vez no inicio: assim ligar ou desligar o movimento no sistema
       vale na hora, sem precisar recarregar */
    if (prefersReducedMotion.matches) {
      ambiente.style.setProperty("--amb", "0");
      ultimo = 0;
      return;
    }
    const curso = document.documentElement.scrollHeight - window.innerHeight;
    if (curso <= 0) return;
    // duas casas bastam: escrever menos vezes e escrever menos trabalho
    const p = Math.round((window.scrollY / curso) * 100) / 100;
    if (p === ultimo) return;
    ultimo = p;
    ambiente.style.setProperty("--amb", String(p));
  };

  const aoRolarAmbiente = () => {
    if (!pendente) {
      pendente = true;
      requestAnimationFrame(aplicarAmbiente);
    }
  };

  window.addEventListener("scroll", aoRolarAmbiente, { passive: true });
  window.addEventListener("resize", aoRolarAmbiente, { passive: true });
  aplicarAmbiente();

  prefersReducedMotion.addEventListener("change", aplicarAmbiente);
}

/* ---------- Menu mobile ---------- */
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Revelação das seções ao entrar na tela ---------- */
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}


/* ---------- Fotos em tela cheia ----------
   Um <dialog> so para a pagina inteira. Quem abre passa a lista de fotos
   ({ src, alt }) e por qual comecar: a galeria passa as dez cartas, cada
   suite passa as fotos do proprio <template data-fotos>.

   <dialog> nativo porque ja resolve o que um modal precisa: prende o foco,
   fecha no Esc e devolve o foco a quem abriu. Setas do teclado e arraste
   para o lado trocam a foto; clique no fundo escuro fecha. */
const lightbox = (() => {
  const dialogo = document.querySelector('[data-lightbox]');
  if (!dialogo || typeof dialogo.showModal !== 'function') return null;

  const img = dialogo.querySelector('[data-lightbox-img]');
  const legenda = dialogo.querySelector('[data-lightbox-legenda]');
  const contador = dialogo.querySelector('[data-lightbox-contador]');
  const palco = dialogo.querySelector('[data-lightbox-palco]');
  const setas = dialogo.querySelectorAll('[data-lightbox-anterior], [data-lightbox-proxima]');
  let fotos = [];
  let atual = 0;

  const mostrar = (i) => {
    atual = ((i % fotos.length) + fotos.length) % fotos.length;
    const foto = fotos[atual];
    if (img.getAttribute('src') !== foto.src) {
      img.classList.add('carregando');
      img.src = foto.src;
    }
    img.alt = foto.alt || '';
    legenda.textContent = foto.legenda || foto.alt || '';
    contador.textContent = fotos.length > 1 ? `${atual + 1} de ${fotos.length}` : '';
    setas.forEach((seta) => { seta.hidden = fotos.length < 2; });
  };

  img.addEventListener('load', () => img.classList.remove('carregando'));
  img.addEventListener('error', () => img.classList.remove('carregando'));

  /* a pagina volta a rolar no mesmo instante em que a janela fecha. O
     evento "close" do navegador chega depois, numa tarefa propria; ele
     continua ouvido abaixo para o Esc, mas nao da para depender so dele. */
  const liberarRolagem = () => document.documentElement.classList.remove('lightbox-aberto');
  const fechar = () => { liberarRolagem(); dialogo.close(); };

  dialogo.querySelector('[data-lightbox-fechar]')?.addEventListener('click', fechar);
  dialogo.querySelector('[data-lightbox-anterior]')?.addEventListener('click', () => mostrar(atual - 1));
  dialogo.querySelector('[data-lightbox-proxima]')?.addEventListener('click', () => mostrar(atual + 1));

  dialogo.addEventListener('keydown', (e) => {
    if (fotos.length < 2) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(atual + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(atual - 1); }
  });

  /* arraste horizontal troca a foto. O clique que o navegador dispara logo
     depois do arraste e ignorado, senao soltar o dedo no fundo fecharia. */
  let inicioX = null;
  let arrastou = false;
  palco?.addEventListener('pointerdown', (e) => { inicioX = e.clientX; arrastou = false; });
  palco?.addEventListener('pointerup', (e) => {
    if (inicioX === null) return;
    const deslocado = e.clientX - inicioX;
    inicioX = null;
    arrastou = Math.abs(deslocado) > 10;
    if (Math.abs(deslocado) > 50 && fotos.length > 1) mostrar(atual + (deslocado < 0 ? 1 : -1));
  });

  dialogo.addEventListener('click', (e) => {
    if (arrastou) { arrastou = false; return; }
    if (e.target === dialogo || e.target === palco) fechar();
  });

  /* Esc: o "cancel" chega na hora, o "close" logo depois */
  dialogo.addEventListener('cancel', liberarRolagem);
  dialogo.addEventListener('close', liberarRolagem);

  return {
    abrir(lista, inicio = 0) {
      if (!lista.length) return;
      fotos = lista;
      mostrar(inicio);
      document.documentElement.classList.add('lightbox-aberto');
      dialogo.showModal();
    },
  };
})();

/* ---------- Pilha de cartas ----------
   Um baralho arrastavel, usado nas duas galerias do site. A carta da frente
   fica no centro; as vizinhas abrem em leque, giradas e menores.

   Arrastar para o lado troca a carta da frente. Clicar numa carta lateral traz
   ela para a frente. Os pontos abaixo tambem navegam, e as setas do teclado
   funcionam quando a carta esta em foco.

   Sem biblioteca: o que anima sao transform e opacity, resolvidos pelo
   compositor. O JS so decide qual carta e a frente e escreve os transforms. */

/* A tabela do leque. Deslocamento em % da largura da carta, giro em graus.
   E a mesma para as duas pilhas — se um dia mudar, muda nas duas.

   O giro e zero em todas as posicoes: as cartas de tras ficam retas, so
   deslocadas, menores e um pouco mais baixas. A profundidade passa a vir da
   escala e do degrau vertical, nao da inclinacao. A coluna continua aqui,
   em vez de sumir, porque o resto do codigo le esta tabela — o calculo da
   abertura do leque, por exemplo, pergunta a ela quanto a carta gira. */
function configuracaoDaCarta(indice, frente, total) {
  let d = indice - frente;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;

  if (d === 0) return { x: 0, y: 0, giro: 0, escala: 1, opacidade: 1, z: 5 };
  if (d === 1) return { x: 25, y: 1, giro: 0, escala: 0.9, opacidade: 1, z: 4 };
  if (d === -1) return { x: -25, y: 1, giro: 0, escala: 0.9, opacidade: 1, z: 4 };
  if (d === 2) return { x: 45, y: 5, giro: 0, escala: 0.8, opacidade: 1, z: 3 };
  if (d === -2) return { x: -45, y: 5, giro: 0, escala: 0.8, opacidade: 1, z: 3 };

  const lado = d > 0 ? 1 : -1;
  return { x: 55 * lado, y: 5, giro: 0, escala: 0.6, opacidade: 0, z: 2 };
}

/* Meia largura da caixa de uma carta girada, medida em larguras de carta.
   A carta e 2x3, entao a altura e 1.5 vez a largura; girar por t graus faz a
   caixa que a envolve crescer para (cos t + 1.5 sen t), ja com a escala. */
function meiaCaixa(escala, giro) {
  const t = (giro * Math.PI) / 180;
  return (escala * (Math.cos(t) + 1.5 * Math.sin(t))) / 2;
}

/* Quanto o leque pode abrir sem passar da tela.
   A carta de fora (d = 2 para qualquer lado) e sempre a mais larga das
   visiveis: fica a 45% da largura de carta do centro, mais a propria meia
   caixa girada. Se isso cai fora da tela, este fator encolhe so o
   deslocamento — giro e escala ficam de pe, senao o baralho perde a forma.

   O teto e 1: onde ja cabe, o leque e exatamente o desenhado. No desktop e
   no tablet a conta da folga de sobra, entao devolve 1 e nada muda; quem
   mexe nela e so o celular. */
function fatorDoLeque(pilha, larguraCarta) {
  if (!larguraCarta) return 1;
  /* A carta de fora (d = 2) e sempre a mais larga das visiveis. Os numeros
     dela vem da propria tabela, nao repetidos aqui: quando o giro caiu para
     zero, a conta se ajustou sozinha e o leque pode abrir mais, porque carta
     reta ocupa menos largura que carta girada. */
  const fora = configuracaoDaCarta(2, 0, 5);
  const caixa = pilha.getBoundingClientRect();
  const centro = caixa.left + caixa.width / 2;
  /* borda mais proxima, com 8px de respiro */
  const espaco = Math.min(centro, window.innerWidth - centro) - 8;
  const folga = espaco / larguraCarta - meiaCaixa(fora.escala, fora.giro);
  return Math.max(0.15, Math.min(1, folga / (fora.x / 100)));
}

function iniciarPilha(pilha) {
  const itens = Array.from(pilha.querySelectorAll("[data-pilha-item]"));
  const total = itens.length;
  if (total < 3) return;

  const pontos = pilha.parentElement.querySelector("[data-pilha-pontos]");
  const legenda = pilha.parentElement.querySelector("[data-pilha-descricao]");
  const anuncio = pilha.parentElement.querySelector("[data-pilha-anuncio]");
  let frente = 0;

  /* O leque e medido na montagem e a cada mudanca de tamanho da janela: a
     largura da carta vem do CSS (no celular ela acompanha a tela), entao
     mudou a tela, muda a conta. */
  let leque = 1;
  const medirLeque = () => {
    const novo = fatorDoLeque(pilha, itens[0].offsetWidth);
    if (Math.abs(novo - leque) < 0.005) return false;
    leque = novo;
    return true;
  };

  /* ---- desenho ---- */
  const desenhar = (arrasto = 0) => {
    itens.forEach((item, i) => {
      const c = configuracaoDaCarta(i, frente, total);
      /* so o deslocamento entra no fator; giro e escala vem da tabela */
      const x = c.x * leque;
      item.style.transform =
        `translate(calc(${x}% + ${arrasto}px), ${c.y}%) rotate(${c.giro}deg) scale(${c.escala})`;
      item.style.opacity = String(c.opacidade);
      item.style.zIndex = String(c.z);
      item.dataset.pilhaEstado = i === frente ? "frente" : "lado";
      /* carta invisivel sai da leitura e da tabulacao */
      item.setAttribute("aria-hidden", c.opacidade === 0 ? "true" : "false");
      const carta = item.querySelector("[data-pilha-carta]");
      if (carta) carta.tabIndex = i === frente ? 0 : c.opacidade === 0 ? -1 : 0;
    });

    if (pontos) {
      Array.from(pontos.children).forEach((p, i) =>
        p.setAttribute("aria-selected", String(i === frente)));
    }
    if (legenda) {
      const texto = itens[frente].dataset.descricao;
      if (texto) legenda.textContent = texto;
    }
    if (anuncio) {
      anuncio.textContent = `${frente + 1} de ${total}: ${itens[frente].dataset.nome || ""}`;
    }
  };

  const irPara = (i) => {
    frente = ((i % total) + total) % total;
    desenhar();
  };

  /* ---- arraste ---- */
  let arrastando = false;
  let inicioX = 0;
  let deslocado = 0;
  /* distancia do ultimo gesto, guardada so ate o clique que vem logo depois
     do pointerup. Sem isso o valor de um arraste antigo ficava retido e
     bloqueava o proximo clique numa carta lateral. */
  let ultimoGesto = 0;
  let idPonteiro = null;

  const limite = () => Math.max(40, pilha.getBoundingClientRect().width * 0.1);

  /* ---- por que a captura do ponteiro so acontece depois do primeiro movimento ----
     Capturar no pointerdown quebrava todo clique dentro da pilha. Ao capturar,
     o navegador passa a entregar o pointerup ao elemento que capturou — a
     .pilha — e nao ao botao onde o dedo desceu. Como o clique e disparado no
     ancestral comum do pointerdown com o pointerup, ele caia na .pilha, e o
     botao (seta ou carta) nunca recebia clique nenhum.

     Agora a captura so entra quando o dedo anda de verdade. Toque parado
     segue o caminho normal do navegador e o clique acontece; arraste captura
     no primeiro movimento e continua valendo mesmo se o dedo sair da pilha. */
  pilha.addEventListener("pointerdown", (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    arrastando = true;
    inicioX = e.clientX;
    deslocado = 0;
    idPonteiro = e.pointerId;
    pausar();
  });

  pilha.addEventListener("pointermove", (e) => {
    if (!arrastando) return;
    deslocado = e.clientX - inicioX;

    /* abaixo de 6px ainda pode ser um toque: nao captura e nao mexe no leque */
    if (!pilha.classList.contains("arrastando")) {
      if (Math.abs(deslocado) < 6) return;
      pilha.classList.add("arrastando");
      try { pilha.setPointerCapture(idPonteiro); } catch (erro) { idPonteiro = null; }
    }

    /* resistencia: o leque acompanha o dedo pela metade, para a pilha nao
       sair voando e para o gesto ter peso */
    desenhar(deslocado * 0.5);
  });

  const soltar = () => {
    if (!arrastando) return;
    arrastando = false;
    pilha.classList.remove("arrastando");
    if (idPonteiro !== null && pilha.hasPointerCapture(idPonteiro)) {
      pilha.releasePointerCapture(idPonteiro);
    }
    idPonteiro = null;
    ultimoGesto = Math.abs(deslocado);
    if (Math.abs(deslocado) > limite()) {
      irPara(frente + (deslocado < 0 ? 1 : -1));
    } else {
      desenhar();
    }
    deslocado = 0;
    retomar();
  };

  pilha.addEventListener("pointerup", soltar);
  pilha.addEventListener("pointercancel", soltar);

  /* fotos da pilha para a tela cheia (so onde a pilha pede, com
     data-pilha-lightbox): o src e a versao maior de cada carta. Carta com
     legenda propria (as atracoes) leva "nome: descricao" para baixo da
     foto; carta sem legenda (a galeria) usa o alt da foto. */
  const ampliavel = pilha.hasAttribute("data-pilha-lightbox") && lightbox;
  const fotosDaPilha = ampliavel
    ? itens.map((item) => {
        const foto = item.querySelector("img");
        const nome = (item.dataset.nome || "").trim();
        const descricao = item.querySelector(".atracao-local")?.textContent.trim() || "";
        return {
          src: foto?.getAttribute("src") || "",
          alt: foto?.getAttribute("alt") || "",
          legenda: nome && descricao ? `${nome}: ${descricao}` : "",
        };
      })
    : [];

  /* clicar numa carta lateral traz ela para a frente; clicar na da frente
     abre a foto em tela cheia, onde a pilha permitir. Se o dedo andou, o
     gesto foi arraste e nao clique */
  itens.forEach((item, i) => {
    const carta = item.querySelector("[data-pilha-carta]");
    if (!carta) return;
    carta.addEventListener("click", (e) => {
      /* o clique chega logo depois do pointerup: se o dedo andou, o gesto
         foi arraste e nao clique */
      if (ultimoGesto > 6) { ultimoGesto = 0; e.preventDefault(); return; }
      if (i !== frente) {
        irPara(i);
      } else if (ampliavel) {
        pausar();
        lightbox.abrir(fotosDaPilha, i);
        return;
      }
      retomar();
    });
    carta.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); irPara(frente + 1); retomar(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); irPara(frente - 1); retomar(); }
    });
  });

  /* O nome da atracao e um link para o mapa. Mesma regra da carta: se o
     dedo andou, o gesto foi arraste e o mapa nao abre — senao qualquer
     arraste que terminasse em cima do nome abriria uma aba nova. */
  pilha.querySelectorAll(".pilha-legenda a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (ultimoGesto > 6) { ultimoGesto = 0; e.preventDefault(); }
    });
  });

  /* ---- setas ---- */
  const seta = (sel, passo) => {
    const b = pilha.querySelector(sel);
    if (!b) return;
    b.addEventListener("click", () => { irPara(frente + passo); retomar(); });
  };
  seta("[data-pilha-anterior]", -1);
  seta("[data-pilha-proxima]", 1);

  /* ---- pontos ---- */
  if (pontos) {
    itens.forEach((item, i) => {
      const b = document.createElement("button");
      b.className = "pilha-ponto";
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `${item.dataset.nome || "Foto"} (${i + 1} de ${total})`);
      b.addEventListener("click", () => { irPara(i); retomar(); });
      pontos.appendChild(b);
    });
  }

  /* ---- passa sozinha ---- */
  let relogio = null;
  let naTela = true;

  const pausar = () => { if (relogio) { clearInterval(relogio); relogio = null; } };
  const retomar = () => {
    pausar();
    if (!naTela || prefersReducedMotion.matches || document.hidden) return;
    relogio = setInterval(() => irPara(frente + 1), 7000);
  };

  ["mouseenter", "focusin"].forEach((ev) => pilha.addEventListener(ev, pausar));
  ["mouseleave", "focusout"].forEach((ev) => pilha.addEventListener(ev, retomar));

  const olho = new IntersectionObserver((entradas) => {
    naTela = entradas[0].isIntersecting;
    if (naTela) retomar(); else pausar();
  }, { threshold: 0.25 });
  olho.observe(pilha);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pausar(); else retomar();
  });
  prefersReducedMotion.addEventListener("change", retomar);

  window.addEventListener("resize", () => {
    if (medirLeque()) desenhar();
  }, { passive: true });

  medirLeque();
  desenhar();
  retomar();
}

document.querySelectorAll("[data-pilha]").forEach(iniciarPilha);

/* ---------- Carrossel de foto unica ----------
   Usado na vitrine dos quartos. Nao substitui a pilha de cartas das duas
   galerias — aquelas continuam como estao. Aqui a foto e uma so, plana, com
   a informacao do quarto por cima: e o formato do modelo e evita tres
   baralhos iguais na mesma pagina.

   Mesmo vocabulario da pilha, de proposito: arrastar para o lado, setas,
   pontos, setas do teclado. O que anima e transform, resolvido pelo
   compositor. Sem biblioteca. */
function iniciarCarrossel(carrossel) {
  const trilho = carrossel.querySelector('[data-carrossel-trilho]');
  const slides = Array.from(carrossel.querySelectorAll('[data-carrossel-slide]'));
  const total = slides.length;
  if (!trilho || total < 2) return;

  const pontos = carrossel.querySelector('[data-carrossel-pontos]');
  const anuncio = carrossel.querySelector('[data-carrossel-anuncio]');
  let atual = 0;

  const desenhar = (arrasto = 0) => {
    trilho.style.transform = `translate3d(calc(${atual * -100}% + ${arrasto}px), 0, 0)`;
    slides.forEach((slide, i) => {
      const fora = i !== atual;
      slide.setAttribute('aria-hidden', fora ? 'true' : 'false');
      /* slide fora de vista sai da tabulacao, senao o foco viaja para um
         cartao invisivel e a pagina "pula" sozinha */
      slide.querySelectorAll('a, button').forEach((f) => { f.tabIndex = fora ? -1 : 0; });
    });
    if (pontos) {
      Array.from(pontos.children).forEach((p, i) =>
        p.setAttribute('aria-selected', String(i === atual)));
    }
    if (anuncio) {
      anuncio.textContent = `${atual + 1} de ${total}: ${slides[atual].dataset.nome || ''}`;
    }
  };

  const irPara = (i) => {
    atual = ((i % total) + total) % total;
    desenhar();
  };

  /* ---- arraste ---- */
  let arrastando = false;
  let inicioX = 0;
  let deslocado = 0;
  let idPonteiro = null;
  const limite = () => Math.max(40, carrossel.getBoundingClientRect().width * 0.12);

  carrossel.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest('[data-carrossel-seta], [data-carrossel-pontos], a, button')) return;
    arrastando = true;
    inicioX = e.clientX;
    deslocado = 0;
    idPonteiro = e.pointerId;
  });

  carrossel.addEventListener('pointermove', (e) => {
    if (!arrastando) return;
    deslocado = e.clientX - inicioX;
    /* so captura depois de 6px: abaixo disso ainda pode ser um toque, e
       capturar cedo faz o clique chegar no elemento errado */
    if (!carrossel.classList.contains('arrastando')) {
      if (Math.abs(deslocado) < 6) return;
      carrossel.classList.add('arrastando');
      try { carrossel.setPointerCapture(idPonteiro); } catch (erro) { idPonteiro = null; }
    }
    desenhar(deslocado * 0.55);
  });

  const soltar = () => {
    if (!arrastando) return;
    arrastando = false;
    carrossel.classList.remove('arrastando');
    if (idPonteiro !== null && carrossel.hasPointerCapture(idPonteiro)) {
      carrossel.releasePointerCapture(idPonteiro);
    }
    idPonteiro = null;
    if (Math.abs(deslocado) > limite()) {
      irPara(atual + (deslocado < 0 ? 1 : -1));
    } else {
      desenhar();
    }
    deslocado = 0;
  };

  carrossel.addEventListener('pointerup', soltar);
  carrossel.addEventListener('pointercancel', soltar);

  carrossel.querySelectorAll('[data-carrossel-seta]').forEach((seta) => {
    seta.addEventListener('click', () => {
      irPara(atual + (seta.dataset.carrosselSeta === 'proximo' ? 1 : -1));
    });
  });

  carrossel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); irPara(atual + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(atual - 1); }
  });

  if (pontos) {
    slides.forEach((slide, i) => {
      const b = document.createElement('button');
      b.className = 'carrossel-ponto';
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `${slide.dataset.nome || 'Item'} (${i + 1} de ${total})`);
      b.addEventListener('click', () => irPara(i));
      pontos.appendChild(b);
    });
  }

  desenhar();
}

document.querySelectorAll('[data-carrossel]').forEach(iniciarCarrossel);

/* ---------- "Ver fotos" das suites ----------
   Cada cartao lista as proprias fotos num <template data-fotos> (nao
   carrega nada ate abrir). O botao mostra quantas sao e abre a tela cheia.
   Cartao sem fotos listadas fica sem o botao. */
document.querySelectorAll('[data-quarto-fotos]').forEach((botao) => {
  const modelo = botao.closest('[data-carrossel-slide]')?.querySelector('template[data-fotos]');
  const fotos = modelo
    ? Array.from(modelo.content.querySelectorAll('img')).map((foto) => ({
        src: foto.getAttribute('src') || '',
        alt: foto.getAttribute('alt') || '',
      }))
    : [];
  if (!fotos.length || !lightbox) { botao.hidden = true; return; }

  const rotulo = botao.querySelector('span');
  if (rotulo) rotulo.textContent = fotos.length > 1 ? `Ver ${fotos.length} fotos` : 'Ver foto';
  botao.addEventListener('click', () => lightbox.abrir(fotos, 0));
});

/* ---------- Barra de reserva do topo ----------
   Nao envia nada por conta propria: copia os quatro campos para o formulario
   da secao Contato e leva a pessoa para la, com o cursor no primeiro campo
   que falta preencher. Um caminho de reserva so — o do WhatsApp — em vez de
   dois que poderiam divergir. */
const formRapido = document.querySelector('#formReservaRapida');
const formCompleto = document.querySelector('#formReserva');

if (formRapido && formCompleto) {
  formRapido.addEventListener('submit', (evento) => {
    evento.preventDefault();

    ['checkin', 'checkout', 'hospedes', 'quarto'].forEach((campo) => {
      const origem = formRapido.elements[campo];
      const destino = formCompleto.elements[campo];
      if (!origem || !destino || !origem.value) return;
      /* "Todos" e o estado neutro da barra: nao existe no formulario
         completo, entao nao viaja. */
      if (campo === 'quarto' && origem.value === 'Todos') return;
      destino.value = origem.value;
      /* o change avisa o formulario completo: o check-out acompanha o
         check-in e o resumo de noites e valor se refaz */
      destino.dispatchEvent(new Event('change'));
    });
    atualizarResumoDaReserva();

    const alvo = document.querySelector('#contato');
    if (alvo) alvo.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth', block: 'start' });

    /* o foco vai para o primeiro campo ainda vazio, que e o que a pessoa
       precisa completar para a reserva sair */
    const nome = formCompleto.elements['nome'];
    if (nome) {
      window.setTimeout(() => {
        nome.focus({ preventScroll: true });
      }, prefersReducedMotion.matches ? 0 : 520);
    }
  });
}

/* ---------- "Reservar agora": todos levam ao mesmo lugar ----------
   O da navbar, o do menu do celular, o do hero, o da faixa final e um em
   cada cartao de suite. Todos chegam no topo do cartao do formulario, com o
   cursor no check-in: o primeiro campo que a pessoa tem para preencher. Os
   dos cartoes ainda dizem qual suite (data-quarto, preenchido por
   montarOpcoesDeQuarto) e o tipo ja vem escolhido no formulario.

   O href continua "#contato" de proposito: sem JS, ou antes dele carregar, o
   link ainda leva a secao. O JS so afina a chegada. */
const irParaReserva = (quarto) => {
  const cartao = document.querySelector('.booking-form');
  if (!cartao) return;

  if (quarto) {
    const campo = document.querySelector('#quarto');
    /* so escolhe se a opcao existir mesmo: nome de quarto trocado no HTML
       nao pode deixar o campo com valor invisivel */
    if (campo && Array.from(campo.options).some((o) => o.value === quarto)) {
      campo.value = quarto;
      atualizarResumoDaReserva();
    }
  }

  const suave = !prefersReducedMotion.matches;
  const alvoTopo = parseFloat(getComputedStyle(cartao).scrollMarginTop) || 0;
  const rolar = () =>
    cartao.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });

  rolar();

  /* ---- por que conferir onde paramos ----
     A rolagem suave mira um ponto calculado no instante em que comeca. Se
     algo carregar no caminho — imagem preguicosa, secao que so anima ao
     entrar na tela — a pagina cresce por cima do alvo e a viagem termina
     antes da conta. Medido: o cartao parava a 275px do topo em vez de 92.
     Entao conferimos e emendamos o que faltou, ate tres vezes. */
  let tentativas = 3;
  const conferir = () => {
    const desvio = cartao.getBoundingClientRect().top - alvoTopo;
    if (Math.abs(desvio) > 8 && tentativas > 0) {
      tentativas -= 1;
      rolar();
      window.setTimeout(conferir, suave ? 420 : 0);
      return;
    }

    /* o foco so no fim: focar antes da o scroll do navegador por cima do
       nosso, e a pagina chega tremida */
    const checkin = document.querySelector('#checkin');
    if (checkin) checkin.focus({ preventScroll: true });
  };

  window.setTimeout(conferir, suave ? 520 : 0);
};

document.querySelectorAll('[data-ir-reserva]').forEach((botao) => {
  botao.addEventListener('click', (evento) => {
    evento.preventDefault();
    irParaReserva(botao.dataset.quarto);
  });
});

/* ---------- Formulário de reserva: abre o WhatsApp da pousada ----------
   Numero e primeira linha da mensagem vem do js/config.js. */
const formReserva = document.querySelector('#formReserva');

if (formReserva) {
  formReserva.addEventListener('submit', (event) => {
    event.preventDefault();

    const dados = new FormData(formReserva);
    const formatarData = (valor) => {
      if (!valor) return '';
      const [ano, mes, dia] = valor.split('-');
      return `${dia}/${mes}/${ano}`;
    };

    /* noites e valor estimado entram na mensagem: a pousada ja recebe o
       pedido com a conta feita */
    const resumo = resumoDaReserva();
    const linhas = [
      dadoDaPousada('whatsapp.mensagemFormulario')
        || dadoDaPousada('whatsapp.mensagem')
        || 'Olá! Gostaria de consultar disponibilidade para uma hospedagem.',
      '',
      `Nome: ${dados.get('nome') || ''}`,
      `Check-in: ${formatarData(dados.get('checkin'))}`,
      `Check-out: ${formatarData(dados.get('checkout'))}`,
      ...(resumo && resumo.noites > 0 ? [`Noites: ${resumo.noites}`] : []),
      `Hóspedes: ${dados.get('hospedes') || ''}`,
      `Tipo de quarto: ${dados.get('quarto') || ''}`,
      ...(resumo && resumo.total ? [`Valor estimado: ${formatarReais(resumo.total)} (a confirmar)`] : []),
      `WhatsApp: ${dados.get('whatsapp') || ''}`,
    ];

    const email = dados.get('email');
    if (email) linhas.push(`E-mail: ${email}`);

    const url = linkWhatsApp(linhas.join('\n'));
    if (url) window.open(url, '_blank', 'noopener');
  });
}
