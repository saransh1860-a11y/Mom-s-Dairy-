import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, handleFirestoreError } from '../firebase';
import { products as defaultProducts, Product } from '../data/products';

const PRODUCTS_COLLECTION = 'products';

export async function seedDefaultProductsIfNeeded() {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (querySnapshot.empty) {
      console.log('Seeding default Mom\'s Dairy products into Firestore...');
      for (const prod of defaultProducts) {
        const docRef = doc(db, PRODUCTS_COLLECTION, prod.id);
        await setDoc(docRef, {
          ...prod,
          updatedAt: new Date().toISOString()
        });
      }
      console.log('Seeding completed successfully.');
    }
  } catch (error) {
    handleFirestoreError(error, 'seedProducts', PRODUCTS_COLLECTION);
  }
}

export function subscribeToProducts(callback: (products: Product[]) => void) {
  const q = query(collection(db, PRODUCTS_COLLECTION));
  return onSnapshot(q, (snapshot) => {
    const items: Product[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as any;
      items.push({
        id: docSnap.id,
        name: data.name || '',
        hindiName: data.hindiName || '',
        category: data.category || 'General',
        shortDesc: data.shortDesc || '',
        fullDesc: data.fullDesc || '',
        image: data.image || 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
        badge: data.badge || '',
        features: Array.isArray(data.features) ? data.features : [],
        packagingOptions: Array.isArray(data.packagingOptions) ? data.packagingOptions : ['Standard Pack'],
        isFeatured: Boolean(data.isFeatured)
      });
    });
    callback(items.length > 0 ? items : defaultProducts);
  }, (error) => {
    handleFirestoreError(error, 'subscribeProducts', PRODUCTS_COLLECTION);
    callback(defaultProducts);
  });
}

export async function saveProduct(product: Partial<Product>) {
  try {
    const id = product.id || `product_${Date.now()}`;
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const payload = {
      ...product,
      id,
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, 'saveProduct', PRODUCTS_COLLECTION);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    return true;
  } catch (error) {
    handleFirestoreError(error, 'deleteProduct', PRODUCTS_COLLECTION);
    throw error;
  }
}
