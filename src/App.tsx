import React, { useState } from 'react';
import { AppProvider, useApp, PublicPage } from './context/AppContext';
import { Header } from './components/public/Header';
import { Hero } from './components/public/Hero';
import { FeaturedProperties } from './components/public/FeaturedProperties';
import { DevelopmentsSection } from './components/public/DevelopmentsSection';
import { AboutGilSection } from './components/public/AboutGilSection';
import { VisitSchedulerSection } from './components/public/VisitSchedulerSection';
import { PropertyDetailPage } from './components/public/PropertyDetailPage';
import { DevelopmentDetailPage } from './components/public/DevelopmentDetailPage';
import { LandingPageView } from './components/public/LandingPageView';
import { CatalogPage } from './components/public/CatalogPage';
import { BentoGrid } from './components/ui/BentoGrid';
import { NeighborhoodExplorer } from './components/ui/NeighborhoodExplorer';
import { MortgageSimulator } from './components/ui/MortgageSimulator';
import { AiConciergeDrawer } from './components/ui/AiConciergeDrawer';
import { FloatingSocialButtons } from './components/ui/FloatingSocialButtons';
import { Footer } from './components/public/Footer';
import { CookieBanner } from './components/public/CookieBanner';
import { PrivacyPolicyModal } from './components/public/PrivacyPolicyModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminPropertiesList } from './components/admin/AdminPropertiesList';
import { AdminDevelopments } from './components/admin/AdminDevelopments';
import { AdminLeadsList } from './components/admin/AdminLeadsList';
import { AdminLandingPages } from './components/admin/AdminLandingPages';
import { AdminMediaManager } from './components/admin/AdminMediaManager';
import { AdminSiteSettings } from './components/admin/AdminSiteSettings';
const MainAppContent: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    isAdminLoggedIn,
    trackEvent,
    settings,
  } = useApp();

  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Admin routing
  if (currentPage === 'admin') {
    if (!isAdminLoggedIn) {
      return <AdminAuthModal />;
    }

    return (
      <AdminLayout currentTab={adminTab} setCurrentTab={setAdminTab}>
        {adminTab === 'dashboard' && (
          <AdminDashboard
            onNavigateTab={(tab) => setAdminTab(tab)}
            onOpenCreateProperty={() => setAdminTab('properties')}
          />
        )}
        {adminTab === 'properties' && <AdminPropertiesList />}
        {adminTab === 'developments' && <AdminDevelopments />}
        {adminTab === 'leads' && <AdminLeadsList />}
        {adminTab === 'landingPages' && <AdminLandingPages />}
        {adminTab === 'media' && <AdminMediaManager />}
        {adminTab === 'settings' && <AdminSiteSettings />}
      </AdminLayout>
    );
  }

  // Standalone Landing Page View
  if (currentPage === 'lp') {
    return (
      <>
        <LandingPageView />
        <Footer onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)} />
        <CookieBanner onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)} />
        <PrivacyPolicyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
        <AiConciergeDrawer />
        <FloatingSocialButtons />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Home Page */}
        {currentPage === 'home' && (
          <>
            <Hero />
            <FeaturedProperties />
            <DevelopmentsSection />
            <BentoGrid />
            <NeighborhoodExplorer />
            <MortgageSimulator />
            <AboutGilSection />
            <div id="agendamento-home" className="rounded-3xl overflow-hidden my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <VisitSchedulerSection />
            </div>
          </>
        )}

        {/* Comprar Page */}
        {currentPage === 'comprar' && (
          <>
            <CatalogPage forcedTransactionType="venda" />
            <MortgageSimulator />
            <NeighborhoodExplorer />
          </>
        )}

        {/* Alugar Page */}
        {currentPage === 'alugar' && (
          <>
            <CatalogPage forcedTransactionType="locacao" />
            <NeighborhoodExplorer />
          </>
        )}

        {/* Empreendimentos Page */}
        {currentPage === 'empreendimentos' && (
          <div className="bg-slate-50 min-h-screen py-10">
            <DevelopmentsSection />
            <NeighborhoodExplorer />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <VisitSchedulerSection />
            </div>
          </div>
        )}

        {/* Sobre o Corretor Page */}
        {currentPage === 'sobre' && (
          <div className="bg-white min-h-screen">
            <AboutGilSection />
            <BentoGrid />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <VisitSchedulerSection />
            </div>
          </div>
        )}

        {/* Contato & Agendamento Page */}
        {currentPage === 'contato' && (
          <div className="bg-[#0a1926] min-h-screen py-12">
            <VisitSchedulerSection />
          </div>
        )}

        {/* Detalhes de Imóvel */}
        {currentPage === 'imovel' && (
          <>
            <PropertyDetailPage />
            <MortgageSimulator />
          </>
        )}

        {/* Detalhes de Empreendimento */}
        {currentPage === 'empreendimento' && <DevelopmentDetailPage />}
      </main>

      <Footer onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)} />

      {/* Floating Sofia Consultora (Left Side) */}
      <AiConciergeDrawer />

      {/* Floating Official Social Buttons: WhatsApp & Instagram (Right Side) */}
      <FloatingSocialButtons />

      <CookieBanner onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)} />
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
