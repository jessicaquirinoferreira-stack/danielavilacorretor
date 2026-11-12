import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from './PropertyCard';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Building,
  MapPin,
  Bed,
  Car,
  Bath,
  ArrowUpDown,
  AlertCircle,
} from 'lucide-react';

interface CatalogPageProps {
  forcedTransactionType?: 'venda' | 'locacao';
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ forcedTransactionType }) => {
  const { properties, filters, setFilters, resetFilters } = useApp();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Set filter type if forced
  const currentTransaction = forcedTransactionType || filters.transactionType;

  // Filter properties
  const filtered = properties
    .filter((p) => p.isPublished)
    .filter((p) => {
      // Transaction filter
      if (currentTransaction !== 'todos') {
        if (p.transactionType !== currentTransaction && p.transactionType !== 'ambos') {
          return false;
        }
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesNeighborhood = p.neighborhood.toLowerCase().includes(query);
        const matchesCode = p.code.toLowerCase().includes(query);
        const matchesCity = p.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesNeighborhood && !matchesCode && !matchesCity) {
          return false;
        }
      }

      // Neighborhood
      if (filters.neighborhood !== 'todos') {
        if (!p.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
          return false;
        }
      }

      // Property Type
      if (filters.propertyType !== 'todos') {
        if (!p.type.toLowerCase().includes(filters.propertyType.toLowerCase())) {
          return false;
        }
      }

      // Price limit
      if (p.price && p.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'todos') {
        if (p.bedrooms < Number(filters.bedrooms)) return false;
      }

      // Suites
      if (filters.suites !== 'todos') {
        if (p.suites < Number(filters.suites)) return false;
      }

      // Parking Spots
      if (filters.parkingSpots !== 'todos') {
        if (p.parkingSpots < Number(filters.parkingSpots)) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'menor_preco') return (a.price || 0) - (b.price || 0);
      if (filters.sortBy === 'maior_preco') return (b.price || 0) - (a.price || 0);
      if (filters.sortBy === 'maior_area') return (b.usableArea || 0) - (a.usableArea || 0);
      // 'recente'
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Catálogo Oficial de Imóveis</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {forcedTransactionType === 'locacao'
              ? 'Imóveis para Alugar na Zona Sul'
              : forcedTransactionType === 'venda'
              ? 'Imóveis à Venda na Zona Sul'
              : 'Todos os Imóveis Cadastrados'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
            Explore opções exclusivas, plantas de 152 a 224 m² e assessoria com Gil Avila Daniel.
          </p>
        </div>

        {/* Regulatory Note */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Aviso de disponibilidade:</strong> Dados originados de referências do feed oficial estão marcados como <em>Pendente de confirmação</em>. Fale diretamente com o corretor para checar status em tempo real.
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Query Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por bairro, condomínio ou código..."
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Bairro Selector */}
            <div className="md:col-span-3">
              <select
                value={filters.neighborhood}
                onChange={(e) => setFilters((prev) => ({ ...prev, neighborhood: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-slate-700"
              >
                <option value="todos">Todos os Bairros</option>
                <option value="Campo Belo">Campo Belo / Moema</option>
                <option value="Brooklin">Brooklin / Chácara Flora</option>
                <option value="Vila Mariana">Vila Mariana</option>
                <option value="São Bernardo">São Bernardo do Campo</option>
              </select>
            </div>

            {/* Ordenação */}
            <div className="md:col-span-2">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-slate-700"
              >
                <option value="recente">Mais Recentes</option>
                <option value="menor_preco">Menor Preço</option>
                <option value="maior_preco">Maior Preço</option>
                <option value="maior_area">Maior Área</option>
              </select>
            </div>

            {/* Toggle Advanced Filters Button */}
            <div className="md:col-span-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                  showAdvancedFilters
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filtros</span>
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="p-2.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                title="Limpar filtros"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Collapsible Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Dormitórios Mínimos</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters((prev) => ({ ...prev, bedrooms: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                >
                  <option value="todos">Qualquer quantidade</option>
                  <option value="2">2+ quartos</option>
                  <option value="3">3+ quartos</option>
                  <option value="4">4+ quartos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Suítes Mínimas</label>
                <select
                  value={filters.suites}
                  onChange={(e) => setFilters((prev) => ({ ...prev, suites: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                >
                  <option value="todos">Qualquer quantidade</option>
                  <option value="1">1+ suíte</option>
                  <option value="2">2+ suítes</option>
                  <option value="3">3+ suítes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Vagas de Garagem</label>
                <select
                  value={filters.parkingSpots}
                  onChange={(e) => setFilters((prev) => ({ ...prev, parkingSpots: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                >
                  <option value="todos">Qualquer quantidade</option>
                  <option value="2">2+ vagas</option>
                  <option value="3">3+ vagas</option>
                  <option value="4">4+ vagas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Preço Máximo: R$ {(filters.maxPrice / 1000000).toFixed(1)}M
                </label>
                <input
                  type="range"
                  min={500000}
                  max={15000000}
                  step={500000}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-blue-600 mt-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-xs text-slate-500 font-medium">
          <span>Exibindo {filtered.length} imóveis encontrados</span>
          {forcedTransactionType && (
            <span className="capitalize">Modalidade: {forcedTransactionType}</span>
          )}
        </div>

        {/* Properties Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-slate-500 text-sm mb-6">
              Tente alterar os termos de busca ou remover alguns filtros aplicados.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-[#0f2338] text-white rounded-lg text-xs font-semibold"
            >
              Restaurar Filtros Padrão
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
