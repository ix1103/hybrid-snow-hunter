'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- 季節の型定義 ---
export type Season = 'winter' | 'summer';

// --- 月による自動判定 ---
// 11月〜4月 = 冬、5月〜10月 = 夏
export function detectSeason(): Season {
    const month = new Date().getMonth() + 1; // 1〜12
    return (month >= 5 && month <= 10) ? 'summer' : 'winter';
}

// --- localStorage のキー ---
const SEASON_STORAGE_KEY = 'snow_hunter_season';

// --- 保存された季節を取得（なければ自動判定） ---
export function getSavedSeason(): Season {
    if (typeof window === 'undefined') return detectSeason();
    const saved = localStorage.getItem(SEASON_STORAGE_KEY);
    if (saved === 'winter' || saved === 'summer') return saved;
    return detectSeason();
}

// --- Context の型 ---
interface SeasonContextType {
    season: Season;
    toggleSeason: () => void;
    isManualOverride: boolean; // ユーザーが手動で切り替えたかどうか
}

// --- Context 本体 ---
const SeasonContext = createContext<SeasonContextType>({
    season: 'winter',
    toggleSeason: () => { },
    isManualOverride: false,
});

// --- Provider コンポーネント ---
export function SeasonProvider({ children }: { children: ReactNode }) {
    const [season, setSeason] = useState<Season>('winter');
    const [isManualOverride, setIsManualOverride] = useState(false);

    // 初期表示時に localStorage → 自動判定
    useEffect(() => {
        setSeason(getSavedSeason());
    }, []);

    // 手動で季節を切り替える → localStorage に保存してリロード
    const toggleSeason = () => {
        const next = season === 'winter' ? 'summer' : 'winter';
        localStorage.setItem(SEASON_STORAGE_KEY, next);
        setIsManualOverride(true);
        // ページリロードでデータソースを切り替え
        window.location.reload();
    };

    // body にクラスを付与してCSSテーマを切り替え
    useEffect(() => {
        document.body.classList.remove('season-winter', 'season-summer');
        document.body.classList.add(`season-${season}`);
    }, [season]);

    return (
        <SeasonContext.Provider value={{ season, toggleSeason, isManualOverride }}>
            {children}
        </SeasonContext.Provider>
    );
}

// --- カスタムフック ---
export function useSeason() {
    return useContext(SeasonContext);
}
