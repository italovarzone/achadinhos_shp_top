"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const STORAGE_KEY = "achadinhos_clicks_v1";
const FALLBACK_URL = "https://s.shopee.com.br/";

function offPercent(off: string): number {
  return parseInt(off.replace(/\D/g, ""), 10) || 0;
}

function inCategory(product: Product, category: string): boolean {
  if (category === "Tudo") return true;
  if (category === "Promoções do dia") return offPercent(product.off) >= 40;
  return product.category === category;
}

function readExtraClicks(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function Catalog({
  products,
  cats,
  sort,
}: {
  products: Product[];
  cats: string[];
  sort: "Maior desconto" | "Mais clicados";
}) {
  const [active, setActive] = useState("Tudo");
  const [extra, setExtra] = useState<Record<string, number>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setExtra(readExtraClicks());
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 2200);
    return () => clearTimeout(t);
  }, [toastMsg]);

  useEffect(() => {
    if (!copiedId) return;
    const t = setTimeout(() => setCopiedId(null), 1800);
    return () => clearTimeout(t);
  }, [copiedId]);

  const totalClicks = (p: Product) => p.clicks + (extra[p.id] || 0);

  const bump = (p: Product) => {
    setExtra((prev) => {
      const next = { ...prev, [p.id]: (prev[p.id] || 0) + 1 };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore write failures (private mode, quota, etc.)
      }
      return next;
    });
  };

  const chipCounts = useMemo(
    () =>
      cats
        .map((c) => ({ c, n: products.filter((p) => inCategory(p, c)).length }))
        .filter(({ c, n }) => n > 0 || c === "Tudo"),
    [cats, products]
  );

  const list = useMemo(() => {
    const filtered = products.filter((p) => inCategory(p, active));
    const sorted = [...filtered].sort((a, b) =>
      sort === "Maior desconto"
        ? offPercent(b.off) - offPercent(a.off)
        : totalClicks(b) - totalClicks(a)
    );
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, active, sort, extra]);

  const handleOpen = (p: Product) => {
    bump(p);
    if (!p.url) setToastMsg("Troque este link pelo seu de afiliado.");
  };

  const handleCopy = async (p: Product) => {
    const url = p.url || FALLBACK_URL;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } finally {
      setCopiedId(p.id);
      setToastMsg(p.url ? "Link copiado." : "Link de exemplo copiado.");
    }
  };

  return (
    <>
      <div className="bar">
        <div className="chips">
          {chipCounts.map(({ c, n }) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={c === active}
              onClick={() => setActive(c)}
            >
              {c} <span>{n}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="wrap">
        <main>
          <div className="grid">
            {list.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                totalClicks={totalClicks(p)}
                copied={copiedId === p.id}
                onOpen={() => handleOpen(p)}
                onCopy={() => handleCopy(p)}
              />
            ))}
          </div>
          <p className="foot">
            os preços mudam · confira na Shopee antes de comprar
          </p>
        </main>
      </div>

      {toastMsg && (
        <div className="toast">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E5654B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m4 12.5 5 5L20 6.5" />
          </svg>
          <span>{toastMsg}</span>
        </div>
      )}
    </>
  );
}
