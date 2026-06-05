import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

const address = "R. Des. Praxedes, 568 - Bom Futuro, Fortaleza - CE, 60416-480";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
const whatsappUrl = "https://wa.me/558534910651";

export function AboutSection() {
  return (
    <section id="sobre" className="bg-[#061a36] py-16 text-white">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="text-sm font-black uppercase tracking-[0.18em] text-white/58">
            Sobre o restaurante
          </span>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Uma casa simples, reconhecida pela comida bem servida.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/72">
            O J.R. Zezinho e uma churrascaria, restaurante e pizzaria localizada
            no Montese, em Fortaleza. Com ambiente simples, familiar e acolhedor,
            e conhecido pelas carnes assadas na brasa, pizzas, peixes e pratos
            bem servidos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-80 overflow-hidden rounded border border-white/10">
            <Image
              src="/images/ambiente.jpg"
              alt="Ambiente do J.R. Zezinho"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative mt-10 h-80 overflow-hidden rounded border border-white/10">
            <Image
              src="/images/pizza-mista.jpg"
              alt="Pizza do J.R. Zezinho"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const reviews = [
    ["Comida bem servida", "Pratos fartos para ir com a familia e sair satisfeito."],
    ["Pizza no ponto", "Massa boa, recheio caprichado e atendimento rapido."],
    ["Churrasco de bairro", "Casa simples, direta e com carne assada do jeito certo."],
  ];

  return (
    <section className="bg-white py-16 text-coal">
      <div className="section-shell">
        <span className="text-sm font-black uppercase tracking-[0.18em] text-ember-500">
          Avaliacoes
        </span>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">
          O tipo de lugar que vira ponto fixo.
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded border border-slate-200 bg-slate-200 md:grid-cols-3">
          {reviews.map(([title, text]) => (
            <article key={title} className="bg-[#f8fbff] p-6">
              <div className="text-ember-500">★★★★★</div>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationContact() {
  return (
    <section id="localizacao" className="bg-[#061a36] py-16 text-white">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <span className="text-sm font-black uppercase tracking-[0.18em] text-white/58">
            Localizacao
          </span>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            No Montese, perto de quem quer comer bem.
          </h2>
          <div className="mt-6 overflow-hidden rounded border border-white/10 bg-white/[0.04]">
            <iframe
              title="Mapa da Churrascaria Restaurante e Pizzaria J.R. Zezinho"
              src={mapsEmbedUrl}
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-6">
            <p className="flex gap-3 text-lg font-bold">
              <MapPin className="mt-1 shrink-0 text-white/70" />
              {address}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-4 font-black text-white hover:bg-ember-600"
              >
                <MapPin size={18} />
                Abrir no Google Maps
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-4 font-black text-white hover:border-white/40"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
            </div>
          </div>
        </div>

        <aside id="contato" className="glass-panel rounded p-6">
          <h3 className="text-2xl font-black">Contato</h3>
          <div className="mt-5 space-y-5 text-white/72">
            <p className="flex gap-3">
              <Phone className="shrink-0 text-white/70" />
              <span>
                <strong className="block text-white">Telefone / WhatsApp</strong>
                (85) 3491-0651
              </span>
            </p>
            <p>
              <strong className="block text-white">Horario</strong>
              Aberto ate 23:00
            </p>
            <p>
              <strong className="block text-white">Servicos</strong>
              Mesas na cobertura, musica ao vivo, ambiente familiar e bom para
              assistir esportes.
            </p>
            <p>
              <strong className="block text-white">Preco medio</strong>
              R$ 20-80 por pessoa
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-wine-700 py-14 text-white">
      <div className="section-shell flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <span className="text-sm font-black uppercase tracking-[0.18em] text-white/60">
            Peca agora
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            Seu pedido pode sair direto pelo WhatsApp.
          </h2>
        </div>
        <Link
          href="/cardapio#pedido"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ember-500 px-6 py-4 font-black text-white hover:bg-ember-600"
        >
          <MessageCircle size={19} />
          Peca agora pelo WhatsApp
        </Link>
      </div>
    </section>
  );
}
