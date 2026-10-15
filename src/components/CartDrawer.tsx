import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/menuData';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  const [orderType, setOrderType] = useState<'takeaway' | 'dinein' | 'delivery'>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [locationDetail, setLocationDetail] = useState(''); // e.g. Table number or Hotel in Djerba
  const [orderNotes, setOrderNotes] = useState('');

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let orderTypeText = 'À emporter (Click & Collect à Midoun)';
    if (orderType === 'dinein') orderTypeText = 'Sur place (Salon / Terrasse)';
    if (orderType === 'delivery') orderTypeText = 'Livraison (Zone Midoun / Hôtels)';

    const itemsSummary = cart
      .map(
        item =>
          `• ${item.quantity}x ${item.menuItem.name}${
            item.sizeLabel ? ` [${item.sizeLabel}]` : ''
          } - ${(item.unitPrice * item.quantity).toFixed(3)} DT`
      )
      .join('\n');

    const message = encodeURIComponent(
      `*COMMANDE - COOKIES HOUSE DJERBA*\n\n` +
      `*Type :* ${orderTypeText}\n` +
      `*Client :* ${customerName || 'Non spécifié'}\n` +
      `*Téléphone :* ${customerPhone || 'Non spécifié'}\n` +
      (locationDetail ? `*Précision / Adresse / Hôtel :* ${locationDetail}\n` : '') +
      (orderNotes ? `*Note :* ${orderNotes}\n` : '') +
      `\n*Détail de la commande :*\n${itemsSummary}\n\n` +
      `*TOTAL :* ${totalPrice.toFixed(3)} DT\n\n` +
      `Merci d'avance pour la préparation !`
    );

    window.open(`https://wa.me/${CAFE_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E8E0D2] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E0D2] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1A4B58]" />
              <h2 className="font-serif text-lg font-bold text-[#143B45]">
                Votre Sélection ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#8A7968] hover:text-[#143B45] hover:bg-[#F5EFE4] rounded-md transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EAE3D2] flex items-center justify-center mx-auto text-[#1A4B58]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="font-serif text-base font-bold text-[#143B45]">
                  Votre panier est vide
                </p>
                <p className="text-xs text-[#6B7C85] max-w-xs mx-auto">
                  Découvrez nos cookies chauds, nos crookies pur beurre et nos formules brunch pour composer votre plateau.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#1A4B58] rounded-lg hover:bg-[#12363F]"
                >
                  Voir la carte
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="bg-white p-3.5 rounded-xl border border-[#E8E0D2] shadow-2xs flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#143B45] truncate">
                        {item.menuItem.name}
                      </h4>
                      {item.sizeLabel && (
                        <span className="text-[10px] text-[#8A7968] block">
                          Format : {item.sizeLabel}
                        </span>
                      )}
                      <span className="text-xs font-mono font-semibold text-[#1A4B58] tabular-nums">
                        {(item.unitPrice * item.quantity).toFixed(3)} DT
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#D8C9B0] rounded-lg bg-[#FAF7F2] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-[#EAE3D2] text-[#143B45]"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-[#143B45] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#EAE3D2] text-[#143B45]"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-[#A0AEC0] hover:text-red-600 transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-[#A0AEC0] hover:text-red-600 transition-colors"
                  >
                    Vider le panier
                  </button>
                </div>

                {/* Order Options */}
                <div className="pt-4 border-t border-[#E8E0D2] space-y-3">
                  <span className="text-xs font-bold text-[#143B45] block">
                    Mode de dégustation :
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg text-center transition-colors ${
                        orderType === 'takeaway'
                          ? 'bg-[#1A4B58] text-white shadow-2xs'
                          : 'bg-white border border-[#E8E0D2] text-[#4A5568]'
                      }`}
                    >
                      À Emporter
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('dinein')}
                      className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg text-center transition-colors ${
                        orderType === 'dinein'
                          ? 'bg-[#1A4B58] text-white shadow-2xs'
                          : 'bg-white border border-[#E8E0D2] text-[#4A5568]'
                      }`}
                    >
                      Sur Place
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg text-center transition-colors ${
                        orderType === 'delivery'
                          ? 'bg-[#1A4B58] text-white shadow-2xs'
                          : 'bg-white border border-[#E8E0D2] text-[#4A5568]'
                      }`}
                    >
                      Livraison
                    </button>
                  </div>

                  {/* Customer Quick Inputs */}
                  <div className="space-y-2 pt-2">
                    <input
                      type="text"
                      placeholder="Votre nom (facultatif)"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8C9B0] rounded-lg text-[#143B45] focus:outline-none focus:ring-1 focus:ring-[#1A4B58]"
                    />
                    <input
                      type="tel"
                      placeholder="Numéro de téléphone"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8C9B0] rounded-lg text-[#143B45] focus:outline-none focus:ring-1 focus:ring-[#1A4B58]"
                    />
                    {orderType === 'delivery' && (
                      <input
                        type="text"
                        placeholder="Adresse ou Hôtel à Djerba"
                        value={locationDetail}
                        onChange={e => setLocationDetail(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8C9B0] rounded-lg text-[#143B45] focus:outline-none focus:ring-1 focus:ring-[#1A4B58]"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Instructions particulières (ex: sans sucre, chaud...)"
                      value={orderNotes}
                      onChange={e => setOrderNotes(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8C9B0] rounded-lg text-[#143B45] focus:outline-none focus:ring-1 focus:ring-[#1A4B58]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8E0D2] bg-white space-y-3">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold text-[#52636B]">Total Commande</span>
                <span className="font-mono text-xl font-bold text-[#143B45] tabular-nums">
                  {totalPrice.toFixed(3)} DT
                </span>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#1A4B58] hover:bg-[#12363F] rounded-lg shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-3.5 h-3.5 text-[#D8B168]" />
                <span>Envoyer la commande (WhatsApp)</span>
              </button>

              <p className="text-[10px] text-center text-[#8A7968]">
                Paiement à la livraison ou au comptoir · Monnaie acceptée en Dinars Tunisiens
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
