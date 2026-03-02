'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Advisor from '@/components/Advisor';
import ResortDetailModal from '@/components/ResortDetailModal';
import ComparePanel from '@/components/ComparePanel';
import { Resort } from '@/lib/resorts_data';
import { WeatherData } from '@/lib/scoring';
import { fetchResortWeather } from '@/lib/weather';
import type { MapProps } from './Map';

// 地図の動的インポート（SSR無効）
const Map = dynamic<MapProps>(() => import('./Map'), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center" style={{ background: 'var(--dq-bg)' }}>
            <span style={{ color: 'var(--dq-text-dim)' }}>ちずを ひろげています...</span>
        </div>
    )
});

interface DashboardProps {
    initialResorts: Resort[];
}

export default function Dashboard({ initialResorts }: DashboardProps) {
    const [resorts, setResorts] = useState<(Resort & { weather: WeatherData })[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'powder' | 'calm' | 'cold' | 'favorites'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedResort, setSelectedResort] = useState<(Resort & { weather: WeatherData }) | null>(null);
    const [detailResort, setDetailResort] = useState<(Resort & { weather: WeatherData }) | null>(null);
    const [compareList, setCompareList] = useState<(Resort & { weather: WeatherData })[]>([]);
    const [showCompare, setShowCompare] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    // クライアントサイドで天気データを取得
    useEffect(() => {
        async function loadWeatherData() {
            setIsLoading(true);
            try {
                const promises = initialResorts.map(async (resort) => {
                    const weather = await fetchResortWeather(resort.lat, resort.long, resort.elevation);
                    return { ...resort, weather };
                });
                const results = await Promise.all(promises);
                setResorts(results);
            } catch (error) {
                console.error("天気データの取得に失敗:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadWeatherData();
    }, [initialResorts]);

    // お気に入りをlocalStorageから読み込み
    useEffect(() => {
        const saved = localStorage.getItem('snow_hunter_favorites');
        if (saved) {
            setFavorites(new Set(JSON.parse(saved)));
        }
    }, []);

    // お気に入りのトグル
    const toggleFavorite = (resortId: string) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(resortId)) {
            newFavorites.delete(resortId);
        } else {
            newFavorites.add(resortId);
        }
        setFavorites(newFavorites);
        localStorage.setItem('snow_hunter_favorites', JSON.stringify(Array.from(newFavorites)));
    };

    // 比較パネルのトグル
    const toggleCompare = (resort: Resort & { weather: WeatherData }) => {
        setCompareList(prev => {
            const exists = prev.find(r => r.id === resort.id);
            if (exists) return prev.filter(r => r.id !== resort.id);
            if (prev.length >= 3) return prev; // 最大3つ
            return [...prev, resort];
        });
        setShowCompare(true);
    };

    const removeFromCompare = (id: string) => {
        setCompareList(prev => {
            const next = prev.filter(r => r.id !== id);
            if (next.length === 0) setShowCompare(false);
            return next;
        });
    };

    // フィルターロジック
    const filteredResorts = useMemo(() => {
        let result = resorts;

        if (searchQuery) {
            result = result.filter(r =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.area.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filter === 'powder') {
            result = result.filter(r => r.weather.snowfall_24h > 5);
        } else if (filter === 'calm') {
            result = result.filter(r => r.weather.wind < 15);
        } else if (filter === 'cold') {
            result = result.filter(r => r.weather.temp < 0);
        } else if (filter === 'favorites') {
            result = result.filter(r => favorites.has(r.id));
        }

        return result;
    }, [resorts, filter, searchQuery, favorites]);

    const handleFilterChange = (newFilter: 'all' | 'powder' | 'calm' | 'cold' | 'favorites') => {
        setFilter(newFilter);
        setIsSidebarOpen(false);
    };

    const handleResortClick = (resort: Resort & { weather: WeatherData }) => {
        setSelectedResort(resort);
        setDetailResort(resort);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    // ===== ローディング画面 (DQ3風) =====
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen dq-fade-in"
                style={{ background: 'var(--dq-bg)' }}>
                <div className="dq-window" style={{ maxWidth: '400px', width: '90%', textAlign: 'center' }}>
                    {/* DQ3風ロゴ */}
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '28px', color: 'var(--dq-text-gold)', fontWeight: 'bold', letterSpacing: '0.15em' }}
                            className="dq-glow">
                            スノコン
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--dq-text-dim)', marginTop: '4px', letterSpacing: '0.2em' }}>
                            ～ゆきの ゆうしゃたち～
                        </div>
                    </div>

                    {/* ドット風装飾ライン */}
                    <div style={{
                        margin: '16px auto',
                        width: '60%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--dq-window-border), transparent)'
                    }} />

                    {/* ローディングメッセージ */}
                    <div style={{
                        fontSize: '14px',
                        color: 'var(--dq-text)',
                        lineHeight: '2',
                    }}>
                        <p className="dq-text-appear" style={{ animationDelay: '0s' }}>
                            ぼうけんのしょを よんでいます
                        </p>
                        <p className="dq-text-appear" style={{ animationDelay: '0.5s', color: 'var(--dq-text-dim)' }}>
                            かくちの てんきを しらべています<span className="dq-loading-dots"></span>
                        </p>
                    </div>

                    {/* ヒーローイラスト */}
                    <div style={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <img
                            src="/loading-hero.png"
                            alt="雪の勇者"
                            style={{
                                width: '160px',
                                height: '160px',
                                objectFit: 'contain',
                                imageRendering: 'pixelated',
                                opacity: 0.9,
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // ===== メインレイアウト (DQ3風) =====
    return (
        <div className="flex h-screen w-screen overflow-hidden relative" style={{ background: 'var(--dq-bg)' }}>
            {/* モバイルメニューボタン */}
            <button
                className="absolute top-3 left-14 z-[2000] md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                style={{
                    background: 'var(--dq-window-bg)',
                    border: '2px solid var(--dq-window-border)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: 'var(--dq-text)',
                    fontSize: '16px',
                }}
            >
                {isSidebarOpen ? '✕ とじる' : '☰ さくせん'}
            </button>

            {/* サイドバー / Advisor */}
            <div className={`
                absolute md:relative z-[1500] h-[100dvh] w-80 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
                style={{ background: 'var(--dq-bg-dark)' }}
            >
                <Advisor
                    resorts={filteredResorts}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    currentFilter={filter}
                    onFilterChange={handleFilterChange}
                    onResortClick={handleResortClick}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />
            </div>

            {/* メイン地図エリア */}
            <div className="flex-1 h-full relative z-[1000]">
                <Map
                    resorts={filteredResorts}
                    selectedResort={selectedResort}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onResortClick={handleResortClick}
                />

                {/* フローティング表示数バッジ (DQ3ウィンドウ風) */}
                <div className="absolute top-3 right-3 z-[1000] dq-window"
                    style={{ padding: '8px 16px', fontSize: '13px' }}>
                    <span style={{ color: 'var(--dq-text-gold)' }}>{filteredResorts.length}</span>
                    <span style={{ color: 'var(--dq-text-dim)', marginLeft: '4px' }}>の まちを はっけん！</span>
                </div>

                {/* フローティング比較ボタン (DQ3コマンド風) */}
                {compareList.length > 0 && (
                    <button
                        onClick={() => setShowCompare(v => !v)}
                        className="absolute bottom-6 right-4 z-[1000] dq-window"
                        style={{
                            padding: '12px 20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        <span style={{ color: 'var(--dq-text-gold)' }}>⚔️ パーティへんせい</span>
                        <span style={{ color: 'var(--dq-text-dim)', marginLeft: '8px' }}>({compareList.length})</span>
                    </button>
                )}
            </div>

            {/* 詳細モーダル */}
            {detailResort && (
                <ResortDetailModal
                    resort={detailResort}
                    isFavorite={favorites.has(detailResort.id)}
                    onClose={() => setDetailResort(null)}
                    onToggleFavorite={toggleFavorite}
                />
            )}

            {/* 比較パネル */}
            {showCompare && compareList.length > 0 && (
                <ComparePanel
                    resorts={compareList}
                    onRemove={removeFromCompare}
                    onClose={() => setShowCompare(false)}
                />
            )}
        </div>
    );
}
