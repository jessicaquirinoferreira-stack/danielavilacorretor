import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getPropertyWhatsAppLink } from '../../lib/whatsapp';
import { VisitSchedulerSection } from './VisitSchedulerSection';
import { PropertyCard } from './PropertyCard';
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  MessageCircle,
  Share2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Copy,
  Check,
  QrCode,
  ShieldAlert,
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const {
    selectedPropertySlug,
    properties,
    setCurrentPage,
    setSelectedPropertySlug,
    trackEvent,
  } = useApp();

  const property = properties.find((p) => p.slug === selectedPropertySlug) || properties[0];

  // Gallery state
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!property) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-600 mb-4">Imóvel não encontrado.</p>
        <button
          onClick={() => setCurrentPage('comprar')}
          className="px-4 py-2 bg-[#0f2338] text-white rounded-lg text-sm font-semibold"
        >
          Voltar aos Imóveis
        </button>
      </div>
    );
  }

  const allMedia = property.media && property.media.length > 0
    ? property.media
    : [{ id: 'cov', url: property.coverImage, type: 'image' as const }];

  const currentMedia = allMedia[activeMediaIndex] || allMedia[0];

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', 'property_detail', property.id);
    window.open(getPropertyWhatsAppLink(property), '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
    trackEvent('share_click', 'property', property.id);
  };

  const handleShareWhatsApp = () => {
    const text = `Confira este imóvel na Zona Sul com Gil Avila Daniel: ${property.title} - ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    trackEvent('share_click', 'property', property.id);
  };

  const formattedPrice = property.price
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.price)
    : 'Sob consulta';

  const similarProperties = properties
    .filter((p) => p.id !== property.id && p.isPublished)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:text-blue-600 transition-colors"
            >
              Início
            </button>
            <span>/</span>
            <button
              onClick={() => setCurrentPage('comprar')}
              className="hover:text-blue-600 transition-colors"
            >
              Imóveis
            </button>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate max-w-xs">{property.title}</span>
          </div>

          <button
            onClick={() => setCurrentPage('comprar')}
            className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Voltar ao catálogo</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Availability Warning Banner */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Aviso de Confirmação de Disponibilidade:</span> Este imóvel faz parte do catálogo histórico e referências das artes do corretor Gil Avila Daniel e encontra-se marcado como <strong>Pendente de confirmação</strong>. Valores, taxas condominiais e status estão sujeitos a alteração e devem ser validados diretamente via WhatsApp.
          </div>
        </div>

        {/* Title and Top Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#0f2338] text-white uppercase tracking-wider">
                {property.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                Pendente de confirmação
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                {property.transactionType === 'locacao' ? 'Para Locação' : 'À Venda'}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-200 text-slate-800">
                {property.type}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.neighborhood}, {property.city} - {property.state}</span>
            </div>
          </div>

          {/* Price and Share CTA */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider block">Valor de Investimento</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{formattedPrice}</span>
              {property.condoFee ? (
                <span className="text-xs text-slate-500 block">
                  Condomínio: R$ {property.condoFee.toLocaleString('pt-BR')}/mês
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                title="Compartilhar imóvel"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartilhar</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-10">
          {/* Main Media Preview */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-16/9 rounded-xl overflow-hidden bg-black/90 cursor-zoom-in group"
          >
            {currentMedia.type === 'video' ? (
              <video
                src={currentMedia.url}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={currentMedia.url}
                alt={currentMedia.caption || property.title}
                className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            )}

            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs flex items-center gap-1.5 pointer-events-none">
              <span>{activeMediaIndex + 1} de {allMedia.length}</span>
              <span>• Clique para tela cheia</span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {allMedia.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto py-3 mt-2">
              {allMedia.map((m, idx) => (
                <button
                  key={m.id || idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeMediaIndex ? 'border-blue-600 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={m.url} alt="" className="w-full h-full object-cover" />
                  {m.type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Specs, Description and Neighborhood Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Key Metric Badges */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">
                Características Principais
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Maximize2 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-extrabold text-slate-900">{property.usableArea} m²</div>
                  <span className="text-xs text-slate-500">Área Útil</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Bed className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-extrabold text-slate-900">{property.bedrooms}</div>
                  <span className="text-xs text-slate-500">Quartos</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Bath className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-extrabold text-slate-900">{property.suites}</div>
                  <span className="text-xs text-slate-500">Suítes</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Car className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-extrabold text-slate-900">{property.parkingSpots}</div>
                  <span className="text-xs text-slate-500">Vagas Cobertas</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Descrição do Imóvel
              </h3>
              <div className="prose text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Amenities and Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Diferenciais e Lazer
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approximate Map Context (Safe, respects privacy) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Localização Aproximada
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Por motivos de segurança e discrição jurídica patrimonial dos proprietários, o endereço exato é informado sob agendamento.
              </p>
              <div className="h-64 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden flex items-center justify-center text-center p-6">
                <div className="max-w-md">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{property.neighborhood}</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {property.city} - {property.state} • Região privilegiada da Zona Sul de São Paulo
                  </p>
                  <button
                    onClick={handleWhatsApp}
                    className="mt-4 px-4 py-2 bg-[#0f2338] text-white rounded-lg text-xs font-semibold hover:bg-blue-900"
                  >
                    Solicitar Orientação sobre o Bairro no WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Direct Contact with Gil Avila Daniel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md sticky top-28">
              <div className="text-center pb-5 border-b border-slate-100">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-blue-600 shadow-xs">
                  <img
                    src="/src/assets/images/gil_avila_daniel_profile_1794489125256.jpg"
                    alt="Gil Avila Daniel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Gil Avila Daniel</h4>
                <p className="text-xs text-slate-500">Corretor de Imóveis • +20 Anos</p>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold mt-2">
                  Atendimento WhatsApp Disponível
                </span>
              </div>

              <div className="py-4 space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chamar Gil no WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('agendamento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
                >
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Agendar Visita com Formulário</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                <div>✓ WhatsApp oficial: <strong>+55 11 97324-5981</strong></div>
                <div>✓ Código do imóvel: <strong>{property.code}</strong></div>
                <div>✓ Instagram: <strong>@daniel_corretor1</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Visit Scheduler Section specifically for this property */}
        <div className="rounded-3xl overflow-hidden mb-16 shadow-xl">
          <VisitSchedulerSection
            preselectedPropertyId={property.id}
            preselectedPropertyTitle={property.title}
            preselectedPropertyCode={property.code}
          />
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Outros Imóveis Selecionados na Zona Sul
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1))
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setActiveMediaIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex items-center justify-center">
            {currentMedia.type === 'video' ? (
              <video src={currentMedia.url} controls autoPlay className="max-w-full max-h-[80vh] rounded-lg" />
            ) : (
              <img src={currentMedia.url} alt="" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            )}
          </div>
        </div>
      )}

      {/* Share Drawer / Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-slate-900">Compartilhar Imóvel</h4>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-6">
              Envie este imóvel para amigos, clientes ou publique diretamente em suas redes sociais.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Compartilhar via WhatsApp</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-sm transition-colors"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Link Copiado!' : 'Copiar Link da Página'}</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400">
                Gil Avila Daniel | Corretor de Imóveis • Zona Sul SP
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
