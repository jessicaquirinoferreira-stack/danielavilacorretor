import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LandingPage } from '../../types';
import {
  Compass,
  Plus,
  Copy,
  Check,
  ExternalLink,
  Edit2,
  Trash2,
  Share2,
  Instagram,
  Facebook,
  MessageCircle,
  Eye,
  X,
} from 'lucide-react';

export const AdminLandingPages: React.FC = () => {
  const { landingPages, addLandingPage, updateLandingPage, deleteLandingPage, properties, setCurrentPage, setSelectedLpSlug } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editingLp, setEditingLp] = useState<LandingPage | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [ctaText, setCtaText] = useState('Falar Diretamente com Gil Avila Daniel no WhatsApp');
  const [customWhatsAppMessage, setCustomWhatsAppMessage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [copiedLinkIndex, setCopiedLinkIndex] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingLp(null);
    setTitle('');
    setSlug(`campanha-${Date.now().toString().slice(-4)}`);
    setHeadline('Oportunidades Selecionadas de Alto Padrão na Zona Sul de SP');
    setSubheadline('Plantas amplas de 152 a 224 m² com atendimento pessoal de Gil Avila Daniel.');
    setCtaText('Falar Diretamente no WhatsApp (+55 11 97324-5981)');
    setCustomWhatsAppMessage('Olá Gil! Vi a campanha especial no Instagram e gostaria de informações sobre os imóveis de 152 a 224 m².');
    setCoverImage(properties[0]?.coverImage || '');
    setIsEditing(true);
  };

  const handleOpenEdit = (lp: LandingPage) => {
    setEditingLp(lp);
    setTitle(lp.title);
    setSlug(lp.slug);
    setHeadline(lp.headline);
    setSubheadline(lp.subheadline);
    setCtaText(lp.ctaText);
    setCustomWhatsAppMessage(lp.customWhatsAppMessage || '');
    setCoverImage(lp.coverImage);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;

    const data = {
      title: title.trim(),
      slug: slug.trim(),
      headline: headline.trim(),
      subheadline: subheadline.trim(),
      ctaText: ctaText.trim(),
      customWhatsAppMessage: customWhatsAppMessage.trim(),
      coverImage: coverImage || properties[0]?.coverImage || '',
      media: [{ id: 'm1', url: coverImage || properties[0]?.coverImage || '', type: 'image' as const }],
      isPublished: true,
    };

    if (editingLp) {
      await updateLandingPage(editingLp.id, data);
    } else {
      await addLandingPage(data);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir esta landing page de campanha?')) {
      await deleteLandingPage(id);
    }
  };

  const handleCopyShareLink = (slug: string, utmSource: string) => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/lp/${slug}?utm_source=${utmSource}&utm_medium=social&utm_campaign=gad_imoveis`;
    navigator.clipboard.writeText(url);
    setCopiedLinkIndex(`${slug}-${utmSource}`);
    setTimeout(() => setCopiedLinkIndex(null), 2500);
  };

  const handlePreview = (slug: string) => {
    setSelectedLpSlug(slug);
    setCurrentPage('lp');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Landing Pages de Campanha
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Crie páginas dedicadas com links prontos e parâmetros UTM para Instagram, WhatsApp e anúncios.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Nova Landing Page</span>
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              {editingLp ? 'Editar Landing Page' : 'Criar Nova Landing Page'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Título Interno da Campanha *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Campanha Instagram - Apartamentos 224m² Moema"
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Slug da URL * (/lp/slug)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Headline Principal do Banner</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subtítulo / Proposta de Valor</label>
              <textarea
                rows={2}
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Texto do Botão CTA</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mensagem Pré-preenchida no WhatsApp</label>
              <textarea
                rows={2}
                value={customWhatsAppMessage}
                onChange={(e) => setCustomWhatsAppMessage(e.target.value)}
                placeholder="Ex: Olá Gil! Vi a campanha no Instagram e gostaria de saber mais..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL da Imagem de Capa</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-lg text-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs"
              >
                Salvar Landing Page
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {landingPages.map((lp) => (
            <div key={lp.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                      /lp/{lp.slug}
                    </span>
                    <span className="text-xs text-slate-400">
                      Visualizações: {lp.viewCount} • Leads: {lp.leadCount}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{lp.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl">{lp.headline}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePreview(lp.slug)}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                    title="Pré-visualizar página"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Visualizar</span>
                  </button>
                  <button
                    onClick={() => handleOpenEdit(lp)}
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(lp.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Ready-to-use Social Sharing Links */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-800 block mb-3">
                  Links Prontos de Divulgação com Rastreamento UTM:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Instagram Bio/Stories */}
                  <button
                    onClick={() => handleCopyShareLink(lp.slug, 'instagram_bio')}
                    className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-400 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-700">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span>Instagram (Bio/Stories)</span>
                    </div>
                    {copiedLinkIndex === `${lp.slug}-instagram_bio` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>

                  {/* WhatsApp Blast */}
                  <button
                    onClick={() => handleCopyShareLink(lp.slug, 'whatsapp_disparo')}
                    className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 hover:border-emerald-400 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-700">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Disparo</span>
                    </div>
                    {copiedLinkIndex === `${lp.slug}-whatsapp_disparo` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>

                  {/* Facebook / Meta Ads */}
                  <button
                    onClick={() => handleCopyShareLink(lp.slug, 'meta_ads')}
                    className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-700">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span>Meta Ads / Anúncios</span>
                    </div>
                    {copiedLinkIndex === `${lp.slug}-meta_ads` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
