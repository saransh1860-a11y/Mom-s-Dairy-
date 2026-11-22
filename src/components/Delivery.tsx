import React from 'react';
import { Truck, MessageCircle, Phone, MapPin } from 'lucide-react';
import { businessConfig } from '../data/business';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export const Delivery: React.FC = () => {
  return (
    <section className="py-20 bg-[#F4EBDD] border-y border-[#C8A66B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#C8A66B]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#174735]/10 px-4 py-1.5 rounded-full text-xs font-semibold text-[#174735] uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#174735]" />
              <span>Doorstep Convenience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-custom font-bold text-[#103629]">
              Your Dairy Favourites, Closer to Home.
            </h2>

            <p className="text-base text-[#292D29]/80 font-sans-custom leading-relaxed">
              {businessConfig.deliveryNote}
            </p>

            <div className="flex items-center gap-2 text-xs text-[#292D29]/70 pt-2">
              <MapPin className="w-4 h-4 text-[#174735]" />
              <span>Serving Ambala City from Vatika City Central. Contact us to verify delivery timings.</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <a
              href={generateGeneralWhatsAppUrl("Namaste Mom's Dairy! Please confirm home delivery availability for my location in Ambala City.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] py-4 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-3 shadow-md transition-all text-center"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
              <span>Enquire Delivery on WhatsApp</span>
            </a>

            <a
              href={`tel:${businessConfig.phones.primary}`}
              className="bg-[#F4EBDD] hover:bg-[#F4EBDD]/80 text-[#174735] py-4 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-3 border border-[#C8A66B]/30 transition-all text-center"
            >
              <Phone className="w-5 h-5 text-[#174735]" />
              <span>Call {businessConfig.phones.displayPrimary}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
