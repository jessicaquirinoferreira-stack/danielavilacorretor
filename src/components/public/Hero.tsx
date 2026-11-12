import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getGeneralWhatsAppLink } from '../../lib/whatsapp';
import { NumberTicker } from '../ui/NumberTicker';
import { ShimmerButton } from '../ui/ShimmerButton';
import {
  Search,
  MessageCircle,
  Shield,
  MapPin,
  Building,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
} from 'lucide-react';
import facadePhoto from '../../assets/images/modern_building_facade_1794489137249.jpg';
import livingPhoto from '../../assets/images/luxury_apartment_living_1794489150257.jpg';

export const Hero: React.FC = () => {
  const { settings, setCurrentPage, setFilters, trackEvent, developments, properties } = useApp();

  const [transactionType, setTransactionType] = useState<'venda' | 'locacao'>('venda');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [maxPriceInput, setMaxPriceInput] = useState<number>(5000000);

  // Dynamic slideshow of registered developments and properties
  const slides = React.useMemo(() => {
    const list: Array<{
      id: string;
      title: string;
      tagline: string;
      image: string;
      badge: string;
    }> = [];

    // Add developments first
    developments.forEach((dev) => {
      if (dev.coverImage) {
        list.push({
          id: dev.id,
          title: dev.name,
          tagline: `${dev.neighborhood} • Plantas de ${dev.minArea} a ${dev.maxArea} m²`,
          image: dev.coverImage,
          badge: 'Empreendimento em Destaque',
        });
      }
      // Also add additional development media if present
      if (dev.media && dev.media.length > 1) {
        dev.media.slice(1).forEach((m, idx) => {
          if (m.type === 'image' && m.url !== dev.coverImage) {
            list.push({
              id: `${dev.id}-m${idx}`,
              title: `${dev.name} - Interiores`,
              tagline: `${dev.neighborhood} • Acabamentos Nobres`,
              image: m.url,
              badge: 'Perspectiva do Projeto',
            });
          }
        });
      }
    });

    // Add featured properties
    properties
      .filter((p) => p.isPublished)
      .forEach((p) => {
        if (p.coverImage && !list.some((item) => item.image === p.coverImage)) {
          list.push({
            id: p.id,
            title: p.title,
            tagline: `${p.neighborhood} • ${p.usableArea} m² • ${p.bedrooms} quartos`,
            image: p.coverImage,
            badge: p.status === 'pendente_confirmacao' ? 'Pendente de confirmação' : 'Alto Padrão',
          });
        }
      });

    // Fallbacks if list is small
    if (list.length === 0) {
      list.push(
        {
          id: 'fb-1',
          title: 'Aurora Residencial Prime',
          tagline: 'Zona Sul de SP • Plantas de 152 a 224 m²',
          image: facadePhoto,
          badge: 'Empreendimento Cadastrado',
        },
        {
          id: 'fb-2',
          title: 'Apartamento Alto Padrão com Varanda Gourmet',
          tagline: 'Campo Belo / Moema • 224 m² privativos',
          image: livingPhoto,
          badge: 'Interiores Sofisticados',
        }
      );
    }

    return list;
  }, [developments, properties]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-advance slides every 5 seconds with smooth cross-fade transition
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      transactionType,
      neighborhood: selectedNeighborhood,
      propertyType: selectedType,
      maxPrice: maxPriceInput,
    }));
    setCurrentPage(transactionType === 'locacao' ? 'alugar' : 'comprar');
  };

  const handleWhatsAppHero = () => {
    trackEvent('whatsapp_click', 'header');
    window.open(getGeneralWhatsAppLink(settings.siteName), '_blank');
  };

  const currentSlide = slides[currentSlideIndex] || slides[0];

  return (
    <section className="relative bg-[#07131e] text-white overflow-hidden min-h-[680px]">
      {/* Background Architectural Slideshow with High Visibility & Smooth Cross-fade Transitions */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1200 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-108 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.84] contrast-[1.06] saturate-[1.1] transition-transform duration-[8000ms] ease-out"
                style={{
                  transform: isActive ? 'scale(1.06)' : 'scale(1)',
                }}
              />
            </div>
          );
        })}

        {/* Sophisticated Gradients: Clean architectural photo apparent across screen, text protected on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07131e]/92 via-[#07131e]/50 to-transparent/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07131e] via-[#07131e]/20 to-black/30 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Authentic Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/70 border border-blue-400/40 text-blue-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Corretor de Imóveis há mais de 20 anos • Zona Sul - SP</span>
            </div>

            {/* Headline with Animated NumberTicker */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Mais de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                <NumberTicker value={20} suffix=" anos" />
              </span>{' '}
              conectando você ao imóvel ideal na Zona Sul de SP.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl text-shadow-sm">
              {settings.institutionalText}
            </p>

            {/* Call to action buttons with ShimmerButton */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <ShimmerButton
                onClick={handleWhatsAppHero}
                shimmerColor="#38bdf8"
                background="#0f2338"
                className="shadow-xl shadow-blue-950/40"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Falar no WhatsApp (+55 11 97324-5981)</span>
              </ShimmerButton>

              <button
                onClick={() => setCurrentPage('sobre')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/20 text-slate-100 font-medium text-base border border-white/25 backdrop-blur-md transition-all shadow-sm"
              >
                <span>Conhecer Trajetória de Gil</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Right Floating Slide Card (Shows current development prominently) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center">
            <div className="bg-[#0a1926]/85 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl max-w-sm w-full text-white animate-in fade-in duration-500">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600/80 text-white uppercase tracking-wider">
                  <Layers className="w-3 h-3" />
                  <span>{currentSlide.badge}</span>
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {currentSlideIndex + 1} / {slides.length}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white line-clamp-1">
                {currentSlide.title}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5 mb-3">
                {currentSlide.tagline}
              </p>

              {/* Slide controls & Indicators */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentSlideIndex
                          ? 'w-6 bg-blue-400'
                          : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Ir para foto ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevSlide}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-7 shadow-2xl border border-slate-100 text-slate-900 mt-4">
          <div className="flex items-center gap-3 mb-5 border-b border-slate-200 pb-3">
            <button
              type="button"
              onClick={() => setTransactionType('venda')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                transactionType === 'venda'
                  ? 'bg-[#0f2338] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Comprar Imóvel
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('locacao')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                transactionType === 'locacao'
                  ? 'bg-[#0f2338] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Alugar Imóvel
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('empreendimentos')}
              className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              Empreendimentos & Plantas
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Região / Bairro */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Região / Bairro
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                <option value="todos">Todos os Bairros da Zona Sul e ABC</option>
                <option value="Campo Belo / Moema">Campo Belo / Moema</option>
                <option value="Brooklin / Chácara Flora">Brooklin / Chácara Flora</option>
                <option value="Vila Mariana">Vila Mariana</option>
                <option value="Jardim do Mar">São Bernardo do Campo (Jardim do Mar)</option>
                <option value="Santo Amaro">Santo Amaro / Granja Julieta</option>
                <option value="Vila Nova Conceição">Vila Nova Conceição</option>
              </select>
            </div>

            {/* Tipo do Imóvel */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                Tipo de Imóvel
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                <option value="todos">Todos os Tipos</option>
                <option value="Apartamento">Apartamento Padrão</option>
                <option value="Apartamento de Alto Padrão">Apartamento de Alto Padrão</option>
                <option value="Cobertura">Cobertura / Penthouse</option>
                <option value="Casa em Condomínio">Casa em Condomínio</option>
              </select>
            </div>

            {/* Faixa de Valor */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Valor Máximo: R$ {(maxPriceInput / 1000000).toFixed(1)}M
              </label>
              <input
                type="range"
                min={500000}
                max={10000000}
                step={250000}
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>R$ 500 mil</span>
                <span>R$ 10 milhões+</span>
              </div>
            </div>

            {/* Botão Buscar */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0f2338] hover:bg-[#153452] text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98]"
              >
                <Search className="w-4 h-4 text-blue-300" />
                <span>Buscar Imóveis</span>
              </button>
            </div>
          </form>
        </div>

        {/* Pillars / Trust Points with NumberTicker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 text-slate-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">
                +<NumberTicker value={20} /> Anos de Atuação
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">Segurança patrimonial e jurídica em todas as etapas.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">Especialista Zona Sul SP</h4>
              <p className="text-xs text-slate-400 mt-0.5">Domínio de mercado em Moema, Campo Belo, Brooklin e ABC.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">Atendimento Direto no WhatsApp</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sem intermediários. Retorno ágil e transparente pelo corretor.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
