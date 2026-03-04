'use client';

import { SpotWithWeather } from '@/lib/spot_types';
import { WeatherData, getWeatherLabel } from '@/lib/scoring';

// --- 夏モード専用ステータス ---
interface SummerStatusProps {
    resort: SpotWithWeather;
    weatherLabel: string;
}

export default function SummerStatus({ resort, weatherLabel }: SummerStatusProps) {
    return (
        <>
            {/* アクティビティバッジ */}
            {resort.activities && resort.activities.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                    <div style={{
                        fontSize: '11px',
                        color: 'var(--dq-text-green)',
                        marginBottom: '6px',
                        letterSpacing: '0.1em',
                    }}>
                        🌿 ここで できること
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {resort.activities.map((activity: string) => {
                            const badges: Record<string, { emoji: string; label: string }> = {
                                mtb: { emoji: '🚵', label: 'MTB' },
                                trekking: { emoji: '🥾', label: 'トレッキング' },
                                camp: { emoji: '🏕️', label: 'キャンプ' },
                                nature: { emoji: '🌸', label: '自然観察' },
                                gondola: { emoji: '🚡', label: 'ゴンドラ' },
                                river: { emoji: '🌊', label: '川遊び・SUP' },
                                onsen: { emoji: '♨️', label: '温泉' },
                            };
                            const badge = badges[activity];
                            if (!badge) return null;
                            return (
                                <span key={activity} style={{
                                    padding: '3px 8px',
                                    borderRadius: '12px',
                                    fontSize: '11px',
                                    background: 'rgba(68, 255, 136, 0.1)',
                                    border: '1px solid rgba(68, 255, 136, 0.3)',
                                    color: 'var(--dq-text-green)',
                                }}>
                                    {badge.emoji} {badge.label}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 難易度 + コースタイム */}
            {resort.category === 'trekking' && resort.difficulty && (
                <div style={{
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '8px',
                    border: '1px solid var(--dq-window-border-inner)',
                    padding: '12px',
                    marginBottom: '12px',
                }}>
                    {/* 難易度ヘッダー */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div>
                            <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)', marginBottom: '2px' }}>
                                ⚔️ なんいど
                                {(resort.climbingStyle === 'variation' || resort.climbingStyle === 'alpine') && (
                                    <span style={{
                                        marginLeft: '8px', padding: '2px 6px',
                                        background: 'rgba(255, 0, 0, 0.2)', border: '1px solid #ff4444',
                                        borderRadius: '4px', color: '#ff4444', fontSize: '10px',
                                        animation: 'dq-blink 1.5s infinite'
                                    }}>
                                        💀 {resort.climbingStyle === 'alpine' ? 'アルパイン' : 'バリエーション'}
                                    </span>
                                )}
                            </div>
                            <div style={{
                                fontSize: '16px', fontWeight: 'bold',
                                color: resort.climbingStyle === 'alpine' ? '#cc0000' :
                                    resort.climbingStyle === 'variation' ? '#ff4444' :
                                        resort.difficulty >= 5 ? '#ff4444' :
                                            resort.difficulty >= 4 ? 'var(--dq-text-gold)' :
                                                resort.difficulty >= 3 ? 'var(--dq-text-green)' :
                                                    'var(--dq-text-blue)',
                            }}>
                                {resort.climbingStyle === 'alpine' ? 'しんわきゅう' :
                                    resort.climbingStyle === 'variation' ? 'まおうきゅう' :
                                        resort.difficulty >= 5 ? 'でんせつきゅう' :
                                            resort.difficulty >= 4 ? 'ベテランきゅう' :
                                                resort.difficulty >= 3 ? 'ちゅうきゅうしゃ' :
                                                    resort.difficulty >= 2 ? 'しょしん＋' :
                                                        'スライムきゅう'}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '16px', color: 'var(--dq-text-gold)', letterSpacing: '2px' }}>
                                {'★'.repeat(resort.difficulty)}{'☆'.repeat(5 - resort.difficulty)}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>
                                {resort.climbingStyle === 'alpine' ? 'Lv.∞' :
                                    resort.climbingStyle === 'variation' ? 'Lv.6' :
                                        `Lv.${resort.difficulty}`}
                            </div>
                        </div>
                    </div>

                    {/* 高難度ルート警告バナー */}
                    {(resort.climbingStyle === 'variation' || resort.climbingStyle === 'alpine') && (
                        <div style={{
                            background: 'rgba(255, 0, 0, 0.1)',
                            borderLeft: '4px solid #ff4444',
                            padding: '8px',
                            marginBottom: '12px',
                            fontSize: '11px',
                            color: '#ffdddd',
                            lineHeight: '1.4'
                        }}>
                            ⚠️ <b>けいこく</b><br />
                            このルートは いっぱんの やまのぼりでは ありません。<br />
                            読図（どくず）、ロープワーク、岩壁登攀（がんぺきとうはん）などの <b>せんもんてきな クライミング ぎじゅつ</b> が ひつようです。
                        </div>
                    )}

                    {/* コースタイム + スタミナゲージ */}
                    {resort.courseTime && (
                        <div style={{ marginTop: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                                <span style={{ color: 'var(--dq-text-dim)' }}>🕐 コースタイム</span>
                                <span style={{ color: 'var(--dq-text)', fontWeight: 'bold' }}>{resort.courseTime}</span>
                            </div>
                            <div style={{ position: 'relative', height: '12px', background: 'rgba(0,0,0,0.6)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${Math.min(100, (resort.difficulty / 5) * 100)}%`,
                                    background: resort.difficulty >= 5 ? 'linear-gradient(90deg, #ff4444, #ff8800)' :
                                        resort.difficulty >= 4 ? 'linear-gradient(90deg, #ffd700, #ff8800)' :
                                            resort.difficulty >= 3 ? 'linear-gradient(90deg, #44ff88, #ffd700)' :
                                                'linear-gradient(90deg, #44aaff, #44ff88)',
                                    borderRadius: '6px',
                                    transition: 'width 0.5s ease',
                                }} />
                                <div style={{ position: 'absolute', top: 0, left: '6px', fontSize: '9px', color: '#fff', lineHeight: '12px', textShadow: '0 0 2px rgba(0,0,0,0.8)' }}>
                                    ST（スタミナ）
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 特徴タグ */}
                    {resort.features && resort.features.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                            {resort.features.map((f: string) => (
                                <span key={f} style={{
                                    fontSize: '10px', padding: '2px 8px',
                                    background: 'rgba(255, 215, 0, 0.1)',
                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                    borderRadius: '10px', color: 'var(--dq-text-gold)',
                                }}>
                                    {f}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* 標高 + 山頂気温 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: resort.category === 'trekking' ? '1fr 1fr' : '1fr 1fr 1fr',
                gap: '8px',
                marginBottom: '12px',
            }}>
                {/* 標高 */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '6px', padding: '10px', textAlign: 'center',
                    border: '1px solid var(--dq-window-border-inner)',
                }}>
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>⛰️</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--dq-text)' }}>
                        {resort.elevation ?? '--'}<span style={{ fontSize: '10px', fontWeight: 'normal' }}>m</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>ひょうこう</div>
                </div>
                {resort.category === 'trekking' && resort.elevation ? (
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '6px', padding: '10px', textAlign: 'center',
                        border: '1px solid var(--dq-window-border-inner)',
                    }}>
                        <div style={{ fontSize: '18px', marginBottom: '4px' }}>🏔️</div>
                        <div style={{
                            fontSize: '18px', fontWeight: 'bold',
                            color: (resort.weather.temp - (resort.elevation / 100 * 0.6)) < 0 ? 'var(--dq-text-blue)' : 'var(--dq-text)',
                        }}>
                            {Math.round(resort.weather.temp - (resort.elevation / 100 * 0.6))}<span style={{ fontSize: '10px', fontWeight: 'normal' }}>℃</span>
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>さんちょう きおん</div>
                    </div>
                ) : (
                    <>
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '6px', padding: '10px', textAlign: 'center',
                            border: '1px solid var(--dq-window-border-inner)',
                        }}>
                            <div style={{ fontSize: '18px', marginBottom: '4px' }}>
                                {(() => {
                                    const catIcons: Record<string, string> = {
                                        highland: '🏔️', trekking: '🥾', camp: '🏕️', mtb: '🚵',
                                    };
                                    return catIcons[resort.category || ''] || '🗺️';
                                })()}
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--dq-text-green)' }}>
                                {(() => {
                                    const catLabels: Record<string, string> = {
                                        highland: 'ひしょち', trekking: 'やまのぼり', camp: 'キャンプ', mtb: 'MTB',
                                    };
                                    return catLabels[resort.category || ''] || 'スポット';
                                })()}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>カテゴリ</div>
                        </div>
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '6px', padding: '10px', textAlign: 'center',
                            border: '1px solid var(--dq-window-border-inner)',
                        }}>
                            <div style={{ fontSize: '18px', marginBottom: '4px' }}>🌡️</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--dq-text-blue)' }}>
                                -{Math.max(0, Math.round(28 - resort.weather.temp))}<span style={{ fontSize: '10px', fontWeight: 'normal' }}>℃</span>
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>とかいとのさ</div>
                        </div>
                    </>
                )}
            </div>

            {/* 雷・暴風アラート */}
            {resort.category === 'trekking' && (resort.weather.weather_code >= 95 || resort.weather.wind >= 10) && (
                <div className="dq-glow" style={{
                    color: 'var(--dq-text-red)', fontWeight: 'bold', fontSize: '14px',
                    textAlign: 'center', padding: '10px', marginBottom: '12px',
                    background: 'rgba(255, 0, 0, 0.1)', border: '2px solid rgba(255, 0, 0, 0.4)',
                    borderRadius: '6px',
                }}>
                    ⚠️ いのちのきき！ {resort.weather.weather_code >= 95 ? '⚡ かみなり ' : ''}{resort.weather.wind >= 10 ? '🌀 ぼうふう' : ''}
                    <div style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--dq-text)', marginTop: '4px' }}>
                        にゅうざんは きけんです。てったいを けんとうしてください。
                    </div>
                </div>
            )}

            {/* 高度別気温予想（2000m超） */}
            {resort.category === 'trekking' && resort.elevation && resort.elevation > 2000 && (
                <div style={{ marginBottom: '12px', padding: '8px', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)', marginBottom: '6px', textAlign: 'center' }}>📉 こうどべつ きおんよそう</div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '11px', color: 'var(--dq-text)', textAlign: 'center' }}>
                        <span>ふもと<br />{resort.weather.temp}℃</span>
                        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--dq-text-dim)' }}>→</span>
                        <span>2000m<br />{Math.round(resort.weather.temp - 12)}℃</span>
                        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--dq-text-dim)' }}>→</span>
                        <span style={{ color: (resort.weather.temp - (resort.elevation / 100 * 0.6)) < 0 ? 'var(--dq-text-blue)' : 'var(--dq-text-orange)', fontWeight: 'bold' }}>
                            さんちょう<br />{Math.round(resort.weather.temp - (resort.elevation / 100 * 0.6))}℃
                        </span>
                    </div>
                    {(Math.round((resort.weather.temp - (resort.elevation / 100 * 0.6)) - resort.weather.wind)) < 0 && (
                        <div style={{ fontSize: '11px', color: 'var(--dq-text-blue)', textAlign: 'center', marginTop: '6px', fontWeight: 'bold' }}>
                            ❄️ とうけつリスクあり！（たいかん {Math.round((resort.weather.temp - (resort.elevation / 100 * 0.6)) - resort.weather.wind)}℃）
                        </div>
                    )}
                </div>
            )}

            {/* 天気 + 降水確率 + 風速 */}
            <div style={{
                display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px',
            }}>
                {[
                    { label: 'げんざいきおん', value: `🌡️ ${resort.weather.temp}°C` },
                    { label: 'てんき', value: weatherLabel },
                    { label: 'ふうそく', value: `💨 ${resort.weather.wind} m/s${resort.weather.wind >= 8 ? ' ⚠️' : ''}` },
                    ...(resort.weather.forecast && resort.weather.forecast[0] ? [{
                        label: '☔ こうすいかくりつ',
                        value: `${resort.weather.forecast[0].precipitationProb}%${resort.weather.forecast[0].precipitationProb >= 60 ? ' ⚠️あめに ちゅうい' : ''}`
                    }] : []),
                ].map(item => (
                    <div key={item.label} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '6px 8px', background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px', fontSize: '12px',
                    }}>
                        <span style={{ color: 'var(--dq-text-dim)' }}>{item.label}</span>
                        <span style={{
                            color: item.label === '☔ こうすいかくりつ' && resort.weather.forecast?.[0]?.precipitationProb >= 60
                                ? 'var(--dq-text-red)' : 'var(--dq-text)',
                            fontWeight: item.label === '☔ こうすいかくりつ' && resort.weather.forecast?.[0]?.precipitationProb >= 60
                                ? 'bold' : 'normal',
                        }}>{item.value}</span>
                    </div>
                ))}
            </div>

            {/* 山小屋・テント場・水場 */}
            {resort.category === 'trekking' && (resort.hut || resort.tent || resort.water) && (
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px',
                    marginBottom: '12px',
                }}>
                    {resort.hut && (
                        <div style={{
                            background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '8px',
                            textAlign: 'center', border: '1px solid var(--dq-window-border-inner)',
                        }}>
                            <div style={{ fontSize: '16px' }}>🏠</div>
                            <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>やまごや</div>
                            <div style={{ fontSize: '11px', color: 'var(--dq-text)', fontWeight: 'bold', marginTop: '2px' }}>{resort.hut}</div>
                        </div>
                    )}
                    {resort.tent && (
                        <div style={{
                            background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '8px',
                            textAlign: 'center', border: '1px solid var(--dq-window-border-inner)',
                        }}>
                            <div style={{ fontSize: '16px' }}>⛺</div>
                            <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>テントば</div>
                            <div style={{ fontSize: '11px', color: 'var(--dq-text)', fontWeight: 'bold', marginTop: '2px' }}>{resort.tent}</div>
                        </div>
                    )}
                    {resort.water && (
                        <div style={{
                            background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '8px',
                            textAlign: 'center', border: '1px solid var(--dq-window-border-inner)',
                        }}>
                            <div style={{ fontSize: '16px' }}>💧</div>
                            <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>みずば</div>
                            <div style={{ fontSize: '11px', color: 'var(--dq-text)', fontWeight: 'bold', marginTop: '2px' }}>{resort.water}</div>
                        </div>
                    )}
                </div>
            )}

            {/* 持ち物アドバイス */}
            <div style={{
                padding: '8px 10px',
                background: 'rgba(68, 255, 136, 0.08)',
                border: '1px solid rgba(68, 255, 136, 0.2)',
                borderRadius: '6px', fontSize: '12px',
                color: 'var(--dq-text-green)',
                marginBottom: '12px',
            }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>🎒 もちものリスト</div>
                <div style={{ lineHeight: '1.8', fontSize: '11px' }}>
                    {resort.category === 'trekking' ? (
                        <>
                            ✅ レインウェア・ヘッドライト・ちず<br />
                            {resort.weather.temp > 25
                                ? '✅ たいりょうの みず(2L↑)・ぼうし・ひやけどめ'
                                : resort.weather.temp > 15
                                    ? '✅ はおりもの・ひやけどめ・みず'
                                    : '✅ ぼうかんぎ・ダウン・てぶくろ'}
                            <br />
                            {resort.elevation && resort.elevation > 2500 && '✅ ぼうかんぎ（さんちょうは さむい）\n'}
                            {resort.features?.includes('アイゼン 必要') && '✅ けいアイゼン・トレッキングポール\n'}
                            {resort.features?.some((f: string) => f.includes('くさり') || f.includes('いわば')) && '✅ グローブ（いわば むき）\n'}
                            {resort.weather.forecast?.[0]?.precipitationProb >= 60 && '⚠️ あめよそう！ザックカバー ひっす'}
                        </>
                    ) : (
                        <>
                            {resort.weather.temp > 25 ? '✅ ひやけどめ・ぼうし・すいぶん' :
                                resort.weather.temp > 15 ? '✅ うすでの うわぎ・ひやけどめ' :
                                    '✅ ぼうかんぎ・レインウェア・すいぶん'}
                        </>
                    )}
                </div>
            </div>

            {/* ベストシーズン */}
            {resort.bestMonths && resort.bestMonths.length > 0 && (
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 8px', background: 'rgba(68, 255, 136, 0.08)',
                    border: '1px solid rgba(68, 255, 136, 0.2)',
                    borderRadius: '4px', fontSize: '12px', marginBottom: '12px',
                }}>
                    <span style={{ color: 'var(--dq-text-green)' }}>📅 ベストシーズン</span>
                    <span style={{ color: 'var(--dq-text)' }}>
                        {resort.bestMonths[0]}月〜{resort.bestMonths[resort.bestMonths.length - 1]}月
                    </span>
                </div>
            )}
        </>
    );
}
