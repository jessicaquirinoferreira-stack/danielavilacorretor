import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Política de Privacidade e Proteção de Dados (LGPD)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Esta Política de Privacidade descreve como <strong>Gil Avila Daniel | Corretor de Imóveis</strong> coleta, armazena, utiliza e protege os dados pessoais fornecidos pelos visitantes e clientes deste site institucional, em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 - LGPD).
          </p>

          <h4 className="font-bold text-slate-900 text-sm">1. Coleta e Finalidade dos Dados</h4>
          <p>
            Coletamos apenas as informações estritamente necessárias fornecidas voluntariamente nos formulários de agendamento de visita e contato (Nome, Telefone/WhatsApp, E-mail, preferência de visita). A finalidade exclusiva é viabilizar o atendimento imobiliário personalizado com Gil Avila Daniel.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">2. Não Compartilhamento com Terceiros</h4>
          <p>
            Seus dados cadastrais jamais serão comercializados, cedidos ou compartilhados com terceiros para fins de mala direta ou marketing externo sem autorização prévia e expressa.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">3. Segurança dos Dados dos Imóveis e Endereços Privados</h4>
          <p>
            Por determinação de segurança pública e respeito aos proprietários dos imóveis, endereços exatos e documentações confidenciais não são exibidos publicamente no site e permanecem restritos ao sistema interno do corretor.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">4. Direitos do Titular</h4>
          <p>
            Você tem o direito de solicitar a confirmação da existência de tratamento, o acesso aos seus dados ou a exclusão imediata dos registros de contato através do WhatsApp oficial (+55 11 97324-5981).
          </p>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#0f2338] text-white text-xs font-semibold hover:bg-blue-900"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
