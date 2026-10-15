import React from 'react';
import { ArrowRight, Star, Clock, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS, CAFE_INFO } from '../data/menuData';
import { CakeDripDivider } from './CakeDripDivider';

export function Hero() {
  const { addToCart } = useCart();
  const signatureKounefa = MENU_ITEMS.find(i => i.id === 'cookie-kounefa-pistache');

  return (
    <section className="relative overflow-hidden pt-8 pb-0 bg-gradient-to-b from-[#F9F5EC] via-[#F4EDE0] to-[#FAF7F2]">
      {/* Top Drip Accent Bar (Simulating rich blue ganache dripping over the cake tier) */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#143B45] z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-16 relative z-10">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Unboxed Metadata Kicker with Official Logo Seal */}
            <div className="flex items-center gap-3">
              <img
                src={CAFE_INFO.logoUrl}
                alt="Logo Cookies House"
                className="w-9 h-9 object-cover rounded-full border border-[#D8B168] shadow-xs bg-white"
              />
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8A7968]">
                <span>Artisan Pâtissier</span>
                <span aria-hidden="true">·</span>
                <span>Midoun, Djerba</span>
                <span aria-hidden="true">·</span>
                <span>Coffee Shop</span>
              </div>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#143B45] leading-[1.12] text-balance">
              Le temple du Cookie artisanal &amp; du Crookie à Djerba.
            </h1>

            {/* Subtitle measure 65-75ch */}
            <p className="text-base sm:text-lg text-[#52636B] leading-relaxed max-w-2xl">
              Des créations gourmandes pur beurre enfournées en continu dans notre laboratoire de Midoun. 
              Dégustez nos fameux Cookies Dubaï au kunafa croustillant, nos Crookies feuilletés à la pistache, 
              nos généreux plateaux brunch et notre café servi en Cupkie comestible.
            </p>

            {/* CTA Zone */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#carte"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#143B45] hover:bg-[#0E2C34] rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>Explorer la Carte Complète</span>
                <ArrowRight className="w-4 h-4 text-[#D8B168]" />
              </a>

              <a
                href="#brunch"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#143B45] bg-[#EAE3D2] hover:bg-[#E0D5BE] rounded-lg transition-all"
              >
                <span>Formules Brunch &amp; P'tit Déj</span>
              </a>
            </div>

            {/* Micro Trust Adjacency */}
            <div className="pt-4 border-t border-[#E8E0D2]/80 flex flex-wrap items-center gap-6 text-xs text-[#6B7C85]">
              <div className="flex items-center gap-1.5 font-medium">
                <div className="flex text-[#D89E34]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#143B45]">5.0 sur Google Maps</span>
              </div>
              <span aria-hidden="true" className="text-[#D0C5B4]">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#143B45]" />
                <span>Ouvert 7j/7 dès 7h30</span>
              </div>
              <span aria-hidden="true" className="text-[#D0C5B4]">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#143B45]" />
                <span>Midoun, Djerba</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image with Liquid Drip Accent */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D8C9B0] bg-[#143B45]/5 aspect-[4/3] lg:aspect-auto lg:h-[470px] group">
              <img
                src="/src/assets/images/hero_cookies_house_exterior_1792053636686.jpg"
                alt="Façade de Cookies House Djerba à Midoun"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E282F]/85 via-transparent to-black/10 pointer-events-none" />

              {/* Decorative top drip inside image frame */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#143B45]/70 to-transparent pointer-events-none" />

              {/* Floating Highlight Card */}
              {signatureKounefa && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-[#E8E0D2] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#143B45] uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-[#D89E34]" />
                      <span>Best-Seller du Jour</span>
                    </div>
                    <p className="text-sm font-semibold text-[#143B45] truncate">
                      {signatureKounefa.name}
                    </p>
                    <p className="text-xs text-[#6B7C85] font-mono tabular-nums">
                      {signatureKounefa.priceFormatted}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(signatureKounefa)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-[#143B45] hover:bg-[#0E2C34] rounded-lg transition-colors shrink-0 shadow-xs"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4-Item Feature Strip Below Hero */}
        <div className="mt-8 pt-8 border-t border-[#E8E0D2] grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#143B45]">100% Pur Beurre</p>
            <p className="text-xs text-[#6B7C85]">Pâte artisanale fraîche et chocolat de dégustation.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#143B45]">Le Phénomène Crookie</p>
            <p className="text-xs text-[#6B7C85]">Le mariage croustillant du croissant et du cookie moelleux.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#143B45]">Brunch &amp; P'tit Déj</p>
            <p className="text-xs text-[#6B7C85]">Plateaux salés et sucrés complets dès 20 DT.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#143B45]">Salon &amp; Terrasse Midoun</p>
            <p className="text-xs text-[#6B7C85]">Fauteuils en velours, Wi-Fi rapide et terrasse extérieure.</p>
          </div>
        </div>
      </div>

      {/* Dynamic Layered Cake Ganache Drip Divider at Bottom of Hero */}
      <CakeDripDivider fillColor="#FAF7F2" className="text-[#FAF7F2]" />
    </section>
  );
}
