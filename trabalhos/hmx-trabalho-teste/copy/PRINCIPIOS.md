# Princípios de copy — o que separa alta conversão de preenchimento

Este arquivo viaja em **todo** trabalho, qualquer que seja o nicho, o tipo de página
ou a origem da copy. Ele não diz *o que* escrever — isso depende do negócio.
Ele diz **como reconhecer copy que trabalha** e como consertar a que não trabalha.

> A copy que chega em `alvo/` é matéria-prima, não decisão final. O mandato para
> melhorá-la está no `STARTER.md` §0.3, e a checagem obrigatória está em
> `copy/AUDITORIA.md`. Este arquivo é o critério que aquela checagem usa.

---

## 1. Por que a copy quase sempre chega fraca

Duas origens, dois defeitos previsíveis — e nenhuma delas produz copy pronta:

**Veio de um site antigo.** Não há garantia nenhuma de que aquela copy vendia.
Ela sobreviveu porque ninguém a revisou, não porque funcionava. O site pode ter
convertido *apesar* do texto — por indicação, por anúncio, por marca. Redesenhar
mantendo a copy intacta é preservar o defeito com tipografia melhor.

**Veio de uma IA ou da cabeça do dono.** Tende ao genérico institucional:
"atendimento humanizado", "soluções sob medida", "excelência e compromisso". São
frases que qualquer concorrente poderia assinar sem trocar uma palavra — e é
exatamente esse o teste (§3.1).

Em ambos os casos: **a copy é direção, não definição.** Sua tarefa não é
transcrever, é fazer a página vender.

---

## 2. A página é uma conversa, não um catálogo

Uma página que converte tem **ritmo**: cada bloco responde à pergunta que o bloco
anterior criou na cabeça de quem lê. Quando o ritmo quebra, a pessoa sai — não
porque discordou, mas porque perdeu o fio.

A sequência de perguntas que um visitante faz, em ordem, sem perceber:

| ele pensa | a página responde com |
|---|---|
| "isto é para mim?" | promessa + para quem |
| "que problema isso resolve?" | o problema, na linguagem dele |
| "por que eu acreditaria?" | prova |
| "como funciona na prática?" | mecanismo, passo a passo |
| "o que eu recebo exatamente?" | oferta concreta |
| "e se der errado?" | objeção + garantia/segurança |
| "o que eu faço agora?" | chamada clara e única |

**Regras de ritmo:**

- nunca peça a ação antes de responder "por que acreditaria" — CTA cedo demais
  queima a única chance;
- não empilhe duas seções que respondem à mesma pergunta: é redundância, e
  redundância cansa;
- se um bloco não responde a nenhuma dessas perguntas, ele é decoração. Corte ou
  transforme;
- a ordem acima é o padrão, não a lei. Público que já conhece a solução pula o
  problema; público frio precisa dele antes de tudo.

---

## 3. Os quatro testes

Aplique a cada bloco de texto da página. Falhou, reescreva.

### 3.1. Teste do concorrente

Troque o nome do negócio pelo de um concorrente. A frase continua verdadeira?
Então ela não diz nada.

```
✗ "Atendimento humanizado e personalizado para cada cliente."
✓ "Você fala com o mesmo advogado do começo ao fim — não com um estagiário
   diferente a cada ligação."
```

### 3.2. Teste do "e daí?"

Leia o benefício e pergunte "e daí?" até chegar em algo que muda a vida da
pessoa. Escreva a última resposta, não a primeira.

```
"Somos especializados em direito trabalhista."   e daí?
"Conhecemos as decisões recentes do TST."        e daí?
✓ "Você entra com o pedido sabendo o que os tribunais têm decidido em casos
   como o seu — e não descobre isso depois de um ano de processo."
```

### 3.3. Teste da especificidade

Número, prazo, nome, quantidade e critério vencem adjetivo. Se não houver dado
real, prefira o concreto verificável ao superlativo vazio.

```
✗ "Resultados rápidos e atendimento de excelência."
✓ "Primeira consulta em até 48h, presencial ou por vídeo."
```

### 3.4. Teste da objeção viva

Toda página tem uma objeção que ninguém escreve porque dá desconforto — preço,
prazo, complexidade, "já tentei antes e não deu certo". A página que a enfrenta
converte mais que a que finge que ela não existe. Se a copy de origem não trata
nenhuma objeção, isso é uma lacuna a preencher, não um silêncio a respeitar.

---

## 4. A chamada para ação

- **uma ação primária por página.** Duas ações concorrentes dividem a decisão e
  reduzem as duas;
- **o texto do botão descreve o que acontece**, não o esforço: "Ver horários
  disponíveis" ganha de "Enviar" e de "Clique aqui";
- **remova o atrito ao redor**: quantos campos o formulário pede? Cada campo a
  mais derruba conversão. Se o objetivo é agendar, peça o mínimo para agendar;
- **repita o CTA** ao longo da página nos pontos onde a pessoa acabou de receber
  um motivo para agir — depois da prova, depois da oferta, no fim. Nunca no meio
  de uma explicação;
- **diga o que vem depois do clique**. "Você escolhe o horário e recebe a
  confirmação por WhatsApp" converte mais que um botão mudo, porque elimina o
  medo do desconhecido.

---

## 5. Prova: o que conta e o que não conta

Em ordem de força:

1. **resultado específico e verificável** ("357 processos trabalhistas desde 2019");
2. **demonstração** — mostrar funcionando vale mais que afirmar que funciona;
3. **terceiro reconhecível** — imprensa, prêmio, certificação, cliente conhecido;
4. **volume** ("mais de 2.000 atendimentos");
5. **depoimento nominal** com contexto;
6. **depoimento anônimo** — vale pouco, e em profissão regulada muitas vezes é
   proibido (ver o arquivo do nicho).

⛔ **Nada disso pode ser inventado.** Se a copy de origem não traz prova, você
**não fabrica**: escreve a estrutura, marca `[MOCK]` e lista em
`site/DECISOES.md`. Prova falsa é o único erro desta página que gera processo.

---

## 6. O que nunca fazer

- **encher espaço.** Se a seção existe no layout e não há o que dizer nela,
  o problema é de conteúdo, não de comprimento. Diga menos, ou troque o propósito
  da seção — nunca escreva parágrafo de enchimento para "fechar o desenho";
- **prometer o que o cliente não pode entregar** — inclusive prazo e resultado;
- **falar de si quando deveria falar do leitor.** "Somos uma empresa com 20 anos
  de mercado" vira "20 anos resolvendo exatamente este problema";
- **usar jargão do fornecedor.** O leitor não sabe o que é "abordagem
  multidisciplinar integrada"; ele sabe o que é "não precisar repetir sua
  história para cada profissional";
- **abrir com a empresa.** A primeira tela é do leitor e do problema dele;
- **empilhar adjetivo** onde falta substantivo.

---

## 7. Como usar isto

1. leia o arquivo do nicho em `copy/nichos/` — ele tem precedência sobre este
   arquivo em tudo que for específico da profissão, principalmente em restrição
   legal;
2. rode `copy/AUDITORIA.md` sobre a copy integrada **antes** de gerar o HTML;
3. registre em `site/DECISOES.md` toda mudança de sentido que você fizer, e tudo
   que ficou `[MOCK]`.
