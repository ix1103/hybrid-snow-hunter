'use client';

import { useEffect } from 'react';
import { useSeason } from '@/lib/season';
import { SpotWithWeather } from '@/lib/spot_types';
import {
    calculateConditionScore,
    getWeatherLabel,
    getSnowQuality,
    calculateWindChill,
    getClothingAdvice,
    generateAIAnalysis
} from '@/lib/scoring';
import {
    calculateSummerScore,
    generateSummerAnalysis
} from '@/lib/scoring_summer';

// サブコンポーネント群
import { ModalHeader } from './detail/ModalHeader';
import SummerStatus from './detail/SummerStatus';
import WinterStatus from './detail/WinterStatus';
import WeeklyForecast from './detail/WeeklyForecast';
import ModalActions from './detail/ModalActions';

export interface ResortDetailModalProps {
    resort: SpotWithWeather;
    isFavorite: boolean;
    isInCompare: boolean;
    onClose: () => void;
    onToggleFavorite: (id: string) => void;
    onToggleCompare: (resort: SpotWithWeather) => void;
}

export default function ResortDetailModal({
    resort,
    isFavorite,
    isInCompare,
    onClose,
    onToggleFavorite,
    onToggleCompare
}: ResortDetailModalProps) {
    const { season } = useSeason();
    const isSummer = season === 'summer';

    // --- アクセシビリティ：Escapeキーで閉じる ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // --- 各種計算 ---
    const condition = isSummer
        ? calculateSummerScore(resort.weather, resort.bestMonths, resort.elevation)
        : calculateConditionScore(resort.weather);

    const weatherLabel = getWeatherLabel(resort.weather.weather_code);
    const snowQuality = isSummer ? null : getSnowQuality(resort.weather);
    const windChill = isSummer ? 0 : calculateWindChill(resort.weather.temp, resort.weather.wind);
    const clothingAdvice = isSummer ? '' : getClothingAdvice(windChill);

    const aiComment = isSummer
        ? generateSummerAnalysis(resort.name, resort.area, resort.weather)
        : generateAIAnalysis(resort.name, resort.area, resort.weather);

    return (
        <div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 dq-fade-in"
            style={{ background: 'rgba(0, 0, 0, 0.75)' }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="dq-window relative flex flex-col"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    maxHeight: '90vh',
                    padding: '16px',
                    overflow: 'hidden',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* ヘッダー情報（名前、お気に入り、レベル表示） */}
                <ModalHeader
                    resort={resort}
                    condition={condition}
                    isSummer={isSummer}
                    isFavorite={isFavorite}
                    onToggleFavorite={onToggleFavorite}
                    onClose={onClose}
                />

                {/* スクロール可能なコンテンツ領域 */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    paddingRight: '4px',
                    marginTop: '16px',
                }} className="dq-scrollbar">

                    {isSummer ? (
                        <SummerStatus
                            resort={resort}
                            weatherLabel={weatherLabel}
                        />
                    ) : (
                        <WinterStatus
                            resort={resort}
                            weatherLabel={weatherLabel}
                            snowQuality={snowQuality}
                            windChill={windChill}
                            clothingAdvice={clothingAdvice}
                        />
                    )}

                    {/* 週間予報 + AIコメント */}
                    <WeeklyForecast
                        resort={resort}
                        aiComment={aiComment}
                    />

                    {/* アクションボタン群 */}
                    <ModalActions
                        resort={resort}
                        isSummer={isSummer}
                    />

                    {/* ちょっと空白（スクロールの見た目のため） */}
                    <div style={{ height: '8px' }} />
                </div>
            </div>
        </div>
    );
}
