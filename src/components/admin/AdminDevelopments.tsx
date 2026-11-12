import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Development, PropertyMedia, DevelopmentStatus } from '../../types';
import { uploadMultipleMedia } from '../../lib/vercelBlob';
import {
  Plus,
  Layers,
  Edit2,
  Trash2,
  Upload,
  X,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export const AdminDevelopments: React.FC = () => {
  const { developments, addDevelopment, updateDevelopment, deleteDevelopment, setCurrentPage, setSelectedDevelopmentSlug } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editingDev, setEditingDev] = useState<Development | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [slug, setSlug] = useState('');
  const [neighborhood, setNeighborhood] = useState('Zona Sul / São Bernardo');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [status, setStatus] = useState<DevelopmentStatus>('pendente_confirmacao');
  const [minArea, setMinArea] = useState(152);
  const [maxArea, setMaxArea] = useState(224);
  const [minBedrooms, setMinBedrooms] = useState(3);
  const [maxBedrooms, setMaxBedrooms] = useState(4);
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [features, setFeatures] = useState<string[]>(['Piscina Aquecida', 'Lazer Completo', 'Fitness Center']);
  const [newFeat, setNewFeat] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenCreate = () => {
    setEditingDev(null);
    setName('');
    setCode(`EMP-${Math.floor(100 + Math.random() * 900)}`);
    setSlug('');
    setNeighborhood('Zona Sul / São Bernardo');
    setMinArea(152);
    setMaxArea(224);
    setDescription('Empreendimento moderno de alto padrão com plantas inteligentes e lazer exclusivo.');
    setCoverImage(developments[0]?.coverImage || '');
    setIsEditing(true);
  };

  const handleOpenEdit = (dev: Development) => {
    setEditingDev(dev);
    setName(dev.name);
    setCode(dev.code);
    setSlug(dev.slug);
    setNeighborhood(dev.neighborhood);
    setCity(dev.city);
    setState(dev.state);
    setStatus(dev.status);
    setMinArea(dev.minArea);
    setMaxArea(dev.maxArea);
    setMinBedrooms(dev.minBedrooms);
    setMaxBedrooms(dev.maxBedrooms);
    setDescription(dev.description);
    setCoverImage(dev.coverImage);
    setFeatures(dev.features || []);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const data = {
      name: name.trim(),
      code: code.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      neighborhood,
      city,
      state,
      status,
      minArea: Number(minArea),
      maxArea: Number(maxArea),
      minBedrooms: Number(minBedrooms),
      maxBedrooms: Number(maxBedrooms),
      description,
      features,
      coverImage: coverImage || developments[0]?.coverImage,
      media: [{ id: 'm1', url: coverImage || developments[0]?.coverImage, type: 'image' as const }],
      isFeatured: true,
      isPublished: true,
    };

    if (editingDev) {
      await updateDevelopment(editingDev.id, data);
    } else {
      await addDevelopment(data);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Deseja excluir o empreendimento "${name}"?`)) {
      await deleteDevelopment(id);
    }
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const uploaded = await uploadMultipleMedia([files[0]]);
      if (uploaded[0]?.url) setCoverImage(uploaded[0].url);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Gerenciamento de Empreendimentos
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cadastre lançamentos, edifícios residenciais modernos e plantas de 152 a 224 m².
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Empreendimento</span>
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              {editingDev ? 'Editar Empreendimento' : 'Cadastrar Empreendimento'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nome do Empreendimento *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Código</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bairro / Região</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status da Obra</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                >
                  <option value="pendente_confirmacao">Pendente de Confirmação</option>
                  <option value="lancamento">Lançamento</option>
                  <option value="em_obras">Em Obras</option>
                  <option value="pronto">Pronto para Morar</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Faixa de Metragem (m²)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minArea}
                    onChange={(e) => setMinArea(Number(e.target.value))}
                    className="w-full px-2 py-2 rounded-lg border border-slate-200 text-center"
                  />
                  <span>a</span>
                  <input
                    type="number"
                    value={maxArea}
                    onChange={(e) => setMaxArea(Number(e.target.value))}
                    className="w-full px-2 py-2 rounded-lg border border-slate-200 text-center"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Descrição</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Foto de Capa (Vercel Blob)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="URL da imagem..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
                <label className="px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer">
                  <Upload className="w-3.5 h-3.5 inline mr-1" />
                  <span>{isUploading ? 'Enviando...' : 'Upload'}</span>
                  <input type="file" accept="image/*" onChange={handleUploadCover} className="hidden" />
                </label>
              </div>
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
                Salvar Empreendimento
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {developments.map((dev) => (
            <div key={dev.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
              <div className="relative aspect-16/9 bg-slate-100">
                <img src={dev.coverImage} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#0f2338] text-white">
                    {dev.code}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{dev.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{dev.neighborhood}, {dev.city}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{dev.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-blue-600">
                    {dev.minArea} a {dev.maxArea} m²
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(dev)}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(dev.id, dev.name)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
