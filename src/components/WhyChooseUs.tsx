import React from 'react';
import { Sparkles, Layers, MapPin, Truck } from 'lucide-react';
import { businessConfig } from '../data/business';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      title: "Traditional Approach",
      description: "Highlighting the advertised Bilona preparation method from curd for our signature Desi Ghee.",
      icon: Sparkles
    },
    {
      title: "Dairy Variety",
      description: "Showcasing six advertised product categories: Cow Milk, Desi Ghee, Curd, Lassi, Paneer, and Ice Cream.",
      icon: Layers
    },
    {
      title: "Local Accessibility",
      description: `Conveniently located at ${businessConfig.address.booth}, ${businessConfig.address.market}, ${businessConfig.address.city}.`,
      icon: MapPin
    },
    {
      title: "Home Delivery",
      description: "Home delivery available for added convenience to your doorstep upon enquiry and confirmation.",
      icon: Truck
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-[#F4EBDD]/50 border-t border-[#F4EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FFFDF8] border border-[#C8A66B]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#174735] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A66B]" />
            <span>The Mom's Dairy Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-bold text-[#103629]">
            Why Choose Mom's Dairy
          </h2>
          <p className="text-base text-[#292D29]/75 font-sans-custom mt-3">
            Built on trust, traditional methods, and everyday convenience for families in Ambala City.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#FFFDF8] p-8 rounded-2xl shadow-md border border-[#C8A66B]/20 hover:shadow-xl hover:border-[#C8A66B] transition-all duration-300 flex flex-col group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#174735] text-[#C8A66B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-serif-custom font-bold text-xl text-[#103629] mb-3">
                  {card.title}
                </h3>

                <p className="text-sm text-[#292D29]/75 font-sans-custom leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
