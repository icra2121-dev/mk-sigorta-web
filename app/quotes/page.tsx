'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Alert from '@/components/Alert';

interface Product {
  id: string;
  name: string;
  category: string;
  base_price: number;
  coverage_amount: number;
}

export default function QuotesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [formData, setFormData] = useState({
    coverage_amount: '',
    details: '',
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const result = await response.json();
        setProducts(result.data || []);
      } catch (error) {
        console.error('Ürünler yüklenemedi:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !user) return;

    setSubmitting(true);
    try {
      const selectedProd = products.find((p) => p.id === selectedProduct);
      if (!selectedProd) throw new Error('Ürün bulunamadı');

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          product_id: selectedProduct,
          coverage_amount: formData.coverage_amount || selectedProd.coverage_amount,
          monthly_premium: selectedProd.base_price,
          annual_premium: selectedProd.base_price * 12,
          details: formData.details,
        }),
      });

      if (!response.ok) throw new Error('Teklif oluşturulamadı');

      setAlert({ type: 'success', message: 'Teklif başarıyla oluşturuldu!' });
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Bir hata oluştu',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <h1 className="text-3xl font-bold mb-8">Ücretsiz Teklif Al</h1>

          {alert && (
            <div className="mb-6">
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sigorta Ürünü
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Ürün seçiniz</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ₺{product.base_price}/ay
                  </option>
                ))}
              </select>
            </div>

            {/* Coverage Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teminat Tutarı
              </label>
              <input
                type="number"
                value={formData.coverage_amount}
                onChange={(e) =>
                  setFormData({ ...formData, coverage_amount: e.target.value })
                }
                placeholder="Teminat tutarını girin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklamalar
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Ek açıklamalar (isteğe bağlı)"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Gönderiliyor...' : 'Teklif Al'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
