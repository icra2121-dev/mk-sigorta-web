'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">MK</span>
              </div>
              <span className="font-bold text-white">MK Sigorta</span>
            </div>
            <p className="text-sm">Türkiye'nin en güvenilir sigorta şirketi</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Ürünler
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-4">Ürünler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=sağlık" className="hover:text-white transition">
                  Sağlık Sigortası
                </Link>
              </li>
              <li>
                <Link href="/products?category=araç" className="hover:text-white transition">
                  Araç Sigortası
                </Link>
              </li>
              <li>
                <Link href="/products?category=ev" className="hover:text-white transition">
                  Ev Sigortası
                </Link>
              </li>
              <li>
                <Link href="/products?category=hayat" className="hover:text-white transition">
                  Hayat Sigortası
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Yasal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  İletişim Bilgileri
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {currentYear} MK Sigorta. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
