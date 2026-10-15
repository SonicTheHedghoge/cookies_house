import React, { useState } from 'react';
import { Package, Plus, Check, Trash2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

export function BoxBuilder() {
  const { addToCart } = useCart();
  const [boxSize, setBoxSize] = useState<number>(4);
  const [selectedCookies, setSelectedCookies] = useState<MenuItem[]>([]);
  const [successFeedback, setSuccessFeedback] = useState(false);

  const availableCookies = MENU_ITEMS.filter(item => item.category === 'cookies');

  const handleSelectCookie = (cookie: MenuItem) => {
    if (selectedCookies.length < boxSize) {
      setSelectedCookies([...selectedCookies, cookie]);
    }
  };

  const handleRemoveCookie = (index: number) => {
    setSelectedCookies(selectedCookies.filter((_, i) => i !== index));
  };

  const handleChangeBoxSize = (size: number) => {
    setBoxSize(size);
    if (selectedCookies.length > size) {
      setSelectedCookies(selectedCookies.slice(0, size));
    }
  };

  const boxPrice = selectedCookies.reduce((sum, item) => sum + item.price, 0);

  const handleAddBoxToCart = () => {
    if (selectedCookies.length === 0) return;

    const cookieNames = selectedCookies.map(c => c.name).join(', ');
    const boxItem: MenuItem = {
      id: `custom-box-${Date.now()}`,
      name: `Boîte Sur-Mesure (${selectedCookies.length} Cookies)`,
      category: 'cookies',
      price: boxPrice,
      priceFormatted: `${boxPrice.toFixed(3)} DT`,
      description: `Sélection personnalisée : ${cookieNames}`,
      tags: ['Boîte Cadeau', `${boxSize} Pièces`],
    };

    addToCart(boxItem, undefined, boxPrice);
    setSuccessFeedback(true);
    setTimeout(() => {
      setSuccessFeedback(false);
      setSelectedCookies([]);
    }, 1800);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F3ECDF] rounded-3xl p-6 sm:p-10 border border-[#E0D5C3] shadow-sm">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8A7968]">
              <Package className="w-3.5 h-3.5 text-[#1A4B58]" />
              <span>Coffrets Cadeaux &amp; Partage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#143B45] tracking-tight">
              Composez Votre Boîte Idéale
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6B73]">
              Sélectionnez la taille de votre coffret puis cliquez sur vos cookies favoris pour remplir chaque alvéole. Emballage soigné inclus.
            </p>
          </div>

          {/* Size Choice Buttons */}
          <div className="flex justify-center items-center gap-3 mb-8">
            {[4, 6, 12].map(size => (
              <button
                key={size}
                type="button"
                onClick={() => handleChangeBoxSize(size)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  boxSize === size
                    ? 'bg-[#1A4B58] text-white shadow-xs'
                    : 'bg-white text-[#52636B] border border-[#D8C9B0] hover:bg-[#EAE3D2]'
                }`}
              >
                Boîte de {size} Cookies
              </button>
            ))}
          </div>

          {/* Visual Box Slots */}
          <div className="bg-white rounded-2xl p-5 border border-[#E0D5C3] mb-8 shadow-2xs">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-[#143B45]">
                Votre coffret ({selectedCookies.length} / {boxSize} cookies choisis)
              </span>
              <span className="font-mono font-semibold text-[#1A4B58] tabular-nums">
                Sous-total : {boxPrice.toFixed(3)} DT
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {Array.from({ length: boxSize }).map((_, index) => {
                const cookie = selectedCookies[index];
                return (
                  <div
                    key={index}
                    className={`h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center relative transition-all ${
                      cookie
                        ? 'border-[#1A4B58] bg-[#F5EFE4] text-[#143B45]'
                        : 'border-[#D0C5B4] bg-[#FAF7F2] text-[#A0AEC0]'
                    }`}
                  >
                    {cookie ? (
                      <>
                        <span className="text-[11px] font-bold leading-tight line-clamp-2">
                          {cookie.name.replace('Cookies ', '')}
                        </span>
                        <span className="text-[10px] font-mono text-[#8A7968] mt-1 tabular-nums">
                          {cookie.priceFormatted}
                        </span>
                        <button
                          onClick={() => handleRemoveCookie(index)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow-xs"
                          aria-label="Retirer ce cookie"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <span className="text-[11px] font-medium">Slot #{index + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedCookies.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#F2ECE1] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedCookies([])}
                  className="text-xs text-[#8A7968] hover:text-red-600 transition-colors"
                >
                  Réinitialiser le coffret
                </button>

                <button
                  onClick={handleAddBoxToCart}
                  disabled={selectedCookies.length === 0}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#1A4B58] hover:bg-[#12363F] rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {successFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Boîte ajoutée au panier !</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#D8B168]" />
                      <span>Valider la Boîte ({boxPrice.toFixed(3)} DT)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Quick Select Buttons from Flavors */}
          <div>
            <p className="text-xs font-bold text-[#143B45] uppercase tracking-wider mb-3">
              Cliquez pour ajouter à votre boîte :
            </p>
            <div className="flex flex-wrap gap-2">
              {availableCookies.slice(0, 14).map(cookie => {
                const isFull = selectedCookies.length >= boxSize;
                return (
                  <button
                    key={cookie.id}
                    disabled={isFull}
                    onClick={() => handleSelectCookie(cookie)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#D8C9B0] text-[#143B45] hover:bg-[#1A4B58] hover:text-white hover:border-[#1A4B58] transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#143B45] disabled:cursor-not-allowed shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{cookie.name.replace('Cookies ', '')}</span>
                    <span className="font-mono text-[10px] opacity-75 tabular-nums">
                      ({cookie.priceFormatted})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
