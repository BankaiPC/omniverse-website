'use server';

import { cookies } from 'next/headers';

const ROADMAP_PASSWORD =
  process.env.CRYPTONITE_ROADMAP_PASSWORD || 'omniverse-roadmap-2026';

export type GateState = { error?: string };

export async function checkRoadmapPassword(
  _prevState: GateState,
  formData: FormData
): Promise<GateState> {
  const password = formData.get('password');

  if (typeof password !== 'string' || password !== ROADMAP_PASSWORD) {
    return { error: 'Contraseña incorrecta.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('cryptonite_roadmap_access', 'granted', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/cryptonite/roadmap',
  });

  return {};
}
