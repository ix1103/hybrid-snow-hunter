export interface Resort {
  id: string;
  name: string;
  lat: number;
  long: number;
  elevation?: number; // ピンポイントなゲレンデ高さを指定 (m)
  area: string;
  url?: string;
  tenki_id?: string; // 例: "3/23/15180" → https://tenki.jp/season/ski/3/23/15180/
}

// ===== tenki_id確認方法 =====
// https://tenki.jp/season/ski/category/{region}/{prefecture}/ のリンクから取得
// URL形式: https://tenki.jp/season/ski/{region}/{prefecture}/{id}/index.html
// 全IDはtenki.jpの実際のページURLから確認済み

export const RESORTS: Resort[] = [
  // ==========================================
  // --- 北海道 (Hokkaido) ---
  // 道北(1/1): 富良野・トマム・カムイリンクス・黒岳
  // 道央(1/2): ニセコ・ルスツ・キロロ・札幌
  // 道東(1/3): サホロ
  // ==========================================
  { id: 'niseko-hiraf', name: 'ニセコグランヒラフ', lat: 42.8600, long: 140.7100, area: '北海道', url: 'https://www.grand-hirafu.jp/', tenki_id: '1/2/11708' },
  { id: 'niseko-annupuri', name: 'ニセコアンヌプリ国際', lat: 42.8631, long: 140.7032, area: '北海道', url: 'https://www.niseko.ne.jp/', tenki_id: '1/2/11716' },
  { id: 'rusutsu', name: 'ルスツリゾート', lat: 42.7533, long: 140.9069, area: '北海道', url: 'https://rusutsu.com/', tenki_id: '1/2/11727' },
  { id: 'furano', name: '富良野スキー場', lat: 43.3242, long: 142.3364, area: '北海道', url: 'https://www.princehotels.co.jp/ski/furano/', tenki_id: '1/1/11701' },
  { id: 'kiroro', name: 'キロロスノーワールド', lat: 43.0694, long: 140.9850, area: '北海道', url: 'https://www.kiroro.co.jp/', tenki_id: '1/2/11710' },
  { id: 'tomamu', name: '星野リゾート トマム', lat: 43.0628, long: 142.6319, area: '北海道', url: 'https://www.snowtomamu.jp/winter/', tenki_id: '1/1/11724' },
  { id: 'sapporo-kokusai', name: '札幌国際スキー場', lat: 42.9614, long: 141.0858, area: '北海道', url: 'https://www.sapporo-kokusai.jp/', tenki_id: '1/2/11705' },
  { id: 'sapporo-teine', name: 'サッポロテイネ', lat: 43.0950, long: 141.2056, area: '北海道', url: 'https://sapporo-teine.com/snow/' },
  { id: 'kamui-links', name: 'カムイスキーリンクス', lat: 43.7144, long: 142.2289, area: '北海道', url: 'https://www.kamui-skilinks.com/', tenki_id: '1/1/11406' },
  { id: 'sahoro', name: 'サホロリゾート', lat: 43.1667, long: 142.8000, area: '北海道', url: 'https://sahoro.co.jp/', tenki_id: '1/3/11105' },
  { id: 'moiwa', name: 'ニセコモイワ', lat: 42.8500, long: 140.6333, area: '北海道', url: 'https://niseko-moiwa.jp/' },
  { id: 'bankei', name: 'さっぽろばんけい', lat: 43.0333, long: 141.2833, area: '北海道', url: 'https://www.bankei.co.jp/' },
  { id: 'asahidake', name: '旭岳ロープウェー', lat: 43.6631, long: 142.8394, area: '北海道', url: 'https://asahidake.hokkaido.jp/' },
  { id: 'kuromadake', name: '黒岳スキー場', lat: 43.7083, long: 142.9333, area: '北海道', url: 'https://www.rinyu.co.jp/kurodake/', tenki_id: '1/1/11402' },

  // ==========================================
  // --- 東北 (Tohoku) ---
  // ==========================================
  { id: 'appi', name: '安比高原スキー場', lat: 40.0006, long: 140.9839, area: '岩手県', url: 'https://www.appi.co.jp/', tenki_id: '2/6/12115' },
  { id: 'ntj-geto', name: '夏油高原スキー場', lat: 39.1839, long: 140.9039, area: '岩手県', url: 'https://www.getokogen.com/' },
  { id: 'hachimantai', name: '八幡平リゾート', lat: 39.8550, long: 140.9567, area: '岩手県', url: 'https://www.hachimantai.co.jp/' },
  { id: 'iwategen', name: '岩手高原スノーパーク', lat: 39.7556, long: 140.9833, area: '岩手県', url: 'https://iwatekogen.jp/', tenki_id: '2/6/12102' },
  { id: 'zao', name: '山形蔵王温泉スキー場', lat: 38.1611, long: 140.3992, area: '山形県', url: 'http://www.zao-ski.or.jp/', tenki_id: '2/9/10136' },
  { id: 'gassan', name: '月山スキー場', lat: 38.5478, long: 140.0306, area: '山形県', url: 'https://gassankanko.jp/', tenki_id: '2/9/10280' },
  { id: 'jangle', name: '黒伏高原スノーパーク', lat: 38.4333, long: 140.5333, area: '山形県', url: 'https://jangle.co.jp/', tenki_id: '2/9/12555' },
  { id: 'eboshi', name: 'みやぎ蔵王えぼしリゾート', lat: 38.1061, long: 140.5428, area: '宮城県', url: 'https://www.eboshi.co.jp/', tenki_id: '2/7/12522' },
  { id: 'alts-bandai', name: '星野リゾート ネコマ マウンテン', lat: 37.5925, long: 140.0383, area: '福島県', url: 'https://www.nekoma.co.jp/' },
  { id: 'grandeco', name: 'グランデコスノーリゾート', lat: 37.6625, long: 140.1017, area: '福島県', url: 'https://www.grandeco.com/' },
  { id: 'inawashiro', name: '猪苗代スキー場', lat: 37.5683, long: 140.0767, area: '福島県', url: 'https://www.inawashiro-ski.com/', tenki_id: '2/10/12507' },
  { id: 'hakkoda', name: '八甲田スキー場', lat: 40.6653, long: 140.8522, area: '青森県', url: 'http://www.hakkoda-ropeway.jp/' },
  { id: 'aomori-spring', name: '青森スプリング', lat: 40.7333, long: 140.3167, area: '青森県', url: 'https://aomorispringski.com/', tenki_id: '2/5/12326' },
  { id: 'tazawako', name: 'たざわ湖スキー場', lat: 39.7611, long: 140.7639, area: '秋田県', url: 'https://www.tazawako-ski.com/', tenki_id: '2/8/12317' },

  // ==========================================
  // --- 新潟 (Niigata) --- region=4, pref=18
  // ==========================================
  { id: 'gala-yuzawa', name: 'GALA湯沢', lat: 36.9367, long: 138.7900, area: '新潟県', url: 'https://gala.co.jp/winter/', tenki_id: '4/18/13155' },
  { id: 'kagura', name: 'かぐらスキー場', lat: 36.8778, long: 138.7481, area: '新潟県', url: 'https://www.princehotels.co.jp/ski/kagura/', tenki_id: '4/18/13117' },
  { id: 'naeba', name: '苗場スキー場', lat: 36.7936, long: 138.7831, area: '新潟県', url: 'https://www.princehotels.co.jp/ski/naeba/', tenki_id: '4/18/13114' },
  { id: 'maiko', name: '舞子スノーリゾート', lat: 36.9936, long: 138.8256, area: '新潟県', url: 'https://www.maiko-resort.com/', tenki_id: '4/18/13124' },
  { id: 'kandatsu', name: '神立スノーリゾート', lat: 36.9167, long: 138.8306, area: '新潟県', url: 'https://www.kandatsu.com/', tenki_id: '4/18/13151' },
  { id: 'yuzawa-kogen', name: '湯沢高原スキー場', lat: 36.9467, long: 138.8033, area: '新潟県', url: 'https://www.yuzawakogen.com/', tenki_id: '4/18/13119' },
  { id: 'yuzawa-nakazato', name: '湯沢中里スノーリゾート', lat: 36.9236, long: 138.8556, area: '新潟県', url: 'https://www.yuzawa-nakazato.com/', tenki_id: '4/18/13112' },
  { id: 'naspa', name: 'NASPAスキーガーデン', lat: 36.9389, long: 138.8111, area: '新潟県', url: 'https://naspa.co.jp/ski/', tenki_id: '4/18/13161' },
  { id: 'iwappara', name: '岩原スキー場', lat: 36.9250, long: 138.8417, area: '新潟県', url: 'https://iwa-ppara.com/', tenki_id: '4/18/13113' },
  { id: 'ishiuchi', name: '石打丸山スキー場', lat: 36.9536, long: 138.8164, area: '新潟県', url: 'https://ishiuchi.or.jp/', tenki_id: '4/18/13122' },
  { id: 'joetsu-kokusai', name: '上越国際スキー場', lat: 37.0278, long: 138.8167, area: '新潟県', url: 'https://jkokusai.co.jp/', tenki_id: '4/18/13125' },
  { id: 'muika', name: 'ムイカスノーリゾート', lat: 37.1667, long: 138.9833, area: '新潟県', url: 'https://www.muikamachi.com/ski/', tenki_id: '4/18/13127' },
  { id: 'roppunohara', name: '六日町八海山スキー場', lat: 37.1000, long: 139.0167, area: '新潟県', url: 'https://www.princehotels.co.jp/ski/hakkaisan/', tenki_id: '4/18/13128' },
  { id: 'myoko-suginohara', name: '妙高杉ノ原スキー場', lat: 36.8525, long: 138.1569, area: '新潟県', url: 'https://www.princehotels.co.jp/ski/myoko/', tenki_id: '4/18/13142' },
  { id: 'akakura-kanko', name: '赤倉観光リゾート', lat: 36.8833, long: 138.1917, area: '新潟県', url: 'https://akr-ski.com/', tenki_id: '4/18/10297' },
  { id: 'akakura-onsen', name: '赤倉温泉スキー場', lat: 36.8900, long: 138.2000, area: '新潟県', url: 'https://akakura-ski.com/', tenki_id: '4/18/13140' },
  { id: 'seki-onsen', name: '関温泉スキー場', lat: 36.8833, long: 138.1667, area: '新潟県', url: 'http://www.sekionsen.com/', tenki_id: '4/18/13145' },
  { id: 'charmant', name: 'シャルマン火打', lat: 36.9833, long: 138.0333, area: '新潟県', url: 'https://charmant-hiuchi.jp/', tenki_id: '4/18/10111' },
  { id: 'cupid-valley', name: 'キューピットバレイ', lat: 37.2333, long: 138.4000, area: '新潟県', url: 'https://www.yukidaruma-kogen.com/', tenki_id: '4/18/13147' },
  { id: 'okutadami', name: '奥只見丸山スキー場', lat: 37.1500, long: 139.1833, area: '新潟県', url: 'https://okutadami.co.jp/ski/', tenki_id: '4/18/13133' },

  // ==========================================
  // --- 長野 (Nagano) --- region=3, pref=23
  // ==========================================
  { id: 'hakuba-happo', name: '白馬八方尾根スキー場', lat: 36.6962, long: 137.8407, area: '長野県', url: 'https://www.happo-one.jp/', tenki_id: '3/23/15133' },
  { id: 'hakuba-goryu', name: 'エイブル白馬五竜', lat: 36.6667, long: 137.8389, area: '長野県', url: 'https://www.hakubagoryu.com/', tenki_id: '3/23/15135' },
  { id: 'tsugaike', name: 'つがいけマウンテンリゾート', lat: 36.7578, long: 137.8683, area: '長野県', url: 'https://www.tsugaike.gr.jp/', tenki_id: '3/23/15131' },
  { id: 'hakuba-cortina', name: '白馬コルチナ', lat: 36.7869, long: 137.8686, area: '長野県', url: 'https://haku-nori.com/', tenki_id: '3/23/15172' },
  { id: 'hakuba-47', name: 'Hakuba47', lat: 36.6789, long: 137.8311, area: '長野県', url: 'https://www.hakuba47.co.jp/', tenki_id: '3/23/15174' },
  { id: 'hakuba-iwatake', name: '白馬岩岳スノーフィールド', lat: 36.7139, long: 137.8611, area: '長野県', url: 'https://iwatake-mountain-resort.com/', tenki_id: '3/23/15132' },
  { id: 'hakuba-norikura', name: '白馬乗鞍温泉スキー場', lat: 36.7400, long: 137.8800, area: '長野県', url: 'https://www.hakuba-norikura.com/', tenki_id: '3/23/15130' },
  { id: 'hakuba-kashimayari', name: '鹿島槍スキー場', lat: 36.6500, long: 137.8100, area: '長野県', url: 'https://kashimayari.net/', tenki_id: '3/23/15137' },
  { id: 'nozawa', name: '野沢温泉 (やまびこゲレンデ)', lat: 36.906, long: 138.463, elevation: 1600, area: '長野県', url: 'https://nozawaski.com/', tenki_id: '3/23/15116' },
  { id: 'togari', name: '戸狩温泉スキー場', lat: 36.9333, long: 138.3833, area: '長野県', url: 'https://togari.jp/', tenki_id: '3/23/15110' },
  { id: 'madarao', name: '斑尾高原スキー場', lat: 36.8483, long: 138.3117, area: '長野県', url: 'https://www.madarao.jp/', tenki_id: '3/23/15113' },
  { id: 'tangram', name: 'タングラムスキーサーカス', lat: 36.8583, long: 138.2833, area: '長野県', url: 'https://www.tangram.jp/ski/', tenki_id: '3/23/15176' },
  { id: 'shirakaba-2in1', name: 'しらかば2in1スキー場', lat: 36.0700, long: 138.2600, area: '長野県', url: 'https://www.shirakaba-2in1.com/', tenki_id: '3/23/15149' },
  { id: 'karuizawa', name: '軽井沢プリンスホテル', lat: 36.3311, long: 138.6381, area: '長野県', url: 'https://www.princehotels.co.jp/ski/karuizawa/' },
  { id: 'sugadaira', name: '菅平高原スノーリゾート', lat: 36.5414, long: 138.3589, area: '長野県', url: 'https://sugadaira-snowresort.com/', tenki_id: '3/23/15105' },
  { id: 'shiga-kogen', name: '志賀高原 横手山・渋峠', lat: 36.7214, long: 138.5076, area: '長野県', url: 'https://www.shigakogen-ski.com/', tenki_id: '3/23/15126' },
  { id: 'okushiga', name: '奥志賀高原スキー場', lat: 36.8000, long: 138.6000, area: '長野県', url: 'https://www.okushigakogen.co.jp/', tenki_id: '3/23/15122' },
  { id: 'togakushi', name: '戸隠スキー場', lat: 36.7583, long: 138.0750, area: '長野県', url: 'https://www.togakushi-ski.com/', tenki_id: '3/23/15102' },
  { id: 'ontake', name: '御嶽スキー場', lat: 35.9667, long: 137.5500, area: '長野県', url: 'https://ontake2240.jp/', tenki_id: '3/23/15655' },
  { id: 'fujimi', name: '富士見パノラマリゾート', lat: 35.9000, long: 138.1833, area: '長野県', url: 'https://www.fujimipanorama.com/snow/', tenki_id: '3/23/15180' },
  { id: 'kurumayama', name: '車山高原SKYPARK', lat: 36.1000, long: 138.2000, area: '長野県', url: 'https://www.kurumayama.co.jp/winter/', tenki_id: '3/23/15147' },
  { id: 'pilatus', name: 'ピラタス蓼科スノーリゾート', lat: 36.0500, long: 138.2833, area: '長野県', url: 'https://www.pilatus.jp/', tenki_id: '3/23/15151' },
  { id: 'sugadaira-yumeno', name: 'シャトレーゼ スキーバレー小海', lat: 36.0667, long: 138.4667, area: '長野県', url: 'http://www.reex.co.jp/KOUMI/SKI/', tenki_id: '3/23/15170' },
  { id: 'yuno-maru', name: '湯の丸スキー場', lat: 36.4500, long: 138.4000, area: '長野県', url: 'https://yunomaru-ski.jp/', tenki_id: '3/23/15171' },
  { id: 'kurehime', name: '黒姫高原スノーパーク', lat: 36.8333, long: 138.1500, area: '長野県', url: 'https://www.kurohime-kogen.co.jp/', tenki_id: '3/23/15101' },
  { id: 'branshutakayama', name: 'ブランシュたかやまスキーリゾート', lat: 36.3000, long: 138.0000, area: '長野県', url: 'https://www.branshutakayama.com/', tenki_id: '3/23/15165' },

  // ==========================================
  // --- 群馬 (Gunma) --- region=3, pref=13
  // ==========================================
  { id: 'marunuma', name: '丸沼高原スキー場', lat: 36.8164, long: 139.3400, area: '群馬県', url: 'https://www.marunuma.jp/winter/' },
  { id: 'kawaba', name: '川場スキー場', lat: 36.7583, long: 139.0833, area: '群馬県', url: 'https://www.kawaba.co.jp/', tenki_id: '3/13/14135' },
  { id: 'kusatsu', name: '草津温泉スキー場', lat: 36.6358, long: 138.5681, area: '群馬県', url: 'https://www.932-onsen.com/winter/', tenki_id: '3/13/14102' },
  { id: 'palcall', name: 'パルコールつま恋', lat: 36.5667, long: 138.4667, area: '群馬県', url: 'https://palcall.co.jp/', tenki_id: '3/13/14137' },
  { id: 'tambara', name: 'たんばらスキーパーク', lat: 36.7333, long: 139.0500, area: '群馬県', url: 'https://www.tambara.co.jp/' },
  { id: 'minakami-kogen', name: '水上高原スキーリゾート', lat: 36.8167, long: 139.0667, area: '群馬県', url: 'https://www.minakamikogen200.jp/', tenki_id: '3/13/14133' },

  // ==========================================
  // --- 栃木 (Tochigi) --- region=3, pref=12
  // ==========================================
  { id: 'hunter', name: 'ハンターマウンテン塩原', lat: 36.9333, long: 139.7833, area: '栃木県', url: 'https://www.hunter.co.jp/winter/', tenki_id: '3/12/14407' },
  { id: 'mount-jeans', name: 'マウントジーンズ那須', lat: 37.1000, long: 140.0000, area: '栃木県', url: 'https://www.mtjeans.com/winter/' },

  // ==========================================
  // --- 岐阜・福井 (Gifu / Fukui) --- region=5, pref=24/21
  // ==========================================
  { id: 'takasu', name: '高鷲スノーパーク', lat: 35.9861, long: 136.8444, area: '岐阜県', url: 'https://www.takasu.gr.jp/', tenki_id: '5/24/15661' },
  { id: 'dynaland', name: 'ダイナランド', lat: 35.9750, long: 136.8417, area: '岐阜県', url: 'https://www.dynaland.co.jp/', tenki_id: '5/24/15624' },
  { id: 'meiho', name: 'めいほうスキー場', lat: 35.8833, long: 137.0333, area: '岐阜県', url: 'https://www.meihoski.co.jp/', tenki_id: '5/24/15620' },
  { id: 'winghills', name: 'ウイングヒルズ白鳥', lat: 35.9833, long: 136.8000, area: '岐阜県', url: 'https://winghills.net/', tenki_id: '5/24/15647' },
  { id: 'white-pia', name: 'ホワイトピアたかす', lat: 35.9667, long: 136.8500, area: '岐阜県', url: 'http://www.whitepia.jp/', tenki_id: '5/24/15652' },
  { id: 'hirugano', name: 'ひるがの高原スキー場', lat: 35.9333, long: 136.8833, area: '岐阜県', url: 'https://www.hiruganokogen.com/' },
  { id: 'skijam', name: 'スキージャム勝山', lat: 36.0833, long: 136.5167, area: '福井県', url: 'https://www.skijam.jp/', tenki_id: '4/21/15810' },

  // ==========================================
  // --- 富士山周辺・静岡・山梨 (Mt.Fuji / Shizuoka / Yamanashi)
  // ==========================================
  { id: 'yeti', name: 'スノーパーク イエティ', lat: 35.2974, long: 138.8094, area: '静岡県', url: 'https://www.yeti-resort.com/', tenki_id: '5/25/15301' },
  { id: 'fujiten', name: 'ふじてんスノーリゾート', lat: 35.4211, long: 138.7183, area: '山梨県', url: 'https://www.fujiten.net/', tenki_id: '3/22/14412' },
  { id: 'kamui-misaka', name: 'カムイみさかスキー場', lat: 35.5900, long: 138.6833, area: '山梨県', url: 'http://misaka.kamuisp.com/', tenki_id: '3/22/14414' },
  { id: 'sunmeadows', name: 'サンメドウズ清里', lat: 35.9333, long: 138.4333, area: '山梨県', url: 'https://www.sunmeadows.co.jp/', tenki_id: '3/22/15186' },

  // ==========================================
  // --- 西日本 (West Japan) ---
  // ==========================================
  { id: 'biwako-valley', name: 'びわ湖バレイ', lat: 35.2100, long: 135.8900, area: '滋賀県', url: 'https://www.biwako-valley.com/', tenki_id: '6/28/16105' },
  { id: 'gransnow', name: 'グランスノー奥伊吹', lat: 35.4333, long: 136.3667, area: '滋賀県', url: 'https://www.okuibuki.co.jp/', tenki_id: '6/28/15635' },
  { id: 'hachikita', name: 'ハチ北高原スキー場', lat: 35.3917, long: 134.5250, area: '兵庫県', url: 'https://www.hachi-hachikita.co.jp/', tenki_id: '6/31/16506' },
  { id: 'skyvalley', name: 'スカイバレー', lat: 35.4167, long: 134.5500, area: '兵庫県', url: 'https://www.skyvalley.jp/', tenki_id: '6/31/16508' },
  { id: 'megahira', name: 'めがひらスキー場', lat: 34.4500, long: 132.1833, area: '広島県', url: 'http://www.megahira.co.jp/pc/ski.html', tenki_id: '7/37/18033' },
  { id: 'geihoku', name: '芸北高原大佐スキー場', lat: 34.7333, long: 132.2167, area: '広島県', url: 'https://geihokukokusai.jp/', tenki_id: '7/37/18006' },
];
