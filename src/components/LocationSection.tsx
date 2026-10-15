import React, { useState } from 'react';
import {
  MapPin,
  ExternalLink,
  Clock,
  Phone,
  Share2,
  Check,
  Navigation,
  CalendarCheck,
  Send
} from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export function LocationSection() {
  const [copied, setCopied] = useState(false);
  const [resForm, setResForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
  });
  const [resStatus, setResStatus] = useState<string | null>(null);

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${CAFE_INFO.coordinates.lat}, ${CAFE_INFO.coordinates.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resForm.name || !resForm.phone) return;

    // Build WhatsApp message for table booking
    const message = encodeURIComponent(
      `Bonjour Cookies House Djerba ! Je souhaite réserver une table :\n- Nom : ${resForm.name}\n- Téléphone : ${resForm.phone}\n- Date : ${resForm.date || "Aujourd'hui"}\n- Heure : ${resForm.time || 'Dans la journée'}\n- Nombre de personnes : ${resForm.guests}\n- Note : ${resForm.notes || 'Aucune'}`
    );

    window.open(`https://wa.me/${CAFE_INFO.whatsappNumber}?text=${message}`, '_blank');
    setResStatus('Votre demande de réservation a été préparée sur WhatsApp !');
  };

  return (
    <section id="localisation" className="py-16 sm:py-24 bg-[#F5EFE4] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8A7968]">
            <MapPin className="w-3.5 h-3.5 text-[#1A4B58]" />
            <span>Île de Djerba · Midoun</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#143B45] tracking-tight">
            Venir à Cookies House
          </h2>
          <p className="text-sm sm:text-base text-[#5A6B73]">
            Facilement accessible au centre de Midoun avec stationnement à proximité. Retrouvez-nous pour une pause sucrée après la plage ou le marché.
          </p>
        </div>

        {/* 2-Column Split: Map & Details + Reservation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Map Box & Coordinates */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E0D2] overflow-hidden shadow-sm flex flex-col">
            {/* Map Frame Preview */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-[#E8E2D5] overflow-hidden">
              <iframe
                title="Carte Google Maps Cookies House Djerba"
                src={`https://maps.google.com/maps?q=${CAFE_INFO.coordinates.lat},${CAFE_INFO.coordinates.lng}&hl=fr&z=16&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#D8C9B0] text-xs font-semibold text-[#143B45] shadow-xs flex items-center gap-1.5 pointer-events-none">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Cookies House Djerba</span>
              </div>
            </div>

            {/* Map Action Bar */}
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#143B45]">
                    Midoun, Djerba (Tunisie)
                  </h3>
                  <p className="text-xs text-[#6B7C85] mt-0.5">
                    Coordonnées GPS : {CAFE_INFO.coordinates.lat}, {CAFE_INFO.coordinates.lng}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCoordinates}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1A4B58] bg-[#F5EFE4] hover:bg-[#EAE3D2] rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié !' : 'Copier GPS'}</span>
                  </button>

                  <a
                    href={CAFE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1A4B58] hover:bg-[#12363F] rounded-lg transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#D8B168]" />
                    <span>Ouvrir l'Itinéraire Maps</span>
                  </a>
                </div>
              </div>

              {/* Social Proof & Facebook */}
              <div className="pt-4 border-t border-[#F2ECE1] flex flex-wrap items-center justify-between gap-4 text-xs text-[#52636B]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1A4B58]" />
                  <span>Tous les jours : <strong>07:30 - 23:30</strong></span>
                </div>

                <a
                  href={CAFE_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#1877F2] hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Page Facebook Officielle</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Table Reservation & Quick Contact */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8A7968] mb-1">
                <CalendarCheck className="w-3.5 h-3.5 text-[#1A4B58]" />
                <span>Accueil Privilégié</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#143B45]">
                Réserver une Table ou Commander
              </h3>
              <p className="text-xs text-[#6B7C85] mt-1 leading-relaxed">
                Préparez votre venue pour le brunch ou commandez vos boîtes de cookies à l'avance pour vos événements et réceptions.
              </p>
            </div>

            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#143B45] mb-1">
                  Votre Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={resForm.name}
                  onChange={e => setResForm({ ...resForm, name: e.target.value })}
                  placeholder="Ex : Sarah Ben Ali"
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B0] rounded-lg text-[#143B45] focus:ring-2 focus:ring-[#1A4B58] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#143B45] mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={resForm.phone}
                    onChange={e => setResForm({ ...resForm, phone: e.target.value })}
                    placeholder="Ex : +216 99 123 456"
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B0] rounded-lg text-[#143B45] focus:ring-2 focus:ring-[#1A4B58] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#143B45] mb-1">
                    Nombre de personnes
                  </label>
                  <select
                    value={resForm.guests}
                    onChange={e => setResForm({ ...resForm, guests: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B0] rounded-lg text-[#143B45] focus:ring-2 focus:ring-[#1A4B58] focus:outline-none"
                  >
                    <option value="1">1 Personne</option>
                    <option value="2">2 Personnes (Brunch Duo)</option>
                    <option value="3-4">3 à 4 Personnes</option>
                    <option value="5+">5 Personnes ou plus</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#143B45] mb-1">
                    Date souhaitée
                  </label>
                  <input
                    type="date"
                    value={resForm.date}
                    onChange={e => setResForm({ ...resForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B0] rounded-lg text-[#143B45] focus:ring-2 focus:ring-[#1A4B58] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#143B45] mb-1">
                    Heure estimée
                  </label>
                  <input
                    type="time"
                    value={resForm.time}
                    onChange={e => setResForm({ ...resForm, time: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B0] rounded-lg text-[#143B45] focus:ring-2 focus:ring-[#1A4B58] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#143B45] mb-1">
                  Remarques ou formule souhaitée (optionnel)
                </label>
                <textarea
                  rows={2}
                  value={resForm.notes}
                  onChange={e => setResForm({ ...resForm, notes: e.target.value })}
                  placeholder="Ex : Table en terrasse ombragée ou demande de brunch..."
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B0] rounded-lg text-[#143B45] focus:ring-2 focus:ring-[#1A4B58] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-[#1A4B58] hover:bg-[#12363F] rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
              >
                <Send className="w-3.5 h-3.5 text-[#D8B168]" />
                <span>Envoyer la Demande (WhatsApp Direct)</span>
              </button>
            </form>

            {resStatus && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs text-center font-medium">
                {resStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
