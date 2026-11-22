import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Edit, Trash2, Shield, LogIn, LogOut, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { saveProduct, deleteProduct, subscribeToProducts, seedDefaultProductsIfNeeded } from '../services/productService';
import { auth, loginWithGoogle, logoutUser, testConnection } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    testConnection().then(setDbConnected);
    seedDefaultProductsIfNeeded();

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    const unsubscribeProducts = subscribeToProducts((items) => {
      setProducts(items);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
    };
  }, []);

  useEffect(() => {
    if ((editingProduct !== null || isCreating) && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [editingProduct, isCreating]);

  const handleLogin = async () => {
    try {
      setErrorMsg('');
      await loginWithGoogle();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err: any) {
      setErrorMsg(err.message || 'Logout failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.id || !editingProduct.name || !editingProduct.shortDesc) {
      setErrorMsg('Please fill in all required fields (ID, Name, Short Description).');
      return;
    }

    try {
      setErrorMsg('');
      const rawFeatures = editingProduct.features;
      const featuresArray = typeof rawFeatures === 'string'
        ? (rawFeatures as string).split(',').map(s => s.trim()).filter(Boolean)
        : Array.isArray(rawFeatures)
        ? rawFeatures
        : ['Pure & Fresh'];

      const rawPkg = editingProduct.packagingOptions;
      const pkgArray = typeof rawPkg === 'string'
        ? (rawPkg as string).split(',').map(s => s.trim()).filter(Boolean)
        : Array.isArray(rawPkg)
        ? rawPkg
        : ['Standard Pack'];

      const formattedProduct: Product = {
        id: String(editingProduct.id).trim(),
        name: String(editingProduct.name).trim(),
        hindiName: String(editingProduct.hindiName || '').trim(),
        category: String(editingProduct.category || 'Milk & Essentials'),
        shortDesc: String(editingProduct.shortDesc || '').trim(),
        fullDesc: String(editingProduct.fullDesc || '').trim(),
        image: String(editingProduct.image || 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80'),
        badge: String(editingProduct.badge || '').trim(),
        features: featuresArray,
        packagingOptions: pkgArray,
        isFeatured: Boolean(editingProduct.isFeatured)
      };

      await saveProduct(formattedProduct);
      setSuccessMsg('Product saved successfully to Firestore!');
      setEditingProduct(null);
      setIsCreating(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      console.error('Save product error:', err);
      setErrorMsg(err.message || 'Failed to save product. Please check connection and try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setSuccessMsg('Product deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FFFDF8] rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-[#C8A66B]/40 relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#103629] text-[#FFFDF8] p-6 flex items-center justify-between border-b border-[#174735]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#174735] border border-[#C8A66B] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#C8A66B]" />
            </div>
            <div>
              <h2 className="font-serif-custom font-bold text-xl">Mom's Dairy Admin Panel</h2>
              <p className="text-xs text-[#F4EBDD]/70 flex items-center gap-2">
                Firestore Database: <span className={dbConnected ? 'text-green-400 font-semibold' : 'text-amber-400'}>{dbConnected ? 'Connected' : 'Connecting...'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-2 text-xs bg-[#174735] px-3 py-1.5 rounded-xl border border-[#C8A66B]/30">
                <img src={user.photoURL || ''} alt="Admin" className="w-6 h-6 rounded-full" />
                <span className="text-[#FFFDF8] font-medium">{user.displayName || user.email}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#174735] text-white flex items-center justify-center hover:bg-[#174735]/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 bg-[#FFFDF8]">
          
          {loadingAuth ? (
            <div className="text-center py-12">
              <p className="text-sm text-[#292D29]/60">Checking authentication...</p>
            </div>
          ) : !user ? (
            <div className="max-w-md mx-auto text-center py-12 space-y-6 bg-[#F4EBDD]/40 p-8 rounded-3xl border border-[#C8A66B]/30">
              <div className="w-16 h-16 rounded-2xl bg-[#174735] text-[#C8A66B] flex items-center justify-center mx-auto shadow-md">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-serif-custom font-bold text-2xl text-[#103629]">Admin Authentication Required</h3>
              <p className="text-sm text-[#292D29]/75">
                Please sign in with your Google account to manage Mom's Dairy products and images in Firestore.
              </p>
              {errorMsg && <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>}
              <button
                onClick={handleLogin}
                className="w-full bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] py-3.5 rounded-xl font-medium text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#C8A66B]" />
                <span>Sign In with Google</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Status alerts */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm font-medium">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F4EBDD]/60 p-4 rounded-2xl border border-[#C8A66B]/20">
                <div>
                  <h3 className="font-serif-custom font-bold text-lg text-[#103629]">Product Catalogue Management</h3>
                  <p className="text-xs text-[#292D29]/70">Manage products, descriptions, packaging, and images stored in Firestore.</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setEditingProduct({
                        id: `prod_${Date.now()}`,
                        name: '',
                        hindiName: '',
                        category: 'Milk & Essentials',
                        shortDesc: '',
                        fullDesc: '',
                        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
                        badge: '',
                        features: ['Pure & Fresh', 'Natural Ingredients'],
                        packagingOptions: ['500ml', '1 Litre'],
                        isFeatured: false
                      });
                      setIsCreating(true);
                    }}
                    className="flex-1 sm:flex-none bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] px-5 py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#C8A66B]" />
                    <span>Add New Product</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-white hover:bg-gray-50 text-[#174735] border border-[#174735]/20 px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>

              {/* Edit / Create Form Modal embedded with ref */}
              {(editingProduct !== null || isCreating) && (
                <div ref={formRef} className="bg-[#FFFDF8] p-6 sm:p-8 rounded-3xl border-2 border-[#C8A66B] shadow-2xl space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-4">
                    <h3 className="font-serif-custom font-bold text-xl text-[#103629]">
                      {isCreating ? 'Add New Product' : `Edit Product: ${editingProduct?.name}`}
                    </h3>
                    <button
                      onClick={() => { setEditingProduct(null); setIsCreating(false); }}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Product ID / Slug *</label>
                        <input
                          type="text"
                          required
                          value={editingProduct?.id || ''}
                          onChange={(e) => setEditingProduct({...editingProduct, id: e.target.value})}
                          placeholder="e.g. fresh-cow-milk"
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Product Name *</label>
                        <input
                          type="text"
                          required
                          value={editingProduct?.name || ''}
                          onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                          placeholder="e.g. Pure Cow Milk"
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Hindi Name</label>
                        <input
                          type="text"
                          value={editingProduct?.hindiName || ''}
                          onChange={(e) => setEditingProduct({...editingProduct, hindiName: e.target.value})}
                          placeholder="e.g. शुद्ध गाय का दूध"
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Category *</label>
                        <select
                          value={editingProduct?.category || 'Milk & Essentials'}
                          onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        >
                          <option value="Milk & Essentials">Milk & Essentials</option>
                          <option value="Ghee & Fats">Ghee & Fats</option>
                          <option value="Fermented Dairy">Fermented Dairy</option>
                          <option value="Beverages">Beverages</option>
                          <option value="Cheese & Paneer">Cheese & Paneer</option>
                          <option value="Frozen Treats">Frozen Treats</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Badge (Optional)</label>
                        <input
                          type="text"
                          value={editingProduct?.badge || ''}
                          onChange={(e) => setEditingProduct({...editingProduct, badge: e.target.value})}
                          placeholder="e.g. Signature Product"
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        />
                      </div>

                      <div className="flex items-center pt-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(editingProduct?.isFeatured)}
                            onChange={(e) => setEditingProduct({...editingProduct, isFeatured: e.target.checked})}
                            className="w-4 h-4 text-[#174735] rounded border-gray-300 focus:ring-[#174735]"
                          />
                          <span className="text-xs font-bold text-[#103629] uppercase">Feature on Bilona / Highlight Section</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Product Image (Upload from Device or URL)</label>
                      <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#F4EBDD]/30 p-4 rounded-2xl border border-[#C8A66B]/30">
                        {editingProduct?.image && (
                          <img 
                            src={editingProduct.image} 
                            alt="Preview" 
                            className="w-20 h-20 object-cover rounded-xl border-2 border-[#C8A66B] shadow-sm flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        )}
                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (uploadEvent) => {
                                  const base64String = uploadEvent.target?.result as string;
                                  setEditingProduct({ ...editingProduct, image: base64String });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full text-xs text-[#292D29] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#174735] file:text-[#FFFDF8] hover:file:bg-[#103629] cursor-pointer"
                          />
                          <input
                            type="url"
                            value={editingProduct?.image || ''}
                            onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                            placeholder="Or paste image URL..."
                            className="w-full bg-white border border-[#C8A66B]/30 rounded-xl px-3 py-2 text-xs text-[#292D29]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Short Description *</label>
                        <textarea
                          rows={2}
                          required
                          value={editingProduct?.shortDesc || ''}
                          onChange={(e) => setEditingProduct({...editingProduct, shortDesc: e.target.value})}
                          placeholder="Short tagline for product cards..."
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Full Description *</label>
                        <textarea
                          rows={2}
                          required
                          value={editingProduct?.fullDesc || ''}
                          onChange={(e) => setEditingProduct({...editingProduct, fullDesc: e.target.value})}
                          placeholder="Detailed product description..."
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Features (comma-separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingProduct?.features) ? editingProduct.features.join(', ') : (editingProduct?.features || '')}
                          onChange={(e) => setEditingProduct({
                            ...editingProduct, 
                            features: e.target.value as any
                          })}
                          placeholder="e.g. Pure & Fresh, Traditional Method"
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#103629] uppercase mb-1">Packaging Options (comma-separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingProduct?.packagingOptions) ? editingProduct.packagingOptions.join(', ') : (editingProduct?.packagingOptions || '')}
                          onChange={(e) => setEditingProduct({
                            ...editingProduct, 
                            packagingOptions: e.target.value as any
                          })}
                          placeholder="e.g. 500ml Jar, 1 Litre Jar"
                          className="w-full bg-[#F4EBDD]/30 border border-[#C8A66B]/30 rounded-xl px-4 py-2.5 text-sm text-[#292D29]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F4EBDD]">
                      <button
                        type="button"
                        onClick={() => { setEditingProduct(null); setIsCreating(false); }}
                        className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#174735] hover:bg-[#103629] text-[#FFFDF8] px-6 py-2.5 rounded-xl text-xs font-medium shadow-md cursor-pointer"
                      >
                        Save Product
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* Products Table / Grid */}
              <div className="bg-[#FFFDF8] rounded-2xl border border-[#F4EBDD] overflow-hidden shadow-sm">
                <div className="p-4 bg-[#F4EBDD]/40 border-b border-[#F4EBDD] font-serif-custom font-bold text-[#103629]">
                  Existing Products ({products.length})
                </div>
                
                <div className="divide-y divide-[#F4EBDD]">
                  {products.map((prod) => (
                    <div key={prod.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F4EBDD]/15 transition-colors">
                      <div className="flex items-center gap-4">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-14 h-14 object-cover rounded-xl border border-[#C8A66B]/30 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif-custom font-bold text-base text-[#103629]">{prod.name}</h4>
                            {prod.badge && (
                              <span className="text-[10px] bg-[#174735] text-[#C8A66B] px-2 py-0.5 rounded-full uppercase font-semibold">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#292D29]/60">{prod.category} • {prod.packagingOptions?.join(', ')}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => { setEditingProduct(prod); setIsCreating(false); }}
                          className="bg-[#F4EBDD] hover:bg-[#F4EBDD]/80 text-[#174735] px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-700 px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
