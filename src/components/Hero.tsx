import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { businessConfig } from '../data/business';

interface HeroProps {
  onOpenWhatsAppOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhatsAppOrder }) => {
  return (
    <section id="home" className="relative bg-[#F4EBDD] overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Subtle Gradient & Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#174735_1px,transparent_1px)] [background-size:16px_16px] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FFFDF8] border border-[#C8A66B]/30 px-4 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-[#C8A66B]" />
              <span className="text-xs font-semibold tracking-wider text-[#174735] uppercase">
                {businessConfig.hindiTagline} • Estd {businessConfig.estd}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-custom font-bold text-[#103629] leading-[1.15]">
              Freshness You Can Feel. <br />
              <span className="text-[#174735] italic">Quality You Can Trust.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#292D29]/80 max-w-2xl mx-auto lg:mx-0 font-sans-custom leading-relaxed">
              Discover the dairy favourites of <strong className="text-[#174735] font-semibold">Mom's Dairy</strong>, bringing together traditional Bilona method ghee, farm fresh cow milk, curd, lassi, paneer and ice cream for everyday family health and convenience.
            </p>

            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 bg-[#174735]/10 px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#174735]">
              <MapPin className="w-3.5 h-3.5 text-[#174735]" />
              <span>{businessConfig.address.booth}, {businessConfig.address.market}, {businessConfig.address.city}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#products"
                className="w-full sm:w-auto bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] px-8 py-3.5 rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group text-center"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={onOpenWhatsAppOrder}
                className="w-full sm:w-auto bg-[#FFFDF8] hover:bg-[#FFFDF8]/80 text-[#174735] border-2 border-[#174735] px-8 py-3.5 rounded-xl font-medium text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 text-center cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Quick Trust Points */}
            <div className="pt-6 border-t border-[#174735]/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-[#292D29]">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-[#174735]" />
                <span>Traditional Bilona Ghee</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-[#174735]" />
                <span>Made From Curd</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-[#174735]" />
                <span>Home Delivery Available</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#174735] to-[#C8A66B] rounded-3xl opacity-20 blur-lg"></div>

              {/* Main Image Container */}
              <div className="relative bg-[#FFFDF8] p-3 rounded-2xl shadow-2xl border border-[#C8A66B]/20">
                <img
                  src="https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=800&q=80"
                  alt="Mom's Dairy Traditional Cow Ghee Jar"
                  className="w-full h-80 sm:h-96 object-cover rounded-xl shadow-inner"
                />
                
                {/* Floating Badge Card */}
                <div className="absolute -bottom-6 -left-6 bg-[#103629] text-[#FFFDF8] p-4 rounded-xl shadow-xl border border-[#C8A66B]/40 hidden sm:block max-w-[220px]">
                  <p className="text-[11px] font-semibold text-[#C8A66B] uppercase tracking-wider">Signature Special</p>
                  <p className="font-serif-custom font-bold text-base mt-0.5">Cow Desi Ghee</p>
                  <p className="text-xs text-[#F4EBDD]/80 mt-1">Prepared using traditional Bilona method from curd.</p>
                </div>

                {/* Pamphlet Reference Floating Preview Thumbnail */}
                <div className="absolute -top-4 -right-4 bg-white p-2 rounded-xl shadow-lg border border-[#174735]/20 hidden sm:block w-24 h-28 transform rotate-3 hover:rotate-0 transition-transform">
                  <img 
                    src={businessConfig.pamphletImage} 
                    alt="Mom's Dairy Pamphlet" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <span className="text-[9px] font-bold text-center block text-[#174735] mt-1">Verified Leaflet</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
