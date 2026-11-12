import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus } from '../../types';
import {
  Users,
  Search,
  Filter,
  Download,
  MessageCircle,
  Clock,
  Calendar,
  CheckCircle2,
  Trash2,
  X,
  FileText,
  Save,
} from 'lucide-react';

export const AdminLeadsList: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [internalNotesInput, setInternalNotesInput] = useState('');

  const filtered = leads.filter((l) => {
    if (statusFilter !== 'todos' && l.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        l.fullName.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.propertyTitle && l.propertyTitle.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setInternalNotesInput(lead.internalNotes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    await updateLeadStatus(selectedLead.id, selectedLead.status, internalNotesInput);
    setSelectedLead({ ...selectedLead, internalNotes: internalNotesInput });
    alert('Anotação interna salva com sucesso!');
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleWhatsAppLead = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const text = `Olá, ${lead.fullName}! Aqui é Gil Avila Daniel, corretor de imóveis. Recebi sua solicitação referente ao imóvel "${lead.propertyTitle || 'na Zona Sul de SP'}" e estou entrando em contato para conversarmos com total tranquilidade.`;
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Nome', 'Telefone', 'Email', 'Interesse', 'Imóvel', 'Data Visita', 'Status', 'Data Criação'];
    const rows = filtered.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.interestType}"`,
      `"${l.propertyTitle || ''}"`,
      `"${l.preferredDate || ''}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_gil_avila_daniel_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Gerenciamento de Leads & Agendamentos
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Acompanhe os contatos gerados no site, agendamentos de visita e retorno no WhatsApp.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold self-start sm:self-auto shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Exportar CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar lead por nome, telefone, e-mail ou imóvel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-700"
          >
            <option value="todos">Todos os Status</option>
            <option value="novo">Novo</option>
            <option value="em_atendimento">Em Atendimento</option>
            <option value="visita_agendada">Visita Agendada</option>
            <option value="convertido">Convertido</option>
            <option value="descartado">Descartado</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Telefone / E-mail</th>
                  <th className="py-3 px-4">Interesse / Imóvel</th>
                  <th className="py-3 px-4">Data Sugerida</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {lead.fullName}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        Origem: {lead.origin}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{lead.phone}</div>
                      {lead.email && <div className="text-[11px] text-slate-400">{lead.email}</div>}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                      {lead.propertyTitle || 'Consultoria Geral'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {lead.preferredDate ? `${lead.preferredDate} (${lead.preferredTime || 'A combinar'})` : 'Não informado'}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className={`text-[10px] font-bold uppercase rounded-lg px-2 py-1 border ${
                          lead.status === 'novo'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : lead.status === 'visita_agendada'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="novo">Novo</option>
                        <option value="em_atendimento">Em Atendimento</option>
                        <option value="visita_agendada">Visita Agendada</option>
                        <option value="convertido">Convertido</option>
                        <option value="descartado">Descartado</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenLeadModal(lead)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                        >
                          Detalhes
                        </button>
                        <button
                          onClick={() => handleWhatsAppLead(lead)}
                          className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                          title="Chamar no WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
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
            <p className="text-slate-500 text-xs">Nenhum lead encontrado com estes filtros.</p>
          </div>
        )}
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedLead.fullName}</h3>
                <span className="text-xs text-slate-500">ID: {selectedLead.id}</span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-xs">Telefone</span>
                  <strong className="text-slate-900">{selectedLead.phone}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">E-mail</span>
                  <strong className="text-slate-900">{selectedLead.email || 'Não informado'}</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-xs">Imóvel de Interesse</span>
                <div className="font-semibold text-slate-800 mt-0.5">
                  {selectedLead.propertyTitle || 'Consultoria Geral na Zona Sul'}
                </div>
              </div>

              {selectedLead.preferredDate && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-xs">Data Sugerida</span>
                    <div className="font-semibold text-slate-800">{selectedLead.preferredDate}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Horário</span>
                    <div className="font-semibold text-slate-800">{selectedLead.preferredTime || 'A combinar'}</div>
                  </div>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <span className="text-slate-400 block text-xs">Mensagem do Cliente</span>
                  <div className="p-3 rounded-lg bg-slate-50 text-slate-700 italic border border-slate-200 mt-1">
                    &ldquo;{selectedLead.message}&rdquo;
                  </div>
                </div>
              )}

              {/* Internal Broker Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Anotações Internas do Corretor (Privado)
                </label>
                <textarea
                  rows={3}
                  value={internalNotesInput}
                  onChange={(e) => setInternalNotesInput(e.target.value)}
                  placeholder="Ex: Cliente tem imóvel para permuta no Brooklin. Prefere visitas aos sábados."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Anotação</span>
                </button>
              </div>

              {/* Quick WhatsApp Button */}
              <div className="pt-4 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => handleWhatsAppLead(selectedLead)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Abrir Conversa no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
