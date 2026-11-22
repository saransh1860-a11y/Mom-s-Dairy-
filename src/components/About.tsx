import React from 'react';
import { businessConfig } from '../data/business';
import { Sparkles, MapPin, Award } from 'lucide-react';

interface AboutProps {
  onExploreProducts: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreProducts }) => {
  return (
    <section id="story" className="py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#F4EBDD] rounded-3xl transform -rotate-2"></div>
              
              <div className="relative bg-[#FFFDF8] p-3 rounded-2xl shadow-xl border border-[#C8A66B]/30">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80"
                  alt="Mom's Dairy Farm and Cattle"
                  className="w-full h-80 sm:h-96 object-cover rounded-xl"
                />

                <div className="absolute bottom-6 left-6 right-6 bg-[#103629]/90 backdrop-blur-md text-[#FFFDF8] p-4 rounded-xl border border-[#C8A66B]/30 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#174735] border border-[#C8A66B] flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#C8A66B]" />
                  </div>
                  <div>
                    <p className="font-serif-custom font-bold text-base text-[#FFFDF8]">Estd {businessConfig.estd} in Ambala</p>
                    <p className="text-xs text-[#F4EBDD]/80 mt-0.5">{businessConfig.address.booth}, {businessConfig.address.market}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-[#F4EBDD] px-4 py-1.5 rounded-full text-xs font-semibold text-[#174735] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A66B]" />
              <span>Our Brand Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-custom font-bold text-[#103629] leading-tight">
              A Dairy Brand Rooted in <span className="text-[#174735] italic">Tradition</span>
            </h2>

            <p className="text-base text-[#292D29]/80 font-sans-custom leading-relaxed">
              Mom's Dairy brings together a selection of dairy products for everyday needs. From cow milk and curd to traditional Bilona-method Desi Ghee, paneer, lassi and ice cream, discover our range of dairy favourites crafted with care.
            </p>

            <p className="text-sm text-[#292D29]/70 font-sans-custom leading-relaxed">
              Serving the community from our dedicated booth at Vatika City Central, Ambala City, we prioritize traditional preparation values, natural ingredients, and wholesome nutrition for every household.
            </p>

            {/* Address & Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F4EBDD] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#174735]" />
                </div>
                <div>
                  <h4 className="font-serif-custom font-bold text-sm text-[#103629]">Local Store Location</h4>
                  <p className="text-xs text-[#292D29]/70">{businessConfig.address.full}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={onExploreProducts}
                className="bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] px-8 py-3.5 rounded-xl font-medium text-sm shadow-md transition-all cursor-pointer"
              >
                Explore Product Collection
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
