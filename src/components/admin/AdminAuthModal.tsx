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

  const handleSessionLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import('firebase/auth');
      
      // Try to sign in
      try {
        await signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
      } catch (signInErr: any) {
        // If not found, try to create the account as requested
        if (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential') {
          // Check for authorized admin email
          if (emailInput.trim().toLowerCase() === 'admin@x.com' && passwordInput === 'admin4321') {
            await createUserWithEmailAndPassword(auth, 'admin@x.com', 'admin4321');
          } else {
            throw new Error('E-mail ou senha inválidos.');
          }
        } else {
          throw signInErr;
        }
      }

      setAdminLoggedIn(true);
      sessionStorage.setItem('gad_admin_auth', 'true');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erro ao realizar login.');
    } finally {
      setIsLoading(false);
    }
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

        {/* Form */}
        <form onSubmit={handleSessionLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              E-mail do Administrador
            </label>
            <input
              type="email"
              required
              placeholder="admin@x.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Chave de Acesso
            </label>
            <input
              type="password"
              required
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
