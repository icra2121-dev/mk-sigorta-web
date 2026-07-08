'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  base_price: number;
  coverage_amount: number;
  is_active: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `/api/products?category=${selectedCategory}`
          : '/api/products';
        const response = await fetch(url);
        const result = await response.json();
        setProducts(result.data || []);
      } catch (error) {
        console.error('Ürünler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const categories = [
    'Tümü',
    'Sağlık',
    'Araç',
    'Ev',
    'İş',
    'Hayat',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Sigorta Ürünleri</h1>
        <p className="text-gray-600 mb-12">Tüm sigorta ürünlerimizi keşfedin</p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'Tümü' ? '' : cat)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                (selectedCategory === '' && cat === 'Tümü') || selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Kategori: {product.category}</p>
                  <p className="text-sm text-gray-500">
                    Teminat Tutarı: ₺{product.coverage_amount?.toLocaleString('tr-TR')}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Aylık Prime</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₺{product.base_price?.toLocaleString('tr-TR')}
                    </p>
                  </div>
                  <Link href={`/quotes?product=${product.id}`}>
                    <Button>Teklif Al</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600">Ürün bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
