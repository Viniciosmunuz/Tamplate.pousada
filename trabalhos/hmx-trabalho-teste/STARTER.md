# STARTER.md — Trabalho de redesign (gerado pelo HTMLmentor)

> **Este arquivo é o briefing executável e o ponto de entrada do trabalho.**
> Você, a IA de código que recebeu esta pasta, deve ler tudo
> antes de gerar qualquer coisa. O objetivo NÃO é copiar a página da referência
> nem a página do alvo: é **fundir** as duas em um projeto novo, melhor que ambas,
> 100% editável pela extensão HTMLmentor.
>
> - **De onde vem a COPY / estrutura narrativa:** pasta `alvo/`
> - **De onde vem o ESTILO / layout / animações:** pasta `referencia/` — a fonte
>   autoritativa do trabalho é **`referencia/RECEITA-VISUAL.md`** (snapshot da paleta,
>   tipografias, escala, espaçamento, formas, movimento e origens escolhidas).
>   Os `design-direction.md` individuais são as medições que sustentam a receita.
> - **Contrato de saída (só editabilidade, sem estilo):** `PROMPT_TEMPLATE.md`
> - **Regras de qualidade que valem em todo trabalho (leia antes de codar):**
>   `qualidade/PADROES-PROIBIDOS.md`, `qualidade/RESPONSIVIDADE.md` e
>   `qualidade/PERFORMANCE-SEO.md` — mais o verificador `qualidade/verificar.mjs`.

---

## Os três níveis de liberdade

O erro de leitura mais caro deste briefing é tratar tudo como igualmente
obrigatório, ou tudo como igualmente livre. São três níveis, e eles não se
misturam:

| Nível | O que é | Sua liberdade |
|---|---|---|
| **Sistema visual** | tema, paleta por papel, famílias e escala tipográfica, ritmo de espaçamento, raios, botão, linguagem de movimento | **nenhuma.** Vem medido, você aplica os valores |
| **Composição** | quais seções existem, em que ordem, com que anatomia e densidade | **dirigida.** A receita propõe; você pode desdobrar, agrupar ou acrescentar quando a copy pedir — registrando em `site/DECISOES.md` |
| **Repertório** | ícones, tratamento de imagem, microcopy, estados, detalhes que a referência não define | **sua**, dentro do sistema e das regras de `qualidade/` |

**Isto não é um clone com outro texto.** É o *sistema visual* de uma referência
aplicado a um conteúdo diferente. Uma página que fica indistinguível da
referência falhou pelo mesmo motivo que uma página que ignora a receita: as duas
deixaram de fazer a tradução. O que precisa ser reconhecível é a **linguagem**
(quem vê as duas percebe o mesmo repertório de cor, tipo e ritmo), não a página.

> **⚑ REGRA Nº 1 — TEMA:** respeite o **"Tema predominante"** no topo do
> `RECEITA-VISUAL.md`. Se a receita é CLARA, a página nova é CLARA (hero
> incluído); se é ESCURA, é ESCURA. **Não inverta o tema geral** por achar que o
> nicho "pede" outra coisa — um hero claro que vira escuro já é considerado errado.

---

## 0. Identidade do trabalho

| Campo | Valor |
|---|---|
| Projeto | `teste` |
| Tipo de página | `Landing page` |
| Segmento | `(não informado)` |
| Página-alvo (copy) | `(ver alvo/page-metadata.json)` |
| Referência (estilo) | `(removida quando o trabalho virou template: ver README.md)` |
| Gerado em | `2026-09-16T01:18:45.602Z` |
| Observações do usuário | `Nenhuma.` |

**Situação da copy neste trabalho:** **Copy consolidada de um site inteiro** (`alvo/copy-structure.md`, mapa em `alvo/site-map.md`, páginas em `alvo/paginas/`). Ela foi agregada de várias páginas completas, então é **muito maior do que cabe numa LP** e foi escrita para páginas onde cada texto tinha espaço inteiro. **Redimensionar contra o `referencia/copy-skeleton.md` não é opcional aqui:** corte para o tamanho de cada bloco, funda as seções conforme o arco da referência, e o que não couber mas for essencial vira link para uma página que continua existindo — não empilhe trinta seções nem ache que tudo tem de virar texto na LP. Fotos reais do site estão em `alvo/assets/` (veja `alvo/site-map.md`): use-as.

**Destino / stack:** HTML único — o contrato de saída está em `PROMPT_TEMPLATE.md` e na seção 5.

---





## 0.05. Tipo de página: **Landing page**

Este trabalho constrói uma página do tipo **Landing page**. As regras desse
tipo — o que a página tem, o que evitar, e como montar — estão em
**`TIPO-DE-PAGINA.md`** (raiz do trabalho). **Leia antes de estruturar as seções:**
ele ajusta o arco, a densidade e os componentes ao formato desta página, e
pode mandar encolher ou trocar blocos que o `copy-skeleton.md` previa para outro formato.

**Framework de copy:** a arquitetura de persuasão desta página (níveis de
consciência, diagnóstico tático, as 17 seções, marketing de premissa, as
sequências e o checklist) está em **`FRAMEWORK-COPY.md`**. Ele decide a *narrativa*;
a `referencia/design-direction.md` decide a *aparência* — a §0 do framework explica
como casar os dois. Leia-o antes de montar a sequência de seções.

**Rastreamento:** esta página já sai preparada para medir conversão. Ligue os
eventos conforme **`RASTREAMENTO.md`** (Pixel do Meta / GA4 / Clarity / GTM,
com a forma de plugar específica desta stack).

---

## 0.1. O molde da copy (leia antes de escrever qualquer texto)

`referencia/copy-skeleton.md` descreve **as proporções de texto da referência
base**:
quantas seções, em que ordem narrativa, quantos blocos por seção e de que tamanho
cada um, além da anatomia de cada card.

Se `receita-visual.json.recipe.sections` indicar origem B/C para uma seção, use o
arquivo apontado pelo campo `copySkeleton` daquela linha. Assim o layout de uma
origem nunca recebe, por acidente, a densidade de texto de outra.

Ele existe porque `design-direction.md` diz que uma seção é uma grade de 3 cards,
mas não diz que cada card comporta um título de 3 palavras e um parágrafo de 22.
Sem isso a copy sai em tamanho arbitrário e o layout medido para de servir:
headline quebrando em quatro linhas, cards de alturas díspares, seção vazia
porque ninguém escreveu o subtítulo que o desenho previa.

### A copy nunca chega encaixada — assuma isso

Qualquer que seja a origem do `alvo/`, o texto **não** foi escrito para este
layout:

| origem | para qual layout foi escrita |
|---|---|
| pacote `hmx-copy-*` | o layout do site de onde foi extraída — outro site |
| `.md` escrito pelo usuário | nenhum: quem escreveu não viu layout nenhum |
| `QUESTIONARIO.md` respondido | o texto nasce da entrevista, não do molde |

Isso é **deliberado**, não uma falha de quem preparou o trabalho. Pedir ao usuário que
escreva copy já dimensionada exigiria que ele decidisse o design antes de ter a
copy, e amarraria o texto a uma referência que ele ainda pode trocar. A ordem
correta é a que você tem em mãos: copy completa de um lado, layout medido do
outro, e a distribuição feita aqui — por você, que é quem enxerga os dois.

Então **assuma que a copy está fora de medida** e redistribua. Concretamente:

- um assunto longo demais para o slot **encolhe ou se divide** entre blocos
  vizinhos do mesmo papel;
- um assunto que não preenche o slot **se funde** com o adjacente, ou o bloco
  perde a linha que ficaria vazia;
- ordem de assuntos na copy **não é** ordem de seções: siga o arco do molde;
- títulos como `## promessa`, `## objecoes` no documento do usuário são
  **rótulos de assunto**, não nomes de seção. Mapeie-os para os papéis do molde.

⛔ **Redistribuir é mexer no texto, nunca no layout.** Criar seção nova, empilhar
bloco extra ou esticar um container para acomodar copy que sobrou é o defeito que
este trabalho existe para evitar — o layout foi medido de uma página que funciona. Se
depois de tentar ainda sobrar um assunto sem lugar, registre em
`site/DECISOES.md` e deixe de fora, em vez de inventar espaço para ele.

**Regras:**

- escreva cada bloco **dentro da faixa de palavras** do slot correspondente;
  estourar em ~30% já quebra o layout;
- onde o molde disser `N cards`, produza **exatamente N**, com a mesma anatomia
  em todos — se um tem ícone + título + texto, todos têm. Cards com quantidades
  de texto muito diferentes entre si é o defeito mais comum de copy gerada sem
  molde;
- preserve o **papel** de cada seção, não o assunto: `social-proof` continua
  sendo prova social mesmo que a prova mude de depoimento para número ou selo;
- se uma seção da referência não couber no novo nicho (ex.: urgência artificial
  numa página de saúde), **troque o propósito** e registre a troca — não apague
  em silêncio, porque o layout conta com aquele espaço.

> ⛔ As amostras de texto no `copy-skeleton.md` estão lá **apenas** para indicar
> tom e escala. Nunca reaproveite o texto da referência.

---

## 0.2. Auditoria de copy — passo obrigatório, não leitura opcional

A copy que chegou em `alvo/` **nunca foi validada**. Ou veio de um site antigo
que ninguém sabe se convertia — sobreviveu porque não foi revisada, não porque
funcionava —, ou foi escrita por uma IA que não conhecia o negócio, ou pelo dono,
que está perto demais do próprio produto.

Gerar HTML sobre copy fraca produz uma página bonita que não vende, e o defeito
fica invisível porque tudo *parece* certo.

Por isso, **antes de escrever a primeira linha de HTML**:

1. leia `copy/PRINCIPIOS.md` — os quatro testes e o ritmo da conversa;
2. identifique o nicho em `copy/nichos/index.json`, leia o arquivo
   correspondente e **declare a escolha** em `site/DECISOES.md`;
3. rode `copy/AUDITORIA.md` sobre a copy já integrada ao layout;
4. aplique as correções e registre-as.

**O arquivo do nicho tem precedência** sobre os princípios gerais em tudo que for
específico da profissão — e em profissão regulada (medicina, odontologia,
psicologia, advocacia) as restrições **não são estilo**: promessa de resultado,
antes e depois, depoimento de paciente e preço como chamariz expõem o cliente a
processo no conselho. Nenhuma escolha de conversão justifica isso.

> Se a auditoria não mudar nada, isso é sinal de alerta e não de sucesso: copy
> não auditada quase nunca passa em todos os testes.

---

## 0.3. Mandato sobre a copy — você tem autorização para melhorá-la

A copy que chega em `alvo/` é um **norte**, não uma camisa de força. Ela foi
escrita antes de existir este layout, quase sempre por outra pessoa e para outro
contexto. Tratá-la como intocável produz páginas obedientes e sem vida — e é
metade do motivo pelo qual uma geração precisa de vinte rodadas de correção.

### Você **pode**, sem pedir licença:

- **reescrever** headline, subtítulo, CTA e corpo para ficarem mais claros, mais
  concretos e mais agradáveis de ler;
- **redimensionar** blocos para caberem no slot medido (é obrigatório, aliás);
- **reordenar** seções quando o arco de persuasão pedir outra ordem;
- **desdobrar** um bloco denso em duas seções, quando ele carrega duas ideias que
  o layout consegue separar melhor;
- **agrupar** seções redundantes que dizem a mesma coisa duas vezes;
- **propor uma seção nova** que a copy não previu e que a página precisa — uma
  prova social onde só havia promessa, um "como funciona" onde faltava concretude,
  um bloco de objeções antes do CTA final;
- **escolher o repertório visual** de cada bloco (ícone, foto, número, citação,
  lista), dentro do que a receita mediu.

### Você **não pode**, em hipótese alguma:

- **inventar fato**: número, percentual, prazo, preço, garantia, quantidade de
  clientes, prêmio, certificação, nome de empresa, depoimento, foto de pessoa
  real, endereço, CNPJ;
- **mudar a promessa central**, o público ou a oferta;
- **prometer resultado** que a copy de origem não promete;
- **apagar em silêncio** uma informação que estava no `alvo/`.

### Quando propuser algo, marque e explique

Todo acréscimo vai para **`site/DECISOES.md`**, criado por você junto com a
página. Uma linha por decisão, neste formato:

```markdown
## Seções acrescentadas
- **Como funciona (3 passos)** — a copy pulava da promessa para o preço e o
  layout da referência tem uma seção de processo nessa posição. Conteúdo derivado
  do que já estava em `alvo/copy-final.md` §Serviços. **Remova se não quiser.**
- **Prova social** — [MOCK]: três depoimentos fictícios, marcados na página.
  Substitua pelos reais ou remova a seção inteira.

## Blocos reescritos
- Headline do hero: era "Soluções completas para sua empresa", virou "…" — a
  original não dizia o que era vendido.

## Dados marcados [MOCK]
- `+120 empresas atendidas` (hero)
- Depoimentos 1, 2 e 3 (prova social)
```

Regra do `[MOCK]`: **todo** dado inventado aparece marcado na própria página,
não só no relatório. Nada marcado pode ir ao ar. Se preferir não inventar,
desenhe o espaço reservado com o rótulo do que falta
(`[DEPOIMENTO: 2 linhas + nome + cargo]`) — muitas vezes é a escolha melhor.

> Se `alvo/copy-final.md` existe, ele é autoritativo sobre **fatos e mensagem**.
> Sobre **composição** — quantos blocos, em que seção, em que ordem — este
> mandato vale igual. Só não recorte de novo o que já foi dimensionado sem
> motivo: mexa onde o layout ou o arco pedem, e registre.

---

## 0.4. Ordem de execução — cinco passes, nesta ordem

Gerar a página inteira de uma vez e depois consertar é o que transforma um trabalho
em quarenta rodadas. Cada passe abaixo fecha uma classe de decisão antes de a
próxima começar.

**Passe 1 — Contrato e insumos.** Ler, nesta ordem: este arquivo,
`PROMPT_TEMPLATE.md`, `TIPO-DE-PAGINA.md`, `referencia/RECEITA-VISUAL.md` +
`receita-visual.json`, `referencia/copy-skeleton.md`, a copy do `alvo/`, e as
três regras de `qualidade/`. Se o trabalho traz entrevista ou questionário, conduza
**agora** — não depois de já ter HTML.

**Passe 2 — Esqueleto e tokens.** `site/` com o `<head>` completo (SEO da
§4.6 já preenchido), o `:root` inteiro traduzido da receita (cores por papel,
famílias, escala fluida com `clamp`, espaçamento, raios), o container fluido, os
botões com o `:hover` medido, e as `<section data-section>` vazias na ordem
decidida. **Nenhum conteúdo ainda.** É aqui que o sistema visual fica de pé — e
onde ele é mais barato de corrigir.

**Passe 3 — Seções, uma a uma.** Para cada seção: abrir o recorte dela em
`referencia/screenshots/`, ler a linha correspondente em `recipe.sections`,
escrever o markup, escrever o CSS junto (com as media queries da própria seção),
e só então passar para a próxima. Copy no tamanho do slot. Imagens já com
`width`/`height`/`alt`/`loading` corretos — não deixe para "otimizar depois".

**Passe 4 — Movimento.** As animações da origem registrada, em
`site/js/animations.js`, com `prefers-reduced-motion` e degradação graciosa.
Depois do conteúdo, nunca antes: animação sobre layout instável esconde bug.

**Passe 5 — Verificação.** Nesta ordem:

```bash
node qualidade/verificar.mjs          # o que é estático: slop, responsivo, perf, SEO
```

Depois, no navegador: as larguras da §13 de `qualidade/RESPONSIVIDADE.md`
(320 · 360 · 390 · 768 · 900 · 1024 · 1280 · 1920), o Lighthouse mobile, e a
comparação seção a seção com os recortes da referência. Corrija tudo que
aparecer **antes** de dizer que terminou. Só então escreva `site/DECISOES.md` e
o `site/README.md`.

> A meta é entregar no primeiro passe uma página que precise de ajuste de gosto,
> não de conserto. Se o `verificar.mjs` acusa erro, o trabalho não acabou.

---

## 1. O que fazer (em ordem)

> A ordem macro é a dos cinco passes da §0.4. Esta lista detalha o conteúdo de
> cada leitura e de cada decisão.

1. **Ler o contrato.** `PROMPT_TEMPLATE.md` é o **contrato de editabilidade** — só
   a estrutura que a extensão precisa para editar 100% do HTML. Ele **não tem
   opinião de estilo**: nenhuma regra dele deve sobrescrever a aparência resolvida em
   `RECEITA-VISUAL.md`. Onde parecer conflitar, a receita ganha na **forma**,
   o contrato ganha só na **estrutura** (variáveis `:root`, `data-section`, as 3
   media queries, classes `.btn-cta`). **Nenhuma regra de editabilidade é opcional.**
2. **Ler a copy do alvo.** Se existir **`alvo/copy-final.md`**, ela é a fonte
   **autoritativa dos fatos e da mensagem** — já foi reescrita e fatiada em blocos
   por seção, papel, estágio de persuasão e diretriz de imagem (via
   `COPY_PROMPT.md`/prompt de copy). Use a distribuição dela como ponto de
   partida; mexer nela é permitido nos termos da §0.3 (melhorar, desdobrar,
   acrescentar — registrando em `site/DECISOES.md`), nunca por capricho.
   Na ausência dela, leia `alvo/briefing.md`, `alvo/copy-structure.md`,
   `alvo/links-and-ctas.md`, `alvo/forms.md`, `alvo/content.json` (copy crua,
   ainda não refinada — aplique você mesmo os princípios de `COPY_PROMPT.md`
   antes de estruturar o HTML).
   > **Projeto do zero:** se `alvo/` contém apenas `copy.md` (ou `copy-final.md`)
   > + `briefing.md` apontando para ele, essa é a fonte única — não há
   > site-alvo. Extraia dela a promessa, público, benefícios, prova, objeções e
   > CTAs, e estruture as seções. Ela foi escrita **sem conhecer este layout**:
   > realinhe com `referencia/copy-skeleton.md` antes de verter para HTML.
   >
   > **Sem copy nenhuma:** se `alvo/` contém `QUESTIONARIO.md`, **pare e conduza
   > a entrevista antes de escrever qualquer linha de HTML.** As perguntas foram
   > geradas a partir da estrutura real da referência, então cada resposta
   > preenche um bloco que existe no layout.
   >
   > Conduza como conversa, não como formulário: peça o bloco obrigatório
   > (nicho, objetivo, público, diferencial, restrições), depois vá seção a
   > seção. Aceite respostas curtas e desorganizadas — transformar em copy é
   > seu trabalho, não de quem responde.
   >
   > **Atalho:** se a pessoa der só o nicho e o objetivo e pedir para seguir,
   > escreva a página inteira com dados fictícios plausíveis e marque **todo**
   > dado inventado com `[MOCK]` — número, preço, nome, depoimento, prazo,
   > endereço. Liste tudo que ficou marcado no fim do `copy-final.md`. Nada
   > marcado `[MOCK]` pode ir ao ar.
   >
   > Em qualquer um dos dois caminhos, consolide o resultado em
   > `alvo/copy-final.md` **antes** de gerar o HTML.
3. **Absorver a direção criativa.** Leia primeiro
   **`referencia/RECEITA-VISUAL.md`** + `referencia/receita-visual.json`
   (autoritativos para este trabalho). Depois consulte `referencia/design-direction.md`
   + `referencia/design-direction.json` e, numa fusão, as origens em
   `referencia/mix/` como evidência. Complementos:
   os `copySkeleton` apontados por `recipe.sections` (o molde da copy — ver seção
   0.1), `source.css`,
   o manifesto + os recortes exatos em `referencia/screenshots/`, e as animações em `animations.md`
   (lidas do código estático) + `animations-observed.md` (o que a página fez
   rodando: seções presas ao scroll e elementos que nunca ficaram visíveis).
4. **Copy.** Se `alvo/copy-final.md` existir, ela já foi reescrita e fatiada
   (não recorte de novo, só verta para HTML). Caso contrário, reescreva —
   não copie literal — melhorando clareza, promessa, prova e objeções usando o
   `briefing.md`. Manter idioma e intenção comercial do alvo em ambos os casos.
5. **Aplicar a direção criativa** aos tokens `:root` (ver seção 3) **e replicar a
   disposição de elementos de cada seção** nos 3 breakpoints (ver seção 2.1).
6. **Trocar as imagens** por mídia condizente com o novo nicho/copy (não reutilizar
   fotos da marca da referência). Mantenha proporções, recortes e posições.
7. **Recriar as animações** da origem registrada em
   `receita-visual.json.animations` (ver seção 4 — prioridade).
8. **Gerar os arquivos** (ver seção 5), rodar `node qualidade/verificar.mjs`,
   corrigir o que ele acusar, e só então o checklist final (seção 6).

---

## 2. Mapeamento de copy → seções

Use `alvo/copy-final.md` (se existir) como fonte da narrativa já pronta —
cada `##` do arquivo é uma seção, com Função, Estágio de persuasão, Imagem e
blocos tipados (`eyebrow`/`headline`/`subheadline`/`body`/`list-item`/`quote`/
`stat`/`cta`/`price`/`question`). Mapeie para o layout da referência começando
pelo 1:1 — os blocos já foram dimensionados para caber na seção. Onde o layout ou
o arco pedirem outra coisa, a §0.3 autoriza reescrever, desdobrar, agrupar ou
acrescentar; o que mudar entra no `site/DECISOES.md`.
Na ausência de `copy-final.md`, use `alvo/copy-structure.md` como fonte crua
e **reorganize você mesmo** para o ritmo de seções do `PROMPT_TEMPLATE.md`
(§11.2) e o layout da referência.

- Cada bloco/seção vira uma `<section data-section="..." id="...">` filha
  direta de `<main>`.
- `<h1>` único na hero, vindo da `headline` do hero em `copy-final.md` (ou da
  promessa principal do `briefing.md`).
- A diretriz de **Imagem** de cada seção em `copy-final.md` indica que tipo de
  mídia buscar/posicionar (`hero`, `person`, `product`, `icon`, `decorative`
  ou nenhuma) — reaproveite `assets/` para isso.
- CTAs do `alvo/links-and-ctas.md` (ou do campo `cta` de cada seção) viram
  `.btn-cta` (preserve destinos: `wa.me`, `mailto:`, `tel:`, formulários).
- Formulários do `alvo/forms.md` reconstruídos com os mesmos campos/`name`.

> **Regra:** a copy é do alvo, o esqueleto visual é da referência. Onde
> conflitarem, copy ganha em conteúdo, referência ganha em forma.

### 2.1. Disposição de elementos (replicar fielmente)

A lista `recipe.sections` de `receita-visual.json` registra a origem A/B/C
escolhida para cada seção. O `layouts.sections` do mesmo arquivo já contém a
medição composta correspondente, nos 3 breakpoints: grid/flex, nº de colunas,
gaps, paddings, `max-width`, alinhamento e centralização.

Os campos `sourceSectionKey`, `layoutSpec`, `copySkeleton` e `evidence` de cada
linha levam à seção exata da origem. `evidence.manifest` identifica o manifesto
autoritativo; `evidence.staticByTier` lista os recortes reais; `evidence.behavior`
registra `sticky`, pin, vídeo, canvas, hover ou expansão; e
`evidence.sequenceIds` aponta a coreografia capturada.

- **Reproduza o arranjo composto**, seção a seção. Se a origem escolhida usa
  *grid 3 colunas,
  gap 24px, max-width 1200px centralizado* na hero, a sua hero usa o mesmo.
- **Abra o recorte da própria seção antes de implementá-la.** O screenshot da
  página inteira é contexto, não evidência suficiente para decidir a anatomia.
  Se houver várias partes no mesmo tier, leia-as em ordem.
- Se `evidence.authority` for **`sequence`**, o recorte estático é apenas a capa.
  Abra no manifesto todas as sequências de `sequenceIds`, siga os quadros por
  `progress` e replique os estados intermediários. Não transforme uma pilha
  sticky, um pin ou uma mídia fixa em blocos sobrepostos só porque um quadro
  congelado apareceu assim.
- **Respeite o `tom` de cada seção** (☀️ claro / 🌑 escuro, com bg/texto medidos):
  um hero claro continua claro, uma seção escura continua escura. Não inverta.
- Mapeie as seções do alvo para os **papéis** detectados (`hero`, `benefits`,
  `social-proof`, `offer`, `faq`, `contact`…). Quando o alvo tiver mais (ou menos)
  blocos, reuse o padrão de layout do papel mais próximo.
- Respeite as transições entre breakpoints (ex.: grid 3→1 coluna no mobile).

### 2.2. Fidelidade contra o reflexo (erros observados)

As IAs de front-end têm reflexos que **sobrescrevem** o que foi medido. Contra
cada um, uma regra dura:

- **Header.** Reproduza o header medido em `design-direction.md` → *"Header /
  navegação"*. Se diz **CTA no header: NÃO**, não coloque botão nenhum lá. Não
  caia no *navbar-pílula-flutuante* genérico (barra branca arredondada solta do
  topo) a menos que a referência seja assim — confira o screenshot. O header
  costuma ser mais discreto do que o padrão que você geraria por hábito.
- **Não comprima o hero.** Se a referência tem um hero expansivo — muito respiro
  vertical, texto espalhado, escala grande — **reproduza essa amplitude**. Não o
  reduza a um hero-padrão compacto (título + subtítulo + dois botões centrados).
  O `space-section` e o `wrap` medidos são grandes por um motivo; use-os.
- **Densidade de texto.** Se um card na referência tem um rótulo curto e uma
  foto, **não** encha o mesmo card com três linhas de parágrafo. O tamanho de
  cada bloco está no `copy-skeleton.md` — respeite-o (ver §0.1).
- **Fotografia.** Se `design-direction.md` traz o aviso *"📷 Design conduzido por
  FOTOGRAFIA"*, releia-o: reproduzir esse layout com placeholder SVG geométrico
  é o erro que mais estraga o resultado. Use fotos reais de `assets/`, ou marque
  `[FOTO: descrição]`, ou recue para um tratamento tipográfico contido — nunca
  clip-art.

Antes de entregar, abra o `screenshots/desktop.png` lado a lado com a sua página
para o contexto geral **e compare individualmente cada seção escolhida com os
arquivos de `evidence.staticByTier`/`sequenceIds`**. Se estão "parecidos mas com
outro caráter", quase sempre é um destes quatro.

---

## 3. Direção criativa — referência → tokens

A fonte autoritativa é `referencia/RECEITA-VISUAL.md` (+
`receita-visual.json`). Ela traz as origens, as escolhas e o estado da resolução; os
`design-direction.*` individuais trazem as medições de apoio. A receita inclui
cores **medidas por uso real**, a escala
tipográfica e os estilos de botão. Mapeie para o naming do template
(`--color-*`, `--font-*`, `--space-*`, `--radius-*`).

- **Paleta:** leia `recipe.layers.paleta.selection.type`.
  - `reference` ou `manual`: a decisão já está resolvida. Use exatamente
    `direction.palette.roles` (`bg`, `surface`, `text`, `textHeading`, `muted`,
    `border`, `accent`, `primary`, `primaryHover`).
  - `ai-synthesis`: `direction.palette` é apenas um fallback operacional e
    **não pode virar a identidade final por acidente**. Sintetize uma paleta
    nova a partir das referências listadas em `selection.sources`, respeite
    tema/tom e os contrastes mínimos de `selection.constraints`, salve antes de
    codificar em **`site/design-tokens.json`** com os mesmos papéis e marque a
    resolução como `resolved`. Só então derive o `:root`, botões e auditoria.
  Em qualquer modo, **`--color-accent`** é a cor de marca vívida aplicada em
  CTAs e destaques; não a troque por um neutro porque o fundo é escuro.
- **Tipografias:** leia `recipe.layers.tipografia.selection`. Cada família foi
  escolhida separadamente como `families.primary`, `families.secondary` e
  `families.tertiary`; a escala vem de `selection.scale.source` e é uma escolha
  independente. Aplique `selection.mapping` aos níveis (títulos, corpo e
  acentos) e preserve até **três famílias** quando elas existirem. Não reduza
  tudo à origem da escala e não troque silenciosamente uma fonte por uma Google
  Font “parecida”. Se o arquivo/licença da fonte não estiver disponível,
  registre a indisponibilidade e peça a fonte ou uma substituição explícita.
- Espaçamento, raios, sombras e larguras de container → use os valores reais de
  `spacing`, `radii` e `shadows`.
- Botões → `.btn-cta` (primário) e `.btn-secondary` espelham `buttons.primary` e
  `buttons.secondary`, **incluindo o estado `:hover`**.
- `source.css` e `analysis.json` são apoio quando a direção não cobrir um caso.

**Nunca** use valores hardcoded fora de `:root`. **Nunca** Tailwind CDN.

---

## 4. Animações — PRIORIDADE (a vida da página)

> **Antes de olhar os screenshots:** abra `referencia/receita-visual.json` e
> siga os caminhos em `animations.spec`, `animations.observed`,
> `animations.screenshots` e `animations.sequences`. Eles apontam para a origem
> de movimento escolhida, que pode estar em `referencia/` ou em
> `referencia/mix/<nome>/`.
>
> Um print de página inteira é um quadro só. Seções presas ao scroll (pin do
> GSAP, pilha de `position: sticky` onde cada card desliza sobre o anterior)
> aparecem nele congeladas ou sobrepostas, e reproduzir o que se vê no print
> produz uma seção quebrada. Para essas, use os frames em
> `referencia/screenshots/sequences/`, em ordem numérica: eles mostram a
> coreografia.
>
> O mesmo arquivo lista elementos que **continuaram invisíveis** mesmo depois de
> a página ser percorrida inteira. Eles existem no layout e saem em branco nos
> prints — não conclua que a seção era vazia.

O arquivo indicado por `animations.spec` descreve as interações IX2/GSAP
(gatilho, alvo, estado inicial e tipo provável), e o Markdown irmão explica a
leitura. O arquivo em `animations.observed` registra pins e interações vistas
em execução. **Recrie essa linguagem** — não simplifique para fade genérico e
não invente duração/easing que a extração não observou.

`recipe.patterns` é a seleção feita no catálogo global: pode conter hover de
botão, fundo interativo, vídeo/background, galeria ou outro padrão vindo de uma
referência que nem está entre A/B/C. Cada item é um **snapshot declarativo e
inerte**, não código para copiar:

- preserve o comportamento e a geometria descritos em `spec`;
- remapeie cores de botões para a paleta final, como manda `adaptation.colors`;
- nunca copie texto, marca ou mídia da referência;
- nunca reinstale automaticamente uma dependência listada. Use-a apenas se já
  estiver vendada/permitida pelo contrato; caso contrário, implemente uma
  alternativa local ou registre o bloqueio;
- sinais e fingerprints em `detection` servem como evidência, não como script.

### Política técnica (decidida pelo projeto)

- **GSAP vendado localmente** em `./js/gsap.min.js` (+ `ScrollTrigger` se usado).
  **Nunca CDN.** Caminho relativo sempre.
- Lógica em `./js/animations.js` **legível e comentada**, uma animação por bloco.
- **Respeitar os 3 breakpoints** do template (449 / 450-768 / 769). Animações
  pesadas de scroll/parallax: reduzir ou desligar no mobile.
- **`prefers-reduced-motion: reduce`** → desligar tudo e mostrar estado final.
- **Não brigar com a extensão:** ela injeta um IntersectionObserver próprio para
  animações de entrada e remove `.he-anim-in` no export. Suas animações de entrada
  devem partir do estado final visível se o JS não rodar (degradação graciosa) —
  nunca deixar elemento preso em `opacity:0` sem o JS.
- Inicializar após `DOMContentLoaded`; idempotente (pode rodar de novo sem duplicar).

### Padrão de saída

```html
<!-- antes de </body> -->
<script src="./js/gsap.min.js"></script>
<script src="./js/ScrollTrigger.min.js"></script>
<script src="./js/animations.js" defer></script>
```

```js
// js/animations.js
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  // hero h1: fade-up on load — ver o arquivo indicado por animations.spec
  gsap.from('#hero h1', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' });
  // ... uma por entrada do animations.md
}
```

---

## 4.5. Padrões proibidos — o sotaque de IA

`qualidade/PADROES-PROIBIDOS.md` tem o catálogo completo, com o substituto de
cada item e o porquê. **Leia-o inteiro antes do passe 2.** As dez que mais
aparecem, para você já saber de cor:

1. **numeração decorativa `01 · 02 · 03`** em tópicos, cards ou passos → ícone
   SVG, badge com o papel do bloco (`Antes`, `Entrega`, `Incluso`), asset real,
   ou nada. Numere só quando a ordem for a informação;
2. **sombra no `:hover`** de card ou botão → use o `:hover` medido; na falta
   dele, mude **uma** coisa: fundo, borda ou cor do texto;
3. **botão que se move no `:hover`** (`translateY`, `translateX`, `scale`) →
   nunca. Deslocamento de 1px só em `:active`, e só se a referência tiver;
4. **risco/linha antes do eyebrow** (`::before` com `content:''`) → eyebrow é
   texto ou badge, classe `.eyebrow`;
5. **travessão longo `—`/`–`** em qualquer texto visível → vírgula, ponto,
   dois-pontos ou parênteses. Vale contra a referência e contra a copy;
6. **emoji como ícone** → SVG inline com `stroke="currentColor"`;
7. **blobs borrados, glows e gradientes de fundo não medidos** → fundo é
   `--color-bg`/`--color-surface`; gradiente só o que está na receita;
8. **`transition: all`** e animação de `width`/`height`/`margin` → declare a
   propriedade; anime só `transform` e `opacity`;
9. **dado inventado sem `[MOCK]`** → ver §0.3;
10. **cinco seções com a mesma anatomia** (eyebrow + h2 centralizado + 3 cards) →
    a variação de disposição está medida em `layouts.sections`; reproduza-a.

E a lista do **⚠️ não invente**: sombra, vidro fosco, texto em gradiente,
uppercase, badge no hero, dois CTAs, divisor em onda, contador animado, marquee,
cursor customizado. Cada um é legítimo **se a receita mediu**. Nenhum é padrão.

**Vocabulário:** nada de "Transforme seu negócio", "Soluções inovadoras",
"Próximo nível", "Descubra o poder de", "Vamos começar?", "Clique aqui". Toda
headline e todo CTA carregam uma informação específica do projeto.

---

## 4.6. Performance e SEO — decididos agora, não depois do PageSpeed

`qualidade/PERFORMANCE-SEO.md` traz o orçamento e a implementação. O ponto que
muda a ordem do seu trabalho: **isto é passe 2 e passe 3, não uma revisão final.**
Refazer `<head>`, imagens, fontes e JS depois da página pronta é reescrever a
página.

Orçamento: **LCP < 2,5s · CLS < 0,1 · INP < 200ms · < 1MB no primeiro
carregamento · HTML+CSS+JS < 200KB · imagem do hero < 200KB.**

O que precisa estar certo desde a primeira linha:

- imagem do hero é `<img>` (não `background-image`), com `fetchpriority="high"`,
  `decoding="async"` e **sem** `loading="lazy"` — lazy acima da dobra é o erro
  que mais atrasa o LCP;
- **toda** `<img>` com `width`, `height` e `alt` reais; as demais com
  `loading="lazy" decoding="async"`; AVIF/WebP com `srcset`/`sizes`;
- fontes: só os pesos que a escala medida usa, `display=swap`, `preconnect` para
  `fonts.gstatic.com` (ou self-host em `site/fonts/`);
- CSS sem `@import`, na ordem tokens → base → sections; JS com `defer`;
- terceiros (pixel, GA4, Clarity) depois do `load`; vídeo com `poster` e
  `preload="none"`; embed de mapa/YouTube por facade;
- `<head>` completo já no passe 2: `lang="pt-BR"`, `title` (~60 car.),
  `description` (140–160), `canonical`, Open Graph com `og:image` 1200×630,
  `twitter:card`, favicon;
- um `<h1>` só; `alt` que descreve; contraste ≥ 4,5:1; `<label>` em todo campo;
  foco visível; JSON-LD coerente com o que a página mostra (`FAQPage` só se a FAQ
  está visível; preço só se é real).

---

## 4.7. Responsividade — reorganizar, não espremer

`qualidade/RESPONSIVIDADE.md` tem as regras e a tabela de reorganização. O
defeito que este trabalho mais viu: **grade que espreme** — três cards continuam lado
a lado a 360px em vez de virar uma coluna. Ele quase sempre vem de uma linha:

```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));       /* ⛔ vaza */
grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));  /* ✅ */
```

Mais: `minmax(0, 1fr)` em vez de `1fr` puro; `min-width: 0` em filho de flex com
texto; `min-height` em vez de `height`; container em
`width: min(100% - 2*gutter, var(--wrap))`; tipografia e espaçamento em `clamp()`
**interpolando os valores medidos** (mínimo = o do menor breakpoint, máximo = o
do maior); `100svh` no lugar de `100vh`; `overflow-x: clip` no `body`, nunca
`hidden` (quebra `sticky`); alvo de toque ≥ 44×44px.

Confira em **320 · 360 · 390 · 768 · 900 · 1024 · 1280 · 1920**. A faixa
**900–1100px** é a que mais quebra e a que quase ninguém abre.

---

## 5.0. Onde criar os arquivos — REGRA DE PASTA (obrigatória)

Esta pasta de trabalho tem **insumos** e vai receber **uma entrega**. Não misture os
dois.

- **Insumos (não edite, não mova):** `referencia/`, `alvo/`, `assets/`, `js/`,
  `qualidade/`, `STARTER.md`, `PROMPT_TEMPLATE.md`, `COPY_PROMPT.md`, `README.md`.
  Se existir uma pasta `prompt/`, ela é a **rota alternativa** deste mesmo trabalho
  (prompts para construir a página numa plataforma online). Não é para você:
  ignore-a por completo, e nunca gere nada lá dentro.
- **Entrega:** **tudo que você gerar vai para uma pasta nova `site/`**, criada
  aqui dentro. `site/` é o projeto final — o que se publica. Nada gerado fica
  solto na raiz do trabalho.

Consequências práticas:

- o HTML, o CSS, o JS e as imagens do projeto ficam **dentro de `site/`**;
- o GSAP vendado está em `js/` (raiz do trabalho, um insumo). **Copie** os arquivos
  que usar para `site/js/` — o projeto publicado tem que ser autossuficiente,
  sem depender de subir um nível;
- as imagens de origem estão em `assets/` (insumo). **Copie** para
  `site/images/` (ou `site/public/images/` no Astro) só as que você de fato usar,
  com nomes descritivos;
- ao terminar, alguém deve poder pegar **só a pasta `site/`**, publicar, e ter a
  página funcionando — sem levar junto `referencia/`, `alvo/` ou este `STARTER.md`;
- dois arquivos de texto nascem **dentro** de `site/`, escritos por você no fim:
  **`site/DECISOES.md`** (o que você acrescentou, reescreveu e marcou `[MOCK]` —
  formato na §0.3) e **`site/README.md`** (como abrir, onde ficam os tokens, e o
  que ficou pendente).

A estrutura interna de `site/` é a que o destino descreve na seção 5 abaixo.

---

## 5. Destino: HTML único (editável na extensão HTMLmentor)

Arquivo único, sem build, sem framework, abrindo direto de `file://`.

**Tudo que você gerar vai para a pasta `site/`** (ver §5.0). Estrutura de `site/`:

```text
site/
├─ index.html              ← página inteira, no padrão PROMPT_TEMPLATE.md
├─ js/
│  ├─ gsap.min.js          (copie de ../js/ — vendado no trabalho, não baixar de CDN)
│  ├─ ScrollTrigger.min.js (copie de ../js/ se usar)
│  └─ animations.js        (suas animações, legíveis)
├─ images/                 (copie de ../assets/ as que usar; nomes descritivos)
└─ favicon.png
```

**Por que arquivo único:** a extensão HTMLmentor reescreve qualquer nó do
documento a partir da interface. Isso só funciona se HTML, CSS e conteúdo
estiverem no mesmo arquivo, seguindo as convenções do `PROMPT_TEMPLATE.md`.

Regras específicas deste destino:

- `index.html` autossuficiente exceto Google Fonts, mídia local e os JS acima;
- **todo** o CSS em um único `<style>` no `<head>`, com os tokens em `:root`;
- nada de `<link rel="stylesheet">` para arquivos locais, nada de bundler,
  nada de import de módulo;
- reaproveite imagens copiando de `../assets/` para `site/images/`; faltando
  alguma, deixe placeholder com `alt` correto e um comentário `<!-- TODO: imagem -->`;
- **cumpra o `PROMPT_TEMPLATE.md` integralmente.** Nenhuma regra de
  editabilidade dele é opcional — cada uma existe porque a extensão quebra sem.


---

## 6. Checklist final (rode antes de entregar)

**Primeiro, o que é automático:**

```bash
node qualidade/verificar.mjs
```

**Zero erros** é condição de entrega. Avisos podem ser aceitos, mas cada um
aceito conscientemente — e, se for decisão deliberada, com um
`verificar-ignore: <id>` no arquivo e a razão ao lado.

Depois, além do checklist completo do `PROMPT_TEMPLATE.md` §15, confirme:

**Qualidade de execução**

- [ ] Nenhuma numeração decorativa `01/02/03`; onde havia, entrou ícone, badge de papel, asset ou nada.
- [ ] Nenhum `:hover` com sombra ou deslocamento em card ou botão.
- [ ] Nenhum risco antes de eyebrow; nenhum travessão longo em texto visível.
- [ ] Nenhum gradiente, blur decorativo, vidro fosco ou uppercase que a receita não tenha medido.
- [ ] Nenhuma frase genérica de catálogo ("transforme seu negócio", "clique aqui"…).
- [ ] As seções variam de anatomia como `layouts.sections` mediu — não são cinco repetições do mesmo bloco.

**Responsividade**

- [ ] Aberto em 320, 360, 390, 768, 900, 1024, 1280 e 1920px: sem scroll horizontal, sem grade espremida, sem texto colado na borda, sem botão vazando.
- [ ] Toda grade usa `minmax(min(100%, Xpx), 1fr)` ou `minmax(0, 1fr)`; nenhum `1fr` puro.
- [ ] Tipografia e espaçamento em `clamp()` interpolando os valores medidos, não inventados.
- [ ] Header colapsa antes de espremer; painel mobile some no desktop; alvos de toque ≥ 44px.

**Performance e SEO**

- [ ] Imagem do hero é `<img>` com `fetchpriority="high"` e sem `lazy`; as demais com `lazy`.
- [ ] Toda `<img>` tem `width`, `height` e `alt` reais; formatos modernos com `srcset`.
- [ ] Fontes só nos pesos usados, com `display=swap` e `preconnect` (ou self-host).
- [ ] Sem `@import`; scripts com `defer`; nenhum recurso de CDN.
- [ ] `<head>` completo: `lang`, `title`, `description`, `canonical`, Open Graph, `twitter:card`, favicon.
- [ ] Lighthouse mobile rodado; LCP < 2,5s e CLS < 0,1 (ou o desvio registrado no `site/README.md`).

**Copy e decisões**

- [ ] `site/DECISOES.md` existe e lista seções acrescentadas, blocos reescritos e todo dado `[MOCK]`.
- [ ] Nenhum fato inventado sem `[MOCK]`; promessa, público e oferta são os do `alvo/`.
- [ ] Copy é do alvo (via `copy-final.md` ou reescrita própria) — não copiada literal da referência.

**Fidelidade e contrato**

- [ ] Tokens `:root` refletem a `RECEITA-VISUAL.md` (paleta por uso, fontes, raios).
- [ ] Se a paleta é `ai-synthesis`, `site/design-tokens.json` contém a paleta
      efetivamente resolvida; nenhum token final veio do fallback provisório.
- [ ] As famílias principal/secundária/terciária e a origem separada da escala
      refletem `recipe.layers.tipografia.selection`.
- [ ] A disposição de cada seção (grid/flex, colunas, gaps, max-width, alinhamento)
      bate com `receita-visual.json.layouts.sections` nos 3 breakpoints e respeita
      a origem A/B/C registrada em `recipe.sections`.
- [ ] Cada seção foi conferida no seu recorte exato; se a autoridade é
      `sequence`, todos os quadros ligados por `sequenceIds` foram considerados.
- [ ] `.btn-cta`/`.btn-secondary` espelham os botões da referência, com `:hover`.
- [ ] Cada item selecionado em `recipe.patterns` foi implementado com a paleta
      final, sem copiar código executável ou instalar dependências sozinho.
- [ ] Imagens são do novo nicho/copy — nenhuma foto ou logo da marca da referência.
- [ ] Cada item relevante do arquivo indicado por `receita-visual.json.animations.spec`
      tem correspondente em `animations.js`.
- [ ] GSAP é local (`./js/...`), nunca CDN.
- [ ] `prefers-reduced-motion` desliga as animações e nada fica invisível sem JS.
- [ ] Animações pesadas reduzidas/desligadas no mobile.
- [ ] Destinos de CTA e campos de formulário do alvo preservados.
- [ ] **Tudo gerado está em `site/`** — a raiz do trabalho não tem nenhum arquivo novo solto.
- [ ] GSAP e imagens usados foram **copiados** para dentro de `site/` (o projeto abre sozinho).
- [ ] Abrindo `site/index.html` a página funciona; a extensão HTMLmentor lê o projeto.

---

## 7. Limites e precedência

- Revise direitos de uso de textos e imagens (referência e alvo).
- A referência é inspiração de forma — não clone pixel-perfect nem copie a marca dela.

Quando dois documentos parecerem discordar, resolva nesta ordem:

1. **`qualidade/PADROES-PROIBIDOS.md`, nível ⛔ absoluto** — vale contra tudo,
   inclusive contra a referência e contra a copy. São poucos itens, e são
   inegociáveis por decisão do projeto.
2. **`PROMPT_TEMPLATE.md`** — nas regras de **estrutura de editabilidade** (variáveis
   em `:root`, `data-section`, as media queries, classes `.btn-cta`/`.eyebrow`).
3. **`referencia/RECEITA-VISUAL.md`** — em **aparência**: tema, paleta,
   tipografia, espaçamento, forma, movimento, disposição das seções.
4. **`TIPO-DE-PAGINA.md` e `FRAMEWORK-COPY.md`** — na **narrativa**: quais seções
   existem e em que ordem persuadem.
5. **`alvo/`** — nos **fatos e na mensagem**: promessa, público, oferta, provas,
   destinos de CTA.
6. **`qualidade/RESPONSIVIDADE.md` e `PERFORMANCE-SEO.md`** — na
   **implementação**, sempre que houver mais de um jeito de chegar ao mesmo
   resultado visual. Eles nunca são motivo para mudar a aparência medida: se o
   orçamento aperta, muda o formato do arquivo, o peso da fonte ou o volume de
   JS — não o design.
7. **Seu repertório** — só onde nenhum dos anteriores decidiu.
