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

    // 初期表示時に自動判定
    useEffect(() => {
        setSeason(detectSeason());
    }, []);

    // 手動で季節を切り替える
    const toggleSeason = () => {
        setSeason(prev => prev === 'winter' ? 'summer' : 'winter');
        setIsManualOverride(true);
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
