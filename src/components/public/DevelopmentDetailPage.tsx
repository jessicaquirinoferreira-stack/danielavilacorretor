import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getDevelopmentWhatsAppLink } from '../../lib/whatsapp';
import { VisitSchedulerSection } from './VisitSchedulerSection';
import {
  Building2,
  MapPin,
  Layers,
  CheckCircle2,
  MessageCircle,
  ChevronLeft,
  Share2,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  X,
} from 'lucide-react';

export const DevelopmentDetailPage: React.FC = () => {
  const {
    selectedDevelopmentSlug,
    developments,
    setCurrentPage,
    trackEvent,
  } = useApp();

  const dev = developments.find((d) => d.slug === selectedDevelopmentSlug) || developments[0];
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  if (!dev) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-600 mb-4">Empreendimento não encontrado.</p>
        <button
          onClick={() => setCurrentPage('empreendimentos')}
          className="px-4 py-2 bg-[#0f2338] text-white rounded-lg text-sm font-semibold"
        >
          Voltar a Empreendimentos
        </button>
      </div>
    );
  }

  const allMedia = dev.media && dev.media.length > 0
    ? dev.media
    : [{ id: 'cov', url: dev.coverImage, type: 'image' as const }];

  const currentMedia = allMedia[activeMediaIndex] || allMedia[0];

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', 'development_detail', dev.id);
    window.open(getDevelopmentWhatsAppLink(dev), '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
    trackEvent('share_click', 'development', dev.id);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600">Início</button>
            <span>/</span>
            <button onClick={() => setCurrentPage('empreendimentos')} className="hover:text-blue-600">Empreendimentos</button>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate">{dev.name}</span>
          </div>

          <button
            onClick={() => setCurrentPage('empreendimentos')}
            className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Voltar aos empreendimentos</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Availability Warning */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Empreendimento em Referência Histórica:</span> Unidades, metragens ({dev.minArea} a {dev.maxArea} m²) e tabelas de valores dependem de confirmação direta com Gil Avila Daniel.
          </div>
        </div>

        {/* Title and Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#0f2338] text-white uppercase">
                {dev.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800">
                Lançamento / Em Obras
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-900">
                Pendente de confirmação
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {dev.name}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{dev.neighborhood}, {dev.city} - {dev.state}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Receber Apresentação via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Gallery Visual */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-10">
          <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-black/90">
            <img
              src={currentMedia.url}
              alt={dev.name}
              className="w-full h-full object-cover"
            />
          </div>

          {allMedia.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto py-3 mt-2">
              {allMedia.map((m, idx) => (
                <button
                  key={m.id || idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeMediaIndex ? 'border-blue-600 scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={m.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Units and Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Sobre o Empreendimento</h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {dev.description}
              </p>
            </div>

            {/* Plantas e Unidades Tipo */}
            {dev.units && dev.units.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>Opções de Plantas e Metragens</span>
                </h3>

                <div className="space-y-3">
                  {dev.units.map((unit) => (
                    <div
                      key={unit.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{unit.type}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {unit.area} m² • {unit.bedrooms} Dormitórios ({unit.suites} suítes) • {unit.parkingSpots} Vagas
                        </div>
                      </div>

                      <button
                        onClick={handleWhatsApp}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f2338] text-white text-xs font-semibold hover:bg-blue-900 self-start sm:self-auto"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Consultar Valores</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {dev.features && dev.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Lazer & Sustentabilidade</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dev.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md sticky top-28">
              <h4 className="font-bold text-slate-900 text-base mb-2">Atendimento Direto</h4>
              <p className="text-xs text-slate-500 mb-4">
                Receba a tabela atualizada, caderno de plantas e condições de pagamento diretamente de Gil Avila Daniel.
              </p>

              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Pedir Apresentação no WhatsApp</span>
              </button>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                <div>WhatsApp: <strong>+55 11 97324-5981</strong></div>
                <div>Empreendimento: <strong>{dev.name}</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Scheduler */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
          <VisitSchedulerSection
            preselectedPropertyTitle={dev.name}
            preselectedPropertyCode={dev.code}
          />
        </div>
      </div>

      {/* Share Modal */}
      {isShareOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-slate-900">Compartilhar Empreendimento</h4>
              <button onClick={() => setIsShareOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-sm"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Link Copiado!' : 'Copiar Link'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
