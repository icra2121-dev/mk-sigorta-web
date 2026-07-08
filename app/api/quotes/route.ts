import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, product_id, coverage_amount, monthly_premium, annual_premium, details } = body;

    if (!user_id || !product_id) {
      return NextResponse.json(
        { error: 'Kullanıcı kimliği ve ürün kimliği gereklidir' },
        { status: 400 }
      );
    }

    const quoteNumber = `QT-${Date.now()}`;
    const { data, error } = await supabase
      .from('quotes')
      .insert([
        {
          user_id,
          product_id,
          quote_number: quoteNumber,
          coverage_amount,
          monthly_premium,
          annual_premium,
          details: details || {},
          status: 'draft',
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Kullanıcı kimliği gereklidir' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('quotes')
      .select('*, insurance_products(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
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
