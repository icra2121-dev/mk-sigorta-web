import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, full_name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email ve şifre gereklidir' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            full_name: full_name || '',
            user_type: 'customer',
            is_active: true,
          },
        ]);

      if (profileError) {
        return NextResponse.json(
          { error: 'Profil oluşturulamadı' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'İç sunucu hatası' },
      { status: 500 }
    );
  }
}
