import {
    calculateSummerScore,
} from '../scoring_summer';
import { WeatherData } from '../scoring';

describe('scoring_summer.ts (Summer Scoring Rules)', () => {
    // Helper function to create default WeatherData
    const createWeather = (overrides: Partial<WeatherData> = {}): WeatherData => ({
        temp: 0,
        wind: 0,
        snowfall_24h: 0,
        weather_code: 0,
        forecast: [],
        ...overrides,
    });

    describe('calculateSummerScore', () => {
        const bestMonths = [7, 8];
        const elevation = 1500;

        beforeEach(() => {
            // Mock Date for best season check
            // Set current date to August 1st for these tests
            jest.useFakeTimers().setSystemTime(new Date('2024-08-01T12:00:00Z'));
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('ベーススコアは50であること', () => {
            // Weather that doesn't trigger +/- (no best season, temp 10-15 won't minus much, no rain)
            jest.setSystemTime(new Date('2024-11-01T12:00:00Z')); // Off season: -15
            // Temp 10: +5, wind 2: +10, weather 0: +15, base: 50
            // 50 - 15 + 5 + 10 + 15 = 65
            const data = createWeather({ temp: 10, wind: 2, weather_code: 0 });
            const result = calculateSummerScore(data, bestMonths, elevation);
            expect(result.score).toBe(65);
        });

        it('気温が快適ゾーン(15-22℃)のときスコアが上昇する (+25)', () => {
            // Best season: +10, Temp 18: +25, Diff:(33-18=15)=>+10, Wind 2: +10, Weather 0: +15 => 50 + 10 + 25 + 10 + 10 + 15 = 120 => cap 100
            const data = createWeather({ temp: 18, wind: 2, weather_code: 0 });
            const result = calculateSummerScore(data, bestMonths, elevation);
            expect(result.score).toBe(100);
            expect(result.details).toContain('涼しい');
        });

        it('気温が0度未満のときスコアが大幅に下降する (-40)', () => {
            // Best season: +10, Temp -2: -40, Wind 0: 0, Weather 0: +15 => 50 + 10 - 40 + 0 + 15 = 35
            const data = createWeather({ temp: -2, wind: 0, weather_code: 0 });
            const result = calculateSummerScore(data, bestMonths, elevation);
            expect(result.score).toBe(35);
            expect(result.details).toContain('氷点下');
        });

        it('ベストシーズン外のときはスコアが下降する (-15)', () => {
            jest.setSystemTime(new Date('2024-01-01T12:00:00Z')); // Jan -> cityTemp 10
            // Temp 18: +25, Wind 0: 0, Weather 1: +5, Elevation(1500&18C): +5, Diff(-8)->no bonus
            // base: 50, season: -15, temp: +25, elevation: +5, weather: +5 = 70
            const data = createWeather({ temp: 18, wind: 0, weather_code: 1 });
            const result = calculateSummerScore(data, bestMonths, elevation);
            expect(result.score).toBe(70);
            expect(result.details).toContain('シーズン外');
        });

        it('雷雨の予報(95以上)の場合はスコアが大幅に下降する (-40)', () => {
            // Aug -> cityTemp 33
            // Temp 18: +25, diff:(33-18=15)=>+10
            // season: +10, wind 0: 0, weather 95: -40, elevation: +5
            // base: 50 + 25 + 10 + 10 + 5 - 40 = 60
            const data = createWeather({ temp: 18, wind: 0, weather_code: 95 });
            const result = calculateSummerScore(data, bestMonths, elevation);
            expect(result.score).toBe(60);
            expect(result.details).toContain('雷雨警戒');
        });

        it('強風の予報(10m/s以上)の場合はスコアが下降する (-30)', () => {
            // Temp 18: +25, diff:(33-18=15)=>+10
            // season: +10, wind 12: -30, weather 1: +5, elevation: +5
            // base: 50 + 25 + 10 + 10 - 30 + 5 + 5 = 75
            const data = createWeather({ temp: 18, wind: 12, weather_code: 1 });
            const result = calculateSummerScore(data, bestMonths, elevation);
            expect(result.score).toBe(75);
            expect(result.details).toContain('強風注意');
        });
    });
});
