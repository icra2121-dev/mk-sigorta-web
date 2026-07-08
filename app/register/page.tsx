'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signUp } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const registerSchema = z.object({
  full_name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  confirmPassword: z.string().min(6, 'Şifre onayı zorunludur'),
  phone: z.string().regex(/^[0-9+()\-\s]{10,}$/, 'Geçerli bir telefon numarası girin'),
  agreeToTerms: z.boolean().refine((val) => val, 'Kullanım şartlarını kabul etmelisiniz'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError('');
    try {
      const response = await signUp(data.email, data.password, {
        full_name: data.full_name,
        phone: data.phone,
        user_type: 'customer',
        city: 'Antalya',
      });

      if (response.user) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login?registered=true');
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || 'Kayıt yapılamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-gray-50 py-12 min-h-screen flex items-center">
          <div className="container max-w-md">
            <div className="card p-8">
              <h1 className="text-3xl font-bold mb-2 text-center">Kaydol</h1>
              <p className="text-gray-600 text-center mb-8">Yeni bir hesap oluştur</p>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  Kaydınız başarıyla oluşturuldu! Giriş sayfasına yönlendiriliyorsunuz...
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                <div>
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

                <div>
                  <label className="block text-sm font-bold mb-2">Şifre *</label>
                  <input
                    type="password"
                    {...register('password')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Şifre Onayla *</label>
                  <input
                    type="password"
                    {...register('confirmPassword')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('agreeToTerms')}
                    id="agreeToTerms"
                    className="w-4 h-4"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                    <Link href="/terms" className="text-primary hover:underline">
                      Kullanım şartlarını
                    </Link>
                    {' '}kabul ediyorum
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-600 text-sm">{errors.agreeToTerms.message}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-2 font-bold disabled:opacity-50"
                >
                  {loading ? 'Kaydediliyor...' : 'Kaydol'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Zaten hesabınız var mı?{' '}
                  <Link href="/login" className="text-primary font-bold hover:underline">
                    Giriş Yap
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
