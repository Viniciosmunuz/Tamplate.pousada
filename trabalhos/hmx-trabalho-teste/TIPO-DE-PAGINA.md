# Tipo de página: **Landing page**

Este trabalho constrói uma **landing page** — uma página única de conversão para uma
oferta, um produto ou uma captura de lead. É o tipo padrão; o que vale aqui já
está espalhado pelo resto do `STARTER.md`. Este bloco fixa o que uma LP **tem** e o
que ela **não** é.

> **Framework de copy:** a inteligência de persuasão de uma LP de infoproduto
> (níveis de consciência, JTBD, voz do cliente, as seções e as sequências) está em
> **`FRAMEWORK-COPY.md`**. Para uma landing, assuma a **postura mais leve**: use a
> sequência de **low/médio ticket** do framework (§7), com emoção rápida, oferta
> clara e garantia em destaque — sem a carta longa de uma página de vendas. Se o
> produto for high-ticket ou a copy pedir uma carta longa, considere remontar o trabalho
> como tipo **página de vendas**. A §0 do framework explica como casar as seções com
> os tokens medidos da `referencia/`.

## Arco esperado (papéis, não assuntos)

A ordem exata vem do `referencia/copy-skeleton.md` e da copy do `alvo/`, mas uma
LP costuma andar por estes papéis. Preserve o **papel**, não o texto:

1. **hero** — promessa + subpromessa + CTA principal (um só, acima da dobra);
2. **prova rápida** — logos, números, selo, ou um depoimento curto logo abaixo do hero;
3. **benefícios / como funciona** — o que a pessoa ganha, em blocos do tamanho que o esqueleto pede;
4. **prova social** — depoimentos, casos, métricas;
5. **oferta / CTA** — o que fazer agora, com o mesmo destino do CTA do hero;
6. **objeções / FAQ** — remove o que trava a decisão;
7. **fechamento** — última chamada + rodapé.

## Regras deste tipo

- **Um objetivo, um CTA dominante.** Todos os CTAs primários levam ao mesmo
  destino (o do `alvo/links-and-ctas.md`). Não espalhe cinco ações concorrentes.
- **Não invente escassez.** Contador regressivo, "vagas acabando", barra de
  estoque **só** se a copy do alvo pedir. LP não é página de vendas — não force os
  gatilhos do outro tipo aqui (isso é decisão do tipo `vendas`).
- **Formulário de captura** (se houver) reconstruído com os mesmos campos/`name`
  do `alvo/forms.md`; é um ponto de conversão rastreado — ver `RASTREAMENTO.md`.
- **Respeite a densidade e o hero** medidos: uma LP boa respira. Não comprima o
  hero expansivo da referência num bloco compacto (ver §2.2 do `STARTER.md`).

## Rastreamento

Esta página já sai preparada para rastrear conversões. **Leia `RASTREAMENTO.md`**
e ligue os eventos aos CTAs e ao formulário: `PageView` no load, `Lead` no envio
do formulário, `InitiateCheckout`/`Purchase` se o CTA leva a um checkout.
