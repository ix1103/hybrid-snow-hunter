export interface Resort {
  id: string;
  name: string;
  lat: number;
  long: number;
  area: string;
  url?: string;
  tenki_id?: string; // e.g. "1/1/30421"
}

export const RESORTS: Resort[] = [
  // --- 北海道 (Hokkaido) ---
  { id: 'niseko-united', name: 'ニセコユナイテッド', lat: 42.8631, long: 140.7032, area: '北海道', url: 'https://www.niseko.ne.jp/', tenki_id: '1/1/30421' }, // Grand Hirafu
  { id: 'rusutsu', name: 'ルスツリゾート', lat: 42.7533, long: 140.9069, area: '北海道', url: 'https://rusutsu.com/', tenki_id: '1/3/30509' },
  { id: 'furano', name: '富良野スキー場', lat: 43.3242, long: 142.3364, area: '北海道', url: 'https://www.princehotels.co.jp/ski/furano/' },
  { id: 'kiroro', name: 'キロロスノーワールド', lat: 43.0694, long: 140.9850, area: '北海道', url: 'https://www.kiroro.co.jp/' },
  { id: 'tomamu', name: '星野リゾート トマム', lat: 43.0628, long: 142.6319, area: '北海道', url: 'https://www.snowtomamu.jp/winter/' },
  { id: 'sapporo-kokusai', name: '札幌国際スキー場', lat: 42.9614, long: 141.0858, area: '北海道', url: 'https://www.sapporo-kokusai.jp/' },
  { id: 'sapporo-teine', name: 'サッポロテイネ', lat: 43.0950, long: 141.2056, area: '北海道', url: 'https://sapporo-teine.com/snow/' },
  { id: 'kamui-links', name: 'カムイスキーリンクス', lat: 43.7144, long: 142.2289, area: '北海道', url: 'https://www.kamui-skilinks.com/' },
  { id: 'sahoro', name: 'サホロリゾート', lat: 43.1667, long: 142.8000, area: '北海道', url: 'https://sahoro.co.jp/' },
  { id: 'moiwa', name: 'ニセコモイワ', lat: 42.8500, long: 140.6333, area: '北海道', url: 'https://niseko-moiwa.jp/' },
  { id: 'bankei', name: 'さっぽろばんけい', lat: 43.0333, long: 141.2833, area: '北海道', url: 'https://www.bankei.co.jp/' },
  { id: 'asahidake', name: '旭岳ロープウェー', lat: 43.6631, long: 142.8394, area: '北海道', url: 'https://asahidake.hokkaido.jp/' },
  { id: 'kuromadake', name: '黒岳スキー場', lat: 43.7083, long: 142.9333, area: '北海道', url: 'https://www.rinyu.co.jp/kurodake/' },

  // --- 東北 (Tohoku) ---
  { id: 'appi', name: '安比高原スキー場', lat: 40.0006, long: 140.9839, area: '岩手県', url: 'https://www.appi.co.jp/' },
  { id: 'ntj-geto', name: '夏油高原スキー場', lat: 39.1839, long: 140.9039, area: '岩手県', url: 'https://www.getokogen.com/' },
  { id: 'hachimantai', name: '八幡平リゾート', lat: 39.8550, long: 140.9567, area: '岩手県', url: 'https://www.hachimantai.co.jp/' },
  { id: 'iwategen', name: '岩手高原スノーパーク', lat: 39.7556, long: 140.9833, area: '岩手県', url: 'https://iwatekogen.jp/' },
  { id: 'zao', name: '山形蔵王温泉スキー場', lat: 38.1611, long: 140.3992, area: '山形県', url: 'http://www.zao-ski.or.jp/', tenki_id: '2/7/31046' },
  { id: 'gassan', name: '月山スキー場', lat: 38.5478, long: 140.0306, area: '山形県', url: 'https://gassankanko.jp/' },
  { id: 'jangle', name: '黒伏高原スノーパーク', lat: 38.4333, long: 140.5333, area: '山形県', url: 'https://jangle.co.jp/' },
  { id: 'alts-bandai', name: '星野リゾート ネコマ マウンテン', lat: 37.5925, long: 140.0383, area: '福島県', url: 'https://www.nekoma.co.jp/' },
  { id: 'grandeco', name: 'グランデコスノーリゾート', lat: 37.6625, long: 140.1017, area: '福島県', url: 'https://www.grandeco.com/' },
  { id: 'minowa', name: '箕輪スキー場', lat: 37.6431, long: 140.2647, area: '福島県', url: 'https://www.ski-minowa.jp/' },
  { id: 'inawashiro', name: '猪苗代スキー場', lat: 37.5683, long: 140.0767, area: '福島県', url: 'https://www.inawashiro-ski.com/' },
  { id: 'hakkoda', name: '八甲田スキー場', lat: 40.6653, long: 140.8522, area: '青森県', url: 'http://www.hakkoda-ropeway.jp/' },
  { id: 'aomori-spring', name: '青森スプリング', lat: 40.7333, long: 140.3167, area: '青森県', url: 'https://aomorispringski.com/' },
  { id: 'tazawako', name: 'たざわ湖スキー場', lat: 39.7611, long: 140.7639, area: '秋田県', url: 'https://www.tazawako-ski.com/' },

  // --- 新潟 (Niigata) [強化] ---
  { id: 'gala-yuzawa', name: 'GALA湯沢', lat: 36.9367, long: 138.7900, area: '新潟県', url: 'https://gala.co.jp/winter/' },
  { id: 'kagura', name: 'かぐらスキー場', lat: 36.8778, long: 138.7481, area: '新潟県', url: 'https://www.princehotels.co.jp/ski/kagura/' },
  { id: 'naeba', name: '苗場スキー場', lat: 36.7936, long: 138.7831, area: '新潟県', url: 'https://www.princehotels.co.jp/ski/naeba/', tenki_id: '3/16/32204' },
  { id: 'maiko', name: '舞子スノーリゾート', lat: 36.9936, long: 138.8256, area: '新潟県', url: 'https://www.maiko-resort.com/' },
  { id: 'kandatsu', name: '神立スノーリゾート', lat: 36.9167, long: 138.8306, area: '新潟県', url: 'https://www.kandatsu.com/' },
  { id: 'yuzawa-kogen', name: '湯沢高原スキー場', lat: 36.9467, long: 138.8033, area: '新潟県', url: 'https://www.yuzawakogen.com/' },
  { id: 'yuzawa-nakazato', name: '湯沢中里スノーリゾート', lat: 36.9236, long: 138.8556, area: '新潟県', url: 'https://www.yuzawa-nakazato.com/' },
  { id: 'ipponsugi', name: '一本杉スキー場', lat: 36.9389, long: 138.8050, area: '新潟県', url: 'https://www.ipponsugi.net/' },
  { id: 'naspa', name: 'NASPAスキーガーデン', lat: 36.9389, long: 138.8111, area: '新潟県', url: 'https://naspa.co.jp/ski/' },
  { id: 'iwappara', name: '岩原スキー場', lat: 36.9250, long: 138.8417, area: '新潟県', url: 'https://iwa-ppara.com/' },
  { id: 'myoko-suginohara', name: '妙高杉ノ原スキー場', lat: 36.8525, long: 138.1569, area: '新潟県', url: 'https://www.princehotels.co.jp/ski/myoko/' },
  { id: 'akakura-kanko', name: '赤倉観光リゾート', lat: 36.8833, long: 138.1917, area: '新潟県', url: 'https://akr-ski.com/' },
  { id: 'akakura-onsen', name: '赤倉温泉スキー場', lat: 36.8900, long: 138.2000, area: '新潟県', url: 'https://akakura-ski.com/' },
  { id: 'seki-onsen', name: '関温泉スキー場', lat: 36.8833, long: 138.1667, area: '新潟県', url: 'http://www.sekionsen.com/' },
  { id: 'lotte-arai', name: 'ロッテアライリゾート', lat: 37.0006, long: 138.1883, area: '新潟県', url: 'https://www.lottehotel.com/arai-resort/ja/ski.html' },
  { id: 'ishisauchi', name: '石打丸山スキー場', lat: 36.9536, long: 138.8164, area: '新潟県', url: 'https://ishiuchi.or.jp/' },
  { id: 'joetsu-kokusai', name: '上越国際スキー場', lat: 37.0278, long: 138.8167, area: '新潟県', url: 'https://jkokusai.co.jp/' },
  { id: 'hakkaisan', name: 'ムイカスノーリゾート', lat: 37.0667, long: 138.9000, area: '新潟県', url: 'https://www.muikamachi.com/ski/' },
  { id: 'roppunohara', name: '六日町八海山スキー場', lat: 37.1000, long: 139.0167, area: '新潟県', url: 'https://www.princehotels.co.jp/ski/hakkaisan/' },
  { id: 'charmant', name: 'シャルマン火打', lat: 36.9833, long: 138.0333, area: '新潟県', url: 'https://charmant-hiuchi.jp/' },
  { id: 'cupid-valley', name: 'キューピットバレイ', lat: 37.2333, long: 138.4000, area: '新潟県', url: 'https://www.yukidaruma-kogen.com/' },
  { id: 'okutadami', name: '奥只見丸山スキー場', lat: 37.1500, long: 139.1833, area: '新潟県', url: 'https://okutadami.co.jp/ski/' },
  { id: 'ninox', name: 'ニノックススノーパーク', lat: 37.9667, long: 139.4000, area: '新潟県', url: 'https://ninox.co.jp/' },
  { id: 'tainai', name: '胎内スキー場', lat: 38.0333, long: 139.4333, area: '新潟県', url: 'https://tainai.info/ski/' },

  // --- 長野 (Nagano) [強化] ---
  { id: 'hakuba-happo', name: '白馬八方尾根スキー場', lat: 36.6962, long: 137.8407, area: '長野県', url: 'https://www.happo-one.jp/', tenki_id: '3/16/32101' },
  { id: 'hakuba-goryu', name: 'エイブル白馬五竜', lat: 36.6667, long: 137.8389, area: '長野県', url: 'https://www.hakubagoryu.com/' },
  { id: 'tsugaike', name: '栂池高原スキー場', lat: 36.7578, long: 137.8683, area: '長野県', url: 'https://www.tsugaike.gr.jp/' },
  { id: 'hakuba-cortina', name: '白馬コルチナ', lat: 36.7869, long: 137.8686, area: '長野県', url: 'https://haku-nori.com/' },
  { id: 'hakuba-47', name: 'Hakuba47', lat: 36.6789, long: 137.8311, area: '長野県', url: 'https://www.hakuba47.co.jp/' },
  { id: 'hakuba-iwatake', name: '白馬岩岳スノーフィールド', lat: 36.7139, long: 137.8611, area: '長野県', url: 'https://iwatake-mountain-resort.com/' },
  { id: 'hakuba-norikura', name: '白馬乗鞍温泉スキー場', lat: 36.7667, long: 137.8500, area: '長野県', url: 'https://www.hakunori.com/' },
  { id: 'jiigatake', name: '爺ガ岳スキー場', lat: 36.5667, long: 137.7833, area: '長野県', url: 'https://jiigatake.com/' },
  { id: 'kashimayari', name: '鹿島槍スキー場', lat: 36.6000, long: 137.8167, area: '長野県', url: 'https://www.kashimayari.net/' },
  { id: 'nozawa', name: '野沢温泉スキー場', lat: 36.9222, long: 138.4411, area: '長野県', url: 'https://nozawaski.com/' },
  { id: 'togari', name: '戸狩温泉スキー場', lat: 36.9333, long: 138.3833, area: '長野県', url: 'https://togari.jp/' },
  { id: 'kijimadaira', name: '北信州木島平スキー場', lat: 36.8833, long: 138.3833, area: '長野県', url: 'https://kijimadaira-ski.com/' },
  { id: 'sakae-club', name: 'さかえ倶楽部', lat: 36.9667, long: 138.5833, area: '長野県', url: 'https://sakaeclub-ski.com/' },
  { id: 'shiga-kogen', name: '志賀高原 (全山)', lat: 36.7214, long: 138.5076, area: '長野県', url: 'https://www.shigakogen-ski.com/' },
  { id: 'togakushi', name: '戸隠スキー場', lat: 36.7583, long: 138.0750, area: '長野県', url: 'https://www.togakushi-ski.com/' },
  { id: 'iizuna', name: 'いいづなリゾート', lat: 36.7333, long: 138.1333, area: '長野県', url: 'https://iizunaresort.com/' },
  { id: 'kurohime', name: '黒姫高原スノーパーク', lat: 36.8167, long: 138.1500, area: '長野県', url: 'https://kurohime-kogen.co.jp/' },
  { id: 'madarao', name: '斑尾高原スキー場', lat: 36.8483, long: 138.3117, area: '長野県', url: 'https://www.madarao.jp/' },
  { id: 'tangram', name: 'タングラムスキーサーカス', lat: 36.8583, long: 138.2833, area: '長野県', url: 'https://www.tangram.jp/ski/' },
  { id: 'karuizawa', name: '軽井沢プリンスホテル', lat: 36.3311, long: 138.6381, area: '長野県', url: 'https://www.princehotels.co.jp/ski/karuizawa/' },
  { id: 'sugadaira', name: '菅平高原スノーリゾート', lat: 36.5414, long: 138.3589, area: '長野県', url: 'https://sugadaira-snowresort.com/' },
  { id: 'ryuo', name: '竜王スキーパーク', lat: 36.7850, long: 138.4550, area: '長野県', url: 'https://www.ryuoo.com/' },
  { id: 'x-jam', name: 'X-JAM高井富士', lat: 36.8000, long: 138.4333, area: '長野県', url: 'https://x-jam.jp/' },
  { id: 'yamboku', name: 'YAMABOKUワイルドスノーパーク', lat: 36.6667, long: 138.4333, area: '長野県', url: 'https://yamaboku.jp/' },
  { id: 'ontake-2240', name: 'おんたけ2240', lat: 35.8278, long: 137.5333, area: '長野県', url: 'https://ontake2240.jp/' },
  { id: 'kaida', name: '開田高原マイア', lat: 35.9167, long: 137.5833, area: '長野県', url: 'https://mia-ski.net/' },
  { id: 'norikura-onsen', name: 'Mt.乗鞍スノーリゾート', lat: 36.1167, long: 137.6167, area: '長野県', url: 'https://ww.brnorikura.jp/' },
  { id: 'nomugi', name: '野麦峠スキー場', lat: 36.0333, long: 137.6000, area: '長野県', url: 'https://nomugitouge.com/' },
  { id: 'fujimi', name: '富士見パノラマリゾート', lat: 35.9000, long: 138.1833, area: '長野県', url: 'https://www.fujimipanorama.com/snow/' },
  { id: 'shirakaba-2in1', name: '白樺2in1スキー場', lat: 36.1167, long: 138.2333, area: '長野県', url: 'https://www.2in1.jp/' },
  { id: 'kurumayama', name: '車山高原SKYPARK', lat: 36.1000, long: 138.2000, area: '長野県', url: 'https://www.kurumayama.co.jp/winter/' },
  { id: 'pilatus', name: 'ピラタス蓼科', lat: 36.0500, long: 138.2833, area: '長野県', url: 'https://www.pilatus.jp/' },

  // --- 群馬 (Gunma) ---
  { id: 'marunuma', name: '丸沼高原スキー場', lat: 36.8164, long: 139.3400, area: '群馬県', url: 'https://www.marunuma.jp/winter/' },
  { id: 'kawaba', name: '川場スキー場', lat: 36.7583, long: 139.0833, area: '群馬県', url: 'https://www.kawaba.co.jp/' },
  { id: 'hotaka', name: 'オグナほたかスキー場', lat: 36.8089, long: 139.1436, area: '群馬県', url: 'https://k-hotaka.jp/ogna/' },
  { id: 'kusatsu', name: '草津温泉スキー場', lat: 36.6358, long: 138.5681, area: '群馬県', url: 'https://www.932-onsen.com/winter/' },
  { id: 'palcall', name: 'パルコールつま恋', lat: 36.5667, long: 138.4667, area: '群馬県', url: 'https://palcall.co.jp/' },
  { id: 'manza', name: '万座温泉スキー場', lat: 36.6333, long: 138.5167, area: '群馬県', url: 'https://www.princehotels.co.jp/ski/manza/' },
  { id: 'tambara', name: 'たんばらスキーパーク', lat: 36.7333, long: 139.0500, area: '群馬県', url: 'https://www.tambara.co.jp/' },
  { id: 'hodaigi', name: '群馬みなかみほうだいぎ', lat: 36.8333, long: 139.0333, area: '群馬県', url: 'https://hodaigi.jp/' },
  { id: 'minakami-kogen', name: '水上高原スキーリゾート', lat: 36.8167, long: 139.0667, area: '群馬県', url: 'https://www.minakamikogen200.jp/' },

  // --- 栃木 (Tochigi) ---
  { id: 'hunter', name: 'ハンターマウンテン塩原', lat: 36.9333, long: 139.7833, area: '栃木県', url: 'https://www.hunter.co.jp/winter/' },
  { id: 'mount-jeans', name: 'マウントジーンズ那須', lat: 37.1000, long: 140.0000, area: '栃木県', url: 'https://www.mtjeans.com/winter/' },

  // --- 岐阜・中部 (Gifu / Chubu) [強化] ---
  { id: 'takasu', name: '高鷲スノーパーク', lat: 35.9861, long: 136.8444, area: '岐阜県', url: 'https://www.takasu.gr.jp/' },
  { id: 'dynaland', name: 'ダイナランド', lat: 35.9750, long: 136.8417, area: '岐阜県', url: 'https://www.dynaland.co.jp/' },
  { id: 'meiho', name: 'めいほうスキー場', lat: 35.8833, long: 137.0333, area: '岐阜県', url: 'https://www.meihoski.co.jp/' },
  { id: 'washigatake', name: '鷲ヶ岳スキー場', lat: 35.9500, long: 136.8333, area: '岐阜県', url: 'https://ski.washigatake.jp/' },
  { id: 'white-pia', name: 'ホワイトピアたかす', lat: 35.9667, long: 136.8500, area: '岐阜県', url: 'http://www.whitepia.jp/' },
  { id: 'hirugano', name: 'ひるがの高原スキー場', lat: 35.9333, long: 136.8833, area: '岐阜県', url: 'https://www.hiruganokogen.com/' },
  { id: 'winghills', name: 'ウイングヒルズ白鳥', lat: 35.9833, long: 136.8000, area: '岐阜県', url: 'https://winghills.net/' },
  { id: 'hida-funai', name: '飛騨舟山スノーリゾート', lat: 36.0333, long: 137.2667, area: '岐阜県', url: 'https://arkopia.jp/' },
  { id: 'mont-deus', name: 'モンデウス飛騨位山', lat: 36.0000, long: 137.2167, area: '岐阜県', url: 'https://www.montdeus.jp/' },
  { id: 'skijam', name: 'スキージャム勝山', lat: 36.0833, long: 136.5167, area: '福井県', url: 'https://www.skijam.jp/' },

  // --- 富士山・静岡・山梨 (Mt.Fuji / Shizuoka / Yamanashi) ---
  { id: 'yeti', name: 'スノーパーク イエティ', lat: 35.2974, long: 138.8094, area: '静岡県', url: 'https://www.yeti-resort.com/' },
  { id: 'fujiten', name: 'ふじてんスノーリゾート', lat: 35.4211, long: 138.7183, area: '山梨県', url: 'https://www.fujiten.net/' },
  { id: 'kamui-misaka', name: 'カムイみさかスキー場', lat: 35.5900, long: 138.6833, area: '山梨県', url: 'http://misaka.kamuisp.com/' },
  { id: 'sunmeadows', name: 'サンメドウズ清里', lat: 35.9333, long: 138.4333, area: '山梨県', url: 'https://www.sunmeadows.co.jp/' },
  { id: 'koumi-reex', name: 'シャトレーゼ スキーバレー小海', lat: 36.0667, long: 138.4667, area: '長野県', url: 'http://www.reex.co.jp/KOUMI/SKI/' }, // Added near this region for completeness

  // --- 西日本 (West Japan) ---
  { id: 'biwako-valley', name: 'びわ湖バレイ', lat: 35.2100, long: 135.8900, area: '滋賀県', url: 'https://www.biwako-valley.com/' },
  { id: 'gransnow', name: 'グランスノー奥伊吹', lat: 35.4333, long: 136.3667, area: '滋賀県', url: 'https://www.okuibuki.co.jp/' },
  { id: 'hachikita', name: 'ハチ北高原スキー場', lat: 35.3917, long: 134.5250, area: '兵庫県', url: 'https://www.hachi-hachikita.co.jp/' },
  { id: 'hachi-kogen', name: 'ハチ高原スキー場', lat: 35.3833, long: 134.5167, area: '兵庫県', url: 'https://www.hachi-hachikita.co.jp/' },
  { id: 'skyvalley', name: 'スカイバレー', lat: 35.4167, long: 134.5500, area: '兵庫県', url: 'https://www.skyvalley.jp/' },
  { id: 'mizunen', name: '瑞穂ハイランド', lat: 34.8250, long: 132.2250, area: '島根県', url: 'https://www.mizuhohighland.com/' },
  { id: 'megahira', name: 'めがひらスキー場', lat: 34.4500, long: 132.1833, area: '広島県', url: 'http://www.megahira.co.jp/pc/ski.html' },
  { id: 'geihoku', name: '芸北国際スキー場', lat: 34.7333, long: 132.2167, area: '広島県', url: 'https://geihokukokusai.jp/' },
];
