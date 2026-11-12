import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacyPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gad_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gad_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#0a1926]/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Privacidade & LGPD</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        Utilizamos cookies essenciais para aprimorar sua navegação e viabilizar o atendimento seguro com Gil Avila Daniel, em total conformidade com a LGPD.
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          Aceitar e Prosseguir
        </button>
        <button
          onClick={onOpenPrivacyPolicy}
          className="py-2 px-3 rounded-lg border border-slate-600 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
        >
          Saiba Mais
        </button>
      </div>
    </div>
  );
};
