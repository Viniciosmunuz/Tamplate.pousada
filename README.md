# Template de site para pousadas e hotéis

Site de uma página, pronto para virar o site de uma pousada ou hotel. Vem
preenchido com uma pousada fictícia, a **Pousada Encanto da Floresta**.

**Ver o site:** https://viniciosmunuz.github.io/Tamplate.pousada/

## Onde fica cada coisa

- `trabalhos/hmx-trabalho-teste/site/`: o site (é só esta pasta que vai ao ar);
- `trabalhos/hmx-trabalho-teste/site/js/config.js`: nome, contatos, WhatsApp,
  endereço, mapa, redes e horários;
- `trabalhos/hmx-trabalho-teste/site/COMO-PERSONALIZAR.md`: o passo a passo
  para montar o site de um cliente;
- `trabalhos/hmx-trabalho-teste/qualidade/`: regras e verificador
  (`node qualidade/verificar.mjs`, rodado dentro de `trabalhos/hmx-trabalho-teste/`).

## Publicação

Cada push na branch `main` publica o site no GitHub Pages sozinho, pelo
workflow em `.github/workflows/pages.yml`.
