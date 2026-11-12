import React, { useState } from 'react';
import { useApp, PublicPage } from '../../context/AppContext';
import { getGeneralWhatsAppLink } from '../../lib/whatsapp';
import {
  Building2,
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  Lock,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setSelectedPropertySlug,
    setSelectedDevelopmentSlug,
    setSelectedLpSlug,
    settings,
    trackEvent,
    isAdminLoggedIn,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page: PublicPage) => {
    setSelectedPropertySlug(null);
    setSelectedDevelopmentSlug(null);
    setSelectedLpSlug(null);
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'header');
    window.open(getGeneralWhatsAppLink(settings.siteName), '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Top micro-bar for credibility and direct WhatsApp */}
      <div className="bg-[#0a1926] text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Mais de 20 anos de experiência no mercado imobiliário
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Especialista em imóveis na Zona Sul de SP e região
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto text-xs">
            <a
              href={`https://instagram.com/daniel_corretor1`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @daniel_corretor1
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{settings.whatsappDisplay}</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
              title="Acesso ao Painel Administrativo"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Painel Admin (Ativo)' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Professional Name */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-4 text-left group focus:outline-hidden"
          >
            <img
              src="https://i.postimg.cc/x83sJZbr/Logo-imobiliario-luxuoso-Gil-Avila-Daniel.png"
              alt="Logo Gil Avila Daniel"
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-[#0a1926] leading-tight">
                Gil Avila Daniel
              </div>
              <div className="text-xs text-slate-600 font-medium tracking-wide uppercase flex items-center gap-1.5">
                <span>Corretor de Imóveis</span>
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span className="text-blue-700 font-semibold">Zona Sul - SP</span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600 bg-blue-50/70 font-semibold'
                  : 'text-slate-600 hover:text-[#0a1926] hover:bg-slate-50'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => navigateTo('comprar')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'comprar'
                  ? 'text-blue-600 bg-blue-50/70 font-semibold'
                  : 'text-slate-600 hover:text-[#0a1926] hover:bg-slate-50'
              }`}
            >
              Comprar
            </button>
            <button
              onClick={() => navigateTo('alugar')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'alugar'
                  ? 'text-blue-600 bg-blue-50/70 font-semibold'
                  : 'text-slate-600 hover:text-[#0a1926] hover:bg-slate-50'
              }`}
            >
              Alugar
            </button>
            <button
              onClick={() => navigateTo('empreendimentos')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'empreendimentos'
                  ? 'text-blue-600 bg-blue-50/70 font-semibold'
                  : 'text-slate-600 hover:text-[#0a1926] hover:bg-slate-50'
              }`}
            >
              Empreendimentos
            </button>
            <button
              onClick={() => navigateTo('sobre')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'sobre'
                  ? 'text-blue-600 bg-blue-50/70 font-semibold'
                  : 'text-slate-600 hover:text-[#0a1926] hover:bg-slate-50'
              }`}
            >
              Sobre o Corretor
            </button>
            <button
              onClick={() => navigateTo('contato')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 'contato'
                  ? 'text-blue-600 bg-blue-50/70 font-semibold'
                  : 'text-slate-600 hover:text-[#0a1926] hover:bg-slate-50'
              }`}
            >
              Contato
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0f2338] hover:bg-[#13304a] text-white text-sm font-medium shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Falar no WhatsApp</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <button
            onClick={() => navigateTo('home')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
              currentPage === 'home' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => navigateTo('comprar')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
              currentPage === 'comprar' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Comprar Imóvel
          </button>
          <button
            onClick={() => navigateTo('alugar')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
              currentPage === 'alugar' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Alugar Imóvel
          </button>
          <button
            onClick={() => navigateTo('empreendimentos')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
              currentPage === 'empreendimentos' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Empreendimentos
          </button>
          <button
            onClick={() => navigateTo('sobre')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
              currentPage === 'sobre' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Sobre Gil Avila Daniel
          </button>
          <button
            onClick={() => navigateTo('contato')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
              currentPage === 'contato' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Agendamento & Contato
          </button>
          <button
            onClick={() => navigateTo('admin')}
            className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-slate-500 hover:bg-slate-100 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" />
              Painel Administrativo
            </span>
            {isAdminLoggedIn && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">Logado</span>}
          </button>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-[#0f2338] text-white font-medium shadow-sm hover:bg-[#13304a]"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Chamar no WhatsApp (+55 11 97324-5981)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
