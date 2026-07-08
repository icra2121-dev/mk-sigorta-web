'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-primary text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-2">Hakkımızda</h1>
            <p className="text-lg">MK Sigorta'nın hikayesi</p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Biz Kimiz?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              MK Sigorta, Antalya'da kurulmuş ve 15 yıldan fazla deneyime sahip güvenilir bir sigorta hizmeti sağlayıcısıdır. 
              Müşterilerimizin finansal güvenliği ve huzuru bizim en önemli önceliğimizdir.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Misyonumuz</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Her bireyin ve işletmenin hayatının her aşamasında güvenilir sigorta hizmetleri sunmak, 
              onların geleceğini korumak ve huzurlu bir yaşam sürmeleri için çalışmak.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Vizyonumuz</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Antalya'da ve Türkiye'de en güvenilir, en inovatif ve müşteri memnuniyeti yüksek sigorta şirketi olmak. 
              Teknoloji ve insan dokunuşunu birleştirerek hizmet kalitesini sürekli artırmak.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Değerlerimiz</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-gray-600"><strong>Güvenilirlik:</strong> Müşterilerimize her zaman doğru bilgi ve adil hizmet sunuyoruz.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-gray-600"><strong>Şeffaflık:</strong> Tüm işlemlerimiz açık, anlaşılır ve denetlenebilirdir.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-gray-600"><strong>İnovation:</strong> Teknoloji ve yeni çözümler ile hizmetlerimizi geliştirir, müşteri deneyimini artırırız.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-gray-600"><strong>Müşteri Odaklılık:</strong> Her müşteri için özel çözümler geliştiririz ve hızlı destek sağlarız.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Neden Bize Güvenebilirsiniz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '15+ Yıl Deneyim',
                  desc: 'Antalya ve çevresinde sunduğumuz güvenilir sigorta hizmetleri.',
                },
                {
                  title: '5000+ Müşteri',
                  desc: 'Memnun müşterilerimiz her gün bize güveniyor.',
                },
                {
                  title: '24/7 Destek',
                  desc: 'Acil durumlarda anında müşteri hizmetleri desteği sağlıyoruz.',
                },
              ].map((item, idx) => (
                <div key={idx} className="card p-8 text-center">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
