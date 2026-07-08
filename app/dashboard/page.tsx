'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

interface Quote {
  id: string;
  quote_number: string;
  insurance_products: { name: string };
  monthly_premium: number;
  status: string;
  created_at: string;
}

interface Policy {
  id: string;
  policy_number: string;
  insurance_products: { name: string };
  monthly_premium: number;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'quotes' | 'policies'>('quotes');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const [quotesRes, policiesRes] = await Promise.all([
            fetch(`/api/quotes?user_id=${user.id}`),
            fetch(`/api/policies?user_id=${user.id}`),
          ]);

          if (quotesRes.ok) {
            const quotesData = await quotesRes.json();
            setQuotes(quotesData.data || []);
          }

          if (policiesRes.ok) {
            const policiesData = await policiesRes.json();
            setPolicies(policiesData.data || []);
          }
        } catch (error) {
          console.error('Veri yüklenemedi:', error);
        } finally {
          setDataLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Welcome Card */}
        <Card className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Hoş Geldiniz, {user.full_name || user.email}</h1>
              <p className="text-gray-600">Sigorta poliçelerinizi ve tekliflerinizi yönetin</p>
            </div>
            <Link href="/quotes">
              <Button>Yeni Teklif Al</Button>
            </Link>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'quotes'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Teklifler ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'policies'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Poliçeler ({policies.length})
          </button>
        </div>

        {/* Content */}
        {dataLoading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        ) : activeTab === 'quotes' ? (
          <div className="space-y-4">
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <Card key={quote.id} className="flex justify-between items-center hover:shadow-lg transition">
                  <div>
                    <p className="font-bold">{quote.quote_number}</p>
                    <p className="text-gray-600">{quote.insurance_products?.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(quote.created_at).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      ₺{quote.monthly_premium?.toLocaleString('tr-TR')}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      quote.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                    >
                      {quote.status === 'draft' ? 'Taslak' : 'Onaylı'}
                    </span>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="text-center py-20">
                <p className="text-gray-600 mb-6">Henüz teklif yok</p>
                <Link href="/quotes">
                  <Button>İlk Teklifinizi Oluşturun</Button>
                </Link>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {policies.length > 0 ? (
              policies.map((policy) => (
                <Card key={policy.id} className="flex justify-between items-center hover:shadow-lg transition">
                  <div>
                    <p className="font-bold">{policy.policy_number}</p>
                    <p className="text-gray-600">{policy.insurance_products?.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(policy.created_at).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      ₺{policy.monthly_premium?.toLocaleString('tr-TR')}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="text-center py-20">
                <p className="text-gray-600 mb-6">Henüz poliçe yok</p>
                <Link href="/quotes">
                  <Button>Sigorta Sözleşmesine Başlayın</Button>
                </Link>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
