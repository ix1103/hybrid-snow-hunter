import { WeatherData, HourlyForecast } from './scoring';

export async function fetchResortWeather(lat: number, long: number, elevation?: number): Promise<WeatherData> {
    // ===== Open-Meteo API (JMAモデル使用) =====
    // current: 現在の気温・風速・天気コード
    // daily: 7日間予報
    // hourly: 当日の精密コンディション（凍結高度・瞬間風速・視界・降雪）
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}` +
        `&current=temperature_2m,wind_speed_10m,wind_gusts_10m,weather_code` +
        `&daily=snowfall_sum,snow_depth_max,weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum` +
        `&hourly=temperature_2m,weather_code,snowfall,wind_gusts_10m,freezing_level_height,visibility` +
        `&timezone=Asia%2FTokyo&forecast_days=7&models=jma_seamless`;

    // 標高が指定されている場合はパラメータ追加（JMAモデルが標高による気温減率を自動で計算）
    if (elevation !== undefined) {
        url += `&elevation=${elevation}`;
    }

    try {
        const res = await fetch(url, { next: { revalidate: 3600 } }); // 1時間キャッシュ
        if (!res.ok) throw new Error('Failed to fetch weather');

        const data = await res.json();
        const current = data.current;
        const daily = data.daily;
        const hourly = data.hourly;

        // 7日間の日別予報をマップ
        const forecast = daily.time.map((time: string, i: number) => ({
            date: time,
            maxTemp: daily.temperature_2m_max[i],
            minTemp: daily.temperature_2m_min[i],
            weatherCode: daily.weather_code[i],
            precipitation: daily.precipitation_sum?.[i] ?? 0,  // 降水量 (mm/日) JMA対応
            snowfall: daily.snowfall_sum?.[i] ?? 0,             // 降雪量 (cm/日)
        }));

        const snowDepth = daily.snow_depth_max
            ? Math.round(daily.snow_depth_max[0] * 100) // m → cm
            : undefined;

        // ===== 当日の時間別予報（6時〜20時を3時間刻みで抽出）=====
        const today = daily.time[0]; // 例: "2026-03-02"
        const hourlyToday: HourlyForecast[] = [];

        // 凍結高度・視界は当日の代表値として平均を取る
        let freezingLevelSum = 0;
        let visibilityMin = Infinity;
        let maxGust = 0;
        let freezingCount = 0;

        hourly.time.forEach((t: string, i: number) => {
            if (!t.startsWith(today)) return; // 今日以外はスキップ

            const hour = parseInt(t.slice(11, 13));

            // 凍結高度・視界・瞬間風速の集計（0〜23時）
            if (hourly.freezing_level_height?.[i] != null) {
                freezingLevelSum += hourly.freezing_level_height[i];
                freezingCount++;
            }
            if (hourly.visibility?.[i] != null) {
                visibilityMin = Math.min(visibilityMin, hourly.visibility[i]);
            }
            if (hourly.wind_gusts_10m?.[i] != null) {
                maxGust = Math.max(maxGust, hourly.wind_gusts_10m[i] / 3.6); // km/h → m/s
            }

            // 6時〜20時の3時間刻みのみ表示用に追加
            if (hour >= 6 && hour <= 20 && hour % 3 === 0) {
                hourlyToday.push({
                    time: `${String(hour).padStart(2, '0')}:00`,
                    temp: Math.round(hourly.temperature_2m[i] * 10) / 10,
                    weatherCode: hourly.weather_code[i],
                    snowfall: hourly.snowfall?.[i] ?? 0,
                    windGusts: Math.round((hourly.wind_gusts_10m?.[i] ?? 0) / 3.6 * 10) / 10,
                });
            }
        });

        return {
            temp: current.temperature_2m,
            wind: parseFloat((current.wind_speed_10m / 3.6).toFixed(1)), // km/h → m/s
            snowfall_24h: daily.snowfall_sum?.[0] ?? 0,
            snow_depth: snowDepth,
            weather_code: current.weather_code,
            forecast,
            // 当日精密コンディション
            freezingLevel: freezingCount > 0 ? Math.round(freezingLevelSum / freezingCount) : undefined,
            windGusts: maxGust > 0 ? Math.round(maxGust * 10) / 10 : undefined,
            visibility: visibilityMin !== Infinity ? Math.round(visibilityMin) : undefined,
            hourlyToday: hourlyToday.length > 0 ? hourlyToday : undefined,
        };

    } catch (error) {
        console.error('Weather fetch error:', error);
        return {
            temp: 0,
            wind: 0,
            snowfall_24h: 0,
            snow_depth: undefined,
            weather_code: 0,
            forecast: [],
        };
    }
}
