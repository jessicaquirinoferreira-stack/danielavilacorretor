import React from 'react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import { getPropertyWhatsAppLink } from '../../lib/whatsapp';
import { MagicCard } from '../ui/MagicCard';
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  MessageCircle,
  AlertCircle,
  Eye,
  CheckCircle,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onOpenShare?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { setCurrentPage, setSelectedPropertySlug, trackEvent } = useApp();

  const handleCardClick = () => {
    trackEvent('page_view', 'property', property.id);
    setSelectedPropertySlug(property.slug);
    setCurrentPage('imovel');
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('whatsapp_click', 'property', property.id);
    window.open(getPropertyWhatsAppLink(property), '_blank');
  };

  const formattedPrice = property.price
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.price)
    : 'Sob consulta';

  const isPendingConfirmation = property.status === 'pendente_confirmacao';

  return (
    <MagicCard
      onClick={handleCardClick}
      gradientColor="rgba(37, 99, 235, 0.12)"
      className="group rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer bg-white"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
        <img
          src={property.coverImage || property.media[0]?.url}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1.5">
            {isPendingConfirmation ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-500/90 text-white shadow-xs backdrop-blur-md">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Pendente de confirmação</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-600/90 text-white shadow-xs backdrop-blur-md">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Disponível</span>
              </span>
            )}

            {property.isFeatured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#0f2338]/90 text-white tracking-wide uppercase backdrop-blur-xs">
                Destaque
              </span>
            )}
          </div>

          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-white/95 text-slate-900 backdrop-blur-md uppercase tracking-wider shadow-sm">
            {property.code}
          </span>
        </div>

        {/* Bottom Price in Cover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
              {property.transactionType === 'locacao' ? 'Locação' : 'Venda'}
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {formattedPrice}
            </div>
          </div>
          {property.condoFee ? (
            <div className="text-right text-xs text-slate-200 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
              Cond: R$ {property.condoFee.toLocaleString('pt-BR')}/mês
            </div>
          ) : null}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">
              {property.neighborhood}, {property.city}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-3">
            {property.title}
          </h3>

          {/* Specs Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100 text-slate-600 text-xs">
            <div className="flex flex-col items-center justify-center p-1.5 bg-slate-50 rounded-lg" title="Área Útil">
              <div className="flex items-center gap-1 font-bold text-slate-800">
                <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{property.usableArea}m²</span>
              </div>
              <span className="text-[10px] text-slate-400">Útil</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 bg-slate-50 rounded-lg" title="Dormitórios">
              <div className="flex items-center gap-1 font-bold text-slate-800">
                <Bed className="w-3.5 h-3.5 text-blue-600" />
                <span>{property.bedrooms}</span>
              </div>
              <span className="text-[10px] text-slate-400">Quartos</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 bg-slate-50 rounded-lg" title="Suítes">
              <div className="flex items-center gap-1 font-bold text-slate-800">
                <Bath className="w-3.5 h-3.5 text-blue-600" />
                <span>{property.suites}</span>
              </div>
              <span className="text-[10px] text-slate-400">Suítes</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 bg-slate-50 rounded-lg" title="Vagas de Garagem">
              <div className="flex items-center gap-1 font-bold text-slate-800">
                <Car className="w-3.5 h-3.5 text-blue-600" />
                <span>{property.parkingSpots}</span>
              </div>
              <span className="text-[10px] text-slate-400">Vagas</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 pt-2">
          <button
            type="button"
            onClick={handleCardClick}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#0f2338] text-slate-800 hover:text-white text-xs font-semibold transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Detalhes</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
            title="Consultar pelo WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </MagicCard>
  );
};
