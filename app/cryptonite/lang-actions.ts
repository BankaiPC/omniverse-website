'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function setCryptoniteLanguage(lang: string) {
  const cookieStore = await cookies();
  cookieStore.set('cryptonite_lang', lang, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/cryptonite',
  });
  revalidatePath('/cryptonite');
}
