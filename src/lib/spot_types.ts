/**
 * 冬(Resort)と夏(SummerSpot)の共通型を定義
 * コンポーネントはこの共通型でデータを扱う
 */

import { Resort } from './resorts_data';
import { SummerSpot } from './summer_spots_data';
import { WeatherData } from './scoring';

// --- コンポーネントが受け取る共通型 ---
// 冬でも夏でも、地図・カード・フィルターが使える最小インターフェース
export interface SpotBase {
    id: string;
    name: string;
    lat: number;
    long: number;
    elevation?: number;
    area: string;
    url?: string;
}

// 天気データ付きの共通型
export type SpotWithWeather = SpotBase & {
    weather: WeatherData;
    // 冬専用フィールド（存在する場合のみ）
    snowfall_24h?: number;
    snow_depth?: number;
    // 夏専用フィールド（存在する場合のみ）
    category?: SummerSpot['category'];
    activities?: string[];
    bestMonths?: number[];
    difficulty?: number;
    courseTime?: string;
    features?: string[];
    hut?: string;
    tent?: string;
    water?: string;
    summer_url?: string;
    summer_activities?: string[];
    // 登山スタイル（バリエーション・アルパイン等）
    climbingStyle?: 'trekking' | 'scrambling' | 'variation' | 'alpine';
};

// --- Resort → SpotWithWeather 変換 ---
export function resortToSpot(resort: Resort & { weather: WeatherData }): SpotWithWeather {
    return {
        ...resort,
        summer_url: resort.summer_url,
        summer_activities: resort.summer_activities,
    };
}

// --- SummerSpot → SpotWithWeather 変換 ---
export function summerSpotToSpot(spot: SummerSpot & { weather: WeatherData }): SpotWithWeather {
    return {
        ...spot,
        category: spot.category,
        activities: spot.activities,
        bestMonths: spot.bestMonths,
        difficulty: spot.difficulty,
        courseTime: spot.courseTime,
        features: spot.features,
        hut: spot.hut,
        tent: spot.tent,
        water: spot.water,
        climbingStyle: spot.climbingStyle,
    };
}
