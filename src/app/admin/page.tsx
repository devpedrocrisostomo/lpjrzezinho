"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Lock, Trash2 } from "lucide-react";
import { clearSavedOrders, getSavedOrders, updateOrderStatus } from "@/lib/orders";
import { formatCurrency } from "@/lib/format";
import type { OrderStatus, SavedOrder } from "@/types/order";

const statuses: OrderStatus[] = ["Novo", "Em preparo", "Finalizado", "Cancelado"];

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem("jr-zezinho-admin") === "true");
    setOrders(getSavedOrders());
  }, []);

  const summary = useMemo(() => {
    const itemCount = new Map<string, number>();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        itemCount.set(item.name, (itemCount.get(item.name) ?? 0) + item.quantity);
      });
    });

    return {
      totalOrders: orders.length,
      totalSold: orders.reduce((sum, order) => sum + order.total, 0),
      topItems: Array.from(itemCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    };
  }, [orders]);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username === "admin" && password === "jrzezinho123") {
      window.localStorage.setItem("jr-zezinho-admin", "true");
      setIsAuthenticated(true);
      setLoginError("");
      setOrders(getSavedOrders());
      return;
    }

    setLoginError("Usuario ou senha invalidos.");
  }

  function handleStatusChange(orderId: string, status: OrderStatus) {
    setOrders(updateOrderStatus(orderId, status));
  }

  function handleClearOrders() {
    clearSavedOrders();
    setOrders([]);
  }

  if (!isAuthenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-coal px-4 text-white">
        <form onSubmit={handleLogin} className="glass-panel w-full max-w-md rounded p-6">
          <div className="grid h-12 w-12 place-items-center rounded bg-wine-500 text-white">
            <Lock size={22} />
          </div>
          <h1 className="mt-5 text-3xl font-black">Admin J.R. Zezinho</h1>
          <p className="mt-2 text-ember-50/70">Acesso local para acompanhar pedidos simulados.</p>
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-bold">
              Usuario
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="h-12 rounded border border-white/15 bg-white/10 px-4 outline-none focus:border-ember-300"
                placeholder="admin"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Senha
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="h-12 rounded border border-white/15 bg-white/10 px-4 outline-none focus:border-ember-300"
                placeholder="jrzezinho123"
              />
            </label>
          </div>
          {loginError && <p className="mt-4 rounded bg-wine-500/20 p-3 text-sm font-bold">{loginError}</p>}
          <button className="mt-6 w-full rounded bg-ember-500 px-5 py-4 font-black text-white hover:bg-ember-600">
            Entrar
          </button>
          <Link href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ember-200">
            <ArrowLeft size={16} /> Voltar para a landing page
          </Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ember-50 text-coal">
      <header className="border-b border-stone-200 bg-white">
        <div className="section-shell flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black">Dashboard de pedidos</h1>
            <p className="text-stone-600">Pedidos salvos no localStorage deste navegador.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="rounded border border-stone-300 px-4 py-3 font-black hover:bg-stone-100">
              Ver site
            </Link>
            <button
              onClick={handleClearOrders}
              className="inline-flex items-center gap-2 rounded bg-wine-500 px-4 py-3 font-black text-white hover:bg-wine-700"
            >
              <Trash2 size={18} />
              Limpar pedidos
            </button>
          </div>
        </div>
      </header>

      <section className="section-shell py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded border border-stone-200 bg-white p-6">
            <span className="text-sm font-black uppercase text-stone-500">Total de pedidos</span>
            <strong className="mt-3 block text-4xl font-black">{summary.totalOrders}</strong>
          </div>
          <div className="rounded border border-stone-200 bg-white p-6">
            <span className="text-sm font-black uppercase text-stone-500">Valor vendido</span>
            <strong className="mt-3 block text-4xl font-black text-ember-500">
              {formatCurrency(summary.totalSold)}
            </strong>
          </div>
          <div className="rounded border border-stone-200 bg-white p-6">
            <span className="text-sm font-black uppercase text-stone-500">Itens mais pedidos</span>
            <div className="mt-3 space-y-2 text-sm font-bold">
              {summary.topItems.length ? (
                summary.topItems.map(([item, quantity]) => (
                  <p key={item} className="flex justify-between gap-3">
                    <span>{item}</span>
                    <span>{quantity}x</span>
                  </p>
                ))
              ) : (
                <p className="text-stone-500">Sem dados ainda.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto rounded border border-stone-200 bg-white">
          <table className="w-full min-w-[860px] text-left">
            <thead className="bg-coal text-white">
              <tr>
                <th className="p-4">Cliente</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Itens</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-t border-stone-200 align-top">
                    <td className="p-4 font-black">{order.customerName}</td>
                    <td className="p-4 capitalize">{order.orderType}</td>
                    <td className="p-4">
                      {order.items.map((item) => (
                        <div key={item.id}>
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-black text-ember-500">{formatCurrency(order.total)}</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(event) => handleStatusChange(order.id, event.target.value as OrderStatus)}
                        className="h-10 rounded border border-stone-300 bg-white px-3 font-bold"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-sm text-stone-600">
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(order.createdAt))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    Nenhum pedido salvo ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
