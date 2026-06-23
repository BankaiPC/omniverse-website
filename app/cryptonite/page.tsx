import { cookies } from 'next/headers';
import GateForm from './GateForm';
import CryptoniteContent from './CryptoniteContent';

export const runtime = 'edge';

export default async function CryptonitePage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('cryptonite_access')?.value === 'granted';

  if (!hasAccess) {
    return <GateForm />;
  }

  return <CryptoniteContent />;
}
