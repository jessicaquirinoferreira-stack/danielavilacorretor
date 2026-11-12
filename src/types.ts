export type TransactionType = 'venda' | 'locacao' | 'ambos';

export type PropertyStatus =
  | 'pendente_confirmacao'
  | 'disponivel'
  | 'reservado'
  | 'vendido'
  | 'alugado';

export type DevelopmentStatus =
  | 'lancamento'
  | 'em_obras'
  | 'pronto'
  | 'pendente_confirmacao';

export type LeadStatus =
  | 'novo'
  | 'em_atendimento'
  | 'visita_agendada'
  | 'convertido'
  | 'descartado';

export interface PropertyMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
  isCover?: boolean;
}

export interface Property {
  id: string;
  code: string;
  title: string;
  slug: string;
  type: string; // 'Apartamento', 'Cobertura', 'Casa em Condomínio', 'Studio/Loft', 'Penthouse'
  transactionType: TransactionType;
  price: number;
  rentalPrice?: number;
  condoFee?: number;
  iptu?: number;
  neighborhood: string;
  city: string;
  state: string;
  privateAddress: string; // Endereço privado, nunca exposto no frontend
  usableArea: number; // m²
  totalArea?: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  description: string;
  features: string[]; // ex: 'Varanda Gourmet', 'Piscina Climatizada', 'Vista Panorâmica'
  status: PropertyStatus;
  isFeatured: boolean;
  isPublished: boolean;
  coverImage: string;
  media: PropertyMedia[];
  developmentId?: string;
  developmentName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DevelopmentUnit {
  id: string;
  type: string;
  area: number;
  bedrooms: number;
  suites: number;
  parkingSpots: number;
  priceEstimate?: number;
}

export interface Development {
  id: string;
  code: string;
  name: string;
  slug: string;
  neighborhood: string;
  city: string;
  state: string;
  status: DevelopmentStatus;
  minArea: number;
  maxArea: number;
  minBedrooms: number;
  maxBedrooms: number;
  unitsCount?: number;
  description: string;
  features: string[];
  coverImage: string;
  media: PropertyMedia[];
  units?: DevelopmentUnit[];
  isFeatured: boolean;
  isPublished: boolean;
  expectedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  interestType: 'comprar' | 'alugar' | 'agendar_visita' | 'duvida_geral';
  propertyId?: string;
  propertyTitle?: string;
  propertyCode?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  origin: string; // 'site_home', 'imovel_detalhe', 'landing_page', 'whatsapp_click'
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: LeadStatus;
  internalNotes?: string;
  createdAt: string;
}

export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  headline: string;
  subheadline: string;
  propertyId?: string;
  coverImage: string;
  media: PropertyMedia[];
  ctaText: string;
  customWhatsAppMessage?: string;
  targetAudience?: string;
  isPublished: boolean;
  viewCount: number;
  leadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName: string;
  creci: string; // Editável pelo corretor
  phone: string;
  whatsapp: string; // Formato internacional: 5511973245981
  whatsappDisplay: string; // (11) 97324-5981
  instagram: string; // @daniel_corretor1
  threads: string; // @daniel_corretor1
  email: string;
  primaryColor: string; // Navy profundo #0c1a29
  secondaryColor: string; // Azul médio #2563eb
  heroTitle: string;
  heroSubtitle: string;
  institutionalText: string;
  availabilityDisclaimer: string;
  updatedAt: string;
}

export interface ProfessionalProfile {
  fullName: string;
  role: string;
  experienceYears: number;
  specialtyRegion: string;
  bio: string;
  photoUrl: string;
  instagram: string;
  whatsapp: string;
  threads: string;
  values: {
    title: string;
    description: string;
  }[];
}

export interface AnalyticsEvent {
  id: string;
  eventType: 'page_view' | 'whatsapp_click' | 'lead_submission' | 'share_click';
  targetType?: 'property' | 'development' | 'landing_page' | 'header' | 'footer';
  targetId?: string;
  source?: string;
  timestamp: string;
}
