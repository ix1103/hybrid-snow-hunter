'use client';

import { SpotWithWeather } from '@/lib/spot_types';

// --- アクションボタン ---
interface ModalActionsProps {
    resort: SpotWithWeather;
    isSummer: boolean;
}

export default function ModalActions({ resort, isSummer }: ModalActionsProps) {
    // 公式サイトURL（季節対応）
    const officialUrl = isSummer
        ? (resort.summer_url || resort.url)
        : resort.url;
    const officialUrlLabel = isSummer ? '🌿 なつのこうしきサイトへ' : '⛷ こうしきサイトへ';

    return (
        <div style={{
            display: 'flex',
            gap: '8px',
            paddingBottom: '16px',
        }}>
            <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(resort.name + ' 駐車場')}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="dq-command"
                style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px',
                    border: '2px solid var(--dq-text-blue)',
                    borderRadius: '6px',
                    background: 'rgba(102, 187, 255, 0.1)',
                    color: 'var(--dq-text-blue)',
                    fontSize: '12px',
                    fontFamily: 'var(--font-pixel)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                🗺️ ここにいく
            </a>
            {officialUrl && (
                <a
                    href={officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '10px',
                        border: `1px solid ${isSummer ? 'var(--dq-text-green)' : 'var(--dq-window-border-inner)'}`,
                        borderRadius: '6px',
                        background: isSummer ? 'rgba(68, 255, 136, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                        color: isSummer ? 'var(--dq-text-green)' : 'var(--dq-text-dim)',
                        fontSize: '11px',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-pixel)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {officialUrlLabel}
                </a>
            )}
        </div>
    );
}
