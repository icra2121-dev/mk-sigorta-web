'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, getUserProfile } from '@/lib/api';
import { User } from '@/types';

export default function DashboardPage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const userProfile = await getUserProfile(user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Pano</h1>

      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Profile Card */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4">Profil Bilgileri</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Ad Soyad</p>
                <p className="font-semibold">{profile.full_name || 'Ayarlanmadı'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefon</p>
                <p className="font-semibold">{profile.phone || 'Ayarlanmadı'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Şehir</p>
                <p className="font-semibold">{profile.city || 'Ayarlanmadı'}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="card p-6">
              <p className="text-sm text-gray-600 mb-2">Aktif Poliçeler</p>
              <p className="text-4xl font-bold text-primary">0</p>
            </div>
            <div className="card p-6">
              <p className="text-sm text-gray-600 mb-2">Beklemede Talepte</p>
              <p className="text-4xl font-bold text-secondary">0</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold mb-6">Son İşlemler</h2>
        <p className="text-gray-600">Henüz işlem yok.</p>
      </div>
    </div>
  );
}
