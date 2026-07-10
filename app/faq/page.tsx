'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import { ChevronDown, Search } from 'lucide-react';

interface FAQItem {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const faqData: FAQItem[] = [
    {
      category: 'Genel Sorular',
      questions: [
        {
          question: 'MK Sigorta nedir?',
          answer: 'MK Sigorta, Antalya\'da kurulmuş ve 15 yıldan fazla deneyime sahip güvenilir bir sigorta şirketi. Müşterilerimizin finansal güvenliği ve huzuru bizim en önemli önceliğimiz. Sağlık, otomotiv, konut ve ticari sigortada kapsamlı hizmetler sunuyoruz.',
        },
        {
          question: 'MK Sigorta ile sigorta yaptırmak güvenli mi?',
          answer: 'Evet, tamamen güvenlidir. MK Sigorta, Türkiye\'nin düzenleyici kurumları tarafından denetlenen ve lisanslı bir sigorta şirketidir. Tüm operasyonlarımız yasalar çerçevesinde yürütülür ve müşteri verileriniz güvenli sunucularda saklanır.',
        },
        {
          question: 'Şirkette kaç yıl deneyim var?',
          answer: '15 yıldan fazla deneyime sahip olup, 5000\'den fazla memnun müşteriye hizmet vermekteyiz. Bu deneyim sayesinde müşteri ihtiyaçlarını en iyi şekilde karşılamakta uzmanız.',
        },
      ],
    },
    {
      category: 'Sigorta Ürünleri',
      questions: [
        {
          question: 'Hangi tür sigortalar sunuluyor?',
          answer: 'Sağlık Sigortası, Otomotiv (Araç) Sigortası, Konut (Ev) Sigortası, Ticari (İş) Sigortası ve Hayat Sigortası sunmaktayız. Her kategoride müşterilerimizin ihtiyaçlarına uygun farklı paketler bulunmaktadır.',
        },
        {
          question: 'Sağlık sigortası ne kapsar?',
          answer: 'Sağlık sigortasında doktor muayenesi, ilaç giderleri, hastane yatışı ve acil müdahale masrafları kapsamında tutulur. Ayrıntılı bilgi için web sitemizdeki ürün sayfasından teklif alabilirsiniz.',
        },
        {
          question: 'Otomotiv sigortası fiyatlarında indirim var mı?',
          answer: 'Evet, çeşitli indirim seçeneklerimiz bulunmaktadır. Yıllık ödeme, çoklu sigorta paketleri ve iyi sürücü indirimlerinden yararlanabilirsiniz. Detaylı bilgi için danışmanlarımızla iletişime geçiniz.',
        },
        {
          question: 'Poliçe iptal edebilir miyim?',
          answer: 'Evet, poliçe iptal edilebilir. Çoğu poliçede, sigorta başladıktan sonra ilk 14 gün içinde hiçbir ceza olmaksızın iptal hakkınız bulunmaktadır. Detaylar için poliçe şartlarını inceleyiniz.',
        },
      ],
    },
    {
      category: 'Teklif ve Satın Alma',
      questions: [
        {
          question: 'Teklif almak ne kadar sürer?',
          answer: 'Çevrimiçi teklif talebiniz dakikalar içinde işlenir ve size sunulur. Basit bilgiler doldurmak yeterlidir. Acil durumlarda telefonla da teklif alabilirsiniz.',
        },
        {
          question: 'Teklif almak ücretsiz mi?',
          answer: 'Evet, tamamen ücretsizdir. Teklif alabilir, karşılaştırabilir ve en uygun olanı seçebilirsiniz. Herhangi bir zorunluluk bulunmamaktadır.',
        },
        {
          question: 'Sigorta poliçesi ne zaman başlar?',
          answer: 'Poliçe, tarafınızca imzalandıktan ve prim ödemesi yapıldıktan sonra hemen geçerli hale gelir. Digitally imzalanan poliçeler anında aktif olur.',
        },
        {
          question: 'Ödeme seçenekleri nelerdir?',
          answer: 'Kredi kartı, banka transferi, EFT ve taksitli ödeme seçenekleri sunmaktayız. Taksitli ödeme seçeneğinde %0 faiz seçenekleri de bulunmaktadır.',
        },
      ],
    },
    {
      category: 'Hasar İşlemleri',
      questions: [
        {
          question: 'Hasar talebinde bulunmak için ne yapmalıyım?',
          answer: '7/24 hasar hattımızı arayarak, web sitesi üzerinden veya mobil uygulamamız kullanarak hasar talebinde bulunabilirsiniz. Mümkün olan en kısa sürede eksper göndeririz.',
        },
        {
          question: 'Hasar talebinde hangi belgeler gerekli?',
          answer: 'Hasarın türüne göre değişmek üzere, poliçe numarası, kimlik fotokopisi, hasara ilişkin fotoğraflar ve ilgili raporlar gerekmektedir. Detaylı listeyi danışmanlarımızdan alabilirsiniz.',
        },
        {
          question: 'Hasar talebinin sonuçlanması ne kadar sürer?',
          answer: 'Basit hasar talepleri 24-48 saat içinde, karmaşık taleplerse 5-10 iş gün içinde sonuçlandırılır. Eksper raporu alındığında tarafınıza bildirilir.',
        },
        {
          question: 'Hasar talebi reddedilebilir mi?',
          answer: 'Poliçe koşullarına uygun hasar talepleri reddedilmez. Ancak poliçe dışı durumlar, ihmal veya kasıtlı hasarlar kapsam dışındadır. Detaylı bilgi için poliçe şartlarını inceleyiniz.',
        },
      ],
    },
    {
      category: 'Poliçe Yönetimi',
      questions: [
        {
          question: 'Poliçeyi nasıl güncelleyebilirim?',
          answer: 'Web sitesi hesabınızdan, mobil uygulamadan veya müşteri hizmetleri ekibine başvurarak poliçenizi güncelleyebilirsiniz. Değişiklikler hemen etkili olur.',
        },
        {
          question: 'Poliçe belgelerini tekrar alabilir miyim?',
          answer: 'Evet, web sitesi hesabınızdan veya mobil uygulamadan poliçe belgelerinizi PDF olarak indirebilirsiniz. İhtiyaç durumunda e-posta ile de gönderilebilir.',
        },
        {
          question: 'Poliçe yenileme (renewal) nasıl yapılır?',
          answer: 'Poliçe bitiş tarihi yaklaştığında size uyarı gönderilir. Yenilemek için web sitesinden, uygulamadan veya telefonla başvuru yapabilirsiniz. Otomatik renewal seçeneği de bulunmaktadır.',
        },
        {
          question: 'Birden fazla poliçe alabilir miyim?',
          answer: 'Evet, birden fazla sigorta türü için poliçe alabilirsiniz. Çoklu sigorta paketlerinde ek indirimler uygulanmaktadır.',
        },
      ],
    },
    {
      category: 'Müşteri Hizmetleri',
      questions: [
        {
          question: 'Müşteri hizmetleri saatleri nedir?',
          answer: 'Pazartesi-Cuma 09:00-18:00 saatleri arasında hizmet vermekteyiz. Acil hasar taleplerinde 7/24 destek bulunmaktadır.',
        },
        {
          question: 'Danışmanla görüşmek için nasıl iletişime geçebilirim?',
          answer: 'Telefonla, e-posta ile, web sitesi üzerinden veya doğrudan ofisimize gelerek görüşmeler yapabilirsiniz. Randevu almak için web sitesini kullanabilirsiniz.',
        },
        {
          question: 'Müşteri memnuniyet anketi nasıl doldururum?',
          answer: 'Her işlem sonrası size anket linki gönderilir. Bu anketler bize değer katarak hizmet kalitemizi artırmamıza yardımcı olur.',
        },
        {
          question: 'Şikayetim varsa ne yapmalıyım?',
          answer: 'Şikayetinizi web sitesinden, e-posta ile veya doğrudan müşteri hizmetlerine iletebilirsiniz. Tüm şikayetler ciddi şekilde değerlendirilir ve 30 gün içinde yanıtlanır.',
        },
      ],
    },
  ];

  const filteredFAQ = selectedCategory
    ? faqData.filter(item => item.category === selectedCategory)
    : faqData;

  const searchedFAQ = filteredFAQ.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-4">Sık Sorulan Sorular</h1>
          <p className="text-xl text-blue-100">
            Sigorta hakkında merak ettiğiniz her şeyin cevabını burada bulabilirsiniz
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-20">
        {/* Search Bar */}
        <Card className="mb-12">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Soru arayın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </Card>

        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Kategoriler</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
              }`}
            >
              Tümü
            </button>
            {faqData.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        {searchedFAQ.length > 0 ? (
          <div className="space-y-4">
            {searchedFAQ.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-bold mb-4 text-gray-700">{category.category}</h3>
                <div className="space-y-4 mb-8">
                  {category.questions.map((item, idx) => {
                    const itemId = `${category.category}-${idx}`;
                    return (
                      <div
                        key={itemId}
                        className="cursor-pointer hover:shadow-lg transition"
                        onClick={() => toggleExpanded(itemId)}
                      >
                        <Card className="h-full">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-gray-800">
                                {item.question}
                              </h4>
                              {expandedId === itemId && (
                                <p className="text-gray-600 mt-3 leading-relaxed">
                                  {item.answer}
                                </p>
                              )}
                            </div>
                            <ChevronDown
                              size={24}
                              className={`text-blue-600 flex-shrink-0 transition ${
                                expandedId === itemId ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aradığınız konu bulunamadı. Lütfen başka bir arama yapın veya müşteri hizmetlerine başvurun.
            </p>
          </Card>
        )}

        {/* Contact CTA */}
        <Card className="mt-12 bg-blue-50 border-l-4 border-blue-600">
          <h3 className="text-xl font-bold mb-2">Sorunuza Cevap Bulamadınız mı?</h3>
          <p className="text-gray-600 mb-4">
            Sorularınız için müşteri hizmetleri ekibimiz 7/24 sizin hizmetinizde.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="tel:+902425XXXXXX"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Bizi Arayın
            </a>
            <a
              href="mailto:destek@mksigorta.com"
              className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              E-posta Gönderin
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
