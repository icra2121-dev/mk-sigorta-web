import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Zorunlu alanları doldurunuz' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject,
          message,
          status: 'new',
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

    return NextResponse.json({ data, message: 'Mesajınız başarıyla gönderildi' });
  } catch (error) {
    return NextResponse.json(
      { error: 'İç sunucu hatası' },
      { status: 500 }
    );
  }
}
