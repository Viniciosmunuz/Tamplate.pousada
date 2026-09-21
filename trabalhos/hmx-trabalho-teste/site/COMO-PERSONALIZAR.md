# Como personalizar o template

Este site é o **template base** para pousadas e hotéis. Ele vem preenchido com
uma pousada fictícia, a **Pousada Encanto da Floresta**, para parecer um site
real na hora de mostrar. Para montar o site de um cliente, duplique a pasta do
projeto e troque os itens abaixo, nesta ordem.

> Tudo o que é fictício e precisa ser trocado está marcado no código com
> **`[MODELO]`**. Antes de publicar, procure por `[MODELO]` no `index.html`
> e confira se nada ficou para trás.

---

## 1. Dados da pousada: `js/config.js`

É o arquivo que mais muda. Um campo trocado aqui aparece sozinho em todos os
lugares da página: cabeçalho, hero, seções, formulário, rodapé e botão
flutuante do WhatsApp.

| Campo | O que é | Onde aparece |
|---|---|---|
| `nome` | nome completo | "Sobre", rodapé, rótulos de acessibilidade |
| `slogan` | frase principal | título do hero |
| `logo.linha1` / `logo.linha2` | as duas linhas do logo em texto | cabeçalho e cartão do mapa |
| `logo.imagem` | caminho do logo em imagem (opcional) | troca o logo em texto pela imagem |
| `cidade` / `uf` | cidade e estado | sobrelinha do hero ("Cidade · UF") |
| `endereco` | endereço por extenso | cartão do mapa e rodapé |
| `mapa.busca` / `mapa.zoom` | o que o Google Maps pesquisa | mapa da seção Localização e link do rodapé |
| `whatsapp.numero` | só dígitos, com 55 + DDD | todos os botões de WhatsApp e o formulário |
| `whatsapp.exibicao` | como o número aparece escrito | rodapé |
| `whatsapp.mensagem` | primeira linha da conversa | botões de WhatsApp |
| `whatsapp.mensagemFormulario` | primeira linha da mensagem do formulário | formulário de reserva |
| `telefone.numero` / `.exibicao` | telefone fixo | rodapé |
| `email` | e-mail de reservas | rodapé |
| `redes.instagram` / `redes.facebook` | endereço completo do perfil | ícones do rodapé (vazio esconde o ícone) |
| `horarios.checkin` / `.checkout` / `.cafe` | horários | cartão do mapa e seção de reserva |
| `avaliacoes.link` | página de avaliações do cliente | link "Ver mais avaliações" (vazio esconde) |

O HTML já traz os mesmos valores escritos, como reserva. Quem manda é o
`config.js`: se ele carregar, o que está nele vence.

---

## 2. Cores: bloco `:root` no topo do CSS do `index.html`

Logo no começo do `<style>` há um bloco marcado **CORES DA MARCA**. Troque:

| Variável | Uso |
|---|---|
| `--marca-principal` | detalhes, links, botão da barra de reserva |
| `--marca-escura` | títulos |
| `--marca-profunda` | hover da cor principal |
| `--marca-destaque` | dourado: estrelas, sobrelinhas no escuro, nome no rodapé |
| `--rgb-marca` | a mesma `--marca-principal`, escrita como `R, G, B` |
| `--rgb-escuro` | véus escuros sobre as fotos |
| `--rgb-sombra` | sombras e contornos |

Um pouco abaixo ficam `--color-cta` e `--color-cta-hover` (botões "Reservar",
hoje em terracota) e `--color-dark` (faixas escuras e rodapé).

Confira o contraste depois de trocar: título sobre o fundo precisa de 4,5:1
ou mais, e o texto branco sobre o botão também.

No `<head>`, a linha `<meta name="theme-color">` pinta a barra do navegador no
celular: use a mesma cor de `--marca-escura`.

---

## 3. Logo e favicon

- **Logo em texto (padrão):** muda pelo `config.js` (`logo.linha1` e
  `logo.linha2`). O símbolo de folhas é um SVG que herda a cor: fica branco
  sobre a foto do hero e escuro sobre a barra de vidro.
- **Logo em imagem do cliente:** coloque o arquivo em `images/` (PNG com
  fundo transparente ou SVG) e escreva o caminho em `logo.imagem`. Ele
  precisa ser legível sobre foto escura e sobre fundo claro.
- **Favicon:** troque `images/favicon.svg`, `favicon-32.png`, `favicon-180.png`
  e `favicon-512.png`. O `favicon-180.png` também marca o ponto ativo das
  galerias, então use um ícone que funcione bem pequeno.

---

## 4. Fotos: pasta `images/`

Para trocar uma foto, **substitua o arquivo mantendo o mesmo nome e a mesma
proporção**. Não precisa mexer no HTML.

| Arquivo(s) | Onde | Tamanho |
|---|---|---|
| `hero-desk-800/1200/1549.jpg` | hero no computador | 16:9 (1549×871 o maior) |
| `hero-mob-520/740.jpg` | hero no celular | retrato (740×1014 o maior) |
| `og-image.jpg` | prévia ao compartilhar o link | 1200×630 |
| `quarto-1.jpg`, `quarto-2.jpg`, `quarto-3.jpg` | cartões das suítes | 1200×900 |
| `experiencia-fundo.jpg` | fundo da faixa Comodidades | 1600×1067 |
| `sobre-cafe.jpg` | mosaico do Sobre | 620×700 |
| `sobre-fachada.jpg` | mosaico do Sobre | 620×560 |
| `sobre-quarto.jpg` | mosaico do Sobre | 620×620 |
| `sobre-salao.jpg` | mosaico do Sobre | 620×760 |
| `atracao-1…5-800.jpg` e `-480.jpg` | cartas de Experiências | 800×1200 e 480×720 |
| `chamada-fundo.jpg` | faixa "Pronto para viver…" e cartão do mapa | 1600×1067 |
| `galeria-01…10-800.jpg` e `-480.jpg` | galeria | 800×1200 e 480×720 |
| `depoimentos-900/1600.jpg` | foto da faixa de depoimentos | 3:2 |

Não use foto de outro estabelecimento nem de ponto turístico que tenha dono
de imagem sem autorização.

---

## 5. Textos das seções: `index.html`

Cada seção tem um comentário em cima explicando o que editar. A ordem da
página:

| Seção | `id` | O que costuma mudar |
|---|---|---|
| Hero | `hero` | parágrafo de apoio e a nota média (4.9/5) |
| Barra de reserva | (sem id) | nada: as opções de quarto se montam sozinhas |
| Acomodações | `quartos` | as suítes (ver item 6) |
| Comodidades | `experiencia` | os seis itens da lista |
| Sobre | `sobre` | título, parágrafo, lista e o selo "10+ anos" |
| Experiências e atrações | `destino` | as cartas (ver item 7) |
| Chamada final | (sem id) | frase de convite |
| Galeria | `galeria` | só as fotos e os nomes (`data-nome`) |
| Localização | `localizacao` | título e frase; mapa e endereço vêm do config |
| Depoimentos | `avaliacoes` | os depoimentos (ver item 8) |
| Dúvidas frequentes | `duvidas` | perguntas e respostas `[MODELO]` (ver item 8b) |
| Reserva | `contato` | políticas; horários vêm do config |
| Números | (sem id) | os quatro números (ver item 9) |

Regra do projeto: **não use travessão (— ou –) em texto visível.** Use
vírgula, ponto, dois-pontos, parênteses ou o ponto médio (·). O verificador
de qualidade aponta se escapar algum.

---

## 6. Suítes

Na seção `quartos`, cada suíte é um `<article class="quarto-slide">`. Em cada
uma, troque `data-nome`, a foto, o `<h3>`, a frase de descrição, a capacidade
e o preço.

- **Fotos da suíte:** o botão "Ver fotos" abre em tela cheia as imagens
  listadas no `<template data-fotos>` do próprio cartão, uma `img` por foto
  (quarto, banheiro, vista...). O botão mostra a quantidade sozinho. No
  template elas reaproveitam fotos da galeria; troque pelas do cliente.
- **Acrescentar ou tirar:** copie ou apague um `<article>` inteiro. O
  carrossel, as opções de quarto dos dois formulários e o botão "Reservar
  agora" de cada cartão se ajustam sozinhos.
- **Preço `[MODELO]`:** os valores do template (R$ 250, R$ 350 e R$ 550 por
  noite) são ilustrativos. Troque pelos do cliente dentro do `<strong>`. Se o
  cliente não quiser mostrar valor, use
  `<span class="quarto-preco"><strong>Sob consulta</strong></span>`.

---

## 7. Experiências e atrações

Cada carta é um `<figure class="pilha-item">` com foto, nome (`<h3>`) e uma
linha de descrição. A pilha funciona com 3 cartas ou mais, e com 5 o leque
fica completo.

Para uma atração real do cliente com link para o Google Maps, o comentário em
cima da seção traz o `<h3>` pronto para copiar. O estilo do link e o bloqueio
de clique durante o arraste já estão no CSS e no JS.

Tocar na foto da carta da frente abre em tela cheia, como na galeria, com o
nome e a descrição da atração como legenda. Não precisa configurar nada.

---

## 8. Depoimentos `[MODELO]`

**Os quatro depoimentos do template são fictícios.** Troque pelas avaliações
reais do cliente (Google, Booking, TripAdvisor...), com o texto como o hóspede
escreveu e só o primeiro nome. Preencha `avaliacoes.link` no `config.js` para
mostrar o link "Ver mais avaliações".

O avatar ao lado do nome é a inicial num círculo colorido, como o Google
mostra para quem não tem foto. Para usar a foto de perfil real do hóspede
(só com autorização dele), o comentário da seção traz o `<img>` pronto.

---

## 8b. Dúvidas frequentes `[MODELO]`

Cada pergunta é um `<details class="faq-item">`, que abre e fecha sem
JavaScript. As respostas do template são exemplos: confira cada uma com o
cliente, porque pet, criança, pagamento e day use mudam muito de uma pousada
para outra. Para acrescentar, copie um bloco; para tirar, apague. Os horários
vêm do `config.js`.

---

## 8c. Formulário de reserva

Não precisa editar nada. Ele abre com check-in no dia de hoje e check-out no
dia seguinte, não deixa escolher data passada nem check-out antes do
check-in, e mostra as noites e o valor estimado (preço da suíte × noites). A
mensagem do WhatsApp já chega com as noites e o valor. Suíte "Sob consulta"
mostra só as noites.

---

## 9. Números da casa `[MODELO]`

No fim da página há uma coluna com quatro `<article class="stat-card">`. O
JavaScript monta as outras três colunas e o laço da animação, então os
números são escritos uma vez só. Mantenha **exatamente quatro**. Os números
do template são ilustrativos.

---

## 10. SEO e compartilhamento: `<head>` do `index.html`

Estes dados ficam no HTML, e não no `config.js`, porque o Google e as prévias
do WhatsApp e do Instagram leem a página sem rodar script. Troque:

- `<title>` e `<meta name="description">`;
- `canonical`, `og:title`, `og:description` e `og:image` (com o domínio do cliente);
- o bloco `<script type="application/ld+json">`, logo depois do CSS: nome,
  telefone, e-mail, endereço e horários.

---

## 11. Antes de publicar

1. Procurar `[MODELO]` no `index.html`: nada fictício pode ir ao ar.
2. Apagar o crédito "Fotos ilustrativas: Unsplash" do rodapé quando as fotos
   forem todas do cliente.
3. Rodar o verificador, na pasta do trabalho (uma acima de `site/`):
   `node qualidade/verificar.mjs`
4. Testar no celular: menu, carrosséis, formulário e botão do WhatsApp (a
   mensagem precisa abrir no número certo).
5. Publicar **só a pasta `site/`**.

---

## Fotos de exemplo

As fotos do template são do [Unsplash](https://unsplash.com/license), com
licença de uso livre, inclusive comercial, sem obrigação de crédito. Duas
foram editadas: na foto do hero foi coberta uma placa de "proibido fumar" em
espanhol, e as outras só foram recortadas e reduzidas.

| Arquivo | Foto no Unsplash |
|---|---|
| hero-*, og-image | `-pDQMLF1aPg` |
| quarto-1 / 2 / 3 | `0v7DOW9cT_o` / `RAXD1BlJmSs` / `IZ8akRW_5BY` |
| experiencia-fundo | `efm0EirfOBQ` |
| chamada-fundo | `ZLwGbS29emc` |
| depoimentos-* | `wOPg0C8ySss` |
| sobre-cafe / fachada / quarto / salao | `IDTEXXXfS44` / `06DvFN3poPw` / `GPJHlacZWII` / `3rAXuDp3pVs` |
| atracao-1 … 5 | `9UjEyzA6pP4`, `7-0v5zONbKE`, `R1yQATAVBhg`, `Z2YnKo17mlI`, `xqV9QdGOSas` |
| galeria-01 … 05 | `SmIAO_Vkqmo`, `Q48pAVVON0o`, `D7jd-JTWu50`, `ffGdB-Yfy_4`, `KzT7_TkSGLo` |
| galeria-06 … 10 | `oNlXq_jzLp4`, `Tv_ZjDrtavE`, `asgkXxIQrPU`, `GM7cm1IC6Ss`, `safXxEsD-fs` |

O endereço de cada foto é `https://unsplash.com/photos/` seguido do código.
