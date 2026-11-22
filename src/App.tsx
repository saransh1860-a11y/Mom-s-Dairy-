/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProductGrid } from './components/ProductGrid';
import { FeaturedGhee } from './components/FeaturedGhee';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowToOrder } from './components/HowToOrder';
import { Delivery } from './components/Delivery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { AdminModal } from './components/AdminModal';
import { Product, products as defaultProducts } from './data/products';
import { subscribeToProducts, seedDefaultProductsIfNeeded } from './services/productService';

export default function App() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waProduct, setWaProduct] = useState<Product | null>(null);
  const [waQty, setWaQty] = useState<number | string>(1);
  const [waPkg, setWaPkg] = useState<string>('');

  const [adminModalOpen, setAdminModalOpen] = useState(false);

  useEffect(() => {
    seedDefaultProductsIfNeeded();
    const unsubscribe = subscribeToProducts((items) => {
      if (items && items.length > 0) {
        setProducts(items);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenWhatsAppGeneral = () => {
    setWaProduct(null);
    setWaQty(1);
    setWaPkg('');
    setWaModalOpen(true);
  };

  const handleOpenWhatsAppProduct = (product: Product, quantity = 1, packaging = '') => {
    setWaProduct(product);
    setWaQty(quantity);
    setWaPkg(packaging);
    setWaModalOpen(true);
  };

  const handleViewDetails = (product: Product) => {
    setDetailsProduct(product);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#292D29] font-sans-custom selection:bg-[#174735] selection:text-[#FFFDF8]">
      
      {/* Navigation */}
      <Navbar 
        onOpenWhatsAppOrder={handleOpenWhatsAppGeneral} 
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero onOpenWhatsAppOrder={handleOpenWhatsAppGeneral} />

      {/* Brand Trust Strip */}
      <TrustStrip />

      {/* Product Catalogue (Synced with Firestore) */}
      <ProductGrid
        products={products}
        onViewDetails={handleViewDetails}
        onWhatsAppOrder={(product) => handleOpenWhatsAppProduct(product, 1)}
      />

      {/* Featured Bilona Desi Ghee */}
      <FeaturedGhee
        products={products}
        onWhatsAppOrder={(product) => handleOpenWhatsAppProduct(product, 1)}
        onViewDetails={handleViewDetails}
      />

      {/* About Mom's Dairy */}
      <About onExploreProducts={() => {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Why Choose Mom's Dairy */}
      <WhyChooseUs />

      {/* How to Order */}
      <HowToOrder onOpenWhatsAppOrder={handleOpenWhatsAppGeneral} />

      {/* Delivery Information */}
      <Delivery />

      {/* Location and Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={detailsProduct}
        onClose={() => setDetailsProduct(null)}
        onOrderOnWhatsApp={(product, quantity, packaging) => {
          setDetailsProduct(null);
          handleOpenWhatsAppProduct(product, quantity, packaging);
        }}
      />

      {/* WhatsApp Order Modal */}
      <WhatsAppModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        initialProduct={waProduct}
        initialQuantity={waQty}
        initialPackaging={waPkg}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

    </div>
  );
}
