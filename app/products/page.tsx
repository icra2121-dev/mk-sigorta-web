'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  base_price: number;
  coverage_amount: number;
  is_active: boolean;
  features?: string[];
}

const productFeatures: Record<string, string[]> = {
  'Sağlık': ['Doktor muayenesi', 'İlaç giderleri', 'Hastane yatışı', '24/7 Destek'],
  'Araç': ['Çarpışma ve yangın', 'Hırsızlık', 'Tüm riskler', 'Kaza sonrası destek'],
  'Ev': ['Yangın ve patlama', 'Hırsızlık', 'Su hasarı', 'Mali sorumluluk'],
  'İş': ['Mali sorumluluk', 'İş kesintisi', 'Mesleki hata', 'İnsan kaynakları'],
  'Hayat': ['Ölüm koruması', 'Sakatlık geliri', 'Kritik hastalıklar', 'Yatırım seçenekleri'],
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `/api/products?category=${selectedCategory}`
          : '/api/products';
        const response = await fetch(url);
        const result = await response.json();
        setProducts((result.data || []).map((product: Product) => ({
          ...product,
          features: productFeatures[product.category] || []
        })));
      } catch (error) {
        console.error('Ürünler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const categories = [
    'Tümü',
    'Sağlık',
    'Araç',
    'Ev',
    'İş',
    'Hayat',
  ];

  const categoryIcons: Record<string, string> = {
    'Sağlık': '🏥',
    'Araç': '🚗',
    'Ev': '🏠',
    'İş': '💼',
    'Hayat': '❤️',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-4">Sigorta Ürünleri</h1>
          <p className="text-xl text-blue-100">
            Hayatınızın her aşamasında güvenlik ve koruma sağlayan ürünler
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-20">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Kategori Seçin</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'Tümü' ? '' : cat)}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  (selectedCategory === '' && cat === 'Tümü') || selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:shadow'
                }`}
              >
                {cat === 'Tümü' ? '📋 ' : categoryIcons[cat] + ' '}{cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Ürünler yükleniyor...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-xl transition flex flex-col h-full hover:scale-105"
              >
                {/* Header with Favorite Button */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{categoryIcons[product.category] || '📦'}</span>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                  </div>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Heart
                      size={20}
                      className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 flex-1">{product.description}</p>

                {/* Features */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Neler İçerir:</p>
                  <ul className="space-y-1">
                    {product.features?.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-blue-600">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coverage Amount */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Teminat Tutarı</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₺{product.coverage_amount?.toLocaleString('tr-TR')}
                  </p>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Aylık Prime</p>
                    <p className="text-3xl font-bold text-blue-600">
                      ₺{product.base_price?.toLocaleString('tr-TR')}
                    </p>
                  </div>
                  <Link href={`/quotes?product=${product.id}`} className="flex-shrink-0">
                    <Button>Teklif Al</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">Bu kategoride ürün bulunamadı</p>
            <button
              onClick={() => setSelectedCategory('')}
              className="text-blue-600 hover:underline font-medium"
            >
              Tüm ürünleri görüntüle
            </button>
          </div>
        )}

        {/* Info Section */}
        <section className="mt-20 pt-20 border-t">
          <h2 className="text-3xl font-bold mb-12 text-center">Neden Bizim Ürünlerimizi Seçmelisiniz?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Uygun Fiyatlar</h3>
              <p className="text-gray-600">
                En rekabetçi fiyatlarla maksimum koruma sunuyoruz.
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Hızlı İşlem</h3>
              <p className="text-gray-600">
                Online teklif ve anlaşma işlemleri dakikalar içinde tamamlanır.
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Güvenilir Destek</h3>
              <p className="text-gray-600">
                24/7 müşteri desteği ile her zaman yanınızdayız.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
