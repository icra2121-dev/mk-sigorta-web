'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // TODO: Implement password reset functionality
      // For now, show success message
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
      }, 3000);
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
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
              <h1 className="text-3xl font-bold mb-2 text-center">Şifre Sıfırla</h1>
              <p className="text-gray-600 text-center mb-8">Email adresinize şifre sıfırlama bağlantısı göndereceğiz</p>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  Şifre sıfırlama bağlantısı email adresinize gönderildi!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-2 font-bold disabled:opacity-50"
                >
                  {loading ? 'Gönderiliyor...' : 'Bağlantı Gönder'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-primary hover:underline">
                  Giriş sayfasına dön
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
