import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Save,
  ShieldCheck,
  Check,
  Phone,
  Instagram,
  Mail,
  Palette,
  FileText,
  Building2,
  Sparkles,
} from 'lucide-react';

export const AdminSiteSettings: React.FC = () => {
  const { settings, updateSettings, profile, updateProfile } = useApp();

  const [siteName, setSiteName] = useState(settings.siteName);
  const [creci, setCreci] = useState(settings.creci);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [whatsappDisplay, setWhatsappDisplay] = useState(settings.whatsappDisplay);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [threads, setThreads] = useState(settings.threads);
  const [email, setEmail] = useState(settings.email);

  const [heroTitle, setHeroTitle] = useState(settings.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle);
  const [institutionalText, setInstitutionalText] = useState(settings.institutionalText);

  // Profile fields
  const [bio, setBio] = useState(profile.bio);
  const [specialtyRegion, setSpecialtyRegion] = useState(profile.specialtyRegion);
  const [experienceYears, setExperienceYears] = useState(profile.experienceYears);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateSettings({
      ...settings,
      siteName,
      creci,
      phone,
      whatsapp,
      whatsappDisplay,
      instagram,
      threads,
      email,
      heroTitle,
      heroSubtitle,
      institutionalText,
      updatedAt: new Date().toISOString(),
    });

    await updateProfile({
      ...profile,
      bio,
      specialtyRegion,
      experienceYears: Number(experienceYears),
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Configurações do Site & Perfil
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalize informações de contato, número de CRECI, mensagens institucionais e redes sociais.
          </p>
        </div>

        {isSaved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Check className="w-4 h-4" />
            <span>Alterações Salvas!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Contatos & Canais Oficiais */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>1. Canais Oficiais de Atendimento</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Oficial (Número com DDI e DDD) *
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="5511973245981"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Confirmado: 5511973245981</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Exibição do WhatsApp no Site *
              </label>
              <input
                type="text"
                required
                value={whatsappDisplay}
                onChange={(e) => setWhatsappDisplay(e.target.value)}
                placeholder="+55 11 97324-5981"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instagram Oficial
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@daniel_corretor1"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Threads Oficial
              </label>
              <input
                type="text"
                value={threads}
                onChange={(e) => setThreads(e.target.value)}
                placeholder="@daniel_corretor1"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                E-mail Profissional
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contato@gilaviladaniel.com.br"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Informações Profissionais & CRECI */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>2. Registro Profissional (CRECI) & Especialidade</span>
          </h3>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <strong>Regra Obrigatória:</strong> Não foi inventado nenhum número de CRECI. O campo abaixo é 100% editável para que você insira o seu número definitivo ou mantenha como &ldquo;Informado sob consulta&rdquo;.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Número do CRECI (Editável) *
              </label>
              <input
                type="text"
                value={creci}
                onChange={(e) => setCreci(e.target.value)}
                placeholder="Ex: 123456-F ou Informado sob consulta"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tempo de Experiência (Anos)
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Região de Especialidade Declarada
            </label>
            <input
              type="text"
              value={specialtyRegion}
              onChange={(e) => setSpecialtyRegion(e.target.value)}
              placeholder="Zona Sul de São Paulo e São Bernardo do Campo"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Biografia Institucional Completa
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Textos Institucionais do Site */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>3. Mensagem Central & Textos da Home</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Título Hero Principal
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Texto Institucional Base (Editável)
            </label>
            <textarea
              rows={3}
              value={institutionalText}
              onChange={(e) => setInstitutionalText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Todas as Configurações</span>
          </button>
        </div>
      </form>
    </div>
  );
};
