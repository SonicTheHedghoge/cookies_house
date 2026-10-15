import React from 'react';
import { Sparkles, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';

export function SignatureSpotlight() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const handleAdd = (item: any) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const crookie = MENU_ITEMS.find(i => i.id === 'crookie-pistache');
  const dubaiCookie = MENU_ITEMS.find(i => i.id === 'cookie-dubai');
  const icedLatte = MENU_ITEMS.find(i => i.id === 'iced-cookie-latte');

  const signatures = [
    {
      item: crookie!,
      image: '/src/assets/images/gourmet_crookies_pistache_1792053637423.jpg',
      badge: 'Le Buzz Parisien',
      title: 'Crookies Pistache Éclats',
      price: '9,900 DT (Mini: 5,000 DT)',
      desc: 'Feuilletage doré croustillant, cœur de pâte à cookie fondante garnie de pure pistache et d’éclats croquants.',
    },
    {
      item: dubaiCookie!,
      image: '/src/assets/images/cookies_dubai_chocolate_1792053638419.jpg',
      badge: 'Création Virale',
      title: 'Cookies Chocolat Dubaï & Kunafa',
      price: '9,000 DT',
      desc: 'La sensation mondiale à Djerba : pâte cacao intense renfermant des cheveux d’ange croustillants et une crème pistache coulante.',
    },
    {
      item: icedLatte!,
      image: '/src/assets/images/iced_caramel_cookie_latte_1792053638576.jpg',
      badge: 'Boisson Culte',
      title: 'Cookie Iced Latte Ripple',
      price: '12,000 DT',
      desc: 'Servi dans son verre strié : espresso glacé de spécialité, caramel beurre salé fondant, crème fouettée et brisures de cookies.',
    },
  ];

  return (
    <section id="signatures" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8A7968] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D89E34]" />
              <span>Incontournables de la Maison</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#143B45] tracking-tight">
              Les Signatures Cookies House
            </h2>
          </div>
          <p className="text-sm text-[#6B7C85] max-w-md">
            Des recettes exclusives façonnées à la main avec les meilleurs ingrédients : beurre pur, chocolat de dégustation et pistache premium.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatures.map((sig, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E0D2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container with 4:3 Ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DC]">
                  <img
                    src={sig.image}
                    alt={sig.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1A4B58]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {sig.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl font-bold text-[#143B45] group-hover:text-[#1A4B58] transition-colors">
                      {sig.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#5A6B73] leading-relaxed line-clamp-3">
                    {sig.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0 border-t border-[#F2ECE1] mt-4 flex items-center justify-between">
                <span className="font-mono text-base font-bold text-[#143B45] tabular-nums">
                  {sig.price}
                </span>

                <button
                  onClick={() => handleAdd(sig.item)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                    addedId === sig.item.id
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#1A4B58] hover:bg-[#12363F] text-white'
                  }`}
                >
                  {addedId === sig.item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Ajouté !</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
