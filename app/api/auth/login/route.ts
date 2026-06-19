import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    let isValid = false;

    // 1. Check against environment variables
    if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
      isValid = true;
    } else {
      // 2. Fallback to database check
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (admin && admin.hashed_password) {
        isValid = await bcrypt.compare(password, admin.hashed_password);
      }
    }

    if (!isValid) {
      return NextResponse.json({ detail: 'Invalid email or password' }, { status: 401 });
    }

    // Create JWT token
    const secret = new TextEncoder().encode(
      process.env.SECRET_KEY || 'supersecretkey1234567890abcdefghijklmnopqrstuvwxyz'
    );
    const token = await new SignJWT({ sub: email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    // Set HttpOnly cookie
    const response = NextResponse.json({ 
      status: 'success', 
      message: 'Logged in successfully', 
      token 
    });
    
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
