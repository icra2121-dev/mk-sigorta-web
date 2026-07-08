'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, getUserPayments } from '@/lib/api';
import { Payment } from '@/types';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const userPayments = await getUserPayments(user.id);
          setPayments(userPayments);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'failed':
        return 'Başarısız';
      case 'pending':
        return 'Beklemede';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Ödeme Geçmişi</h1>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : payments.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600">Henüz ödemeniz yok.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-bold">Tarih</th>
                <th className="text-left py-4 px-4 font-bold">Tutar</th>
                <th className="text-left py-4 px-4 font-bold">Ödeme Yöntemi</th>
                <th className="text-left py-4 px-4 font-bold">Durumu</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString('tr-TR') : '-'}
                  </td>
                  <td className="py-4 px-4 font-semibold">₺{payment.amount.toLocaleString('tr-TR')}</td>
                  <td className="py-4 px-4">{payment.payment_method || '-'}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
