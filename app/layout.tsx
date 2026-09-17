import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achadinhos Shopee Top",
  description:
    "Central de achadinhos da Shopee — links diretos, testados e organizados por categoria.",
  openGraph: {
    title: "Achadinhos Shopee Top",
    description: "Os achadinhos que eu testei e recomendo. Abre direto na Shopee.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF8F2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:ital,wght@0,400..700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
