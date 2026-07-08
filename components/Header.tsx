'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container flex justify-between items-center h-16">
        <Link href="/" className="font-bold text-2xl text-primary">
          MK Sigorta
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-primary transition">
            Anasayfa
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-primary transition">
            Ürünler
          </Link>
          <Link href="/quote" className="text-gray-700 hover:text-primary transition">
            Teklif Al
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary transition">
            İletişim
          </Link>
          <Link href="/dashboard" className="btn-primary">
            Giriş Yap
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Anasayfa
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary">
              Ürünler
            </Link>
            <Link href="/quote" className="text-gray-700 hover:text-primary">
              Teklif Al
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary">
              İletişim
            </Link>
            <Link href="/dashboard" className="btn-primary w-full text-center">
              Giriş Yap
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
