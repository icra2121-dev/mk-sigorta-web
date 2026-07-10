import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'MK Sigorta - Güvenilir Sigorta Çözümleri',
  description:
    'MK Sigorta ile sağlık, araç, ev, iş ve hayat sigortası alın. Hızlı, güvenli ve uygun fiyatlı sigorta çözümleri.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
