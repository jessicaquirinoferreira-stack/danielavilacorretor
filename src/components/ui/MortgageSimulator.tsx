import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, MessageCircle, DollarSign, TrendingUp, ShieldCheck } from 'lucide-react';
import { MagicCard } from './MagicCard';

interface MortgageSimulatorProps {
  initialPrice?: number;
}

export const MortgageSimulator: React.FC<MortgageSimulatorProps> = ({
  initialPrice = 2500000,
}) => {
  const { trackEvent } = useApp();

  const [propertyValue, setPropertyValue] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(30);
  const [annualRate, setAnnualRate] = useState<number>(10.5);

  const downPayment = (propertyValue * downPaymentPercent) / 100;
  const loanAmount = propertyValue - downPayment;

  // Monthly rate
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const totalMonths = termYears * 12;

  // Price table simulation: PMT = PV * (i * (1+i)^n) / ((1+i)^n - 1)
  const monthlyPaymentPrice =
    loanAmount > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  // Recommended minimum gross family income (installment max 30%)
  const minRecommendedIncome = monthlyPaymentPrice / 0.3;

  const handleSendSimulationWhatsApp = () => {
    trackEvent('whatsapp_click', 'mortgage_simulator');
    const fmt = (v: number) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

    const text = `Olá, Gil Avila Daniel! Realizei uma simulação de financiamento no seu site:
🏠 Valor do Imóvel: ${fmt(propertyValue)}
💰 Entrada (${downPaymentPercent}%): ${fmt(downPayment)}
🏦 Saldo Financiado: ${fmt(loanAmount)}
📅 Prazo: ${termYears} anos (${totalMonths} meses)
📈 Parcela Estimada: ~${fmt(monthlyPaymentPrice)}/mês

Gostaria de sua orientação técnica sobre as melhores taxas e condições bancárias para este perfil na Zona Sul de SP.`;

    window.open(`https://wa.me/5511973245981?text=${encodeURIComponent(text)}`, '_blank');
  };

  const fmtCurrency = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Planejamento Financeiro</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simulador de Financiamento Imobiliário
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Calcule parcelas estimadas, entrada e planeje a aquisição do seu imóvel de alto padrão com assessoria transparente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            {/* Valor do Imóvel */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Valor Estimado do Imóvel
                </label>
                <span className="text-base font-extrabold text-blue-700">
                  {fmtCurrency(propertyValue)}
                </span>
              </div>
              <input
                type="range"
                min={800000}
                max={15000000}
                step={100000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>R$ 800 mil</span>
                <span>R$ 15 milhões</span>
              </div>
            </div>

            {/* Entrada % */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Entrada ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-bold text-slate-800">
                  {fmtCurrency(downPayment)}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>10% (mínimo)</span>
                <span>60%</span>
              </div>
            </div>

            {/* Prazo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Prazo de Financiamento
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 20, 30].map((years) => (
                    <button
                      key={years}
                      type="button"
                      onClick={() => setTermYears(years)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                        termYears === years
                          ? 'bg-[#0f2338] text-white border-[#0f2338]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {years} anos
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Taxa Estimada (% a.a.)
                </label>
                <select
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-semibold text-slate-800"
                >
                  <option value={9.5}>9,5% a.a. (Taxa de Mercado Bonificada)</option>
                  <option value={10.5}>10,5% a.a. (Média dos Bancos Privados)</option>
                  <option value={11.5}>11,5% a.a. (Tabela Padrão)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Simulação meramente informativa sujeita a análise de crédito bancária.</span>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5">
            <MagicCard className="bg-[#091522] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  Resultado da Simulação
                </span>
                <h3 className="text-xl font-bold text-white">
                  Estrutura de Pagamento
                </h3>
              </div>

              <div className="space-y-4 py-4 border-y border-slate-800 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Valor da Entrada:</span>
                  <span className="font-bold text-white">{fmtCurrency(downPayment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Saldo a Financiar:</span>
                  <span className="font-bold text-white">{fmtCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Prazo:</span>
                  <span className="font-bold text-white">{termYears} anos ({totalMonths} parcelas)</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Primeira Parcela Estimada</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                  {fmtCurrency(monthlyPaymentPrice)}
                  <span className="text-xs text-slate-400 font-normal ml-1">/mês</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Renda familiar recomendada: a partir de {fmtCurrency(minRecommendedIncome)}
                </span>
              </div>

              <button
                onClick={handleSendSimulationWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar Gil Avila Daniel sobre Esta Simulação</span>
              </button>
            </MagicCard>
          </div>
        </div>
      </div>
    </section>
  );
};
