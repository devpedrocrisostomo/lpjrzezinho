"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { MenuSection } from "@/components/MenuSection";
import { AboutSection, FinalCta, LocationContact, Testimonials } from "@/components/InfoSections";

export default function Home() {
  function scrollToOrder() {
    window.location.href = "/cardapio#pedido";
  }

  return (
    <main>
      <Header cartCount={0} onOrderClick={scrollToOrder} orderHref="/cardapio#pedido" />
      <Hero onOrderClick={scrollToOrder} />
      <Highlights />
      <MenuSection onAddItem={() => undefined} variant="preview" />
      <AboutSection />
      <Testimonials />
      <LocationContact />
      <FinalCta />
    </main>
  );
}
