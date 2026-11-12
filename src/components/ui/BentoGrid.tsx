import React from 'react';
import { cn } from '../../lib/utils';
import { MagicCard } from './MagicCard';
import {
  ShieldCheck,
  Compass,
  Building2,
  Award,
  MessageCircle,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import facadePhoto from '../../assets/images/modern_building_facade_1794489137249.jpg';
import livingPhoto from '../../assets/images/luxury_apartment_living_1794489150257.jpg';

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Diferenciais Exclusivos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Por Que Escolher Gil Avila Daniel
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Uma abordagem séria, refinada e consultiva para quem busca imóveis de alto padrão na Zona Sul de SP.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: 20+ Anos de Trajetória (Spans 2 cols) */}
          <MagicCard className="md:col-span-2 p-8 flex flex-col justify-between shadow-xs hover:shadow-lg border-slate-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Tradição & Experiência
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">
                Mais de 20 Anos de Atuação no Mercado Imobiliário
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Duas décadas dedicadas à análise de mercado, negociações seguras e intermediação de imóveis de alto padrão na capital paulista e no ABC. Solidez que proporciona tranquilidade em cada assinatura.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span>✓ Negociações assertivas</span>
              <span>✓ Avaliações precisas</span>
            </div>
          </MagicCard>

          {/* Card 2: Plantas de 152 a 224 m² (Image + Overlay) */}
          <MagicCard className="relative md:col-span-1 p-0 overflow-hidden group shadow-xs hover:shadow-lg border-slate-200">
            <img
              src={livingPhoto}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1926] via-[#0a1926]/60 to-transparent" />
            <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white min-h-[260px]">
              <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
                <Maximize2 className="w-5 h-5 text-blue-300" />
              </div>
              <h4 className="text-lg font-bold">Plantas de 152 a 224 m²</h4>
              <p className="text-xs text-slate-300 mt-1">
                Varandas gourmet, suítes máster e espaços amplos pensados para o bem-estar familiar.
              </p>
            </div>
          </MagicCard>

          {/* Card 3: Especialista Zona Sul */}
          <MagicCard className="md:col-span-1 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg border-slate-200">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-blue-400 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Localização
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                Especialista na Zona Sul - SP
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Domínio dos principais condomínios e vias de Moema, Campo Belo, Brooklin, Vila Mariana e Chácara Flora.
              </p>
            </div>
            <div className="text-[11px] text-blue-600 font-semibold mt-4">
              + São Bernardo do Campo e ABC
            </div>
          </MagicCard>

          {/* Card 4: Fachadas Contemporâneas */}
          <MagicCard className="relative md:col-span-1 p-0 overflow-hidden group shadow-xs hover:shadow-lg border-slate-200">
            <img
              src={facadePhoto}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1926] via-[#0a1926]/60 to-transparent" />
            <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white min-h-[260px]">
              <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5 text-sky-300" />
              </div>
              <h4 className="text-lg font-bold">Edifícios Modernos</h4>
              <p className="text-xs text-slate-300 mt-1">
                Arquitetura icônica, sustentabilidade, lazer resort e segurança patrimonial avançada.
              </p>
            </div>
          </MagicCard>

          {/* Card 5: Atendimento WhatsApp Direto (Spans 2 cols) */}
          <MagicCard className="md:col-span-2 p-8 flex flex-col justify-between shadow-xs hover:shadow-lg border-slate-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-6 shadow-xs">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Atendimento Pessoal
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">
                Canal Aberto Diretamente com o Corretor
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Você conversa pessoalmente com Gil Avila Daniel. Sem intermediários comerciais, robôs invasivos ou ligações inoportunas. Respostas rápidas e transparentes no WhatsApp oficial (+55 11 97324-5981).
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">wa.me/5511973245981</span>
              <span className="text-emerald-700 font-bold">Disponível para consultas</span>
            </div>
          </MagicCard>

          {/* Card 6: Segurança Jurídica */}
          <MagicCard className="md:col-span-1 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg border-slate-200">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Segurança
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                Conformidade Jurídica & LGPD
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Análise documental detalhada, sigilo de dados privados e respaldo em todas as etapas contratuais.
              </p>
            </div>
            <div className="text-[11px] text-slate-400 mt-4">
              Transparência garantida
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
};
