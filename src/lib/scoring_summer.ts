/**
 * 夏モード用スコアリングロジック
 * 「避暑度」「晴天度」「風の心地よさ」「降水リスク」の4軸で評価
 */

import { WeatherData, ConditionScore, DailyForecast } from './scoring';

// --- 基準となる都市部の気温（東京の平均気温を想定） ---
const CITY_REFERENCE_TEMPS: Record<number, number> = {
    // 月ごとの東京の平均最高気温（概算）
    1: 10, 2: 11, 3: 15, 4: 20,
    5: 25, 6: 27, 7: 31, 8: 33,
    9: 29, 10: 23, 11: 17, 12: 12,
};

function getCityTemp(): number {
    const month = new Date().getMonth() + 1;
    return CITY_REFERENCE_TEMPS[month] ?? 28;
}

// --- 夏モードのコンディションスコア ---
export function calculateSummerScore(data: WeatherData): ConditionScore {
    let score = 50;

    // 1. 避暑度（都市との気温差が大きいほど高スコア）
    const cityTemp = getCityTemp();
    const tempDiff = cityTemp - data.temp; // 正の値なら山の方が涼しい
    if (tempDiff >= 15) score += 30;       // 15℃以上涼しい → 最高の避暑地
    else if (tempDiff >= 10) score += 20;  // 10℃以上涼しい → 快適
    else if (tempDiff >= 5) score += 10;   // 5℃以上涼しい → まあまあ
    else if (tempDiff < 0) score -= 10;    // 山の方が暑い（ありえないが念のため）

    // 2. 晴天度（天気コードで判定）
    if (data.weather_code === 0) score += 15;           // 快晴
    else if (data.weather_code <= 3) score += 5;        // 曇り
    else if (data.weather_code >= 61) score -= 15;      // 雨
    else if (data.weather_code >= 95) score -= 25;      // 雷雨

    // 3. 風の心地よさ（微風が最高、強風はマイナス）
    if (data.wind >= 1 && data.wind <= 4) score += 10;  // そよ風 → 最高
    else if (data.wind > 10) score -= 15;               // 強風
    else if (data.wind > 7) score -= 5;                 // やや強風

    // 4. 降水リスク（予報の降水確率）
    // forecast の当日分を使う
    if (data.forecast && data.forecast.length > 0) {
        const todayProb = data.forecast[0].precipitationProb ?? 0;
        if (todayProb > 70) score -= 15;
        else if (todayProb > 40) score -= 5;
        else if (todayProb < 20) score += 5;
    }

    // スコアの範囲制限
    score = Math.max(0, Math.min(100, score));

    // DQ3風のラベル
    let label = 'ふつう';
    let color = 'bg-yellow-500';

    if (score >= 80) {
        label = 'さいこうの ひしょち！';
        color = 'bg-emerald-500';
    } else if (score >= 60) {
        label = 'あつさから にげろ！';
        color = 'bg-green-500';
    } else if (score <= 30) {
        label = 'きょうは やめとけ…';
        color = 'bg-gray-500';
    }

    // 理由の生成
    const reasons = [];
    const diffRounded = Math.round(tempDiff);
    if (tempDiff >= 10) reasons.push(`都会より${diffRounded}℃涼しい`);
    if (data.weather_code === 0) reasons.push('快晴');
    if (data.weather_code >= 61 && data.weather_code < 95) reasons.push('雨に注意');
    if (data.wind > 10) reasons.push('強風注意');
    if (reasons.length === 0) reasons.push('おだやかな日');

    return { score, label, color, details: reasons.join(' / ') };
}

// --- 夏モードのAIコメント ---
export function generateSummerAnalysis(resortName: string, area: string, data: WeatherData): string {
    const parts = [];
    const cityTemp = getCityTemp();
    const tempDiff = Math.round(cityTemp - data.temp);

    // 1. 避暑コメント
    if (tempDiff >= 15) {
        parts.push(`${resortName}は今、下界より${tempDiff}℃も涼しい！まさに天然のクーラーです。ひんやりした空気を思い切り楽しみましょう。`);
    } else if (tempDiff >= 8) {
        parts.push(`都会より${tempDiff}℃涼しい環境です。心地よい風が吹き抜けるはず。`);
    } else {
        parts.push(`標高の恩恵で少し涼しいですが、水分補給は忘れずに。`);
    }

    // 2. 天気コメント
    if (data.weather_code === 0) {
        parts.push('☀️ 快晴予報！山頂からの眺望は最高でしょう。日焼け止めをお忘れなく。');
    } else if (data.weather_code >= 61 && data.weather_code < 80) {
        parts.push('☔ 雨の予報が出ています。レインウェアの準備を。霧に包まれた山も幻想的ですよ。');
    } else if (data.weather_code >= 95) {
        parts.push('⛈️ 雷雨注意報！今日は無理せず、ふもとで過ごすのが賢明です。');
    } else {
        parts.push('曇り空ですが、直射日光が少ないぶん、アクティビティには快適かもしれません。');
    }

    // 3. 風のコメント
    if (data.wind > 10) {
        parts.push('⚠️ 風が強いため、ゴンドラや展望台は注意が必要です。');
    }

    return parts.join('\n');
}

// --- 夏モードの週間サマリー ---
export function generateSummerWeekSummary(forecast: DailyForecast[]): { bestDayLabel: string; summary: string } {
    if (!forecast || forecast.length === 0) {
        return { bestDayLabel: '', summary: '' };
    }

    const cityTemp = getCityTemp();

    // 最も避暑に適した日（涼しくて晴れ）を探す
    let bestIdx = 0;
    let bestScore = -Infinity;
    forecast.forEach((day, i) => {
        const avgTemp = (day.maxTemp + day.minTemp) / 2;
        const tempDiff = cityTemp - avgTemp;
        const isFineDayCode = day.weatherCode <= 3;
        const score = tempDiff * 2 + (isFineDayCode ? 20 : 0) - (day.precipitationProb / 5);
        if (score > bestScore) {
            bestScore = score;
            bestIdx = i;
        }
    });

    const bestDay = forecast[bestIdx];
    const date = new Date(bestDay.date);
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const dayLabel = bestIdx === 0 ? '今日' : bestIdx === 1 ? '明日' : `${date.getMonth() + 1}/${date.getDate()}(${dayNames[date.getDay()]})`;

    const avgTemp = Math.round((bestDay.maxTemp + bestDay.minTemp) / 2);
    const diff = Math.round(cityTemp - avgTemp);

    let summary = '';
    if (diff >= 10 && bestDay.weatherCode <= 3) {
        summary = `🎯 ${dayLabel}がベスト！${diff}℃涼しくて快晴予報`;
    } else if (diff >= 5) {
        summary = `⭐ ${dayLabel}が狙い目。避暑にちょうどいい気温`;
    } else if (forecast.some(d => d.precipitationProb > 60)) {
        summary = '☔ 今週は雨が多め。天気予報をこまめにチェック';
    } else {
        summary = `📅 ${dayLabel}のコンディションが比較的良さそう`;
    }

    return { bestDayLabel: dayLabel, summary };
}
