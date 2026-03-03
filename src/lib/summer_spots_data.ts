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
    category: 'highland' | 'trekking' | 'camp' | 'mtb';
    activities: string[];      // 複数タグ（フィルター用）
    bestMonths?: number[];     // ベストシーズン月（1〜12）
    // 登山特化データ（任意）
    difficulty?: 1 | 2 | 3 | 4 | 5; // 1:初心者〜5:上級・プロ級
    courseTime?: string;       // 例: "5時間30分"
    features?: string[];       // 例: ["日本百名山", "山小屋あり", "岩場あり"]
    hut?: 'あり(有人)' | '避難小屋のみ' | 'なし';
    tent?: 'あり' | 'なし';
    water?: '豊富' | '要かくにん' | 'なし';
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
        id: 'tateshina-kogen',
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
    // --- 🔰 初級（Lv.1〜2 / スライム級） ---
    {
        id: 'takao',
        name: '高尾山',
        lat: 35.625, long: 139.2436, elevation: 599,
        area: '東京都', url: 'https://mttakaomagazine.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 1, courseTime: '3時間30分', features: ['はじめてのやま', 'ケーブルカーあり', 'みせが おおい'],
        hut: 'あり(有人)', tent: 'なし', water: '豊富'
    },
    {
        id: 'tsukuba',
        name: '筑波山',
        lat: 36.2255, long: 140.1066, elevation: 877,
        area: '茨城県', url: 'https://www.mt-tsukuba.com/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [4, 5, 9, 10, 11],
        difficulty: 1, courseTime: '4時間', features: ['日本百名山', 'ロープウェイあり', 'いわばが すこし'],
        hut: 'あり(有人)', tent: 'なし', water: '豊富'
    },
    {
        id: 'oyama',
        name: '大山',
        lat: 35.4411, long: 139.2316, elevation: 1252,
        area: '神奈川県', url: 'https://www.oyamakankou.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 2, courseTime: '4時間30分', features: ['ケーブルカーあり', 'かいだんが おおい'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'mitake',
        name: '御岳山',
        lat: 35.7827, long: 139.1494, elevation: 929,
        area: '東京都', url: 'https://www.mt-mitake.gr.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 6, 9, 10, 11],
        difficulty: 1, courseTime: '4時間', features: ['ケーブルカーあり', 'たきが ある', 'しゅくぼう'],
        hut: 'あり(有人)', tent: 'なし', water: '豊富'
    },
    {
        id: 'oze',
        name: '尾瀬ヶ原',
        lat: 36.9194, long: 139.2139, elevation: 1400,
        area: '群馬県', url: 'https://www.oze-fnd.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
        difficulty: 1, courseTime: '6時間', features: ['日本百名山', 'きどう あるき', 'みずばしょう'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'chausuyama',
        name: '茶臼山',
        lat: 35.2272, long: 137.6622, elevation: 1415,
        area: '愛知県', url: 'http://www.chausuyama.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 10, 11],
        difficulty: 1, courseTime: '2時間', features: ['あいち さいこうほう', 'シバザクラ', 'ファミリーむけ'],
        hut: 'なし', tent: 'なし', water: '豊富'
    },
    {
        id: 'tanzawa-daibozan',
        name: '丹沢山',
        lat: 35.4734, long: 139.1637, elevation: 1567,
        area: '神奈川県', url: 'https://www.tanzawa-mt.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 2, courseTime: '6時間', features: ['日本百名山', 'やまごや あり', 'しかに あえる'],
        hut: 'あり(有人)', tent: 'なし', water: '豊富'
    },
    {
        id: 'okutama',
        name: '雲取山',
        lat: 35.8548, long: 138.9428, elevation: 2017,
        area: '東京都', url: 'https://www.okutama-town.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
        difficulty: 3, courseTime: '10時間', features: ['日本百名山', 'とうきょう さいこうほう', 'やまごや あり'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'buko',
        name: '武甲山',
        lat: 35.9924, long: 139.0588, elevation: 1304,
        area: '埼玉県', url: 'https://www.yamagoya.org/bukousan',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 2, courseTime: '4時間', features: ['さいたまのせいれいざん', 'しだれざくら'],
        hut: 'なし', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'ryugatake',
        name: '竜ヶ岳',
        lat: 35.4633, long: 138.6203, elevation: 1485,
        area: '静岡県', url: 'http://www.fujisan-lmt.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [1, 12, 4, 5],
        difficulty: 2, courseTime: '4時間30分', features: ['ダイヤモンド富士', '富士山てんぼう', '本栖湖わき'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'horaiji',
        name: '鳳来寺山',
        lat: 34.9494, long: 137.6003, elevation: 684,
        area: '愛知県', url: 'https://www.horaiji.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 1, courseTime: '3時間', features: ['しぜんきねんぶつ', '1425だんのかいだん', 'こけのもり'],
        hut: 'なし', tent: 'なし', water: '豊富'
    },
    // --- ⚔️ 中級（Lv.3〜4 / ベテラン級） ---
    {
        id: 'tanigawadake',
        name: '谷川岳',
        lat: 36.8455, long: 138.7427, elevation: 1977,
        area: '群馬県', url: 'https://tanigawadake-rw.com/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [7, 8, 9, 10],
        difficulty: 4, courseTime: '5時間30分', features: ['日本百名山', 'ロープウェイあり', 'まなこいわ（ガレ場）'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'kinpu',
        name: '金峰山',
        lat: 35.7986, long: 138.6411, elevation: 2599,
        area: '山梨県', url: 'https://www.kirari.yamashi.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '7時間', features: ['日本百名山', '五丈岩（ほこら）', 'ずっとやまの うえ'],
        hut: 'あり(有人)', tent: 'あり', water: '要かくにん'
    },
    {
        id: 'tateshina',
        name: '蓼科山',
        lat: 36.1045, long: 138.2980, elevation: 2531,
        area: '長野県', url: 'https://tateshina.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9, 10],
        difficulty: 3, courseTime: '5時間', features: ['日本百名山', 'まん丸な さんちょう', 'かい石のたたみ'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'mizugaki',
        name: '瑞牆山',
        lat: 35.8606, long: 138.5947, elevation: 2230,
        area: '山梨県', url: 'https://kanko.hokuto-city.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9, 10],
        difficulty: 3, courseTime: '5時間30分', features: ['日本百名山', 'きょだいいわ', 'フリークライミング'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'ryokami',
        name: '両神山',
        lat: 36.0600, long: 138.8389, elevation: 1723,
        area: '埼玉県', url: 'https://www.town.yoshida.saitama.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 4, courseTime: '8時間', features: ['日本百名山', 'じゅうさんくさり', 'おくのほそみち'],
        hut: 'あり(有人)', tent: 'なし', water: '豊富'
    },
    {
        id: 'fuji-subashiri',
        name: '富士山（須走口）',
        lat: 35.3563, long: 138.7778, elevation: 3776,
        area: '静岡県', url: 'https://www.fujisan-climb.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8],
        difficulty: 4, courseTime: '10時間', features: ['世界遺産', 'すばしり さんどう', 'すなはし りがいち'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'gozaisho',
        name: '御在所岳',
        lat: 35.0206, long: 136.4172, elevation: 1212,
        area: '三重県', url: 'https://www.gozaisho.co.jp/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 3, courseTime: '5時間', features: ['ロープウェイあり', 'いわば', 'きガン・ちガン'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'enasan',
        name: '恵那山',
        lat: 35.4419, long: 137.5956, elevation: 2191,
        area: '岐阜県', url: 'https://kankou-ena.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9, 10],
        difficulty: 4, courseTime: '7時間', features: ['日本百名山', 'やぶこぎ', 'ながいコース'],
        hut: '避難小屋のみ', tent: 'なし', water: 'なし'
    },
    {
        id: 'amagisan',
        name: '天城山',
        lat: 34.8647, long: 139.0064, elevation: 1406,
        area: '静岡県', url: 'https://amagigoe.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 3, courseTime: '4時間30分', features: ['日本百名山', 'シャクナゲ', 'うっそうとした もり'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'yatsugatake-akadake',
        name: '八ヶ岳（赤岳）',
        lat: 35.9708, long: 138.3683, elevation: 2899,
        area: '長野県', url: 'https://yatsugatake.gr.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9, 10],
        difficulty: 4, courseTime: '8時間30分', features: ['日本百名山', 'やまごや おおい', 'いわば あり'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'chokaisan',
        name: '鳥海山',
        lat: 39.0988, long: 140.0483, elevation: 2236,
        area: '山形県', url: 'https://chokaizan.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 4, courseTime: '9時間', features: ['日本百名山', 'うみ が みえる', 'コチコチの ゆき渓'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'hakusan',
        name: '白山',
        lat: 36.1550, long: 136.7713, elevation: 2702,
        area: '石川県', url: 'https://www.kagahakusan.jp/',
        category: 'trekking', activities: ['trekking', 'nature', 'flower'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '10時間', features: ['日本百名山', 'はなばたけ', 'やまごや あり'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'kujurenzan',
        name: '九重連山',
        lat: 33.0833, long: 131.2500, elevation: 1791,
        area: '大分県', url: 'https://kuju.jp/',
        category: 'trekking', activities: ['trekking', 'nature', 'flower'],
        bestMonths: [5, 6, 9, 10, 11],
        difficulty: 3, courseTime: '7時間', features: ['日本百名山', 'ミヤマキリシマ', 'おんせん'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'kisokomagadake',
        name: '木曽駒ヶ岳',
        lat: 35.7891, long: 137.8047, elevation: 2956,
        area: '長野県', url: 'https://www.chuo-alps.com/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [7, 8, 9, 10],
        difficulty: 2, courseTime: '4時間', features: ['日本百名山', 'ロープウェイあり', '3000mきゅう'],
        hut: 'あり(有人)', tent: 'あり', water: '要かくにん'
    },
    {
        id: 'tateyama-murodo',
        name: '立山（雄山）',
        lat: 36.5770, long: 137.6013, elevation: 3003,
        area: '富山県', url: 'https://www.alpen-route.com/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [7, 8, 9, 10],
        difficulty: 3, courseTime: '5時間', features: ['日本百名山', 'ケーブルカーあり', 'いわば'],
        hut: 'あり(有人)', tent: 'あり', water: 'なし'
    },
    {
        id: 'karasawa',
        name: '涸沢カール',
        lat: 36.2900, long: 137.6600, elevation: 2300,
        area: '長野県', url: 'https://www.kamikochi.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9, 10],
        difficulty: 3, courseTime: '12時間', features: ['やまごや だいにんき', 'テントはく', 'こうよう'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'daisetsuzan',
        name: '大雪山系 旭岳',
        lat: 43.6625, long: 142.8514, elevation: 2291,
        area: '北海道', url: 'https://asahidake.hokkaido.jp/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '4時間30分', features: ['日本百名山', 'ロープウェイあり', 'カムイミンタラ'],
        hut: '避難小屋のみ', tent: 'あり', water: '要かくにん'
    },

    // ====================================
    // 🗾 東海4県 登山スポット 超強化
    // ====================================

    // --- 🏔️ 愛知県 ---
    {
        id: 'mikuni-aichi',
        name: '三国山',
        lat: 35.1403, long: 137.5189, elevation: 701,
        area: '愛知県', url: 'https://www.shinshiro.lg.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 1, courseTime: '2時間30分', features: ['あいちの さとやま', 'のどかな おさんぽ'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'hongusan',
        name: '本宮山',
        lat: 34.9192, long: 137.4233, elevation: 789,
        area: '愛知県', url: 'https://www.toyokawashi.org/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [3, 4, 5, 10, 11],
        difficulty: 2, courseTime: '3時間30分', features: ['みかわ さんぎょうの やま', 'かいだん おおい', 'じんじゃ あり'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'sanageyama',
        name: '猿投山',
        lat: 35.1556, long: 137.1492, elevation: 629,
        area: '愛知県', url: 'https://www.city.toyota.aichi.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [3, 4, 5, 10, 11, 12],
        difficulty: 1, courseTime: '3時間', features: ['なごやからアクセス◎', 'トレランにんき', 'さんぽみち'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'miyajiyama',
        name: '宮路山',
        lat: 34.8381, long: 137.3156, elevation: 362,
        area: '愛知県', url: 'https://www.toyokawashi.org/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [1, 2, 3, 4, 11, 12],
        difficulty: 1, courseTime: '1時間30分', features: ['こうよう', 'ファミリーむけ', 'みかわわん てんぼう'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'nyudogatake',
        name: '入道ヶ岳(愛知側)',
        lat: 35.2806, long: 137.0714, elevation: 906,
        area: '愛知県', url: 'https://www.city.seto.aichi.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 2, courseTime: '4時間', features: ['くさ のはら', 'ひらけた てんぼう', 'しゅうかいくい あり'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },

    // --- 🏔️ 岐阜県 ---
    {
        id: 'norikuradake',
        name: '乗鞍岳',
        lat: 36.1064, long: 137.5531, elevation: 3026,
        area: '岐阜県', url: 'https://norikuradake.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 1, courseTime: '2時間30分', features: ['日本百名山', 'バスでいける 3000m', 'らいちょう'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'ibukiyama',
        name: '伊吹山',
        lat: 35.4167, long: 136.4069, elevation: 1377,
        area: '岐阜県', url: 'https://www.ibukiyama-driveway.jp/',
        category: 'trekking', activities: ['trekking', 'nature', 'flower'],
        bestMonths: [4, 5, 7, 8, 10],
        difficulty: 2, courseTime: '5時間30分', features: ['日本百名山', 'はなの めいざん', 'ドライブウェイあり'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'ontakedake',
        name: '御嶽山',
        lat: 35.8936, long: 137.4810, elevation: 3067,
        area: '岐阜県', url: 'https://www.vill.otaki.nagano.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 4, courseTime: '8時間', features: ['日本百名山', 'きけんじょうほう ようかくにん', 'しんこうの やま'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'kinkazan',
        name: '金華山',
        lat: 35.4350, long: 136.7819, elevation: 329,
        area: '岐阜県', url: 'https://www.gifucvb.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [3, 4, 5, 10, 11, 12],
        difficulty: 1, courseTime: '1時間30分', features: ['ぎふじょう', 'ロープウェイあり', 'ながらがわ てんぼう'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'nanakiyama',
        name: '納古山',
        lat: 35.5469, long: 137.0500, elevation: 633,
        area: '岐阜県', url: 'https://www.kankou-gifu.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 1, courseTime: '2時間30分', features: ['ひだのやま パノラマ', 'てがるに のぼれる', '初心者おすすめ'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'yarigatake-gifu',
        name: '笠ヶ岳',
        lat: 36.3031, long: 137.5319, elevation: 2898,
        area: '岐阜県', url: 'https://www.kasagatake.info/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '16時間(1〜2泊)', features: ['日本百名山', 'ちょう ろんぐコース', 'かさの かたち'],
        hut: 'あり(有人)', tent: 'あり', water: '要かくにん'
    },
    {
        id: 'hodaka-gifu',
        name: '焼岳',
        lat: 36.2269, long: 137.5862, elevation: 2455,
        area: '岐阜県', url: 'https://www.kamikochi.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9, 10],
        difficulty: 3, courseTime: '6時間', features: ['かつかざん', 'かみこうちから アクセス', 'けむりが でてる'],
        hut: '避難小屋のみ', tent: 'なし', water: 'なし'
    },

    // --- 🏔️ 三重県 ---
    {
        id: 'odaigahara-mie',
        name: '大台ヶ原',
        lat: 34.1814, long: 136.1081, elevation: 1695,
        area: '三重県', url: 'https://kinki.env.go.jp/nature/odaigahara/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 10, 11],
        difficulty: 1, courseTime: '3時間30分', features: ['日本百名山', 'にほんいちの たうりょう', 'たいらな さんちょう'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'aoyama-kogen',
        name: '青山高原',
        lat: 34.6944, long: 136.3028, elevation: 756,
        area: '三重県', url: 'https://www.kankomie.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 6, 10, 11],
        difficulty: 1, courseTime: '2時間', features: ['ふうしゃ が みえる', 'はいきんぐ コース', 'すすき のはら'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'ryozenzan',
        name: '霊山',
        lat: 34.6853, long: 136.2464, elevation: 766,
        area: '三重県', url: 'https://www.kankomie.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 2, courseTime: '3時間30分', features: ['いわば', 'くさり・ロープ', 'しゅぎょうの やま'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'fujiwara',
        name: '藤原岳',
        lat: 35.1383, long: 136.4133, elevation: 1140,
        area: '三重県', url: 'https://www.kankomie.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature', 'flower'],
        bestMonths: [3, 4, 5, 10, 11],
        difficulty: 2, courseTime: '5時間', features: ['すずかやまけい', 'フクジュソウ', 'カレンフェルト'],
        hut: '避難小屋のみ', tent: 'なし', water: 'なし'
    },
    {
        id: 'amagidake-mie',
        name: '竜ヶ岳',
        lat: 35.0600, long: 136.4244, elevation: 1100,
        area: '三重県', url: 'https://www.kankomie.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 10, 11],
        difficulty: 3, courseTime: '5時間30分', features: ['すずかやまけい', 'しらひげ草 ぐんせい', 'やまびこ'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'suzuka-nyudo',
        name: '入道ヶ岳(鈴鹿)',
        lat: 34.9697, long: 136.4267, elevation: 906,
        area: '三重県', url: 'https://www.kankomie.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 2, courseTime: '4時間', features: ['すずかセブン', 'ススキ のはら', 'おおきな とりい'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },

    // --- 🏔️ 静岡県 ---
    {
        id: 'ryusozan',
        name: '竜爪山',
        lat: 35.0856, long: 138.4375, elevation: 1051,
        area: '静岡県', url: 'https://www.city.shizuoka.lg.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [3, 4, 5, 10, 11],
        difficulty: 2, courseTime: '4時間', features: ['しずおかの さとやま', 'ふじさん てんぼう', 'じんじゃ あり'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'warashina-kogen',
        name: '藁科高原 (オクシズ)',
        lat: 35.0355, long: 138.3344, elevation: 800,
        area: '静岡県', url: 'https://shizuoka-city.lg.jp/',
        category: 'highland', activities: ['nature', 'trekking', 'camp'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 1, courseTime: '3時間', features: ['オクシズ', 'わらしな', 'しずおかの さとやま'],
        hut: 'なし', tent: 'あり', water: '豊富'
    },
    {
        id: 'maruyama-shizuoka',
        name: '満観峰',
        lat: 34.9247, long: 138.2839, elevation: 470,
        area: '静岡県', url: 'https://www.city.yaizu.lg.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [1, 2, 3, 4, 11, 12],
        difficulty: 1, courseTime: '2時間30分', features: ['ふじさん ぜっけい', 'するがわん てんぼう', '初心者おすすめ'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'ryugatouge',
        name: '竜頭山',
        lat: 34.9689, long: 137.8281, elevation: 1352,
        area: '静岡県', url: 'https://www.city.hamamatsu.shizuoka.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 3, courseTime: '5時間', features: ['えんしゅうの めいほう', 'きゅうとう あり', 'しずかな やま'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'ashitaka',
        name: '愛鷹山',
        lat: 35.1986, long: 138.8089, elevation: 1504,
        area: '静岡県', url: 'https://numazu-kankou.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 10, 11],
        difficulty: 2, courseTime: '4時間30分', features: ['ふじさんの となり', 'つつじ', 'ぬまづから アクセス'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'kitadake-shizuoka',
        name: '北岳（静岡側）',
        lat: 35.6747, long: 138.2367, elevation: 3193,
        area: '静岡県', url: 'https://www.pref.shizuoka.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '14時間(1〜2泊)', features: ['にほん だい2い', 'みなみアルプス', 'きたがわの かべ'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'hijirisan',
        name: '聖岳',
        lat: 35.4536, long: 138.1478, elevation: 3013,
        area: '静岡県', url: 'https://www.pref.shizuoka.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '20時間(2〜3泊)', features: ['日本百名山', 'みなみアルプス すいせん', 'ちょうロングコース'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },

    // --- 🐉 上級（Lv.5 / でんせつ級） ---
    {
        id: 'kaikomagadake',
        name: '甲斐駒ヶ岳',
        lat: 35.7606, long: 138.2358, elevation: 2967,
        area: '山梨県', url: 'https://www.minamialps-net.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '11時間(1泊)', features: ['日本百名山', 'しろいはだの花崗岩', 'きけんないわば'],
        hut: 'あり(有人)', tent: 'あり', water: '要かくにん'
    },
    {
        id: 'kitadake',
        name: '北岳',
        lat: 35.6744, long: 138.2375, elevation: 3193,
        area: '山梨県', url: 'https://www.minamialps-net.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '14時間(1〜2泊)', features: ['日本百名山', 'にほんだい2い', 'キタダケソウ'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'yarigatake',
        name: '槍ヶ岳',
        lat: 36.3419, long: 137.6475, elevation: 3180,
        area: '長野県', url: 'https://www.yarigatake.co.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '18時間(2泊)', features: ['日本百名山', 'きけんないわば', 'はしご・くさり'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'hotakadake',
        name: '奥穂高岳',
        lat: 36.2891, long: 137.6480, elevation: 3190,
        area: '長野県', url: 'https://www.kamikochi.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '16時間(2泊)', features: ['日本百名山', 'きけんないわば', 'にほん だい3い'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'tsurugidake',
        name: '剱岳',
        lat: 36.6233, long: 137.6172, elevation: 2999,
        area: '富山県', url: 'https://toyama-angeltour.co.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '15時間(1〜2泊)', features: ['日本百名山', 'いっぱんルート さいこうなんど', 'カニのタテバイ'],
        hut: 'あり(有人)', tent: 'あり', water: '要かくにん'
    },
    {
        id: 'fujisan',
        name: '富士山',
        lat: 35.3606, long: 138.7274, elevation: 3776,
        area: '静岡県', url: 'https://www.fujisan-climb.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8],
        difficulty: 4, courseTime: '12時間(1泊)', features: ['日本百名山', 'にほん いちの やま', 'こうざんびょうに ちゅうい'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'tsubakurodake',
        name: '燕岳',
        lat: 36.4119, long: 137.7519, elevation: 2763,
        area: '長野県', url: 'https://www.enzanso.co.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '8時間(1泊)', features: ['日本百名山', 'イルカいわ', '北アルプス入門'],
        hut: 'あり(有人)', tent: 'あり', water: '要かくにん'
    },
    {
        id: 'chogatake',
        name: '蝶ヶ岳',
        lat: 36.3167, long: 137.7167, elevation: 2677,
        area: '長野県', url: 'https://www.kamikochi.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '9時間(1泊)', features: ['槍・穂高 パノラマ', 'やまごや あり', 'テントはく むき'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'hakuba-daisekkei',
        name: '白馬大雪渓',
        lat: 36.7472, long: 137.7625, elevation: 2469,
        area: '長野県', url: 'https://www.hakuba-happo.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8],
        difficulty: 4, courseTime: '12時間(1泊)', features: ['日本百名山', '大雪渓 あるき', 'アイゼン 必要'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },

    // --- 🏔️ 東北の名峰 ---
    {
        id: 'gassan',
        name: '月山',
        lat: 38.5483, long: 140.0258, elevation: 1984,
        area: '山形県', url: 'https://www.gassan.co.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 2, courseTime: '5時間', features: ['日本百名山', 'なつスキー', 'こうざんしょくぶつ'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'zao-kumanodake',
        name: '蔵王（熊野岳）',
        lat: 38.1450, long: 140.4367, elevation: 1841,
        area: '山形県', url: 'https://www.zao-spa.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [6, 7, 8, 9],
        difficulty: 2, courseTime: '3時間', features: ['日本百名山', 'おかまのいけ', 'ロープウェイあり'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'iwakisan',
        name: '岩木山',
        lat: 40.6556, long: 140.3028, elevation: 1625,
        area: '青森県', url: 'https://www.iwakisan.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9],
        difficulty: 2, courseTime: '5時間', features: ['日本百名山', 'つがるふじ', 'いわきスカイライン'],
        hut: '避難小屋のみ', tent: 'なし', water: 'なし'
    },
    {
        id: 'hayachine',
        name: '早池峰山',
        lat: 39.5600, long: 141.5000, elevation: 1917,
        area: '岩手県', url: 'https://www.city.hanamaki.iwate.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8],
        difficulty: 3, courseTime: '6時間', features: ['日本百名山', 'ハヤチネウスユキソウ', 'うるとらまふぃっくがん'],
        hut: '避難小屋のみ', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'iwatesan',
        name: '岩手山',
        lat: 39.8514, long: 141.0006, elevation: 2038,
        area: '岩手県', url: 'https://www.city.shizukuishi.iwate.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '9時間', features: ['日本百名山', 'なんぶかたふじ', 'コマクサ群生'],
        hut: '避難小屋のみ', tent: 'あり', water: '要かくにん'
    },
    {
        id: 'azumayama',
        name: '吾妻山（西吾妻山）',
        lat: 37.7350, long: 140.1450, elevation: 2035,
        area: '福島県', url: 'https://www.urabandai-inf.com/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [6, 7, 8, 9],
        difficulty: 2, courseTime: '4時間', features: ['日本百名山', 'しつげん', 'ロープウェイあり'],
        hut: '避難小屋のみ', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'adatarayama',
        name: '安達太良山',
        lat: 37.6211, long: 140.2878, elevation: 1700,
        area: '福島県', url: 'https://www.adatara-resort.com/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [6, 7, 8, 9, 10],
        difficulty: 2, courseTime: '4時間', features: ['日本百名山', 'ほんとうの そら', 'ゴンドラあり'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'bandaisan',
        name: '磐梯山',
        lat: 37.6014, long: 140.0725, elevation: 1816,
        area: '福島県', url: 'https://www.urabandai-inf.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9],
        difficulty: 3, courseTime: '6時間', features: ['日本百名山', 'ばくれつ火口', 'ごしきぬま'],
        hut: '避難小屋のみ', tent: 'なし', water: '要かくにん'
    },

    // --- 🏔️ 北海道の名峰 ---
    {
        id: 'tokachidake',
        name: '十勝岳',
        lat: 43.4156, long: 142.6878, elevation: 2077,
        area: '北海道', url: 'https://www.kamifurano.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '7時間', features: ['日本百名山', 'かっかざん', 'うんかいてんぼう'],
        hut: '避難小屋のみ', tent: 'なし', water: 'なし'
    },
    {
        id: 'yoteizan',
        name: '羊蹄山',
        lat: 42.8267, long: 140.8117, elevation: 1898,
        area: '北海道', url: 'https://www.town-kutchan.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 4, courseTime: '10時間', features: ['日本百名山', 'えぞふじ', 'ようていのわきみず'],
        hut: '避難小屋のみ', tent: 'あり', water: '要かくにん'
    },
    {
        id: 'rishirizan',
        name: '利尻山',
        lat: 45.1783, long: 141.2433, elevation: 1721,
        area: '北海道', url: 'https://www.rishiri-plus.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8],
        difficulty: 4, courseTime: '10時間', features: ['日本百名山', 'さいほくの ひゃくめいざん', 'しまぜんたいが やま'],
        hut: '避難小屋のみ', tent: 'あり', water: '要かくにん'
    },

    // --- 🏔️ 中国・四国の名峰 ---
    {
        id: 'daisen',
        name: '大山（伯耆大山）',
        lat: 35.3706, long: 133.5453, elevation: 1729,
        area: '鳥取県', url: 'https://tourismdaisen.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
        difficulty: 2, courseTime: '5時間', features: ['日本百名山', 'ほうきふじ', 'ブナの もり'],
        hut: '避難小屋のみ', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'ishizuchisan',
        name: '石鎚山',
        lat: 33.7689, long: 133.1144, elevation: 1982,
        area: '愛媛県', url: 'https://www.ishizuchi.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
        difficulty: 3, courseTime: '6時間', features: ['日本百名山', 'にしにほん さいこうほう', 'くさり場 あり'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'tsurugisan',
        name: '剣山',
        lat: 33.8528, long: 134.0936, elevation: 1955,
        area: '徳島県', url: 'https://tsurugisan.net/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [5, 6, 7, 8, 9, 10],
        difficulty: 1, courseTime: '3時間', features: ['日本百名山', 'リフトあり', 'ミヤマクマザサ'],
        hut: 'あり(有人)', tent: 'なし', water: '豊富'
    },
    {
        id: 'sanbesan',
        name: '三瓶山',
        lat: 35.1389, long: 132.6217, elevation: 1126,
        area: '島根県', url: 'https://www.ginzan-wm.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [4, 5, 6, 9, 10, 11],
        difficulty: 1, courseTime: '3時間', features: ['日本二百名山', 'そうげん', 'かいてきジュウソウ'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },

    // --- 🏔️ 九州の名峰 ---
    {
        id: 'asosan',
        name: '阿蘇山（高岳）',
        lat: 32.8839, long: 131.1039, elevation: 1592,
        area: '熊本県', url: 'https://www.asocity-kanko.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 9, 10],
        difficulty: 2, courseTime: '4時間', features: ['日本百名山', 'せかい さいだいきゅうの カルデラ', 'かっかざん'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'kirishima',
        name: '霧島山（韓国岳）',
        lat: 31.9344, long: 130.8608, elevation: 1700,
        area: '宮崎県', url: 'https://kirishimakankou.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 9, 10, 11],
        difficulty: 2, courseTime: '4時間', features: ['日本百名山', 'ミヤマキリシマ', 'おおなみのいけ'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'miyanoura',
        name: '宮之浦岳',
        lat: 30.3350, long: 130.5003, elevation: 1936,
        area: '鹿児島県', url: 'https://www.yakushima-town.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 9, 10],
        difficulty: 4, courseTime: '14時間(1〜2泊)', features: ['日本百名山', 'せかいいさん やくしま', 'やくすぎの もり'],
        hut: '避難小屋のみ', tent: 'あり', water: '豊富'
    },
    {
        id: 'kaimon',
        name: '開聞岳',
        lat: 31.2008, long: 130.5656, elevation: 924,
        area: '鹿児島県', url: 'https://www.ibusuki.or.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [3, 4, 5, 10, 11],
        difficulty: 2, courseTime: '5時間', features: ['日本百名山', 'さつまふじ', 'うみ が みえる'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },

    // --- 🏔️ 北陸・信越の名峰（追加） ---
    {
        id: 'myokosan',
        name: '妙高山',
        lat: 36.8917, long: 138.3331, elevation: 2454,
        area: '新潟県', url: 'https://www.myoko.tv/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '8時間', features: ['日本百名山', 'えちごふじ', 'おおだに ヒュッテ'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'hiuchidake',
        name: '火打山',
        lat: 36.9283, long: 138.3400, elevation: 2462,
        area: '新潟県', url: 'https://www.myoko.tv/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '10時間(1泊)', features: ['日本百名山', 'てんぐのにわ', 'ハクサンコザクラ'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },
    {
        id: 'naebasan',
        name: '苗場山',
        lat: 36.8461, long: 138.6875, elevation: 2145,
        area: '新潟県', url: 'https://www.town-tsunan.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '8時間', features: ['日本百名山', 'さんちょう しつげん', 'いけとう ぐん'],
        hut: 'あり(有人)', tent: 'なし', water: '豊富'
    },
    {
        id: 'arakawadake',
        name: '荒川三山（悪沢岳）',
        lat: 35.5361, long: 138.1817, elevation: 3141,
        area: '静岡県', url: 'https://www.t-forest.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 5, courseTime: '20時間(2〜3泊)', features: ['日本百名山', 'みなみアルプス南部', 'にほんだい6い'],
        hut: 'あり(有人)', tent: 'あり', water: '豊富'
    },

    // --- 🏔️ 関東の名峰（追加） ---
    {
        id: 'nikko-nantai',
        name: '日光男体山',
        lat: 36.7656, long: 139.4903, elevation: 2486,
        area: '栃木県', url: 'https://www.nikko-kankou.org/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [6, 7, 8, 9, 10],
        difficulty: 3, courseTime: '6時間', features: ['日本百名山', 'ちゅうぜんじこ ビュー', 'しんこうの やま'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'nikko-shirane',
        name: '日光白根山',
        lat: 36.7981, long: 139.3764, elevation: 2578,
        area: '栃木県', url: 'https://www.marunuma.jp/green/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [6, 7, 8, 9],
        difficulty: 3, courseTime: '6時間', features: ['日本百名山', 'かんとう さいこうほう', 'ロープウェイあり'],
        hut: '避難小屋のみ', tent: 'なし', water: 'なし'
    },
    {
        id: 'akagiyama',
        name: '赤城山',
        lat: 36.5617, long: 139.1614, elevation: 1828,
        area: '群馬県', url: 'https://www.maebashi-cvb.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 7, 8, 9, 10],
        difficulty: 1, courseTime: '3時間', features: ['日本百名山', 'おおぬまの ほとり', 'しょしんしゃ おすすめ'],
        hut: 'なし', tent: 'なし', water: 'なし'
    },
    {
        id: 'nasusan',
        name: '那須岳（茶臼岳）',
        lat: 37.1247, long: 139.9628, elevation: 1915,
        area: '栃木県', url: 'https://nasukogen.org/',
        category: 'trekking', activities: ['trekking', 'nature', 'gondola'],
        bestMonths: [5, 6, 7, 8, 9, 10],
        difficulty: 2, courseTime: '3時間', features: ['日本百名山', 'かっかざん', 'ロープウェイあり'],
        hut: '避難小屋のみ', tent: 'あり', water: '要かくにん'
    },

    // --- 🏔️ 東海・近畿の名峰（追加） ---
    {
        id: 'ontakesan',
        name: '御嶽山',
        lat: 35.8933, long: 137.4808, elevation: 3067,
        area: '長野県', url: 'https://www.kankou-kiso.com/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [7, 8, 9],
        difficulty: 3, courseTime: '7時間', features: ['日本百名山', 'しんこうの やま', '2014ふんか'],
        hut: 'あり(有人)', tent: 'なし', water: '要かくにん'
    },
    {
        id: 'odaigahara-nara',
        name: '大台ヶ原',
        lat: 34.1828, long: 136.1072, elevation: 1695,
        area: '奈良県', url: 'https://www.odaigahara.jp/',
        category: 'trekking', activities: ['trekking', 'nature'],
        bestMonths: [5, 6, 9, 10, 11],
        difficulty: 1, courseTime: '3時間30分', features: ['日本百名山', 'にほんいち あめがおおい', 'こけの もり'],
        hut: 'なし', tent: 'なし', water: 'なし'
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
    // (追加分はここで既存エントリに統合済み。このブロックは削除)


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
