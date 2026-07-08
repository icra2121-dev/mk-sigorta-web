'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { user, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">MK</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">MK Sigorta</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Anasayfa
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              Ürünler
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              İletişim
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      Panelim
                    </Link>
                    <button
                      onClick={logout}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Çıkış
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      Giriş
                    </Link>
                    <Link
                      href="/register"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Kayıt
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-gray-700"></span>
            <span className="w-6 h-0.5 bg-gray-700"></span>
            <span className="w-6 h-0.5 bg-gray-700"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">
              Anasayfa
            </Link>
            <Link href="/products" className="block py-2 text-gray-700 hover:text-blue-600">
              Ürünler
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-blue-600">
              Hakkımızda
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600">
              İletişim
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
