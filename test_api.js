// Standalone test script
// But I'm running in the user's environment which is Node 22, so fetch is global.

async function test() {
    console.log('Testing weather fetch...');
    try {
        // Hakuba coordinates
        const data = await fetchResortWeather(36.6962, 137.8407);
        console.log('Success:', data);
    } catch (e) {
        console.error('Failed:', e);
    }
}

// Since fetchResortWeather uses 'export async function', I need to handle the import correctly 
// or just copy the logic here for a quick test since ts-node might not be set up for mixed imports easily without config.
// Let's just copy the logic to be safe and quick.
async function runTest() {
    const lat = 36.6962;
    const long = 137.8407;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m,weather_code&daily=snowfall_sum&timezone=Asia%2FTokyo`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather');

        const data = await res.json();
        console.log('Raw Data:', JSON.stringify(data, null, 2));

        const current = data.current;
        const daily = data.daily;

        const snowfallToday = daily.snowfall_sum ? daily.snowfall_sum[0] : 0;

        const result = {
            temp: current.temperature_2m,
            wind: current.wind_speed_10m,
            snowfall_24h: snowfallToday,
            weather_code: current.weather_code
        };
        console.log('Parsed Result:', result);

    } catch (error) {
        console.error('Weather fetch error:', error);
    }
}

runTest();
