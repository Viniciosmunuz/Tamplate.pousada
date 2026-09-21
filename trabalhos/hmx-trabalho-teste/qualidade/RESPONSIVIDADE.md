# Responsividade — o layout não espreme, ele se reorganiza

> **A regra que resume o documento:** quando a tela estreita, o conteúdo **muda
> de arranjo**. Ele não encolhe até caber. Uma grade de 3 colunas em 1200px não
> vira três colunas de 90px em 360px — ela vira uma coluna.

O defeito recorrente tem nome: **grade que espreme**. Três cards continuam lado
a lado a 400px, o título quebra em cinco linhas, o botão vaza, a imagem
achata. Ele nasce quase sempre de uma linha só de CSS, e as regras 1 e 2 abaixo o
matam.

Os valores (colunas, gaps, paddings, tamanhos por faixa) continuam vindo
medidos da `RECEITA-VISUAL.md`. Este documento diz **como** implementá-los para
que não quebrem entre as faixas medidas.

---

## 1. Grade que reorganiza sozinha

```css
/* ⛔ espreme: abaixo de 3×280+gaps, as colunas encolhem além do legível  */
grid-template-columns: repeat(3, 1fr);

/* ⛔ vaza: em 320px, o minmax de 280px + padding estoura o container      */
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

/* ✅ reorganiza em qualquer largura, sem media query                      */
grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
```

O `min(100%, 280px)` é a peça inteira: acima de 280px de espaço disponível a
coluna se comporta como `280px` mínimo e a grade quebra em linhas; abaixo disso o
mínimo vira `100%` e a coluna ocupa a largura toda em vez de estourar. **É a
forma padrão de toda grade deste projeto.**

Quando a contagem de colunas é informação de design (a referência mediu
exatamente 4 cards em uma linha no desktop), declare o número por faixa **e**
mantenha o piso intrínseco:

```css
[data-section="benefits"] .grid {
  display: grid;
  gap: var(--gap-card);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
}
@media (min-width: 769px) {           /* valor medido em desktop */
  [data-section="benefits"] .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
```

## 2. `minmax(0, 1fr)`, nunca `1fr` puro

`1fr` é `minmax(auto, 1fr)`, e `auto` respeita o tamanho mínimo do conteúdo — uma
palavra longa, uma URL, uma imagem larga, um `<pre>`. É por isso que a grade
"vaza" sem ninguém ter escrito uma largura.

- toda coluna de grade: `minmax(0, 1fr)`;
- todo filho de flex que contém texto: `min-width: 0`;
- todo filho de flex que contém texto em coluna: `min-height: 0` também.

## 3. Nada de altura fixa em bloco com texto

Card, seção, botão, badge: `min-height`, nunca `height`. Português é mais longo
que inglês — o título que cabe em uma linha na referência quase sempre ocupa duas
na tradução.

Para alinhar cards de conteúdos diferentes, **não** iguale alturas: use grade
(os itens já esticam por padrão) e empurre o rodapé do card com
`margin-top: auto` dentro de um `display: flex; flex-direction: column`.

## 4. Container fluido

```css
.wrap {
  width: min(100% - (var(--gutter) * 2), var(--wrap));
  margin-inline: auto;
}
:root { --gutter: clamp(16px, 5vw, 32px); }   /* limites vindos do medido */
```

Padding lateral fixo em px é o que faz o conteúdo colar na borda a 320px ou
sobrar a 1920px. O `--wrap` vem medido; o `--gutter` interpola entre o padding
mobile e o desktop medidos.

## 5. Tipografia fluida — entre os valores medidos, nunca inventados

```css
/* h1 medido: 56px no desktop, 32px no mobile                       */
--font-size-h1: clamp(2rem, 1.2rem + 4vw, 3.5rem);
```

Regras:

- o **mínimo** do `clamp` é o valor medido no menor breakpoint; o **máximo** é o
  medido no maior. Você interpola, não inventa;
- corpo de texto nunca abaixo de **16px** (iOS dá zoom no input abaixo disso) e
  nunca acima de ~20px;
- `line-height` **sem unidade** (`1.15`, `1.6`), para herdar proporcionalmente;
- entrelinha aperta conforme o texto cresce: título grande `1.05–1.2`, corpo
  `1.5–1.7`;
- comprimento de linha de leitura: `max-width: 65ch` em blocos de parágrafo
  longo;
- `text-wrap: balance` em títulos de até 4 linhas e `text-wrap: pretty` em
  parágrafos — barato, e resolve a viúva de uma palavra sozinha na última linha.

Espaçamento segue a mesma lógica:

```css
--space-section: clamp(48px, 8vw, 120px);   /* mobile medido → desktop medido */
```

## 6. Palavra longa não vaza

Português tem `desenvolvimento`, `responsabilidade`, `compartilhamento`, e a
copy tem URLs e e-mails. Em qualquer bloco que receba texto do usuário ou da
copy:

```css
overflow-wrap: anywhere;      /* quebra a palavra só quando não há alternativa */
```

Em `<h1>`/`<h2>`, teste a 320px antes de dar por pronto.

## 7. Mídia

```css
img, video, svg, canvas, iframe { max-width: 100%; height: auto; }
```

- `width` e `height` **sempre** no atributo do `<img>` (evita salto de layout —
  ver `PERFORMANCE-SEO.md`);
- `aspect-ratio` no CSS quando o recorte importa, com `object-fit: cover` e
  `object-position` escolhido para o assunto da foto;
- imagem de largura total dentro de card: o card precisa de `overflow: hidden`
  **só** se houver recorte real.

## 8. Nada de scroll horizontal, em nenhuma largura

O bug clássico é decoração posicionada fora do container. A correção **não** é
`overflow: hidden` no `body` — isso quebra `position: sticky` em toda a página.

```css
body { overflow-x: clip; }   /* clip, não hidden: preserva sticky */
```

E resolva a causa: elemento decorativo com `position: absolute` precisa de um
ancestral `position: relative` **e** de `overflow-x: clip` naquele ancestral.

Proibido: `width: 100vw` (inclui a barra de rolagem e gera 15px de vazamento no
Windows). Use `width: 100%`.

## 9. Alturas de viewport

`height: 100vh` no mobile mede a viewport **sem** a barra do navegador, então a
seção fica maior que a tela e o conteúdo desce para fora. Use:

```css
min-height: 100svh;   /* small viewport height */
```

E prefira `min-height` a `height` sempre — hero com conteúdo longo precisa poder
crescer.

## 10. Header

Um header com marca + navegação + CTA é o primeiro a quebrar. Regras:

- `white-space: nowrap` em marca, itens de nav e CTA (eles não podem quebrar em
  duas linhas);
- como consequência, o header **precisa** colapsar antes de espremer: um
  breakpoint extra entre 900 e 1024px é esperado e permitido, além das faixas do
  contrato;
- no modo compacto: **marca + hambúrguer só**. Nav e CTA saem juntos, e o CTA
  reaparece dentro do painel mobile;
- o painel mobile é `display: none` no desktop (senão o ✕ vaza no canto);
- o botão do menu tem `aria-expanded`, `aria-controls`, e área de toque ≥ 44×44px.

## 11. Alvos de toque

Botão, link de nav, item de FAQ, ícone social: **mínimo 44×44px** de área
clicável, com pelo menos 8px entre alvos vizinhos. Vale para o `<a>` de ícone,
que costuma ficar em 20px.

## 12. Onde a grade vira lista

Padrões de reorganização que funcionam (escolha pelo conteúdo, não por hábito):

| Desktop | Tablet | Mobile |
|---|---|---|
| 4 cards em linha | 2×2 | 1 coluna |
| 3 cards em linha | 3 ou 2, se o card for curto | 1 coluna |
| texto + imagem lado a lado | mantém, com imagem menor | empilha — **imagem antes** se ela explica, **texto antes** se ela ilustra |
| tabela de comparação | rolagem horizontal no wrapper | cards empilhados, um por coluna da tabela |
| sidebar sticky | vira bloco no fim | vira bloco no fim |
| menu horizontal | menu horizontal | hambúrguer |

Tabela larga que precisa continuar tabela:

```html
<div class="table-scroll"><table>…</table></div>
```
```css
.table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
```

## 13. As larguras que você precisa testar

As três faixas do contrato são o **estilo editável**, não o teste. Confira o
layout em:

**320 · 360 · 390 · 430 · 768 · 900 · 1024 · 1280 · 1440 · 1920**

A faixa **900–1100px** é a que mais quebra e a que quase ninguém abre: é onde o
header ainda está em modo desktop e já não cabe. 320px é o piso real (iPhone SE
antigo, e navegador com zoom de 200% em telas maiores cai perto disso).

Em cada largura, procure exatamente estes cinco defeitos:

1. barra de rolagem horizontal (`document.documentElement.scrollWidth > clientWidth`);
2. texto encostando na borda;
3. card com conteúdo espremido em vez de a grade ter quebrado;
4. título quebrando em mais linhas do que o desenho comporta;
5. botão ou badge vazando do container.

## 14. Movimento e faixa estreita

Animação pesada de scroll (parallax, pin, scrub) reduz ou desliga abaixo de
768px — ver `animations.md`/`animations-observed.md` e a política do `STARTER.md`.
E tudo respeita `prefers-reduced-motion: reduce`, com o estado final visível.

---

## Autoverificação

```bash
node qualidade/verificar.mjs
```

Ele pega o que é estático: `minmax` sem `min()`, `1fr` puro, `100vw`, `100vh`,
altura fixa, `<meta viewport>` ausente, imagem sem dimensões. **Ele não abre um
navegador** — as 10 larguras da §13 são olho, não script.
