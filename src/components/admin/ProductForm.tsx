import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductFormProps {
  product: Product | null;
  onSave: (data: Partial<Product>) => Promise<void>;
  onCancel: () => void;
}

const categories = ['wireless', 'anc', 'gaming', 'sports'];

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'wireless' as const,
    price: 0,
    originalPrice: 0,
    rating: 5,
    reviews: 0,
    description: '',
    features: [''],
    specs: {
      driver: '',
      battery: '',
      connectivity: '',
      waterproof: ''
    },
    image: '',
    inStock: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        rating: product.rating,
        reviews: product.reviews,
        description: product.description,
        features: product.features || [''],
        specs: product.specs || { driver: '', battery: '', connectivity: '', waterproof: '' },
        image: product.image,
        inStock: product.inStock
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave({
        ...formData,
        features: formData.features.filter(f => f.trim())
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Original Price (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Number of Reviews</label>
              <input
                type="number"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">In Stock</label>
              <select
                value={formData.inStock ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.value === 'true' })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="true" className="bg-gray-900">In Stock</option>
                <option value="false" className="bg-gray-900">Out of Stock</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
            <div className="space-y-2">
              {formData.features.map((feature, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder={`Feature ${idx + 1}`}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, features: [...formData.features, ''] })}
                className="text-blue-400 text-sm hover:text-blue-300"
              >
                + Add Feature
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Driver</label>
              <input
                type="text"
                value={formData.specs.driver}
                onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, driver: e.target.value } })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Battery</label>
              <input
                type="text"
                value={formData.specs.battery}
                onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, battery: e.target.value } })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Connectivity</label>
              <input
                type="text"
                value={formData.specs.connectivity}
                onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, connectivity: e.target.value } })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Waterproof Rating</label>
              <input
                type="text"
                value={formData.specs.waterproof}
                onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, waterproof: e.target.value } })}
                placeholder="e.g. IPX7"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
