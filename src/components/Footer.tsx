import React from 'react';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';
import { CakeDripDivider } from './CakeDripDivider';

export function Footer() {
  return (
    <footer className="bg-[#0E282F] text-[#C2D4D9] pt-0 pb-12 relative">
      {/* Top Drip Divider creating a dripping dark chocolate / petrol layer */}
      <CakeDripDivider fillColor="#0E282F" inverted className="relative z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1A4550]">
          <div className="space-y-2">
            <div className="flex items-center gap-3.5">
              <img
                src={CAFE_INFO.logoUrl}
                alt="Cookies House Logo"
                className="w-12 h-12 object-cover rounded-full border-2 border-[#D8B168] bg-white shadow-md"
              />
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight block leading-none">
                  Cookies House Djerba
                </span>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#D8B168] mt-1 block">
                  Midoun · Tunisie
                </span>
              </div>
            </div>
            <p className="text-xs text-[#8BAAB2] max-w-sm">
              Artisan biscuitier, crookies parisiens &amp; salon de café de spécialité au centre de Midoun, Djerba.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a
              href="#carte"
              className="text-[#C2D4D9] hover:text-white transition-colors"
            >
              La Carte
            </a>
            <a
              href="#signatures"
              className="text-[#C2D4D9] hover:text-white transition-colors"
            >
              Nos Signatures
            </a>
            <a
              href="#brunch"
              className="text-[#C2D4D9] hover:text-white transition-colors"
            >
              Formules Brunch
            </a>
            <a
              href="#salon"
              className="text-[#C2D4D9] hover:text-white transition-colors"
            >
              Le Salon
            </a>
            <a
              href={CAFE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8B168] hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={CAFE_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4299E1] hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B8A92]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D8B168]" />
            <span>Midoun, Djerba, Tunisie</span>
            <span aria-hidden="true">·</span>
            <Clock className="w-3.5 h-3.5 text-[#D8B168]" />
            <span>Ouvert 7j/7 de 07h30 à 23h30</span>
          </div>

          <p className="text-[11px]">
            &copy; {new Date().getFullYear()} Cookies House Djerba. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
