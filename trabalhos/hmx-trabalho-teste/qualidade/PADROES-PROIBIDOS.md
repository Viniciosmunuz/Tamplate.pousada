# Padrões proibidos — o sotaque de IA

> **Leia antes de escrever a primeira linha de CSS.** Este documento não é sobre
> gosto: é a lista dos tiques que fazem uma página gerada por IA ser reconhecida
> como gerada por IA em três segundos. Cada um deles já custou rodadas de
> correção manual neste fluxo. Eles não voltam.

Há dois níveis de regra aqui, e a diferença importa:

| Nível | Significado |
|---|---|
| ⛔ **Absoluta** | Proibido **mesmo que a referência faça**. Não há exceção, não há "mas a referência…". |
| ⚠️ **Não invente** | Permitido **somente** se a `RECEITA-VISUAL.md` / `design-direction.md` mediu isso na referência. Se não está medido, você está inventando — e inventar aqui é o defeito. |

O princípio único que gera as duas listas: **você não tem licença estética
própria neste trabalho.** A identidade vem medida da referência; o que a referência
não define, você resolve com a solução mais simples que existir, nunca com a
mais "impressionante". Quando estiver em dúvida entre duas soluções, escolha a
que tem menos efeito.

---

## 1. ⛔ Numeração decorativa `01 · 02 · 03`

**O tique:** todo tópico, benefício, passo, card ou coluna ganha um numeral
grande, geralmente com zero à esquerda, geralmente em cinza-claro ou em outline,
geralmente ocupando um terço do card.

**Por que sai errado:** numerar é a saída preguiçosa para "este card precisa de
algum elemento visual". Ela promete sequência onde não há sequência — três
benefícios não acontecem em ordem — e o resultado é uma página que parece um
índice de apostila. Repetida em quatro seções, vira assinatura.

**Proibido:**

```html
<!-- ⛔ -->
<div class="card"><span class="num">01</span><h3>Diagnóstico</h3></div>
```

```css
/* ⛔ — mesma coisa por CSS */
.card { counter-increment: passo; }
.card::before { content: "0" counter(passo); font-size: 64px; opacity: .12; }
```

**Substitutos, nesta ordem de preferência:**

1. **Ícone SVG inline** de traço, herdando `currentColor`, no tamanho do texto
   (20–28px), sem círculo colorido atrás — um por card, semanticamente ligado ao
   conteúdo daquele card;
2. **Badge de texto curto** com o papel real do bloco (`Antes`, `Durante`,
   `Entrega`, `Incluso`, `Etapa final`) — informa em vez de contar;
3. **Badge de texto + ícone**, quando o rótulo sozinho ficar seco;
4. **Asset real** (foto, recorte, ilustração do nicho) quando o layout medido
   reservou área de imagem naquele card;
5. **Nada.** Título e texto bastam. Um card sem enfeite é melhor que um card com
   um número inventado.

**A única exceção:** quando a sequência é o conteúdo — um passo a passo em que a
ordem é informação real ("primeiro isto, depois aquilo"). Aí numere, mas **sem
zero à esquerda, no tamanho do texto, dentro da linha do título**, não como
marca-d'água de fundo.

---

## 2. ⛔ Sombra no `:hover` de card e de botão

**O tique:** `box-shadow` que aparece, cresce ou muda de cor quando o ponteiro
entra no elemento — quase sempre acompanhada de um deslocamento vertical.

**Por que sai errado:** é o efeito "card flutuando" de template de 2019. Some no
mobile inteiro (não há hover), custa repaint em cada movimento do mouse, e sinaliza
elevação onde não há hierarquia nenhuma. Somado ao item 3, é o par que mais
denuncia geração automática.

```css
/* ⛔ todas estas */
.card:hover  { box-shadow: 0 20px 40px rgba(0,0,0,.15); }
.btn-cta:hover { box-shadow: 0 10px 30px rgba(255,90,31,.4); } /* sombra colorida: pior ainda */
.card:hover  { box-shadow: 0 0 0 1px var(--color-accent), 0 12px 24px …; }
```

**O que fazer no lugar:** o `:hover` medido da referência — a extração já leu o
estado `:hover` do CSSOM e ele está na receita. Se a referência não tem hover
declarado para aquele elemento, use **uma** destas mudanças, e só uma:

- cor de fundo (o próprio `primaryHover` da paleta);
- cor da borda;
- cor do texto/ícone;
- sublinhado (em link);
- `filter: brightness(.94)` — último recurso, quando não há token de hover.

Transição de **120–200ms**, `ease-out`, e só nas propriedades que mudam
(`transition: background-color .16s ease-out`, nunca `transition: all`).

---

## 3. ⛔ Botão que se move no `:hover`

**O tique:** `transform: translateY(-2px)` / `translateX(4px)` / `scale(1.05)` no
botão, no card, ou na seta dentro do botão.

**Por que sai errado:** move o alvo debaixo do ponteiro, causa micro-jitter em
trackpad, e some no toque. É gratuito: nenhum sistema de design sério empurra o
botão para cima quando você o encara.

```css
/* ⛔ */
.btn-cta:hover        { transform: translateY(-2px); }
.btn-cta:hover .arrow { transform: translateX(4px); }
.card:hover           { transform: scale(1.03); }
```

**Permitido:** `:active` pode ter um deslocamento de **1px** para dar retorno
tátil ao clique, se a referência tiver algo assim. Movimento em `:hover`, não.

**Zoom de imagem dentro de card** (`.card:hover img { scale: 1.04 }`) entra em
⚠️ **não invente**: é aceitável quando a referência faz e a imagem tem
`overflow: hidden` no container. Fora disso, não.

---

## 4. ⛔ Risco/linha antes do eyebrow

**O tique:** o `::before` com um traço de 24–48px antes do texto de sobrelinha,
ou o eyebrow escrito como `— Nossos serviços`.

**Por que sai errado:** é decoração sem função, quebra em telas estreitas, e
aparece em cinco seções da mesma página. Já é regra absoluta do contrato de
editabilidade; aqui ela vale para **todos** os destinos.

```css
/* ⛔ */
.eyebrow::before { content: ''; width: 40px; height: 2px; background: var(--color-accent); }
```

**O que fazer:** o eyebrow é **texto puro** ou **badge**. Se precisa de destaque,
use cor, peso, `letter-spacing` medido ou um fundo de badge — não um risco.
Classe sempre `.eyebrow`.

---

## 5. ⛔ Travessão longo (`—`, `–`) em texto visível

Reescreva com vírgula, ponto, dois-pontos ou parênteses. Vale mesmo que a
referência ou a copy de origem usem travessão. Em `<title>` e `meta description`
também.

A regra é sobre **o texto que aparece na página gerada**. Os documentos do trabalho
(este inclusive) usam travessão à vontade — eles não vão ao ar.

---

## 6. ⛔ Emoji como ícone de interface

**O tique:** 🚀 no card de performance, ✨ no badge do hero, 💡 na dica, ✅ na
lista de inclusos.

**Por que sai errado:** renderiza diferente em cada sistema, não herda cor nem
peso, quebra o alinhamento vertical e envelhece a página instantaneamente.

**O que fazer:** SVG inline de traço, `stroke="currentColor"`,
`stroke-width` entre 1.5 e 2, tamanho colado na escala tipográfica. Emoji só se
for **conteúdo** (um depoimento em que a pessoa escreveu um emoji, por exemplo).

---

## 7. ⛔ Blobs, glows e gradientes de fundo não medidos

**O tique:** círculos borrados (`filter: blur(120px)`) atrás do hero,
`radial-gradient` roxo/azul saindo do canto, `linear-gradient(135deg, …)` em
seção que a referência mediu como cor sólida, texto com
`background-clip: text` degradê.

**Por que sai errado:** é o plano de fundo padrão de todo template de IA. Custa
composite layers caros no scroll, arruína o contraste do texto por cima em
metade das telas, e não sobrevive à troca de paleta — que é justamente o que este
sistema promete (`tokens.css` troca, a página se veste de novo).

```css
/* ⛔ quando não está na receita */
.hero { background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); }
.hero::after { filter: blur(140px); background: var(--color-accent); opacity:.4; }
h1 .destaque { background: linear-gradient(90deg,…); -webkit-background-clip: text; color: transparent; }
```

**O que fazer:** fundo é `--color-bg` / `--color-surface`. Gradiente **existe**
se `RECEITA-VISUAL.md` registrou gradiente — e aí você usa os stops medidos, nas
mesmas superfícies em que a referência usa. Nada de "dar uma vida" ao fundo.

---

## 8. ⛔ Dado inventado sem marcação

Número de clientes, anos de mercado, percentual de resultado, nome de empresa em
"trusted by", depoimento, foto de pessoa, preço, prazo, endereço, CNPJ. Se o
`alvo/` não tem, você **não sabe**.

Duas saídas, ambas explícitas:

- marcar `[MOCK]` no texto e listar no `site/DECISOES.md`; ou
- desenhar a seção com o espaço reservado e um rótulo claro do que falta
  (`[FOTO: cliente usando o produto]`, `[DEPOIMENTO: 2 linhas + nome + cargo]`).

Nada marcado `[MOCK]` pode sair da página sem o usuário ver a lista. Ver o
mandato de copy no `STARTER.md`.

---

## 9. ⛔ `transition: all` e animação em propriedade de layout

`transition: all` anima o que você não previu (inclusive `height` e `width`) e
força layout a 60fps. Animar `top`, `left`, `width`, `height`, `margin` ou
`padding` faz o mesmo.

**Anime só `transform` e `opacity`.** Declare a transição por propriedade. Para
altura variável (acordeão de FAQ), use `grid-template-rows: 0fr → 1fr` ou
`<details>` nativo, não animação de `height`.

---

## 10. ⛔ Ritmo monótono de seção

**O tique:** cinco seções seguidas com exatamente a mesma anatomia — eyebrow
centralizado, `h2` centralizado, subtítulo centralizado, grade de 3 cards
idênticos. Muda o texto, não muda nada mais.

**Por que sai errado:** a página perde hierarquia; tudo tem o mesmo peso, então
nada tem peso. É o resultado natural de gerar seção por seção sem olhar a
página inteira.

**O que fazer:** a alternância vem medida — `receita-visual.json.layouts.sections`
tem a disposição real de cada seção da referência (colunas, alinhamento,
tom claro/escuro, largura de container). Reproduza **essa** variação. Se duas
seções vizinhas caírem na mesma anatomia, confira se você não caiu no padrão por
inércia: alterne alinhamento, largura do container, tom de fundo ou densidade
conforme o medido, e verifique o resultado lendo a página de cima a baixo, não
seção a seção.

---

## 11. ⚠️ Não invente — a lista

Cada item abaixo é legítimo **se medido**. Nenhum é padrão.

| Padrão | Só use se… |
|---|---|
| `box-shadow` em card/botão (estado normal) | a referência tem sombra medida — use os valores dela, não uma sombra "suave" sua |
| `backdrop-filter` / vidro fosco | a referência tem, e o fundo atrás justifica |
| Borda ou texto com gradiente | está na receita |
| `text-transform: uppercase` + `letter-spacing` | está na escala tipográfica medida |
| Badge "✨ Novo" / pill flutuante no hero | está no `copy-skeleton` da referência |
| Dois CTAs no hero (primário + "saiba mais") | o `alvo/links-and-ctas.md` tem dois destinos reais |
| Divisor SVG em onda/diagonal entre seções | a referência tem |
| Contador animado de números | a referência tem **e** o número é real |
| Barra de progresso, contador regressivo, "vagas restantes" | o tipo de página é `vendas` **e** a escassez é real (ver `TIPO-DE-PAGINA.md`) |
| Botão sticky de WhatsApp | está na referência ou na copy do alvo |
| Cursor customizado, partículas, WebGL | está na receita, com a dependência já permitida |
| Ícone dentro de círculo colorido de 48px | a referência faz assim |
| Marquee/esteira de logos | a referência tem, e os logos são reais |
| `border-radius` grande e uniforme em tudo | é o raio medido |

---

## 12. Microcopy: as frases que denunciam

Não escreva, em nenhuma hipótese:

> "Transforme seu negócio" · "Soluções inovadoras" · "Leve sua empresa ao próximo
> nível" · "Descubra o poder de…" · "Vamos começar?" · "Simples assim." ·
> "Feito para você" · "A revolução chegou" · "Não perca mais tempo" ·
> "Entre em contato e saiba mais"

São frases que servem para qualquer negócio, e por isso não servem para nenhum.
Toda headline, subtítulo e CTA precisa conter **uma informação específica do
projeto**: o que é, para quem, o que muda, ou o que acontece ao clicar. CTA
descreve a ação real (`Ver planos`, `Agendar diagnóstico`, `Baixar o modelo`),
não o entusiasmo.

O `FRAMEWORK-COPY.md` (quando o trabalho o traz) manda na estrutura de persuasão.
Este parágrafo manda no vocabulário.

---

## 13. Autoverificação

Antes de dizer que terminou:

```bash
node qualidade/verificar.mjs
```

Ele varre `site/` e acusa boa parte do que está acima — numeração, sombra em
hover, translate em hover, risco de eyebrow, travessão, gradiente não previsto,
emoji, `transition: all`, além das checagens de responsividade e performance.

O que ele **não** vê: se a página está bonita, se o ritmo das seções varia, se a
copy diz algo. Isso é leitura sua, com o screenshot da referência ao lado.
