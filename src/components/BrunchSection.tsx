import React from 'react';
import { Utensils, Check, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';
import { CakeDripDivider } from './CakeDripDivider';

export function BrunchSection() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const handleAdd = (item: any) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  const brunchFormulas = MENU_ITEMS.filter(i => i.category === 'breakfast_brunch');

  return (
    <section id="brunch" className="relative bg-[#143B45] text-white pt-10 pb-0 overflow-hidden">
      {/* Top Cake Drip Transition (Liquid deep blue ganache coating from above) */}
      <CakeDripDivider fillColor="#143B45" inverted className="absolute top-0 left-0 right-0 z-10" />

      {/* Subtle background decorative glow */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#205C6E]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#D8B168]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D8B168]">
            <Utensils className="w-3.5 h-3.5" />
            <span>Chaque Matin dès 7h30 à Midoun</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Formules P'tit Déj &amp; Brunch Prestige
          </h2>
          <p className="text-sm sm:text-base text-[#B0C3C9] leading-relaxed">
            Servis sur nos plateaux en bois traditionnels : viennoiseries pur beurre, omelettes préparées à la minute, charcuteries fines, tartines au fromage frais &amp; harissa du terroir, cafés chauds et jus pressés.
          </p>
        </div>

        {/* 4 Formulas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brunchFormulas.map(formula => {
            const isRoyal = formula.id === 'brunch-cookies-house';

            return (
              <div
                key={formula.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isRoyal
                    ? 'bg-gradient-to-b from-[#1C4E5B] to-[#12363F] border-2 border-[#D8B168] shadow-2xl relative'
                    : 'bg-[#184550]/80 border border-[#275F6E] hover:border-[#D8B168]/50 shadow-sm'
                }`}
              >
                {isRoyal && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D8B168] text-[#143B45] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Recommandé Duo
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold text-[#D8B168] uppercase tracking-wider block mb-1">
                      {isRoyal ? 'Pour 2 Personnes' : 'Formule Individuelle'}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      {formula.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#C5D5D9] leading-relaxed">
                    {formula.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#275F6E] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#8DA6AE] block font-medium">Prix</span>
                    <span className="font-mono text-xl font-bold text-[#D8B168] tabular-nums">
                      {formula.priceFormatted}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(formula)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                      addedId === formula.id
                        ? 'bg-emerald-600 text-white'
                        : isRoyal
                        ? 'bg-[#D8B168] hover:bg-[#C8A056] text-[#143B45]'
                        : 'bg-[#256372] hover:bg-[#1E5360] text-white'
                    }`}
                  >
                    {addedId === formula.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Ajouté</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Commander</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Cake Drip: Deep blue ganache dripping into the next cream section */}
      <CakeDripDivider fillColor="#FAF7F2" className="text-[#FAF7F2]" />
    </section>
  );
}
