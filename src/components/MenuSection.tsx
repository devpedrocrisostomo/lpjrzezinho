"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { menuCategories, menuItems, type MenuCategory, type MenuItem } from "@/data/menuData";
import { formatCurrency } from "@/lib/format";

type MenuSectionProps = {
  onAddItem: (item: MenuItem) => void;
  variant?: "preview" | "full";
};

export function MenuSection({ onAddItem, variant = "full" }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "Todos">("Todos");
  const [search, setSearch] = useState("");
  const isPreview = variant === "preview";

  const filteredItems = useMemo(() => {
    if (isPreview) {
      return menuItems.filter((item) => item.featured).slice(0, 6);
    }

    const term = search.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [isPreview, search, selectedCategory]);

  const groupedItems = useMemo(() => {
    return menuCategories
      .map((category) => ({
        category,
        items: filteredItems.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredItems]);

  return (
    <section id={isPreview ? "cardapio-preview" : "cardapio"} className="bg-white py-16 text-coal">
      <div className="section-shell">
        <div className="grid gap-7 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <span className="text-sm font-black uppercase tracking-[0.18em] text-ember-500">
              Cardapio digital
            </span>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-5xl">
              {isPreview ? "Pratos que resumem a casa." : "Cardapio completo"}
            </h2>
            {isPreview && (
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Carnes na brasa, pizzas, peixes e porcoes para pedir pelo
                WhatsApp ou escolher antes de chegar.
              </p>
            )}
          </div>

          {!isPreview ? (
            <div className="rounded border border-slate-200 bg-[#f8fbff] p-4">
            <label className="relative block w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar prato, pizza ou bebida"
                className="h-[52px] w-full rounded border border-slate-200 bg-white pl-12 pr-4 text-base outline-none transition focus:border-wine-700"
              />
            </label>
            </div>
          ) : (
            <div className="rounded border border-slate-200 bg-[#f8fbff] p-5">
              <p className="text-sm font-bold leading-7 text-slate-700">
                Consulte o cardapio completo com categorias, busca e montagem
                de pedido em uma tela propria.
              </p>
              <Link
                href="/cardapio"
                className="mt-4 inline-flex rounded-full bg-wine-700 px-5 py-3 text-sm font-black text-white hover:bg-ember-600"
              >
                Ver cardapio completo
              </Link>
            </div>
          )}
        </div>

        {!isPreview && <div className="menu-scroll mt-8 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
          {["Todos", ...menuCategories].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as MenuCategory | "Todos")}
              className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-black transition ${
                selectedCategory === category
                  ? "bg-wine-700 text-white"
                  : "bg-[#f1f6ff] text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>}

        {isPreview ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="rounded border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(6,26,54,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(6,26,54,0.14)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black leading-tight">{item.name}</h3>
                  <span className="whitespace-nowrap text-lg font-black text-ember-500">
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <p className="mt-3 min-h-14 leading-7 text-slate-600">{item.description}</p>
                  <Link
                    href="/cardapio"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine-700 px-4 py-3 font-black text-white transition hover:bg-ember-600"
                  >
                    Ver no cardapio
                  </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-10">
            {groupedItems.map((group) => (
              <section key={group.category} className="scroll-mt-28">
                <div className="mb-4 flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      J.R. Zezinho
                    </p>
                    <h3 className="mt-1 text-2xl font-black text-coal">{group.category}</h3>
                  </div>
                  <span className="text-sm font-bold text-slate-500">
                    {group.items.length} itens
                  </span>
                </div>

                <div className="grid gap-3">
                  {group.items.map((item) => (
                    <article
                      key={item.id}
                      className="grid gap-4 rounded border border-slate-200 bg-[#fbfdff] p-4 transition hover:border-wine-700/35 hover:bg-white sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <h4 className="text-lg font-black leading-tight text-coal">{item.name}</h4>
                          <strong className="text-lg font-black text-ember-500">
                            {formatCurrency(item.price)}
                          </strong>
                        </div>
                        <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={() => onAddItem(item)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-wine-700 px-5 py-3 text-sm font-black text-white transition hover:bg-ember-600"
                      >
                        <Plus size={17} />
                        Adicionar
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {isPreview && (
          <div className="mt-10 text-center">
            <Link
              href="/cardapio"
              className="inline-flex rounded-full border border-wine-700 px-6 py-4 font-black text-wine-700 hover:bg-wine-700 hover:text-white"
            >
              Abrir pagina do cardapio
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
