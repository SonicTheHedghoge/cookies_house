/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureSpotlight } from './components/SignatureSpotlight';
import { BoxBuilder } from './components/BoxBuilder';
import { MenuSection } from './components/MenuSection';
import { BrunchSection } from './components/BrunchSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AiChatbot } from './components/AiChatbot';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col font-sans selection:bg-[#1A4B58] selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <SignatureSpotlight />
          <BoxBuilder />
          <MenuSection />
          <BrunchSection />
          <AtmosphereSection />
          <LocationSection />
        </main>
        <Footer />
        <CartDrawer />
        <AiChatbot />
      </div>
    </CartProvider>
  );
}
