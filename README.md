# MK Sigorta - Sigortacılık Web Sitesi

Modern ve kullanıcı dostu sigortacılık web platformu.

## 🚀 Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Veritabanı**: Supabase (PostgreSQL)
- **Barındırma**: Vercel
- **Domain**: mksigorta.dev

## 📋 Özellikler

- ✅ Sigorta ürün kataloğu
- ✅ Online teklif sistemi
- ✅ Müşteri hesapları (Giriş/Kayıt)
- ✅ Admin paneli
- ✅ Hızlı iletişim formu
- ✅ Tüm sigorta türleri (Sağlık, Araç, Ev, İş, Seyahat, vb.)
- ✅ Türkçe dil desteği

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/icra2121-dev/mk-sigorta-web.git
cd mk-sigorta-web
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **`.env.local` dosyasını oluşturun**
```bash
cp .env.example .env.local
```

4. **Supabase ayarlarını yapılandırın**
   - [Supabase](https://supabase.com) hesabı oluşturun
   - Yeni proje oluşturun
   - API anahtarlarını `.env.local` dosyasına ekleyin

5. **Veritabanını hazırlayın**
```bash
# Supabase dashboard'dan SQL sorgusu çalıştırın
# (sql/schema.sql dosyasına bakın)
```

6. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Tarayıcınızda açın: `http://localhost:3000`

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router
├── components/             # React bileşenleri
├── pages/                  # API routes
├── lib/                    # Yardımcı fonksiyonlar
├── types/                  # TypeScript tipleri
├── public/                 # Statik dosyalar
├── sql/                    # Veritabanı şemaları
└── README.md
```

## 🔐 Güvenlik

- PostgreSQL ile şifreler hash'leniyor
- JWT token doğrulaması
- CORS ayarları yapılandırıldı
- Çevresel değişkenler korunuyor

## 📞 İletişim

**MK Sigorta**
- 📧 Email: info@mksigorta.dev
- 🌐 Website: mksigorta.dev
- 📍 Antalya, Türkiye

## 📄 Lisans

Private Project - MK Sigorta

## 👨‍💻 Geliştirici

Copilot by GitHub
