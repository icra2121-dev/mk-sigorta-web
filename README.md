# MK Sigorta Web Uygulaması

Antalya'da sigorta hizmetleri sunan modern ve güvenilir web uygulaması.

## 🚀 Başlarken

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı

### Kurulum

```bash
# Depoyu klonla
git clone https://github.com/yourusername/mk-sigorta-web.git
cd mk-sigorta-web

# Bağımlılıkları yükle
npm install

# .env.local dosyası oluştur
cp .env.example .env.local

# Supabase kimlik bilgilerini ekle
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY

# Geliştirme sunucusunu başlat
npm run dev
```

### Tarayıcıda Aç
[http://localhost:3000](http://localhost:3000)

## 📁 Proje Yapısı

```
mk-sigorta-web/
├── app/                    # Next.js sayfa ve layout'ları
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Anasayfa
│   ├── products/          # Ürünler sayfası
│   ├── quote/             # Teklif sayfası
│   ├── contact/           # İletişim sayfası
│   ├── dashboard/         # Kullanıcı paneli
│   ├── login/             # Giriş sayfası
│   ├── register/          # Kayıt sayfası
│   ├── forgot-password/   # Şifre sıfırlama
│   ├── about/             # Hakkında sayfası
│   ├── terms/             # Kullanım şartları
│   ├── privacy/           # Gizlilik politikası
│   └── globals.css        # Global stiller
├── components/            # Yeniden kullanılabilir bileşenler
│   ├── Header.tsx         # Başlık
│   ├── Footer.tsx         # Altbilgi
│   └── DashboardNav.tsx   # Dashboard navigasyon
├── lib/                   # Yardımcı fonksiyonlar
│   ├── supabase.ts        # Supabase istemcisi
│   └── api.ts             # API fonksiyonları
├── types/                 # TypeScript tür tanımları
│   └── index.ts           # Tüm tipler
├── sql/                   # Veritabanı şemaları
│   └── schema.sql         # PostgreSQL şeması
├── public/                # Statik dosyalar
├── .env.example           # Ortam değişkenleri örneği
├── package.json           # Proje bağımlılıkları
├── tsconfig.json          # TypeScript yapılandırması
├── tailwind.config.js     # Tailwind CSS yapılandırması
├── postcss.config.js      # PostCSS yapılandırması
└── README.md              # Bu dosya
```

## 🛠️ Kullanılan Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Stil framework'ü
- **Supabase** - Backend ve veritabanı
- **React Hook Form** - Form yönetimi
- **Zod** - Schema validasyon
- **Lucide React** - İkonlar

## 📋 Özellikler

- ✅ Anasayfa ve ürün listesi
- ✅ Teklif sistemi
- ✅ Kullanıcı kimlik doğrulama (signup/login)
- ✅ Kullanıcı paneli (dashboard)
- ✅ Poliçe yönetimi
- ✅ Tazminat talep sistemi
- ✅ Ödeme geçmişi
- ✅ İletişim formu
- ✅ Duyarlı tasarım (responsive)
- ✅ Türkçe dil desteği

## 🔐 Güvenlik

- Row Level Security (RLS) etkinleştirilmiş
- HTTPS şifrelemesi
- GDPR uyumlu
- Güvenli parola yönetimi

## 📧 İletişim

info@mksigorta.dev

## 📄 Lisans

MIT License
