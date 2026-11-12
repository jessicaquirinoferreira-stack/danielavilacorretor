import React, { useState } from 'react';
import { Property, PropertyMedia, PropertyStatus, TransactionType } from '../../types';
import { uploadMultipleMedia } from '../../lib/vercelBlob';
import {
  X,
  Upload,
  Image as ImageIcon,
  Video,
  Plus,
  Trash2,
  Check,
  Star,
  AlertTriangle,
  Eye,
  Link,
  Lock,
} from 'lucide-react';

interface AdminPropertyFormProps {
  initialProperty?: Property | null;
  onSave: (propertyData: any) => Promise<void>;
  onCancel: () => void;
}

export const AdminPropertyForm: React.FC<AdminPropertyFormProps> = ({
  initialProperty,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialProperty?.title || '');
  const [slug, setSlug] = useState(initialProperty?.slug || '');
  const [code, setCode] = useState(initialProperty?.code || `GAD-${Math.floor(100 + Math.random() * 900)}`);
  const [type, setType] = useState(initialProperty?.type || 'Apartamento');
  const [transactionType, setTransactionType] = useState<TransactionType>(initialProperty?.transactionType || 'venda');
  const [price, setPrice] = useState<number>(initialProperty?.price || 2500000);
  const [rentalPrice, setRentalPrice] = useState<number | undefined>(initialProperty?.rentalPrice);
  const [condoFee, setCondoFee] = useState<number | undefined>(initialProperty?.condoFee);
  const [iptu, setIptu] = useState<number | undefined>(initialProperty?.iptu);

  const [neighborhood, setNeighborhood] = useState(initialProperty?.neighborhood || 'Campo Belo / Moema');
  const [city, setCity] = useState(initialProperty?.city || 'São Paulo');
  const [state, setState] = useState(initialProperty?.state || 'SP');
  const [privateAddress, setPrivateAddress] = useState(
    initialProperty?.privateAddress || 'Endereço confidencial (nunca exibido no site)'
  );

  const [usableArea, setUsableArea] = useState<number>(initialProperty?.usableArea || 180);
  const [totalArea, setTotalArea] = useState<number | undefined>(initialProperty?.totalArea);
  const [bedrooms, setBedrooms] = useState<number>(initialProperty?.bedrooms || 3);
  const [suites, setSuites] = useState<number>(initialProperty?.suites || 3);
  const [bathrooms, setBathrooms] = useState<number>(initialProperty?.bathrooms || 4);
  const [parkingSpots, setParkingSpots] = useState<number>(initialProperty?.parkingSpots || 3);

  const [description, setDescription] = useState(
    initialProperty?.description ||
      'Imóvel amplo com excelente iluminação natural, living integrado e acabamentos contemporâneos de alto padrão.'
  );

  const [features, setFeatures] = useState<string[]>(
    initialProperty?.features || [
      'Varanda Gourmet Integrada',
      'Ar Condicionado',
      'Suíte Máster',
      'Piscina Climatizada',
      'Academia Equipada',
      'Portaria 24h',
    ]
  );
  const [newFeatureInput, setNewFeatureInput] = useState('');

  const [status, setStatus] = useState<PropertyStatus>(initialProperty?.status || 'pendente_confirmacao');
  const [isFeatured, setIsFeatured] = useState<boolean>(initialProperty?.isFeatured ?? true);
  const [isPublished, setIsPublished] = useState<boolean>(initialProperty?.isPublished ?? true);

  // Unlimited Media State (Vercel Blob)
  const [mediaList, setMediaList] = useState<PropertyMedia[]>(initialProperty?.media || []);
  const [coverImage, setCoverImage] = useState<string>(
    initialProperty?.coverImage || initialProperty?.media?.[0]?.url || ''
  );

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [customMediaUrl, setCustomMediaUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Auto-slug generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialProperty) {
      const generatedSlug = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleAddFeature = () => {
    if (newFeatureInput.trim() && !features.includes(newFeatureInput.trim())) {
      setFeatures([...features, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (feat: string) => {
    setFeatures(features.filter((f) => f !== feat));
  };

  // Upload handler for Vercel Blob (images and videos)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploaded = await uploadMultipleMedia(Array.from(files), (percent) => {
        setUploadProgress(percent);
      });

      const updated = [...mediaList, ...uploaded];
      setMediaList(updated);

      if (!coverImage && updated.length > 0) {
        setCoverImage(updated[0].url);
      }
    } catch {
      alert('Erro ao carregar mídia. Verifique os arquivos.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddCustomUrl = () => {
    if (!customMediaUrl.trim()) return;
    const isVid = /\.(mp4|webm|mov)$/i.test(customMediaUrl);
    const newMedia: PropertyMedia = {
      id: 'med-' + Date.now(),
      url: customMediaUrl.trim(),
      type: isVid ? 'video' : 'image',
    };
    const updated = [...mediaList, newMedia];
    setMediaList(updated);
    if (!coverImage) setCoverImage(newMedia.url);
    setCustomMediaUrl('');
  };

  const handleSetCover = (url: string) => {
    setCoverImage(url);
  };

  const handleRemoveMedia = (id: string) => {
    const updated = mediaList.filter((m) => m.id !== id);
    setMediaList(updated);
    if (coverImage === mediaList.find((m) => m.id === id)?.url) {
      setCoverImage(updated[0]?.url || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    setIsSaving(true);
    try {
      const finalCover = coverImage || mediaList[0]?.url || '';
      await onSave({
        title: title.trim(),
        slug: slug.trim() || `imovel-${Date.now()}`,
        code: code.trim(),
        type,
        transactionType,
        price: Number(price),
        rentalPrice: rentalPrice ? Number(rentalPrice) : undefined,
        condoFee: condoFee ? Number(condoFee) : undefined,
        iptu: iptu ? Number(iptu) : undefined,
        neighborhood,
        city,
        state,
        privateAddress,
        usableArea: Number(usableArea),
        totalArea: totalArea ? Number(totalArea) : undefined,
        bedrooms: Number(bedrooms),
        suites: Number(suites),
        bathrooms: Number(bathrooms),
        parkingSpots: Number(parkingSpots),
        description,
        features,
        status,
        isFeatured,
        isPublished,
        coverImage: finalCover,
        media: mediaList,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {initialProperty ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Preencha todos os dados técnicos e gerencie a galeria de fotos e vídeos via Vercel Blob.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
            1. Dados Básicos & Identificação
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Título do Imóvel *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ex: Apartamento de Alto Padrão no Campo Belo com Varanda Gourmet"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Código de Referência *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Slug da URL</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Imóvel</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              >
                <option value="Apartamento">Apartamento Padrão</option>
                <option value="Apartamento de Alto Padrão">Apartamento de Alto Padrão</option>
                <option value="Cobertura">Cobertura / Penthouse</option>
                <option value="Casa em Condomínio">Casa em Condomínio</option>
                <option value="Studio/Loft">Studio / Loft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Finalidade</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              >
                <option value="venda">Venda</option>
                <option value="locacao">Locação</option>
                <option value="ambos">Venda & Locação</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
            2. Valores & Encargos (R$)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preço de Venda (R$)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Aluguel Mensal (R$)</label>
              <input
                type="number"
                value={rentalPrice || ''}
                onChange={(e) => setRentalPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Opcional"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Condomínio (R$/mês)</label>
              <input
                type="number"
                value={condoFee || ''}
                onChange={(e) => setCondoFee(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Ex: 2400"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">IPTU Anual (R$)</label>
              <input
                type="number"
                value={iptu || ''}
                onChange={(e) => setIptu(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Ex: 950"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Location & Private Address */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
            3. Localização & Endereço Privado
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bairro / Região *</label>
              <input
                type="text"
                required
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Ex: Campo Belo / Moema"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cidade</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estado</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Endereço Privado Interno (Protegido - NUNCA publicado aos visitantes do site)</span>
            </div>
            <input
              type="text"
              value={privateAddress}
              onChange={(e) => setPrivateAddress(e.target.value)}
              placeholder="Rua, número, complemento e contato do proprietário"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Atendendo às diretrizes de segurança, este campo permanece estritamente acessível apenas a você no painel.
            </p>
          </div>
        </div>

        {/* Specs & Dimensions */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
            4. Metragens & Dimensões
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Área Útil (m²)</label>
              <input
                type="number"
                value={usableArea}
                onChange={(e) => setUsableArea(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Área Total (m²)</label>
              <input
                type="number"
                value={totalArea || ''}
                onChange={(e) => setTotalArea(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Dormitórios</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Suítes</label>
              <input
                type="number"
                value={suites}
                onChange={(e) => setSuites(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Banheiros</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Vagas</label>
              <input
                type="number"
                value={parkingSpots}
                onChange={(e) => setParkingSpots(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Features / Differentials */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
            5. Diferenciais & Comodidades
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Adicionar diferencial (ex: Varanda Gourmet, Adega, Vista Panorâmica)"
              value={newFeatureInput}
              onChange={(e) => setNewFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 text-sm"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700"
            >
              Adicionar
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {features.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium"
              >
                <span>{feat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(feat)}
                  className="text-blue-500 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
            6. Descrição Detalhada
          </h3>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm leading-relaxed"
          />
        </div>

        {/* Unlimited Vercel Blob Gallery */}
        <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
                7. Galeria Ilimitada de Fotos e Vídeos (Vercel Blob)
              </h3>
              <p className="text-xs text-slate-500">
                Carregue fotos de alta definição e vídeos sem limite de quantidade.
              </p>
            </div>

            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer shadow-xs">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? `Enviando (${uploadProgress}%)...` : 'Upload Múltiplo (Fotos/Vídeos)'}</span>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Add direct URL */}
          <div className="flex gap-2 pt-2">
            <input
              type="url"
              placeholder="Ou cole a URL direta de uma foto ou vídeo..."
              value={customMediaUrl}
              onChange={(e) => setCustomMediaUrl(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 text-xs bg-white"
            />
            <button
              type="button"
              onClick={handleAddCustomUrl}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              Adicionar Link
            </button>
          </div>

          {/* Media Items Grid */}
          {mediaList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {mediaList.map((media) => {
                const isCover = coverImage === media.url;
                return (
                  <div
                    key={media.id}
                    className={`relative rounded-xl overflow-hidden aspect-16/10 border-2 bg-slate-900 group ${
                      isCover ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-slate-200'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <video src={media.url} className="w-full h-full object-cover" />
                    ) : (
                      <img src={media.url} alt="" className="w-full h-full object-cover" />
                    )}

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSetCover(media.url)}
                        className={`p-1.5 rounded-md text-xs font-semibold ${
                          isCover ? 'bg-blue-600 text-white' : 'bg-white/80 text-slate-800 hover:bg-white'
                        }`}
                        title="Definir como capa principal"
                      >
                        <Star className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(media.id)}
                        className="p-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
                        title="Excluir da galeria"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {isCover && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">
                        Foto de Capa
                      </span>
                    )}

                    {media.type === 'video' && (
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[10px] flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Vídeo
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl">
              Nenhuma foto ou vídeo carregado ainda. Faça upload de arquivos acima.
            </div>
          )}
        </div>

        {/* Status & Publication */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
            8. Status & Publicação
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status do Imóvel</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold"
              >
                <option value="pendente_confirmacao">Pendente de Confirmação</option>
                <option value="disponivel">Disponível</option>
                <option value="reservado">Reservado</option>
                <option value="vendido">Vendido</option>
                <option value="alugado">Alugado</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm"
              />
              <label htmlFor="isFeatured" className="text-xs font-bold text-slate-800 cursor-pointer">
                Exibir na Seção de Destaques da Home
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm"
              />
              <label htmlFor="isPublished" className="text-xs font-bold text-slate-800 cursor-pointer">
                Publicado no Site (Visível aos visitantes)
              </label>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md disabled:opacity-50"
          >
            {isSaving ? 'Salvando...' : initialProperty ? 'Atualizar Imóvel' : 'Publicar Imóvel'}
          </button>
        </div>
      </form>
    </div>
  );
};
