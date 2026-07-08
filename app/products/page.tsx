'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { InsuranceProduct } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase
          .from('insurance_products')
          .select('*')
          .eq('is_active', true);

        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchProducts();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: 'Tüm Ürünler' },
    { id: 'sağlık', name: 'Sağlık Sigortası' },
    { id: 'araç', name: 'Araç Sigortası' },
    { id: 'ev', name: 'Ev Sigortası' },
    { id: 'iş', name: 'İş Sigortası' },
    { id: 'seyahat', name: 'Seyahat Sigortası' },
    { id: 'hayat', name: 'Hayat Sigortası' },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-primary text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-2">Sigorta Ürünlerimiz</h1>
            <p className="text-lg">Her ihtiyacınız için kapsamlı sigorta çözümleri</p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Yükleniyor...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Bu kategoride ürün bulunamadı.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="card p-6 flex flex-col">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                    {product.base_price && (
                      <p className="text-2xl font-bold text-primary mb-4">
                        ₺{product.base_price.toLocaleString('tr-TR')}
                      </p>
                    )}
                    {product.features && product.features.length > 0 && (
                      <ul className="text-sm text-gray-600 mb-6 space-y-1">
                        {(product.features as string[]).slice(0, 3).map((feature, idx) => (
                          <li key={idx}>✓ {feature}</li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={`/quote?product=${product.id}`}
                      className="btn-primary text-center"
                    >
                      Teklif Al
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
