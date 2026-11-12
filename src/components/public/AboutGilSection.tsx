import React from 'react';
import { useApp } from '../../context/AppContext';
import { getGeneralWhatsAppLink } from '../../lib/whatsapp';
import {
  ShieldCheck,
  Award,
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  Compass,
} from 'lucide-react';
export const AboutGilSection: React.FC = () => {
  const { profile, settings, trackEvent } = useApp();

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'about_gil');
    window.open(getGeneralWhatsAppLink(profile.fullName), '_blank');
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Profile Photo Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Subtle Shadow and Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-blue-100 rounded-3xl -rotate-1 transform -z-10" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-square">
                <img
                  src="https://i.postimg.cc/5yDtzPcs/Retrato-profissional-de-homem-grisalho-em-camisa-azul.png"
                  alt="Gil Avila Daniel - Corretor de Imóveis especialista na Zona Sul de São Paulo"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0a1926]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white shadow-xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight">20+ Anos de Carreira</div>
                    <div className="text-xs text-slate-300">Dedicação contínua ao mercado imobiliário</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-7">
            {/* Super Header Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Perfil Profissional</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Gil Avila Daniel
            </h2>

            <div className="text-base sm:text-lg text-blue-800 font-semibold mb-6 flex flex-wrap items-center gap-2">
              <span>{profile.role}</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-slate-600 text-sm font-normal">
                CRECI: <strong className="text-slate-800 font-medium">{settings.creci}</strong>
              </span>
            </div>

            {/* Blockquote / Central Message */}
            <div className="p-5 rounded-2xl bg-slate-50 border-l-4 border-blue-600 mb-6 text-slate-700 italic text-base sm:text-lg leading-relaxed">
              &ldquo;{settings.institutionalText}&rdquo;
            </div>

            {/* Narrative */}
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              {profile.bio}
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Experiência Comprovada</span>
                </div>
                <p className="text-xs text-slate-600">
                  Mais de 2 décadas acompanhando o desenvolvimento urbanístico e valorização dos bairros nobres de SP.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Foco Zona Sul & Região</span>
                </div>
                <p className="text-xs text-slate-600">
                  Especialista em Moema, Campo Belo, Brooklin, Vila Mariana, Chácara Flora e São Bernardo do Campo.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Segurança e Discrição</span>
                </div>
                <p className="text-xs text-slate-600">
                  Assessoria completa em contratos, documentação cartorária e privacidade patrimonial.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Atendimento Pessoal</span>
                </div>
                <p className="text-xs text-slate-600">
                  Canal aberto direto no WhatsApp oficial, sem burocracias ou intermediários.
                </p>
              </div>
            </div>

            {/* Social Links and WhatsApp CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f2338] hover:bg-[#13304a] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Conversar com Gil no WhatsApp</span>
              </button>

              <a
                href="https://www.instagram.com/daniel_corretor1/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram @daniel_corretor1</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
