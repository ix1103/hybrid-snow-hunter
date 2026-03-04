import { NextRequest, NextResponse } from 'next/server';

// 動的ルートとして扱う（静的ビルド時に実行しない）
export const dynamic = 'force-dynamic';



/**
 * GET /api/weather?lat=XX&long=YY&elevation=ZZ
 * Open-Meteo API へのプロキシ。クライアントからの直接アクセスでCORS等の問題が起きる場合に
 * サーバー経由で安全に取得する。
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const long = searchParams.get('long');
    const elevation = searchParams.get('elevation');

    if (!lat || !long) {
        return NextResponse.json({ error: 'lat and long are required' }, { status: 400 });
    }

    const elevationParam = elevation ? `&elevation=${elevation}` : '';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}${elevationParam}&current=temperature_2m,wind_speed_10m,weather_code&daily=snowfall_sum,snow_depth_max,weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=7`;

    try {
        const res = await fetch(url, {
            // サーバー側で30分キャッシュ（同一スキー場への連続アクセスを効率化）
            next: { revalidate: 1800 },
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Weather API request failed' }, { status: res.status });
        }

        const data = await res.json();
        const response = NextResponse.json(data);
        response.headers.set('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
        return response;
    } catch (error) {
        console.error('Weather API proxy error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
