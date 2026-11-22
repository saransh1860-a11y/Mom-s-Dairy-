import React from 'react';
import { MessageCircle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Product } from '../data/products';

interface FeaturedGheeProps {
  products: Product[];
  onWhatsAppOrder: (product: any) => void;
  onViewDetails: (product: any) => void;
}

export const FeaturedGhee: React.FC<FeaturedGheeProps> = ({ products, onWhatsAppOrder, onViewDetails }) => {
  const gheeProduct = products.find(p => p.id === 'cow-desi-ghee' || p.category === 'Ghee & Fats') || products[0];

  return (
    <section id="bilona-ghee" className="py-24 bg-[#F4EBDD] relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#C8A66B]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#174735]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Image / Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 bg-[#C8A66B] rounded-3xl transform rotate-3 opacity-30"></div>

              <div className="relative bg-[#FFFDF8] p-4 rounded-3xl shadow-2xl border-2 border-[#C8A66B]">
                <img
                  src={gheeProduct?.image || "https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=800&q=80"}
                  alt={gheeProduct?.name || "Mom's Dairy Cow Desi Ghee"}
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-inner"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <div className="absolute top-6 right-6 bg-[#103629] text-[#C8A66B] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border border-[#C8A66B]/40">
                  {gheeProduct?.badge || "Signature Bilona Ghee"}
                </div>

                <div className="mt-4 p-4 bg-[#F4EBDD]/60 rounded-2xl border border-[#C8A66B]/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#292D29]/75 block font-medium">Authentic Preparation</span>
                    <span className="font-serif-custom font-bold text-[#103629] text-base">{gheeProduct?.name || "Cow Desi Ghee"}</span>
                  </div>
                  <span className="text-xs bg-[#174735] text-[#FFFDF8] px-3 py-1 rounded-full font-semibold">100% Pure</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-[#FFFDF8] border border-[#C8A66B]/40 px-4 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-[#C8A66B]" />
              <span className="text-xs font-semibold tracking-wider text-[#174735] uppercase">
                Traditional Heritage Process
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-custom font-bold text-[#103629] leading-tight">
              The Tradition of <span className="text-[#174735] italic">Bilona Ghee</span>
            </h2>

            <p className="text-base sm:text-lg text-[#292D29]/80 font-sans-custom leading-relaxed">
              {gheeProduct?.fullDesc || "Discover Mom's Dairy Cow Desi Ghee, advertised as being prepared using the traditional Bilona method from curd. Unlike commercial direct cream churning, our authentic process preserves natural goodness, rich golden aroma, and deep traditional nutrition."}
            </p>

            {/* Three feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#FFFDF8] p-4 rounded-2xl border border-[#C8A66B]/30 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-[#174735] mb-2" />
                <h3 className="font-serif-custom font-bold text-base text-[#103629]">Bilona Method</h3>
                <p className="text-xs text-[#292D29]/70 mt-1">Slow churning process from curd.</p>
              </div>

              <div className="bg-[#FFFDF8] p-4 rounded-2xl border border-[#C8A66B]/30 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-[#174735] mb-2" />
                <h3 className="font-serif-custom font-bold text-base text-[#103629]">Made from Curd</h3>
                <p className="text-xs text-[#292D29]/70 mt-1">Traditional Vedic ghee preparation.</p>
              </div>

              <div className="bg-[#FFFDF8] p-4 rounded-2xl border border-[#C8A66B]/30 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-[#174735] mb-2" />
                <h3 className="font-serif-custom font-bold text-base text-[#103629]">Natural Ingredients</h3>
                <p className="text-xs text-[#292D29]/70 mt-1">No added chemicals or colors.</p>
              </div>
            </div>

            {/* Disclaimer notice */}
            <div className="flex items-start gap-2 text-xs text-[#292D29]/70 bg-[#FFFDF8]/75 p-3.5 rounded-xl border border-[#C8A66B]/20">
              <ShieldAlert className="w-4 h-4 text-[#C8A66B] flex-shrink-0 mt-0.5" />
              <span>Based on business-provided advertising claims. Handcrafted with care for your household.</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              {gheeProduct && (
                <button
                  onClick={() => onWhatsAppOrder(gheeProduct)}
                  className="w-full sm:w-auto bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] px-8 py-3.5 rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                  <span>Enquire About Desi Ghee</span>
                </button>
              )}

              {gheeProduct && (
                <button
                  onClick={() => onViewDetails(gheeProduct)}
                  className="w-full sm:w-auto bg-[#FFFDF8] hover:bg-[#FFFDF8]/80 text-[#174735] border border-[#174735]/30 px-8 py-3.5 rounded-xl font-medium text-base transition-colors text-center cursor-pointer"
                >
                  View Ghee Specifications
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
