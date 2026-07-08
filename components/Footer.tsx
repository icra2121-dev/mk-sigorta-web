'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">MK Sigorta</h3>
            <p className="text-gray-400">Antalya'da güvenilir sigorta hizmetleri sunan lider kuruluş.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition">Anasayfa</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Ürünler</Link></li>
              <li><Link href="/quote" className="hover:text-white transition">Teklif Al</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Hakkımızda</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">Sigorta Ürünleri</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products?category=sağlık" className="hover:text-white transition">Sağlık Sigortası</Link></li>
              <li><Link href="/products?category=araç" className="hover:text-white transition">Araç Sigortası</Link></li>
              <li><Link href="/products?category=ev" className="hover:text-white transition">Ev Sigortası</Link></li>
              <li><Link href="/products?category=iş" className="hover:text-white transition">İş Sigortası</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">İletişim</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex gap-2">
                <Phone size={18} />
                <span>+90 (242) XXX XX XX</span>
              </li>
              <li className="flex gap-2">
                <Mail size={18} />
                <span>info@mksigorta.dev</span>
              </li>
              <li className="flex gap-2">
                <MapPin size={18} />
                <span>Antalya, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; {currentYear} MK Sigorta. Tüm hakları saklıdır.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition">Gizlilik Politikası</Link>
              <Link href="/terms" className="hover:text-white transition">Kullanım Şartları</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
