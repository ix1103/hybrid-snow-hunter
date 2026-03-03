'use client';

import { calculateConditionScore } from '@/lib/scoring';
import { SpotWithWeather } from '@/lib/spot_types';
import { useSeason } from '@/lib/season';

interface ComparePanelProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resorts: any[];
    onRemove: (id: string) => void;
    onClose: () => void;
}

// DQ3風HPバーコンポーネント
function DQBar({ value, max, type }: { value: number; max: number; type: 'hp' | 'mp' }) {
    const percent = Math.min(100, (value / max) * 100);
    const barColor = type === 'hp'
        ? (percent > 50 ? 'var(--dq-hp-bar)' : 'var(--dq-hp-bar-low)')
        : 'var(--dq-mp-bar)';

    return (
        <div className="dq-bar" style={{ width: '100%', marginTop: '2px' }}>
            <div className="dq-bar-fill" style={{
                width: `${percent}%`,
                background: barColor,
            }} />
        </div>
    );
}

export default function ComparePanel({ resorts, onRemove, onClose }: ComparePanelProps) {
    const { season } = useSeason();
    const isSummer = season === 'summer';
    if (resorts.length === 0) return null;

    const scores = resorts.map(r => calculateConditionScore(r.weather));

    const metrics = [
        {
            label: '24hこうせつ',
            icon: '❄️',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getValue: (r: any) => `${r.weather.snowfall_24h}cm`,
            getRaw: (r: any) => r.weather.snowfall_24h,
            higherIsBetter: true,
        },
        {
            label: 'せきせつ',
            icon: '🏔️',
            getValue: (r: any) => r.weather.snow_depth != null ? `${r.weather.snow_depth}cm` : '--',
            getRaw: (r: any) => r.weather.snow_depth ?? 0,
            higherIsBetter: true,
        },
        {
            label: 'きおん',
            icon: '🌡️',
            getValue: (r: any) => `${r.weather.temp}°C`,
            getRaw: (r: any) => r.weather.temp,
            higherIsBetter: false,
        },
        {
            label: 'ふうそく',
            icon: '💨',
            getValue: (r: any) => `${r.weather.wind}m/s`,
            getRaw: (r: any) => r.weather.wind,
            higherIsBetter: false,
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[2500] dq-fade-in">
            <div className="dq-window" style={{
                borderRadius: '12px 12px 0 0',
                borderBottom: 'none',
                padding: '12px',
            }}>
                {/* ヘッダー */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    paddingBottom: '8px',
                    borderBottom: '1px dashed var(--dq-window-border-inner)',
                }}>
                    <span style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: 'var(--dq-text-gold)',
                    }}>
                        ⚔️ パーティへんせい
                        <span style={{ fontSize: '11px', color: 'var(--dq-text-dim)', marginLeft: '8px' }}>
                            ({resorts.length}/3)
                        </span>
                    </span>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--dq-text-dim)',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* 比較テーブル */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        minWidth: '320px',
                        fontSize: '12px',
                        borderCollapse: 'collapse',
                    }}>
                        <thead>
                            <tr>
                                <td style={{
                                    padding: '6px 8px',
                                    fontSize: '10px',
                                    color: 'var(--dq-text-dim)',
                                    width: '80px',
                                }}>
                                    こうもく
                                </td>
                                {resorts.map(r => (
                                    <th key={r.id} style={{ padding: '6px 4px', textAlign: 'center' }}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '2px',
                                        }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                color: 'var(--dq-text)',
                                            }}>
                                                {r.name.length > 6 ? r.name.slice(0, 6) + '…' : r.name}
                                            </span>
                                            <button
                                                onClick={() => onRemove(r.id)}
                                                style={{
                                                    fontSize: '9px',
                                                    color: 'var(--dq-text-red)',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontFamily: 'var(--font-pixel)',
                                                }}
                                            >
                                                ✕ はずす
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* レベル（スコア）行 */}
                            <tr style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                                <td style={{
                                    padding: '8px',
                                    fontSize: '10px',
                                    color: 'var(--dq-text-dim)',
                                }}>
                                    レベル
                                </td>
                                {scores.map((s, i) => {
                                    const best = Math.max(...scores.map(x => x.score));
                                    const isBest = s.score === best;
                                    return (
                                        <td key={resorts[i].id} style={{
                                            padding: '8px 4px',
                                            textAlign: 'center',
                                        }}>
                                            <span style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                color: isBest ? 'var(--dq-text-gold)' : 'var(--dq-text)',
                                            }} className={isBest ? 'dq-glow' : ''}>
                                                {isSummer ? `☀️${s.score}` : `Lv.${s.score}`}
                                            </span>
                                            <DQBar value={s.score} max={100} type="hp" />
                                        </td>
                                    );
                                })}
                            </tr>
                            {/* 各ステータス行 */}
                            {metrics.map(metric => {
                                const raws = resorts.map(r => metric.getRaw(r));
                                const best = metric.higherIsBetter ? Math.max(...raws) : Math.min(...raws);
                                return (
                                    <tr key={metric.label}>
                                        <td style={{
                                            padding: '6px 8px',
                                            fontSize: '10px',
                                            color: 'var(--dq-text-dim)',
                                        }}>
                                            <span style={{ marginRight: '4px' }}>{metric.icon}</span>
                                            {metric.label}
                                        </td>
                                        {resorts.map((r, i) => {
                                            const isBest = raws[i] === best;
                                            return (
                                                <td key={r.id} style={{
                                                    padding: '6px 4px',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '12px',
                                                    color: isBest ? 'var(--dq-text-gold)' : 'var(--dq-text)',
                                                }}>
                                                    {metric.getValue(r)}
                                                    {isBest && resorts.length > 1 && (
                                                        <span style={{
                                                            marginLeft: '4px',
                                                            fontSize: '9px',
                                                            color: 'var(--dq-text-gold)',
                                                        }}>★</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ height: '16px' }} />
            </div>
        </div>
    );
}
