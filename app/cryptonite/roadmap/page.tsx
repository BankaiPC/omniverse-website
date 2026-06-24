import { cookies } from 'next/headers';
import RoadmapGateForm from './RoadmapGateForm';
import RoadmapContent from './RoadmapContent';

export const runtime = 'edge';

export default async function RoadmapPage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('cryptonite_roadmap_access')?.value === 'granted';

  if (!hasAccess) {
    return <RoadmapGateForm />;
  }

  return <RoadmapContent />;
}
