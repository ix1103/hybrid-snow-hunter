import {
    calculateConditionScore,
    getWeatherLabel,
    getSnowQuality,
    calculateWindChill,
    getClothingAdvice,
    WeatherData
} from '../scoring';

describe('scoring.ts (Winter Scoring Rules)', () => {
    // Helper function to create default WeatherData
    const createWeather = (overrides: Partial<WeatherData> = {}): WeatherData => ({
        temp: 0,
        wind: 0,
        snowfall_24h: 0,
        weather_code: 0,
        forecast: [],
        ...overrides,
    });

    describe('calculateConditionScore', () => {
        it('ベーススコアは50で、降雪0だと-5される（結果45になる）', () => {
            const data = createWeather({ temp: 0, wind: 0, snowfall_24h: 0 });
            const result = calculateConditionScore(data);
            expect(result.score).toBe(45);
        });

        it('降雪量が30cmを超えると、スコアが大幅アップする (+40)', () => {
            const data = createWeather({ temp: 0, wind: 0, snowfall_24h: 35 });
            const result = calculateConditionScore(data);
            expect(result.score).toBe(90); // 50(base) + 40(snow) = 90
        });

        it('降雪量が15cmを超えると、スコアがアップする (+20)', () => {
            const data = createWeather({ temp: 0, wind: 0, snowfall_24h: 20 });
            const result = calculateConditionScore(data);
            expect(result.score).toBe(70); // 50(base) + 20(snow) = 70
        });

        it('気温が-5度未満だと、スコアがアップする (+10)', () => {
            const data = createWeather({ temp: -8, wind: 0, snowfall_24h: 0 });
            const result = calculateConditionScore(data);
            expect(result.score).toBe(55); // 50(base) - 5(no snow) + 10(temp) = 55
        });

        it('気温が5度を超えると、スコアがダウンする (-20)', () => {
            const data = createWeather({ temp: 8, wind: 0, snowfall_24h: 0 });
            const result = calculateConditionScore(data);
            expect(result.score).toBe(25); // 50(base) - 5(no snow) - 20(temp) = 25
        });

        it('風速が15m/sを超えると、スコアが大幅ダウンする (-30)', () => {
            const data = createWeather({ temp: 0, wind: 20, snowfall_24h: 0 });
            const result = calculateConditionScore(data);
            expect(result.score).toBe(15); // 50(base) - 5(no snow) - 30(wind) = 15
        });

        it('スコアの上限は100、下限は0であること', () => {
            // 上限テスト 50 + 40(snow) + 10(temp) = 100
            const maxScoreData = createWeather({ temp: -10, wind: 0, snowfall_24h: 40 });
            const maxResult = calculateConditionScore(maxScoreData);
            expect(maxResult.score).toBe(100);

            // 下限テスト 50 - 5(no snow) - 20(temp) - 30(wind) = -5 -> 0
            const minScoreData = createWeather({ temp: 10, wind: 20, snowfall_24h: 0 });
            const minResult = calculateConditionScore(minScoreData);
            expect(minResult.score).toBe(0);
        });
    });

    describe('getWeatherLabel', () => {
        it('天候コードに応じた正しい絵文字とテキストを返すこと', () => {
            expect(getWeatherLabel(0)).toBe('☀️ 晴れ');
            expect(getWeatherLabel(1)).toBe('☁️ 曇り');
            expect(getWeatherLabel(61)).toBe('☔ 雨');
            expect(getWeatherLabel(71)).toBe('☃️ 雪');
            expect(getWeatherLabel(95)).toBe('⚡ 雷雨');
            expect(getWeatherLabel(999)).toBe('❓ 不明');
        });
    });

    describe('getSnowQuality', () => {
        it('気温に応じた正しい雪質判定を返すこと', () => {
            expect(getSnowQuality(createWeather({ temp: -15 }))).toBe('💎 ダイヤモンドダスト');
            expect(getSnowQuality(createWeather({ temp: -6 }))).toBe('❄️ 極上パウダー');
            expect(getSnowQuality(createWeather({ temp: -2 }))).toBe('🎿 締まった雪');
            expect(getSnowQuality(createWeather({ temp: 2 }))).toBe('💧 湿雪');
            expect(getSnowQuality(createWeather({ temp: 5 }))).toBe('🍧 シャバ雪');
        });
    });

    describe('calculateWindChill', () => {
        it('気温から風速を引いて体感温度を近似・計算すること', () => {
            expect(calculateWindChill(-5, 10)).toBe(-15);
            expect(calculateWindChill(0, 5)).toBe(-5);
        });
    });

    describe('getClothingAdvice', () => {
        it('体感温度に応じた服装アドバイスを返すこと', () => {
            expect(getClothingAdvice(-25)).toContain('極寒装備必須');
            expect(getClothingAdvice(-15)).toContain('凍傷に注意');
            expect(getClothingAdvice(-12)).toContain('しっかり防寒'); // -10 >= -12 > -15
            expect(getClothingAdvice(-8)).toContain('標準的な冬装備でOK'); // -5 >= -8 > -10
            expect(getClothingAdvice(5)).toContain('体温調整しやすい服装で');
        });
    });
});
