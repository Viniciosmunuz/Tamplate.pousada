# Auditoria de copy — passo obrigatório antes do HTML

Este é um **passo de execução**, não uma leitura. Ele acontece depois de você
integrar a copy do `alvo/` com o layout medido, e **antes** de escrever a
primeira linha de HTML.

Existe porque a copy que chega nunca foi validada: veio de um site antigo que
ninguém sabe se convertia, ou de uma IA que não conhecia o negócio, ou da cabeça
de quem está perto demais do próprio produto. Gerar HTML sobre copy fraca produz
uma página bonita que não vende — e o defeito fica invisível, porque tudo parece
certo.

> Precedência: `copy/nichos/<nicho>.md` **manda** sobre `copy/PRINCIPIOS.md` em
> tudo que for específico da profissão — sobretudo em restrição legal. Onde o
> nicho for silente, valem os princípios.

---

## Passo 1 — Identifique o nicho

Leia `alvo/` e `copy/nichos/index.json`. Escolha o arquivo de nicho que mais se
aproxima e **declare a escolha** em `site/DECISOES.md`:

```
Nicho aplicado: psicologo  (copy/nichos/psicologo.md)
Motivo: a copy fala em sessões, sigilo e CRP.
```

Nenhum nicho serve? Use `copy/nichos/generico.md` e diga isso. Nunca aplique um
playbook de nicho errado: as restrições de uma profissão regulada não são
sugestões de estilo.

## Passo 2 — Rode a checagem

Para **cada** bloco de texto que vai para a página:

- [ ] **Concorrente** — trocando o nome do negócio, a frase continua verdadeira?
      Se sim, reescreva (`PRINCIPIOS.md` §3.1).
- [ ] **E daí?** — o benefício chega em algo que muda a vida da pessoa, ou parou
      na característica? (§3.2)
- [ ] **Específico** — há número, prazo, critério ou nome, ou só adjetivo? (§3.3)
- [ ] **Enchimento** — este bloco responde a alguma pergunta do leitor, ou existe
      só para preencher o espaço do layout? (§2)

Para a **página inteira**:

- [ ] **Ritmo** — a ordem das seções acompanha as perguntas do visitante, ou pede
      a ação antes de dar motivo? (§2)
- [ ] **Objeção** — a página enfrenta pelo menos a objeção principal do nicho, ou
      finge que ela não existe? (§3.4)
- [ ] **Prova** — o que sustenta a promessa? Se não há prova real, está marcado
      `[MOCK]` e listado? (§5)
- [ ] **Ação** — há **uma** ação primária, com texto que descreve o que acontece,
      repetida nos pontos certos? (§4)
- [ ] **Conformidade** — nada na página viola as restrições do arquivo de nicho?

## Passo 3 — Aplique e registre

Corrija o que falhou. Você tem autorização para reescrever, reordenar, desdobrar,
agrupar e propor seção nova — o mandato completo está no `STARTER.md` §0.3, com
os limites que valem sempre (não inventar fato, não mudar promessa/público/oferta,
não apagar informação em silêncio).

Registre em `site/DECISOES.md`, em três listas:

```md
## Copy — auditoria

### Reescrito
- Hero: "atendimento humanizado" → "você fala com o mesmo psicólogo em todas as
  sessões" (falhou no teste do concorrente).

### Acrescentado
- Bloco de objeções antes do CTA final: a copy de origem não tratava nenhuma
  objeção, e a principal do nicho é "terapia online funciona?".

### [MOCK] — confira antes de publicar
- "mais de 800 atendimentos" — número plausível, não informado pela origem.

### Não resolvido
- Nenhuma prova real disponível. A seção de prova está estruturada e vazia,
  aguardando material do cliente.
```

## Passo 4 — Só então gere o HTML

Se a auditoria não mudou **nada**, isso é um sinal de alerta, não de sucesso:
copy não auditada quase nunca passa em todos os testes. Releia o §3 dos
princípios antes de seguir.

---

## O que esta auditoria **não** faz

- não muda a promessa central, o público ou a oferta — isso é decisão do dono
  do negócio, e mudar por conta própria é entregar outra página;
- não inventa prova, número ou depoimento para preencher a estrutura;
- não deforma o layout para acomodar copy que sobrou (ver `STARTER.md` §0.1);
- não substitui revisão humana. Ela eleva o piso; o teto continua sendo de quem
  conhece o negócio.
