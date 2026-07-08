'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, AlertCircle, CreditCard, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface DashboardNavProps {
  onLogout: () => void;
}

export default function DashboardNav({ onLogout }: DashboardNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  const navItems = [
    { href: '/dashboard', label: 'Pano', icon: LayoutDashboard },
    { href: '/dashboard/policies', label: 'Poliçelerim', icon: FileText },
    { href: '/dashboard/claims', label: 'Tazminat Talepleri', icon: AlertCircle },
    { href: '/dashboard/payments', label: 'Ödemeler', icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-20 left-4 md:hidden z-40 bg-primary text-white p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-16 h-screen w-64 bg-gray-900 text-white p-6 transform transition-transform md:translate-x-0 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Panel</h2>
        </div>

        <nav className="space-y-2 mb-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => {
            setIsOpen(false);
            onLogout();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-900 rounded-lg transition"
        >
          <LogOut size={20} />
          <span>Çıkış Yap</span>
        </button>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
