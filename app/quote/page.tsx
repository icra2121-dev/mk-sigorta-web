'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createQuote } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { InsuranceProduct } from '@/types';

const quoteSchema = z.object({
  product_id: z.string().min(1, 'Ürün seçimi zorunludur'),
  coverage_amount: z.number().optional(),
  full_name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email girin'),
  phone: z.string().regex(/^[0-9+()\-\s]{10,}$/, 'Geçerli bir telefon numarası girin'),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  company_name: z.string().optional(),
  tax_id: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function QuotePage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      product_id: productId || '',
    },
  });

  const selectedProductId = watch('product_id');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('insurance_products')
          .select('*')
          .eq('is_active', true);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    try {
      const quoteNumber = `QT-${Date.now()}`;

      await createQuote({
        user_id: '', // Will be set by user after authentication
        product_id: data.product_id,
        quote_number: quoteNumber,
        status: 'draft',
        coverage_amount: data.coverage_amount,
        monthly_premium: selectedProduct?.base_price,
        annual_premium: selectedProduct?.base_price ? selectedProduct.base_price * 12 : undefined,
        details: {
          customer_name: data.full_name,
          customer_email: data.email,
          customer_phone: data.phone,
          company_name: data.company_name,
          tax_id: data.tax_id,
        },
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating quote:', error);
      alert('Teklif oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-primary text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-2">Ücretsiz Teklif Al</h1>
            <p className="text-lg">Birkaç dakika içinde kişiselleştirilmiş sigorta teklifi al</p>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-12 bg-gray-50">
          <div className="container max-w-2xl">
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Teklifiniz başarıyla oluşturuldu! En kısa sürede size ulaşacağız.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="card p-8">
              {/* Product Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Sigorta Ürünü *</label>
                <select
                  {...register('product_id')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seçiniz</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                {errors.product_id && (
                  <p className="text-red-600 text-sm mt-1">{errors.product_id.message}</p>
                )}
              </div>

              {selectedProduct?.base_price && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Tahmini Aylık Prim</p>
                  <p className="text-2xl font-bold text-primary">
                    ₺{selectedProduct.base_price.toLocaleString('tr-TR')}
                  </p>
                </div>
              )}

              {/* Coverage Amount */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Teminat Tutarı (₺)</label>
                <input
                  type="number"
                  {...register('coverage_amount', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Örnek: 100000"
                />
              </div>

              {/* Personal Information */}
              <h3 className="text-lg font-bold mb-4 mt-8">Kişisel Bilgiler</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Ad Soyad *</label>
                  <input
                    type="text"
                    {...register('full_name')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Adınız Soyadınız"
                  />
                  {errors.full_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.full_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Telefon *</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+90 (xxx) xxx xx xx"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Address Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Adres</label>
                  <input
                    type="text"
                    {...register('address')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Sokak ve bina no."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Şehir</label>
                  <input
                    type="text"
                    {...register('city')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="Antalya"
                  />
                </div>
              </div>

              {/* Company Information (Optional) */}
              <h3 className="text-lg font-bold mb-4 mt-8">İşletme Bilgileri (İsteğe Bağlı)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2">İşletme Adı</label>
                  <input
                    type="text"
                    {...register('company_name')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Şirket adı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Vergi Kimlik No</label>
                  <input
                    type="text"
                    {...register('tax_id')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="VKNO"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 font-bold disabled:opacity-50"
              >
                {loading ? 'Gönderiliyor...' : 'Teklif İste'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
