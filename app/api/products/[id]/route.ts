import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(
  _request: unknown,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('insurance_products')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'İç sunucu hatası' },
      { status: 500 }
    );
  }
}
