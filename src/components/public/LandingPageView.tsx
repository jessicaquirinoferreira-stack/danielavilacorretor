import React from 'react';
import { useApp } from '../../context/AppContext';
import { getLandingPageWhatsAppLink } from '../../lib/whatsapp';
import { VisitSchedulerSection } from './VisitSchedulerSection';
import {
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  CheckCircle2,
  Building,
} from 'lucide-react';

export const LandingPageView: React.FC = () => {
  const {
    selectedLpSlug,
    landingPages,
    setCurrentPage,
    trackEvent,
  } = useApp();

  const lp = landingPages.find((p) => p.slug === selectedLpSlug) || landingPages[0];

  if (!lp) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-600 mb-4">Página de campanha não encontrada.</p>
        <button
          onClick={() => setCurrentPage('home')}
          className="px-4 py-2 bg-[#0f2338] text-white rounded-lg text-sm font-semibold"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', 'landing_page', lp.id);
    window.open(getLandingPageWhatsAppLink(lp), '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Discreet Navigation */}
      <div className="bg-white border-b border-slate-200 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar ao Site Principal de Gil Avila Daniel</span>
          </button>

          <span className="text-slate-400">Campanha Exclusiva</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0a1926] text-white shadow-2xl mb-12">
          <div className="absolute inset-0 z-0">
            <img
              src={lp.coverImage}
              alt={lp.title}
              className="w-full h-full object-cover brightness-[0.35]"
            />
          </div>

          <div className="relative z-10 p-8 sm:p-14 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Gil Avila Daniel • +20 Anos de Experiência</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              {lp.headline}
            </h1>

            <p className="text-slate-200 text-base sm:text-lg mb-8 leading-relaxed">
              {lp.subheadline}
            </p>

            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>{lp.ctaText || 'Falar no WhatsApp'}</span>
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-blue-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-base mb-1">Assessoria Direta</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Você conversa pessoalmente com Gil Avila Daniel, garantindo assertividade em cada detalhe.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-blue-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-base mb-1">Especialidade Zona Sul</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conhecimento profundo das melhores oportunidades em Moema, Campo Belo, Brooklin e região.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-blue-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-base mb-1">Transparência Total</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Segurança jurídica, análise de documentação e orientação patrimonial completa.
            </p>
          </div>
        </div>

        {/* Form and Lead Capture */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
          <VisitSchedulerSection
            preselectedPropertyTitle={lp.title}
          />
        </div>
      </div>
    </div>
  );
};
