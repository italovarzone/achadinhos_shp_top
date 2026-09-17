import { Catalog } from "@/components/Catalog";
import { PRODUCTS, CATS, SORT } from "@/data/products";

export default function Home() {
  return (
    <>
      <div className="wrap">
        <header className="hero">
          <div className="eyebrow">
            <span className="label">central de links</span>
            <span className="rule" />
          </div>
          <h1>
            Achadinhos <em>Shopee</em> Top
          </h1>
          <p className="lede">
            Os achadinhos que eu testei e recomendo. Toque no produto para
            abrir direto na Shopee — se você tem o app instalado, ele abre lá.
          </p>
          <div className="meta">
            <span>{PRODUCTS.length} achadinhos</span>
            <span>·</span>
            <span>atualizado hoje</span>
            <span>·</span>
            <span>links de afiliado</span>
          </div>
        </header>
      </div>

      <Catalog products={PRODUCTS} cats={CATS} sort={SORT} />
    </>
  );
}
