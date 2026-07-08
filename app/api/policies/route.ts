import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_id,
      quote_id,
      product_id,
      coverage_amount,
      monthly_premium,
      annual_premium,
      start_date,
      end_date,
      details,
    } = body;

    if (!user_id || !product_id) {
      return NextResponse.json(
        { error: 'Kullanıcı kimliği ve ürün kimliği gereklidir' },
        { status: 400 }
      );
    }

    const policyNumber = `PO-${Date.now()}`;
    const { data, error } = await supabase
      .from('policies')
      .insert([
        {
          user_id,
          product_id,
          quote_id,
          policy_number: policyNumber,
          coverage_amount,
          monthly_premium,
          annual_premium,
          start_date,
          end_date,
          details: details || {},
          status: 'active',
          auto_renew: true,
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
      .from('policies')
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
