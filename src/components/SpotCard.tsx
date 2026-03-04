'use client';

import { SpotWithWeather } from '@/lib/spot_types';

// SpotWithWeather型に対して、Advisor側で動的に追加される .score プロパティを持つ拡張型
export type SpotWithWeatherAndScore = SpotWithWeather & {
    score: { score: number; details: string };
};

interface SpotCardProps {
    resort: SpotWithWeatherAndScore;
    idx: number;
    showRank: boolean;
    isSummer: boolean;
    favorites: Set<string>;
    onToggleFavorite: (id: string) => void;
    onResortClick: (resort: SpotWithWeather) => void;
    getLevelColor: (score: number) => string;
    getScoreLabel: (score: number) => string;
}

export default function SpotCard({
    resort,
    idx,
    showRank,
    isSummer,
    favorites,
    onToggleFavorite,
    onResortClick,
    getLevelColor,
    getScoreLabel
}: SpotCardProps) {
    return (
        <div
            onClick={() => onResortClick(resort)}
            style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid var(--dq-window-border-inner)',
                background: isSummer
                    ? 'rgba(13, 62, 27, 0.6)'
                    : 'rgba(13, 27, 62, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--dq-text-gold)';
                e.currentTarget.style.background = 'rgba(255, 215, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--dq-window-border-inner)';
                e.currentTarget.style.background = isSummer
                    ? 'rgba(13, 62, 27, 0.6)'
                    : 'rgba(13, 27, 62, 0.6)';
            }}
        >
            {/* 上段: 順位・名前・レベル */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* 順位 */}
                    {showRank && (
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: idx < 3 ? 'var(--dq-text-gold)' : 'var(--dq-text-dim)',
                            minWidth: '20px',
                        }}>
                            {idx + 1}
                        </span>
                    )}
                    <div>
                        <div style={{
                            fontSize: '13px',
                            color: 'var(--dq-text)',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            {resort.name}
                            {(resort.climbingStyle === 'variation' || resort.climbingStyle === 'alpine') && (
                                <span style={{ fontSize: '10px' }} title="ロープ・岩壁技術必須の高難度ルート">💀</span>
                            )}
                        </div>
                        <div style={{
                            fontSize: '10px',
                            color: 'var(--dq-text-dim)',
                        }}>
                            {resort.area}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    {/* お気に入りボタン */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(resort.id);
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            padding: '0',
                            transition: 'transform 0.15s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {favorites.has(resort.id) ? '⭐' : '☆'}
                    </button>
                    {/* レベル表示 */}
                    <span style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: getLevelColor(resort.score.score),
                    }}>
                        {isSummer ? `☀️${resort.score.score}` : `Lv.${resort.score.score}`}
                    </span>
                </div>
            </div>

            {/* AIからの強い警告 (雷や暴風) */}
            {isSummer && resort.category === 'trekking' && (resort.weather.weather_code >= 95 || resort.weather.wind >= 10) && (
                <div style={{
                    marginTop: '6px',
                    padding: '6px',
                    background: 'rgba(255, 0, 0, 0.15)',
                    border: '1px dashed var(--dq-text-red)',
                    borderRadius: '4px',
                    color: 'var(--dq-text-red)',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    lineHeight: '1.4',
                }}>
                    {resort.weather.weather_code >= 95
                        ? '💬 ＡＩの げき：\nごごから かみなりが あれるらしい。\nきょうは ぜったいに やめておけ！'
                        : '💬 ＡＩの げき：\nやま は ぼうふうだ。いのちの きき。\nはやてのリング（はやで）が ひつようだ。'}
                </div>
            )}

            {/* 下段: ステータスバー */}
            <div style={{
                marginTop: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                color: 'var(--dq-text-dim)',
                padding: '4px 6px',
                borderRadius: '4px',
                background: 'rgba(0, 0, 0, 0.3)',
            }}>
                <span>❄️ {resort.weather.snowfall_24h}cm</span>
                {resort.weather.snow_depth != null && (
                    <span>🏔️ {resort.weather.snow_depth}cm</span>
                )}
                <span>🌡️ {resort.weather.temp}°C</span>
                <span>💨 {resort.weather.wind}m/s</span>
            </div>

            {/* DQ3風ひとこと */}
            <div style={{
                marginTop: '4px',
                fontSize: '11px',
                color: getLevelColor(resort.score.score),
                padding: '2px 0',
            }}>
                {getScoreLabel(resort.score.score)} ─ {resort.score.details}
            </div>
        </div>
    );
}
