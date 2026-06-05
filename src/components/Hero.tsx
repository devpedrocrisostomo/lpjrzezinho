import Image from "next/image";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";

type HeroProps = {
  onOrderClick: () => void;
};

export function Hero({ onOrderClick }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-coal pt-[76px] text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/churrasco.jpg')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,26,54,0.97)_0%,rgba(6,26,54,0.86)_42%,rgba(6,26,54,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(225,25,25,0.22),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-coal to-transparent" />

      <div className="section-shell relative z-10 grid min-h-[calc(88vh-76px)] gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <Image
              src="/images/logo-jr-zezinho.svg"
              alt="Logo J.R. Zezinho"
              width={92}
              height={92}
              className="h-[82px] w-[82px] rounded-full border-2 border-white/20 bg-wine-700 shadow-glow sm:h-[92px] sm:w-[92px]"
              priority
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/62">
                Montese, Fortaleza
              </p>
              <p className="mt-1 text-lg font-black text-white">
                Churrascaria Restaurante e Pizzaria
              </p>
            </div>
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:text-[78px]">
            Churrasco, pizza e comida boa no Montese.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
            Carnes na brasa, pizzas, peixes e pratos bem servidos em uma casa
            simples, familiar e conhecida pela comida farta.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#cardapio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ember-500 px-7 py-4 font-black text-white shadow-[0_14px_34px_rgba(225,25,25,0.32)] transition hover:bg-ember-600"
            >
              Ver cardapio <ArrowRight size={18} />
            </a>
            <button
              onClick={onOrderClick}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-black text-white backdrop-blur transition hover:border-white/45 hover:bg-white/15"
            >
              <MessageCircle size={18} />
              Fazer pedido no WhatsApp
            </button>
          </div>

          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 border-l-2 border-ember-500 pl-4">
              <Clock className="text-white/70" size={18} />
              <span className="text-sm font-bold text-white/82">Aberto ate 23:00</span>
            </div>
            <div className="flex items-center gap-3 border-l-2 border-ember-500 pl-4">
              <Phone className="text-white/70" size={18} />
              <span className="text-sm font-bold text-white/82">(85) 3491-0651</span>
            </div>
            <div className="flex items-center gap-3 border-l-2 border-ember-500 pl-4">
              <MapPin className="text-white/70" size={18} />
              <span className="text-sm font-bold text-white/82">R. Des. Praxedes, 568</span>
            </div>
          </div>
        </div>

        <aside className="hidden rounded border border-white/12 bg-white/[0.08] p-4 backdrop-blur-xl lg:block">
          <div className="relative h-[430px] overflow-hidden rounded">
            <Image
              src="/images/pizza-mista.jpg"
              alt="Pizza J.R. Zezinho"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coal/90 to-transparent p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/64">
                Destaque da casa
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Pizzas, brasa e pratos para compartilhar
              </h2>
            </div>
          </div>
        </aside>
      </div>

      <div className="relative z-10 border-y border-white/10 bg-white/[0.07] backdrop-blur">
        <div className="section-shell grid gap-4 py-5 text-sm font-bold text-white/76 sm:grid-cols-4">
          <span>Mesas na cobertura</span>
          <span>Musica ao vivo</span>
          <span>Ambiente familiar</span>
          <span>Bom para assistir esportes</span>
        </div>
      </div>
    </section>
  );
}
