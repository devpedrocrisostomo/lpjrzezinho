"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { MenuSection } from "@/components/MenuSection";
import { OrderPanel } from "@/components/OrderPanel";
import { assetPath } from "@/lib/assets";
import type { MenuItem } from "@/data/menuData";
import type { CartItem } from "@/types/order";

export default function CardapioPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [feedback, setFeedback] = useState("");

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  function addItem(item: MenuItem) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });

    setFeedback(`${item.name} adicionado ao pedido.`);
    window.setTimeout(() => setFeedback(""), 1800);
  }

  function increaseItem(itemId: string) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseItem(itemId: string) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(itemId: string) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }

  function scrollToOrder() {
    document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="bg-white pt-[76px]">
      <Header cartCount={cartCount} onOrderClick={scrollToOrder} />
      <section className="relative overflow-hidden bg-[#061a36] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url('${assetPath("/images/pizza-brasa.jpg")}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061a36] via-[#061a36]/92 to-[#061a36]/62" />
        <div className="section-shell relative z-10 grid gap-8 py-12 lg:grid-cols-[1fr_260px] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/58">
              Cardapio digital
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
              Escolha, revise e envie pelo WhatsApp.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
              Cardapio organizado por categoria para montar o pedido com calma,
              seja para retirada, mesa ou entrega.
            </p>
          </div>
          <div className="hidden justify-self-end lg:block">
            <Image
              src={assetPath("/images/logo-jr-zezinho.svg")}
              alt="Logo J.R. Zezinho"
              width={190}
              height={190}
              className="rounded-full border-4 border-white/15 shadow-glow"
              priority
            />
          </div>
        </div>
      </section>
      <MenuSection onAddItem={addItem} />
      <OrderPanel
        items={cartItems}
        onIncrease={increaseItem}
        onDecrease={decreaseItem}
        onRemove={removeItem}
        onClear={() => setCartItems([])}
      />

      {feedback && (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-32px)] max-w-md -translate-x-1/2 rounded-full bg-ember-500 px-5 py-4 text-center font-black text-white shadow-glow">
          {feedback}
        </div>
      )}
    </main>
  );
}
