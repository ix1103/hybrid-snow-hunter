'use client';

import { SpotWithWeather } from '@/lib/spot_types';
import { DailyForecast } from '@/lib/scoring';
import { getWeatherEmoji, dayNames } from './ModalHeader';

// --- 週間予報 + AI コメント ---
interface WeeklyForecastProps {
    resort: SpotWithWeather;
    aiComment: string;
}

export default function WeeklyForecast({ resort, aiComment }: WeeklyForecastProps) {
    // tenki.jp検索リンク
    const tenkiUrl = `https://www.google.com/search?q=${encodeURIComponent(resort.name + ' tenki.jp スキー場')}`;

    return (
        <>
            {/* 週間予報 */}
            {resort.weather.forecast && resort.weather.forecast.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px',
                    }}>
                        <div style={{
                            fontSize: '11px',
                            color: 'var(--dq-text-gold)',
                            letterSpacing: '0.1em',
                        }}>
                            📅 しゅうかんよほう
                        </div>
                        <a
                            href={tenkiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: '10px',
                                color: 'var(--dq-text-blue)',
                                textDecoration: 'none',
                                padding: '2px 6px',
                                border: '1px solid var(--dq-text-blue)',
                                borderRadius: '4px',
                                background: 'rgba(102, 187, 255, 0.1)',
                            }}
                        >
                            tenki.jpでみる ↗
                        </a>
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '6px',
                        overflowX: 'auto',
                        paddingBottom: '4px',
                    }}>
                        {resort.weather.forecast.map((day: DailyForecast, i: number) => {
                            const d = new Date(day.date);
                            const label = i === 0 ? 'きょう' : i === 1 ? 'あした' : `${d.getMonth() + 1}/${d.getDate()}`;
                            const dow = dayNames[d.getDay()];
                            return (
                                <div key={day.date} style={{
                                    flexShrink: 0,
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    border: '1px solid var(--dq-window-border-inner)',
                                    borderRadius: '6px',
                                    padding: '6px 8px',
                                    textAlign: 'center',
                                    minWidth: '52px',
                                }}>
                                    <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>{label}</div>
                                    <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>{dow}</div>
                                    <div style={{ fontSize: '18px', margin: '2px 0' }}>{getWeatherEmoji(day.weatherCode)}</div>
                                    <div style={{ fontSize: '10px', color: 'var(--dq-text-red)' }}>{Math.round(day.maxTemp)}°</div>
                                    <div style={{ fontSize: '10px', color: 'var(--dq-text-blue)' }}>{Math.round(day.minTemp)}°</div>
                                    {day.precipitationProb > 30 && (
                                        <div style={{ fontSize: '9px', color: 'var(--dq-text-blue)', marginTop: '2px' }}>
                                            {day.precipitationProb}%
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* AIコメント */}
            {aiComment && (
                <div className="dq-window" style={{
                    padding: '10px',
                    marginBottom: '12px',
                    fontSize: '12px',
                    color: 'var(--dq-text)',
                    lineHeight: '1.8',
                    whiteSpace: 'pre-line',
                }}>
                    <div style={{ color: 'var(--dq-text-gold)', marginBottom: '4px', fontSize: '11px' }}>
                        📜 ルイーダのじょうほう
                    </div>
                    {aiComment}
                </div>
            )}
        </>
    );
}
