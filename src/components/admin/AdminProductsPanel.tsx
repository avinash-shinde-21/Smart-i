import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types/product';
import ProductForm from './ProductForm';

export default function AdminProductsPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      if (selectedProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', selectedProduct.id);

        if (error) throw error;
        fetchProducts();
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        fetchProducts();
      }

      setShowForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Products</h2>
        <p className="text-gray-400">Manage your product catalog</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Stock</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white">{product.name}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-white font-semibold">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowForm(true);
                      }}
                      className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
