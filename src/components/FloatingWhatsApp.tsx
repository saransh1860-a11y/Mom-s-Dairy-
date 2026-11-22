import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40">
      <a
        href={generateGeneralWhatsAppUrl("Namaste Mom's Dairy! I am visiting your website and would like to enquire about your dairy products.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#22bf5b] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-white text-[#25D366]" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-[#103629] text-[#FFFDF8] text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
