import React, { useState } from 'react';
import { ShoppingBag, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/menuData';

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D2] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Official Logo & Brand Wordmark */}
        <a href="#" className="flex items-center gap-3.5 group shrink-0">
          <div className="relative">
            <img
              src={CAFE_INFO.logoUrl}
              alt="Cookies House Djerba Logo"
              className="w-12 h-12 object-cover rounded-full border-2 border-[#D8B168] shadow-md group-hover:scale-105 transition-transform bg-white"
            />
            {/* Tiny dripping droplet indicator on logo */}
            <span className="absolute -bottom-1 -right-0.5 w-3 h-3 bg-[#1A4B58] rounded-full border border-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#143B45] leading-none">
              Cookies House
            </span>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8A7968] mt-0.5">
              Djerba · Midoun
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A5568]">
          <a
            href="#carte"
            className="hover:text-[#1A4B58] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            La Carte Complète
          </a>
          <a
            href="#signatures"
            className="hover:text-[#1A4B58] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Nos Signatures
          </a>
          <a
            href="#brunch"
            className="hover:text-[#1A4B58] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            P'tit Déj & Brunch
          </a>
          <a
            href="#salon"
            className="hover:text-[#1A4B58] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Le Salon & Terrasse
          </a>
          <a
            href="#localisation"
            className="hover:text-[#1A4B58] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Plan d'Accès
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Drawer Trigger & Mobile Menu Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={CAFE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A4B58] bg-[#EAE3D2]/70 hover:bg-[#E2D8C3] rounded-md transition-colors"
            title="Ouvrir dans Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-[#1A4B58]" />
            <span>Midoun Djerba</span>
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1A4B58] hover:bg-[#12363F] rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-95"
            aria-label="Voir ma sélection"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8B168]" />
            <span className="hidden sm:inline">Ma Sélection</span>
            <span className="sm:hidden">Panier</span>
            {totalItems > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-[#D8B168] text-[#143B45] text-[11px] font-bold rounded-full tabular-nums">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A4B58] hover:bg-[#EAE3D2] rounded-md transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E0D2] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#1A4B58]">
            <a
              href="#carte"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B168]"
            >
              La Carte Complète
            </a>
            <a
              href="#signatures"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B168]"
            >
              Nos Signatures Phares
            </a>
            <a
              href="#brunch"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B168]"
            >
              P'tit Déj & Formules Brunch
            </a>
            <a
              href="#salon"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B168]"
            >
              Le Salon & Cadre
            </a>
            <a
              href="#localisation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B168]"
            >
              Horaires & Itinéraire Google Maps
            </a>
          </nav>
          <div className="pt-3 border-t border-[#E8E0D2] flex justify-between items-center text-xs text-[#718096]">
            <span>Tous les jours · 07:30 - 23:30</span>
            <a
              href={CAFE_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A4B58] font-semibold underline"
            >
              Facebook
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
