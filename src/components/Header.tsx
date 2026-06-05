"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type HeaderProps = {
  cartCount: number;
  onOrderClick: () => void;
  orderHref?: string;
};

function getNavItems(orderHref: string) {
  return [
  ["Inicio", "/#inicio"],
  ["Cardapio", "/cardapio"],
  ["Sobre", "/#sobre"],
  ["Pedido", orderHref],
  ["Localizacao", "/#localizacao"],
  ["Contato", "/#contato"],
  ];
}

export function Header({ cartCount, onOrderClick, orderHref = "#pedido" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const navItems = getNavItems(orderHref);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#061a36] shadow-[0_18px_50px_rgba(0,0,0,0.26)]">
      <div className="section-shell flex h-[76px] items-center justify-between">
        <Link href="/#inicio" className="flex items-center gap-3">
          <Image
            src="/images/logo-jr-zezinho.svg"
            alt="Logo J.R. Zezinho"
            width={60}
            height={60}
            className="h-[58px] w-[58px] rounded-full border-2 border-white/18 object-contain shadow-glow"
            priority
          />
          <span className="hidden leading-tight sm:block">
            <span className="block text-[11px] font-black uppercase tracking-[0.18em] text-white/62">
              Churrascaria, Restaurante e Pizzaria
            </span>
            <span className="block text-lg font-black text-white">J.R. Zezinho Montese</span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-full border border-white/12 bg-[#0b2a55] px-2 py-2 lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-bold text-white/82 transition hover:bg-white/12 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOrderClick}
            className="relative inline-flex items-center gap-2 rounded-full bg-ember-500 px-4 py-3 text-sm font-black text-white shadow-[0_10px_28px_rgba(225,25,25,0.28)] transition hover:bg-ember-600"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Fazer pedido</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-wine-700 px-1 text-xs text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="grid h-11 w-11 place-items-center rounded border border-white/15 text-white lg:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Abrir menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#061a36] lg:hidden">
          <nav className="section-shell grid py-4">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 text-sm font-semibold text-ember-50"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
