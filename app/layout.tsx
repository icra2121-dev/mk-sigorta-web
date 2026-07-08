import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MK Sigorta - Antalya Sigortacılık Hizmetleri',
  description: 'Sağlık, araç, ev, iş, seyahat ve tüm sigorta ürünleri için güvenilir çözümler. Antalya\'da 24/7 sigorta hizmetleri.',
  keywords: 'sigorta, sağlık sigortası, araç sigortası, ev sigortası, iş sigortası, Antalya',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
