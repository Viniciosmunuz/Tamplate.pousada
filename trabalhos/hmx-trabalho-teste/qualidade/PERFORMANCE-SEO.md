# Performance e SEO — decididos no passe 1, não depois do PageSpeed

> **Por que este documento existe:** a ordem errada custa o projeto inteiro duas
> vezes. Gerar a página bonita e só então rodar o PageSpeed produz uma lista de
> vinte apontamentos que exigem mexer no `<head>`, nas imagens, nas fontes, no
> JS e na ordem do CSS — ou seja, refazer. Cada regra abaixo é barata **enquanto
> você escreve** e cara depois.

Trate como orçamento, não como aspiração. Se uma decisão de design estoura o
orçamento, o caminho é ajustar a implementação (formato de imagem, peso de
fonte, quantidade de JS) — **nunca** remover a animação ou o layout que a
referência mediu.

---

## 0. Orçamento

| Métrica | Meta (mobile, 4G simulado) |
|---|---|
| LCP | **< 2,5s** |
| CLS | **< 0,1** |
| INP | **< 200ms** |
| Peso total do 1º carregamento | **< 1 MB** |
| HTML + CSS + JS (sem imagens) | **< 200 KB** |
| Imagem do hero | **< 200 KB** |
| Requisições de terceiros no carregamento | **≤ 2** |

Ninguém acerta isso corrigindo depois. Acerta escolhendo certo nas seis frentes
abaixo.

---

## 1. Imagens — a frente que decide o LCP

- **A imagem do hero é `<img>`, não `background-image`.** Background não pode ser
  priorizado nem descoberto cedo pelo navegador, e o LCP é quase sempre ela.
- No hero: `fetchpriority="high"`, `decoding="async"`, **sem** `loading="lazy"`.
  Aplicar `lazy` acima da dobra é o erro que mais atrasa o LCP — o navegador
  espera o layout para só então começar a baixar.
- **Todas** as outras imagens: `loading="lazy" decoding="async"`.
- `width` e `height` em **toda** `<img>`, sempre, com os valores reais do arquivo.
  É o que reserva a caixa e mantém o CLS em zero. Se o recorte é fluido, some
  `aspect-ratio` no CSS.
- Formato: **AVIF ou WebP** com fallback, servindo o tamanho certo:

```html
<picture>
  <source srcset="./images/hero-800.avif 800w, ./images/hero-1600.avif 1600w"
          sizes="(max-width: 768px) 100vw, 640px" type="image/avif">
  <img src="./images/hero-1600.jpg" width="1600" height="1067"
       sizes="(max-width: 768px) 100vw, 640px"
       srcset="./images/hero-800.jpg 800w, ./images/hero-1600.jpg 1600w"
       alt="Descrição real do que está na foto"
       fetchpriority="high" decoding="async">
</picture>
```

- **Nunca** entregue um JPG de 3000px para exibir em 600px. Redimensione o
  arquivo em `site/images/` — as fotos de `assets/` costumam vir no tamanho
  original do site de origem.
- Ícones: SVG inline (sem requisição, herda `currentColor`). Nada de sprite
  externo nem de biblioteca de ícones inteira.
- Preload **só** do recurso do LCP, e só um:

```html
<link rel="preload" as="image" href="./images/hero-1600.avif" fetchpriority="high">
```

## 2. Fontes — a segunda causa de LCP ruim

- Carregue **apenas os pesos que a escala medida usa**. Três pesos por família é
  o teto prático; cada peso extra é um arquivo.
- `font-display: swap` sempre — sem ele o texto fica invisível durante o
  carregamento (FOIT) e o LCP conta o texto que ninguém viu.
- Google Fonts: `preconnect` para os **dois** domínios, e `&display=swap` na URL.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

- **Melhor ainda:** self-host o `.woff2` em `site/fonts/`, com `@font-face` e
  `font-display: swap`, e um `<link rel="preload" as="font" type="font/woff2"
  crossorigin>` para o peso usado no título do hero. Elimina duas conexões
  externas. Faça isso quando a licença da fonte permitir — se não permitir, ou
  se o arquivo não estiver disponível, registre no `site/README.md` e siga pelo
  Google Fonts.
- Combine com uma pilha de fallback próxima em métrica para não haver salto na
  troca:

```css
@font-face {
  font-family: 'Inter Fallback'; src: local('Arial');
  size-adjust: 107%; ascent-override: 90%; descent-override: 22%;
}
```

## 3. CSS

- Ordem no `<head>`: `tokens` → `base` → `sections`. Sem `@import` (serializa o
  download de cada arquivo).
- CSS que estiliza seção que não existe é peso morto: escreva só o que a página
  usa.
- Evite seletores custosos em página longa (`*` com transição, `:has()` amplo).
- `content-visibility: auto` + `contain-intrinsic-size` em seções pesadas
  **abaixo da dobra** encurtam bem o primeiro render:

```css
[data-section="faq"], [data-section="social-proof"] {
  content-visibility: auto;
  contain-intrinsic-size: auto 800px;   /* estimativa da altura real */
}
```
  Não aplique acima da dobra e não aplique sem `contain-intrinsic-size` — sem a
  estimativa, a barra de rolagem pula durante o scroll.

## 4. JavaScript

- Todo `<script>` com `defer` (ou no fim do `<body>`). Nada bloqueando o parser.
- GSAP **local**, e só os plugins usados. Não registre `ScrollTrigger` se não há
  scroll animado.
- Animação: só `transform` e `opacity`. `will-change` apenas no elemento que vai
  animar de fato, e removido depois — `will-change` espalhado consome memória de
  GPU e piora o que deveria melhorar.
- Nada de handler de `scroll`/`resize` fazendo leitura de layout. Use
  `IntersectionObserver` ou o `ScrollTrigger`; se precisar de listener,
  `{ passive: true }`.
- Nenhuma biblioteca para o que a plataforma já faz: acordeão é `<details>`,
  carrossel simples é `scroll-snap`, modal é `<dialog>`, contador é
  `IntersectionObserver` + `requestAnimationFrame`.
- Lottie, canvas, WebGL e vídeo de fundo: só se estão na receita, sempre abaixo
  da dobra ou adiados, e desligados no mobile.

## 5. Vídeo

```html
<video poster="./images/poster.jpg" preload="none"
       muted loop playsinline autoplay width="1280" height="720"></video>
```

`preload="none"` (ou `metadata`), `poster` sempre — o poster é o que aparece no
LCP. Abaixo de 768px, troque o vídeo pelo poster: um MP4 de fundo é o maior
desperdício de dados que uma landing pode ter no celular.

## 6. CLS — o que causa salto de layout

1. imagem/vídeo/iframe sem dimensão reservada → `width`/`height`/`aspect-ratio`;
2. fonte trocando com métricas muito diferentes → fallback ajustado (§2);
3. banner, aviso de cookie ou barra injetada acima do conteúdo → reserve o espaço
   ou posicione fixo;
4. animação de entrada que muda altura → anime `transform`/`opacity`, nunca
   `height` ou `margin`;
5. conteúdo carregado depois (depoimento, mapa, embed) → placeholder com a mesma
   altura.

## 7. Terceiros e rastreamento

O `RASTREAMENTO.md` traz os snippets. Regras de carregamento:

- nada de terceiro bloqueando o render;
- pixel/GA4/Clarity carregam **após** o `load` ou na primeira interação;
- GTM, se usado, é o único container — não empilhe GTM + tags soltas;
- mapa, vídeo do YouTube e widget de chat entram por **facade**: uma imagem
  clicável que só carrega o embed no clique. Um embed de YouTube custa ~700KB
  antes de alguém dar play.

## 8. SEO — o mínimo que precisa estar no `<head>` desde o começo

```html
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Promessa específica · Marca</title>            <!-- até ~60 caracteres -->
  <meta name="description" content="…">                 <!-- 140–160 caracteres -->
  <link rel="canonical" href="https://dominio.com/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="…">
  <meta property="og:description" content="…">
  <meta property="og:image" content="https://dominio.com/images/og.jpg"> <!-- 1200×630 -->
  <meta property="og:url" content="https://dominio.com/">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="./favicon.png">
</head>
```

- `<title>` e `description` saem da promessa real da copy, não de fórmula. Nada
  de travessão (ver `PADROES-PROIBIDOS.md` §5) — use `·` ou `|`.
- **Um** `<h1>`, no hero, com a promessa. `h2` por seção, sem pular nível.
- `alt` descreve a imagem para quem não a vê; `alt=""` em decorativa. Nada de
  `alt="imagem"` ou `alt="hero"`.
- Link precisa dizer para onde vai: nada de "clique aqui".
- JSON-LD compatível com o que a página mostra: `Organization` ou `LocalBusiness`
  sempre; `FAQPage` **somente** se as perguntas estão visíveis na página;
  `Product`/`Offer` com preço somente se o preço é real (nunca com `[MOCK]`).
  No destino HTML único, cada bloco precisa de `id="he-jsonld-{slot}"`.
- Destinos com múltiplos arquivos: gere `robots.txt` e `sitemap.xml` em `site/`.
- Acessibilidade é metade da nota e a parte que o Lighthouse mede de graça:
  contraste ≥ 4,5:1 em texto (≥ 3:1 em texto grande e em ícone informativo),
  `<label>` em todo campo, foco visível (`:focus-visible`), ordem de tabulação
  natural, `aria-expanded` em quem abre e fecha.

## 9. Como conferir antes de entregar

```bash
# Chrome DevTools → Lighthouse → Mobile → Analyze (com throttling padrão)
npx lighthouse http://localhost:8080 --preset=desktop --view    # opcional
node qualidade/verificar.mjs                                     # o que é estático
```

Uma checagem manual que pega quase tudo, no DevTools com throttling **Slow 4G**:

1. a maior coisa pintada no primeiro segundo é o que deveria ser (título e hero);
2. nada pula de lugar entre o primeiro e o terceiro segundo;
3. na aba Network, o maior arquivo do carregamento inicial não passa de 200KB;
4. a página inteira funciona com JS desligado (texto visível, links clicando).

Se o PageSpeed apontar algo depois disso, é caso pontual — não a lista de vinte
itens que este documento existe para evitar.
