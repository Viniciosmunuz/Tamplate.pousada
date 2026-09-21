# Contrato de editabilidade HTMLmentor — modo REDESIGN

> **Leia isto com uma regra em mente:** este documento define **apenas** o que a
> extensão HTMLmentor precisa para editar 100% do HTML. Ele **não tem opinião de
> estilo**. Toda decisão visual — tema claro/escuro, paleta, tipografia,
> espaçamento, formato de botão, nav, ritmo de seções, animações, se existe
> sticky de WhatsApp, se botões têm seta, se textos são em maiúsculas — vem
> **exclusivamente** de `referencia/design-direction.md` (+ screenshots).
>
> **Precedência:**
> - **Aparência / estilo / layout →** manda `referencia/design-direction.md`.
> - **Estrutura de editabilidade (as regras abaixo) →** manda este documento.
>
> Onde parecerem conflitar: a referência ganha na **forma**; este contrato ganha
> só na **estrutura que a extensão lê**. Nunca use uma "boa prática de design"
> deste tipo de guia genérico para sobrescrever o que foi medido da referência.
>
> **Fora deste contrato há um terceiro conjunto de regras**, transversal a todas
> as stacks, em `qualidade/`: `PADROES-PROIBIDOS.md` (o sotaque de IA e o
> substituto de cada tique), `RESPONSIVIDADE.md` e `PERFORMANCE-SEO.md`. As
> proibições marcadas ⛔ lá valem inclusive **contra** a referência — são as
> únicas que valem. Rode `node qualidade/verificar.mjs` antes de entregar.

---

## 1. Arquivo

- **Um único HTML autossuficiente.** Sem bundlers, sem frameworks JS
  (React/Vue/Svelte/Alpine), **sem Tailwind via CDN**, sem `<div style="...">`.
- Dependências externas permitidas: **Google Fonts**, mídia local e os JS de
  animação vendados (`./js/*`).
- Nada de `base64` em `src` — sempre caminho relativo (`./images/...`).

## 2. Variáveis em `:root` (aba Global depende disso)

Todas as cores, fontes, tamanhos, espaçamentos e raios ficam como variáveis em
`:root`. **Nada de valor hardcoded fora do `:root`** — use sempre `var(--*)`.
A extensão categoriza pelo nome; siga os prefixos:

| Categoria | Prefixo |
|---|---|
| Cor | `--color-*` |
| Fonte (família) | `--font-*` |
| Tamanho de fonte / leading | `--font-size-*`, `--leading-*`, `--tracking-*` |
| Espaçamento | `--space-*`, `--gap-*` |
| Raio | `--radius-*` |

> **Os VALORES vêm do `design-direction.md`** (bloco `:root` sugerido, paleta por
> papel, escala tipográfica, espaçamento, raios). Não invente uma escala nova nem
> use cores de exemplo genéricas. Copie a identidade medida da referência.

## 3. Estrutura semântica

```html
<body>
  <header>…</header>            <!-- FORA do <main> -->
  <main>
    <section data-section="hero" id="hero">…</section>
    <section data-section="…" id="…">…</section>
  </main>
  <footer>…</footer>            <!-- FORA do <main> -->
</body>
```

- Cada bloco da página é `<section data-section="Nome legível" id="slug">`, filho
  **direto** de `<main>`.
- **Um único `<h1>`**, dentro do hero. Demais títulos: `<h2>`/`<h3>`.
- `<header>`, `<nav>`, `<footer>` **nunca** dentro de `<main>`.
- Imagens de conteúdo em `<img alt="...">` (alt sempre presente). Ícones em `<svg>`
  inline. Backgrounds só para decoração.

> **O número, a ordem, o nome e o layout das seções seguem
> `design-direction.md` (§ Disposição por seção) e a copy do alvo** — não este
> contrato.

## 4. CTAs — classes obrigatórias, aparência da referência

- Botão primário: **classe `.btn-cta`**. Secundário: **`.btn-secondary`**.
  A extensão detecta os CTAs por essas classes — são obrigatórias.
- **A APARÊNCIA do botão vem 100% do `design-direction.md`** (seção "Botões":
  bg, cor, raio, padding, borda, tipografia, `text-transform`, sombra, `:hover`).
  Se a referência usa botão retangular, sem seta e sem maiúsculas, faça assim.
  **Não** imponha pílula/seta/uppercase/sticky por conta própria.
- Preserve os destinos dos CTAs vindos da copy (`wa.me`, `mailto:`, `tel:`, form).

## 5. Responsividade — 3 faixas isoladas (obrigatório)

A extensão edita em três faixas que **não se sobrepõem**. Use **exatamente** estas
media queries (a base, sem media, vale para todas):

```css
/* Mobile */   @media (max-width: 449px) { … }
/* Tablet */   @media (min-width: 450px) and (max-width: 768px) { … }
/* Desktop */  @media (min-width: 769px) { … }   /* sem teto: vale 1920+ */
```

- **Não** use classes responsive Tailwind (`sm:`/`md:`/`lg:`) nem `@container` —
  a extensão não os edita.
- Os 3 tiers valem para o **estilo editável**. Eles **não** são desculpa pra
  entregar layout quebrado: um **breakpoint extra é permitido e esperado** para
  integridade estrutural — em especial **compactar o header (900–1024px)**. E
  onde der, prefira o que não precisa de breakpoint nenhum:
  `repeat(auto-fit, minmax(240px, 1fr))` e `clamp()` funcionam em toda largura.
- **Os valores por faixa** (colunas, gaps, paddings, tamanhos) vêm da disposição
  por seção medida em desktop/tablet/mobile no `design-direction.md`.

## 6. `<head>`, SEO e JSON-LD

- `<meta charset>`, `<meta name="viewport" content="width=device-width, initial-scale=1">`,
  `<title>`, `<meta name="description">`, `<link rel="icon" href="./favicon.png">`.
- Se incluir JSON-LD, cada bloco **precisa** de `id="he-jsonld-{slot}"`
  (ex.: `he-jsonld-organization`) — senão a extensão não o gerencia.

## 7. Animações

- GSAP **vendado localmente** em `./js/` (nunca CDN). Lógica legível em
  `./js/animations.js`. Recrie a sensação descrita em `referencia/animations.md`.
- **Degradação graciosa:** elementos de entrada partem do **estado final visível**
  se o JS não rodar — nunca deixe algo preso em `opacity:0` sem JS. A extensão
  injeta o próprio IntersectionObserver e remove `.he-anim-in` no export; não
  brigue com isso.
- Respeite `prefers-reduced-motion: reduce` (desliga tudo, estado final visível).
- **Faixa animada / marquee** (frases rolando ou esteira de logos): use **exatamente**
  a estrutura `.he-marquee` que a extensão reconhece — raiz `.he-marquee`
  `data-he-marquee="1"` `data-kind="text|logos"` com custom props `--he-mq-bg/-color/-size/-gap`;
  `.he-marquee__track` (animation-duration inline); **dois** `.he-marquee__group` idênticos
  (2º `aria-hidden`); itens `.he-marquee__item` + separador `.he-marquee__sep`; logos
  `.he-marquee__logo`; keyframe `@keyframes he-marquee-scroll{to{transform:translateX(-50%)}}`.
  **Não crie** classes próprias (`.ticker`, `.brands`) — só seriam adotadas/convertidas
  na 1ª edição. (Formato completo com CSS no template base, §11.3b.)

## 8. Proibições (só as que quebram a edição)

- ❌ Tailwind CDN / frameworks JS / bundlers / `@container` / classes `sm:`/`md:`/`lg:`.
- ❌ **Scroll horizontal em qualquer largura entre 320 e 1920** — o que mais
  quebra é a faixa **700–1100px**, entre os tiers, que quase ninguém testa.
- ❌ **`1fr` puro em grid** (tem `min-width:auto` e vaza): use `minmax(0, 1fr)`.
  Filho de flex/grid sem `min-width: 0` também vaza.
- ❌ **Hamburger na tela com CTA sobrando do lado.** No modo compacto fica só
  marca + hamburger: nav **e** CTA escondidos, com o CTA repetido dentro do menu
  mobile. E o painel mobile é `display:none` no desktop (senão o ✕ vaza).
- ❌ **Item de header quebrando linha.** `white-space: nowrap` em nav, marca e CTA.
- ❌ Valor hardcoded fora de `:root`; estilo inline `style="..."`.
- ❌ `base64` em `src`; `<header>/<nav>/<footer>` dentro de `<main>`; mais de um `<h1>`.
- ❌ JSON-LD sem `id="he-jsonld-{slot}"`.

**Regras absolutas de conteúdo (valem MESMO contra a referência):**

- ❌ **Traço/travessão longo `—` (ou `–`) em qualquer texto visível.** Reescreva
  com vírgula/ponto/parênteses. Vale mesmo que a referência use travessão.
- ❌ **Risco/linha antes de eyebrow** (`::before` com `content:''` desenhando um
  traço). Eyebrow é só texto ou badge; use a classe `.eyebrow`. Ignore o
  risquinho da referência.
- ✅ **CTA primário sempre `.btn-cta`; eyebrow sempre `.eyebrow`** (classes
  consistentes, pra extensão aplicar estilo a todos de uma vez).
- ✅ Se a página tiver **header com nav**, ele precisa virar **menu mobile** ao
  estreitar (não deixar espremer logo/nav/CTA). Página de vendas direta pode
  não ter header/nav.

> Fora estas regras, **não há proibição de estilo.** Numeração de passos, formato
> de nav, número de fontes, sticky buttons — decisão da **referência**.

## 9. Checklist (editabilidade)

- [ ] HTML único; sem Tailwind CDN / framework / bundler.
- [ ] `:root` com cores/fontes/tamanhos/espaços/raios **vindos do design-direction**; nada hardcoded fora dele.
- [ ] `<main>` com `<section data-section id>`; header/footer fora; um só `<h1>`.
- [ ] `.btn-cta`/`.btn-secondary` presentes; **aparência espelha a referência**.
- [ ] As 3 media queries exatas (449 / 450-768 / 769).
- [ ] Imagens com `alt`, caminho relativo; JSON-LD com `id="he-jsonld-*"` se houver.
- [ ] Abre na extensão e as abas Global, Seções e SEO leem o projeto.
- [ ] **O visual bate com a referência** (tema, paleta, tipografia, disposição), não com este contrato.

---

**Resumo:** este documento garante que a extensão **consiga editar** a página.
Quem decide **como a página se parece** é a `referencia/design-direction.md`.
