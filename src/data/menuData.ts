export type MenuCategory =
  | "Churrasco"
  | "Pizzas"
  | "Peixes"
  | "Pratos executivos"
  | "Bebidas"
  | "Guarnicoes"
  | "Promocoes";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image?: string;
  featured?: boolean;
};

export const menuCategories: MenuCategory[] = [
  "Churrasco",
  "Pizzas",
  "Peixes",
  "Pratos executivos",
  "Bebidas",
  "Guarnicoes",
  "Promocoes",
];

export const menuItems: MenuItem[] = [
  {
    id: "picanha-brasa",
    name: "Picanha na brasa",
    category: "Churrasco",
    description: "Corte nobre assado na brasa com farofa e vinagrete.",
    price: 62,
    image: "/images/churrasco.jpg",
    featured: true,
  },
  {
    id: "carne-sol-fritas",
    name: "Carne de sol com fritas",
    category: "Churrasco",
    description: "Carne de sol acebolada, batata frita e salada.",
    price: 42,
    image: "/images/calabresa-fritas.jpg",
  },
  {
    id: "misto-churrasco",
    name: "Misto de churrasco",
    category: "Churrasco",
    description: "Porcao com carnes assadas, linguica, frango e acompanhamentos.",
    price: 78,
    image: "/images/hero-peixe.jpg",
    featured: true,
  },
  {
    id: "pizza-calabresa",
    name: "Pizza Calabresa",
    category: "Pizzas",
    description: "Mussarela, calabresa, cebola, oregano e azeitona.",
    price: 38,
    image: "/images/pizza-mista.jpg",
    featured: true,
  },
  {
    id: "pizza-frango",
    name: "Pizza Frango com catupiry",
    category: "Pizzas",
    description: "Frango desfiado, milho, catupiry, mussarela e oregano.",
    price: 42,
    image: "/images/pizza-brasa.jpg",
  },
  {
    id: "pizza-portuguesa",
    name: "Pizza Portuguesa",
    category: "Pizzas",
    description: "Presunto, ovo, cebola, ervilha, mussarela e azeitona.",
    price: 44,
    image: "/images/pizza-brasa.jpg",
  },
  {
    id: "tilapia-frita",
    name: "Tilapia frita completa",
    category: "Peixes",
    description: "Peixe inteiro com arroz, fritas, salada e limao.",
    price: 58,
    image: "/images/tilapia.jpg",
    featured: true,
  },
  {
    id: "peixe-brasa",
    name: "Peixe na brasa",
    category: "Peixes",
    description: "Peixe assado com baiao, salada e macaxeira.",
    price: 64,
    image: "/images/hero-peixe.jpg",
  },
  {
    id: "caranguejo",
    name: "Caranguejo ao molho",
    category: "Peixes",
    description: "Caranguejo com molho especial da casa.",
    price: 49,
    image: "/images/caranguejo.jpg",
  },
  {
    id: "executivo-frango",
    name: "Executivo de frango",
    category: "Pratos executivos",
    description: "Frango grelhado, arroz, feijao, salada e farofa.",
    price: 24,
  },
  {
    id: "executivo-carne",
    name: "Executivo de carne",
    category: "Pratos executivos",
    description: "Carne assada, arroz, feijao, salada e batata.",
    price: 29,
  },
  {
    id: "executivo-camarao",
    name: "Camarao cremoso",
    category: "Pratos executivos",
    description: "Camarao ao molho, arroz temperado e salada.",
    price: 46,
    image: "/images/camarao-massa.jpg",
  },
  {
    id: "refrigerante",
    name: "Refrigerante lata",
    category: "Bebidas",
    description: "Coca-Cola, Guarana ou similares.",
    price: 7,
  },
  {
    id: "cerveja-long-neck",
    name: "Cerveja long neck",
    category: "Bebidas",
    description: "Opcoes geladas conforme disponibilidade.",
    price: 12,
    image: "/images/ambiente.jpg",
  },
  {
    id: "suco-natural",
    name: "Suco natural",
    category: "Bebidas",
    description: "Sabores variados preparados na hora.",
    price: 10,
  },
  {
    id: "baiao",
    name: "Baiao de dois",
    category: "Guarnicoes",
    description: "Porcao de baiao temperado da casa.",
    price: 14,
  },
  {
    id: "batata-frita",
    name: "Batata frita",
    category: "Guarnicoes",
    description: "Porcao crocante para acompanhar carnes e pizzas.",
    price: 16,
  },
  {
    id: "macaxeira",
    name: "Macaxeira frita",
    category: "Guarnicoes",
    description: "Macaxeira dourada e sequinha.",
    price: 15,
  },
  {
    id: "combo-pizza-refri",
    name: "Pizza grande + refrigerante",
    category: "Promocoes",
    description: "Pizza grande selecionada com refrigerante 1L.",
    price: 49.9,
    image: "/images/pizza-mista.jpg",
  },
  {
    id: "combo-churrasco-familia",
    name: "Churrasco familia",
    category: "Promocoes",
    description: "Carnes na brasa com baiao, fritas, salada e farofa.",
    price: 89.9,
    image: "/images/churrasco.jpg",
    featured: true,
  },
];
