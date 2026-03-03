/**
 * 夏モード用スコアリングロジック（v2 - 現実版）
 * 「快適度」「晴天度」「風の心地よさ」「降水リスク」「シーズン適性」の5軸で評価
 * 寒すぎる場所（3月の富良野など）は正しく低スコアになる
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

function getCurrentMonth(): number {
    return new Date().getMonth() + 1;
}

// --- 夏モードのコンディションスコア（v2） ---
// bestMonths を渡すとシーズン適性も考慮する
export function calculateSummerScore(
    data: WeatherData,
    bestMonths?: number[],
    elevation?: number,
): ConditionScore {
    let score = 50;
    const temp = data.temp;
    const cityTemp = getCityTemp();
    const month = getCurrentMonth();

    // ==================================
    // 1. 快適度（最重要: 実際の気温が快適かどうか）
    // ==================================
    // 快適ゾーン: 15〜28℃が最高、それ以外はペナルティ
    if (temp >= 15 && temp <= 22) {
        score += 25;  // 最高に快適（涼しくて気持ちいい）
    } else if (temp >= 22 && temp <= 28) {
        score += 15;  // 快適（暖かいけど暑すぎない）
    } else if (temp >= 10 && temp < 15) {
        score += 5;   // やや涼しい（上着があればOK）
    } else if (temp >= 5 && temp < 10) {
        score -= 10;  // 寒い（春or秋の装備が必要）
    } else if (temp >= 0 && temp < 5) {
        score -= 25;  // かなり寒い（アウトドアは厳しい）
    } else if (temp < 0) {
        score -= 40;  // 氷点下（夏のアクティビティは不可能）
    } else if (temp > 28 && temp <= 33) {
        score -= 5;   // 暑い（避暑の意味がない）
    } else if (temp > 33) {
        score -= 15;  // 猛暑（危険）
    }

    // 都会との気温差ボーナス（ただし快適ゾーン内のみ有効）
    if (temp >= 10 && temp <= 28) {
        const tempDiff = cityTemp - temp;
        if (tempDiff >= 10) score += 10;       // かなり涼しい
        else if (tempDiff >= 5) score += 5;    // 程よく涼しい
    }

    // 2. 晴天度（天気コードで判定）
    if (data.weather_code === 0) score += 15;           // 快晴
    else if (data.weather_code <= 3) score += 5;        // 曇り
    else if (data.weather_code >= 95) score -= 40;      // 雷雨（命に関わるので大幅減点）
    else if (data.weather_code >= 61) score -= 15;      // 雨

    // 3. 風の心地よさ（登山の稜線では風は最強の敵）
    if (temp >= 15 && data.wind >= 1 && data.wind <= 4) score += 10;  // 快適な気温でのそよ風
    else if (data.wind >= 15) score -= 50;              // 暴風（アウトドア中止レベル）
    else if (data.wind >= 10) score -= 30;              // 強風（テント倒壊・稜線歩行危険）
    else if (data.wind > 7) score -= 10;                 // やや強風

    // 4. 降水リスク
    if (data.forecast && data.forecast.length > 0) {
        const todayProb = data.forecast[0].precipitationProb ?? 0;
        if (todayProb > 70) score -= 15;
        else if (todayProb > 40) score -= 5;
        else if (todayProb < 20) score += 5;
    }

    // 5. シーズン適性（bestMonths が指定されている場合）
    if (bestMonths && bestMonths.length > 0) {
        if (bestMonths.includes(month)) {
            score += 10;  // ベストシーズン！
        } else {
            score -= 15;  // シーズン外
        }
    }

    // 6. 標高ボーナス（夏に1500m以上は涼しい恩恵）
    if (elevation && elevation >= 1500 && temp >= 10 && temp <= 25) {
        score += 5;
    }

    // スコアの範囲制限
    score = Math.max(0, Math.min(100, score));

    // DQ3風のラベル（気温に応じて変化）
    let label = 'ふつう';
    let color = 'bg-yellow-500';

    if (temp < 5) {
        label = 'さむすぎて むり！';
        color = 'bg-blue-500';
    } else if (score >= 80) {
        label = 'さいこうの ひしょち！';
        color = 'bg-emerald-500';
    } else if (score >= 60) {
        label = 'ぼうけんに でかけよう！';
        color = 'bg-green-500';
    } else if (score <= 20) {
        label = 'きょうは やめとけ…';
        color = 'bg-gray-500';
    } else if (score <= 35) {
        label = 'じゅんびを しっかり';
        color = 'bg-orange-500';
    }

    // 理由の生成（現実的に）
    const reasons = [];
    if (temp < 0) reasons.push(`氷点下${Math.abs(Math.round(temp))}℃！`);
    else if (temp < 10) reasons.push(`気温${Math.round(temp)}℃（寒い）`);
    else if (temp >= 15 && temp <= 25) {
        const diff = Math.round(cityTemp - temp);
        if (diff > 0) reasons.push(`都会より${diff}℃涼しい`);
        else reasons.push('快適な気温');
    } else if (temp > 30) reasons.push(`${Math.round(temp)}℃（暑い）`);

    if (bestMonths && bestMonths.length > 0) {
        if (bestMonths.includes(month)) reasons.push('ベストシーズン');
        else reasons.push('シーズン外');
    }
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

    // 1. 避暑コメント（絶対気温も加味して現実的に）
    if (data.temp <= 0) {
        parts.push(`${resortName}は今、気温${Math.round(data.temp)}℃と氷点下です！いくら夏モードでも、完全な冬の装備が必要です。命を守る行動を。`);
    } else if (data.temp <= 12) {
        parts.push(`${resortName}は今、気温${Math.round(data.temp)}℃とかなり冷え込んでいます。下界より${tempDiff}℃も低いので、しっかりとした防寒着を用意しましょう。`);
    } else if (tempDiff >= 15 && data.temp <= 25) {
        parts.push(`${resortName}は今、下界より${tempDiff}℃も涼しい！まさに天然のクーラーです。ひんやりした空気を思い切り楽しみましょう。`);
    } else if (tempDiff >= 8 && data.temp <= 28) {
        parts.push(`都会より${tempDiff}℃涼しい環境です。心地よい風が吹き抜けるはず。`);
    } else if (data.temp > 28) {
        parts.push(`気温${Math.round(data.temp)}℃と暑いです。標高の恩恵は少なめなので、熱中症対策を万全にしてください。`);
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
