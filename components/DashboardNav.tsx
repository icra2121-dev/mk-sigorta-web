'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardNavProps {
  onLogout: () => Promise<void>;
}

export default function DashboardNav({ onLogout }: DashboardNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const links = [
    { href: '/dashboard', label: 'Anasayfa', icon: '🏠' },
    { href: '/dashboard/policies', label: 'Poliçelerim', icon: '📋' },
    { href: '/dashboard/claims', label: 'Tazminatlar', icon: '📝' },
    { href: '/dashboard/payments', label: 'Ödemeler', icon: '💳' },
    { href: '/dashboard/documents', label: 'Belgeler', icon: '📄' },
    { href: '/dashboard/profile', label: 'Profilim', icon: '👤' },
  ];

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <nav className="bg-white rounded-lg shadow-md p-4 mb-6 border-l-4 border-blue-600">
      <div className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg transition ${
              isActive(link.href)
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">{link.icon}</span>
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-700 transition text-left"
        >
          <span className="mr-2">🚪</span>
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
}
