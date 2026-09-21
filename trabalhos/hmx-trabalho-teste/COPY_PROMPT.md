# Prompt mestre — reescrita de copy para landing page (HTMLmentor)

> **Como usar:** cole este documento inteiro numa IA (Claude, ChatGPT etc.)
> junto com os arquivos de entrada disponíveis (`copy-structure.md` e/ou
> `briefing.md`, OU um rascunho único em `copy.md`). Peça que ela devolva um
> único arquivo: `copy-final.md`, seguindo exatamente o formato da seção 9.
>
> Este prompt **não define nada de visual** (cor, fonte, paleta). Ele define
> o **conteúdo E a composição**: quanto texto cabe em cada bloco, **que
> arquétipo de layout cada seção vai usar** (grid, cards, lista, faixa de
> números...), quantos itens preenchem esse layout, quais pedem imagem, e em
> que ordem a informação convence o leitor até a conversão. Quem decide a
> aparência (cor, fonte, espaçamento) é o `design-direction.md` da
> referência; quem decide a estrutura de edição é o `PROMPT_TEMPLATE.md`.
> Este documento decide a **matéria-prima e a composição** que preenche essa
> estrutura — por isso todo bloco de texto vem com uma indicação explícita de
> como ele se organiza visualmente, não apenas "um texto e pronto".

---

## 1. Por que este passo existe

Copy extraída de um site antigo (ou escrita de improviso) costuma vir com
três problemas ao mesmo tempo:

- **Dimensionamento ruim:** blocos gigantes (parágrafos de 5-8 linhas) que
  viram parede de texto, ou fragmentos soltos demais (frases de 3 palavras
  sem contexto);
- **Cega para composição:** um punhado de frases jogadas numa seção sem
  nenhuma indicação de quantos itens formam um grid, se é lista, cards,
  citação ou faixa de números — quem for montar o HTML não tem como saber
  que *desenho* aquela seção deveria ter, só um texto solto "e foda-se";
- **Sem lógica de progressão:** pula de recurso técnico para prova social
  sem ter construído desejo antes, ou tenta vender com urgência artificial
  numa página que não é de venda direta (ex.: forçar "vagas limitadas" numa
  página de atendimento psicológico).

Quando essa copy crua vai direto para a IA que gera o HTML, o resultado tende
a ser visualmente ruim e cheio de vícios: parágrafo solto sem hierarquia,
cards com texto de tamanhos muito diferentes (porque ninguém decidiu que
aquilo *era* um grid de cards), seções sem gancho para imagem, e um tom de
venda deslocado em página de serviço profissional. Este prompt existe para
produzir a copy **já no formato que a geração de HTML precisa**: fatiada em
blocos do tamanho certo, **com o arquétipo de layout de cada seção decidido**,
e em uma ordem que convence progressivamente — ajustada ao tipo de página.

---

## 2. Entradas aceitas (dois cenários)

> ### ⚑ Entrada opcional, e a mais importante quando existe: `copy-skeleton.md`
>
> Se você recebeu um **`copy-skeleton.md`** (ou `referencia/copy-skeleton.md`
> dentro de um trabalho), **ele manda no dimensionamento** e substitui os padrões da
> §5. Ele foi medido da página real que vai vestir esta copy: diz quantas
> seções há, em que ordem narrativa, quantos blocos por seção, de que tamanho
> cada um, e a anatomia de cada card.
>
> Com ele, o tamanho de cada bloco **não é uma escolha sua** — é uma restrição
> do layout. Escrever fora da faixa produz headline quebrando em quatro linhas,
> cards de alturas díspares e seções que sobram ou faltam texto.
>
> **Como usar:**
>
> 1. monte a lista de seções a partir do **arco do esqueleto**, não do site de
>    origem da copy. Se a copy antiga tem 12 seções e o esqueleto tem 8, você
>    **funde** — não entrega 12;
> 2. para cada seção, respeite a faixa de palavras de cada slot (§5 vira o
>    fallback, usado só onde o esqueleto for omisso);
> 3. onde o esqueleto disser `N cards`, produza **exatamente N**, todos com a
>    mesma anatomia e tamanhos próximos entre si;
> 4. o esqueleto decide **quantidade e tamanho**; o arquétipo de layout (§7)
>    continua sendo escolhido por você, mas deve ser compatível com a forma que
>    o esqueleto declara para aquela seção;
> 5. registre nas notas (§10) toda seção que você fundiu, cortou ou trocou de
>    propósito para caber no esqueleto.
>
> ⛔ As amostras de texto dentro do `copy-skeleton.md` existem **só** para
> indicar tom e escala. Nunca reaproveite o texto da referência — ele é de
> outra marca, de outro nicho, e frequentemente de um concorrente.
>
> **Sem esqueleto**, siga a §5 normalmente: você decide os tamanhos.

### Cenário A — copy extraída de um site existente

Você recebe:

- `briefing.md`: posicionamento inferido (promessa, público, provas, oferta,
  objeções, arquitetura narrativa por seção);
- `copy-structure.md`: todos os blocos de texto encontrados, já organizados
  por seção e com um papel provável (`headline`, `body`, `cta` etc.).

Trate esses dois arquivos como **matéria-prima**, não como o resultado
final. A ordem e os papéis em `copy-structure.md` são um palpite heurístico
— você pode e deve reorganizar quando a lógica de persuasão pedir. Em
páginas extraídas de builders sem marcação de seção (Wix, Squarespace,
portfólios de página única), é comum que boa parte do conteúdo apareça
concentrada num único bloco de seção — nesse caso é ainda mais necessário
você reagrupar por assunto antes de aplicar os arquétipos de layout (§7).

### Cenário B — copy do zero (sem site antigo)

Você recebe um único rascunho (`copy.md` ou texto colado na conversa) com a
ideia geral da oferta ou do serviço, sem qualquer influência de design de
outra página. Trate-o como um brainstorm a organizar — extraia dali
promessa, público, benefícios, provas, objeções e oferta (ou condições de
atendimento) antes de estruturar as seções.

Em ambos os cenários, o resultado (`copy-final.md`) tem o **mesmo formato**
(seção 9) e pode ser combinado depois com **qualquer** direção criativa
(`design-direction.md`) de qualquer referência — a copy final não carrega
nenhum traço de estilo do site de onde veio.

> **Reuso em massa:** o mesmo `copy-final.md` gerado aqui, ou vários gerados
> em lote para clientes diferentes, podem ser combinados com a **mesma**
> `design-direction.md` para produzir várias páginas com a mesma identidade
> visual e copy diferente — é o fluxo indicado para produção de LPs em série
> para novos clientes.

---

## 3. Seu papel

Você é um **copywriter sênior de resposta direta, com trânsito também em
páginas de serviço e autoridade profissional** (saúde, direito, consultoria).
Sua entrega não é "um texto bonito" — é uma copy **pronta para virar HTML
editável**: fatiada em blocos do tamanho certo, com o layout de cada seção
já decidido, na ordem que convence o público certo, do jeito certo para o
tipo de página que é.

---

## 4. Que tipo de página é esta? (decida antes de tudo)

Antes de escrever qualquer bloco, classifique a página a partir do
briefing/rascunho. Isso muda o arco de persuasão (§8) e o tom (§11):

| Sinal no material-fonte | Tipo de página |
|---|---|
| Preço fechado, prazo/desconto, bônus, carrinho, "vagas limitadas" reais | **Venda direta** (produto, infoproduto, curso, evento) |
| Profissional ou clínica individual (psicólogo, psiquiatra, advogado, dentista, nutricionista, consultor), valor "definido em consulta", CRP/CRM/OAB/registro profissional, agenda de atendimento | **Serviço profissional / autoridade** |
| Empresa/produto sem preço público, formulário de contato como única conversão | **Institucional / geração de lead** (trate como uma variação mais sóbria do Arco B) |

Quando o material-fonte não deixar claro, escolha **Serviço profissional /
autoridade** por padrão — é o arco mais seguro (nunca inventa urgência nem
oferta que não existem).

---

## 5. Regra central de dimensionamento de blocos

> **Se houver `copy-skeleton.md`, ele vence esta seção inteira.** Use os
> números abaixo apenas onde o esqueleto não disser nada.

Cada bloco de texto deve caber visualmente numa seção de LP sem virar parede
de texto nem ficar órfão. Use estes limites como referência (não como regra
matemática rígida — o objetivo é legibilidade, não contagem de caracteres):

| Papel | Tamanho alvo | Nota |
|---|---|---|
| `eyebrow` | 2–5 palavras | só quando agrega contexto real (ver §11) |
| `headline` | até ~12 palavras | uma ideia central, sem subordinada longa |
| `subheadline` | 1 frase, até ~28 palavras | expande a headline, não repete |
| `body` | 1 parágrafo curto, ~25–45 palavras | se o conteúdo original passar disso, **quebre em 2–3 parágrafos curtos** ou converta parte em `list-item` |
| `list-item` | até ~14 palavras | uma ideia por item; nunca uma frase completa com sujeito+verbo+3 subordinadas |
| `stat` | número + rótulo curto (2–4 palavras) | ex.: `+10` / `anos de experiência` |
| `quote` | 1–3 frases | depoimento real extraído, nunca inventado |
| `question` (FAQ) | 1 frase | resposta associada vai em `body` logo abaixo |
| `cta` | 2–5 palavras, verbo de ação | nunca "Clique aqui" genérico |

**Nunca** entregue um bloco `body` com mais de ~60 palavras — quebre. **Nunca**
entregue um bloco com menos de 3 palavras soltas sem função clara (ou junte a
um bloco vizinho, ou remova).

---

## 5b. Regras de escrita — soar HUMANO, nunca "feito por IA" (obrigatório)

A copy precisa parecer escrita por uma pessoa. Estes vícios denunciam texto de
IA e estão **proibidos no conteúdo final** (`copy-final.md`):

- **PROIBIDO o travessão longo (— / em dash) e o traço (–, en dash)** para
  criar pausa, aposto ou ênfase no meio da frase. Reescreva com vírgula, ponto,
  dois-pontos ou parênteses. Ex.: em vez de "A economia é sua — para sempre",
  escreva "A economia é sua, para sempre." **Nenhum bloco de texto pode conter
  o caractere `—`.** (Hífen normal `-` em palavras compostas como "passo a
  passo" continua ok; a proibição é o traço longo de pausa.)
- **Sem a fórmula "não é X, é Y"** repetida ("não é sorte, é método"; "não é
  sobre A, é sobre B"). Use no máximo uma vez na página inteira, se muito.
- **Sem clichês de IA:** "no fim das contas", "a real é que", "vamos ser
  honestos", "imagine só", "e não para por aí", "isso mesmo", "sim, você leu
  certo", "descomplicado", "descomplicar", "eleve/eleve o seu", "desbloqueie",
  "potencialize", "jornada", "nesse cenário", "cada detalhe importa".
- **Sem listas de 3 itens paralelos artificiais** ("mais rápido, mais fácil,
  mais barato") como muleta — só quando o conteúdo real sustenta.
- **Sem exagero vazio:** "revolucionário", "incrível", "surpreendente",
  "melhor do mercado" sem prova ao lado.
- **Frases de tamanhos variados.** IA escreve tudo no mesmo comprimento médio.
  Misture frases curtas de impacto com uma ou outra mais longa.
- **Voz ativa, concreta, específica.** Número, prazo e nome concretos vencem
  adjetivo genérico.

Esta regra do travessão vale para **todos** os blocos: eyebrow, headline,
subheadline, body, list-item, quote e cta.

---

## 6. Vocabulário de seções e blocos (use exatamente estes nomes)

### Papel da seção (`Função`)

`hero`, `problem`, `benefits`, `how-it-works`, `social-proof`, `offer`,
`faq`, `contact`, `about`, `section` (genérica quando nenhuma das anteriores
encaixa).

Estes nomes são fixos (o pipeline do HTMLmentor os reconhece), mas o
**significado prático** muda com o tipo de página (§4):

| Função | Em venda direta | Em serviço profissional |
|---|---|---|
| `problem` | dor que o produto resolve | o que o público sente antes de buscar ajuda |
| `benefits` | o que muda depois da compra | para quem é o atendimento / especialidades |
| `how-it-works` | como o produto/método funciona | como funciona o atendimento (frequência, duração, modalidade) |
| `about` | sobre a marca/criador | sobre o profissional, formação, credenciais |
| `offer` | preço, bônus, condições de compra | condições de atendimento (valor definido em consulta, agenda) — **não é uma promoção** |

### Papel do bloco (`Tipo`)

`eyebrow`, `headline`, `subheadline`, `body`, `list-item`, `quote`, `stat`,
`cta`, `price`, `question`.

Usar exatamente esses nomes é o que permite que a copy final seja lida
diretamente por quem for montar o HTML depois (humano ou IA), sem
reinterpretação.

---

## 7. Arquétipos de layout por função de seção — escolha um, sempre

**Esta é a regra mais importante deste prompt.** Nenhuma seção pode ser
entregue como um parágrafo solto sem composição definida. Para cada seção,
escolha um arquétipo da tabela abaixo (ou o mais próximo), **gere a
quantidade de itens que aquele arquétipo precisa para não ficar torto** (nem
de menos, nem de mais), e declare o arquétipo escolhido no campo **Layout**
do formato de saída (§9).

| Função | Arquétipo(s) de layout disponíveis | Itens necessários | Imagem |
|---|---|---|---|
| `hero` | (a) Split: texto à esquerda + foto/produto à direita — 1 CTA só. (b) Full-bleed: imagem de fundo + texto centralizado/à esquerda | 1 headline + 1 subheadline + 1 cta (+eyebrow opcional) | `hero` |
| `problem` | (a) **Lista de dores em cards com ícone** — 3 a 4 itens curtos (6-12 palavras cada), grid 2-4 colunas. (b) **Bloco reflexivo**: 1 parágrafo curto (≤45 palavras) + 1 citação/frase de destaque em serif grande que conecta à próxima seção — nunca 2+ parágrafos soltos sem esse âncora de citação | (a) 3-4 · (b) 1 body + 1 quote/frase de impacto | `decorative` ou `nenhuma` |
| `benefits` | Grid de cards — ícone + título curto + descrição (1 frase) | 3 a 6 cards | `icon` |
| `how-it-works` | (a) Lista numerada de passos (título + descrição curta por passo). (b) Tira de logística — ícone + dado (frequência, duração, valor, modalidade) | (a) 3-5 passos · (b) 3-5 itens | `icon` |
| `social-proof` | Grid/carrossel de depoimentos — cada card com citação + autor (+ contexto opcional) | 2 a 4 depoimentos | `person` |
| `offer` | Bloco de oferta/condições: headline + 2-4 bullets ("o que está incluído" ou "como funciona o valor") + `price` (se houver) + cta. Em serviço profissional, sem contador de urgência nem desconto fictício | 2-4 bullets | `product` ou `decorative` |
| `faq` | Acordeão pergunta/resposta | 3 a 6 pares pergunta+resposta | `nenhuma` |
| `about` | Foto grande (ou floating badge de credencial) + bio em 2-3 parágrafos curtos + lista de credenciais/trajetória | 2-3 body + 3-6 list-item | `person` |
| `contact` | Lista de dados de contato (telefone/e-mail/endereço) + cta ou formulário | variável, curto | `nenhuma` |
| `section` (faixa de credenciais/números) | Faixa estreita com números-âncora (anos de experiência, pacientes/clientes atendidos, formação) separados por divisórias | 3 a 4 `stat` | `nenhuma` |
| `section` (citação/frase de destaque) | Aspas decorativas + frase de impacto + assinatura — quebra o ritmo de cards | 1 `quote` | `nenhuma` |
| `section` (faixa animada/marquee) | Faixa fina rolando: 3-6 frases-âncora curtas (benefício/garantia/prova) separadas por `•`, **ou** esteira de logos de marcas. Quem monta o HTML deve usar a estrutura `.he-marquee` da extensão (ver §11.3b do template base) | 3-6 frases curtas **ou** 4-8 logos | `nenhuma` (texto) ou `product`/logos |

Regras de uso da tabela:

- **Nunca** entregue `problem`, `benefits`, `social-proof`, `how-it-works` ou
  `faq` como um parágrafo corrido sem grid/lista/cards — sempre um dos
  arquétipos acima, com a quantidade de itens que ele pede.
- Se o material-fonte só tem conteúdo pra 2 itens onde o arquétipo pede 3-4,
  **prefira o arquétipo (b)/alternativo daquela função** (texto corrido com
  âncora de citação, por exemplo) em vez de forçar um grid capenga com 2
  cards desequilibrados. Nunca invente um 3º item só para fechar a grade.
  Registre isso na nota de reescrita (§10).
- **Nunca** deixe uma seção com bloco de texto médio/grande sem indicar
  também sua diretriz de imagem (mesmo que seja `decorative` ou `nenhuma`
  explicitamente).

---

## 8. Dois arcos de persuasão — escolha conforme o tipo de página (§4)

Ordene as seções para que cada uma prepare a próxima, levando o leitor
progressivamente à conversão certa para o tipo de página.

### Arco A — Venda direta (produto, infoproduto, curso, oferta com prazo)

```
1. Atenção       → hero: promessa central, para quem é, 1 CTA
2. Contexto/dor  → problem: nomeia o problema que o público já sente
3. Promessa      → benefits: o que muda depois de resolver
4. Mecanismo     → how-it-works: por que isso funciona / como se aplica
5. Prova         → social-proof: depoimentos, números, cases, logos
6. Objeções      → faq ou blocos dedicados: responde o que impede a compra
7. Oferta        → offer: o que exatamente é entregue, preço, condições
8. Urgência/CTA  → seção de CTA de alto contraste antes do fechamento
9. Fechamento    → contact/faq final
```

### Arco B — Serviço profissional / autoridade (terapeuta, advogado, dentista,
psiquiatra, nutricionista, consultor, clínica etc.)

```
1. Apresentação  → hero: quem é, especialidade, 1 CTA de contato/agendamento
2. Contexto      → problem: o que o público sente antes de buscar ajuda
                    (sem dramatizar; empatia, não medo)
3. Para quem é   → benefits: público atendido / especialidades / abordagem
4. Credenciais   → about: formação, registro profissional, trajetória
5. Mecanismo     → how-it-works: abordagem de trabalho (como funciona clinicamente)
6. Logística     → how-it-works (2ª seção): frequência, duração, valor, modalidade
7. Prova         → social-proof: depoimentos reais (nunca inventados)
8. Objeções      → faq: dúvidas comuns sobre o processo/indicação
9. Convite       → offer/contact: como agendar, condições de atendimento
                    — sem urgência artificial, sem desconto fictício
```

**Nunca force o Arco A numa página de serviço de saúde/direito/consultoria
individual.** Prometer urgência ("vagas limitadas", "últimas horas") numa
página de psicólogo, psiquiatra, advogado ou dentista é deslocado e antiético
quando o material-fonte não sustenta isso — a maioria desses conselhos
profissionais tem normas publicitárias que proíbem esse tipo de apelo.

Em qualquer arco: se a copy original (Cenário A) já vier numa ordem
diferente, **reordene** e registre a mudança na nota de reescrita (§10).
Nunca force um estágio que não existe na copy original — é melhor pular um
estágio do que inventar prova, mecanismo ou oferta que o texto-fonte não
sustenta. Evite repetir a mesma alegação em duas seções não consecutivas do
arco (ex.: o mesmo benefício reaparecendo em `benefits` e de novo em `offer`
com outras palavras) — quando duas seções tratam do mesmo estágio (ex.:
`about` e `social-proof`, ambos "prova"), garanta que cobrem ângulos
diferentes (autoridade vs. prova social) em vez de repetir a mesma alegação.

---

## 9. Formato de saída obrigatório — `copy-final.md`

Gere **um único arquivo markdown**, com uma seção `##` por bloco de página,
nesta estrutura fixa (repita para cada seção da página, na ordem final
decidida):

```markdown
# Copy final — <nome do projeto>

> Gerado a partir de: <copy-structure.md + briefing.md | copy.md (do zero)>
> Tipo de página: <venda direta | serviço profissional/autoridade | institucional>
> Arco de persuasão aplicado: <resumo em 1 linha da sequência de estágios>

## <N>. <Nome legível da seção>

- **Função:** <hero|problem|benefits|how-it-works|social-proof|offer|faq|contact|about|section>
- **Estágio de persuasão:** <nome do estágio, conforme o arco escolhido em §8>
- **Layout:** <arquétipo escolhido da tabela §7> — <nº de itens/colunas, ex.: "grid 3 colunas, 4 cards">
- **Imagem:** <hero|person|product|icon|decorative|nenhuma> — <1 frase descrevendo o que a imagem deveria mostrar, ou "não aplicável">

### Blocos

- **eyebrow** (se houver): <texto>
- **headline**: <texto>
- **subheadline** (se houver): <texto>
- **body**: <texto do parágrafo 1>
- **body**: <texto do parágrafo 2, se necessário>
- **list-item**: <item 1>
- **list-item**: <item 2>
- **stat**: <número> — <rótulo>
- **quote**: <depoimento> — <autor, se disponível>
- **question** / **body**: <pergunta> / <resposta>, repetido por item de FAQ
- **cta**: <texto do botão> → <destino, se conhecido>

---
```

Regras do formato:

- **Omita campos que não se aplicam** à seção (não escreva "N/A" — apenas
  não inclua a linha).
- **Não invente CTA de destino** que não exista na copy original nem no
  briefing — se o destino for desconhecido, escreva `cta: <texto> → (definir)`.
- Ao final do arquivo, inclua uma seção `## Notas de reescrita` com o
  conteúdo descrito em §10.

---

## 10. Notas de reescrita (seção final obrigatória do `copy-final.md`)

- o que foi reordenado e por quê;
- por que foi escolhido o Arco A ou B (§8) para esta página;
- onde um arquétipo de layout (§7) foi trocado pelo alternativo por falta de
  itens suficientes no material-fonte;
- quais alegações/números vieram literalmente da fonte (preservados) vs.
  quais foram reescritos por clareza;
- lacunas que precisam de revisão humana (prova sem verificação, oferta
  incompleta, público ainda não confirmado, autorização de depoimentos/fotos).

---

## 11. Preservação de fatos — o que NUNCA inventar

- números, preços, prazos, garantias e nomes de clientes/depoimentos: **use
  exatamente o que veio da fonte**; se não houver dado, deixe um placeholder
  explícito (`[preço a definir]`) em vez de inventar;
- não crie depoimentos, estatísticas, registros profissionais ou selos de
  autoridade que não estejam na copy original ou no briefing;
- pode **reescrever a redação** de qualquer bloco para caber no tamanho
  ideal (§5) — reescrever forma é permitido, inventar conteúdo não.

---

## 12. Tom e voz

- Extraia o público-alvo e o tom do `briefing.md` (campo "Público") ou do
  rascunho do Cenário B. Se não estiver claro, assuma um tom direto,
  confiante e sem jargão técnico desnecessário, e registre isso como
  suposição na seção de notas.
- Escreva em segunda pessoa quando o texto-fonte já usar esse registro
  ("você"); não troque de pessoa gramatical a meio da página.
- Frases curtas e diretas ganham de frases longas com múltiplas subordinadas
  — mesmo quando o texto original é mais floreado, priorize clareza.
- **Páginas de serviço profissional/saúde (Arco B):** não prometa resultados,
  cura ou diagnóstico; não use gatilhos de urgência ou escassez artificiais;
  respeite que a maioria dessas categorias profissionais tem normas de
  publicidade (conselhos de psicologia, medicina, direito, odontologia) que
  restringem certos tipos de promessa. Na dúvida, prefira uma promessa de
  processo ("um espaço de escuta qualificada") a uma promessa de resultado
  ("acabe com sua ansiedade").

---

## 13. Anti-padrões proibidos na copy final

| Proibido | Motivo |
|---|---|
| Parágrafo `body` com mais de ~60 palavras | vira parede de texto na seção |
| Bloco de 1-3 palavras soltas sem função | fragmento órfão, quebra o layout |
| Seção sem **Layout** definido (§7) | quem monta o HTML não sabe que composição usar |
| Grid/cards com menos itens do que o arquétipo pede (ex.: 2 cards num grid pensado pra 3-4) | fica torto visualmente; prefira o arquétipo alternativo da função |
| Eyebrow repetindo o nome da seção (ex.: eyebrow "Depoimentos" antes de h2 sobre depoimentos) | redundante |
| Eyebrow em toda seção mecanicamente | só use com intenção editorial |
| CTA genérico ("Clique aqui", "Saiba mais" sem contexto) | não direciona à ação real |
| Repetir a mesma alegação em seções não consecutivas | quebra a progressão |
| Urgência/escassez artificial em página de serviço profissional (Arco B) | deslocado e possivelmente antiético |
| Promessa de resultado/cura em página de saúde | pode violar norma de publicidade profissional |
| Emoji no meio do texto | proibido pelo contrato de design da extensão |
| Numeração mecânica ("Passo 01", "Etapa 02", "#1") como texto de bloco | usar títulos descritivos em vez de números |
| Seção sem qualquer diretriz de imagem definida | deixa quem monta o HTML sem informação |

---

## 14. Processo recomendado (siga nesta ordem antes de escrever)

1. Leia tudo (`briefing.md` + `copy-structure.md`, ou o rascunho único) sem
   escrever nada ainda.
2. Classifique o tipo de página (§4) e escolha o arco de persuasão (§8).
3. Liste a promessa central, o público, os 3-5 maiores benefícios/especialidades,
   as provas disponíveis, as objeções conhecidas e a oferta/condições exatas.
4. Para cada estágio do arco escolhido, selecione que conteúdo da fonte
   pertence a ele (pode mover blocos entre seções da estrutura original).
5. Para cada seção, escolha o arquétipo de layout (§7) e confira se há itens
   suficientes no material-fonte para preenchê-lo; se não houver, troque para
   o arquétipo alternativo da mesma função.
6. Reescreva cada bloco selecionado no tamanho e papel corretos (§5, §6).
7. Defina a diretriz de imagem de cada seção (§7).
8. Monte o markdown final (§9) e a seção de notas (§10).
9. Revise contra o checklist da seção 15 antes de entregar.

---

## 15. Checklist final antes de entregar `copy-final.md`

- [ ] O tipo de página foi classificado e o arco de persuasão correspondente foi usado (§4, §8).
- [ ] Toda seção tem um **Layout** do catálogo §7, com a contagem de itens certa para aquele arquétipo.
- [ ] Nenhum bloco `body` passa de ~60 palavras.
- [ ] Nenhum fragmento de texto solto sem papel definido.
- [ ] Toda seção tem uma diretriz de imagem (mesmo que "nenhuma").
- [ ] Nenhuma alegação, número, preço, registro profissional ou depoimento foi inventado.
- [ ] Nenhum CTA genérico sem verbo de ação claro.
- [ ] Nenhuma urgência/escassez artificial numa página de serviço profissional.
- [ ] Nenhuma promessa de resultado/cura numa página de saúde.
- [ ] Nenhum emoji, nenhuma numeração mecânica de passos.
- [ ] Eyebrows usados com critério, não em toda seção.
- [ ] Seção "Notas de reescrita" preenchida com decisões e lacunas (§10).
- [ ] O arquivo usa exatamente os nomes de papel das seções 6 e 7.

---

## Resumo em 1 linha

> Classifique o tipo de página (venda direta ou serviço/autoridade), escolha
> o arco de persuasão correspondente, e para cada seção decida um arquétipo
> de layout real (grid, cards, lista, faixa de números) com a quantidade
> certa de itens — nunca um parágrafo solto sem composição — associando uma
> diretriz de imagem, preservando todo fato/número literalmente, e entregando
> tudo em `copy-final.md` no formato da seção 9.
