import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, policy_id, claim_date, description, amount_claimed } = body;

    if (!user_id || !policy_id) {
      return NextResponse.json(
        { error: 'Kullanıcı kimliği ve poliçe kimliği gereklidir' },
        { status: 400 }
      );
    }

    const claimNumber = `CL-${Date.now()}`;
    const { data, error } = await supabase
      .from('claims')
      .insert([
        {
          user_id,
          policy_id,
          claim_number: claimNumber,
          claim_date,
          description,
          amount_claimed,
          status: 'pending',
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
      .from('claims')
      .select('*, policies(*)')
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
