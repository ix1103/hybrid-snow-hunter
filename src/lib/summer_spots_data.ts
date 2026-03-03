/**
 * 夏モード専用スポットデータ
 * 冬のスキー場(resorts_data.ts)とは完全独立
 * カテゴリ: highland(避暑高原) / trekking(登山) / camp(キャンプ) /
 *          mtb(MTBパーク) / river(渓谷・川) / flower(花畑) / onsen(温泉+アウトドア)
 */

// --- 夏スポットの型定義 ---
export interface SummerSpot {
    id: string;
    name: string;
    lat: number;
    long: number;
    elevation: number;
    area: string;
    url: string;
    category: 'highland' | 'trekking' | 'camp' | 'mtb' | 'river' | 'flower' | 'onsen';
    activities: string[];      // 複数タグ（フィルター用）
    bestMonths?: number[];     // ベストシーズン月（1〜12）
}

// --- 夏スポット一覧（約40件） ---
export const SUMMER_SPOTS: SummerSpot[] = [

    // ============================
    // 🏔️ 避暑高原リゾート (highland)
    // ============================
    {
        id: 'kamikochi',
        name: '上高地',
        lat: 36.2478, long: 137.6500, elevation: 1500,
        area: '長野県', url: 'https://www.kamikochi.or.jp/',
        category: 'highland', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9, 10],
    },
    {
        id: 'karuizawa-highland',
        name: '軽井沢高原',
        lat: 36.3481, long: 138.6361, elevation: 1000,
        area: '長野県', url: 'https://karuizawa-kankokyokai.jp/',
        category: 'highland', activities: ['nature', 'camp'],
        bestMonths: [5, 6, 7, 8, 9],
    },
    {
        id: 'nasu-kogen',
        name: '那須高原',
        lat: 37.0194, long: 139.9667, elevation: 900,
        area: '栃木県', url: 'https://www.nasukogen.org/',
        category: 'highland', activities: ['nature', 'camp', 'trekking'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'tateshina',
        name: '蓼科高原',
        lat: 36.0833, long: 138.2833, elevation: 1200,
        area: '長野県', url: 'https://www.tateshinakougen.gr.jp/',
        category: 'highland', activities: ['nature', 'trekking', 'gondola'],
        bestMonths: [6, 7, 8, 9],
    },
    {
        id: 'okunikko',
        name: '奥日光',
        lat: 36.7433, long: 139.4978, elevation: 1400,
        area: '栃木県', url: 'https://www.nikko-kankou.org/',
        category: 'highland', activities: ['nature', 'trekking'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'utsukushigahara',
        name: '美ヶ原高原',
        lat: 36.2333, long: 138.1167, elevation: 2000,
        area: '長野県', url: 'https://www.utsukushi2034.jp/',
        category: 'highland', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9],
    },
    {
        id: 'kirigamine',
        name: '霧ヶ峰高原',
        lat: 36.1000, long: 138.2000, elevation: 1700,
        area: '長野県', url: 'https://www.kirigamine-vc.jp/',
        category: 'highland', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8],
    },
    {
        id: 'kiyosato',
        name: '清里高原',
        lat: 35.9333, long: 138.4333, elevation: 1400,
        area: '山梨県', url: 'https://www.kiyosato.gr.jp/',
        category: 'highland', activities: ['nature', 'camp', 'gondola'],
        bestMonths: [5, 6, 7, 8, 9],
    },
    {
        id: 'furano-highland',
        name: '富良野エリア',
        lat: 43.3414, long: 142.3833, elevation: 220,
        area: '北海道', url: 'https://www.furanotourism.com/',
        category: 'highland', activities: ['nature', 'camp'],
        bestMonths: [6, 7, 8, 9],
    },

    // ============================
    // 🥾 登山・トレッキング (trekking)
    // ============================
    {
        id: 'oze',
        name: '尾瀬ヶ原',
        lat: 36.9194, long: 139.2139, elevation: 1400,
        area: '群馬県', url: 'https://www.oze-fnd.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'tateyama-murodo',
        name: '立山室堂',
        lat: 36.5770, long: 137.6013, elevation: 2450,
        area: '富山県', url: 'https://www.alpen-route.com/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [6, 7, 8, 9, 10],
    },
    {
        id: 'senjojiki',
        name: '千畳敷カール',
        lat: 35.7782, long: 137.8167, elevation: 2612,
        area: '長野県', url: 'https://www.chuo-alps.com/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [7, 8, 9],
    },
    {
        id: 'karasawa',
        name: '涸沢カール',
        lat: 36.2900, long: 137.6600, elevation: 2300,
        area: '長野県', url: 'https://www.kamikochi.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9, 10],
    },
    {
        id: 'norikura-summit',
        name: '乗鞍岳',
        lat: 36.1064, long: 137.5531, elevation: 2700,
        area: '長野県', url: 'https://norikuradake.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
    },
    {
        id: 'hachimantai',
        name: '八幡平',
        lat: 39.9558, long: 140.8556, elevation: 1600,
        area: '岩手県', url: 'https://www.hachimantai.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9, 10],
    },
    {
        id: 'daisetsuzan',
        name: '大雪山系 旭岳',
        lat: 43.6625, long: 142.8514, elevation: 1600,
        area: '北海道', url: 'https://asahidake.hokkaido.jp/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [7, 8, 9],
    },
    {
        id: 'shiretoko',
        name: '知床五湖',
        lat: 44.1178, long: 145.0894, elevation: 250,
        area: '北海道', url: 'https://www.goko.go.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9],
    },

    // ============================
    // 🏕️ キャンプ (camp)
    // ============================
    {
        id: 'fumotoppara',
        name: 'ふもとっぱら',
        lat: 35.4008, long: 138.5612, elevation: 830,
        area: '静岡県', url: 'https://fumotoppara.net/',
        category: 'camp', activities: ['camp', 'nature'],
        bestMonths: [4, 5, 6, 9, 10, 11],
    },
    {
        id: 'doshi-mori',
        name: '道志の森キャンプ場',
        lat: 35.5072, long: 139.0389, elevation: 750,
        area: '山梨県', url: 'https://www.doshinomori.jp/',
        category: 'camp', activities: ['camp', 'nature', 'river'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'togakushi-camp',
        name: '戸隠キャンプ場',
        lat: 36.7711, long: 138.0889, elevation: 1200,
        area: '長野県', url: 'https://www.togakusi.com/',
        category: 'camp', activities: ['camp', 'nature', 'trekking'],
        bestMonths: [5, 6, 7, 8, 9],
    },
    {
        id: 'sugadaira-camp',
        name: '菅平高原ファミリーオートキャンプ場',
        lat: 36.5414, long: 138.3589, elevation: 1300,
        area: '長野県', url: 'https://sugadaira-camp.com/',
        category: 'camp', activities: ['camp', 'nature'],
        bestMonths: [5, 6, 7, 8, 9],
    },
    {
        id: 'pica-fujiyoshida',
        name: 'PICA富士吉田',
        lat: 35.4736, long: 138.7639, elevation: 940,
        area: '山梨県', url: 'https://www.pica-resort.jp/yoshida/',
        category: 'camp', activities: ['camp', 'nature'],
        bestMonths: [4, 5, 6, 7, 8, 9, 10],
    },
    {
        id: 'hoshino-tomamu-camp',
        name: '星野リゾート トマム 雲海テラス',
        lat: 43.0614, long: 142.6258, elevation: 1088,
        area: '北海道', url: 'https://www.snowtomamu.jp/summer/',
        category: 'camp', activities: ['camp', 'nature', 'gondola'],
        bestMonths: [6, 7, 8, 9],
    },

    // ============================
    // 🚵 MTBパーク (mtb)
    // ============================
    {
        id: 'fujimi-mtb',
        name: '富士見パノラマMTBパーク',
        lat: 35.9000, long: 138.1833, elevation: 1400,
        area: '長野県', url: 'https://www.fujimipanorama.com/summer/',
        category: 'mtb', activities: ['mtb', 'gondola'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'iwatake-mtb',
        name: '白馬岩岳MTBパーク',
        lat: 36.7139, long: 137.8611, elevation: 1100,
        area: '長野県', url: 'https://iwatake-mountain-resort.com/',
        category: 'mtb', activities: ['mtb', 'gondola', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10, 11],
    },
    {
        id: 'madarao-mtb',
        name: '斑尾高原MTBパーク',
        lat: 36.8483, long: 138.3117, elevation: 1000,
        area: '長野県', url: 'https://www.madarao.jp/green',
        category: 'mtb', activities: ['mtb', 'camp', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'nozawa-mtb',
        name: '野沢温泉MTBパーク',
        lat: 36.9222, long: 138.4411, elevation: 1100,
        area: '長野県', url: 'https://nozawaski.com/summer/',
        category: 'mtb', activities: ['mtb', 'onsen'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },

    // ============================
    // 🌊 渓谷・川遊び (river)
    // ============================
    {
        id: 'okutama',
        name: '奥多摩渓谷',
        lat: 35.8092, long: 139.0906, elevation: 350,
        area: '東京都', url: 'https://www.okutama.gr.jp/',
        category: 'river', activities: ['river', 'trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9],
    },
    {
        id: 'nagatoro',
        name: '長瀞渓谷',
        lat: 36.1125, long: 139.1183, elevation: 150,
        area: '埼玉県', url: 'https://www.nagatoro.gr.jp/',
        category: 'river', activities: ['river', 'nature'],
        bestMonths: [5, 6, 7, 8, 9],
    },
    {
        id: 'ojiro-river',
        name: '尾白川渓谷',
        lat: 35.7881, long: 138.3025, elevation: 700,
        area: '山梨県', url: 'https://www.hokuto-kanko.jp/',
        category: 'river', activities: ['river', 'trekking', 'nature'],
        bestMonths: [6, 7, 8, 9],
    },
    {
        id: 'atera-valley',
        name: '阿寺渓谷',
        lat: 35.7500, long: 137.6833, elevation: 550,
        area: '長野県', url: 'https://www.town-kiso.com/',
        category: 'river', activities: ['river', 'nature'],
        bestMonths: [6, 7, 8, 9],
    },
    {
        id: 'oirase',
        name: '奥入瀬渓流',
        lat: 40.5300, long: 140.9800, elevation: 400,
        area: '青森県', url: 'https://towadako.or.jp/',
        category: 'river', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },

    // ============================
    // 🌸 高原花畑 (flower)
    // ============================
    {
        id: 'furano-lavender',
        name: '富良野ラベンダー畑（ファーム富田）',
        lat: 43.3497, long: 142.3808, elevation: 220,
        area: '北海道', url: 'https://www.farm-tomita.co.jp/',
        category: 'flower', activities: ['nature'],
        bestMonths: [7, 8],
    },
    {
        id: 'kirigamine-nikko',
        name: '霧ヶ峰ニッコウキスゲ群生地',
        lat: 36.1000, long: 138.2000, elevation: 1700,
        area: '長野県', url: 'https://www.kirigamine-vc.jp/',
        category: 'flower', activities: ['trekking', 'nature'],
        bestMonths: [7],
    },
    {
        id: 'hitachi-seaside',
        name: 'ひたち海浜公園 ネモフィラ',
        lat: 36.3953, long: 140.5981, elevation: 30,
        area: '茨城県', url: 'https://hitachikaihin.jp/',
        category: 'flower', activities: ['nature'],
        bestMonths: [4, 5],
    },
    {
        id: 'kurobe-alpine',
        name: '黒部平 高山植物園',
        lat: 36.5942, long: 137.5933, elevation: 1828,
        area: '富山県', url: 'https://www.alpen-route.com/',
        category: 'flower', activities: ['gondola', 'nature', 'trekking'],
        bestMonths: [6, 7, 8, 9],
    },

    // ============================
    // ♨️ 温泉+アウトドア (onsen)
    // ============================
    {
        id: 'nozawa-onsen',
        name: '野沢温泉郷',
        lat: 36.9222, long: 138.4411, elevation: 600,
        area: '長野県', url: 'https://nozawakanko.jp/',
        category: 'onsen', activities: ['onsen', 'trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'kusatsu-onsen',
        name: '草津温泉',
        lat: 36.6208, long: 138.5958, elevation: 1200,
        area: '群馬県', url: 'https://www.kusatsu-onsen.ne.jp/',
        category: 'onsen', activities: ['onsen', 'nature', 'trekking'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'nyuto-onsen',
        name: '乳頭温泉郷',
        lat: 39.7806, long: 140.7722, elevation: 700,
        area: '秋田県', url: 'http://www.nyuto-onsenkyo.com/',
        category: 'onsen', activities: ['onsen', 'nature', 'trekking'],
        bestMonths: [6, 7, 8, 9, 10],
    },
    {
        id: 'zao-onsen-summer',
        name: '蔵王温泉（御釜トレッキング）',
        lat: 38.1697, long: 140.3978, elevation: 900,
        area: '山形県', url: 'https://www.zao-spa.or.jp/',
        category: 'onsen', activities: ['onsen', 'trekking', 'gondola'],
        bestMonths: [6, 7, 8, 9, 10],
    },

    // ============================
    // 🏕️ キャンプ 追加 (camp)
    // ============================
    {
        id: 'asagiri-jamboree',
        name: '朝霧ジャンボリーオートキャンプ場',
        lat: 35.3667, long: 138.5667, elevation: 900,
        area: '静岡県', url: 'https://asagiri-camp.net/',
        category: 'camp', activities: ['camp', 'nature'],
        bestMonths: [4, 5, 6, 9, 10, 11],
    },
    {
        id: 'hottarakashi',
        name: 'ほったらかしキャンプ場',
        lat: 35.7333, long: 138.6833, elevation: 700,
        area: '山梨県', url: 'https://hottarakashicamp.com/',
        category: 'camp', activities: ['camp', 'nature', 'onsen'],
        bestMonths: [4, 5, 6, 9, 10, 11],
    },
    {
        id: 'snowpeak-hq',
        name: 'Snow Peak Headquarters',
        lat: 37.3833, long: 138.9167, elevation: 250,
        area: '新潟県', url: 'https://www.snowpeak.co.jp/locations/hq/',
        category: 'camp', activities: ['camp', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'akagi-camp',
        name: '赤城山オートキャンプ場',
        lat: 36.5500, long: 139.1667, elevation: 800,
        area: '群馬県', url: 'https://www.autocamp.jp/',
        category: 'camp', activities: ['camp', 'nature', 'trekking'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'uchiyama-camp',
        name: '内山牧場キャンプ場',
        lat: 36.2333, long: 138.5500, elevation: 1200,
        area: '長野県', url: 'https://www.uchiyama-bokujou.com/',
        category: 'camp', activities: ['camp', 'nature'],
        bestMonths: [5, 6, 7, 8, 9],
    },
    {
        id: 'marunuma-camp',
        name: '丸沼高原オートキャンプ場',
        lat: 36.8164, long: 139.3400, elevation: 1500,
        area: '群馬県', url: 'https://www.marunuma.jp/green/',
        category: 'camp', activities: ['camp', 'nature', 'gondola'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },

    // ============================
    // 🥾 登山・トレッキング 追加 (trekking)
    // ============================
    {
        id: 'tanigawadake',
        name: '谷川岳',
        lat: 36.8317, long: 138.9283, elevation: 1977,
        area: '群馬県', url: 'https://www.tanigawadake-rw.com/',
        category: 'trekking', activities: ['trekking', 'gondola', 'nature'],
        bestMonths: [6, 7, 8, 9, 10],
    },
    {
        id: 'hakuba-daisekkei',
        name: '白馬大雪渓',
        lat: 36.7583, long: 137.7583, elevation: 2100,
        area: '長野県', url: 'https://www.hakuba-happo.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
    },
    {
        id: 'tsubakurodake',
        name: '燕岳',
        lat: 36.4167, long: 137.7167, elevation: 2763,
        area: '長野県', url: 'https://www.enzanso.co.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
    },
    {
        id: 'chogatake',
        name: '蝶ヶ岳',
        lat: 36.3167, long: 137.7167, elevation: 2677,
        area: '長野県', url: 'https://www.kamikochi.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
    },
    {
        id: 'kisokomagatake',
        name: '木曽駒ヶ岳',
        lat: 35.7889, long: 137.8167, elevation: 2956,
        area: '長野県', url: 'https://www.chuo-alps.com/',
        category: 'trekking', activities: ['trekking', 'gondola', 'nature'],
        bestMonths: [7, 8, 9],
    },
    {
        id: 'kitadake',
        name: '北岳',
        lat: 35.6750, long: 138.2389, elevation: 3193,
        area: '山梨県', url: 'https://www.ashiyasu.gr.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
    },
    {
        id: 'chokaisan',
        name: '鳥海山',
        lat: 39.0972, long: 140.0472, elevation: 2236,
        area: '山形県', url: 'https://www.choukai.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
    },

    // ============================
    // 🌊 渓谷 追加 (river)
    // ============================
    {
        id: 'shosenkyo',
        name: '昇仙峡',
        lat: 35.7500, long: 138.5667, elevation: 500,
        area: '山梨県', url: 'https://www.shosenkyo-kankoukyokai.com/',
        category: 'river', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10, 11],
    },
    {
        id: 'mitake-valley',
        name: '御岳渓谷',
        lat: 35.7986, long: 139.1633, elevation: 250,
        area: '東京都', url: 'https://www.omekanko.gr.jp/',
        category: 'river', activities: ['river', 'trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'takachiho',
        name: '高千穂峡',
        lat: 32.7250, long: 131.3056, elevation: 300,
        area: '宮崎県', url: 'https://takachiho-kanko.info/',
        category: 'river', activities: ['river', 'nature'],
        bestMonths: [4, 5, 6, 7, 8, 9, 10],
    },

    // ============================
    // 🏔️ 高原 追加 (highland)
    // ============================
    {
        id: 'sugadaira-highland',
        name: '菅平高原',
        lat: 36.5414, long: 138.3589, elevation: 1300,
        area: '長野県', url: 'https://sugadaira.com/',
        category: 'highland', activities: ['nature', 'camp', 'trekking'],
        bestMonths: [5, 6, 7, 8, 9],
    },
    {
        id: 'togakushi-highland',
        name: '戸隠高原',
        lat: 36.7583, long: 138.0750, elevation: 1200,
        area: '長野県', url: 'https://www.togakushi-21.jp/',
        category: 'highland', activities: ['nature', 'trekking', 'camp'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
    {
        id: 'shiga-summer',
        name: '志賀高原サマー',
        lat: 36.7214, long: 138.5076, elevation: 1800,
        area: '長野県', url: 'https://www.shigakogen.co.jp/',
        category: 'highland', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9],
    },
    {
        id: 'yatsugatake',
        name: '八ヶ岳エリア',
        lat: 35.9711, long: 138.3694, elevation: 1500,
        area: '長野県', url: 'https://www.yatsugatake.gr.jp/',
        category: 'highland', activities: ['nature', 'trekking', 'camp'],
        bestMonths: [5, 6, 7, 8, 9, 10],
    },
];
