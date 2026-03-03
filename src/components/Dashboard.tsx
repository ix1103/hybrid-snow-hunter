'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Advisor from '@/components/Advisor';
import ResortDetailModal from '@/components/ResortDetailModal';
import ComparePanel from '@/components/ComparePanel';
import { Resort } from '@/lib/resorts_data';
import { SummerSpot } from '@/lib/summer_spots_data';
import { WeatherData } from '@/lib/scoring';
import { fetchResortWeather } from '@/lib/weather';
import { useSeason } from '@/lib/season';
import { SpotWithWeather, resortToSpot, summerSpotToSpot } from '@/lib/spot_types';
import type { MapProps } from './Map';

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
    initialSummerSpots: SummerSpot[];
}

export default function Dashboard({ initialResorts, initialSummerSpots }: DashboardProps) {
    const [spots, setSpots] = useState<SpotWithWeather[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'powder' | 'calm' | 'cold' | 'favorites'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpot, setSelectedSpot] = useState<SpotWithWeather | null>(null);
    const [detailSpot, setDetailSpot] = useState<SpotWithWeather | null>(null);
    const [compareList, setCompareList] = useState<SpotWithWeather[]>([]);
    const [showCompare, setShowCompare] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const { season } = useSeason();
    const isSummer = season === 'summer';

    // 季節に応じたデータソースで天気を取得
    useEffect(() => {
        async function loadWeatherData() {
            setIsLoading(true);
            const BATCH_SIZE = 10;
            const allResults: SpotWithWeather[] = [];
            const sourceData = isSummer ? initialSummerSpots : initialResorts;
            try {
                for (let i = 0; i < sourceData.length; i += BATCH_SIZE) {
                    const batch = sourceData.slice(i, i + BATCH_SIZE);
                    const batchResults = await Promise.all(
                        batch.map(async (item) => {
                            const weather = await fetchResortWeather(item.lat, item.long, item.elevation ?? 500);
                            if (isSummer) {
                                return summerSpotToSpot({ ...(item as SummerSpot), weather });
                            } else {
                                return resortToSpot({ ...(item as Resort), weather });
                            }
                        })
                    );
                    allResults.push(...batchResults);
                    setSpots([...allResults]);
                    if (i === 0) setIsLoading(false);
                }
            } catch (error) {
                console.error("天気データの取得に失敗:", error);
                setIsLoading(false);
            }
        }
        loadWeatherData();
    }, [initialResorts, initialSummerSpots, isSummer]);

    // お気に入り読み込み（季節別キー）
    useEffect(() => {
        const key = isSummer ? 'green_hunter_favorites' : 'snow_hunter_favorites';
        const saved = localStorage.getItem(key);
        if (saved) setFavorites(new Set(JSON.parse(saved)));
    }, [isSummer]);

    const toggleFavorite = (spotId: string) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(spotId)) newFavorites.delete(spotId);
        else newFavorites.add(spotId);
        setFavorites(newFavorites);
        const key = isSummer ? 'green_hunter_favorites' : 'snow_hunter_favorites';
        localStorage.setItem(key, JSON.stringify(Array.from(newFavorites)));
    };

    const toggleCompare = (spot: SpotWithWeather) => {
        setCompareList(prev => {
            const exists = prev.find(r => r.id === spot.id);
            if (exists) return prev.filter(r => r.id !== spot.id);
            if (prev.length >= 3) return prev;
            return [...prev, spot];
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

    const filteredSpots = useMemo(() => {
        let result = spots;
        if (searchQuery) {
            result = result.filter(r =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.area.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (!isSummer) {
            if (filter === 'powder') result = result.filter(r => r.weather.snowfall_24h > 5);
            else if (filter === 'calm') result = result.filter(r => r.weather.wind < 15);
            else if (filter === 'cold') result = result.filter(r => r.weather.temp < 0);
            else if (filter === 'favorites') result = result.filter(r => favorites.has(r.id));
        } else {
            if (filter === 'favorites') result = result.filter(r => favorites.has(r.id));
        }
        return result;
    }, [spots, filter, searchQuery, favorites, isSummer]);

    const handleFilterChange = (newFilter: 'all' | 'powder' | 'calm' | 'cold' | 'favorites') => {
        setFilter(newFilter);
        setIsSidebarOpen(false);
    };

    const handleSpotClick = (spot: SpotWithWeather) => {
        setSelectedSpot(spot);
        setDetailSpot(spot);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    // ===== ローディング画面 =====
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen dq-fade-in"
                style={{ background: 'var(--dq-bg)' }}>
                <div className="dq-window" style={{
                    maxWidth: '360px', width: '88%', textAlign: 'center',
                    padding: '28px 24px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '0',
                }}>
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={isSummer ? '/title-logo-summer.png' : '/title-logo.png'}
                            alt={isSummer ? 'GREEN ADVENTURE HUNTER' : 'SNOW CONDITION HUNTER'}
                            style={{
                                width: '100%', maxWidth: '300px', objectFit: 'contain',
                                filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.5))'
                            }}
                        />
                    </div>
                    <div style={{
                        width: '70%', height: '1px',
                        background: 'linear-gradient(90deg, transparent, var(--dq-window-border), transparent)',
                        marginBottom: '16px'
                    }} />
                    <div style={{ fontSize: '13px', color: 'var(--dq-text)', lineHeight: '2' }}>
                        <p className="dq-text-appear" style={{ animationDelay: '0s' }}>
                            {isSummer ? 'やまの なつのしょを よんでいます' : 'ぼうけんのしょを よんでいます'}
                        </p>
                        <p className="dq-text-appear" style={{ animationDelay: '0.5s', color: 'var(--dq-text-dim)', fontSize: '12px' }}>
                            {isSummer ? 'やまの きこうを しらべています' : 'かくちの てんきを しらべています'}
                            <span className="dq-loading-dots"></span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ===== メインレイアウト =====
    return (
        <div className="flex h-screen w-screen overflow-hidden relative" style={{ background: 'var(--dq-bg)' }}>
            <button
                className="absolute top-3 right-3 z-[2000] md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                style={{
                    background: 'var(--dq-window-bg)', border: '2px solid var(--dq-window-border)',
                    borderRadius: '8px', padding: '8px 12px', color: 'var(--dq-text)', fontSize: '16px'
                }}
            >
                {isSidebarOpen ? '✕ とじる' : (isSummer ? '☰ たんさく' : '☰ さくせん')}
            </button>

            <div className={`absolute md:relative z-[1500] h-[100dvh] w-80 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
                style={{ background: 'var(--dq-bg-dark)' }}>
                <Advisor
                    resorts={filteredSpots as any}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    currentFilter={filter}
                    onFilterChange={handleFilterChange}
                    onResortClick={handleSpotClick as any}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />
            </div>

            <div className="flex-1 h-full relative z-[1000]">
                <Map
                    resorts={filteredSpots as any}
                    selectedResort={selectedSpot as any}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onResortClick={handleSpotClick as any}
                />
                <div className="absolute top-16 md:top-3 right-3 z-[1000] dq-window"
                    style={{ padding: '8px 16px', fontSize: '13px' }}>
                    <span style={{ color: 'var(--dq-text-gold)' }}>{filteredSpots.length}</span>
                    <span style={{ color: 'var(--dq-text-dim)', marginLeft: '4px' }}>
                        {isSummer ? 'の スポットを はっけん！' : 'の まちを はっけん！'}
                    </span>
                </div>
                {compareList.length > 0 && (
                    <button
                        onClick={() => setShowCompare(v => !v)}
                        className="absolute bottom-6 right-4 z-[1000] dq-window"
                        style={{ padding: '12px 20px', cursor: 'pointer', fontSize: '14px' }}
                    >
                        <span style={{ color: 'var(--dq-text-gold)' }}>⚔️ パーティへんせい</span>
                        <span style={{ color: 'var(--dq-text-dim)', marginLeft: '8px' }}>({compareList.length})</span>
                    </button>
                )}
            </div>

            {detailSpot && (
                <ResortDetailModal
                    resort={detailSpot as any}
                    isFavorite={favorites.has(detailSpot.id)}
                    isInCompare={compareList.some(r => r.id === detailSpot.id)}
                    onClose={() => setDetailSpot(null)}
                    onToggleFavorite={toggleFavorite}
                    onToggleCompare={toggleCompare as any}
                />
            )}
            {showCompare && compareList.length > 0 && (
                <ComparePanel
                    resorts={compareList as any}
                    onRemove={removeFromCompare}
                    onClose={() => setShowCompare(false)}
                />
            )}
        </div>
    );
}
