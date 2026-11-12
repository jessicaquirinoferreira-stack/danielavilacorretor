import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getGeneralWhatsAppLink } from '../../lib/whatsapp';
import {
  Send,
  X,
  MessageCircle,
  Instagram,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import sofiaPhoto from '../../assets/images/sofia_consultora_profile_1794492013093.jpg';

interface ChatMessage {
  id: string;
  sender: 'sofia' | 'user';
  text: string;
  timestamp: string;
  actionButtons?: boolean;
}

export const AiConciergeDrawer: React.FC = () => {
  const { properties, trackEvent, settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'sofia',
      text: 'Olá! Sou a Sofia, consultora imobiliária da equipe de Gil Avila Daniel. Estou à sua disposição para tirar dúvidas rápidas sobre nossos imóveis e empreendimentos na Zona Sul de SP e ABC. Como posso te orientar hoje?',
      timestamp: 'Agora',
      actionButtons: true,
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          propertiesContext: properties.map((p) => ({
            code: p.code,
            title: p.title,
            neighborhood: p.neighborhood,
            area: p.usableArea,
            bedrooms: p.bedrooms,
            suites: p.suites,
            price: p.price,
            status: p.status,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const sofiaMsg: ChatMessage = {
          id: 'sofia-' + Date.now(),
          sender: 'sofia',
          text: data.reply || 'Temos excelentes opções na Zona Sul! Me diga se prefere que o Gil Avila Daniel te envie o portfólio completo agora no WhatsApp.',
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          actionButtons: true,
        };
        setMessages((prev) => [...prev, sofiaMsg]);
      } else {
        throw new Error('Falha na resposta.');
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: 'sofia-fallback-' + Date.now(),
        sender: 'sofia',
        text: 'Gil Avila Daniel tem excelentes opções de 152 a 224 m² em Moema, Campo Belo, Brooklin e São Bernardo. Para confirmar a disponibilidade e agendar uma visita, recomendo falar direto no WhatsApp dele (+55 11 97324-5981) ou ver os stories no Instagram (@daniel_corretor1)!',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        actionButtons: true,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferToWhatsApp = (extraMessage?: string) => {
    trackEvent('whatsapp_click', 'sofia_chat');
    const lastUserMessage = extraMessage || messages.filter((m) => m.sender === 'user').pop()?.text || 'imóveis na Zona Sul';
    const text = `Olá Gil Avila Daniel! Estava conversando com a Sofia no seu site sobre: "${lastUserMessage}". Gostaria de receber mais detalhes com você!`;
    window.open(`https://wa.me/5511973245981?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleGoToInstagram = () => {
    trackEvent('share_click', 'sofia_chat');
    window.open('https://www.instagram.com/daniel_corretor1/', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom-Left */}
      <aside aria-label="Sofia Consultora Imobiliária" className="fixed bottom-6 left-5 sm:left-6 z-40">
        <button
          onClick={() => {
            setIsOpen(true);
            trackEvent('page_view', 'sofia_consultora');
          }}
          className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-[#0a1926]/95 hover:bg-[#10273d] text-white border border-blue-400/40 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-blue-500/40"
          title="Falar com Sofia | Consultora Imobiliária de Gil Avila Daniel"
        >
          {/* Sofia's Photo Avatar */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-blue-400 shrink-0 shadow-md">
            <img
              src={sofiaPhoto}
              alt="Sofia - Consultora Imobiliária"
              className="w-full h-full object-cover object-top"
            />
            {/* Green Online status dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0a1926]" />
          </div>

          <div className="text-left pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white tracking-wide">Sofia</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-blue-300 font-medium">
              Consultora Imobiliária
            </div>
          </div>
        </button>
      </aside>

      {/* Sofia's Chat Drawer / Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Atendimento com Sofia"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-start sm:pl-6 sm:pb-6 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full h-[85vh] sm:h-[620px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header with Sofia's Profile */}
            <div className="bg-[#091522] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 shrink-0 shadow-md">
                  <img
                    src={sofiaPhoto}
                    alt="Sofia - Consultora Imobiliária"
                    className="w-full h-full object-cover object-top"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#091522]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Sofia</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-medium border border-emerald-500/30">
                      Online
                    </span>
                  </h3>
                  <p className="text-[11px] text-blue-200">
                    Consultora • Equipe Gil Avila Daniel
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Especialista em imóveis na Zona Sul de SP
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Fechar atendimento"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Channel Indicators */}
            <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center justify-between text-[11px] text-blue-900 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Atendimento rápido e personalizado
              </span>
              <span className="text-slate-500 text-[10px]">Zona Sul - SP</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/70">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[88%] space-y-2`}>
                    <div
                      className={`rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#0f2338] text-white rounded-tr-xs'
                          : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span
                        className={`text-[10px] block mt-1.5 ${
                          msg.sender === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Integrated Quick Action Buttons under Sofia's messages */}
                    {msg.sender === 'sofia' && (
                      <div className="flex flex-col sm:flex-row gap-2 pt-1 animate-in fade-in duration-300">
                        <button
                          onClick={() => handleTransferToWhatsApp()}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
                        >
                          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M12.04 2c-5.464 0-9.915 4.436-9.915 9.897 0 1.741.455 3.441 1.321 4.939l-1.405 5.127 5.267-1.378c1.442.787 3.072 1.209 4.732 1.209 5.464 0 9.914-4.436 9.914-9.897 0-5.461-4.45-9.897-9.914-9.897zm0 18.106c-1.486 0-2.943-.399-4.214-1.155l-.302-.18-3.134.82.837-3.05-.197-.315c-.83-1.322-1.269-2.861-1.269-4.429 0-4.524 3.693-8.204 8.279-8.204 4.585 0 8.278 3.68 8.278 8.204 0 4.524-3.693 8.204-8.279 8.204z" />
                          </svg>
                          <span>Falar no WhatsApp com Gil</span>
                        </button>

                        <button
                          onClick={handleGoToInstagram}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
                          style={{
                            background:
                              'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                          }}
                        >
                          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          <span>Instagram @daniel_corretor1</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs text-xs text-slate-600 flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    <span>Sofia está digitando...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Consultation Chips */}
            <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto text-[11px]">
              <button
                type="button"
                onClick={() => handleSendMessage('Quais apartamentos de 152 a 224 m² estão disponíveis no Campo Belo ou Moema?')}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 whitespace-nowrap transition-colors"
              >
                Plantas de 152 a 224 m²
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Quais os empreendimentos modernos cadastrados na Zona Sul?')}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 whitespace-nowrap transition-colors"
              >
                Empreendimentos modernos
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Como agendar uma visita com Gil Avila Daniel?')}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 whitespace-nowrap transition-colors"
              >
                Agendar visita com Gil
              </button>
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-slate-200 space-y-2.5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Envie sua mensagem para a Sofia..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-colors"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
