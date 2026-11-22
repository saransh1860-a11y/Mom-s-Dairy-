import React from 'react';
import { businessConfig } from '../data/business';
import { MessageCircle, Phone, MapPin, Sparkles } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#103629] text-[#FFFDF8] pt-16 pb-12 border-t border-[#174735]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#174735]">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C8A66B] bg-white p-0.5">
                <img 
                  src={businessConfig.logo} 
                  alt="Mom's Dairy Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif-custom text-2xl font-bold tracking-tight text-[#FFFDF8] block leading-none">
                  {businessConfig.name}
                </span>
                <span className="text-[11px] font-sans text-[#C8A66B] tracking-wider uppercase block mt-1">
                  {businessConfig.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#F4EBDD]/80 font-sans-custom leading-relaxed">
              Mom's Dairy brings traditional Bilona method desi ghee, farm fresh cow milk, curd, lassi, paneer and ice cream to your doorstep in Ambala City.
            </p>

            <div className="pt-2">
              <a
                href={generateGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#174735] hover:bg-[#174735]/80 text-[#FFFDF8] px-4 py-2.5 rounded-xl font-medium text-xs border border-[#C8A66B]/30 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-custom font-bold text-base text-[#C8A66B] tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-[#F4EBDD]/80">
              <li><a href="#home" className="hover:text-[#C8A66B] transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-[#C8A66B] transition-colors">Our Products</a></li>
              <li><a href="#bilona-ghee" className="hover:text-[#C8A66B] transition-colors">Bilona Ghee</a></li>
              <li><a href="#story" className="hover:text-[#C8A66B] transition-colors">Our Story</a></li>
              <li><a href="#why-us" className="hover:text-[#C8A66B] transition-colors">Why Mom's Dairy</a></li>
              <li><a href="#contact" className="hover:text-[#C8A66B] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-custom font-bold text-base text-[#C8A66B] tracking-wide">Dairy Collection</h4>
            <ul className="space-y-2.5 text-sm text-[#F4EBDD]/80">
              <li><a href="#products" className="hover:text-[#C8A66B] transition-colors">Cow Desi Ghee (Bilona)</a></li>
              <li><a href="#products" className="hover:text-[#C8A66B] transition-colors">Pure Cow Milk</a></li>
              <li><a href="#products" className="hover:text-[#C8A66B] transition-colors">Fresh Curd (Dahi)</a></li>
              <li><a href="#products" className="hover:text-[#C8A66B] transition-colors">Traditional Lassi</a></li>
              <li><a href="#products" className="hover:text-[#C8A66B] transition-colors">Fresh Malai Paneer</a></li>
              <li><a href="#products" className="hover:text-[#C8A66B] transition-colors">Dairy Ice Cream</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-custom font-bold text-base text-[#C8A66B] tracking-wide">Store & Contact</h4>
            <div className="space-y-3 text-sm text-[#F4EBDD]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8A66B] flex-shrink-0 mt-0.5" />
                <span>{businessConfig.address.full}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A66B] flex-shrink-0" />
                <a href={`tel:${businessConfig.phones.primary}`} className="hover:text-[#C8A66B] transition-colors">{businessConfig.phones.displayPrimary}</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A66B] flex-shrink-0" />
                <a href={`tel:${businessConfig.phones.secondary}`} className="hover:text-[#C8A66B] transition-colors">{businessConfig.phones.displaySecondary}</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F4EBDD]/60 gap-4">
          <p>© 2026 Mom's Dairy. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A66B]" />
            <span>Khayal Rakhe Jo Maa Jaisa</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
