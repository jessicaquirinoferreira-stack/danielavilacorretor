import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getVisitSchedulerWhatsAppLink } from '../../lib/whatsapp';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Send,
  MessageCircle,
  CheckCircle2,
  Building,
} from 'lucide-react';

interface VisitSchedulerProps {
  preselectedPropertyTitle?: string;
  preselectedPropertyCode?: string;
  preselectedPropertyId?: string;
}

export const VisitSchedulerSection: React.FC<VisitSchedulerProps> = ({
  preselectedPropertyTitle,
  preselectedPropertyCode,
  preselectedPropertyId,
}) => {
  const { submitLead, trackEvent, properties } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestType, setInterestType] = useState<'agendar_visita' | 'comprar' | 'alugar' | 'duvida_geral'>('agendar_visita');
  const [propertyId, setPropertyId] = useState(preselectedPropertyId || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  const selectedProperty = properties.find((p) => p.id === propertyId);
  const effectiveTitle = preselectedPropertyTitle || selectedProperty?.title;
  const effectiveCode = preselectedPropertyCode || selectedProperty?.code;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      const saved = await submitLead({
        fullName: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        interestType,
        propertyId: propertyId || undefined,
        propertyTitle: effectiveTitle,
        propertyCode: effectiveCode,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
        message: message.trim() || undefined,
        origin: preselectedPropertyId ? 'imovel_detalhe' : 'site_home',
        utmSource: 'site_institucional',
      });

      setSubmittedData({
        clientName: name,
        clientPhone: phone,
        propertyTitle: effectiveTitle,
        propertyCode: effectiveCode,
        preferredDate,
        preferredTime,
        notes: message,
      });

      // Celebration effect
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    } catch {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!submittedData) return;
    trackEvent('whatsapp_click', 'lead_form');
    window.open(getVisitSchedulerWhatsAppLink(submittedData), '_blank');
  };

  return (
    <section id="agendamento" className="py-20 bg-[#0a1926] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Information & Value Proposition */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Atendimento Exclusivo</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Agende uma Visita ou Solicite Consultoria
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Atendimento personalizado diretamente com Gil Avila Daniel. Escolha o dia e horário mais conveniente para você ou envie suas dúvidas sobre imóveis na Zona Sul.
            </p>

            <div className="space-y-4 border-t border-slate-800 pt-6 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Confirmação rápida e sem intermediários pelo WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Discrição absoluta e respeito à sua privacidade</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Assessoria com corretor de mais de 20 anos de mercado</span>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400">WhatsApp Oficial de Gil Avila Daniel</div>
                <div className="text-base font-bold text-white">+55 11 97324-5981</div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-100">
              {submittedData ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                    Seus dados foram registrados com segurança. Para agilizar o agendamento em tempo real, clique no botão abaixo para enviar a mensagem formatada diretamente ao WhatsApp oficial de Gil Avila Daniel.
                  </p>

                  <button
                    onClick={handleOpenWhatsApp}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98] w-full sm:w-auto"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Confirmar Agendamento no WhatsApp Oficial</span>
                  </button>

                  <div className="mt-4">
                    <button
                      onClick={() => setSubmittedData(null)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                      Enviar outra solicitação
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Formulário de Contato e Agendamento
                    </h3>
                    <p className="text-xs text-slate-500">
                      Preencha os campos abaixo. Entraremos em contato com a máxima agilidade.
                    </p>
                  </div>

                  {/* Nome e Telefone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Carlos Ferreira"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* E-mail e Tipo de Interesse */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        E-mail (opcional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Tipo de Interesse *
                      </label>
                      <select
                        value={interestType}
                        onChange={(e) => setInterestType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      >
                        <option value="agendar_visita">Agendar Visita a Imóvel</option>
                        <option value="comprar">Interesse em Comprar</option>
                        <option value="alugar">Interesse em Alugar</option>
                        <option value="duvida_geral">Dúvida Geral / Consultoria</option>
                      </select>
                    </div>
                  </div>

                  {/* Seletor de Imóvel (se não preselecionado) */}
                  {!preselectedPropertyId && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        Imóvel de Referência (opcional)
                      </label>
                      <select
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      >
                        <option value="">Selecione ou deixe em branco para consultoria geral</option>
                        {properties.map((p) => (
                          <option key={p.id} value={p.id}>
                            [{p.code}] {p.title} - {p.neighborhood}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Data e Horário sugeridos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Data Sugerida
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Horário de Preferência
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      >
                        <option value="">Selecione o turno</option>
                        <option value="Manhã (09:00 - 12:00)">Manhã (09:00 - 12:00)</option>
                        <option value="Tarde (13:00 - 17:00)">Tarde (13:00 - 17:00)</option>
                        <option value="Final de tarde (17:00 - 19:00)">Final de tarde (17:00 - 19:00)</option>
                        <option value="Sábado">Sábado</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Mensagem / Observações Adicionais
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Conte um pouco sobre suas preferências (ex: metragem desejada, vagas de garagem, etc.)."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0f2338] hover:bg-[#153554] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Registrando...' : 'Enviar Solicitação de Visita'}</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Ao enviar, você concorda com o contato de Gil Avila Daniel nos termos da nossa Política de Privacidade e LGPD.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
