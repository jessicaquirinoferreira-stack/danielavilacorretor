import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Building,
  Layers,
  Users,
  Compass,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'properties'
  | 'developments'
  | 'leads'
  | 'landingPages'
  | 'media'
  | 'settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  setCurrentTab: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  setCurrentTab,
  children,
}) => {
  const { logoutAdmin, setCurrentPage, leads, adminEmail } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newLeadsCount = leads.filter((l) => l.status === 'novo').length;

  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Visão Geral & Métricas', icon: LayoutDashboard },
    { id: 'properties' as AdminTab, label: 'Imóveis (CRUD)', icon: Building },
    { id: 'developments' as AdminTab, label: 'Empreendimentos', icon: Layers },
    { id: 'leads' as AdminTab, label: 'Leads & Visitas', icon: Users, badge: newLeadsCount > 0 ? newLeadsCount : undefined },
    { id: 'landingPages' as AdminTab, label: 'Landing Pages & Links', icon: Compass },
    { id: 'media' as AdminTab, label: 'Central de Mídia (Vercel Blob)', icon: ImageIcon },
    { id: 'settings' as AdminTab, label: 'Configurações do Site', icon: Settings },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setCurrentTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#07131e] text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">Gil Avila Daniel | Admin</span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#091522] text-slate-300 flex flex-col justify-between p-6 transform transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight leading-tight">
                Gil Avila Daniel
              </h2>
              <span className="text-[11px] text-blue-400 font-semibold tracking-wide uppercase">
                Painel do Corretor
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with User Profile and Site Preview */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Site Institucional</span>
          </button>

          <div className="flex items-center justify-between text-xs px-1">
            <div className="truncate max-w-[150px] text-slate-400" title={adminEmail}>
              {adminEmail}
            </div>
            <button
              onClick={logoutAdmin}
              className="text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
              title="Sair do painel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
};
