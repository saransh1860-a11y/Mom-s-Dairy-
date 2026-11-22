export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  badge?: string;
  features: string[];
  packagingOptions: string[];
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: 'cow-desi-ghee',
    name: 'Cow Desi Ghee (Bilona Method)',
    hindiName: 'गाय का देसी घी (बिलोना विधि)',
    category: 'Ghee & Fats',
    shortDesc: 'Traditional Bilona-method cow desi ghee, prepared from curd according to our traditional process.',
    fullDesc: 'Mom\'s Dairy Cow Desi Ghee is crafted following the authentic Bilona method. Made from curd (not direct cream), our ghee preserves natural nutrients, rich aroma, and authentic granular texture with no added chemicals or preservatives.',
    image: 'https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature Product',
    features: [
      'Prepared from Curd',
      'Traditional Bilona Method',
      'Natural Ingredients',
      'No Added Chemicals',
      'Own Farm Quality'
    ],
    packagingOptions: ['500ml Jar', '1 Litre Jar', '2 Litre Jar'],
    isFeatured: true
  },
  {
    id: 'cow-milk',
    name: 'Pure Cow Milk',
    hindiName: 'शुद्ध गाय का दूध',
    category: 'Milk & Essentials',
    shortDesc: 'Fresh, wholesome cow milk, a daily dairy essential for your home and family.',
    fullDesc: 'Sourced to bring farm-fresh goodness to your doorstep every morning. Rich in natural protein and essential nutrients, our cow milk is pure and untouched by artificial additives.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    badge: 'Daily Fresh',
    features: [
      'Farm Fresh Daily',
      'Rich in Calcium & Protein',
      'Unadulterated & Pure',
      'Hygienically Packed'
    ],
    packagingOptions: ['500ml Pouch / Bottle', '1 Litre Pouch / Bottle']
  },
  {
    id: 'curd',
    name: 'Fresh Curd (Dahi)',
    hindiName: 'ताज़ा दही',
    category: 'Fermented Dairy',
    shortDesc: 'Smooth, creamy traditional curd set to perfection for everyday meals and raitas.',
    fullDesc: 'Prepared daily using pure cow milk with live cultures. Thick, creamy, and naturally delicious with a refreshing tang that complements every Indian meal.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    features: [
      'Set from Pure Milk',
      'Rich in Probiotics',
      'Thick & Creamy Texture',
      'No Preservatives'
    ],
    packagingOptions: ['400g Cup', '1kg Bucket', '5kg Bulk']
  },
  {
    id: 'lassi',
    name: 'Traditional Lassi',
    hindiName: 'मलाईदार लस्सी',
    category: 'Beverages',
    shortDesc: 'Refreshing, traditional churned lassi to beat the heat and refresh your senses.',
    fullDesc: 'A classic North Indian favourite prepared fresh with wholesome curd, churned to creamy perfection. Naturally refreshing and deeply satisfying.',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80',
    features: [
      'Churned Fresh Daily',
      'Cooling & Refreshing',
      'Natural Ingredients',
      'Traditional Taste'
    ],
    packagingOptions: ['300ml Glass / Bottle', '1 Litre Bottle']
  },
  {
    id: 'paneer',
    name: 'Fresh Malai Paneer',
    hindiName: 'ताज़ा मलाई पनीर',
    category: 'Cheese & Paneer',
    shortDesc: 'Soft, melt-in-the-mouth paneer made from pure cow milk for culinary excellence.',
    fullDesc: 'Handcrafted fresh paneer with an exceptionally soft texture and rich dairy flavor. Ideal for curries, grilled snacks, or everyday cooking.',
    image: 'https://images.unsplash.com/photo-1599487488170-deddd261515f?auto=format&fit=crop&w=800&q=80',
    features: [
      'Made from Pure Cow Milk',
      'Extremely Soft & Fresh',
      'High Protein Content',
      'Hygienically Prepared'
    ],
    packagingOptions: ['200g Pack', '500g Pack', '1kg Pack']
  },
  {
    id: 'ice-cream',
    name: 'Creamy Dairy Ice Cream',
    hindiName: 'स्वादिष्ट आइसक्रीम',
    category: 'Frozen Treats',
    shortDesc: 'Delicious, rich ice cream made with real dairy cream for a delightful treat.',
    fullDesc: 'Indulge in our delightful selection of ice creams crafted with genuine dairy cream and natural flavors. A perfect dessert for family celebrations and warm days.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    features: [
      'Made with Real Dairy Cream',
      'Rich & Smooth Texture',
      'Delectable Flavours',
      'Hygienically Frozen'
    ],
    packagingOptions: ['Scoop Cup', 'Family Brick (500ml)', 'Party Tub (1 Litre)']
  }
];
