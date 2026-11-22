import React from 'react';
import { Search, CheckSquare, MessageCircle, ArrowRight } from 'lucide-react';

interface HowToOrderProps {
  onOpenWhatsAppOrder: () => void;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ onOpenWhatsAppOrder }) => {
  const steps = [
    {
      step: "01",
      title: "Explore Products",
      description: "Browse our wholesome collection of cow milk, traditional Bilona ghee, curd, lassi, paneer and ice cream.",
      icon: Search
    },
    {
      step: "02",
      title: "Select Product & Quantity",
      description: "Choose your preferred item, packaging size, and mention your delivery location details.",
      icon: CheckSquare
    },
    {
      step: "03",
      title: "Send Enquiry on WhatsApp",
      description: "Click to generate a structured WhatsApp message directly to our store for confirmation and delivery.",
      icon: MessageCircle
    }
  ];

  return (
    <section className="py-20 bg-[#174735] text-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#C8A66B] uppercase tracking-wider block mb-2">
            Simple & Transparent Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-bold text-[#FFFDF8]">
            How to Order From Mom's Dairy
          </h2>
          <p className="text-base text-[#F4EBDD]/80 font-sans-custom mt-3">
            Connecting directly with your local dairy store in Ambala City takes just three easy steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#103629] p-8 rounded-2xl border border-[#C8A66B]/30 relative flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-serif-custom font-bold text-[#C8A66B]">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#174735] border border-[#C8A66B]/40 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#C8A66B]" />
                    </div>
                  </div>

                  <h3 className="font-serif-custom font-bold text-xl text-[#FFFDF8] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#F4EBDD]/80 font-sans-custom leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={onOpenWhatsAppOrder}
            className="bg-[#C8A66B] hover:bg-[#b8955a] text-[#103629] px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#103629] fill-[#103629]" />
            <span>Start Your Order on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
