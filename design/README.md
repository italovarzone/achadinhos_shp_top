# Achadinhos Shopee Top

Central de links de afiliado da Shopee — página única, estática, sem build.

## Publicar

Commit deste repositório e ative **GitHub Pages** (Settings → Pages → Branch: `main` / root).
Também funciona em Vercel, Netlify ou qualquer hospedagem estática: é só `index.html`.

## Editar os achadinhos

Todo o conteúdo está no array `DATA` dentro de `index.html`:

```js
{ id:"airfryer", category:"Casa e cozinha", title:"Air fryer 5L com painel digital",
  blurb:"...", price:"R$ 289,90", priceOld:"R$ 429,00", off:"-32%",
  url:"https://s.shopee.com.br/SEU-LINK", clicks:1284 }
```

- `url` vazio → o card mostra o selo **link pendente**.
- `category` precisa bater com um item de `CATS` para aparecer no filtro.
- **Promoções do dia** é automático: entra todo item com `off` de 40% ou mais.
- `clicks` é o número inicial do contador; os cliques do visitante somam localmente (`localStorage`).
- `SORT` aceita `"Maior desconto"` ou `"Mais clicados"`.

## Design

Cole Design System: papel creme `#FBF8F2`, tinta `#1A1714`, acento terracota `#E5654B`.
Tipos: Instrument Serif (display), Instrument Sans (UI), JetBrains Mono (micro-labels).

## Arquivos

- `index.html` — a página publicável (autossuficiente, só fontes via CDN).
- `Achadinhos Shopee Top.dc.html` — versão de design/edição visual.
