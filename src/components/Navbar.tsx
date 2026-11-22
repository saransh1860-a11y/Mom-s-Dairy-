import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Phone, MapPin, Shield } from 'lucide-react';
import { businessConfig } from '../data/business';

interface NavbarProps {
  onOpenWhatsAppOrder: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhatsAppOrder, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar for Contact & Address */}
      <div className="bg-[#103629] text-[#F4EBDD] text-xs py-2 px-4 hidden md:block border-b border-[#174735]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C8A66B]" />
              {businessConfig.address.booth}, {businessConfig.address.market}, {businessConfig.address.city}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              {businessConfig.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${businessConfig.phones.primary}`} className="hover:text-[#C8A66B] transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#C8A66B]" /> {businessConfig.phones.displayPrimary}
            </a>
            <span>|</span>
            <a href={`tel:${businessConfig.phones.secondary}`} className="hover:text-[#C8A66B] transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#C8A66B]" /> {businessConfig.phones.displaySecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-45 transition-all duration-300 ${isScrolled ? 'bg-[#FFFDF8]/95 backdrop-blur-md shadow-md py-3' : 'bg-[#FFFDF8] py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#174735] shadow-sm bg-white p-0.5 flex-shrink-0">
              <img 
                src={businessConfig.logo} 
                alt="Mom's Dairy Logo" 
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="font-serif-custom text-2xl font-bold tracking-tight text-[#174735] block leading-none">
                {businessConfig.name}
              </span>
              <span className="text-[11px] font-sans font-medium text-[#C8A66B] tracking-wider uppercase block mt-1">
                {businessConfig.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#home" className="text-[#292D29] hover:text-[#174735] font-medium text-sm transition-colors">Home</a>
            <a href="#products" className="text-[#292D29] hover:text-[#174735] font-medium text-sm transition-colors">Our Products</a>
            <a href="#bilona-ghee" className="text-[#292D29] hover:text-[#174735] font-medium text-sm transition-colors">Bilona Ghee</a>
            <a href="#story" className="text-[#292D29] hover:text-[#174735] font-medium text-sm transition-colors">Our Story</a>
            <a href="#why-us" className="text-[#292D29] hover:text-[#174735] font-medium text-sm transition-colors">Why Mom's Dairy</a>
            <a href="#contact" className="text-[#292D29] hover:text-[#174735] font-medium text-sm transition-colors">Contact</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="bg-[#F4EBDD] hover:bg-[#F4EBDD]/80 text-[#174735] px-3.5 py-2.5 rounded-full font-medium text-xs flex items-center gap-1.5 border border-[#C8A66B]/40 shadow-sm transition-all cursor-pointer"
              title="Admin Panel"
            >
              <Shield className="w-3.5 h-3.5 text-[#174735]" />
              <span>Admin Panel</span>
            </button>

            <button
              onClick={onOpenWhatsAppOrder}
              className="bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>Order on WhatsApp</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenWhatsAppOrder}
              className="bg-[#174735] text-white p-2 rounded-full sm:hidden"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#174735] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#FFFDF8] border-b border-[#F4EBDD] shadow-xl py-6 px-6 animate-fadeIn">
            <div className="flex flex-col gap-4">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#174735] font-medium text-lg py-2 border-b border-[#F4EBDD]"
              >
                Home
              </a>
              <a 
                href="#products" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#174735] font-medium text-lg py-2 border-b border-[#F4EBDD]"
              >
                Our Products
              </a>
              <a 
                href="#bilona-ghee" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#174735] font-medium text-lg py-2 border-b border-[#F4EBDD]"
              >
                Bilona Desi Ghee
              </a>
              <a 
                href="#story" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#174735] font-medium text-lg py-2 border-b border-[#F4EBDD]"
              >
                Our Story
              </a>
              <a 
                href="#why-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#174735] font-medium text-lg py-2 border-b border-[#F4EBDD]"
              >
                Why Mom's Dairy
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#174735] font-medium text-lg py-2 border-b border-[#F4EBDD]"
              >
                Contact & Location
              </a>
              
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full bg-[#F4EBDD] text-[#174735] py-3 rounded-xl font-medium flex items-center justify-center gap-2 border border-[#C8A66B]/40"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhatsAppOrder();
                  }}
                  className="w-full bg-[#174735] text-[#FFFDF8] py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                  <span>Enquire / Order on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
