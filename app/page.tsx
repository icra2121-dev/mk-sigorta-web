import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Güvenilir Sigorta Çözümleri</h1>
              <p className="text-xl mb-8 text-blue-100">
                MK Sigorta ile sağlık, araç, ev, iş ve hayat sigortası al. Hızlı, güvenli ve uygun
                fiyatlı çözümler.
              </p>
              <Link href="/auth/login">
                <Button size="lg">
                  Başla
                </Button>
              </Link>
            </div>
            <div className="bg-blue-500 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl">🛡️</span>
                <p className="text-white mt-4">Sigorta Çözümleri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Ürünlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏥', title: 'Sağlık Sigortası', description: 'Kapsamlı sağlık sigortası' },
              { icon: '🚗', title: 'Araç Sigortası', description: 'Kasko ve Sorumluluk Sigortası' },
              { icon: '🏠', title: 'Ev Sigortası', description: 'Daireniz ve eşyalarınız korumalı' },
              { icon: '💼', title: 'İş Sigortası', description: 'İşletmeniz için sigorta paketleri' },
              { icon: '💝', title: 'Hayat Sigortası', description: 'Geleceğiniz güvende' },
              { icon: '🎓', title: 'Eğitim Sigortası', description: 'Çocuğunuzun eğitimi için' },
            ].map((product, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-5xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button>Tüm Ürünleri Gör</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Neden Biz?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: '⚡ Hızlı İşlem', description: '5 dakika içinde sigorta al' },
              { title: '💰 Uygun Fiyatlar', description: 'En rekabetçi fiyatlarla' },
              { title: '🛡️ Güvenli', description: '100% güvenli ve lisanslı' },
              { title: '📞 7/24 Destek', description: 'Her zaman yanınızda' },
            ].map((reason, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-8">Hemen Başlayın</h2>
          <p className="text-xl mb-8">5 dakika içinde sigorta al ve hemen koruma altına gir</p>
          <Link href="/auth/register">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Ücretsiz Teklif Al
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
