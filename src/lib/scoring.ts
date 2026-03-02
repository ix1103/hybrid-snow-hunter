export interface DailyForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
    weatherCode: number;
    precipitationProb: number;
}

export interface WeatherData {
    temp: number; // Celsius
    wind: number; // km/h
    snowfall_24h: number; // cm
    snow_depth?: number; // cm total
    weather_code: number;
    forecast: DailyForecast[];
}

export interface ConditionScore {
    score: number; // 0-100
    label: string;
    color: string;
    details: string;
}

export function calculateConditionScore(data: WeatherData): ConditionScore {
    let score = 50; // Start with average

    // 1. Snowfall (The most important factor for "Powder")
    if (data.snowfall_24h > 30) score += 40;
    else if (data.snowfall_24h > 15) score += 20;
    else if (data.snowfall_24h > 5) score += 10;
    else if (data.snowfall_24h === 0) score -= 5;

    // 2. Temperature (Cold is good, too warm is bad)
    if (data.temp < -5) score += 10; // Nice and cold
    else if (data.temp > 5) score -= 20; // Slushy

    // 3. Wind (Strong wind cancels out good snow) - using m/s
    // > 15m/s (54km/h) is very strong, lifts likely stop
    // > 8m/s (29km/h) is windy/cold
    if (data.wind > 15) score -= 30; // Stormy
    else if (data.wind > 8) score -= 10;

    // Cap score
    if (score > 100) score = 100;
    if (score < 0) score = 0;

    // Determine label and color based on score
    let label = '普通';
    let color = 'bg-yellow-500';

    if (score >= 80) {
        label = '最高！';
        color = 'bg-rose-500';
    } else if (score >= 60) {
        label = '良い';
        color = 'bg-blue-500';
    } else if (score <= 30) {
        label = '微妙...';
        color = 'bg-gray-500';
    }

    // Generate a short reason
    const reasons = [];
    if (data.snowfall_24h > 15) reasons.push('パウダーあり');
    if (data.wind > 30) reasons.push('強風注意');
    if (data.temp > 5) reasons.push('気温高め');
    if (reasons.length === 0) reasons.push('コンディション安定');

    return {
        score,
        label,
        color,
        details: reasons.join(' / '),
    };
}

export function getWeatherLabel(code: number): string {
    if (code === 0) return '☀️ 晴れ';
    if (code >= 1 && code <= 3) return '☁️ 曇り';
    if (code === 45 || code === 48) return '🌫️ 霧';
    if (code >= 51 && code <= 55) return '🌦️ 霧雨';
    if (code >= 61 && code <= 65) return '☔ 雨';
    if (code >= 71 && code <= 77) return '☃️ 雪';
    if (code >= 80 && code <= 82) return '🌂 にわか雨';
    if (code >= 85 && code <= 86) return '❄️ 大雪';
    if (code >= 95 && code <= 99) return '⚡ 雷雨';
    return '❓ 不明';
}

export function getSnowQuality(data: WeatherData): string {
    if (data.temp <= -10) return '💎 ダイヤモンドダスト';
    if (data.temp <= -5) return '❄️ 極上パウダー';
    if (data.temp <= 0) return '🎿 締まった雪';
    if (data.temp <= 3) return '💧 湿雪';
    return '🍧 シャバ雪';
}

export function calculateWindChill(temp: number, wind: number): number {
    // Simplified Jagger's formula approximation or similar for skiers context
    // T_wc = 13.12 + 0.6215*T - 11.37*V^0.16 + 0.3965*T*V^0.16
    // But let's stick to a simpler "sensation" often used: T - (Wind / 2) roughly or just linear.
    // Simple heuristic: 1m/s wind ~ -1 degree effective temperature drop.
    return Math.round(temp - wind);
}

export function getClothingAdvice(windChill: number): string {
    if (windChill <= -20) return '生命の危機レベル（極寒装備必須）';
    if (windChill <= -15) return '凍傷に注意（バラクラバ・カイロ必須）';
    if (windChill <= -10) return 'しっかり防寒（厚手インナー・ネックウォーマー）';
    if (windChill <= -5) return '標準的な冬装備でOK';
    return '比較的過ごしやすい（体温調整しやすい服装で）';
}

export function generateAIAnalysis(resortName: string, area: string, data: WeatherData): string {
    const parts = [];

    // 1. Weather Context
    if (data.weather_code === 0) {
        parts.push('本日は貴重な晴天予報！山頂からの絶景が期待できそうです。放射冷却による朝一番のバーンは最高でしょう。');
    } else if (data.weather_code >= 71 && data.weather_code <= 86) {
        if (data.snowfall_24h > 20) {
            parts.push(`一晩で${data.snowfall_24h}cmの積雪がありました！面ツル・パウダー好きにはたまらないコンディションです。`);
        } else {
            parts.push('雪が降っています。視界不良に注意しつつ、新雪の感触を楽しみましょう。');
        }
    } else if (data.weather_code >= 61 && data.weather_code <= 65) {
        parts.push('残念ながら雨予報が出ています。防水対策を完璧にするか、標高の高いエリアを目指しましょう。');
    } else {
        parts.push('曇り空で日差しは少ないですが、雪質は安定していそうです。');
    }

    // 2. Wind Warning (Crucial for HP check)
    if (data.wind > 15) {
        parts.push('⚠️ 強風の予報が出ています。リフトやゴンドラが減速・運休するリスクがあります。**出発前に必ず公式サイトで運行状況をご確認ください。**');
    } else if (data.wind > 10) {
        parts.push('山頂付近は風が強いかもしれません。防寒をしっかりとして挑みましょう。');
    }

    // 3. Area/Temp Specifics
    if (area === '北海道' && data.temp < -5) {
        parts.push('北海道ならではのドライパウダーが楽しめそうです！');
    } else if (data.temp > 5) {
        parts.push('気温が高めです。春スキーのようなコンディションになるため、ワックス選びに注意してください。');
    }

    // 4. Closing
    // Removed generic closing sentence as per user request

    return parts.join('\n');
}

export function generateWeekSummary(forecast: DailyForecast[]): { bestDayLabel: string; summary: string } {
    if (!forecast || forecast.length === 0) {
        return { bestDayLabel: '', summary: '' };
    }

    // Find the day with the most snowfall
    let bestIdx = 0;
    let maxSnow = -1;
    forecast.forEach((day, i) => {
        // We don't have snowfall per day in DailyForecast, so use precipitationProb as proxy
        // and minTemp as cold indicator
        const score = (day.precipitationProb ?? 0) * (day.minTemp < 0 ? 1.5 : 0.5);
        if (score > maxSnow) {
            maxSnow = score;
            bestIdx = i;
        }
    });

    const bestDay = forecast[bestIdx];
    const date = new Date(bestDay.date);
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const dayLabel = bestIdx === 0 ? '今日' : bestIdx === 1 ? '明日' : `${date.getMonth() + 1}/${date.getDate()}(${dayNames[date.getDay()]})`;

    let summary = '';
    if (bestDay.minTemp < -5 && (bestDay.precipitationProb ?? 0) > 50) {
        summary = `🎯 ${dayLabel}が今週のベスト！パウダー期待大`;
    } else if (bestDay.minTemp < 0 && (bestDay.precipitationProb ?? 0) > 40) {
        summary = `⭐ ${dayLabel}が狙い目。降雪の可能性あり`;
    } else if (forecast.some(d => d.minTemp > 3)) {
        summary = '⚠️ 今週は気温高め。週末は早めに滑ろう';
    } else {
        summary = `📅 ${dayLabel}のコンディションが比較的良さそう`;
    }

    return { bestDayLabel: dayLabel, summary };
}
