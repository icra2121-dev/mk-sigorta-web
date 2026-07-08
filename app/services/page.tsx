'use client';

import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';
import { CheckCircle, Zap, Shield, Headphones, Clock, TrendingUp } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <Shield className="text-blue-600" size={40} />,
      title: 'Sigorta Danışmanlığı',
      description: 'Kişisel ve kurumsal ihtiyaçlarınıza uygun sigorta çözümleri sunuyoruz. Uzman danışmanlarımız sizin için en uygun planı seçmenize yardımcı olur.',
      features: ['Ücretsiz konsültasyon', 'Kişiselleştirilmiş plan', 'Karşılaştırmalı analiz'],
    },
    {
      icon: <Zap className="text-green-600" size={40} />,
      title: 'Hızlı Teklif Alma',
      description: 'İhtiyacınız olan sigorta hakkında dakikalar içinde çevrimiçi teklif alın. Basit ve anlaşılır fiyatlandırma ile hızlı karar verin.',
      features: ['Çevrimiçi teklif', 'Hızlı işlem', 'Anında teyit'],
    },
    {
      icon: <Headphones className="text-purple-600" size={40} />,
      title: '24/7 Müşteri Destek',
      description: 'Sorularınız ve sorunlarınız için 7 gün 24 saat müşteri hizmetleri ekibimiz hazır. Acil durumlar için anında destek sağlıyoruz.',
      features: ['7/24 Erişim', 'Hızlı cevap', 'Profesyonel destek'],
    },
    {
      icon: <Clock className="text-orange-600" size={40} />,
      title: 'Hasar İşlemleri',
      description: 'Hasarlarınızı hızlı ve etkin bir şekilde işliyoruz. Basit talepler saatlerce tamamlanabilir. Tüm belgeler dijital olarak iletilebilir.',
      features: ['Hızlı işlem', 'Çevrimiçi hasar', 'Hassas çözüm'],
    },
    {
      icon: <TrendingUp className="text-red-600" size={40} />,
      title: 'Sigorta Yönetimi',
      description: 'Poliçelerinizin yönetimini basitleştiriyoruz. Poliçe değişiklikleri, renewals ve belge talepleri tek yerden yapılabilir.',
      features: ['Dijital poliçe', 'Kolay yönetim', 'Otomatik renewals'],
    },
    {
      icon: <CheckCircle className="text-teal-600" size={40} />,
      title: 'Tamamlama Garantisi',
      description: 'Sigorta işlemleriniz başından sonuna kadar biz yanınızdayız. Her adımda rehberlik ve destek sağlıyoruz.',
      features: ['Tamamlama desteği', 'Rehberlik', 'Dokümantasyon'],
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Teklif Alın',
      description: 'Çevrimiçi formu doldurun ve dakikalar içinde teklif alın',
    },
    {
      number: 2,
      title: 'Karşılaştırın',
      description: 'Sunduğumuz seçenekleri inceleyip size en uygun planı seçin',
    },
    {
      number: 3,
      title: 'İmzalayın',
      description: 'Poliçeyi çevrimiçi imzalayın, hiçbir kağıt gerekli değil',
    },
    {
      number: 4,
      title: 'Başlayın',
      description: 'Sigorta tamamını imza sonrası hemen geçerli hale gelir',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-4">Hizmetlerimiz</h1>
          <p className="text-xl text-blue-100">
            Hayatınızın her aşamasında kapsamlı sigorta hizmetleri
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-20">
        {/* Main Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Sunduğumuz Hizmetler</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition flex flex-col h-full">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-4 flex-1 text-center">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20 bg-white rounded-lg p-12">
          <h2 className="text-4xl font-bold mb-12 text-center">Nasıl Çalışır?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Our Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Neden Bizim Hizmetlerimizi Seçmelisiniz?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                {
                  title: 'Güvenilirlik',
                  description: 'Her işlemde en yüksek güvenlik standartlarını uygularız. Verileriniz tamamen korunur.',
                },
                {
                  title: 'Hız ve Verimlilik',
                  description: 'Tüm işlemler çevrimiçi olarak yapılabilir. Kağıtsız, dijital ve hızlı çözümler sunuyoruz.',
                },
                {
                  title: 'Müşteri Odaklılık',
                  description: 'Sizin ihtiyaçlarınız bizim önceliğimiz. Her müşteri için özel çözümler geliştiririz.',
                },
              ].map((item, idx) => (
                <Card key={idx} className="flex gap-4">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Şeffaflık',
                  description: 'Gizli ücret yoktur. Tüm koşullar açık ve anlaşılır şekilde sunulur.',
                },
                {
                  title: 'Teknik Destek',
                  description: 'Teknolojik sorunlarla karşılaşırsanız, uzman takımımız hemen yardımcı olur.',
                },
                {
                  title: 'Geniş Seçenekler',
                  description: 'Sağlık, otomotiv, konut ve daha fazlası - tüm sigorta ihtiyaçlarınız için çözümler.',
                },
              ].map((item, idx) => (
                <Card key={idx} className="flex gap-4">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Şimdi Başlayın</h2>
          <p className="text-xl text-blue-100 mb-8">
            Sigorta ihtiyaçlarınız için bizimle iletişime geçin. Uzman danışmanlarımız size yardımcı olmak için hazır.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/quotes">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Teklif Al
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-blue-500 hover:bg-blue-700">
                İletişime Geç
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
