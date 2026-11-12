import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, ArrowRight, TreePine, Utensils, GraduationCap, Building2, Sparkles } from 'lucide-react';
import { MagicCard } from './MagicCard';

export const NeighborhoodExplorer: React.FC = () => {
  const { setFilters, setCurrentPage } = useApp();

  const neighborhoods = [
    {
      id: 'moema-campo-belo',
      name: 'Campo Belo & Moema',
      filterKey: 'Campo Belo',
      tagline: 'Sofisticação, arborização e proximidade com o Aeroporto de Congonhas',
      avgPricePerM2: 'R$ 14.500 - R$ 19.000/m²',
      highlights: [
        'Ruas planas e arborizadas',
        'Polo gastronômico refinado',
        'Colégios bilíngues tradicionais',
        'Apartamentos amplos de 180 a 224 m²',
      ],
      icon: TreePine,
    },
    {
      id: 'brooklin-chacara-flora',
      name: 'Brooklin & Chácara Flora',
      filterKey: 'Brooklin',
      tagline: 'Modernidade corporativa integrada a bolsões residenciais nobres',
      avgPricePerM2: 'R$ 13.000 - R$ 17.500/m²',
      highlights: [
        'Eixo Berrini / Chucri Zaidan',
        'Próximo ao Parque Severo Gomes',
        'Condomínios clube contemporâneos',
        'Plantas versáteis de 152 a 220 m²',
      ],
      icon: Building2,
    },
    {
      id: 'vila-mariana',
      name: 'Vila Mariana & Ibirapuera',
      filterKey: 'Vila Mariana',
      tagline: 'Tradição cultural, infraestrutura hospitalar e vizinhança ao Ibirapuera',
      avgPricePerM2: 'R$ 12.500 - R$ 16.500/m²',
      highlights: [
        'Acesso privilegiado ao Parque Ibirapuera',
        'Múltiplas estações de metrô',
        'Centros médicos e universitários de ponta',
        'Excelente valorização patrimonial',
      ],
      icon: GraduationCap,
    },
    {
      id: 'sao-bernardo',
      name: 'São Bernardo do Campo & ABC',
      filterKey: 'São Bernardo',
      tagline: 'Qualidade de vida, tranquilidade e condomínios de alto padrão no Jardim do Mar',
      avgPricePerM2: 'R$ 9.000 - R$ 13.000/m²',
      highlights: [
        'Região nobre do Jardim do Mar / Av. Kennedy',
        'Fácil acesso à Rodovia Anchieta',
        'Clubes, parques e áreas de lazer completas',
        'Plantas generosas com varandas envidraçadas',
      ],
      icon: Utensils,
    },
  ];

  const handleExploreNeighborhood = (filterKey: string) => {
    setFilters((prev) => ({
      ...prev,
      neighborhood: filterKey,
    }));
    setCurrentPage('comprar');
  };

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Regiões de Atuação</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Especialista na Zona Sul de SP e ABC
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Conhecimento minucioso de cada bairro, vias de acesso, perfil de moradores e potencial de valorização.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('comprar')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Ver mapa de oportunidades</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((n) => {
            const Icon = n.icon;
            return (
              <MagicCard
                key={n.id}
                className="p-6 flex flex-col justify-between border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{n.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">{n.tagline}</p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Faixa Média / m²</span>
                    <strong className="text-xs text-blue-800 font-extrabold">{n.avgPricePerM2}</strong>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 mb-6">
                    {n.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleExploreNeighborhood(n.filterKey)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#0f2338] text-slate-800 hover:text-white text-xs font-semibold transition-all group"
                >
                  <span>Ver Imóveis na Região</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
