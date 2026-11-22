import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { products, Product } from '../data/products';
import { generateWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
  initialQuantity?: number | string;
  initialPackaging?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  initialQuantity = 1,
  initialPackaging
}) => {
  if (!isOpen) return null;

  const [selectedProductId, setSelectedProductId] = useState<string>(initialProduct ? initialProduct.id : products[0].id);
  const [quantity, setQuantity] = useState<number>(Number(initialQuantity) || 1);
  const [packaging, setPackaging] = useState<string>(initialPackaging || products[0].packagingOptions[0] || '');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setSelectedProductId(initialProduct.id);
      if (initialProduct.packagingOptions && initialProduct.packagingOptions.length > 0) {
        setPackaging(initialPackaging || initialProduct.packagingOptions[0]);
      }
    }
    if (initialQuantity) {
      setQuantity(Number(initialQuantity) || 1);
    }
  }, [initialProduct, initialQuantity, initialPackaging]);

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
    const prod = products.find(p => p.id === productId);
    if (prod && prod.packagingOptions && prod.packagingOptions.length > 0) {
      setPackaging(prod.packagingOptions[0]);
    }
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppUrl({
      productName: currentProduct.name,
      quantity,
      packaging,
      customerName,
      address,
      notes
    });

    window.open(url, '_blank');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FFFDF8] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#C8A66B]/30 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#174735] text-[#FFFDF8] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#103629] border border-[#C8A66B] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            </div>
            <div>
              <h3 className="font-serif-custom font-bold text-xl">WhatsApp Order Enquiry</h3>
              <p className="text-xs text-[#F4EBDD]/80">Connect directly with Mom's Dairy, Ambala</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#103629] text-white flex items-center justify-center hover:bg-[#103629]/85 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-sm font-medium">WhatsApp message generated successfully! Opening WhatsApp application...</p>
            </div>
          )}

          <form onSubmit={handleSendEnquiry} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-[#103629] uppercase mb-1.5">Select Product *</label>
              <select
                value={selectedProductId}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/40 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#103629] uppercase mb-1.5">Packaging / Size</label>
                <select
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/40 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
                >
                  {currentProduct.packagingOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#103629] uppercase mb-1.5">Quantity *</label>
                <div className="flex items-center border border-[#C8A66B]/40 rounded-xl overflow-hidden bg-[#F4EBDD]/30">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 text-base font-bold text-[#103629] hover:bg-[#F4EBDD] transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center py-2.5 text-sm font-bold text-[#103629] bg-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2.5 text-base font-bold text-[#103629] hover:bg-[#F4EBDD] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#103629] uppercase mb-1.5">Your Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/40 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#103629] uppercase mb-1.5">Delivery Address / Locality in Ambala *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Vatika City Central, Ambala City"
                className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/40 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#103629] uppercase mb-1.5">Additional Notes (Optional)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Preferred delivery time or specific instructions..."
                className="w-full bg-[#F4EBDD]/40 border border-[#C8A66B]/40 rounded-xl px-4 py-3 text-sm text-[#292D29] focus:outline-none focus:ring-2 focus:ring-[#174735]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] py-4 rounded-xl font-medium text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
              <span>Send Enquiry on WhatsApp</span>
              <Send className="w-4 h-4 ml-1" />
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
