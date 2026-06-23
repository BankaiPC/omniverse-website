'use server';

import { cookies } from 'next/headers';

const GATE_PASSWORD = process.env.CRYPTONITE_GATE_PASSWORD || 'xcn-preview-2026';

export type GateState = { error?: string };

export async function checkPassword(
  _prevState: GateState,
  formData: FormData
): Promise<GateState> {
  const password = formData.get('password');

  if (typeof password !== 'string' || password !== GATE_PASSWORD) {
    return { error: 'Contraseña incorrecta.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('cryptonite_access', 'granted', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/cryptonite',
  });

  return {};
}
