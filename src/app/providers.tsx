'use client';

import { SeasonProvider } from '@/lib/season';
import { ReactNode } from 'react';

// Next.js の layout.tsx は Server Component のため、
// Client Component のプロバイダーを別ファイルに分離する
export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SeasonProvider>
            {children}
        </SeasonProvider>
    );
}
