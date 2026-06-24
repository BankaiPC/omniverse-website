import { cookies } from 'next/headers';
import GateForm from './GateForm';
import InvestorsContent from './InvestorsContent';

export const runtime = 'edge';

export default async function InversoresPage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('investors_access')?.value === 'granted';

  if (!hasAccess) {
    return <GateForm />;
  }

  return <InvestorsContent />;
}
