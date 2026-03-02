import { WeatherData } from './scoring';

export async function fetchResortWeather(lat: number, long: number, elevation?: number): Promise<WeatherData> {
    // Open-Meteo API URL
    // elevation を指定すると、その標高での気温補正（約0.7°C/100m）が適用される
    const elevationParam = elevation ? `&elevation=${elevation}` : '';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}${elevationParam}&current=temperature_2m,wind_speed_10m,weather_code&daily=snowfall_sum,snow_depth_max,weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=7`;

    try {
        const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
        if (!res.ok) throw new Error('Failed to fetch weather');

        const data = await res.json();

        const current = data.current;
        const daily = data.daily;

        // Open-Meteo returns snowfall in cm for daily sum
        const snowfallToday = daily.snowfall_sum ? daily.snowfall_sum[0] : 0;

        // Map daily forecast
        const forecast = daily.time.map((time: string, index: number) => ({
            date: time,
            maxTemp: daily.temperature_2m_max[index],
            minTemp: daily.temperature_2m_min[index],
            weatherCode: daily.weather_code[index],
            precipitationProb: daily.precipitation_probability_max[index]
        }));

        const snowDepth = daily.snow_depth_max ? Math.round(daily.snow_depth_max[0] * 100) : undefined; // Convert m to cm

        return {
            temp: current.temperature_2m,
            wind: parseFloat((current.wind_speed_10m / 3.6).toFixed(1)), // Convert km/h to m/s
            snowfall_24h: snowfallToday,
            snow_depth: snowDepth,
            weather_code: current.weather_code,
            forecast: forecast
        };
    } catch (error) {
        console.error('Weather fetch error:', error);
        // Return fallback data so the app doesn't crash on API failure
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
