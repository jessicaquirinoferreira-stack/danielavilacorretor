import React from 'react';
import { useApp } from '../../context/AppContext';
import { getGeneralWhatsAppLink } from '../../lib/whatsapp';
import {
  Building2,
  Phone,
  MessageCircle,
  Instagram,
  ShieldCheck,
  Lock,
  ArrowUp,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyPolicy }) => {
  const { settings, profile, setCurrentPage, trackEvent, isAdminLoggedIn } = useApp();

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', 'footer');
    window.open(getGeneralWhatsAppLink(profile.fullName), '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07131e] text-slate-400 text-sm border-t border-slate-800">
      {/* Top Banner with Quick Contact */}
      <div className="bg-[#0b1b2b] py-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Procurando seu próximo imóvel na Zona Sul de SP?
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Fale diretamente com Gil Avila Daniel e receba consultoria personalizada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp: {settings.whatsappDisplay}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white tracking-tight">
                  Gil Avila Daniel
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  Corretor de Imóveis • Especialista Zona Sul – SP
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Mais de 20 anos conectando famílias e investidores ao imóvel ideal na Zona Sul de São Paulo e região. Atendimento ético, transparente e focado em segurança jurídica.
            </p>

            <div className="text-xs text-slate-300">
              <span>CRECI: </span>
              <strong className="text-white font-semibold">{settings.creci}</strong>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/daniel_corretor1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram @daniel_corretor1"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>
              <a
                href="https://threads.net/@daniel_corretor1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="Threads @daniel_corretor1"
              >
                @
              </a>
              <button
                onClick={handleWhatsApp}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp Oficial"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Column 2: Navegação */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-white transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('comprar')}
                  className="hover:text-white transition-colors"
                >
                  Imóveis à Venda
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('alugar')}
                  className="hover:text-white transition-colors"
                >
                  Imóveis para Locação
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('empreendimentos')}
                  className="hover:text-white transition-colors"
                >
                  Empreendimentos & Plantas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('sobre')}
                  className="hover:text-white transition-colors"
                >
                  Sobre Gil Avila Daniel
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('contato')}
                  className="hover:text-white transition-colors"
                >
                  Agendar Visita
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Bairros em Destaque */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Regiões Atendidas
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>Moema & Campo Belo</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>Brooklin & Chácara Flora</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>Vila Mariana & Ibirapuera</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>Santo Amaro & Granja Julieta</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>São Bernardo do Campo & ABC</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Segurança & Admin */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Segurança & Acesso
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-white transition-colors text-left"
                >
                  Política de Privacidade & LGPD
                </button>
              </li>
              <li>
                <span className="text-slate-500 block">Termos de Uso Institucional</span>
              </li>
              <li className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  <Lock className="w-3 h-3 text-blue-400" />
                  <span>{isAdminLoggedIn ? 'Painel Admin (Ativo)' : 'Painel Administrativo'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Disclaimer Box */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Aviso Legal & Confirmação de Disponibilidade:</strong> Os imóveis, perspectivas de projetos e valores exibidos possuem base nas publicações e referências de mercado de Gil Avila Daniel, constando como <em>pendentes de confirmação</em>. Valores, encargos condominiais e IPTU estão sujeitos a atualização periódica pelos proprietários ou incorporadoras sem aviso prévio. A confirmação de disponibilidade e condições vigentes deve ser solicitada diretamente via WhatsApp oficial antes da formulação de propostas formais.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Gil Avila Daniel | Corretor de Imóveis. Todos os direitos reservados.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
