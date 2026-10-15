import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, Coffee, User, RefreshCw } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Bonjour et bienvenue chez Cookies House Djerba ! 🍪✨ Je suis Chef Cookie, votre conseiller gourmand. Souhaitez-vous découvrir nos Cookies Dubaï au kunafa croustillant, nos Crookies à la pistache ou nos formules Brunch ?",
      timestamp: 'À l’instant',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    '🍪 Le Cookie Dubaï & Kunafa',
    '🥐 C’est quoi un Crookie ?',
    '☕ Le gobelet Cupkie comestible',
    '🍳 Que contient le Brunch Duo ?',
    '📍 Horaires & localisation à Midoun',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          messages: [...messages, userMessage],
        }),
      });

      const data = await res.json();
      const botReply = data.reply || data.fallback || "Je vous invite à venir goûter nos cookies chauds directement au salon de Midoun !";

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: "Nos artisans sont actuellement au fournil ! Venez déguster nos cookies chauds directement au centre de Midoun, Djerba, ou contactez-nous par WhatsApp.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#143B45] text-xs font-semibold rounded-full shadow-lg border border-[#D8C9B0] animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#D89E34]" />
            <span>Besoin d'un conseil gourmand ?</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-[#1A4B58] hover:bg-[#12363F] text-white flex items-center justify-center shadow-xl border-2 border-[#D8B168] transition-all hover:scale-105 active:scale-95 group overflow-hidden"
          aria-label="Discuter avec l'assistant IA Cookies House"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <img
                src={CAFE_INFO.logoUrl}
                alt="Logo Cookies House"
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D8B168] rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-[#143B45]">
                AI
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-[#D8C9B0] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header with Deep Teal & Drip Feel */}
          <div className="bg-[#143B45] text-white p-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={CAFE_INFO.logoUrl}
                  alt="Cookies House Logo"
                  className="w-10 h-10 rounded-full border border-[#D8B168] object-cover shadow-sm bg-white"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-base font-bold">Chef Cookie</span>
                    <span className="text-[10px] font-semibold bg-[#D8B168] text-[#143B45] px-1.5 py-0.2 rounded-full">
                      Assistant IA
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A7C0C7]">
                    Cookies House · Midoun Djerba
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#A7C0C7] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drip Edge below chat header */}
            <svg
              viewBox="0 0 400 16"
              fill="none"
              className="absolute -bottom-3.5 left-0 w-full h-4 text-[#143B45] pointer-events-none"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L400,0 L400,4 C380,4 375,14 360,14 C345,14 340,4 320,4 C300,4 295,12 280,12 C265,12 260,4 240,4 C220,4 215,16 200,16 C185,16 180,4 160,4 C140,4 135,12 120,12 C105,12 100,4 80,4 C60,4 55,14 40,14 C25,14 20,4 0,4 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 pt-6 space-y-3.5 bg-[#FAF7F2]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#1A4B58] text-[#D8B168] flex items-center justify-center shrink-0 text-xs font-bold font-serif shadow-xs">
                    CH
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#1A4B58] text-white rounded-tr-xs'
                      : 'bg-white text-[#143B45] border border-[#E8E0D2] rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-[#A7C0C7]' : 'text-[#8A7968]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-[#8A7968] text-xs">
                <div className="w-7 h-7 rounded-full bg-[#1A4B58] text-[#D8B168] flex items-center justify-center shrink-0 text-xs font-bold font-serif">
                  CH
                </div>
                <div className="bg-white border border-[#E8E0D2] rounded-2xl px-3.5 py-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A4B58] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A4B58] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A4B58] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div className="p-2 bg-white border-t border-[#E8E0D2] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5EFE4] hover:bg-[#EAE3D2] text-[#143B45] font-medium transition-colors shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E8E0D2] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Posez votre question à Chef Cookie..."
              disabled={loading}
              className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B0] rounded-xl text-[#143B45] focus:outline-none focus:ring-2 focus:ring-[#1A4B58] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 text-white bg-[#1A4B58] hover:bg-[#12363F] rounded-xl transition-all disabled:opacity-40 active:scale-95 shrink-0"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4 text-[#D8B168]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
