'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-primary text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-2">Kullanım Şartları</h1>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-12">
          <div className="container max-w-3xl">
            <div className="prose max-w-none space-y-6 text-gray-600">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Hizmet Tanımı</h2>
                <p>
                  MK Sigorta web sitesi, müşterilerimize sigorta ürünleri, teklif ve poliçe yönetimi hizmetleri sunmaktadır. 
                  Site üzerinden sağlanan tüm hizmetler "olduğu gibi" sunulmaktadır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Kullanıcı Sorumlulukları</h2>
                <p>
                  Kullanıcılar, sisteme girdikleri bilgilerin doğru, güncel ve tam olmasından sorumludur. 
                  Yanlış veya eksik bilgi nedeniyle oluşan sorunlardan MK Sigorta sorumlu tutulamaz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Gizlilik ve Veri Koruma</h2>
                <p>
                  Tüm kişisel veriler GDPR ve Türkiye Veri Koruma Kanunu uyarınca korunmaktadır. 
                  Verileriniz üçüncü taraflarla onayınız olmaksızın paylaşılmaz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Fikri Mülkiyet Hakları</h2>
                <p>
                  Web sitesinde yer alan tüm içerik, görsel, metin ve tasarımlar MK Sigorta'ya aittir. 
                  İzin olmaksızın kopyalanması, dağıtılması veya değiştirilmesi yasaktır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Yasal Uyumluluk</h2>
                <p>
                  Bu sitede sunulan bilgiler genel amaçlıdır ve yasal tavsiye değildir. 
                  Sigorta ürünleri satın almadan önce Gümrük Müsteşarlığı'nın kurallarını kontrol ediniz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Sorumluluk Sınırı</h2>
                <p>
                  MK Sigorta, sitede sunulan bilgilerin doğruluğu, eksiksizliği veya güvenliğine dair 
                  hiçbir garanti vermez. Site kullanımından doğan tüm sonuçlar sizin sorumluluğunuzdadır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Değişiklikler</h2>
                <p>
                  MK Sigorta, bu şartları önceden bildirim yaparak değiştirme hakkını saklı tutar. 
                  Devam eden kullanım, yeni şartları kabul ettiğiniz anlamına gelir.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">8. İletişim</h2>
                <p>
                  Bu şartlar hakkında sorularınız varsa, lütfen info@mksigorta.dev adresine yazınız.
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
