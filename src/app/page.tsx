import { RESORTS } from '@/lib/resorts_data';
import Dashboard from '@/components/Dashboard';

// 1時間ごとに再検証
export const revalidate = 3600;

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--dq-bg)' }}>
      <Dashboard initialResorts={RESORTS} />
    </main>
  );
}
