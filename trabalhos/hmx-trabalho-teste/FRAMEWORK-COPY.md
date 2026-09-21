# Framework de copy — LP / Página de vendas de infoproduto

Este arquivo é a **inteligência de persuasão** do trabalho: como pensar, estruturar e
escrever uma landing page de infoproduto que converte. Vale para os tipos
`landing` (mais curta) e `vendas` (carta longa). O `TIPO-DE-PAGINA.md` diz qual
postura assumir; este arquivo diz *como fazer*.

> A copy não cria desejo. Ela captura desejos que já existem e os direciona para
> o produto. — Eugene Schwartz, *Breakthrough Advertising*

---

## 0. Como este framework se encaixa no trabalho da extensão (LEIA PRIMEIRO)

Este trabalho tem duas fontes que **não podem brigar**:

- **`referencia/`** — a **linguagem visual** medida de uma página real: paleta por
  uso, tipografia, espaçamento, botões, disposição por seção e animações. Manda na
  **forma**.
- **este framework** — a **arquitetura de persuasão**: quais seções existem, em que
  ordem, com qual peso, e o que cada uma diz. Manda no **conteúdo e na sequência**.

As regras de reconciliação, em ordem de prioridade:

1. **O framework decide a narrativa; a referência decide a aparência.** A sequência
   de seções (§7) vem do diagnóstico tático (§3), não da ordem da referência. Mas
   cada seção é vestida com os tokens medidos em `referencia/design-direction.md`.
2. **Seção que o arco de vendas pede e a referência não tem** (empilhamento de
   valor, garantia, encruzilhada) → **crie-a na linguagem visual da referência**:
   mesma paleta, mesmos botões, mesmo ritmo. Reuse o padrão de layout do papel de
   seção mais próximo.
3. **Seção da referência que o arco de vendas não usa** → descarte ou reaproveite o
   layout para um papel que o arco precisa.
4. **O tema medido (claro/escuro) continua mandando** — nunca inverta (ver
   `STARTER.md`, regra nº 1).
5. **`copy-skeleton.md` é o ponto de partida do tamanho dos blocos**, mas uma
   página de vendas é longa e densa por natureza: o diagnóstico de ticket (§3.3) e
   a temperatura (§3.1) governam o comprimento final. Onde o arco pedir mais texto
   do que o esqueleto previa, o arco ganha — desde que o layout comporte.
6. **As animações da referência servem à copy:** o *greased slide* (§5) se beneficia
   do movimento medido. Recrie os reveals; não simplifique para fade genérico.

Antes de escrever, faça o diagnóstico (§2 e §3). Só então monte a sequência (§7) e
escreva seção a seção (§6).

---

## 1. Modo de operação

Este trabalho é **construção** (página nova). A ordem obrigatória:

**Inteligência (§2) → Diagnóstico tático (§3) → Pilares (§4) → Arquitetura (§7) →
Copy seção a seção (§6).**

Os insumos de inteligência vêm da entrevista (`ENTREVISTA-VENDAS.md`) e/ou da copy
já existente em `alvo/`. Sem eles, a copy vira genérica — não pule esta etapa.

---

## 2. Inteligência de mercado

A camada mais importante e a mais ignorada. A copy que converte não é escrita — é
descoberta. Responda com profundidade antes de estruturar qualquer coisa.

### 2.1 Nível de consciência (Schwartz)

O lead está em um de cinco estágios que determinam o que dizer e quanto explicar.

| Nível | Estado do lead | O que a copy precisa fazer |
|---|---|---|
| **1 — Inconsciente** | Não sabe que tem o problema | Nomear a dor antes de qualquer solução. Conteúdo educativo como gancho. |
| **2 — Consciente do problema** | Sofre, não sabe que há solução | Validar a dor com precisão, mostrar que há saída, plantar curiosidade sobre o como. |
| **3 — Consciente da solução** | Sabe que há soluções, não conhece a sua | Destruir alternativas, apresentar o mecanismo único, diferenciar. |
| **4 — Consciente do produto** | Conhece seu produto, não decidiu | Quebrar objeções, reforçar prova, criar urgência, mostrar garantia. |
| **5 — Totalmente consciente** | Pronto para comprar | Direto ao preço, condições, bônus, CTA. Copy curta. |

**Regra:** tráfego frio entra nos níveis 2-3; remarketing e lista própria chegam
nos 4-5. Falar com o nível 5 para quem está no nível 2 não converte — a conversa
está no lugar errado, mesmo com boa oferta.

### 2.2 Sofisticação de mercado (Schwartz)

Quantos produtos similares o lead já viu? Determina o nível de inovação da copy.

| Sofisticação | Cenário | Estratégia |
|---|---|---|
| **Baixa** | Produto pioneiro | Promessa direta e dramatizada. O mecanismo vende sozinho. |
| **Média** | Alguns concorrentes | Promessa expandida. Ângulo único, mecanismo nomeado, resultado específico. |
| **Alta** | Mercado saturado | Mude o veículo, não a promessa. Identidade, tribo, personalidade do criador. |

**Regra:** produtividade, emagrecimento, renda extra e relacionamentos têm
sofisticação altíssima no Brasil. "Organize sua vida" é invisível — precisa de
ângulo, identidade ou mecanismo radicalmente novo.

### 2.3 Job to Be Done (JTBD)

As pessoas não compram produtos — contratam produtos para um trabalho na vida delas.

- Qual situação específica faz o lead procurar solução? (o gatilho)
- O que ele tenta realizar? (trabalho funcional)
- Como quer se sentir depois? (trabalho emocional)
- O que quer que percebam nele? (trabalho social)

Um curso de vendas para dentistas não vende "técnicas" — vende parar de sentir
vergonha ao falar de preço, não depender de convênio, se sentir profissional de
alto padrão. A copy que fala dessa identidade vende mais do que a que lista técnicas.

### 2.4 Voz do cliente (VoC)

A copy mais eficaz é minerada das palavras reais do avatar, não inventada. Fontes:
reviews de concorrentes (Hotmart, Udemy, Amazon), grupos de Facebook/Reddit,
comentários de YouTube do nicho, depoimentos anteriores, perguntas ao suporte.

Procure: **palavras exatas** da dor (copie literal), o **gatilho de compra**, as
**hesitações** específicas, e como ele descreve a **transformação desejada**.

### 2.5 Contexto externo e forças de mercado

O avatar não existe num vácuo — narrativas externas moldam como ele vê o problema.
Antes de escrever a agitação da dor, mapeie (use web search se tiver acesso):

- Que forças (tecnologia, tendência, economia, plataformas) mudam a percepção do
  problema agora?
- Existe narrativa circulando que faz o produto parecer desnecessário? Ela pode ser
  o setup perfeito do argumento central.
- Que objeção **de mercado** (não do indivíduo) o produto precisa desarmar?

Duas formas de usar: a força como **setup** (a narrativa que ameaça o produto vira a
abertura da dor — *"com IA qualquer um cria 50 posts em 3s"* justifica por que
pensar é o único diferencial), ou como **urgência** (mudança que torna o problema
mais urgente agora: *"o algoritmo mudou"*, quando verdadeiro e específico).

### 2.6 Marketing de premissa (Ladeira)

Camada distinta da promessa e da agitação de dor. A dor fala para quem já sente o
problema; a **premissa** alcança quem ainda não sabe que quer o produto.

**Princípio — equivalência lógica:** apresente proposições irrefutáveis em sequência
para que o lead chegue **sozinho** à conclusão de que precisa do produto. A conclusão
que parece do lead pesa mais que qualquer promessa.

```
Premissa 1  [fato irrefutável sobre o mercado/contexto]
Premissa 2  [fato irrefutável que se conecta ao primeiro]
Conclusão   [que o lead tira sozinho — o produto é a resposta natural]
```

Ex.: *"No Brasil, 5 milhões falam inglês. Só 300 mil falam espanhol. O mercado para
quem fala inglês é mais concorrido."* → o lead conclui: *"aprender espanhol é
diferenciação."*

**Use uma seção de premissa quando** (pelo menos uma): avatar no nível 1-2;
sofisticação máxima (o lead desconfia de promessas); oportunidade de mercado não
óbvia sustentada por dados; produto que resolve problema que o avatar não sabe que
tem. **Não use quando:** avatar nível 4-5, urgência imediata, ou low ticket de página
curta (a premissa precisa de espaço).

**Regras de escrita:** sem imperativo, sem pergunta de abertura, sem promessa direta
— começa pela ideia. Dados reais e verificáveis. A conclusão pode ficar implícita.
Manchetes reais de veículos conhecidos funcionam como premissas visuais.

---

## 3. Diagnóstico tático

Com a inteligência em mãos, decida três coisas antes de montar a sequência.

### 3.1 Temperatura do tráfego

| Temperatura | Fonte | Calibragem |
|---|---|---|
| **Fria** | Anúncio para público novo | Dor, Mecanismo Único e Autoridade **longas e detalhadas** — o lead não confia ainda. |
| **Morna** | Remarketing, seguidores | Comprima as seções iniciais — o lead já tem consciência. |
| **Quente** | Lista engajada, indicação | Pode começar pela oferta. Dor e mecanismo viram parágrafo de reativação. |

### 3.2 Posição da autoridade

Não tem posição fixa. Mova conforme o contexto:

- **Criador desconhecido + tráfego frio** → autoridade **depois** da dor (o lead
  precisa sentir que a página entende o problema antes de se importar com quem você é).
- **Criador com audiência** → autoridade **antes** da dor (o reconhecimento abre o lead).
- **Produto técnico/científico** → autoridade **depois** do mecanismo único (as
  credenciais validam o método, não o precedem).

### 3.3 Ticket e profundidade

| Faixa | Postura |
|---|---|
| Low (até R$97) | Página curta, emoção rápida, oferta clara, garantia em destaque. |
| Médio (R$197–497) | Página média, equilibra emoção e razão, mecanismo bem explicado, depoimentos concretos. |
| Alto (R$997+) | Página longa, storytelling profundo, cada objeção respondida, FAQ robusto. |

---

## 4. Os quatro pilares

Defina antes de escrever qualquer seção — guiam o tom e a lógica da página inteira.

- **Promessa** — específica, crível, emocional. Deriva do JTBD real, não do produto.
- **Doutrina** — a ideia central que a página defende (*"o problema não é falta de
  esforço, é falta de método"*). Reaparece ao longo da página; o produto é a
  expressão lógica dela.
- **Objetivo emocional** — qual sentimento o lead deve ter ao terminar (segurança,
  urgência, esperança, alívio, pertencimento, orgulho). Guia o tom.
- **Objeção central** — a voz interna que resiste. Não a de preço — a de **identidade**
  (*"já tentei antes e não funciona pra mim"*). A copy nomeia e desarma essa voz antes
  que o lead a vocalize.

---

## 5. Princípios de escrita

- **Conversa, não roteiro.** Quando o lead pensa "como essa página sabe o que eu
  sinto?", funciona. Quando pensa "estão me vendendo algo", falhou.
- **Alternância emoção ↔ razão.** Emoção: história, dor, desejo, identidade. Razão:
  dados, prova, lógica da oferta, garantia. Nunca mais de 2-3 blocos no mesmo polo.
- **Loopings de curiosidade.** Abra perguntas respondidas mais abaixo (*"e foi aí que
  descobri algo que mudou tudo…"*). O lead avança por curiosidade, não por força.
- **Greased slide (Halbert).** Cada frase faz querer ler a próxima. A página é um
  tobogã — sem atrito até o CTA. Subtítulos são mini-headlines; parágrafos curtos são
  o padrão.
- **Especificidade como prova.** Vago = incredulidade. ❌ "vai aprender a vender mais"
  → ✅ "os 3 gatilhos que fecham objeção de preço sem desconto, com scripts para a
  próxima consulta".
- **Ritmo.** Frases que respiram. Alterne blocos longos de storytelling com frases de
  impacto solitárias. A frase mais importante, sozinha no parágrafo.
- **Causalidade explícita.** Nomeie a causa, não só o sintoma. ❌ "você trava na hora
  de criar" → ✅ "quando o sistema de criação não respeita seu ritmo, o corpo trava".
  Padrão: *"quando [causa estrutural], [sintoma que o avatar reconhece]."* Transforma
  experiência pessoal em lei — e leis convencem mais que relatos.
- **Consistência de voz.** A copy soa como extensão do conteúdo orgânico do criador,
  não uma persona de vendas. Ruptura de tom entre o Instagram e a página ativa o modo
  de defesa do lead.

---

## 6. As 17 seções — anatomia

Cada seção: por que existe (psicologia), quando usar, peso, e variantes. Nem toda
página usa todas — a sequência (§7) seleciona.

**01 — Barra de escassez (top bar).** Ativa FOMO antes da promessa. Só com escassez
**real**. Peso leve. *Variante evento ao vivo:* para imersão/workshop com data, exiba
data+hora (*"Ao vivo · 16/05 às 9h30"*) — urgência verificável e irrevogável, superior
a timer artificial.

**02 — Promessa principal (hero).** O lead decide em 3s. Captura o desejo existente,
não cria um novo. Única seção obrigatória. Peso máximo: H1 com PUV + sub com mecanismo
+ CTA inicial + micro-copy de segurança. *Âncora passiva:* prova social numérica
(*"3.200 alunos já dentro"*) como elemento sutil no hero reduz resistência antes mesmo
da leitura.

**03 — Agitação da dor.** Cria leitura mental: o lead sente que a página descreve sua
situação. Linguagem exata do avatar (VoC), não a do criador. Longa em nível 2, curta em
nível 4. *Bifurcação:* se o avatar diagnostica certo o problema → valide e amplifique;
se diagnostica errado (*"sou desorganizado"*) → **redirecione** antes de amplificar
(*"talvez o problema nunca tenha sido X"*) — cria abertura cognitiva. *Variante três
atos:* (1) o conselho que o mercado deu, (2) o avatar obedeceu, (3) o resultado falso —
o lead não se sente fracassado, se sente enganado pelo mercado. *Variante demonstração
visual:* para resultado visual imediato (IA, design, edição), mostre o resultado antes
de argumentar. *Termo proprietário:* nomear o problema com termo próprio
(*"burnout de conteúdo"*) gera reconhecimento e posse da categoria.

**04 — Apresentação da solução.** Fecha o looping da dor, posiciona o produto como
saída. Não é lista de módulos — é posicionamento do veículo. Peso médio.

**05 — Mecanismo único.** A seção mais subestimada. Retira a culpa do lead ("não é
você, é o método errado") e justifica por que é diferente de tudo que ele já tentou.
Crítica em sofisticação alta. *Dois níveis de nome:* o método (*Método 5P*) + o
princípio que o fundamenta (*Engenharia de Emoções*) — "o quê" + "por quê funciona".

**06 — Comparação de mercado (nós vs. eles).** Polarização estrutural. Tabela ✅/❌.
Quatro tipos: **contra concorrente nomeado** (agressivo, risco de ataque); **contra
estado de vida / método antigo** (mais seguro e honesto — "fazer sozinho, sem método"
— preferível na maioria dos infoprodutos); **de formato/método de estudo** (fluxo com
vs. sem o produto); **distinção de paradigma** (o mais sofisticado — compara dois modos
de pensar, destrói todos os concorrentes sem citar nenhum; para sofisticação máxima).

**07 — Prova social e endosso.** Transferência de crença — o lead acredita em pessoas
como ele. Organize por perfil de avatar, não por resultado mais espetacular. *Variante
arquitetural:* em sofisticação alta, a prova pode ser o esqueleto da página inteira —
abre com resultados reais e constrói o argumento de cima para baixo.

**08 — Autoridade.** Não é currículo — é narrativa de transformação. Estrutura:
Conexão → Virada → Prova → Missão. Longa em tráfego frio, parágrafo em lista própria.
*Dupla/casal:* quando a autoridade é de dois (sócios, casal), mostre os dois vivendo a
dor e a virada juntos — identificação por relacionamento, poderosa em JTBD familiar.

**09 — Filtro de qualificação (para quem é / não é).** Psicologia reversa: dizer para
quem **não** serve aumenta o desejo de quem se encaixa. Duas listas com situações
concretas. Médio e alto ticket.

**10 — Escopo e tangibilização.** Produtos digitais são invisíveis; valor percebido ∝
percepção de volume e especificidade. Cada módulo com nome, conteúdo e benefício.
**Tangibilização visual (obrigatória quando possível):** screenshot real da plataforma,
capas por módulo, lista de aulas de um módulo como amostra, mockups de bônus como
produtos físicos. O lead deve "folhear" o produto antes de comprar.

**11 — Quebra de objeção periférica.** O "elefante na sala" que ninguém menciona.
Admitir e racionalizar ganha confiança. *Variante integrada:* objeções identitárias
(*"não sou criativa"*, *"não tenho constância"*) respondidas em cartões logo após os
módulos, no momento em que o lead as formula. Bloco separado para objeções logísticas.

**12 — Bônus / aceleradores.** Cada bônus quebra uma objeção específica. Três
categorias: **aceleradores de execução** (checklist, templates — "não sei começar"),
**expansores de resultado** (módulo extra que amplia o escopo), **antecipadores de
objeção pós-compra** (impostos, jurídico, ferramentas — resolvem preocupação que só
viria depois de comprar; especialmente eficazes).

**13 — Empilhamento de valor.** Ancoragem extrema: a soma de tudo vs. o preço faz o
preço parecer absurdo de não pagar. Lista com valores individuais + total riscado +
preço real + racionalização. Logo antes do CTA principal. Peso alto.

**14 — Reversão de risco (garantia).** Transfere o risco para o vendedor. Não é
concessão — é prova de que o criador acredita. Com nome próprio. Dois tipos: **devolução**
("não gostou, devolvemos 100%" — objeção de preço) e **comprometimento mútuo**
("aplicou, comprovou e não teve resultado? eu entro junto" — objeção de execução, para
quem já comprou curso e não usou).

**15 — Encruzilhada (futuro simulado).** Não comprar não é manter o status quo — é
decidir ativamente continuar no problema. Dois cenários honestos + convite. Formatos:
**declarativo** (apresenta A vs. B direto) ou **socrático** (perguntas progressivas que
levam o lead a construir os cenários sozinho — *"como estaria sua vida se tivesse
começado há 1 ano? E daqui a 1 ano, se continuar como está?"* — preferível com avatar
resistente a pressão).

**16 — FAQ estratégico.** Última rede de segurança. Três tipos: **logísticas** (acesso,
pagamento, prazo), **emocionais** (medos de execução), **desculpas internas** (as frases
exatas que o lead usa para adiar, em primeira pessoa — *"e se eu comprar e deixar parado
como fiz antes?"* — o tipo mais poderoso). A última pergunta pode ser uma mini-encruzilhada.

**17 — Rodapé institucional.** Compliance e credibilidade (CNPJ = empresa real). CNPJ,
política, termos, isenção de resultados. *Rodapé como copy:* em nichos sensíveis (saúde,
direito, finanças), a isenção escrita com intenção reforça o posicionamento ético e
diferencia de quem promete milagre.

---

## 7. Sequências recomendadas

Ponto de partida, não receita fixa. Monte após o diagnóstico tático (§3).

**Low ticket — tráfego frio (consciência 2-3):**
`01 → 02 → 03 → 04 → 05 → 07 → 08 → 09 → 10 → 13 → 14 → CTA → 16 → 17`

**Médio ticket — tráfego morno (3-4):**
`01 → 02 → 03 → 04 → 05 → 08 → 09 → 07 → 10 → 12 → 13 → 14 → 15 → 16 → 17`

**Alto ticket — tráfego frio (2-3):**
`01 → 02 → 03 → 04 → 05 → 06 → 08 → 09 → 07 → 10 → 11 → 12 → 13 → 14 → 15 → 16 → 17`

**Lista própria — qualquer ticket (4-5):**
`02 → 08 (curta) → 10 → 13 → 14 → CTA → 16 → 17`

**Regra de ouro:** a sequência serve ao lead, não ao copywriter. O critério final é
sempre *em que ponto da leitura essa pergunta surge na mente do lead?* — a seção que
responde vai onde a pergunta surge.

---

## 8. Checklist antes de entregar

**Inteligência**
- [ ] Nível de consciência identificado e a copy calibrada para ele?
- [ ] Sofisticação considerada — a copy parece nova ou genérica?
- [ ] JTBD real descoberto — a promessa fala do trabalho emocional/social?
- [ ] ≥3 elementos de linguagem do avatar (VoC) na copy?
- [ ] Contexto externo mapeado — alguma força de mercado virou argumento?
- [ ] Avaliado se cabe uma seção de marketing de premissa (nível 1-2 / sofisticação máxima)?

**Arquitetura**
- [ ] A temperatura determinou o peso das seções?
- [ ] A posição da autoridade foi escolhida por contexto?
- [ ] A sequência responde às perguntas do lead na ordem em que surgem?
- [ ] O tom é consistente com o conteúdo orgânico do criador?
- [ ] **As seções foram vestidas com os tokens da `referencia/`, e as que faltavam foram criadas na mesma linguagem visual?**

**Copy**
- [ ] H1 com PUV clara + mecanismo/ângulo?
- [ ] A doutrina central aparece em ≥3 pontos?
- [ ] ≥2 loopings de curiosidade abertos e fechados?
- [ ] Alternância emoção/razão equilibrada?
- [ ] Todas as objeções (incluindo a de identidade) respondidas?
- [ ] Empilhamento claro, valor total > preço?
- [ ] ≥3 CTAs, garantia próxima ao CTA principal?
- [ ] Cada subtítulo funciona como mini-headline?
- [ ] Parece conversa ou parece roteiro de vendas?

**Elementos visuais e táticos**
- [ ] Âncora passiva de prova social no hero?
- [ ] Comparação de mercado com tipo escolhido intencionalmente?
- [ ] Escopo mostra o produto por dentro (screenshots, capas, amostra de aulas)?
- [ ] Bônus com representação visual e cobrindo as três categorias?
- [ ] Tipo de garantia escolhido conforme a objeção central?
- [ ] Formato da encruzilhada conforme o perfil do avatar?
