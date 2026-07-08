'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, getUserPolicies } from '@/lib/api';
import { Policy } from '@/types';
import Link from 'next/link';

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const userPolicies = await getUserPolicies(user.id);
          setPolicies(userPolicies);
        }
      } catch (error) {
        console.error('Error fetching policies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'expired':
        return 'Süresi Doldu';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Poliçelerim</h1>
        <Link href="/quote" className="btn-primary">
          Yeni Poliçe Al
        </Link>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : policies.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600 mb-4">Henüz poliçeniz yok.</p>
          <Link href="/quote" className="btn-primary inline-block">
            Teklif Al
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {policies.map((policy) => (
            <div key={policy.id} className="card p-6 flex items-center justify-between hover:shadow-lg transition">
              <div>
                <h3 className="font-bold text-lg mb-2">{policy.policy_number}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>İniş Tarihi: {policy.start_date ? new Date(policy.start_date).toLocaleDateString('tr-TR') : '-'}</p>
                  <p>Yıllık Prim: ₺{policy.annual_premium?.toLocaleString('tr-TR') || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(policy.status)}`}>
                  {getStatusText(policy.status)}
                </span>
                <Link href={`/dashboard/policies/${policy.id}`} className="btn-outline">
                  Detaylar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
