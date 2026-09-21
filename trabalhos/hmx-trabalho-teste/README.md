# Template base: site de pousada / hotel

Esta pasta guarda o **template base** usado na prospecção de pousadas e
hotéis. O site pronto está em **`site/`**, preenchido com uma pousada fictícia
(Pousada Encanto da Floresta), e o passo a passo para montar o site de um
cliente está em **[`site/COMO-PERSONALIZAR.md`](site/COMO-PERSONALIZAR.md)**.

## Para cada cliente novo

1. Duplique a pasta do projeto inteira.
2. Na cópia, siga o `site/COMO-PERSONALIZAR.md`: dados no `site/js/config.js`,
   cores no `:root` do `site/index.html`, fotos em `site/images/` e textos
   nas seções.
3. Rode `node qualidade/verificar.mjs` nesta pasta e corrija o que ele apontar.
4. Publique só a pasta `site/`.

## O que mais tem aqui

A pasta nasceu de um gerador de páginas. As referências de estilo e de copy
que ele usou foram tiradas quando o trabalho virou template, e ficaram só as
ferramentas genéricas:

- `qualidade/`: as regras que valem em todo trabalho (`PADROES-PROIBIDOS.md`,
  `RESPONSIVIDADE.md`, `PERFORMANCE-SEO.md`) e o `verificar.mjs`, que varre
  `site/` e aponta arquivo e linha de cada problema;
- `copy/`: princípios de copy e guias por nicho;
- `FRAMEWORK-COPY.md`, `TIPO-DE-PAGINA.md`, `PROMPT_TEMPLATE.md`,
  `COPY_PROMPT.md`, `RASTREAMENTO.md` e `STARTER.md`: contratos e roteiros do
  gerador, úteis para quem for reescrever a copy ou montar uma página nova;
- `js/`: GSAP vendado (insumo do gerador; o site não usa).

```bash
node qualidade/verificar.mjs
```

> Revise os direitos de uso de textos e imagens de cada cliente. As fotos do
> template são do Unsplash (licença livre); a lista está no fim do
> `site/COMO-PERSONALIZAR.md`.
