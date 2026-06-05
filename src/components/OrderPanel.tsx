"use client";

import { Minus, Plus, Send, Trash2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import { saveOrder } from "@/lib/orders";
import type { CartItem, OrderType, PaymentMethod, SavedOrder } from "@/types/order";

type OrderPanelProps = {
  items: CartItem[];
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
};

const whatsappNumber = "558534910651";

export function OrderPanel({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: OrderPanelProps) {
  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("retirada");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Pix");
  const [changeFor, setChangeFor] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  function buildMessage(order: SavedOrder) {
    const itemLines = order.items
      .map((item) => `- ${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}`)
      .join("\n");

    return [
      "Ola, J.R. Zezinho! Gostaria de fazer um pedido:",
      "",
      `Nome: ${order.customerName}`,
      `Tipo de pedido: ${order.orderType}`,
      order.address ? `Endereco: ${order.address}` : "",
      "",
      "Itens:",
      itemLines,
      "",
      "Observacoes:",
      order.notes || "Sem observacoes",
      "",
      `Pagamento: ${order.paymentMethod}`,
      order.changeFor ? `Troco para: ${order.changeFor}` : "",
      "",
      `Total: ${formatCurrency(order.total)}`,
    ]
      .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
      .join("\n");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!customerName.trim()) {
      setError("Informe o nome do cliente.");
      return;
    }

    if (!items.length) {
      setError("Adicione pelo menos um item ao pedido.");
      return;
    }

    if (orderType === "entrega" && !address.trim()) {
      setError("Informe o endereco para entrega.");
      return;
    }

    const order: SavedOrder = {
      id: crypto.randomUUID(),
      customerName: customerName.trim(),
      orderType,
      address: orderType === "entrega" ? address.trim() : undefined,
      notes: notes.trim(),
      paymentMethod,
      changeFor: paymentMethod === "Dinheiro" ? changeFor.trim() : undefined,
      items,
      total,
      status: "Novo",
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    setError("");
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildMessage(order))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClear();
  }

  return (
    <section id="pedido" className="bg-[#061a36] py-16 text-white">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <span className="text-sm font-black uppercase tracking-[0.18em] text-white/58">
            Pedido online
          </span>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            Revise seu pedido antes de enviar.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/72">
            Adicione os itens do cardapio, informe os dados principais e envie
            tudo formatado para o WhatsApp do restaurante.
          </p>

          <div className="mt-8 space-y-3">
            {items.length === 0 ? (
              <div className="rounded border border-dashed border-white/20 bg-white/[0.03] p-6 text-white/70">
                Nenhum item adicionado ainda. Use o cardapio para montar o pedido.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between gap-4 rounded border border-white/10 bg-white/[0.05] p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-black">{item.name}</h3>
                    <p className="text-sm text-white/62">
                      {formatCurrency(item.price)} cada
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center rounded border border-white/15">
                      <button type="button" onClick={() => onDecrease(item.id)} className="grid h-10 w-10 place-items-center">
                        <Minus size={16} />
                      </button>
                      <span className="grid h-10 w-12 place-items-center font-black">{item.quantity}</span>
                      <button type="button" onClick={() => onIncrease(item.id)} className="grid h-10 w-10 place-items-center">
                        <Plus size={16} />
                      </button>
                    </div>
                    <strong className="min-w-24 text-right text-white">
                      {formatCurrency(item.price * item.quantity)}
                    </strong>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-ember-500"
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded p-5 shadow-[0_18px_46px_rgba(0,0,0,0.18)]">
          <h3 className="text-2xl font-black">Finalizar pedido</h3>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-bold">
              Nome do cliente
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                className="h-12 rounded border border-white/15 bg-white/10 px-4 text-white outline-none focus:border-ember-300"
                placeholder="Ex: Pedro"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Tipo de pedido
              <select
                value={orderType}
                onChange={(event) => setOrderType(event.target.value as OrderType)}
                className="h-12 rounded border border-white/15 bg-white/10 px-4 text-white outline-none focus:border-ember-300"
              >
                <option className="text-coal" value="retirada">Retirada</option>
                <option className="text-coal" value="local">Comer no local</option>
                <option className="text-coal" value="entrega">Entrega</option>
              </select>
            </label>

            {orderType === "entrega" && (
              <label className="grid gap-2 text-sm font-bold">
                Endereco de entrega
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="h-12 rounded border border-white/15 bg-white/10 px-4 text-white outline-none focus:border-ember-300"
                  placeholder="Rua, numero, bairro e complemento"
                />
              </label>
            )}

            <label className="grid gap-2 text-sm font-bold">
              Forma de pagamento
              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
                className="h-12 rounded border border-white/15 bg-white/10 px-4 text-white outline-none focus:border-ember-300"
              >
                <option className="text-coal" value="Pix">Pix</option>
                <option className="text-coal" value="Dinheiro">Dinheiro</option>
                <option className="text-coal" value="Cartao">Cartao</option>
              </select>
            </label>

            {paymentMethod === "Dinheiro" && (
              <label className="grid gap-2 text-sm font-bold">
                Troco para
                <input
                  value={changeFor}
                  onChange={(event) => setChangeFor(event.target.value)}
                  className="h-12 rounded border border-white/15 bg-white/10 px-4 text-white outline-none focus:border-ember-300"
                  placeholder="Ex: R$ 100,00"
                />
              </label>
            )}

            <label className="grid gap-2 text-sm font-bold">
              Observacoes
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                className="rounded border border-white/15 bg-white/10 px-4 py-3 text-white outline-none focus:border-ember-300"
                placeholder="Ex: sem cebola, ponto da carne, mesa..."
              />
            </label>
          </div>

          {error && <p className="mt-4 rounded bg-ember-500/20 p-3 text-sm font-bold text-white">{error}</p>}

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-lg font-bold">Total</span>
            <strong className="text-2xl font-black text-white">{formatCurrency(total)}</strong>
          </div>

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-4 font-black text-white transition hover:bg-ember-600"
          >
            <Send size={18} />
            Enviar pedido pelo WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
