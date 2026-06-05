import { Beef, Fish, Flame, Music, Pizza, Trophy } from "lucide-react";

const highlights = [
  {
    title: "Carnes assadas na brasa",
    text: "Cortes preparados no ponto e acompanhamentos generosos.",
    icon: Beef,
  },
  {
    title: "Pizzas",
    text: "Sabores classicos e combinacoes da casa para pedir hoje.",
    icon: Pizza,
  },
  {
    title: "Peixes",
    text: "Tilapia, peixe na brasa, camarao e opcoes regionais.",
    icon: Fish,
  },
  {
    title: "Ambiente familiar",
    text: "Casa simples, acolhedora e boa para reunir a familia.",
    icon: Flame,
  },
  {
    title: "Musica ao vivo",
    text: "Programacao para tornar a noite mais completa.",
    icon: Music,
  },
  {
    title: "Esportes na tela",
    text: "Um bom ponto para comer e acompanhar jogos.",
    icon: Trophy,
  },
];

export function Highlights() {
  return (
    <section className="bg-[#f8fbff] py-16 text-coal">
      <div className="section-shell">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <span className="text-sm font-black uppercase tracking-[0.18em] text-ember-500">
              Destaques da casa
            </span>
            <h2 className="mt-3 text-3xl font-black text-coal sm:text-4xl">
              O essencial bem feito.
            </h2>
          </div>
          <p className="max-w-2xl leading-8 text-slate-600">
            Do almoco ao jantar, a proposta e simples: comida farta, atendimento
            direto e boas opcoes para reunir a familia.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ title, text, icon: Icon }) => (
            <article
              key={title}
              className="bg-white p-6 transition hover:bg-[#f1f6ff]"
            >
              <Icon className="mb-5 text-wine-700" size={28} />
              <h3 className="text-xl font-black text-coal">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
