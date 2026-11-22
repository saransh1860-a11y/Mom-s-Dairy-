import React, { useState } from 'react';
import { X, MessageCircle, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../data/products';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onOrderOnWhatsApp: (product: Product, quantity: number, packaging: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onOrderOnWhatsApp
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedPackaging, setSelectedPackaging] = useState(product.packagingOptions[0] || 'Standard Pack');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FFFDF8] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#C8A66B]/30 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#103629]/80 hover:bg-[#103629] text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Product Image */}
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#F4EBDD]/50 border border-[#C8A66B]/20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#174735] text-[#C8A66B] text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="space-y-4">
              <span className="text-xs font-semibold text-[#C8A66B] uppercase tracking-wider block">
                {product.category}
              </span>

              <h2 className="font-serif-custom font-bold text-2xl sm:text-3xl text-[#103629]">
                {product.name}
              </h2>
              {product.hindiName && (
                <p className="text-xs text-[#292D29]/60 font-medium -mt-2">{product.hindiName}</p>
              )}

              <div className="inline-block bg-[#174735]/10 text-[#174735] text-xs font-bold px-3 py-1 rounded-full">
                Price on Enquiry
              </div>

              <p className="text-sm text-[#292D29]/80 font-sans-custom leading-relaxed">
                {product.fullDesc}
              </p>
            </div>

          </div>

          {/* Packaging Options */}
          {product.packagingOptions && product.packagingOptions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#F4EBDD]">
              <label className="block text-xs font-bold text-[#103629] uppercase">Select Packaging / Size</label>
              <div className="flex flex-wrap gap-2">
                {product.packagingOptions.map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackaging(pkg)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedPackaging === pkg
                        ? 'bg-[#174735] text-[#FFFDF8] shadow-md'
                        : 'bg-[#F4EBDD]/60 hover:bg-[#F4EBDD] text-[#292D29]'
                    }`}
                  >
                    {selectedPackaging === pkg && <Check className="w-3.5 h-3.5 text-[#C8A66B]" />}
                    <span>{pkg}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-[#103629] uppercase">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#C8A66B]/40 rounded-xl overflow-hidden bg-[#F4EBDD]/30">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-base font-bold text-[#103629] hover:bg-[#F4EBDD] transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 text-sm font-bold text-[#103629] bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-base font-bold text-[#103629] hover:bg-[#F4EBDD] transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#292D29]/60">Select number of units</span>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="space-y-2 pt-2 border-t border-[#F4EBDD]">
            <span className="block text-xs font-bold text-[#103629] uppercase">Product Highlights</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#174735] bg-[#F4EBDD]/30 p-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-[#C8A66B] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F4EBDD]/60 border-t border-[#C8A66B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#174735]/20 text-[#174735] font-medium text-sm hover:bg-[#FFFDF8] transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => onOrderOnWhatsApp(product, quantity, selectedPackaging)}
            className="w-full sm:w-auto bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] px-8 py-3 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            <span>Enquire on WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
