'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, getUserClaims } from '@/lib/api';
import { Claim } from '@/types';
import Link from 'next/link';

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const userClaims = await getUserClaims(user.id);
          setClaims(userClaims);
        }
      } catch (error) {
        console.error('Error fetching claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      case 'paid':
        return 'Ödendi';
      case 'pending':
        return 'Beklemede';
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Tazminat Talepleri</h1>
        <Link href="/dashboard/claims/new" className="btn-primary">
          Yeni Talep
        </Link>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : claims.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600 mb-4">Henüz tazminat talebiniz yok.</p>
          <Link href="/dashboard/claims/new" className="btn-primary inline-block">
            Talep Oluştur
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim.id} className="card p-6 flex items-center justify-between hover:shadow-lg transition">
              <div>
                <h3 className="font-bold text-lg mb-2">{claim.claim_number}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Talep Tarihi: {claim.claim_date ? new Date(claim.claim_date).toLocaleDateString('tr-TR') : '-'}</p>
                  <p>Talep Tutar: ₺{claim.amount_claimed?.toLocaleString('tr-TR') || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(claim.status)}`}>
                  {getStatusText(claim.status)}
                </span>
                <Link href={`/dashboard/claims/${claim.id}`} className="btn-outline">
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
