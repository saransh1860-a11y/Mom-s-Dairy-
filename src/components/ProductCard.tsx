import React from 'react';
import { MessageCircle, Eye, ShieldCheck } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onWhatsAppOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onWhatsAppOrder
}) => {
  return (
    <div className={`bg-[#FFFDF8] rounded-2xl overflow-hidden border ${product.isFeatured ? 'border-[#C8A66B] shadow-xl ring-2 ring-[#C8A66B]/20' : 'border-[#F4EBDD] shadow-md hover:shadow-xl'} transition-all duration-300 flex flex-col group`}>
      
      {/* Product Image Container */}
      <div className="relative h-56 overflow-hidden bg-[#F4EBDD]/40">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#174735] text-[#C8A66B] text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-md border border-[#C8A66B]/30">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-[#FFFDF8]/90 backdrop-blur-sm text-[#103629] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          Price on Enquiry
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#C8A66B] font-semibold mb-1 uppercase tracking-wider">
            <span>{product.category}</span>
          </div>
          
          <h3 className="font-serif-custom font-bold text-xl text-[#103629] group-hover:text-[#174735] transition-colors">
            {product.name}
          </h3>
          {product.hindiName && (
            <p className="text-xs text-[#292D29]/60 font-medium mb-2">{product.hindiName}</p>
          )}

          <p className="text-sm text-[#292D29]/75 font-sans-custom mt-2 line-clamp-2">
            {product.shortDesc}
          </p>

          {/* Features preview */}
          <div className="mt-4 pt-4 border-t border-[#F4EBDD] space-y-1.5">
            {product.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#174735]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A66B] flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 mt-4 border-t border-[#F4EBDD] grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="bg-[#F4EBDD] hover:bg-[#F4EBDD]/80 text-[#174735] py-2.5 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>

          <button
            onClick={() => onWhatsAppOrder(product)}
            className="bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] py-2.5 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
