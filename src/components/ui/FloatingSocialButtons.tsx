import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getGeneralWhatsAppLink } from '../../lib/whatsapp';

export const FloatingSocialButtons: React.FC = () => {
  const { settings, trackEvent } = useApp();
  const [hoveredBtn, setHoveredBtn] = useState<'whatsapp' | 'instagram' | null>(null);

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'floating_right_button');
    const url = getGeneralWhatsAppLink(settings.siteName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramClick = () => {
    trackEvent('share_click', 'instagram_floating');
    const instaHandle = (settings.instagram || '@daniel_corretor1').replace('@', '').trim();
    const instaUrl = `https://www.instagram.com/${instaHandle || 'daniel_corretor1'}/`;
    window.open(instaUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside
      aria-label="Canais de Contato Oficiais"
      className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Instagram Official Floating Button */}
      <div className="relative flex items-center group">
        {/* Tooltip / Label */}
        <div
          className={`hidden sm:flex items-center gap-1.5 mr-2.5 px-3 py-1.5 rounded-xl bg-[#091522]/90 backdrop-blur-md text-white text-xs font-semibold shadow-xl border border-white/10 transition-all duration-200 pointer-events-none ${
            hoveredBtn === 'instagram' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span>Instagram Oficial</span>
          <span className="text-pink-300 font-mono text-[11px]">@daniel_corretor1</span>
        </div>

        <button
          onClick={handleInstagramClick}
          onMouseEnter={() => setHoveredBtn('instagram')}
          onMouseLeave={() => setHoveredBtn(null)}
          className="relative w-13 h-13 rounded-full flex items-center justify-center text-white shadow-xl shadow-pink-950/30 transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-pink-400/50"
          style={{
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          }}
          title="Seguir Gil Avila Daniel no Instagram (@daniel_corretor1)"
          aria-label="Instagram Oficial @daniel_corretor1"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-pink-500/30 animate-ping pointer-events-none opacity-40" />

          {/* Official Instagram Camera Glyph */}
          <svg
            className="w-7 h-7 fill-white transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </button>
      </div>

      {/* WhatsApp Official Floating Button */}
      <div className="relative flex items-center group">
        {/* Tooltip / Label */}
        <div
          className={`hidden sm:flex items-center gap-1.5 mr-2.5 px-3 py-1.5 rounded-xl bg-[#091522]/90 backdrop-blur-md text-white text-xs font-semibold shadow-xl border border-white/10 transition-all duration-200 pointer-events-none ${
            hoveredBtn === 'whatsapp' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span>WhatsApp Oficial</span>
          <span className="text-emerald-400 font-mono text-[11px]">+55 11 97324-5981</span>
        </div>

        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setHoveredBtn('whatsapp')}
          onMouseLeave={() => setHoveredBtn(null)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-2xl shadow-emerald-950/40 transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
          title="Falar no WhatsApp com Gil Avila Daniel (+55 11 97324-5981)"
          aria-label="WhatsApp Oficial +55 11 97324-5981"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping pointer-events-none opacity-30" />

          {/* Official WhatsApp Glyph */}
          <svg
            className="w-8 h-8 fill-white transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.507 14.307l-.009.075c-.238.272-1.41 1.417-1.41 1.417s-.272.272-.734.204c-.463-.068-1.55-.49-2.924-1.714-1.373-1.224-2.203-2.61-2.407-3.018-.204-.408-.027-.612.163-.802.177-.177.38-.462.571-.693.19-.231.258-.394.394-.653.136-.258.068-.489-.034-.693-.102-.204-.918-2.21-1.258-3.026-.34-.816-.68-.707-.938-.72-.245-.014-.523-.014-.802-.014-.279 0-.734.102-1.122.523-.388.422-1.482 1.448-1.482 3.535 0 2.087 1.523 4.106 1.734 4.392.211.285 2.992 4.568 7.258 6.41 1.013.438 1.802.7 2.417.897 1.013.322 1.936.277 2.667.168.816-.122 2.509-1.026 2.862-2.019.354-.993.354-1.842.251-2.019-.102-.177-.374-.286-.788-.49zM12.04 2c-5.464 0-9.915 4.436-9.915 9.897 0 1.741.455 3.441 1.321 4.939l-1.405 5.127 5.267-1.378c1.442.787 3.072 1.209 4.732 1.209 5.464 0 9.914-4.436 9.914-9.897 0-5.461-4.45-9.897-9.914-9.897zm0 18.106c-1.486 0-2.943-.399-4.214-1.155l-.302-.18-3.134.82.837-3.05-.197-.315c-.83-1.322-1.269-2.861-1.269-4.429 0-4.524 3.693-8.204 8.279-8.204 4.585 0 8.278 3.68 8.278 8.204 0 4.524-3.693 8.204-8.279 8.204z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
