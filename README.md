# Achadinhos Shopee Top

Central de links de afiliado da Shopee — landing page em Next.js, sem banco
de dados, tudo hardcode.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm run start
```

Deploy funciona em qualquer plataforma que rode Next.js (Vercel, Netlify, etc.).

## Editar os achadinhos

Veja [`TODO.md`](TODO.md) — o catálogo inteiro vive em
[`data/products.ts`](data/products.ts).

## Design

Cole Design System: papel creme `#FBF8F2`, tinta `#1A1714`, acento terracota
`#E5654B`. Tipos: Instrument Serif (display), Instrument Sans (UI), JetBrains
Mono (micro-labels). Origem do design em [`design/`](design/).

## Estrutura

- `app/` — App Router (layout, página, estilos globais).
- `components/Catalog.tsx` — filtro por categoria, grid, copiar link e
  contador de cliques (client component, usa `localStorage`).
- `data/products.ts` — catálogo hardcode (produtos, categorias, ordenação).
- `design/` — protótipo estático original (referência de design, não é
  servido pela aplicação).
