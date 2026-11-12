import React, { useState } from 'react';
import { uploadMultipleMedia } from '../../lib/vercelBlob';
import { PropertyMedia } from '../../types';
import {
  Upload,
  Image as ImageIcon,
  Video,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import profilePhoto from '../../assets/images/gil_avila_daniel_profile_1794489125256.jpg';
import facadePhoto from '../../assets/images/modern_building_facade_1794489137249.jpg';
import livingPhoto from '../../assets/images/luxury_apartment_living_1794489150257.jpg';

export const AdminMediaManager: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<PropertyMedia[]>([
    { id: 'm1', url: profilePhoto, type: 'image', caption: 'Gil Avila Daniel - Foto Profissional Oficial' },
    { id: 'm2', url: facadePhoto, type: 'image', caption: 'Fachada Noturna - Edifício Residencial Contemporâneo' },
    { id: 'm3', url: livingPhoto, type: 'image', caption: 'Living Integrado com Varanda Gourmet 224m²' },
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadPercent(0);

    try {
      const uploaded = await uploadMultipleMedia(Array.from(files), (percent) => {
        setUploadPercent(percent);
      });
      setMediaItems((prev) => [...uploaded, ...prev]);
    } catch {
      alert('Erro no upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja remover este item de mídia da biblioteca?')) {
      setMediaItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Central de Mídia (Vercel Blob)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Biblioteca unificada para upload ilimitado de fotos de alta resolução e vídeos dos empreendimentos.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? `Enviando (${uploadPercent}%)...` : 'Fazer Upload de Fotos/Vídeos'}</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Info Card */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Armazenamento Vercel Blob Integrado:</span> Não há limites artificiais de quantidade. Todas as mídias salvas podem ser vinculadas a imóveis, empreendimentos ou landing pages instantaneamente.
        </div>
      </div>

      {/* Grid of Media */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group flex flex-col justify-between">
            <div className="relative aspect-16/10 bg-slate-900">
              {item.type === 'video' ? (
                <video src={item.url} controls className="w-full h-full object-cover" />
              ) : (
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              )}
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-semibold uppercase flex items-center gap-1">
                {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                <span>{item.type}</span>
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-700 font-medium truncate mb-3" title={item.caption}>
                {item.caption || item.id}
              </p>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleCopyUrl(item.id, item.url)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Copiado!' : 'Copiar URL'}</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
