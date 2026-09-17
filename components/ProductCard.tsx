"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";

const TICK_MIN_MS = 2000;
const TICK_MAX_MS = 5000;
const TICK_MIN_STEP = 1;
const TICK_MAX_STEP = 4;

const IconOpen = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </svg>
);

const IconCopy = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

const IconDone = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

const IconPhoto = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="m5 18 5-5 3 3 4-5 3 4" />
  </svg>
);

/** Foto do card: mostra placeholder tipo preview de link do WhatsApp
 * enquanto a imagem real carrega, e some com um fade quando ela chega. */
function Thumb({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="thumb thumb-empty">
        <IconPhoto />
      </div>
    );
  }

  return (
    <div className="thumb">
      {!loaded && (
        <div className="thumb-placeholder">
          <IconPhoto />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={"thumb-img" + (loaded ? " loaded" : "")}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/** Conta ambiente que sobe sozinha a cada poucos segundos (só de tela, não persiste). */
function useAmbientTicks() {
  const [ticks, setTicks] = useState(0);
  const [bumped, setBumped] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay =
        TICK_MIN_MS + Math.random() * (TICK_MAX_MS - TICK_MIN_MS);
      timer = setTimeout(() => {
        const step =
          TICK_MIN_STEP +
          Math.floor(Math.random() * (TICK_MAX_STEP - TICK_MIN_STEP + 1));
        setTicks((n) => n + step);
        setBumped(true);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!bumped) return;
    const t = setTimeout(() => setBumped(false), 420);
    return () => clearTimeout(t);
  }, [bumped]);

  return { ticks, bumped };
}

export function ProductCard({
  product,
  totalClicks,
  copied,
  onOpen,
  onCopy,
}: {
  product: Product;
  totalClicks: number;
  copied: boolean;
  onOpen: () => void;
  onCopy: () => void;
}) {
  const pending = !product.url;
  const fallbackUrl = "https://s.shopee.com.br/";
  const { ticks, bumped } = useAmbientTicks();
  const displayedClicks = totalClicks + ticks;

  return (
    <article className="card">
      <Thumb src={product.image} alt={product.title} />
      <div className="card-top">
        <span className={"clicks" + (bumped ? " bump" : "")}>
          {displayedClicks.toLocaleString("pt-BR")} cliques
        </span>
      </div>
      <h2>{product.title}</h2>
      {pending && <span className="pending">link pendente</span>}
      <div className="actions">
        <a
          className="btn"
          href={product.url || fallbackUrl}
          target="_blank"
          rel="noopener sponsored"
          onClick={onOpen}
        >
          Abrir na Shopee
          <IconOpen />
        </a>
        <button
          className={"copy" + (copied ? " done" : "")}
          type="button"
          title="Copiar link"
          aria-label="Copiar link"
          onClick={onCopy}
        >
          <span className="ico-copy">
            <IconCopy />
          </span>
          <span className="ico-done">
            <IconDone />
          </span>
        </button>
      </div>
    </article>
  );
}
