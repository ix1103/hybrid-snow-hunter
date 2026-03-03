'use client';

import { useState, useMemo } from 'react';
import { Resort } from '@/lib/resorts_data';
import { WeatherData, calculateConditionScore } from '@/lib/scoring';
import { calculateSummerScore } from '@/lib/scoring_summer';
import { useSeason } from '@/lib/season';

interface AdvisorProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resorts: any[];
    onFilterChange: (criteria: string) => void;
    currentFilter: string;
    onSearchChange: (query: string) => void;
    searchQuery: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResortClick: (resort: any) => void;
    favorites: Set<string>;
    onToggleFavorite: (id: string) => void;
}

export default function Advisor({ resorts, onFilterChange, currentFilter, onSearchChange, searchQuery, onResortClick, favorites, onToggleFavorite }: AdvisorProps) {
    const [showAll, setShowAll] = useState(false);
    const [selectedArea, setSelectedArea] = useState<string>('all');
    const [showScoreInfo, setShowScoreInfo] = useState(false);
    const { season, toggleSeason } = useSeason();
    const isSummer = season === 'summer';

    // 季節に応じたスコア計算関数を選択
    const calcScore = isSummer ? calculateSummerScore : calculateConditionScore;

    // ユニークなエリアを取得
    const uniqueAreas = useMemo(() => {
        const areas = new Set(resorts.map(r => r.area));
        return Array.from(areas);
    }, [resorts]);

    // 表示するリゾートの絞り込み・ソート
    const displayResorts = useMemo(() => {
        let filtered = [...resorts];

        // 1. 検索フィルター
        if (searchQuery) {
            return filtered
                .filter(r => r.name.includes(searchQuery) || r.area.includes(searchQuery))
                .map(r => ({ ...r, score: calcScore(r.weather) }));
        }

        // 2. エリアフィルター
        if (selectedArea !== 'all') {
            filtered = filtered.filter(r => r.area === selectedArea);
        }

        // 3. 季節別フィルター（Dashboardで既に絞り込まれているため不要だが、念のため残す場合は冬のコンディションのみ）
        if (!isSummer && currentFilter !== 'all' && currentFilter !== 'favorites') {
            // 冬モード: 元のコンディションフィルター
            if (currentFilter === 'powder') {
                filtered = filtered.filter(r => r.weather.snowfall_24h > 10);
            } else if (currentFilter === 'calm') {
                filtered = filtered.filter(r => r.weather.wind <= 5);
            } else if (currentFilter === 'cold') {
                filtered = filtered.filter(r => r.weather.temp < -5);
            }
        } else if (currentFilter === 'favorites') {
            filtered = filtered.filter(r => favorites.has(r.id));
        }

        // 4. スコア順ソート（季節対応・bestMonths/elevation も渡す）
        const sorted = filtered
            .map(r => ({
                ...r, score: isSummer
                    ? calculateSummerScore(r.weather, r.bestMonths, r.elevation)
                    : calcScore(r.weather)
            }))
            .sort((a, b) => b.score.score - a.score.score);

        // 5. 上位5件 or 全件
        return showAll ? sorted : sorted.slice(0, 5);
    }, [resorts, searchQuery, showAll, selectedArea, isSummer, currentFilter, favorites]);

    // スコアからDQ3風のレベル色を返す
    const getLevelColor = (score: number) => {
        if (score >= 80) return 'var(--dq-text-gold)';
        if (score >= 60) return 'var(--dq-text-green)';
        if (score >= 40) return 'var(--dq-text-blue)';
        return 'var(--dq-text-dim)';
    };

    // スコアからDQ3風のラベルを返す
    const getScoreLabel = (score: number) => {
        if (score >= 80) return '✨ でんせつきゅう';
        if (score >= 60) return '⚔️ ベテラン';
        if (score >= 40) return '🛡️ いっぱしの';
        return '📜 かけだし';
    };

    return (
        <div className="h-full flex flex-col overflow-y-auto pb-20 md:pb-0 relative"
            style={{ background: 'var(--dq-bg-dark)' }}>

            {/* ===== ヘッダー（DQ3タイトル風） ===== */}
            <div style={{
                margin: '16px 16px 8px',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
            }}>
                {/* タイトルロゴ画像（季節対応） */}
                {season === 'winter' ? (
                    <img
                        src="/title-logo.png"
                        alt="SNOW CONDITION HUNTER"
                        style={{
                            width: '100%',
                            maxWidth: '240px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.4))',
                        }}
                    />
                ) : (
                    <img
                        src="/yamacon-logo.png"
                        alt="やま▲こん～やまのゆうしゃたち～"
                        style={{
                            width: '100%',
                            maxWidth: '240px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.4))',
                            borderRadius: '8px'
                        }}
                    />
                )}

                {/* きせつを かえる ボタン */}
                <button
                    onClick={toggleSeason}
                    className="dq-window"
                    style={{
                        padding: '6px 16px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        color: season === 'winter' ? 'var(--dq-text-blue)' : 'var(--dq-text-green)',
                        border: `1px solid ${season === 'winter' ? 'var(--dq-text-blue)' : 'var(--dq-text-green)'}`,
                        borderRadius: '6px',
                        background: season === 'winter'
                            ? 'rgba(102, 187, 255, 0.1)'
                            : 'rgba(68, 255, 136, 0.1)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {season === 'winter' ? '❄️ ふゆの せかい' : '🌿 なつの せかい'}
                    ▶ きせつを かえる
                </button>

                {/* スコア情報ボタン */}
                <button
                    onClick={() => setShowScoreInfo(true)}
                    style={{
                        position: 'absolute',
                        top: '0px',
                        right: '-8px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--dq-text-dim)',
                        cursor: 'pointer',
                        fontSize: '18px',
                    }}
                    title="スコアの基準について"
                >
                    📖
                </button>
            </div>

            {/* ===== 検索入力（DQ3ウィンドウ風） ===== */}
            <div style={{ padding: '8px 12px 0' }}>
                <div className="dq-window" style={{ padding: '8px 12px' }}>
                    <input
                        type="text"
                        placeholder="▶ なまえを いれてください..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--dq-text)',
                            fontFamily: 'var(--font-pixel)',
                            fontSize: '13px',
                        }}
                    />
                </div>
            </div>

            {/* ===== さくせん（フィルター）エリア ===== */}
            {!searchQuery && (
                <div style={{ padding: '8px 12px 0' }}>
                    {/* コンディションフィルター（季節対応） */}
                    <div className="dq-window" style={{ padding: '12px' }}>
                        <div style={{
                            fontSize: '12px',
                            color: 'var(--dq-text-gold)',
                            marginBottom: '8px',
                            letterSpacing: '0.1em',
                        }}>
                            {isSummer ? '▼ アクティビティ' : '▼ さくせん'}
                        </div>

                        {/* コマンド選択リスト */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {isSummer ? [
                                // 夏モード: カテゴリフィルター（山関連のみ）
                                { key: 'all', label: '🗺️ すべての やまへ' },
                                { key: 'highland', label: '🏔️ ひしょち' },
                                { key: 'trekking', label: '🥾 やまのぼり' },
                                { key: 'camp', label: '🏕️ キャンプ' },
                                { key: 'mtb', label: '🚵 MTB' },
                            ].map(item => (
                                <button
                                    key={item.key}
                                    onClick={() => onFilterChange(currentFilter === item.key ? 'all' : item.key)}
                                    className={`dq-command ${currentFilter === item.key ? 'active' : ''}`}
                                    style={{ paddingLeft: '20px' }}
                                >
                                    {item.label}
                                </button>
                            )) : [
                                // 冬モード: 従来のコンディションフィルター
                                { key: 'favorites' as const, label: `⭐ なかまリスト (${favorites.size})` },
                                { key: 'all' as const, label: '🗺️ すべてのまち' },
                                { key: 'powder' as const, label: '❄️ ちからのゆき' },
                                { key: 'calm' as const, label: '🛡️ かぜの まもり' },
                                { key: 'cold' as const, label: '🧊 こおりの けっかい' },
                            ].map(item => (
                                <button
                                    key={item.key}
                                    onClick={() => onFilterChange(currentFilter === item.key ? 'all' : item.key)}
                                    className={`dq-command ${currentFilter === item.key ? 'active' : ''}`}
                                    style={{ paddingLeft: '20px' }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* エリアフィルター */}
                    <div className="dq-window" style={{ padding: '12px', marginTop: '8px' }}>
                        <div style={{
                            fontSize: '12px',
                            color: 'var(--dq-text-gold)',
                            marginBottom: '8px',
                            letterSpacing: '0.1em',
                        }}>
                            ▼ ちいきを えらぶ
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            <button
                                onClick={() => setSelectedArea('all')}
                                style={{
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontFamily: 'var(--font-pixel)',
                                    border: selectedArea === 'all' ? '2px solid var(--dq-text-gold)' : '1px solid var(--dq-window-border-inner)',
                                    background: selectedArea === 'all' ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
                                    color: selectedArea === 'all' ? 'var(--dq-text-gold)' : 'var(--dq-text-dim)',
                                    cursor: 'pointer',
                                }}
                            >
                                ぜんこく
                            </button>
                            {uniqueAreas.map(area => (
                                <button
                                    key={area}
                                    onClick={() => setSelectedArea(area)}
                                    style={{
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontFamily: 'var(--font-pixel)',
                                        border: selectedArea === area ? '2px solid var(--dq-text-gold)' : '1px solid var(--dq-window-border-inner)',
                                        background: selectedArea === area ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
                                        color: selectedArea === area ? 'var(--dq-text-gold)' : 'var(--dq-text-dim)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== ランキングリスト（DQ3ステータス風） ===== */}
            <div style={{ padding: '8px 12px', flex: 1 }}>
                <div className="dq-window" style={{ padding: '12px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                    }}>
                        <span style={{
                            fontSize: '12px',
                            color: 'var(--dq-text-gold)',
                            letterSpacing: '0.1em',
                        }}>
                            {isSummer ? '🌿' : '⚔️'} {searchQuery
                                ? 'けんさくけっか'
                                : (selectedArea !== 'all'
                                    ? `${selectedArea}の ${isSummer ? 'ひしょち' : 'つわもの'}`
                                    : (isSummer ? 'ランキング' : 'つよさ ランキング'))}
                        </span>
                        {!showAll && !searchQuery && (
                            <span style={{ fontSize: '10px', color: 'var(--dq-text-dim)' }}>
                                トップ5
                            </span>
                        )}
                    </div>

                    {displayResorts.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '20px',
                            color: 'var(--dq-text-dim)',
                            fontSize: '13px',
                        }}>
                            {isSummer ? 'このアクティビティは なかった！🌿' : 'まものは いなかった！🏔️'}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {displayResorts.map((resort, idx) => (
                                <div
                                    key={resort.id}
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
                                        e.currentTarget.style.background = 'rgba(13, 27, 62, 0.6)';
                                    }}
                                >
                                    {/* 上段: 順位・名前・レベル */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {/* 順位 */}
                                            {!searchQuery && (
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
                                                }}>
                                                    {resort.name}
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
                            ))}
                        </div>
                    )}

                    {/* もっと見る / 戻す ボタン */}
                    {!searchQuery && !showAll && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="dq-command"
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '12px',
                                color: 'var(--dq-text-blue)',
                                fontSize: '13px',
                                padding: '8px',
                                border: '1px dashed var(--dq-window-border-inner)',
                                borderRadius: '6px',
                            }}
                        >
                            ▼ つづきを みる（のこり {Math.max(0, resorts.filter(r => selectedArea === 'all' || r.area === selectedArea).length - 5)} けん）
                        </button>
                    )}

                    {!searchQuery && showAll && (
                        <button
                            onClick={() => setShowAll(false)}
                            className="dq-command"
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '12px',
                                color: 'var(--dq-text-dim)',
                                fontSize: '13px',
                                padding: '8px',
                            }}
                        >
                            ▲ ベスト5に もどる
                        </button>
                    )}
                </div>
            </div>

            {/* ===== スコア情報モーダル（DQ3ウィンドウ風） ===== */}
            {showScoreInfo && (
                <div
                    className="fixed inset-0 z-[2000] flex items-center justify-center dq-fade-in"
                    style={{ background: 'rgba(0, 0, 0, 0.75)', padding: '16px' }}
                    onClick={() => setShowScoreInfo(false)}
                >
                    <div className="dq-window" style={{ maxWidth: '360px', width: '100%' }}
                        onClick={e => e.stopPropagation()}>
                        {/* タイトル */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', marginBottom: '12px',
                        }}>
                            <span style={{ fontSize: '14px', color: 'var(--dq-text-gold)', fontWeight: 'bold' }}>
                                📖 {isSummer ? '☀️ スコアの きじゅん' : '❄️ レベルの きじゅん'}
                            </span>
                            <button
                                onClick={() => setShowScoreInfo(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--dq-text-dim)', cursor: 'pointer', fontSize: '16px' }}
                            >✕</button>
                        </div>

                        <div style={{ fontSize: '12px', color: 'var(--dq-text-dim)', marginBottom: '12px' }}>
                            {isSummer
                                ? 'きおんの「かいてきゾーン」を もとに ☀️0〜100で ひょうか。'
                                : 'どくじアルゴリズムで けいさんしています。'}
                        </div>

                        <hr className="dq-divider" />

                        {isSummer ? (
                            /* ===== 夏モードのスコア基準 ===== */
                            <>
                                {/* 快適ゾーン */}
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ color: 'var(--dq-text-green)', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                        🌡️ かいてきゾーン（さいじゅうよう）
                                    </div>
                                    <div style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--dq-text)', lineHeight: '1.8' }}>
                                        ・15〜22℃: <span style={{ color: 'var(--dq-text-gold)' }}>さいこうに きもちいい！(+25)</span><br />
                                        ・22〜28℃: <span style={{ color: 'var(--dq-text-green)' }}>かいてき・すごしやすい (+15)</span><br />
                                        ・10〜15℃: <span style={{ color: 'var(--dq-text-blue)' }}>うわぎが あればOK (+5)</span><br />
                                        ・0℃みまん: <span style={{ color: 'var(--dq-text-dim)' }}>さむすぎて むり！(-40)</span>
                                    </div>
                                </div>

                                {/* ベストシーズン */}
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ color: 'var(--dq-text-gold)', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                        📅 シーズンてきせい (+10 / -15)
                                    </div>
                                    <div style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--dq-text)', lineHeight: '1.8' }}>
                                        ・ベストシーズン中: <span style={{ color: 'var(--dq-text-gold)' }}>ベストシーズン！(+10)</span><br />
                                        ・シーズン外: <span style={{ color: 'var(--dq-text-dim)' }}>じゅんびが ひつよう (-15)</span>
                                    </div>
                                </div>

                                {/* 晴天 */}
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ color: 'var(--dq-text-orange)', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                        ☀️ てんき・こうすいリスク
                                    </div>
                                    <div style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--dq-text)', lineHeight: '1.8' }}>
                                        ・かいせい: <span style={{ color: 'var(--dq-text-gold)' }}>そとにんかん！(+15)</span><br />
                                        ・あめ: <span style={{ color: 'var(--dq-text-dim)' }}>トレッキングむずかしい (-15)</span><br />
                                        ・かみなり: <span style={{ color: 'var(--dq-text-red)' }}>やまは きけん！(-25)</span>
                                    </div>
                                </div>

                                {/* 風 */}
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ color: 'var(--dq-text-blue)', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                        💨 そよかぜ / つよかぜ
                                    </div>
                                    <div style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--dq-text)', lineHeight: '1.8' }}>
                                        ・1〜4m/s（そよかぜ）: <span style={{ color: 'var(--dq-text-green)' }}>きもちよすぎる (+10)</span><br />
                                        ・10m/s いじょう: <span style={{ color: 'var(--dq-text-red)' }}>つよかぜ注意 (-15)</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* ===== 冬モードのスコア基準（従来） ===== */
                            <>
                                {/* 降雪量 */}
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ color: 'var(--dq-text-blue)', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                        ❄️ こうせつりょう (+さいだい40)
                                    </div>
                                    <div style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--dq-text)', lineHeight: '1.8' }}>
                                        ・30cm いじょう: <span style={{ color: 'var(--dq-text-gold)' }}>かいしんの いちげき！(+40)</span><br />
                                        ・15cm いじょう: <span style={{ color: 'var(--dq-text-green)' }}>よい こうげき (+20)</span><br />
                                        ・5cm いじょう: <span style={{ color: 'var(--dq-text-blue)' }}>ちょっとした ゆき (+10)</span>
                                    </div>
                                </div>

                                {/* 気温 */}
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ color: 'var(--dq-text-orange)', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                        🌡️ きおん・ゆきしつ (+10 / -20)
                                    </div>
                                    <div style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--dq-text)', lineHeight: '1.8' }}>
                                        ・-5℃ いか: <span style={{ color: 'var(--dq-text-blue)' }}>ごくじょうゆき (+10)</span><br />
                                        ・5℃ いじょう: <span style={{ color: 'var(--dq-text-red)' }}>シャバゆき (-20)</span>
                                    </div>
                                </div>

                                {/* 風速 */}
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ color: 'var(--dq-text-green)', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                        💨 ふうそく (-10 / -30)
                                    </div>
                                    <div style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--dq-text)', lineHeight: '1.8' }}>
                                        ・8m/s いじょう: <span style={{ color: 'var(--dq-text-dim)' }}>さむくて つらい (-10)</span><br />
                                        ・15m/s いじょう: <span style={{ color: 'var(--dq-text-red)' }}>うんきゅうリスク大 (-30)</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <hr className="dq-divider" />

                        <div style={{ fontSize: '10px', color: 'var(--dq-text-dim)', textAlign: 'center' }}>
                            ※あくまで めやすです。こうしきサイトで かくにんを。
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
