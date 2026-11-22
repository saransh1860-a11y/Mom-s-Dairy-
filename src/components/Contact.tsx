import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { businessConfig } from '../data/business';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Namaste Mom's Dairy!\n\nEnquiry from Website:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Address: ${formData.address}\n• Message: ${formData.message}`;
    const url = `https://wa.me/${businessConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#C8A66B] uppercase tracking-wider block mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-bold text-[#103629]">
            Visit or Contact Mom's Dairy
          </h2>
          <p className="text-base text-[#292D29]/75 font-sans-custom mt-3">
            We are here to answer your enquiries and fulfill your daily dairy requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info & Address */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-[#F4EBDD] p-8 rounded-3xl border border-[#C8A66B]/30 shadow-md space-y-6">
              
              <div>
                <span className="text-xs font-bold text-[#C8A66B] uppercase tracking-wider block mb-1">Store Address</span>
                <h3 className="font-serif-custom font-bold text-2xl text-[#103629]">
                  {businessConfig.name}
                </h3>
                <p className="text-sm text-[#292D29]/80 font-sans-custom mt-2 leading-relaxed">
                  {businessConfig.address.full}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C8A66B]/30 space-y-4">
                <span className="text-xs font-bold text-[#C8A66B] uppercase tracking-wider block">Contact Numbers</span>
                
                <a 
                  href={`tel:${businessConfig.phones.primary}`}
                  className="flex items-center gap-3 text-sm font-medium text-[#174735] hover:text-[#103629] bg-[#FFFDF8] p-3.5 rounded-xl border border-[#C8A66B]/20 shadow-sm transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#C8A66B]" />
                  <span>{businessConfig.phones.displayPrimary} (Primary)</span>
                </a>

                <a 
                  href={`tel:${businessConfig.phones.secondary}`}
                  className="flex items-center gap-3 text-sm font-medium text-[#174735] hover:text-[#103629] bg-[#FFFDF8] p-3.5 rounded-xl border border-[#C8A66B]/20 shadow-sm transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#C8A66B]" />
                  <span>{businessConfig.phones.displaySecondary} (Secondary)</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#C8A66B]/30">
                <span className="text-xs font-bold text-[#C8A66B] uppercase tracking-wider block mb-2">Timings</span>
                <p className="text-sm font-medium text-[#103629]">{businessConfig.hours}</p>
              </div>

              <div className="pt-2">
                <a
                  href={businessConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <MapPin className="w-4 h-4 text-[#C8A66B]" />
                  <span>Open Location in Google Maps</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF8] p-8 sm:p-10 rounded-3xl border border-[#F4EBDD] shadow-xl relative">
              
              <h3 className="font-serif-custom font-bold text-2xl text-[#103629] mb-2">
                Send an Enquiry
              </h3>
              <p className="text-sm text-[#292D29]/70 font-sans-custom mb-6">
                Fill out this quick form and send your query instantly via WhatsApp.
              </p>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm font-medium">Enquiry generated successfully! WhatsApp is opening with your details.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#103629] uppercase mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/30 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#103629] uppercase mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter your mobile number"
                      className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/30 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103629] uppercase mb-1.5">Delivery Address / Locality *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="e.g. Vatika City Central, Ambala City"
                    className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/30 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103629] uppercase mb-1.5">Message / Requirements</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Mention products and quantities you are interested in..."
                    className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/30 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] py-4 rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                  <span>Send Enquiry on WhatsApp</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
