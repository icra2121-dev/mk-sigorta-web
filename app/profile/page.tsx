'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Alert from '@/components/Alert';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  city?: string;
  address?: string;
  birth_date?: string;
  identity_number?: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/users/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setProfile(data.data);
            setFormData(data.data);
          }
        } catch (error) {
          console.error('Profil yüklenemedi:', error);
        } finally {
          setDataLoading(false);
        }
      };

      fetchProfile();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Profil güncellenemedi');

      const data = await response.json();
      setProfile(data.data);
      setAlert({ type: 'success', message: 'Profil başarıyla güncellendi!' });
      setEditing(false);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Bir hata oluştu',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Profil Ayarları</h1>
            <Button
              onClick={() => {
                if (editing) {
                  setFormData(profile || {});
                }
                setEditing(!editing);
              }}
            >
              {editing ? 'İptal' : 'Düzenle'}
            </Button>
          </div>

          {alert && (
            <div className="mb-6">
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            </div>
          )}

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doğum Tarihi
                </label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Identity Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kimlik Numarası
                </label>
                <input
                  type="text"
                  name="identity_number"
                  value={formData.identity_number || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <textarea
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Ad Soyad
                </label>
                <p className="text-lg font-semibold">{profile?.full_name || '-'}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  E-posta
                </label>
                <p className="text-lg font-semibold">{profile?.email || '-'}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Telefon
                </label>
                <p className="text-lg font-semibold">{profile?.phone || '-'}</p>
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Doğum Tarihi
                </label>
                <p className="text-lg font-semibold">
                  {profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString('tr-TR') : '-'}
                </p>
              </div>

              {/* Identity Number */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Kimlik Numarası
                </label>
                <p className="text-lg font-semibold">{profile?.identity_number || '-'}</p>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Şehir
                </label>
                <p className="text-lg font-semibold">{profile?.city || '-'}</p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Adres
                </label>
                <p className="text-lg font-semibold">{profile?.address || '-'}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
