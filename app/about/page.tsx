'use client';

import Card from '@/components/Card';
import { Users, Award, Clock, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl text-blue-100">
            15 yılı aşkın deneyimi ile Türkiye'nin güvenilir sigorta şirketi
          </p>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-t-4 border-t-blue-600">
              <div className="flex items-center gap-4 mb-4">
                <Target className="text-blue-600" size={32} />
                <h3 className="text-2xl font-bold">Misyonumuz</h3>
              </div>
              <p className="text-gray-600">
                Her bireyin ve işletmenin finansal güvenliğini sağlamak, hayatının her aşamasında 
                güvenilir sigorta hizmetleri sunmak.
              </p>
            </Card>

            <Card className="border-t-4 border-t-purple-600">
              <div className="flex items-center gap-4 mb-4">
                <Award className="text-purple-600" size={32} />
                <h3 className="text-2xl font-bold">Vizyonumuz</h3>
              </div>
              <p className="text-gray-600">
                Türkiye'de en güvenilir, inovatif ve müşteri memnuniyeti yüksek sigorta şirketi olmak, 
                teknoloji ve insan dokunuşunu birleştirmek.
              </p>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <div className="flex items-center gap-4 mb-4">
                <Users className="text-green-600" size={32} />
                <h3 className="text-2xl font-bold">Değerlerimiz</h3>
              </div>
              <p className="text-gray-600">
                Güvenilirlik, şeffaflık, inovation ve müşteri odaklılık ile her zaman doğru hizmet sunuyoruz.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Bizim Hikayemiz</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            MK Sigorta, 2009 yılında Antalya'da kurulmuş ve kuruluşundan bu yana güvenilir sigorta hizmeti 
            sunmaya devam etmektedir. Başlangıçta sadece küçük bir ofisle başlayan işletmemiz, 
            müşteri memnuniyeti ve kaliteli hizmet anlayışı ile hızla büyümüştür.
          </p>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Bugün 5000'den fazla müşteri tarafından tercih edilen şirketimiz, sağlık, otomotiv, 
            konut ve ticari sigortada uzman hizmetler sunmaktadır. Teknoloji ve inovasyon kullanarak 
            müşteri deneyimini her gün geliştiriyoruz.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Geleceğte de aynı kararlılık ve dürüstlüğü ile hizmet vermeye, müşterilerimizin güvenini 
            kazanmaya devam edeceğiz.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Neden Bize Güvenebilirsiniz?</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: <Award className="text-blue-600" size={40} />,
                title: '15+ Yıl Deneyim',
                description: 'Antalya ve çevresinde sunduğumuz güvenilir sigorta hizmeti ile milyonlarca kişinin güvenini kazandık.',
              },
              {
                icon: <Users className="text-green-600" size={40} />,
                title: '5000+ Memnun Müşteri',
                description: 'Müşteri memnuniyeti bizim ilk önceliğimiz. Müşterilerimizin geri bildirimleri bize değer katar.',
              },
              {
                icon: <Clock className="text-purple-600" size={40} />,
                title: '24/7 Müşteri Destek',
                description: 'Acil durumlarda hızlı ve etkili hizmet sunuyoruz. Sizin huzurunuz bizim önceliğimiz.',
              },
              {
                icon: <Target className="text-orange-600" size={40} />,
                title: 'Geniş Ürün Yelpazesi',
                description: 'Sağlık, otomotiv, konut ve ticari sigortada kapsamlı çözümler sunuyoruz.',
              },
            ].map((item, idx) => (
              <Card key={idx} className="flex gap-6">
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Detail */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Temel Değerlerimiz</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Güvenilirlik</h3>
                <p className="text-gray-600">
                  Müşterilerimize her zaman doğru bilgi, adil hizmet ve anlaşılır politikalar sunuyoruz. 
                  Söz verdiğimiz her şeyi yerine getiririz.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Şeffaflık</h3>
                <p className="text-gray-600">
                  Tüm işlemlerimiz açık, anlaşılır ve denetlenebilirdir. Müşterilerimize hiçbir gizli 
                  koşul veya hak kaybettirmeyiz.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">İnovation</h3>
                <p className="text-gray-600">
                  Teknoloji ve yeni çözümlerle hizmetlerimizi geliştirir, müşteri deneyimini artırırız. 
                  Dijital çağa uyum sağlamakta kararlıyız.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Müşteri Odaklılık</h3>
                <p className="text-gray-600">
                  Her müşteri için özel çözümler geliştiririz ve hızlı destek sağlarız. Sizin ihtiyaçlarınız 
                  bizim tasarımımızın merkezindedir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
