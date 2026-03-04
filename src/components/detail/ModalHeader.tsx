'use client';

import { SpotWithWeather } from '@/lib/spot_types';
import { ConditionScore } from '@/lib/scoring';

// --- 共通ユーティリティ関数 ---

// 天気コードから絵文字を返す
export function getWeatherEmoji(code: number): string {
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

// スコアからDQ3風のランク名を返す（冬・夏共用）
export function getDQRank(score: number, isSummer: boolean): string {
    if (isSummer) {
        if (score >= 90) return 'ひしょのせいち';
        if (score >= 80) return 'おすすめきゅう';
        if (score >= 70) return 'かいてきど たかい';
        if (score >= 60) return 'まあまあ';
        if (score >= 40) return 'ふつう';
        return 'きょうははやめに';
    }
    if (score >= 90) return 'けんじゃ';
    if (score >= 80) return 'ゆうしゃ';
    if (score >= 70) return 'まほうつかい';
    if (score >= 60) return 'せんし';
    if (score >= 50) return 'ぶとうか';
    if (score >= 40) return 'そうりょ';
    if (score >= 30) return 'あそびにん';
    return 'しょにん';
}

// スコアからレベル色を返す
export function getLevelColor(score: number) {
    if (score >= 80) return 'var(--dq-text-gold)';
    if (score >= 60) return 'var(--dq-text-green)';
    if (score >= 40) return 'var(--dq-text-blue)';
    return 'var(--dq-text-dim)';
}

// 曜日名
export const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

// --- ヘッダー + レベル表示 ---
interface ModalHeaderProps {
    resort: SpotWithWeather;
    condition: ConditionScore;
    isSummer: boolean;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    onClose: () => void;
}

export function ModalHeader({ resort, condition, isSummer, isFavorite, onToggleFavorite, onClose }: ModalHeaderProps) {
    return (
        <>
            {/* ヘッダー（DQ3「つよさ」画面風） */}
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

            {/* レベル＋ランク表示 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderBottom: '1px dashed var(--dq-window-border-inner)',
                flexShrink: 0,
            }}>
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
                        {isSummer ? `☀️${condition.score}` : `Lv.${condition.score}`}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>/ 100</div>
                </div>
                <div>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: getLevelColor(condition.score),
                    }}>
                        {getDQRank(condition.score, isSummer)}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--dq-text-dim)', marginTop: '2px' }}>
                        {condition.details}
                    </div>
                </div>
            </div>
        </>
    );
}
