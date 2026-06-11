/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, LanguageWord, MarketItem } from './types';

export const PIPI_IMAGE = '/src/assets/images/mascot_pipi_1781181581232.png';
export const TART_IMAGE = '/src/assets/images/mascot_tart_1781181591378.png';
export const MACAU_MAP_IMAGE = '/src/assets/images/macau_landscape_1781181565825.png';

export const CHAPTERS: Chapter[] = [
  {
    id: 'history',
    title: 'Time Ship Voyage',
    titleCn: '時光飛船歷史篇',
    badgeName: '小小歷史領航員',
    badgeEmoji: '⚓',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    iconName: 'Compass',
  },
  {
    id: 'culture',
    title: 'Festival Fancy Dress',
    titleCn: '繽紛節日文化篇',
    badgeName: '節日變裝達人',
    badgeEmoji: '🎭',
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-300',
    iconName: 'Sparkles',
  },
  {
    id: 'language',
    title: 'Magic Language Station',
    titleCn: '神奇語言發音站',
    badgeName: '中葡小小外交官',
    badgeEmoji: '🗣️',
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-300',
    iconName: 'Languages',
  },
  {
    id: 'currency',
    title: 'Little Merchant Supermarket',
    titleCn: '百寶貨幣超市篇',
    badgeName: '理財小管家',
    badgeEmoji: '🪙',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    iconName: 'Coins',
  },
  {
    id: 'food',
    title: 'Mascot Cook Kitchen',
    titleCn: '香噴噴美食廚房',
    badgeName: '米芝蓮星級小廚神',
    badgeEmoji: '🍳',
    color: 'from-orange-400 to-yellow-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    iconName: 'Utensils',
  },
  {
    id: 'attractions',
    title: 'Magic Puzzle Explorer',
    titleCn: '七彩景點拼拼樂',
    badgeName: '超級澳門活地圖',
    badgeEmoji: '🗺️',
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    iconName: 'MapPin',
  },
];

export const HISTORY_STORY_STEPS = [
  {
    year: '很久很久以前',
    title: '一個安靜的小漁村 🐟',
    story: '在好久以前，澳門只是一個小小的、安靜的漁村。這裡住著好多天天出海打魚的漁民伯伯。他們非常尊崇「媽祖娘娘」（阿媽），所以把這裡叫做「媽閣」。後來，外國的大帆船來到這裡，問這是什麼地方呀？漁民伯伯回答「媽閣」，外國人聽成了「Macau」（馬交），這就是澳門英文名字「Macau」的由來喔！',
    interactivePrompt: '拖動時光小船，看看下一個世紀發生了什麼妙事！',
    visualElement: '⛵',
  },
  {
    year: '16 世紀中期',
    title: '葡萄牙大帆船來了 ⛵',
    story: '有一天，大海上漂來了高高的城堡一樣的大帆船！那是一些從遙遠的歐洲——葡萄牙坐船過來的新朋友。他們覺得澳門真是一個避風的好地方，於是就在這裡住下來啦！他們在這裡蓋了大洋房、高高的教堂，還跟當地的中國居民高高興興地做生意，把亮晶晶的絲綢、茶葉和美麗的瓷器運到全世界！',
    interactivePrompt: '揮揮手，歡迎遠道而來的新朋友吧！',
    visualElement: '🚢',
  },
  {
    year: '隨著時間長大',
    title: '中西文化的大熔爐 🏰',
    story: '漸漸地，中國的小朋友 and 葡萄牙的小朋友聚在同一個街區玩耍。這裡的樓房變得好特別：有中式的紅色大宅門，也有葡式的粉黃色、粉綠色洋房。中葡文化就像牛奶遇到紅茶一樣，咕嚕咕嚕融合成了一種世界上獨一無二的「土生葡人文化」！大家一起慶祝中國端午節，也一起吃美味的葡國雞、過繽紛的聖誕節！',
    interactivePrompt: '你吃過中西融合的食物嗎？牛奶紅茶就是很好的例子哦！',
    visualElement: '🤝',
  },
  {
    year: '1999 年 12 月 20 日',
    title: '回家啦！澳門特別行政區 🇨🇳',
    story: '這是一個超級重要、普天同慶的大日子！就在這一天，澳門回歸祖國的懷抱，成立了「澳門特別行政區」。每年的 12 月 20 日，小朋友們都有特別放假，全城都會燃放五彩繽紛的煙花。你看，行政區的區旗是一朵美麗盛開的綠色「蓮花」！這朵蓮花代表澳門像花朵一樣純潔善良、高雅美麗！',
    interactivePrompt: '哇！澳門的小朋友，我們一起祝澳門生日快樂！',
    visualElement: '🌺',
  },
];

export const CULTURE_FESTIVALS = [
  {
    id: 'dragon_boat',
    name: '端午節龍舟賽 🛶',
    description: '端午節到啦！一隻隻雕刻著神勇龍頭的木船在海面上飛奔！「咚咚咚！」鼓手敲打著大鼓，划槳手們踩著鼓點，手腳整齊劃一地奮力向前划！岸邊圍滿了加油的小朋友，嘴裡嚼著香噴噴、黏糯糯的霸氣大豬肉粽子，可好玩啦！',
    costumeOptions: [
      { id: 'paddle', name: '木質龍舟槳', emoji: '🛶', isCorrect: true, hint: '划龍舟最需要這個大槳呀！' },
      { id: 'zongzi', name: '香甜鮮肉粽', emoji: '🍙', isCorrect: true, hint: '划完船肚子餓啦，吃個香噴噴的粽子吧！' },
      { id: 'drumstick', name: '催龍鼓槌', emoji: '🥁', isCorrect: true, hint: '咚咚咚，為在水上飛奔的龍舟隊加油打鼓！' },
      { id: 'winter_coat', name: '羽絨厚大衣', emoji: '🧥', isCorrect: false, hint: '端午節是夏天的節日，穿大衣會中暑喔！' },
    ],
  },
  {
    id: 'drunken_dragon',
    name: '舞醉龍節 🐉',
    description: '這是澳門獨一無二的神奇節日！在佛誕節那一天，菜市場的叔叔們會親自舉起木雕的「神龍」！他們不喝水，而是喝了香噴噴的酒。叔叔一邊踩著醉拳般的搖晃步伐，一邊往空中噴灑酒霧，嘴裡呼呼發聲，像一條真正騰雲駕霧、醉醺醺的巨龍，保護大家健健康康、平平安安！還會免費派發「龍船頭飯」喔！',
    costumeOptions: [
      { id: 'wooden_dragon', name: '精緻木雕龍頭', emoji: '🐲', isCorrect: true, hint: '舞醉龍最重要的就是雙手緊握的木雕龍頭！' },
      { id: 'wine_pot', name: '大红酒葫蘆', emoji: '🍶', isCorrect: true, hint: '叔叔們要喝下神龍特製的酒（小朋友不可以喝酒喔）！' },
      { id: 'dragon_meal', name: '保平安龍船頭飯', emoji: '🍚', isCorrect: true, hint: '吃了這碗鋪滿香腸的香噴噴白飯，小朋友會快高長大、聰明伶俐！' },
      { id: 'ski_board', name: '滑雪雙板', emoji: '🎿', isCorrect: false, hint: '在平地街區跳舞，不需要滑雪板呢！' },
    ],
  },
  {
    id: 'portuguese_dance',
    name: '葡萄牙土風舞 💃',
    description: '「沙拉拉，沙拉拉！」輕快的風琴聲響起啦！姐姐們穿著大紅、純白 and 深黑相間的多褶蓬蓬群，小腿裹著蕾絲網襪，頭戴彩色鮮花！哥哥們戴著帥氣的黑禮帽、繫著紅腰帶。大家手拉手、圍成一個個快樂的圓圈，一邊旋轉一邊踢踏著地板，熱情如火。這是在澳門常看見的、來自葡萄牙的快樂土風舞喔！',
    costumeOptions: [
      { id: 'floral_headband', name: '鮮花刺繡圍巾', emoji: '💐', isCorrect: true, hint: '跳舞的姐姐頭上都要配戴精美奪目的鮮花頭巾！' },
      { id: 'accordion', name: '手風琴琴盒', emoji: '🪗', isCorrect: true, hint: '拉起手風琴，快樂的土風舞音符全跑出來啦！' },
      { id: 'red_sash', name: '熱情紅腰帶', emoji: '🎗️', isCorrect: true, hint: '哥哥姐姐們腰間一抹亮眼的紅綢帶，跳舞特別飄逸！' },
      { id: 'swimming_goggles', name: '專業潛水鏡', emoji: '🥽', isCorrect: false, hint: '跳土風舞是在廣場上，戴潛水鏡會看不清路喔！' },
    ],
  },
];

export const LANGUAGE_WORDS: LanguageWord[] = [
  {
    phrase: '你好',
    pinyin: 'nei5 hou2',
    portuguese: 'Olá',
    portuguesePronounce: '奧拉',
    funFact: '在澳門，當新朋友見面時，大聲說「Olá」或者廣東話「你好」，大家都會露出甜甜的笑容迎接你喔！',
    category: 'greeting',
  },
  {
    phrase: '再見',
    pinyin: 'zoi3 gin3',
    portuguese: 'Adeus',
    portuguesePronounce: '阿迪烏斯',
    funFact: '放學回家時，一邊揮揮小手一邊說「Adeus」或者「再見」，明天我們再一起快樂探險吧！',
    category: 'greeting',
  },
  {
    phrase: '謝謝',
    pinyin: 'do6 ze6',
    portuguese: 'Obrigado',
    portuguesePronounce: '奧比加度 (男生說) / Obrigada 奧比加達 (女生說)',
    funFact: '當好友請你吃甜食時，要禮貌說：男生說「Obrigado 奧比加度」，女生說「Obrigada 奧比加達」唷！',
    category: 'greeting',
  },
  {
    phrase: '學校',
    pinyin: 'hok6 haau3',
    portuguese: 'Escola',
    portuguesePronounce: '伊斯高拉',
    funFact: '「Escola」就是小朋友天天和同伴學習、捉迷藏的魔法殿堂——學校！在學校，我們能學到好多神奇秘密！',
    category: 'life',
  },
  {
    phrase: '老師',
    pinyin: 'lou5 si1',
    portuguese: 'Professor',
    portuguesePronounce: '普羅菲索',
    funFact: '教我們唱歌、算術和畫畫的老師，在葡萄牙文裡叫做「Professor」！快給親愛的老師獻上一個讚吧。',
    category: 'life',
  },
  {
    phrase: '朋友',
    pinyin: 'pang4 jau5',
    portuguese: 'Amigo',
    portuguesePronounce: '阿米高',
    funFact: '手拉手，好朋友！在葡語裡，好夥伴就是溫暖心房的「Amigo」。一起玩遊戲時，快樂會翻倍喔！',
    category: 'life',
  },
  {
    phrase: '葡撻',
    pinyin: 'pou4 taat1',
    portuguese: 'Pastel de Nata',
    portuguesePronounce: '帕斯度 迪 納塔',
    funFact: '金黃微焦、甜甜脆脆的澳門代表美食——葡式蛋撻，在葡文裡叫「Pastel de Nata」，意思是奶油杯子蛋糕！',
    category: 'food',
  },
  {
    phrase: '麵包',
    pinyin: 'min6 baau1',
    portuguese: 'Pão',
    portuguesePronounce: '飽',
    funFact: '中文說的「麵包」，在葡語發音裡簡直一模一樣，就叫「Pão」（發音像「飽」，太有趣了，吃麵包能吃飽！）',
    category: 'food',
  },
  {
    phrase: '白開水',
    pinyin: 'seoi2',
    portuguese: 'Água',
    portuguesePronounce: '阿古瓦',
    funFact: '每天跑跑跳跳後必喝的純白開水，葡萄牙文叫做「Água」。多喝水，肚子安康，身體棒棒！',
    category: 'food',
  }
];

export const CURRENCY_COINS = [
  { value: 0.1, name: '10仙 (10 Avos)', type: 'coin', emoji: '🪙', color: 'bg-amber-100 border-amber-400', desc: '小小的銅黃色硬幣，叫做「10仙」，像亮閃閃的小眼睛！' },
  { value: 0.5, name: '50仙 (50 Avos)', type: 'coin', emoji: '🪙', color: 'bg-amber-200 border-amber-500', desc: '中等大小的銅黃硬幣，5個10仙就等於它囉。' },
  { value: 1.0, name: '1元 (1 Pataca)', type: 'coin', emoji: '🥈', color: 'bg-slate-100 border-slate-300', desc: '亮晶晶的銀色硬幣，上面刻著漂亮的「1」和一朵小蓮花！' },
  { value: 5.0, name: '5元 (5 Patacas)', type: 'coin', emoji: '🏅', color: 'bg-yellow-100 border-yellow-400 font-bold', desc: '很特別！是一個形狀有十二條邊的多邊形硬幣，邊角圓圓的，酷炫極了！' },
  { value: 10.0, name: '10元紙幣 (10 Patacas)', type: 'note', emoji: '💵', color: 'bg-red-100 border-red-300 text-red-600', desc: '紅通通的漂亮紙幣，上面印著澳門著名的「媽閣廟」大門喔！' },
  { value: 20.0, name: '20元紙幣 (20 Patacas)', type: 'note', emoji: '💵', color: 'bg-blue-100 border-blue-300 text-blue-600', desc: '天藍色的溫暖紙幣，上面畫著高聳入雲、指引方向的「東望洋燈塔」！' },
];

export const SUPERMARKET_ITEMS: MarketItem[] = [
  { id: 'tart_item', name: '葡撻寶寶 (1個)', price: 10.0, emoji: '🧁' },
  { id: 'bifana_item', name: '美味豬扒包 (1個)', price: 20.0, emoji: '🍔' },
  { id: 'soda_item', name: '澳門特色沙士汽水', price: 6.0, emoji: '🥤' },
  { id: 'cookies_item', name: '杏仁餅手信 (1盒)', price: 15.0, emoji: '🍪' },
  { id: 'pudding_item', name: '雪木糠布丁', price: 8.0, emoji: '🍧' },
];

export const FOOD_INGREDIENTS = [
  { id: 'egg', name: '黃澄澄的雞蛋', emoji: '🥚', required: true, desc: '提供超級香滑的蛋漿！' },
  { id: 'milk', name: '香甜的牛奶', emoji: '🥛', required: true, desc: '讓蛋漿變得像雲朵一樣軟綿綿、奶香撲鼻。' },
  { id: 'sugar', name: '白花花的甜砂糖', emoji: '🍬', required: true, desc: '甜滋滋，吃了有滿溢的幸福感！' },
  { id: 'tart_crust', name: '千層酥皮杯', emoji: '🥧', required: true, desc: '蛋撻的靈魂盔甲！烤過之後會有幾百層酥脆喔！' },
  { id: 'chili', name: '紅彤彤的超級辣醬', emoji: '🌶️', required: false, desc: '千萬別放！放了蛋撻會變成火焰魔王，辣到噴火喔！' },
];

export interface FoodDetail {
  id: string;
  name: string;
  emoji: string;
  imageUrl: string;
  origin: string; // Origin story for kids (Chinese)
  materialsIntro: string; // Simple list of main materials
  chefTip: string; // Interactive hint
  ingredients: { id: string; name: string; emoji: string; required: boolean; desc: string }[];
  steps: { title: string; actionText: string; successText: string; visualText: string }[];
}

export const FOOD_KITCHEN_DATA: FoodDetail[] = [
  {
    id: 'tart',
    name: '里斯本葡式蛋撻 🧁',
    emoji: '🧁',
    imageUrl: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?q=80&w=800',
    origin: '起源故事：很久以前，在遙遠的歐洲葡萄牙文修道院裡，溫柔的修女們做出了這款小甜心。後來，一位叫安德魯的叔叔在澳門美麗的海邊「路環島」，把秘方調整得不那麼甜，烤出來外殼更香鬆，中央熱熱燙燙的，像嫩雞蛋布丁一樣！',
    materialsIntro: '主廚嚴選配料：新鮮雞蛋 🥚、濃郁牛奶 🥛、大顆白砂糖 🍬、千層酥皮杯 🥧',
    chefTip: '💡 廚神悄悄話：蛋液要順時針攪動，烤出來的撻心才會像小嬰兒的臉蛋一樣白嫩有彈性！千萬不加紅透的「辣椒醬」，不然會變成憤怒的噴火巨龍喔！',
    ingredients: [
      { id: 'egg', name: '黃金大雞蛋', emoji: '🥚', required: true, desc: '帶來布丁一般柔嫩金黃的撻心！' },
      { id: 'milk', name: '香甜鮮牛奶', emoji: '🥛', required: true, desc: '讓蛋漿充滿雪白的奶香味。' },
      { id: 'sugar', name: '亮晶大白沙糖', emoji: '🍬', required: true, desc: '提供幸福甜蜜的好滋味。' },
      { id: 'tart_crust', name: '千層酥皮碗', emoji: '🥧', required: true, desc: '用手摸硬硬的，烤後會變成幾百層脆香花瓣！' },
      { id: 'chili', name: '變色大辣椒醬', emoji: '🌶️', required: false, desc: '放了它，蛋撻會氣得滿面通紅，把肚子辣疼！' }
    ],
    steps: [
      {
        title: '第一步：溫柔愛心攪拌 🥣',
        actionText: '用小小勺子「沙沙沙」輕柔攪拌雞蛋、牛奶跟砂糖，把美麗的顏色融合成淡黃色！',
        successText: '攪拌好啦！奶油蛋液滑溜溜的，像融化的鵝黃色芝士！',
        visualText: '🥣🥛✨'
      },
      {
        title: '第二步：慢慢灌入酥皮杯 🥧',
        actionText: '小心翼翼地把蛋液倒進千層酥皮碗裡。千萬不要太貪心倒溢出來，要留出兩分小空隙喔！',
        successText: '金黃的溫馨湖水已被安穩盛在小碗裡！準備跳進大烤箱！',
        visualText: '🥧💛💦'
      },
      {
        title: '第三步：高溫魔法烤製 🔥',
        actionText: '關上小烤箱門！把魔術溫度定在 200°C，「呼呼呼」讓紅黃色的小魔火開始跳舞烤製！',
        successText: '「叮！」時間到！酥皮漲大頂立起來，頂端泛著迷人的焦黃豹斑，香氣飄滿全操場啦！',
        visualText: '📟🔥🧁'
      }
    ]
  },
  {
    id: 'pork_bun',
    name: '澳門黃金豬扒包 🍔',
    emoji: '🍔',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=800',
    origin: '起源故事：它是澳門美食界的「大力士」！將長得像小橄欖球、外皮脆硬焦黃的「豬仔包」切開抹上濃香黃油，中間夾入一整塊用獨家香蒜醃製、煎到滋滋冒煙的大豬大排！外脆內軟、咬一口肉汁就像噴泉一樣，是小朋友放學時最愛大口咬下的體力寶格！',
    materialsIntro: '主廚嚴選配料：外脆內軟豬仔包 🍞、五星醃製大豬排 🥩、金黃黃油 🧈、大蒜兄弟 🧄',
    chefTip: '💡 廚神悄悄話：煎大豬排以前，要用小肉槌「咚咚咚」敲打按摩，這樣咬起來才會像棉花糖一樣軟綿多汁！小心別抹「甜草莓醬」，草莓夾肉會酸得連小貓咪都搖頭！',
    ingredients: [
      { id: 'bread', name: '脆硬皮豬仔包', emoji: '🍞', required: true, desc: '外皮像小盔甲，裡面揉得像大抱枕！' },
      { id: 'pork', name: '大師醃大豬排', emoji: '🥩', required: true, desc: '浸潤了香蒜和洋蔥香汁的鮮美肉肉。' },
      { id: 'butter', name: '香濃香黃油', emoji: '🧈', required: true, desc: '塗在香麵包心上，遇熱會流出奶香味。' },
      { id: 'garlic', name: '多味香蒜頭', emoji: '🧄', required: true, desc: '給大豬排提供美味靈魂的香噴拍檔！' },
      { id: 'strawberry_jam', name: '甜密密草莓醬', emoji: '🍓', required: false, desc: '天哪！草莓和豬肉會大打出手，把胃氣大哭！' }
    ],
    steps: [
      {
        title: '第一步：咚咚搥肉大按摩 🥩',
        actionText: '揮動小廚師錘「咚咚咚、咚咚咚」把硬豬排拍得軟蓬蓬，撒上香蒜，給豬肉做個舒服的大按摩！',
        successText: '肉排變得極佳嫩滑，毛孔吸飽了香香大蒜能量！',
        visualText: '🥩🔨✨'
      },
      {
        title: '第二步：平底鍋滋滋香煎 🍳',
        actionText: '融化一塊香黃油，將大排肉放進鍋裡，「滋滋滋」用筷子翻面煎至兩面變得深棕金黃！',
        successText: '天哪！豬牌表皮冒出金黃油花，整間廚房都香得要飄起來啦！',
        visualText: '🍳🥩🔥'
      },
      {
        title: '第三步：咔嚓一口神力夾包 🍞',
        actionText: '把脆豬仔包攔腰切開，鋪上黃油，用力把熱滾滾的多汁厚大豬排夾進肚子中！',
        successText: '成功了！一個比臉盤子還厚實的大豬扒包大功告成！咬上一大口，咔嚓咔嚓！',
        visualText: '🍞🧈🥩🍔'
      }
    ]
  },
  {
    id: 'sawdust_pudding',
    name: '澳門雪木糠布甸 🍧',
    emoji: '🍧',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800',
    origin: '起源故事：雖然它叫作「木糠」，但它可不是真的木屑做的喔！「木糠」其實是敲得非常細、非常綿、鋪得像淡黃色金沙一樣的「瑪莉餅乾碎」！一層雪白香奶油，一層麥香餅乾糠，反覆重疊五層，冰在雪櫃裡拿出來，吃一口就像吃最頂級冰淇淋雪糕一樣甜入夢鄉！',
    materialsIntro: '主廚嚴選配料：經典甜瑪莉餅乾 🍪、綿香鮮奶油 🥛、甜甜鮮煉奶 🍯、植物香露 🧪',
    chefTip: '💡 廚神悄悄話：餅乾裝進密封膠袋，用搟麵棍「啪啪啪」敲碎越細緻，做出的木糠布丁越加滑溜！千萬不能加真的「綠花園泥土」充當餅乾屑，泥土是不能吃的喔！',
    ingredients: [
      { id: 'cookies', name: '金黃瑪莉餅乾', emoji: '🍪', required: true, desc: '敲碎成細沙、香甜無比的餅乾糠！' },
      { id: 'cream', name: '綿密鮮奶奶油', emoji: '🥛', required: true, desc: '用神奇打蛋器，就能打出像雪白雲朶一樣的蓬鬆度！' },
      { id: 'condensed_milk', name: '香甜液體煉奶', emoji: '🍯', required: true, desc: '超級濃甜，和鮮奶油最速配！' },
      { id: 'vanilla', name: '清新植物香露', emoji: '🧪', required: true, desc: '加一小滴，氣味像森林花園一樣浪漫芬芳！' },
      { id: 'mud', name: '草叢綠泥巴土', emoji: '🌱', required: false, desc: '呀！那個可有壞細菌，絕對不能吃呀！' }
    ],
    steps: [
      {
        title: '第一步：沙子餅乾啪啪碎 🍪',
        actionText: '把全麥瑪莉餅乾塞進大塑料袋，拿起木棰「啪啪啪、呼呼呼」砸得細如金黃沙子！',
        successText: '快看！餅乾塊大變身，全化成了像柔軟金色沙灘一樣的餅乾碎！',
        visualText: '🍪🔨✨'
      },
      {
        title: '第二步：打起雪白白雲奶油 🥛',
        actionText: '大打蛋器猛烈旋轉！將鮮奶油加上煉奶和香草露混合，打出好大一碗胖嘟嘟的大白雲球！',
        successText: '打發完成了！雪白的奶油又香又彈，像軟棉冰激凌！',
        visualText: '🥛🍯💫'
      },
      {
        title: '第三步：彩虹層層雲大堆疊 🍧',
        actionText: '準備一個透亮玻璃杯。用勺子先鋪一層金沙碎，再擠一層蓬蓬白奶油，重複足足五層！',
        successText: '大功告成！放進大冰箱冷藏 2 小時，拿勺子一挖，像雪花般冰涼幼滑、入口化成甜滋滋！',
        visualText: '🍧🍰❄️'
      }
    ]
  }
];

export interface AttractionDetail {
  id: string;
  name: string;
  pinyin: string;
  imageUrl: string;
  description: string;
  funFact: string;
  quizTitle: string;
  quizQuestion: string;
  quizOptions: { id: string; text: string; isCorrect: boolean; hint: string }[];
  voiceText: string;
}

export const ATTRACTIONS_DATA: AttractionDetail[] = [
  {
    id: 'ruins',
    name: '大三巴牌坊 🏛️',
    pinyin: 'daai6 saam1 baa1 paai4 fong1',
    imageUrl: 'https://images.unsplash.com/photo-1590054795393-27a3c3f2d01e?q=80&w=800',
    description: '澳門最神奇的「半面牆」！它原本是一座叫「聖保祿教堂」的宏偉大教堂，可是很久以前發生了一場大火，把整座教堂都燒掉了。最神奇的是，最厚實、最精緻的教堂前壁（這面牌坊）竟然奇蹟般地保存了下來！你看它像不像一尊站立在山坡上的老爷爷，天天守護著一茬茬長大的小朋友？',
    funFact: '仔細看！牆上刻著聖母瑪利亞、中國的石獅子、甚至還有一艘在驚濤駭浪中航行的小帆船呢！這代表世界各地的人都很友好。',
    quizTitle: '🎨 趣味小測驗（大三巴的小秘密）',
    quizQuestion: '為什麼現在大三巴牌坊只剩下一面孤零零的外牆呢？',
    quizOptions: [
      { id: 'fire', text: '🔥 因為一場大火把後面的木頭主體都燒光了', isCorrect: true, hint: '答對啦！當時的大教堂是用好多珍貴木材建造的，被一場大火燒失，只剩石刻牆壁！' },
      { id: 'earthquake', text: '🌪️ 它是為了躲避太強大的八號風球颱風', isCorrect: false, hint: '不是唷，雖然它不怕颱風，但讓大部分建築消失的其實是可怕的大火！' },
      { id: 'half', text: '📐 建築師原本就只打算蓋半面牆當作特色', isCorrect: false, hint: '傳統教堂當時可是長達數十米、立體宏偉，不是一開始就蓋半邊的喔！' }
    ],
    voiceText: '小朋友，大三巴牌坊是一面有四百年歷史的石牆，上面有美麗的雕刻，歡迎來到澳門！',
  },
  {
    id: 'temple',
    name: '媽閣廟 🛕',
    pinyin: 'maa1 gok3 miu2',
    imageUrl: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?q=80&w=800',
    description: '這是澳門最古老、比洋房還要更早誕生500年的神廟！裡面供奉著溫柔又神力的「媽祖娘娘」（阿媽）。很久很久以前，漁民伯伯天天都要在大海上和風浪搏鬥，一出海就很危險。他們就在這裡燒香祈福，感謝媽祖娘娘點亮一盞紅色神燈，保護他們的大木船安安全全返航回家！',
    funFact: '澳門的英文名字叫「Macau」，就是因為當葡萄牙船長第一次航行到這裡時，在神廟前問老漁民：「這是什麼地方呀？」漁民用廣東話回答「媽閣」，外國船長就聽成並記作了「Macau」！',
    quizTitle: '⛵ 媽媽的故事（海洋庇護所）',
    quizQuestion: '澳門的英文名字「Macau」這個詞是從哪裡變出來的呢？',
    quizOptions: [
      { id: 'a-ma', text: '🛕 因為問路時漁民回答了這裡叫「媽閣(廟)」', isCorrect: true, hint: '太厲害啦！外國好朋友聽到了「媽閣」，就在航海日記上寫下了「Macau」，成了澳門走向全世界的名字！' },
      { id: 'cat', text: '🐱 是一隻可愛的小貓咪「喵喵」叫的發音', isCorrect: false, hint: '哈哈，雖然小貓很可愛，但其實它起源於保佑漁夫的媽閣廟英文縮寫喔！' },
      { id: 'coin', text: '🪙 當年澳門最好吃的蛋撻就叫 Macau pataca', isCorrect: false, hint: '不是呢，當年外國朋友來的時候，還沒有葡式蛋撻可以吃喔！' }
    ],
    voiceText: '媽閣廟是澳門神勇的海神娘娘「媽祖」住的地方，葡萄牙海員聽了媽閣的聲音，就給澳門取了Macau的名字喔！'
  },
  {
    id: 'cunha',
    name: '官也街 (美食手信街) 🛍️',
    pinyin: 'gun1 jaa5 gaai1',
    imageUrl: 'https://images.unsplash.com/photo-1605389669527-be2492f3922f?q=80&w=800',
    description: '這是一條粉嫩彩虹色、熱鬧非凡、長滿了香氣的童話小巷子！也是澳門最著名的小吃天堂。兩旁的牆壁有粉黃色、粉藍色、粉綠色，像畫在繪本上的彩色糖果屋。在這裡，你可以聞到滾燙炒熟的杏仁香、烤鮮豬排的撲鼻肉香，還有拉糖叔叔神奇的乾果糖果香！',
    funFact: '在這裡走一圈，熱情的手信鋪老闆會給小朋友塞好多香噴噴的「杏仁餅」和「蛋卷」試吃，還能在彩繪大牆壁前擺個愛心姿勢拍照，真是肚子圓圓、相冊滿滿！',
    quizTitle: '🍪 地球最好吃的小巷（尋找香餅乾）',
    quizQuestion: '官也街兩旁的小洋房塗滿了什麼顏色，像童話小鎮一樣呢？',
    quizOptions: [
      { id: 'colorful', text: '🎨 像彩虹一樣五粉繽紛的粉嫩彩色糖果色', isCorrect: true, hint: '答對了！兩邊的小別墅塗着亮黃色、櫻花粉、薄荷綠，特別適合小探險家拍照打卡！' },
      { id: 'dustY', text: '🧱 只有黑乎乎的厚水泥磚頭顏色', isCorrect: false, hint: '不是的，那樣就太寂寞啦！官也街可是充滿朝氣 and 彩虹一樣的好看街道喔！' },
      { id: 'invisible', text: '👻 全部裝了亮面鏡子，出門會隱形', isCorrect: false, hint: '哈哈，如果有隱形牆，小探險家琵琵可就要撞到鼻子啦！' }
    ],
    voiceText: '官也街是一個香噴噴、糖果色的彩色小巷子，裡面有杏仁餅、豬扒包、花生糖。老闆還會高興地請你試吃香脆的蛋卷呢！'
  },
  {
    id: 'lighthouse',
    name: '東望洋燈塔 🚨',
    pinyin: 'dung1 mong6 joeng4 dang1 taap3',
    imageUrl: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=800',
    description: '它是矗立在澳門最高山峰「東望洋山」上的一座純白色小城堡！它是中國沿海地區最古老的現代燈塔喔。它身上塗著亮眼的黃色色帶，像一條帥氣的圍巾。在漆黑的大海之夜，燈塔伯伯揮舞著強大的金色光束，帶領所有迷路的大帆船游子安安全全地回家港灣。',
    funFact: '每次颱風快要吹到澳門的時候，叔叔們就會在燈塔旁邊的氣象台升起高高的、黑黑的風球鐵架，告訴全城的小朋友：「颱風來啦！快回家吃糖果休息！」',
    quizTitle: '⚓ 高山上的發光伯伯（夜航明燈）',
    quizQuestion: '當漆黑的黑夜籠罩大海時，東望洋燈塔如何幫助海上的大船不迷路？',
    quizOptions: [
      { id: 'gold_beam', text: '💡 揮動高高的金黃色強光束，幫大家照亮方向', isCorrect: true, hint: '答對了！大燈塔像一個握著超級手電筒的大巨人，射出長長的光帶指引大船返航！' },
      { id: 'speak', text: '🗣️ 拿出特大號的喇叭衝著海面大吼：大船快看這裡！', isCorrect: false, hint: '大船航行很遠很遠，海浪聲音又大，大聲喊叫是聽不見的，一定要用明亮的光束喔！' },
      { id: 'fireworks', text: '🎆 每隔一分鐘就點放一個超大的綠色煙花', isCorrect: false, hint: '如果每天晚上都放，燈塔伯伯的煙花倉庫可要破產囉！' }
    ],
    voiceText: '我是東望洋燈塔，在晚上的時候，我會發出亮亮的光芒，讓大船不會迷路喔！',
  },
  {
    id: 'taipa_houses',
    name: '龍環葡韻 (綠色小別墅) 🏡',
    pinyin: 'lung4 waan4 pou4 wan5',
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800',
    description: '哇！湖邊有五排長得一模一樣、穿著粉嫩翠綠色外衣的薄荷綠漂亮別墅！很久以前，這些是葡萄牙官員住的地方。這裡長滿了鬱鬱蔥蔥的百年古榕樹，盛夏時綠意盈盈。前方的小湖塘裡鋪滿了粉紅色的荷花，一到夏天，荷風送爽，就像走進了童話愛麗絲的世界！',
    funFact: '這裡的「龍環」是氹（dàng）仔島的古老名字！「葡韻」代表迴盪在這裡的葡萄牙經典浪漫風情喔。',
    quizTitle: '🏡 薄荷荷花糖的世界（綠野仙蹤）',
    quizQuestion: '這五座像糖果一樣可愛的葡萄牙風格大別墅，身上穿著什麼顏色的衣服？',
    quizOptions: [
      { id: 'green', text: '🍀 清涼又美麗的薄荷湖水翠綠色', isCorrect: true, hint: '答對啦！這種薄荷綠叫葡萄牙綠，在夏天看到它，整個人都會像喝了薄荷汽水一樣冰爽！' },
      { id: 'black', text: '🖤 酷酷的特工炫酷純黑色', isCorrect: false, hint: '不是喔，如果是純黑色，夏天的植物跟大荷花就會被大太陽烤得很熱呢！' },
      { id: 'orange', text: '🎃 萬聖節瘋狂吸睛的大南瓜橘色', isCorrect: false, hint: '不正確，童話別墅穿的是可愛清新薄荷綠，跟前面的綠荷池可配了！' }
    ],
    voiceText: '薄荷綠的小洋房真漂亮！荷花開了，小青蛙在池塘裡唱著歌呢！',
  },
  {
    id: 'panda',
    name: '石排灣熊貓館 🐼',
    pinyin: 'sek6 paai4 waan1 hung4 maau1 gun2',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=800',
    description: '這裡居住著全澳門最受寵愛的國寶級大熊貓——「開心家族」！大熊貓爸爸「開開」、媽媽「心心」，還有他們在澳門出生、胖嘟嘟像大糰子一樣的雙胞胎兄弟「健健」和「康康」！他們每天最喜歡的事情就是躺平，一邊呼呼大睡，一邊用肥肥的腳板捧著翠綠新鮮的竹子當零食，嚼得「喀嚓喀嚓」響，圓滾滾的超級萌！',
    funFact: '除了熊貓，這裡還住著長相超級逗趣的「小熊貓」（紅褐色的、毛茸茸大尾巴小怪獸）以及漂亮的粉紅色火烈鳥喔！',
    quizTitle: '🎋 金牌吃播國寶熊貓（大糰子家族）',
    quizQuestion: '我們愛翻滾、每天嚼木頭的「健健」和「康康」是什麼大國寶物種？',
    quizOptions: [
      { id: 'panda_ans', text: '🐼 圓滾滾、黑白熊掌的大熊貓', isCorrect: true, hint: '你太優秀了！他們兩兄弟是澳門土生土長、超級萌的大肚子萌熊貓！' },
      { id: 'lion', text: '🦁️ 留著大鬍子仰天長嘯的獅子王', isCorrect: false, hint: '不是呢，獅子是不吃翠綠竹子跟蘋果當點心零食的哦！' },
      { id: 'dino', text: '🦖 噴火高飛的霸王三角恐龍', isCorrect: false, hint: '大熊貓表示：人家才沒有恐龍那麼強壯，人家是一隻愛睡懶覺的大糰子！' }
    ],
    voiceText: '我是大熊貓健健！我最喜歡吃香脆的竹子，也喜歡在草地上滾來滾去，你要和我做朋友嗎？',
  },
];
