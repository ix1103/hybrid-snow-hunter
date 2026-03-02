import { WeatherData } from './scoring';

export async function fetchResortWeather(lat: number, long: number, elevation?: number): Promise<WeatherData> {
    // /api/weather プロキシ経由でOpen-Meteoからデータ取得
    // Vercelサーバーを経由することでCORSやネットワーク問題を回避
    const params = new URLSearchParams({
        lat: String(lat),
        long: String(long),
        ...(elevation ? { elevation: String(elevation) } : {}),
    });
    const url = `/api/weather?${params.toString()}`;

    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Weather API request failed');

        const data = await res.json();

        const current = data.current;
        const daily = data.daily;

        // Open-Meteo の降雪量は cm で返される
        const snowfallToday = daily.snowfall_sum ? daily.snowfall_sum[0] : 0;

        // 7日間の予報データをマッピング
        const forecast = daily.time.map((time: string, index: number) => ({
            date: time,
            maxTemp: daily.temperature_2m_max[index],
            minTemp: daily.temperature_2m_min[index],
            weatherCode: daily.weather_code[index],
            precipitationProb: daily.precipitation_probability_max[index]
        }));

        // 積雪深をmからcmへ変換
        const snowDepth = daily.snow_depth_max ? Math.round(daily.snow_depth_max[0] * 100) : undefined;

        return {
            temp: current.temperature_2m,
            wind: parseFloat((current.wind_speed_10m / 3.6).toFixed(1)), // km/h → m/s
            snowfall_24h: snowfallToday,
            snow_depth: snowDepth,
            weather_code: current.weather_code,
            forecast: forecast
        };
    } catch (error) {
        console.error('Weather fetch error:', error);
        // エラー時はフォールバックデータを返してアプリがクラッシュしないようにする
        return {
            temp: 0,
            wind: 0,
            snowfall_24h: 0,
            snow_depth: undefined,
            weather_code: 0,
            forecast: []
        };
    }
}
