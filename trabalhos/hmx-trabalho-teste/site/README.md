# Template de site para pousadas e hotéis

Landing page de uma página só, pronta para virar o site de uma pousada ou
hotel. Vem preenchida com uma pousada fictícia (Pousada Encanto da Floresta)
para ser mostrada como exemplo.

**Para montar o site de um cliente, siga o [`COMO-PERSONALIZAR.md`](COMO-PERSONALIZAR.md).**

## Como abrir

- Duplo clique em `index.html` abre no navegador.
- Ou sirva a pasta `site/` com qualquer servidor estático e acesse
  `http://localhost:8000`, por exemplo com `npx serve -l 8000` (Node) ou
  `python -m http.server 8000` (Python).

## Estrutura

- `index.html`: a página inteira (HTML e CSS). As cores da marca ficam no
  bloco `:root`, no topo do CSS.
- `js/config.js`: **os dados da pousada** (nome, contatos, WhatsApp, endereço,
  mapa, redes, horários).
- `js/animations.js`: menu, carrosséis, galerias, formulário de reserva e a
  aplicação dos dados do `config.js`.
- `images/`: fotos, favicon e imagem de compartilhamento.
- `fontes/`: Inter e Caveat, hospedadas no próprio site.
- `COMO-PERSONALIZAR.md`: o passo a passo da troca de cliente.

O site não depende de biblioteca nem de CDN. Para publicar, suba só a pasta
`site/`.
