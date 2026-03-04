import { RESORTS } from '../src/lib/resorts_data';
import { SUMMER_SPOTS } from '../src/lib/summer_spots_data';

async function checkLink(url: string, name: string): Promise<boolean> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒タイムアウト

        const response = await fetch(url, {
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        // HEADでうまくいかないサイト（405, 403, 404など）は GET でも再確認する
        if (!response.ok && response.status !== 403 && response.status !== 405) {
            const getRes = await fetch(url, {
                method: 'GET', headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            });
            if (!getRes.ok) {
                console.warn(`[NG] ${name} - ${url} (Status: ${getRes.status})`);
                return false;
            }
        }

        return true;
    } catch (error: any) {
        console.warn(`[Error] ${name} - ${url} (${error.message})`);
        return false;
    }
}

async function main() {
    console.log(`🔍 リンク切れを検証しています...`);

    const allSpots = [
        ...RESORTS.map((r: any) => ({ name: r.name, url: r.url })),
        ...SUMMER_SPOTS.map((s: any) => ({ name: s.name, url: s.url }))
    ].filter(s => s.url);

    console.log(`合計 ${allSpots.length} 件のURLをチェックします`);

    let errorCount = 0;

    // APIレート制限やBANを防ぐため、並列数を絞ってリクエスト
    const BATCH_SIZE = 5;
    for (let i = 0; i < allSpots.length; i += BATCH_SIZE) {
        const batch = allSpots.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(batch.map(s => checkLink(s.url!, s.name)));

        errorCount += results.filter(res => !res).length;

        // 進行状況の表示
        process.stdout.write(`\r進行状況: ${Math.min(i + BATCH_SIZE, allSpots.length)} / ${allSpots.length}`);

        // 少しウェイトを入れてサーバーへの負荷を軽減
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('\n\n--- 検証結果 ---');
    if (errorCount === 0) {
        console.log('✅ すべてのリンクが正常です！');
        process.exit(0);
    } else {
        console.log(`❌ ${errorCount} 件のリンクエラーが見つかりました。`);
        process.exit(1);
    }
}

main().catch(console.error);
