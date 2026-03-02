'use client';

import { Resort } from '@/lib/resorts_data';
import { WeatherData, calculateConditionScore, getWeatherLabel, getSnowQuality, calculateWindChill, getClothingAdvice, generateAIAnalysis, generateWeekSummary } from '@/lib/scoring';

interface ResortDetailModalProps {
    resort: Resort & { weather: WeatherData };
    isFavorite: boolean;
    isInCompare: boolean;
    onClose: () => void;
    onToggleFavorite: (id: string) => void;
    onToggleCompare: (resort: Resort & { weather: WeatherData }) => void;
}

const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

function getWeatherEmoji(code: number): string {
    if (code === 0) return '☀️';
    if (code >= 1 && code <= 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 55) return '🌦️';
    if (code >= 61 && code <= 65) return '☔';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌂';
    if (code >= 85 && code <= 86) return '🌨️';
    if (code >= 95 && code <= 99) return '⚡';
    return '❓';
}

// スコアからDQ3風のランク名を返す
function getDQRank(score: number): string {
    if (score >= 90) return 'けんじゃ';
    if (score >= 80) return 'ゆうしゃ';
    if (score >= 70) return 'まほうつかい';
    if (score >= 60) return 'せんし';
    if (score >= 50) return 'ぶとうか';
    if (score >= 40) return 'そうりょ';
    if (score >= 30) return 'あそびにん';
    return 'しょにん';
}

export default function ResortDetailModal({
    resort,
    isFavorite,
    isInCompare,
    onClose,
    onToggleFavorite,
    onToggleCompare,
}: ResortDetailModalProps) {
    const condition = calculateConditionScore(resort.weather);
    const weatherLabel = getWeatherLabel(resort.weather.weather_code);
    const snowQuality = getSnowQuality(resort.weather);
    const windChill = calculateWindChill(resort.weather.temp, resort.weather.wind);
    const clothingAdvice = getClothingAdvice(windChill);
    const aiComment = generateAIAnalysis(resort.name, resort.area, resort.weather);
    const { summary: weekSummary } = generateWeekSummary(resort.weather.forecast);

    const tenkiUrl = `https://tenki.jp/search/?keyword=${encodeURIComponent(resort.name + ' スキー場')}`;

    const getLevelColor = (score: number) => {
        if (score >= 80) return 'var(--dq-text-gold)';
        if (score >= 60) return 'var(--dq-text-green)';
        if (score >= 40) return 'var(--dq-text-blue)';
        return 'var(--dq-text-dim)';
    };

    return (
        <div
            className="fixed inset-0 z-[3000] flex items-end sm:items-center justify-center dq-fade-in"
            style={{ background: 'rgba(0, 0, 0, 0.8)', padding: '0' }}
            onClick={onClose}
        >
            <div
                className="dq-window dq-fade-in"
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    maxHeight: '92dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    margin: '0 auto',
                    borderRadius: '12px 12px 0 0',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* ===== ヘッダー（DQ3「つよさ」画面風） ===== */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    paddingBottom: '12px',
                    borderBottom: '1px dashed var(--dq-window-border-inner)',
                    flexShrink: 0,
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '10px',
                            color: 'var(--dq-text-dim)',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            {resort.area}
                        </div>
                        <div style={{
                            fontSize: '20px',
                            color: 'var(--dq-text)',
                            fontWeight: 'bold',
                            marginTop: '2px',
                        }}>
                            {resort.name}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => onToggleFavorite(resort.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '20px',
                            }}
                        >
                            {isFavorite ? '⭐' : '☆'}
                        </button>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--dq-text-dim)',
                                cursor: 'pointer',
                                fontSize: '18px',
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* ===== レベル＋ランク表示 ===== */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 0',
                    borderBottom: '1px dashed var(--dq-window-border-inner)',
                    flexShrink: 0,
                }}>
                    {/* レベル */}
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        textAlign: 'center',
                        border: '1px solid var(--dq-window-border-inner)',
                    }}>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: getLevelColor(condition.score),
                        }} className="dq-glow">
                            Lv.{condition.score}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>/ 100</div>
                    </div>
                    {/* ランク名＋ひとこと */}
                    <div>
                        <div style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: getLevelColor(condition.score),
                        }}>
                            {getDQRank(condition.score)}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dq-text-dim)', marginTop: '2px' }}>
                            {condition.details}
                        </div>
                    </div>
                </div>

                {/* ===== スクロール可能コンテンツ ===== */}
                <div style={{ overflowY: 'auto', flex: 1, paddingTop: '12px' }}>

                    {/* 週間サマリー */}
                    {weekSummary && (
                        <div style={{
                            background: 'rgba(255, 215, 0, 0.08)',
                            border: '1px solid rgba(255, 215, 0, 0.2)',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            fontSize: '12px',
                            color: 'var(--dq-text-gold)',
                            marginBottom: '12px',
                        }}>
                            {weekSummary}
                        </div>
                    )}

                    {/* ===== ステータス一覧（DQ3風） ===== */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '8px',
                        marginBottom: '12px',
                    }}>
                        {/* 24h降雪 */}
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '6px',
                            padding: '10px',
                            textAlign: 'center',
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
                            borderRadius: '6px',
                            padding: '10px',
                            textAlign: 'center',
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
                            borderRadius: '6px',
                            padding: '10px',
                            textAlign: 'center',
                            border: '1px solid var(--dq-window-border-inner)',
                        }}>
                            <div style={{ fontSize: '18px', marginBottom: '4px' }}>🌡️</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--dq-text-orange)' }}>
                                {resort.weather.temp}<span style={{ fontSize: '10px', fontWeight: 'normal' }}>°C</span>
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>きおん</div>
                        </div>
                    </div>

                    {/* ===== 詳細ステータス ===== */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        marginBottom: '12px',
                    }}>
                        {[
                            { label: 'てんき', value: weatherLabel },
                            { label: 'ふうそく', value: `💨 ${resort.weather.wind} m/s` },
                            { label: 'ゆきしつ', value: snowQuality },
                            { label: 'たいかんおんど', value: `${windChill}°C` },
                        ].map(item => (
                            <div key={item.label} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '6px 8px',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '4px',
                                fontSize: '12px',
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
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: 'var(--dq-text-orange)',
                        }}>
                            🛡️ そうび: {clothingAdvice}
                        </div>
                    </div>

                    {/* ===== 週間予報（DQ3ウィンドウ風） ===== */}
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
                                {resort.weather.forecast.map((day, i) => {
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

                    {/* ===== AIコメント（DQ3の宿屋風メッセージ） ===== */}
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


                    {/* ===== アクションボタン（DQ3コマンド風） ===== */}
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
                        {resort.url && (
                            <a
                                href={resort.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    padding: '10px',
                                    border: '1px solid var(--dq-window-border-inner)',
                                    borderRadius: '6px',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    color: 'var(--dq-text-dim)',
                                    fontSize: '12px',
                                    textDecoration: 'none',
                                    fontFamily: 'var(--font-pixel)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                🏰 こうしきサイト
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
