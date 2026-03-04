'use client';

import { SpotWithWeather } from '@/lib/spot_types';

// --- 冬モード専用ステータス ---
interface WinterStatusProps {
    resort: SpotWithWeather;
    weatherLabel: string;
    snowQuality: string | null;
    windChill: number;
    clothingAdvice: string;
}

export default function WinterStatus({ resort, weatherLabel, snowQuality, windChill, clothingAdvice }: WinterStatusProps) {
    return (
        <>
            {/* 3カラムステータス */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                marginBottom: '12px',
            }}>
                {/* 24h降雪 */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '6px', padding: '10px', textAlign: 'center',
                    border: '1px solid var(--dq-window-border-inner)',
                }}>
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>❄️</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--dq-text-blue)' }}>
                        {resort.weather.snowfall_24h}<span style={{ fontSize: '10px', fontWeight: 'normal' }}>cm</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>24h こうせつ</div>
                </div>
                {/* 積雪深 */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '6px', padding: '10px', textAlign: 'center',
                    border: '1px solid var(--dq-window-border-inner)',
                }}>
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>🏔️</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--dq-text)' }}>
                        {resort.weather.snow_depth != null ? (
                            <>{resort.weather.snow_depth}<span style={{ fontSize: '10px', fontWeight: 'normal' }}>cm</span></>
                        ) : (
                            <span style={{ color: 'var(--dq-text-dim)' }}>--</span>
                        )}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>せきせつ</div>
                </div>
                {/* 気温 */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '6px', padding: '10px', textAlign: 'center',
                    border: '1px solid var(--dq-window-border-inner)',
                }}>
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>🌡️</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--dq-text-orange)' }}>
                        {resort.weather.temp}<span style={{ fontSize: '10px', fontWeight: 'normal' }}>°C</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>きおん</div>
                </div>
            </div>

            {/* 詳細ステータス */}
            <div style={{
                display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px',
            }}>
                {[
                    { label: 'てんき', value: weatherLabel },
                    { label: 'ふうそく', value: `💨 ${resort.weather.wind} m/s` },
                    ...(snowQuality ? [{ label: 'ゆきしつ', value: snowQuality }] : []),
                    { label: 'たいかんおんど', value: `${windChill}°C` },
                ].map(item => (
                    <div key={item.label} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '6px 8px', background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px', fontSize: '12px',
                    }}>
                        <span style={{ color: 'var(--dq-text-dim)' }}>{item.label}</span>
                        <span style={{ color: 'var(--dq-text)' }}>{item.value}</span>
                    </div>
                ))}
                {/* 服装アドバイス */}
                <div style={{
                    padding: '6px 8px',
                    background: 'rgba(255, 170, 51, 0.1)',
                    border: '1px solid rgba(255, 170, 51, 0.2)',
                    borderRadius: '4px', fontSize: '12px',
                    color: 'var(--dq-text-orange)',
                }}>
                    🛡️ そうび: {clothingAdvice}
                </div>
            </div>
        </>
    );
}
