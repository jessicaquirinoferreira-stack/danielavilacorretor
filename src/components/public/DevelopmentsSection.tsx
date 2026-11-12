import React from 'react';
import { useApp } from '../../context/AppContext';
import { getDevelopmentWhatsAppLink } from '../../lib/whatsapp';
import {
  Building2,
  Maximize2,
  Bed,
  Layers,
  MessageCircle,
  Eye,
  AlertCircle,
} from 'lucide-react';

export const DevelopmentsSection: React.FC = () => {
  const { developments, setCurrentPage, setSelectedDevelopmentSlug, trackEvent } = useApp();

  const handleDevClick = (slug: string, devId: string) => {
    trackEvent('page_view', 'development', devId);
    setSelectedDevelopmentSlug(slug);
    setCurrentPage('empreendimento');
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent, dev: any) => {
    e.stopPropagation();
    trackEvent('whatsapp_click', 'development', dev.id);
    window.open(getDevelopmentWhatsAppLink(dev), '_blank');
  };

  const published = developments.filter((d) => d.isPublished);

  if (published.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Empreendimentos & Plantas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Projetos Modernos na Zona Sul e ABC
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Plantas inteligentes de 152 a 224 m², áreas de lazer completas e arquitetura contemporânea.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('empreendimentos')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start md:self-auto"
          >
            <span>Ver todos os lançamentos</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {published.map((dev) => (
            <div
              key={dev.id}
              onClick={() => handleDevClick(dev.slug, dev.id)}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-slate-200">
                <img
                  src={dev.coverImage}
                  alt={dev.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-amber-500 text-white shadow-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>Pendente de confirmação</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/90 text-slate-900 uppercase">
                    {dev.code}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">
                    {dev.neighborhood}, {dev.city}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                    {dev.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4">
                    {dev.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 p-3 bg-white rounded-xl border border-slate-200 mb-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Plantas</span>
                      <strong className="text-slate-800 text-sm">{dev.minArea} a {dev.maxArea} m²</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Dormitórios</span>
                      <strong className="text-slate-800 text-sm">{dev.minBedrooms} a {dev.maxBedrooms} quartos</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Status</span>
                      <strong className="text-emerald-700 text-sm capitalize">Em obras / Lançamento</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {dev.features.slice(0, 3).map((feat, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-200/60 text-slate-700 text-xs font-medium">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleDevClick(dev.slug, dev.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Apresentação Completa</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleWhatsAppInquiry(e, dev)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0f2338] hover:bg-[#13304a] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
