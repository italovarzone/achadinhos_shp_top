# TODO — instruções para o agente

Este projeto não tem banco de dados: todo o catálogo é hardcode em
[`data/products.ts`](data/products.ts). Quando o usuário mandar registrar um
novo achadinho (ou editar/remover um existente), siga isto:

## Skill: adicionar um achadinho

Pra adicionar um achadinho o agente **precisa receber do usuário, antes de
mexer em qualquer arquivo**:

1. **Link** — o link de afiliado Shopee (`https://s.shopee.com.br/...`).
2. **Nome do produto** — o título que vai aparecer no card.
3. **Imagem** — o arquivo da foto do produto, ou uma URL direta pra ela.

Se faltar qualquer um dos três, **pare e peça** antes de editar
`data/products.ts` — não invente título, não deixe `image` vazio "por
enquanto" torcendo pra completar depois, e não tente adivinhar a foto.

### Se o usuário colar/anexar a imagem no chat

Não existe uma ferramenta aqui que baixe um anexo de chat direto pro disco.
Peça pro usuário salvar o arquivo em `public/images/` (a pasta já existe) com
um nome de arquivo baseado no `id` do produto, por exemplo
`public/images/NOME-DO-ID.jpg`. Só depois que o arquivo existir de fato em
`public/images/`, use `image: "/images/NOME-DO-ID.jpg"` no objeto do produto
(o Next.js serve tudo que está em `public/` a partir de `/`).

### Se o usuário mandar uma URL de imagem

Use a URL direta como veio, sem alterar: `image: "https://..."`.

### Depois de ter os três dados, edite `data/products.ts`

Adicione um novo objeto ao array `PRODUCTS`, seguindo o tipo `Product`:

```ts
{
  id: "slug-unico",           // único, sem espaços, usado como key e no localStorage
  category: "Nome da categoria",
  title: "Título do produto",
  off: "-NN%",                 // opcional; só uso interno (ver abaixo). "" se não souber.
  url: "https://s.shopee.com.br/SEU-LINK",
  image: "/images/slug-unico.jpg", // ou uma URL direta
  clicks: 0,                  // contador inicial (visível publicamente)
}
```

O card só exibe **imagem**, **título**, **contador de cliques** (com animação
de subir sozinho a cada poucos segundos) e os botões de **abrir link** /
**copiar link**. `category` e `off` não aparecem no card — existem só pra
alimentar o filtro por categoria e a ordenação por desconto.

Se `image` vier vazio ou a imagem falhar ao carregar, o card mostra um
placeholder fixo (ícone de foto) no lugar — nunca tenta "advinhar" ou buscar
a imagem sozinho, nem faz scraping da página da Shopee (ela é uma SPA e
bloqueia isso).

Outros passos:

- Se a categoria for nova, adicione o nome dela ao array `CATS` (mesmo
  arquivo) — o filtro só mostra chips de categorias que estão em `CATS`.
- Não crie chip para "Promoções do dia" manualmente: ela é automática e
  agrupa qualquer item com `off` de 40% ou mais.
- Não mexa em nada fora de `data/products.ts` (e, se for o caso, do arquivo
  de imagem em `public/images/`) para essa tarefa — o resto da página
  (layout, estilos, comportamento de clique/cópia) já lê os dados daqui
  dinamicamente.

## Editar ou remover

- Editar: altere os campos do objeto correspondente em `PRODUCTS`.
- Remover: apague o objeto do array e, se só esse produto usava a imagem,
  apague também o arquivo correspondente em `public/images/`.
- Trocar um "link pendente" por um link real: preencha `url` — o selo
  "link pendente" some sozinho.

## Não fazer

- Não crie tabelas, JSON externo ou chamadas a API para isso — o requisito é
  hardcode em `data/products.ts`.
- Não invente categorias fora de `CATS` — o item simplesmente não vai
  aparecer em nenhum filtro além de "Tudo".
- Não adicione um produto sem os três dados (link, nome, imagem) — pare e
  pergunte.
