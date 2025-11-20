import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'smart i Elite Pro',
    category: 'wireless',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 342,
    description: 'Premium wireless earphones with evil-eye design and superior sound quality',
    features: [
      'Active Noise Cancellation',
      '40-hour battery life',
      'Premium drivers for crystal-clear audio',
      'IPX7 water resistance',
      'Touch controls with smart gestures'
    ],
    specs: {
      driver: '12mm Dynamic',
      battery: '40 hours',
      connectivity: 'Bluetooth 5.3',
      waterproof: 'IPX7'
    },
    image: '/products/elite-pro.jpg',
    inStock: true
  },
  {
    id: '2',
    name: 'smart i ANC Master',
    category: 'anc',
    price: 179.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviews: 428,
    description: 'Industry-leading ANC with adaptive sound technology',
    features: [
      'Adaptive ANC with 3 modes',
      'Transparency mode',
      '45-hour battery with ANC',
      'Multipoint connection',
      'Premium comfort fit'
    ],
    specs: {
      driver: '14mm Graphene',
      battery: '45 hours',
      connectivity: 'Bluetooth 5.3 + aptX',
      waterproof: 'IPX5'
    },
    image: '/products/anc-master.jpg',
    inStock: true
  },
  {
    id: '3',
    name: 'smart i Gaming X',
    category: 'gaming',
    price: 129.99,
    originalPrice: 169.99,
    rating: 4.7,
    reviews: 256,
    description: 'Ultra-low latency gaming earphones with immersive 3D sound',
    features: [
      'Gaming mode with 50ms latency',
      'RGB evil-eye indicators',
      'Dual microphone system',
      'Custom EQ profiles',
      '30-hour battery life'
    ],
    specs: {
      driver: '10mm Triple Driver',
      battery: '30 hours',
      connectivity: 'Bluetooth 5.2 + Gaming Mode'
    },
    image: '/products/gaming-x.jpg',
    inStock: true
  },
  {
    id: '4',
    name: 'smart i Sport Edge',
    category: 'sports',
    price: 99.99,
    originalPrice: 139.99,
    rating: 4.6,
    reviews: 189,
    description: 'Sweatproof sports earphones with secure fit and powerful bass',
    features: [
      'Secure sports fit design',
      'IPX8 waterproof rating',
      'Heart rate monitoring',
      'Awareness mode for safety',
      '25-hour battery life'
    ],
    specs: {
      driver: '11mm Dynamic Bass',
      battery: '25 hours',
      connectivity: 'Bluetooth 5.2',
      waterproof: 'IPX8'
    },
    image: '/products/sport-edge.jpg',
    inStock: true
  },
  {
    id: '5',
    name: 'smart i Pure Sound',
    category: 'wireless',
    price: 89.99,
    rating: 4.5,
    reviews: 312,
    description: 'Affordable excellence with signature smart i sound profile',
    features: [
      'Balanced sound signature',
      'Comfortable all-day wear',
      'Quick charge capability',
      'Voice assistant support',
      '28-hour battery life'
    ],
    specs: {
      driver: '10mm Dynamic',
      battery: '28 hours',
      connectivity: 'Bluetooth 5.2',
      waterproof: 'IPX4'
    },
    image: '/products/pure-sound.jpg',
    inStock: true
  },
  {
    id: '6',
    name: 'smart i Studio Pro',
    category: 'anc',
    price: 199.99,
    originalPrice: 249.99,
    rating: 5.0,
    reviews: 156,
    description: 'Studio-grade audio with premium ANC for professionals',
    features: [
      'Hi-Res Audio certified',
      'Premium ANC technology',
      'Studio tuning mode',
      'LDAC codec support',
      '50-hour battery life'
    ],
    specs: {
      driver: '15mm Titanium',
      battery: '50 hours',
      connectivity: 'Bluetooth 5.3 + LDAC',
      waterproof: 'IPX5'
    },
    image: '/products/studio-pro.jpg',
    inStock: false
  }
];
