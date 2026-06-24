import { cookies } from 'next/headers';
import GateForm from '../GateForm';
import RoadmapContent from './RoadmapContent';

export const runtime = 'edge';

export default async function RoadmapPage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('cryptonite_access')?.value === 'granted';

  if (!hasAccess) {
    return <GateForm />;
  }

  return <RoadmapContent />;
}
