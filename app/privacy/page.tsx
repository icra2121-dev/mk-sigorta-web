'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-primary text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-2">Gizlilik Politikası</h1>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-12">
          <div className="container max-w-3xl">
            <div className="prose max-w-none space-y-6 text-gray-600">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Veri Toplama</h2>
                <p>
                  MK Sigorta, hizmet sunabilmek için kişisel verilerinizi toplar. 
                  Toplanan veriler: ad, soyad, email, telefon, adres ve sigorta tercihleriniz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Verilerin Kullanımı</h2>
                <p>
                  Toplanan veriler şu amaçlarla kullanılır:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sigorta teklifleri oluşturmak</li>
                  <li>Poliçe yönetimi ve hizmet sağlamak</li>
                  <li>Müşteri desteği sunmak</li>
                  <li>İstatistiksel analiz yapmak</li>
                  <li>Yasal ve yasal gereklilikleri yerine getirmek</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Veri Güvenliği</h2>
                <p>
                  Verileriniz SSL şifreleme ve diğer güvenlik protokolleri ile korunmaktadır. 
                  MK Sigorta, en yüksek güvenlik standartlarını takip eder.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Çerezler (Cookies)</h2>
                <p>
                  Web sitesi, kullanıcı deneyimini iyileştirmek için çerezler kullanır. 
                  Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Üçüncü Taraflar</h2>
                <p>
                  Verileriniz, sigorta hizmetleri sağlamak amacıyla sadece gerekli üçüncü taraflara paylaşılır. 
                  Bu taraflar aynı gizlilik standartlarını uygulamaya tabi tutulur.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Haklarınız</h2>
                <p>
                  Aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Verilerinize erişim hakkı</li>
                  <li>Verileri düzeltme hakkı</li>
                  <li>Verileri silme hakkı</li>
                  <li>İşlemeyi durdurma hakkı</li>
                  <li>Verilerin taşınabilirliği hakkı</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">İletişim</h2>
                <p>
                  Gizlilik hakkında sorularınız varsa, lütfen privacy@mksigorta.dev adresine yazınız.
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
