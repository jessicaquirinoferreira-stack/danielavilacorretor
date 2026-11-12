import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Property,
  Development,
  Lead,
  LandingPage,
  SiteSettings,
  ProfessionalProfile,
  LeadStatus,
} from '../types';
import {
  getStoredSettings,
  saveStoredSettings,
  getStoredProfile,
  saveStoredProfile,
  getStoredProperties,
  saveStoredProperties,
  getStoredDevelopments,
  saveStoredDevelopments,
  getStoredLeads,
  saveStoredLeads,
  addStoredLead,
  getStoredLandingPages,
  saveStoredLandingPages,
  recordAnalyticsEvent,
  getAnalyticsSummary,
} from '../lib/storage';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

export type PublicPage =
  | 'home'
  | 'comprar'
  | 'alugar'
  | 'empreendimentos'
  | 'sobre'
  | 'contato'
  | 'imovel'
  | 'empreendimento'
  | 'lp'
  | 'admin';

export interface PropertyFilterState {
  searchQuery: string;
  transactionType: 'todos' | 'venda' | 'locacao';
  propertyType: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'todos';
  suites: number | 'todos';
  parkingSpots: number | 'todos';
  minArea: number;
  onlyFeatured: boolean;
  sortBy: 'recente' | 'menor_preco' | 'maior_preco' | 'maior_area';
}

export const INITIAL_FILTERS: PropertyFilterState = {
  searchQuery: '',
  transactionType: 'todos',
  propertyType: 'todos',
  neighborhood: 'todos',
  minPrice: 0,
  maxPrice: 15000000,
  bedrooms: 'todos',
  suites: 'todos',
  parkingSpots: 'todos',
  minArea: 0,
  onlyFeatured: false,
  sortBy: 'recente',
};

interface AppContextType {
  // Public Routing
  currentPage: PublicPage;
  setCurrentPage: (page: PublicPage) => void;
  selectedPropertySlug: string | null;
  setSelectedPropertySlug: (slug: string | null) => void;
  selectedDevelopmentSlug: string | null;
  setSelectedDevelopmentSlug: (slug: string | null) => void;
  selectedLpSlug: string | null;
  setSelectedLpSlug: (slug: string | null) => void;

  // Data
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
  profile: ProfessionalProfile;
  updateProfile: (newProfile: ProfessionalProfile) => Promise<void>;
  properties: Property[];
  developments: Development[];
  leads: Lead[];
  landingPages: LandingPage[];
  analytics: {
    totalViews: number;
    whatsappClicks: number;
    leadsSubmitted: number;
    shareClicks: number;
  };

  // Filters
  filters: PropertyFilterState;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilterState>>;
  resetFilters: () => void;

  // Property Actions
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Property>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  duplicateProperty: (id: string) => Promise<Property>;
  deleteProperty: (id: string) => Promise<void>;
  togglePropertyPublish: (id: string) => Promise<void>;
  togglePropertyFeatured: (id: string) => Promise<void>;

  // Development Actions
  addDevelopment: (dev: Omit<Development, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Development>;
  updateDevelopment: (id: string, dev: Partial<Development>) => Promise<void>;
  deleteDevelopment: (id: string) => Promise<void>;

  // Lead Actions
  submitLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<Lead>;
  updateLeadStatus: (id: string, status: LeadStatus, internalNotes?: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  // Landing Page Actions
  addLandingPage: (lp: Omit<LandingPage, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'leadCount'>) => Promise<LandingPage>;
  updateLandingPage: (id: string, lp: Partial<LandingPage>) => Promise<void>;
  deleteLandingPage: (id: string) => Promise<void>;

  // Analytics & Tracking
  trackEvent: (eventType: 'page_view' | 'whatsapp_click' | 'lead_submission' | 'share_click', targetType?: any, targetId?: string) => void;

  // Admin Auth
  currentUser: User | null;
  isAdminLoggedIn: boolean;
  setAdminLoggedIn: (val: boolean) => void;
  adminEmail: string;
  logoutAdmin: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PublicPage>('home');
  const [selectedPropertySlug, setSelectedPropertySlug] = useState<string | null>(null);
  const [selectedDevelopmentSlug, setSelectedDevelopmentSlug] = useState<string | null>(null);
  const [selectedLpSlug, setSelectedLpSlug] = useState<string | null>(null);

  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings());
  const [profile, setProfile] = useState<ProfessionalProfile>(getStoredProfile());
  const [properties, setProperties] = useState<Property[]>(getStoredProperties());
  const [developments, setDevelopments] = useState<Development[]>(getStoredDevelopments());
  const [leads, setLeads] = useState<Lead[]>(getStoredLeads());
  const [landingPages, setLandingPages] = useState<LandingPage[]>(getStoredLandingPages());
  const [analytics, setAnalytics] = useState(getAnalyticsSummary());

  const [filters, setFilters] = useState<PropertyFilterState>(INITIAL_FILTERS);

  // Admin State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('gad_admin_auth') === 'true';
  });
  const adminEmail = currentUser?.email || 'jessicaq2204@gmail.com';

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsAdminLoggedIn(true);
        sessionStorage.setItem('gad_admin_auth', 'true');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore if online
  useEffect(() => {
    let unsubProperties: (() => void) | undefined;
    let unsubLeads: (() => void) | undefined;

    try {
      unsubProperties = onSnapshot(
        collection(db, 'properties'),
        (snapshot) => {
          if (!snapshot.empty) {
            const items: Property[] = [];
            snapshot.forEach((d) => items.push(d.data() as Property));
            setProperties(items);
            saveStoredProperties(items);
          }
        },
        () => {
          // Fall back gracefully to local storage
        }
      );

      if (isAdminLoggedIn) {
        unsubLeads = onSnapshot(
          collection(db, 'leads'),
          (snapshot) => {
            if (!snapshot.empty) {
              const items: Lead[] = [];
              snapshot.forEach((d) => items.push(d.data() as Lead));
              setLeads(items);
              saveStoredLeads(items);
            }
          },
          () => {}
        );
      }
    } catch {
      // Handled silently
    }

    return () => {
      if (unsubProperties) unsubProperties();
      if (unsubLeads) unsubLeads();
    };
  }, [isAdminLoggedIn]);

  // Track page view
  useEffect(() => {
    recordAnalyticsEvent('page_view', 'header', currentPage);
    setAnalytics(getAnalyticsSummary());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedPropertySlug, selectedDevelopmentSlug, selectedLpSlug]);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const trackEvent = (
    eventType: 'page_view' | 'whatsapp_click' | 'lead_submission' | 'share_click',
    targetType?: any,
    targetId?: string
  ) => {
    recordAnalyticsEvent(eventType, targetType, targetId);
    setAnalytics(getAnalyticsSummary());
  };

  // Actions
  const updateSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
    try {
      await setDoc(doc(db, 'siteSettings', 'main'), newSettings);
    } catch {
      // Local sync is maintained
    }
  };

  const updateProfile = async (newProfile: ProfessionalProfile) => {
    setProfile(newProfile);
    saveStoredProfile(newProfile);
    try {
      await setDoc(doc(db, 'professionalProfile', 'gil_avila_daniel'), newProfile);
    } catch {
      // Local sync is maintained
    }
  };

  const addProperty = async (data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
    const id = 'prop-' + Date.now();
    const newProperty: Property = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newProperty, ...properties];
    setProperties(updated);
    saveStoredProperties(updated);

    try {
      await setDoc(doc(db, 'properties', id), newProperty);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `properties/${id}`);
    }

    return newProperty;
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    const updated = properties.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    setProperties(updated);
    saveStoredProperties(updated);

    try {
      const target = updated.find((p) => p.id === id);
      if (target) {
        await setDoc(doc(db, 'properties', id), target);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `properties/${id}`);
    }
  };

  const duplicateProperty = async (id: string): Promise<Property> => {
    const source = properties.find((p) => p.id === id);
    if (!source) throw new Error('Imóvel não encontrado');

    const newCode = `${source.code}-COPIA`;
    const newTitle = `${source.title} (Cópia)`;
    const newSlug = `${source.slug}-copia-${Date.now().toString().slice(-4)}`;

    return await addProperty({
      ...source,
      code: newCode,
      title: newTitle,
      slug: newSlug,
      isPublished: false,
    });
  };

  const deleteProperty = async (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    setProperties(updated);
    saveStoredProperties(updated);

    try {
      await deleteDoc(doc(db, 'properties', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `properties/${id}`);
    }
  };

  const togglePropertyPublish = async (id: string) => {
    const target = properties.find((p) => p.id === id);
    if (target) {
      await updateProperty(id, { isPublished: !target.isPublished });
    }
  };

  const togglePropertyFeatured = async (id: string) => {
    const target = properties.find((p) => p.id === id);
    if (target) {
      await updateProperty(id, { isFeatured: !target.isFeatured });
    }
  };

  // Developments
  const addDevelopment = async (data: Omit<Development, 'id' | 'createdAt' | 'updatedAt'>): Promise<Development> => {
    const id = 'dev-' + Date.now();
    const newDev: Development = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newDev, ...developments];
    setDevelopments(updated);
    saveStoredDevelopments(updated);

    try {
      await setDoc(doc(db, 'developments', id), newDev);
    } catch {
      // Local sync is maintained
    }

    return newDev;
  };

  const updateDevelopment = async (id: string, updates: Partial<Development>) => {
    const updated = developments.map((d) =>
      d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
    );
    setDevelopments(updated);
    saveStoredDevelopments(updated);

    try {
      const target = updated.find((d) => d.id === id);
      if (target) {
        await setDoc(doc(db, 'developments', id), target);
      }
    } catch {
      // Local sync is maintained
    }
  };

  const deleteDevelopment = async (id: string) => {
    const updated = developments.filter((d) => d.id !== id);
    setDevelopments(updated);
    saveStoredDevelopments(updated);

    try {
      await deleteDoc(doc(db, 'developments', id));
    } catch {
      // Local sync is maintained
    }
  };

  // Leads
  const submitLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
    const saved = addStoredLead(leadData);
    setLeads(getStoredLeads());
    trackEvent('lead_submission', 'property', leadData.propertyId);

    try {
      await setDoc(doc(db, 'leads', saved.id), saved);
    } catch {
      // Stored locally
    }

    return saved;
  };

  const updateLeadStatus = async (id: string, status: LeadStatus, internalNotes?: string) => {
    const updated = leads.map((l) =>
      l.id === id ? { ...l, status, internalNotes: internalNotes !== undefined ? internalNotes : l.internalNotes } : l
    );
    setLeads(updated);
    saveStoredLeads(updated);

    try {
      const target = updated.find((l) => l.id === id);
      if (target) {
        await setDoc(doc(db, 'leads', id), target);
      }
    } catch {
      // Stored locally
    }
  };

  const deleteLead = async (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    saveStoredLeads(updated);

    try {
      await deleteDoc(doc(db, 'leads', id));
    } catch {
      // Handled
    }
  };

  // Landing pages
  const addLandingPage = async (data: Omit<LandingPage, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'leadCount'>) => {
    const id = 'lp-' + Date.now();
    const newLp: LandingPage = {
      ...data,
      id,
      viewCount: 0,
      leadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newLp, ...landingPages];
    setLandingPages(updated);
    saveStoredLandingPages(updated);
    return newLp;
  };

  const updateLandingPage = async (id: string, updates: Partial<LandingPage>) => {
    const updated = landingPages.map((lp) =>
      lp.id === id ? { ...lp, ...updates, updatedAt: new Date().toISOString() } : lp
    );
    setLandingPages(updated);
    saveStoredLandingPages(updated);
  };

  const deleteLandingPage = async (id: string) => {
    const updated = landingPages.filter((lp) => lp.id !== id);
    setLandingPages(updated);
    saveStoredLandingPages(updated);
  };

  const logoutAdmin = async () => {
    try {
      await signOut(auth);
    } catch {}
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('gad_admin_auth');
    setCurrentPage('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedPropertySlug,
        setSelectedPropertySlug,
        selectedDevelopmentSlug,
        setSelectedDevelopmentSlug,
        selectedLpSlug,
        setSelectedLpSlug,
        settings,
        updateSettings,
        profile,
        updateProfile,
        properties,
        developments,
        leads,
        landingPages,
        analytics,
        filters,
        setFilters,
        resetFilters,
        addProperty,
        updateProperty,
        duplicateProperty,
        deleteProperty,
        togglePropertyPublish,
        togglePropertyFeatured,
        addDevelopment,
        updateDevelopment,
        deleteDevelopment,
        submitLead,
        updateLeadStatus,
        deleteLead,
        addLandingPage,
        updateLandingPage,
        deleteLandingPage,
        trackEvent,
        currentUser,
        isAdminLoggedIn,
        setAdminLoggedIn: setIsAdminLoggedIn,
        adminEmail,
        logoutAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
