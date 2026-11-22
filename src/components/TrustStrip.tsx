import React from 'react';
import { Sparkles, CheckCircle2, Leaf, Truck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const highlights = [
    {
      title: "Traditional Bilona Method",
      subtitle: "Authentic churning process",
      icon: Sparkles
    },
    {
      title: "Made from Curd",
      subtitle: "Traditional preparation for Ghee",
      icon: CheckCircle2
    },
    {
      title: "Natural Ingredients",
      subtitle: "Pure dairy without added chemicals",
      icon: Leaf
    },
    {
      title: "Home Delivery Available",
      subtitle: "Convenient doorstep delivery",
      icon: Truck
    }
  ];

  return (
    <section className="bg-[#174735] text-[#FFFDF8] py-8 border-y border-[#103629]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#103629] border border-[#C8A66B]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[#C8A66B]" />
                </div>
                <div>
                  <h3 className="font-serif-custom font-semibold text-sm sm:text-base text-[#FFFDF8] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F4EBDD]/75 mt-1 font-sans-custom">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
