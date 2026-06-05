import type { MenuItem } from "@/data/menuData";

export type OrderType = "retirada" | "local" | "entrega";
export type PaymentMethod = "Pix" | "Dinheiro" | "Cartao";
export type OrderStatus = "Novo" | "Em preparo" | "Finalizado" | "Cancelado";

export type CartItem = MenuItem & {
  quantity: number;
};

export type SavedOrder = {
  id: string;
  customerName: string;
  orderType: OrderType;
  address?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  changeFor?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
};
