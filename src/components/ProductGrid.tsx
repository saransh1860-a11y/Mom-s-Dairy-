import React, { useState } from 'react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, Filter } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onWhatsAppOrder: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onViewDetails,
  onWhatsAppOrder
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Ghee & Fats', 'Milk & Essentials', 'Fermented Dairy', 'Beverages', 'Cheese & Paneer', 'Frozen Treats'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F4EBDD] px-4 py-1.5 rounded-full text-xs font-semibold text-[#174735] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A66B]" />
            <span>Pure & Traditional Collection (Firestore Synced)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-bold text-[#103629]">
            Explore Our Dairy Collection
          </h2>
          <p className="text-base text-[#292D29]/75 font-sans-custom mt-3">
            Everyday dairy favourites, brought together in one place for your family. Prepared with care and tradition.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <span className="text-xs font-semibold text-[#292D29]/60 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#174735] text-[#FFFDF8] shadow-md'
                    : 'bg-[#F4EBDD]/60 hover:bg-[#F4EBDD] text-[#292D29]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
              onWhatsAppOrder={onWhatsAppOrder}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#292D29]/60 text-base">No products found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
