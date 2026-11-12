import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTab } from './AdminLayout';
import {
  Building,
  Layers,
  Users,
  MessageCircle,
  Eye,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Phone,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: AdminTab) => void;
  onOpenCreateProperty: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onOpenCreateProperty,
}) => {
  const { properties, developments, leads, analytics, settings } = useApp();

  const forSaleCount = properties.filter((p) => p.transactionType === 'venda' || p.transactionType === 'ambos').length;
  const forRentCount = properties.filter((p) => p.transactionType === 'locacao' || p.transactionType === 'ambos').length;
  const pendingCount = properties.filter((p) => p.status === 'pendente_confirmacao').length;
  const newLeads = leads.filter((l) => l.status === 'novo');

  const handleOpenLeadWhatsApp = (lead: any) => {
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const text = `Olá ${lead.fullName}! Aqui é Gil Avila Daniel, corretor de imóveis. Recebi seu contato pelo meu site sobre o imóvel "${lead.propertyTitle || 'na Zona Sul'}" e estou à sua disposição.`;
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Painel de Controle de Gil Avila Daniel
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestão completa do site institucional, catálogo de imóveis na Zona Sul e leads de clientes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenCreateProperty}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Imóvel</span>
          </button>

          <button
            onClick={() => onNavigateTab('developments')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f2338] hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Empreendimento</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Imóveis */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Imóveis Cadastrados</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{properties.length}</div>
          <div className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>{forSaleCount} à venda • {forRentCount} locação</span>
            <span className="text-amber-600 font-semibold">{pendingCount} pendentes</span>
          </div>
        </div>

        {/* Total Empreendimentos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Empreendimentos</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{developments.length}</div>
          <div className="text-xs text-slate-500 mt-2">
            Torres modernas e plantas de 152 a 224 m²
          </div>
        </div>

        {/* Leads Recebidos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Leads & Agendamentos</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{leads.length}</div>
          <div className="text-xs text-emerald-700 font-semibold mt-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{newLeads.length} novos para atendimento</span>
          </div>
        </div>

        {/* Cliques WhatsApp */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Cliques no WhatsApp</span>
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{analytics.whatsappClicks}</div>
          <div className="text-xs text-slate-500 mt-2">
            Taxa de conversão: ~{((analytics.whatsappClicks / (analytics.totalViews || 1)) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Leads Recentes Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Últimos Contatos e Agendamentos de Visita
            </h3>
            <p className="text-xs text-slate-500">
              Responda os interessados com um clique direto pelo WhatsApp oficial.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('leads')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Ver todos ({leads.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {leads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nome do Cliente</th>
                  <th className="py-3 px-4">Telefone</th>
                  <th className="py-3 px-4">Imóvel de Interesse</th>
                  <th className="py-3 px-4">Data/Horário Visita</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {lead.fullName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {lead.phone}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                      {lead.propertyTitle || 'Consultoria Geral'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {lead.preferredDate ? `${lead.preferredDate} (${lead.preferredTime || 'A combinar'})` : 'Não especificado'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-semibold text-[10px] uppercase ${
                        lead.status === 'novo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenLeadWhatsApp(lead)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-8">Nenhum lead recebido ainda.</p>
        )}
      </div>
    </div>
  );
};
