import React from 'react';
import { Wifi, Sparkles, Wind, Users, Coffee, Clock } from 'lucide-react';

export function AtmosphereSection() {
  const highlights = [
    {
      icon: <Users className="w-5 h-5 text-[#1A4B58]" />,
      title: 'Salon Velours & Tables en Marbre',
      desc: 'Fauteuils enveloppants bleu roi, tables en marbre noir serties de laiton doré pour une pause douce et chic.',
    },
    {
      icon: <Wind className="w-5 h-5 text-[#1A4B58]" />,
      title: 'Climatisation Douce & Terrasse',
      desc: 'Refuge de fraîcheur durant la chaleur de Djerba en intérieur, ou terrasse animée sous le store bleu.',
    },
    {
      icon: <Wifi className="w-5 h-5 text-[#1A4B58]" />,
      title: 'Wi-Fi Fibre Gratuit',
      desc: 'Connectivité rapide pour vos sessions de travail, réunions légères ou partages de vos dégustations.',
    },
    {
      icon: <Coffee className="w-5 h-5 text-[#1A4B58]" />,
      title: 'Barista & Fontaine Chocolat',
      desc: 'Cafés fraîchement moulus servis en tasse ou Cupkie comestible avec fontaine à chocolat en continu.',
    },
  ];

  return (
    <section id="salon" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D8C9B0] aspect-[4/3]">
              <img
                src="/src/assets/images/cafe_interior_lounge_1792053637633.jpg"
                alt="Intérieur cosy du salon Cookies House Djerba à Midoun"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-widest text-[#D8B168] font-semibold">
                  Espace Dégustation Midoun
                </span>
                <p className="font-serif text-lg font-bold">
                  Une atmosphère chaleureuse et raffinée
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content & Amenities */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8A7968]">
                <Sparkles className="w-3.5 h-3.5 text-[#D89E34]" />
                <span>Le Cadre &amp; L'Accueil</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#143B45] tracking-tight">
                Plus qu'un coffee shop, un véritable cocon gourmand
              </h2>
              <p className="text-sm sm:text-base text-[#52636B] leading-relaxed">
                Situé à Midoun au cœur de l'île de Djerba, Cookies House allie le charme d'un salon de thé contemporain aux parfums réconfortants des cookies tout juste sortis du four. Venez savourer un moment suspendu entre amis ou en famille.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-[#E8E0D2] shadow-xs space-y-1.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F5EFE4] flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#143B45]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B7C85] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#52636B] border-t border-[#E8E0D2]">
              <div className="flex items-center gap-1.5 font-semibold text-[#143B45]">
                <Clock className="w-4 h-4 text-[#1A4B58]" />
                <span>Service non-stop : 07h30 à 23h30</span>
              </div>
              <span>·</span>
              <span>Consommation sur place &amp; Emporté</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
