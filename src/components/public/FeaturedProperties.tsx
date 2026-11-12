import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { properties, setCurrentPage, setFilters } = useApp();
  const [activeTab, setActiveTab] = useState<'todos' | 'venda' | 'locacao'>('todos');

  // Filter properties by tab and publication
  const filtered = properties
    .filter((p) => p.isPublished)
    .filter((p) => {
      if (activeTab === 'todos') return true;
      if (activeTab === 'venda') return p.transactionType === 'venda' || p.transactionType === 'ambos';
      if (activeTab === 'locacao') return p.transactionType === 'locacao' || p.transactionType === 'ambos';
      return true;
    });

  const handleViewAll = (tab: 'todos' | 'venda' | 'locacao') => {
    setFilters((prev) => ({
      ...prev,
      transactionType: tab,
    }));
    setCurrentPage(tab === 'locacao' ? 'alugar' : 'comprar');
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Curadoria de Alto Padrão</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Imóveis Selecionados na Zona Sul de SP
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Apartamentos amplos de 152 a 224 m², plantas modernas, varandas gourmet integradas e localização nobre.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-200/80 p-1.5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'todos'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({properties.filter((p) => p.isPublished).length})
            </button>
            <button
              onClick={() => setActiveTab('venda')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'venda'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              À Venda
            </button>
            <button
              onClick={() => setActiveTab('locacao')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'locacao'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Locação
            </button>
          </div>
        </div>

        {/* Informative Regulatory Notice */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-3 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Nota sobre disponibilidade:</span> Os imóveis e referências identificadas nas artes do feed oficial estão marcados como <em>pendentes de confirmação</em> e não constituem garantia de disponibilidade imediata. Para checagem de status em tempo real, consulte diretamente Gil Avila Daniel pelo WhatsApp.
          </div>
        </div>

        {/* Grid of properties */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-600">Nenhum imóvel disponível para os filtros selecionados.</p>
          </div>
        )}

        {/* Bottom CTA to View More */}
        <div className="mt-12 text-center">
          <button
            onClick={() => handleViewAll(activeTab)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f2338] hover:bg-[#13304a] text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98]"
          >
            <span>Explorar Todos os Imóveis Cadastrados</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
