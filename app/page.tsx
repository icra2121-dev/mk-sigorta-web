'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container text-center">
            <h1 className="text-5xl font-bold mb-6">MK Sigorta Hizmetleri</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Antalya'da 24/7 güvenilir sigorta çözümleri. Sağlık, araç, ev, iş ve daha birçok sigorta ürünü.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/quote" className="btn-primary">
                Ücretsiz Teklif Al
              </Link>
              <Link href="/products" className="btn-outline text-white border-white hover:bg-white hover:text-primary">
                Ürünleri İncele
              </Link>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="section-title text-center">Sigorta Ürünlerimiz</h2>
            <p className="section-subtitle text-center">Tüm ihtiyaçlarınız için kapsamlı sigorta çözümleri</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Sağlık Sigortası', icon: '🏥', desc: 'Kapsamlı sağlık hizmetleri' },
                { title: 'Araç Sigortası', icon: '🚗', desc: 'Kaza ve hasar koruması' },
                { title: 'Ev Sigortası', icon: '🏠', desc: 'Eviniz ve eşyalarınız korumalı' },
                { title: 'İş Sigortası', icon: '💼', desc: 'İşletmeniz için tam koruma' },
                { title: 'Seyahat Sigortası', icon: '✈️', desc: 'Dünya çapında koruma' },
                { title: 'Hayat Sigortası', icon: '👨‍👩‍👧‍👦', desc: 'Ailenizin geleceği güvende' },
              ].map((product, idx) => (
                <div key={idx} className="card p-8 text-center">
                  <div className="text-5xl mb-4">{product.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-600">{product.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container">
            <h2 className="section-title text-center">Bizi Neden Seçin?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              {[
                { count: '5000+', label: 'Mutlu Müşteri' },
                { count: '24/7', label: 'Müşteri Desteği' },
                { count: '20+', label: 'Sigorta Ürünü' },
                { count: '15+', label: 'Yıl Deneyim' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center card p-8">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.count}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">Hemen Başlayın</h2>
            <p className="text-xl mb-8">Birkaç dakika içinde ücretsiz teklif alın</p>
            <Link href="/quote" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block">
              Teklif Al
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
