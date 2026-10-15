import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Check,
  Sparkles,
  Cookie,
  Croissant,
  UtensilsCrossed,
  Cake,
  Coffee,
  IceCream,
  GlassWater,
  X
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS, MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { CakeDripDivider } from './CakeDripDivider';

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, { label: string; price: number; priceFormatted: string }>>({});
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  const { addToCart } = useCart();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cookie':
        return <Cookie className="w-4 h-4" />;
      case 'Croissant':
        return <Croissant className="w-4 h-4" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'Cake':
        return <Cake className="w-4 h-4" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'IceCream':
        return <IceCream className="w-4 h-4" />;
      case 'GlassWater':
        return <GlassWater className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSizeChange = (itemId: string, size: { label: string; price: number; priceFormatted: string }) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const handleAdd = (item: MenuItem) => {
    const chosenSize = item.sizes
      ? selectedSizes[item.id] || item.sizes[0]
      : undefined;

    addToCart(
      item,
      chosenSize?.label,
      chosenSize ? chosenSize.price : item.price
    );

    const feedbackKey = chosenSize ? `${item.id}-${chosenSize.label}` : item.id;
    setAddedItemKey(feedbackKey);
    setTimeout(() => setAddedItemKey(null), 1400);
  };

  return (
    <section id="carte" className="pt-16 pb-24 bg-[#FAF7F2] border-b border-[#E8E0D2] relative">
      {/* Decorative Menu Top Banner reminiscent of the printed menu's wavy blue crest */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8A7968]">
            <span>La Carte Gourmande</span>
            <span aria-hidden="true">·</span>
            <span>Prix en Dinars Tunisiens (DT)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#143B45] tracking-tight">
            Toutes Nos Douceurs &amp; Boissons
          </h2>
          <p className="text-sm sm:text-base text-[#5A6B73]">
            Sélectionnez vos gourmandises préférées pour une dégustation sur place dans notre salon ou à emporter chez vous.
          </p>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="space-y-5 mb-10">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7968]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher un cookie, pistache, crookie, brunch..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-white rounded-xl border border-[#D8C9B0] focus:outline-none focus:ring-2 focus:ring-[#143B45] text-[#143B45] placeholder-[#9CA3AF] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8A7968] hover:text-[#143B45]"
                aria-label="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Categories Tab Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#143B45] text-white shadow-xs'
                      : 'bg-white text-[#52636B] hover:text-[#143B45] hover:bg-[#EAE3D2] border border-[#E8E0D2]'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E0D2] p-8 max-w-md mx-auto">
            <Cookie className="w-10 h-10 mx-auto text-[#B5A493] mb-3" />
            <p className="font-serif text-lg font-bold text-[#143B45]">
              Aucun produit ne correspond à votre recherche
            </p>
            <p className="text-xs text-[#6B7C85] mt-1 mb-4">
              Essayez avec un autre ingrédient comme "Pistache", "Nutella", ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#143B45] rounded-lg hover:bg-[#0E2C34]"
            >
              Voir tout le menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const chosenSize = item.sizes
                ? selectedSizes[item.id] || item.sizes[0]
                : undefined;

              const displayPrice = chosenSize
                ? chosenSize.priceFormatted
                : item.priceFormatted;

              const isAdded =
                addedItemKey ===
                (chosenSize ? `${item.id}-${chosenSize.label}` : item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 border border-[#E8E0D2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle top drip accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#143B45] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-3">
                    {/* Header line: Tags & Signature mark */}
                    <div className="flex items-center justify-between text-[11px] text-[#8A7968]">
                      <div className="flex items-center gap-1.5 font-medium">
                        {item.isSignature && (
                          <span className="font-bold text-[#D89E34] flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Signature
                          </span>
                        )}
                        {item.tags && item.tags.length > 0 && (
                          <span>
                            {item.isSignature ? '· ' : ''}
                            {item.tags.join(' · ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#143B45] group-hover:text-[#1A4B58] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#52636B] leading-relaxed mt-1.5">
                        {item.description}
                      </p>
                    </div>

                    {/* Size Selector for Crookies / multi-size items */}
                    {item.sizes && (
                      <div className="pt-2">
                        <span className="text-[11px] font-semibold text-[#8A7968] block mb-1.5">
                          Taille au choix :
                        </span>
                        <div className="flex items-center gap-2">
                          {item.sizes.map(size => {
                            const isSizeActive =
                              (chosenSize ? chosenSize.label : item.sizes![0].label) ===
                              size.label;
                            return (
                              <button
                                key={size.label}
                                type="button"
                                onClick={() => handleSizeChange(item.id, size)}
                                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                                  isSizeActive
                                    ? 'bg-[#143B45] text-white shadow-xs'
                                    : 'bg-[#F5EFE4] text-[#4A5568] hover:bg-[#EAE3D2]'
                                }`}
                              >
                                {size.label} ({size.priceFormatted})
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Price & Add Button */}
                  <div className="pt-4 mt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8A7968] block font-medium">
                        Prix
                      </span>
                      <span className="font-mono text-base font-bold text-[#143B45] tabular-nums">
                        {displayPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#143B45] hover:bg-[#0E2C34] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ajouté</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ajouter</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
