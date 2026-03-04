'use client';

import { useState, useMemo } from 'react';
import { calculateConditionScore } from '@/lib/scoring';
import { calculateSummerScore } from '@/lib/scoring_summer';
import { useSeason } from '@/lib/season';
import { SpotWithWeather } from '@/lib/spot_types';
import SpotCard from './SpotCard';

interface AdvisorProps {
    resorts: SpotWithWeather[];
    onFilterChange: (criteria: string) => void;
    currentFilter: string;
    onSearchChange: (query: string) => void;
    searchQuery: string;
    onResortClick: (resort: SpotWithWeather) => void;
    favorites: Set<string>;
    onToggleFavorite: (id: string) => void;
    selectedArea: string;
    onAreaChange: (area: string) => void;
    uniqueAreas: string[];
}

export default function Advisor({ resorts, onFilterChange, currentFilter, onSearchChange, searchQuery, onResortClick, favorites, onToggleFavorite, selectedArea, onAreaChange, uniqueAreas }: AdvisorProps) {
    const [showAll, setShowAll] = useState(false);
    const [showScoreInfo, setShowScoreInfo] = useState(false);
    const { season, toggleSeason } = useSeason();
    const isSummer = season === 'summer';

    // 季節に応じたスコア計算関数を選択
    const calcScore = isSummer ? calculateSummerScore : calculateConditionScore;

    // 表示するリゾートのソート（絞り込みはDashboardで完了済のため不要）
    const displayResorts = useMemo(() => {
        // スコア順ソート（季節対応・bestMonths/elevation も渡す）
        const sorted = [...resorts]
            .map(r => ({
                ...r, score: isSummer
                    ? calculateSummerScore(r.weather, r.bestMonths, r.elevation)
                    : calcScore(r.weather)
            }))
            .sort((a, b) => b.score.score - a.score.score);

        // 上位5件 or 全件（検索・エリア・カテゴリ指定時は全件表示）
        const isFiltering = searchQuery !== '' || selectedArea !== 'all' || currentFilter !== 'all';
        return (showAll || isFiltering) ? sorted : sorted.slice(0, 5);
    }, [resorts, showAll, isSummer, searchQuery, selectedArea, currentFilter]);

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
                        src="/title-logo-summer.png"
                        alt="やま▲こん～やまのゆうしゃたち～"
                        style={{
                            width: '100%',
                            maxWidth: '240px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.4))',
                        }}
                    />
                )}

                {/* きせつ セグメントコントロール */}
                <div style={{
                    display: 'flex',
                    border: '2px solid var(--dq-window-border)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                }}>
                    {/* ふゆ */}
                    <button
                        onClick={() => season !== 'winter' && toggleSeason()}
                        style={{
                            padding: '10px 20px',
                            cursor: season === 'winter' ? 'default' : 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            border: 'none',
                            outline: 'none',
                            background: season === 'winter'
                                ? 'rgba(102, 187, 255, 0.28)'
                                : 'transparent',
                            color: season === 'winter'
                                ? 'var(--dq-text-blue)'
                                : 'var(--dq-text-dim)',
                            transition: 'all 0.25s ease',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        {/* 非アクティブ時のみ▶を表示して点滅 */}
                        {season !== 'winter' && (
                            <span className="dq-blink" style={{ fontSize: '12px', color: 'var(--dq-text-blue)' }}>▶</span>
                        )}
                        ❄️ ふゆ
                    </button>
                    {/* 仕切り線 */}
                    <div style={{ width: '2px', background: 'var(--dq-window-border)', flexShrink: 0 }} />
                    {/* なつ */}
                    <button
                        onClick={() => season !== 'summer' && toggleSeason()}
                        style={{
                            padding: '10px 20px',
                            cursor: season === 'summer' ? 'default' : 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            border: 'none',
                            outline: 'none',
                            background: season === 'summer'
                                ? 'rgba(68, 255, 136, 0.22)'
                                : 'transparent',
                            color: season === 'summer'
                                ? 'var(--dq-text-green)'
                                : 'var(--dq-text-dim)',
                            transition: 'all 0.25s ease',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        {/* 非アクティブ時のみ▶を表示して点滅 */}
                        {season !== 'summer' && (
                            <span className="dq-blink" style={{ fontSize: '12px', color: 'var(--dq-text-green)' }}>▶</span>
                        )}
                        🌿 なつ
                    </button>
                </div>

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
                                { key: 'trekking', label: '🥾 やまのぼり' },
                                { key: 'camp', label: '🏕️ キャンプ' },
                                { key: 'mtb', label: '🚵 MTB' },
                                { key: 'highland', label: '🏔️ ひしょち' },
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
                                onClick={() => onAreaChange('all')}
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
                                    onClick={() => onAreaChange(area)}
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
                                <SpotCard
                                    key={resort.id}
                                    resort={resort}
                                    idx={idx}
                                    showRank={!searchQuery}
                                    isSummer={isSummer}
                                    favorites={favorites}
                                    onToggleFavorite={onToggleFavorite}
                                    onResortClick={onResortClick}
                                    getLevelColor={getLevelColor}
                                    getScoreLabel={getScoreLabel}
                                />
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
