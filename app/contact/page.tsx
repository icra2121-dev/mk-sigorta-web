'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createContactMessage } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await createContactMessage(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
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
            <h1 className="text-4xl font-bold mb-2">İletişim</h1>
            <p className="text-lg">Sorularınız ve önerileriniz için bize ulaşın</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Bize Ulaşın</h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Phone className="text-primary flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold mb-1">Telefon</h3>
                      <p className="text-gray-600">+90 (242) XXX XX XX</p>
                      <p className="text-gray-600">Pazartesi-Cuma: 09:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="text-primary flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-gray-600">info@mksigorta.dev</p>
                      <p className="text-gray-600">support@mksigorta.dev</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="text-primary flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold mb-1">Adres</h3>
                      <p className="text-gray-600">Antalya Merkez</p>
                      <p className="text-gray-600">Antalya, Türkiye</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                {success && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    Mesajınız başarıyla gönderildi! En kısa sürede size geri dönüş yapacağız.
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="card p-8">
                  <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Ad soyad zorunludur' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Adınız"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email zorunludur', pattern: { value: /^[^@]+@[^@]+$/, message: 'Geçerli email girin' } })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Telefon</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+90 (xxx) xxx xx xx"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Konu *</label>
                    <input
                      type="text"
                      {...register('subject', { required: 'Konu zorunludur' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Mesajınızın konusu"
                    />
                    {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Mesaj *</label>
                    <textarea
                      {...register('message', { required: 'Mesaj zorunludur' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                      placeholder="Mesajınızı yazın..."
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-2 font-bold disabled:opacity-50"
                  >
                    {loading ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
