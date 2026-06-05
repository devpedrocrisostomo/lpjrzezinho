import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "J.R. Zezinho Montese | Churrascaria, Restaurante e Pizzaria",
  description:
    "Landing page com cardapio digital e pedidos via WhatsApp para a Churrascaria Restaurante e Pizzaria J.R. Zezinho - Montese.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
