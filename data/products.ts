export type Product = {
  id: string;
  category: string;
  title: string;
  /** Link de afiliado Shopee. Vazio = mostra selo "link pendente". */
  url: string;
  /**
   * URL da foto do produto. Vazia = mostra o placeholder (igual preview de
   * link do WhatsApp) permanentemente, sem tentar carregar nada.
   */
  image: string;
  /** Contador inicial de cliques (base, antes da soma local do visitante). */
  clicks: number;
  /**
   * Desconto, só usado internamente: agrupa "Promoções do dia" (>=40%) e
   * ordena o catálogo por maior desconto. Não é exibido no card.
   */
  off: string;
};

/**
 * Todo o catálogo é hardcode — sem banco de dados. Para adicionar/editar um
 * achadinho, veja as instruções em TODO.md na raiz do projeto.
 */
export const PRODUCTS: Product[] = [
  {
    id: "celimax-retinal-shot",
    category: "Beleza",
    title: "Celimax The Vita A Retinal Shot Tightening Booster 15ml",
    off: "",
    url: "https://s.shopee.com.br/50Z8YNMmiJ",
    image: "/images/celimax-retinal-shot.png",
    clicks: 1284,
  },
  {
    id: "vedatudo-spray-impermeabilizante",
    category: "Casa",
    title: "Spray Vedatudo 400ml Impermeabilizante Emborrachado Dryko",
    off: "",
    url: "https://s.shopee.com.br/905HQxSuHG",
    image: "/images/vedatudo-spray-impermeabilizante.png",
    clicks: 0,
  },
];

/** Ordem de exibição por padrão: "Maior desconto" ou "Mais clicados". */
export const SORT: "Maior desconto" | "Mais clicados" = "Maior desconto";

/** Categorias do filtro. Precisam bater com `category` dos produtos. */
export const CATS = ["Tudo", "Promoções do dia", "Beleza", "Casa"];
