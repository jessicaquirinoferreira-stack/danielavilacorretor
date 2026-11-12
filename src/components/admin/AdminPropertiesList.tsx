import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Property } from '../../types';
import { AdminPropertyForm } from './AdminPropertyForm';
import {
  Plus,
  Search,
  Filter,
  Copy,
  Edit2,
  Trash2,
  Eye,
  Star,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const AdminPropertiesList: React.FC = () => {
  const {
    properties,
    addProperty,
    updateProperty,
    duplicateProperty,
    deleteProperty,
    togglePropertyPublish,
    togglePropertyFeatured,
    setCurrentPage,
    setSelectedPropertySlug,
  } = useApp();

  const [isCreatingOrEditing, setIsCreatingOrEditing] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [typeFilter, setTypeFilter] = useState('todos');

  const filtered = properties.filter((p) => {
    if (statusFilter !== 'todos' && p.status !== statusFilter) return false;
    if (typeFilter !== 'todos' && p.transactionType !== typeFilter && p.transactionType !== 'ambos') return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenCreate = () => {
    setEditingProperty(null);
    setIsCreatingOrEditing(true);
  };

  const handleOpenEdit = (prop: Property) => {
    setEditingProperty(prop);
    setIsCreatingOrEditing(true);
  };

  const handleSave = async (data: any) => {
    if (editingProperty) {
      await updateProperty(editingProperty.id, data);
    } else {
      await addProperty(data);
    }
    setIsCreatingOrEditing(false);
    setEditingProperty(null);
  };

  const handleDuplicate = async (id: string) => {
    if (confirm('Deseja criar uma cópia deste imóvel como rascunho?')) {
      await duplicateProperty(id);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Tem certeza que deseja excluir o imóvel "${title}"? Esta ação é irreversível.`)) {
      await deleteProperty(id);
    }
  };

  const handlePreview = (slug: string) => {
    setSelectedPropertySlug(slug);
    setCurrentPage('imovel');
  };

  if (isCreatingOrEditing) {
    return (
      <AdminPropertyForm
        initialProperty={editingProperty}
        onSave={handleSave}
        onCancel={() => {
          setIsCreatingOrEditing(false);
          setEditingProperty(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Gerenciamento de Imóveis
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cadastre, edite, duplique, gerencie status e fotos/vídeos de cada imóvel.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Imóvel</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título, código ou bairro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-700"
          >
            <option value="todos">Todos os Status</option>
            <option value="pendente_confirmacao">Pendente de Confirmação</option>
            <option value="disponivel">Disponível</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
            <option value="alugado">Alugado</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-700"
          >
            <option value="todos">Venda & Locação</option>
            <option value="venda">Apenas Venda</option>
            <option value="locacao">Apenas Locação</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Imóvel</th>
                  <th className="py-3 px-4">Código</th>
                  <th className="py-3 px-4">Valor</th>
                  <th className="py-3 px-4">Localização</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Destaque</th>
                  <th className="py-3 px-4 text-center">Publicado</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Imóvel thumb + title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.coverImage || property.media[0]?.url}
                          alt=""
                          className="w-12 h-10 object-cover rounded-lg shrink-0 bg-slate-100"
                        />
                        <div className="max-w-xs">
                          <div className="font-bold text-slate-900 truncate" title={property.title}>
                            {property.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {property.usableArea}m² • {property.bedrooms} qtos • {property.type}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Code */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {property.code}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {property.price
                        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.price)
                        : 'Sob consulta'}
                    </td>

                    {/* Neighborhood */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-[150px] truncate">
                      {property.neighborhood}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        property.status === 'pendente_confirmacao'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : property.status === 'disponivel'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {property.status.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Toggle Featured */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePropertyFeatured(property.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          property.isFeatured ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-400'
                        }`}
                        title="Alternar Destaque"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Toggle Published */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePropertyPublish(property.id)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          property.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {property.isPublished ? 'Publicado' : 'Oculto'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handlePreview(property.slug)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100"
                          title="Visualizar no site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDuplicate(property.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                          title="Duplicar imóvel"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(property)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="Editar imóvel"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(property.id, property.title)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                          title="Excluir imóvel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 p-4">
            <p className="text-slate-500 text-xs">Nenhum imóvel encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};
