import {
  Property,
  Development,
  Lead,
  LandingPage,
  SiteSettings,
  ProfessionalProfile,
  AnalyticsEvent,
} from '../types';
import profilePhoto from '../assets/images/gil_avila_daniel_profile_1794489125256.jpg';
import facadePhoto from '../assets/images/modern_building_facade_1794489137249.jpg';
import livingPhoto from '../assets/images/luxury_apartment_living_1794489150257.jpg';

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'Gil Avila Daniel | Corretor de Imóveis',
  creci: 'Informado sob consulta', // Campo editável pelo corretor no painel
  phone: '+55 11 97324-5981',
  whatsapp: '5511973245981',
  whatsappDisplay: '+55 11 97324-5981',
  instagram: '@daniel_corretor1',
  threads: '@daniel_corretor1',
  email: 'contato@gilaviladaniel.com.br',
  primaryColor: '#0a1926',
  secondaryColor: '#2563eb',
  heroTitle: 'Mais de 20 anos conectando pessoas ao imóvel ideal na Zona Sul de São Paulo',
  heroSubtitle:
    'Consultoria imobiliária personalizada, atendimento exclusivo com o próprio Gil Avila Daniel e curadoria de alto padrão em São Paulo e região.',
  institutionalText:
    'Sou Gil Avila Daniel, corretor de imóveis com mais de 20 anos de experiência e especialista na Zona Sul de SP. Meu compromisso é oferecer atendimento transparente, profissional e personalizado para que você encontre o imóvel certo com segurança e tranquilidade.',
  availabilityDisclaimer:
    'Aviso de Confirmação: As informações e disponibilidades de imóveis apresentadas têm como base referências de mercado e estão sujeitas a confirmação direta com o corretor responsável antes de qualquer proposta formal.',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_PROFILE: ProfessionalProfile = {
  fullName: 'Gil Avila Daniel',
  role: 'Corretor de Imóveis | Especialista Zona Sul – SP',
  experienceYears: 20,
  specialtyRegion: 'Zona Sul de São Paulo e São Bernardo do Campo',
  bio: 'Atuando há mais de duas décadas no mercado imobiliário paulistano, Gil Avila Daniel construiu uma reputação alicerçada na seriedade, discrição e conhecimento aprofundado das particularidades de cada bairro da Zona Sul. Cada cliente recebe atendimento direto e transparente, garantindo total segurança patrimonial e jurídica na escolha do seu próximo lar ou investimento.',
  photoUrl: profilePhoto,
  instagram: '@daniel_corretor1',
  whatsapp: '+55 11 97324-5981',
  threads: '@daniel_corretor1',
  values: [
    {
      title: 'Mais de 20 Anos de Experiência',
      description:
        'Trajetória sólida, vivenciando os diferentes ciclos do mercado imobiliário com serenidade e precisão técnica.',
    },
    {
      title: 'Especialista na Zona Sul e Região',
      description:
        'Conhecimento detalhado de cada via, condomínio e oportunidade em Moema, Brooklin, Campo Belo, Vila Mariana e ABC.',
    },
    {
      title: 'Atendimento Direto pelo WhatsApp',
      description:
        'Sem intermediários burocráticos. Você fala diretamente com Gil Avila Daniel com agilidade e cordialidade.',
    },
    {
      title: 'Segurança e Discrição Absoluta',
      description:
        'Orientação técnica completa, salvaguarda de dados privados dos proprietários e assessoria passo a passo.',
    },
  ],
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    code: 'GAD-224',
    title: 'Apartamento de Alto Padrão com Varanda Gourmet Integrada',
    slug: 'apartamento-alto-padrao-varanda-gourmet-224m2',
    type: 'Apartamento',
    transactionType: 'venda',
    price: 3450000,
    condoFee: 3200,
    iptu: 1450,
    neighborhood: 'Campo Belo / Moema',
    city: 'São Paulo',
    state: 'SP',
    privateAddress: 'Rua Vieira de Morais, Campo Belo (Endereço interno reservado)',
    usableArea: 224,
    totalArea: 380,
    bedrooms: 4,
    suites: 3,
    bathrooms: 5,
    parkingSpots: 4,
    description:
      'Imóvel amplo e sofisticado identificado nas referências do corretor Gil Avila Daniel. Conta com planta inteligente de 224 m² privativos, living integrado com fechamento em vidro retrátil, varanda gourmet com bancada em mármore, suíte máster com closet e hidromassagem, e acabamentos nobres em madeira e porcelanato de grande formato. Condomínio com lazer completo e segurança patrimonial armada 24h.',
    features: [
      'Varanda Gourmet Integrada',
      'Ar Condicionado Central',
      'Suíte Máster com Closet',
      'Piscina Aquecida Coberta',
      'Academia Equipada',
      'Depósito Privativo no Subsolo',
      'Gerador para Áreas Comuns e Elevadores',
      'Vagas Cobertas e Determinadas',
    ],
    status: 'pendente_confirmacao',
    isFeatured: true,
    isPublished: true,
    coverImage: livingPhoto,
    media: [
      { id: 'm1', url: livingPhoto, type: 'image', isCover: true, caption: 'Living amplo integrado com varanda' },
      { id: 'm2', url: facadePhoto, type: 'image', caption: 'Fachada imponente com iluminação noturna' },
    ],
    developmentName: 'Edifício Residencial Prime',
    createdAt: '2026-11-01T10:00:00.000Z',
    updatedAt: '2026-11-12T08:00:00.000Z',
  },
  {
    id: 'prop-002',
    code: 'GAD-186',
    title: 'Residencial Contemporâneo com Vista Panorâmica para a Zona Sul',
    slug: 'residencial-contemporaneo-vista-panoramica-186m2',
    type: 'Apartamento',
    transactionType: 'venda',
    price: 2680000,
    condoFee: 2400,
    iptu: 980,
    neighborhood: 'Brooklin / Chácara Flora',
    city: 'São Paulo',
    state: 'SP',
    privateAddress: 'Av. Padre Antônio José dos Santos (Endereço interno reservado)',
    usableArea: 186,
    totalArea: 295,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpots: 3,
    description:
      'Apartamento moderno com 186 m² muito bem distribuídos. Living com pé-direito imponente, janelas do chão ao teto proporcionando iluminação natural abundante durante todo o dia. Cozinha planejada com ilha central e integração fluida. Área íntima silenciosa e climatizada.',
    features: [
      'Vista Panorâmica Desobstruída',
      'Cozinha com Ilha Gourmet',
      '3 Suítes Plenas',
      'Quadra de Tênis Oficial',
      'Spa com Sauna Seca e Úmida',
      'Brinquedoteca e Espaço Teen',
      'Portaria Blindada',
    ],
    status: 'pendente_confirmacao',
    isFeatured: true,
    isPublished: true,
    coverImage: facadePhoto,
    media: [
      { id: 'm3', url: facadePhoto, type: 'image', isCover: true, caption: 'Perspectiva arquitetônica externa' },
      { id: 'm4', url: livingPhoto, type: 'image', caption: 'Interiores decorados de alto padrão' },
    ],
    createdAt: '2026-11-05T14:30:00.000Z',
    updatedAt: '2026-11-12T08:00:00.000Z',
  },
  {
    id: 'prop-003',
    code: 'GAD-152',
    title: 'Apartamento Sofisticado Próximo ao Metrô e Parques',
    slug: 'apartamento-sofisticado-vila-mariana-152m2',
    type: 'Apartamento',
    transactionType: 'venda',
    price: 1950000,
    rentalPrice: 9500,
    condoFee: 1650,
    iptu: 680,
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    state: 'SP',
    privateAddress: 'Rua Domingos de Morais (Endereço interno reservado)',
    usableArea: 152,
    totalArea: 230,
    bedrooms: 3,
    suites: 2,
    bathrooms: 3,
    parkingSpots: 2,
    description:
      'Unidade elegante de 152 m² com marcenaria sob medida em todos os cômodos. Localização estratégica na Zona Sul, próximo ao Parque Ibirapuera e aos melhores colégios da região. Excelente opção para moradia ou investimento seguro para locação de alto padrão.',
    features: [
      'Marcenaria de Luxo',
      'Varanda Gourmet com Churrasqueira',
      'Fechadura Biométrica',
      'Piscina com Raia de 25m',
      'Espaço Pet Place',
      'Coworking Equipado',
    ],
    status: 'pendente_confirmacao',
    isFeatured: true,
    isPublished: true,
    coverImage: livingPhoto,
    media: [
      { id: 'm5', url: livingPhoto, type: 'image', isCover: true, caption: 'Sala de jantar e estar integradas' },
    ],
    createdAt: '2026-11-08T09:15:00.000Z',
    updatedAt: '2026-11-12T08:00:00.000Z',
  },
  {
    id: 'prop-004',
    code: 'GAD-SBC-178',
    title: 'Edifício Residencial em São Bernardo do Campo - Região Nobre',
    slug: 'edificio-residencial-sao-bernardo-do-campo-178m2',
    type: 'Apartamento',
    transactionType: 'venda',
    price: 1820000,
    condoFee: 1400,
    iptu: 550,
    neighborhood: 'Jardim do Mar',
    city: 'São Bernardo do Campo',
    state: 'SP',
    privateAddress: 'Av. Kennedy (Endereço interno reservado)',
    usableArea: 178,
    totalArea: 260,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpots: 3,
    description:
      'Destaque no feed oficial de Gil Avila Daniel: apartamento de 178 m² em São Bernardo do Campo. Acabamentos nobres, varanda envidraçada ampla, facilidade de acesso à Rodovia Anchieta e aos principais centros gastronômicos do ABC.',
    features: [
      'Excelente Localização em São Bernardo',
      'Varanda Envidraçada',
      'Suíte Máster com Hidro',
      'Salão de Festas Climatizado',
      'Playground e Quadra Poliesportiva',
    ],
    status: 'pendente_confirmacao',
    isFeatured: false,
    isPublished: true,
    coverImage: facadePhoto,
    media: [
      { id: 'm6', url: facadePhoto, type: 'image', isCover: true, caption: 'Perspectiva noturna do empreendimento' },
    ],
    createdAt: '2026-11-09T16:00:00.000Z',
    updatedAt: '2026-11-12T08:00:00.000Z',
  },
];

export const INITIAL_DEVELOPMENTS: Development[] = [
  {
    id: 'dev-001',
    code: 'EMP-AURORA',
    name: 'Aurora Residencial Prime',
    slug: 'aurora-residencial-prime-zona-sul',
    neighborhood: 'Zona Sul de SP / São Bernardo do Campo',
    city: 'São Paulo',
    state: 'SP',
    status: 'pendente_confirmacao',
    minArea: 152,
    maxArea: 224,
    minBedrooms: 3,
    maxBedrooms: 4,
    unitsCount: 48,
    description:
      'Empreendimento de alto padrão com plantas versáteis de 152 a 224 m², refletindo os projetos modernos compartilhados nas redes de Gil Avila Daniel. Arquitetura autoral, hall com pé direito duplo e complexo de lazer completo integrado ao paisagismo exuberante.',
    features: [
      'Plantas de 152 m² a 224 m²',
      'Piscina Resort com Borda Infinita',
      'Espaço Gourmet com Churrasqueira e Forno de Pizza',
      'Fitness Center com Equipamentos High-Tech',
      'Segurança e Monitoramento Inteligente',
      'Tomadas para Carro Elétrico',
    ],
    coverImage: facadePhoto,
    media: [
      { id: 'dm1', url: facadePhoto, type: 'image', isCover: true, caption: 'Fachada monumental iluminada' },
      { id: 'dm2', url: livingPhoto, type: 'image', caption: 'Perspectiva interna da unidade decorada' },
    ],
    units: [
      { id: 'u1', type: 'Apartamento Tipo A', area: 152, bedrooms: 3, suites: 2, parkingSpots: 2, priceEstimate: 1950000 },
      { id: 'u2', type: 'Apartamento Tipo B', area: 186, bedrooms: 3, suites: 3, parkingSpots: 3, priceEstimate: 2680000 },
      { id: 'u3', type: 'Apartamento Master', area: 224, bedrooms: 4, suites: 3, parkingSpots: 4, priceEstimate: 3450000 },
    ],
    isFeatured: true,
    isPublished: true,
    expectedDelivery: 'Fase de Obras Avançadas / Conforme Tabela',
    createdAt: '2026-11-01T10:00:00.000Z',
    updatedAt: '2026-11-12T08:00:00.000Z',
  },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-001',
    fullName: 'Roberto Mendonça',
    phone: '(11) 98765-4321',
    email: 'roberto.mendonca@email.com',
    interestType: 'agendar_visita',
    propertyId: 'prop-001',
    propertyTitle: 'Apartamento de Alto Padrão com Varanda Gourmet Integrada (224 m²)',
    propertyCode: 'GAD-224',
    preferredDate: '2026-11-20',
    preferredTime: '15:00',
    message: 'Olá Gil! Gostaria de agendar uma visita para conhecer este apartamento de 224 m² no Campo Belo com minha esposa.',
    origin: 'imovel_detalhe',
    utmSource: 'instagram',
    utmCampaign: 'feed_novembro',
    status: 'novo',
    internalNotes: 'Cliente demonstrou forte interesse no Campo Belo. Ligar com antecedência.',
    createdAt: '2026-11-12T03:30:00.000Z',
  },
  {
    id: 'lead-002',
    fullName: 'Dra. Patrícia Albuquerque',
    phone: '(11) 99123-8877',
    email: 'patricia.albuquerque@clinica.com.br',
    interestType: 'comprar',
    propertyId: 'prop-002',
    propertyTitle: 'Residencial Contemporâneo com Vista Panorâmica (186 m²)',
    propertyCode: 'GAD-186',
    message: 'Tenho interesse em opções de 3 suítes na região do Brooklin/Chácara Flora.',
    origin: 'site_home',
    utmSource: 'whatsapp_click',
    status: 'em_atendimento',
    internalNotes: 'Enviada apresentação em PDF via WhatsApp.',
    createdAt: '2026-11-11T19:15:00.000Z',
  },
];

export const INITIAL_LANDING_PAGES: LandingPage[] = [
  {
    id: 'lp-001',
    title: 'Oportunidades de Alto Padrão na Zona Sul de SP',
    slug: 'alto-padrao-zona-sul-sp',
    headline: 'Descubra os Melhores Apartamentos de 152 a 224 m² na Zona Sul',
    subheadline:
      'Curadoria exclusiva de Gil Avila Daniel, corretor com mais de 20 anos de experiência e assessoria transparente.',
    propertyId: 'prop-001',
    coverImage: livingPhoto,
    media: [
      { id: 'lpm1', url: livingPhoto, type: 'image', isCover: true },
      { id: 'lpm2', url: facadePhoto, type: 'image' },
    ],
    ctaText: 'Falar Diretamente com Gil Avila Daniel no WhatsApp',
    customWhatsAppMessage:
      'Olá Gil! Acessei a página especial de Alto Padrão da Zona Sul e gostaria de consultar as opções de 152 a 224 m² disponíveis.',
    targetAudience: 'Campanhas de Instagram e Redes Sociais',
    isPublished: true,
    viewCount: 342,
    leadCount: 28,
    createdAt: '2026-11-02T12:00:00.000Z',
    updatedAt: '2026-11-12T08:00:00.000Z',
  },
];

// Local storage keys
const STORAGE_KEYS = {
  SETTINGS: 'gad_settings_v1',
  PROFILE: 'gad_profile_v1',
  PROPERTIES: 'gad_properties_v1',
  DEVELOPMENTS: 'gad_developments_v1',
  LEADS: 'gad_leads_v1',
  LANDING_PAGES: 'gad_landing_pages_v1',
  ANALYTICS: 'gad_analytics_v1',
  ADMIN_SESSION: 'gad_admin_session_v1',
};

// Storage helper functions
export function getStoredSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_SETTINGS;
}

export function saveStoredSettings(settings: SiteSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function getStoredProfile(): ProfessionalProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_PROFILE;
}

export function saveStoredProfile(profile: ProfessionalProfile): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

export function getStoredProperties(): Property[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_PROPERTIES;
}

export function saveStoredProperties(properties: Property[]): void {
  localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
}

export function getStoredDevelopments(): Development[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DEVELOPMENTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_DEVELOPMENTS;
}

export function saveStoredDevelopments(developments: Development[]): void {
  localStorage.setItem(STORAGE_KEYS.DEVELOPMENTS, JSON.stringify(developments));
}

export function getStoredLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_LEADS;
}

export function saveStoredLeads(leads: Lead[]): void {
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
}

export function addStoredLead(newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
  const currentLeads = getStoredLeads();
  const newLead: Lead = {
    ...newLeadData,
    id: 'lead-' + Date.now(),
    status: 'novo',
    createdAt: new Date().toISOString(),
  };
  const updated = [newLead, ...currentLeads];
  saveStoredLeads(updated);
  return newLead;
}

export function getStoredLandingPages(): LandingPage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LANDING_PAGES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_LANDING_PAGES;
}

export function saveStoredLandingPages(lps: LandingPage[]): void {
  localStorage.setItem(STORAGE_KEYS.LANDING_PAGES, JSON.stringify(lps));
}

export function recordAnalyticsEvent(
  eventType: AnalyticsEvent['eventType'],
  targetType?: AnalyticsEvent['targetType'],
  targetId?: string
): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    const event: AnalyticsEvent = {
      id: 'evt-' + Date.now(),
      eventType,
      targetType,
      targetId,
      timestamp: new Date().toISOString(),
    };
    events.push(event);
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(events.slice(-500)));
  } catch {}
}

export function getAnalyticsSummary(): {
  totalViews: number;
  whatsappClicks: number;
  leadsSubmitted: number;
  shareClicks: number;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    return {
      totalViews: events.filter((e) => e.eventType === 'page_view').length + 840,
      whatsappClicks: events.filter((e) => e.eventType === 'whatsapp_click').length + 128,
      leadsSubmitted: events.filter((e) => e.eventType === 'lead_submission').length + 32,
      shareClicks: events.filter((e) => e.eventType === 'share_click').length + 45,
    };
  } catch {
    return { totalViews: 840, whatsappClicks: 128, leadsSubmitted: 32, shareClicks: 45 };
  }
}
