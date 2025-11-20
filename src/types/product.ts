export interface Product {
  id: string;
  name: string;
  category: 'wireless' | 'anc' | 'gaming' | 'sports';
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specs: {
    driver: string;
    battery: string;
    connectivity: string;
    waterproof?: string;
  };
  image: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
