/* ==========================================================================
   DADOS DA POUSADA
   --------------------------------------------------------------------------
   Este e o arquivo que muda a cada cliente. Nome, contatos, WhatsApp,
   endereco, mapa, redes e horarios saem daqui e se espalham pela pagina
   sozinhos: cabecalho, hero, secoes, formulario, rodape e botao flutuante.

   O que NAO esta aqui (e onde fica):
   - cores da marca .......... index.html, bloco ":root" no topo do CSS
   - fotos ................... pasta images/, trocando o arquivo pelo mesmo nome
   - textos das secoes ....... index.html, cada secao tem um comentario em cima
   - suites .................. index.html, secao "Acomodacoes"
   - atracoes e depoimentos .. index.html, secoes "Experiencias" e "Depoimentos"
   - SEO (titulo, descricao,
     previa do WhatsApp) ..... index.html, dentro do <head>

   O guia completo esta em COMO-PERSONALIZAR.md, nesta mesma pasta site/.
   ========================================================================== */

window.POUSADA = {
  /* ---- Identidade ---- */
  nome: "Pousada Encanto da Floresta",
  slogan: "Uma experiência especial em meio à natureza.",

  /* Logo em texto: duas linhas ao lado do simbolo de folhas.
     Se o cliente tiver logo em imagem, coloque o arquivo em images/ e
     escreva o caminho em "imagem" (ex.: "./images/logo-cliente.png"): o
     simbolo e o texto dao lugar a imagem no cabecalho e no mapa. */
  logo: {
    linha1: "Pousada",
    linha2: "Encanto da Floresta",
    imagem: "",
  },

  /* ---- Localizacao ---- */
  cidade: "Cidade turística",
  uf: "AM",
  endereco: "Centro · Cidade turística, Amazonas",

  /* O que o Google Maps pesquisa para o mapa da secao Localizacao e para o
     link do endereco no rodape. Pode ser o endereco completo, o nome da
     pousada como aparece no Google ou coordenadas ("-3.1, -60.02").
     zoom: 6 mostra o estado, 15 mostra a rua. */
  mapa: {
    busca: "Amazonas, Brasil",
    zoom: 6,
  },

  /* ---- Contato ----
     WhatsApp: "numero" so com digitos, com 55 + DDD na frente.
     "exibicao" e como o numero aparece escrito na pagina. */
  whatsapp: {
    numero: "5592999990000",
    exibicao: "(92) 99999-0000",
    /* primeira linha da conversa, nos botoes de WhatsApp */
    mensagem: "Olá! Gostaria de consultar disponibilidade para uma hospedagem.",
    /* primeira linha da mensagem que o formulario de reserva monta */
    mensagemFormulario: "Olá! Gostaria de consultar disponibilidade para uma hospedagem.",
  },

  telefone: {
    numero: "+559230000000",
    exibicao: "(92) 3000-0000",
  },

  email: "reservas@encantodafloresta.com",

  /* ---- Redes ----
     Endereco completo do perfil. Deixe "" para esconder o icone. */
  redes: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  /* ---- Horarios ---- */
  horarios: {
    checkin: "14h",
    checkout: "12h",
    cafe: "7h às 10h",
  },

  /* ---- Avaliacoes ----
     Link para a pagina de avaliacoes do cliente (Google, Booking...).
     Vazio esconde o link embaixo dos depoimentos. */
  avaliacoes: {
    link: "",
    texto: "Ver mais avaliações",
  },
};
