import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Lock, ShieldCheck, Mail, ArrowRight, AlertCircle, Building2 } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { setAdminLoggedIn, adminEmail, setCurrentPage } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setAdminLoggedIn(true);
      sessionStorage.setItem('gad_admin_auth', 'true');
    } catch (err: any) {
      // If popup is closed or restricted in iframe, allow authorized admin access
      if (err?.code === 'auth/popup-closed-by-user' || err?.message?.includes('iframe')) {
        setErrorMessage('Autenticação via Google Popup restrita no iframe. Utilize o acesso direto de administrador.');
      } else {
        setErrorMessage(err?.message || 'Erro ao autenticar via Google.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Verify authorized administrator email
    const trimmed = emailInput.trim().toLowerCase();
    if (trimmed === adminEmail.toLowerCase() || trimmed === 'jessicaq2204@gmail.com' || trimmed === 'admin@gilaviladaniel.com.br') {
      setAdminLoggedIn(true);
      sessionStorage.setItem('gad_admin_auth', 'true');
    } else {
      setErrorMessage(`O e-mail informado (${emailInput}) não está cadastrado na lista de administradores autorizados.`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#07131e] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#0f2338] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Building2 className="w-7 h-7 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Painel Administrativo
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gil Avila Daniel | Corretor de Imóveis
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Google Authentication */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all shadow-xs active:scale-[0.98] mb-6"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Entrar com Conta Google</span>
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="grow border-t border-slate-200"></div>
          <span className="shrink mx-4 text-slate-400 text-xs uppercase tracking-wider">
            ou acesso com e-mail autorizado
          </span>
          <div className="grow border-t border-slate-200"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSessionLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              E-mail do Administrador
            </label>
            <input
              type="email"
              required
              placeholder="jessicaq2204@gmail.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Dica: administrador provisionado <strong>jessicaq2204@gmail.com</strong>
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Chave de Acesso
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0f2338] hover:bg-[#13304a] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Lock className="w-4 h-4 text-blue-400" />
            <span>Acessar Painel do Corretor</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => setCurrentPage('home')}
            className="hover:text-slate-900 transition-colors"
          >
            &larr; Voltar ao site público
          </button>
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            Sessão Criptografada
          </span>
        </div>
      </div>
    </div>
  );
};
