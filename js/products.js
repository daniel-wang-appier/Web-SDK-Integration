export const products = [
  {
    id: 'ceramic-mug',
    name: '霧白陶瓷馬克杯',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
    description:
      '手工陶瓷成形的厚底杯身，帶有淡淡霧白質感，適合晨間咖啡與午後茶。杯口微微收口，讓飲品更穩定地落入口中，也更符合簡約居家風格。',
    price: 480,
    category: '餐廚',
  },
  {
    id: 'aroma-candle',
    name: '雪松香氛蠟燭',
    image: 'https://images.unsplash.com/photo-1602872029708-84d970d3386e?auto=format&fit=crop&w=900&q=80',
    description:
      '以雪松、白茶與微甜木質調混合而成的香氛，燃燒時帶出乾淨而安定的室內氣息。適合在閱讀、冥想與晚間放鬆時使用，營造簡約生活空間。',
    price: 680,
    category: '香氛',
  },
  {
    id: 'linen-tote',
    name: '亞麻日常托特包',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description:
      '由亞麻與棉混織而成，表面帶有自然纖維紋理與輕柔垂墜感。容量適中，適合買菜、通勤或隨身收納，和日常穿搭不衝突。',
    price: 890,
    category: '隨身',
  },
  {
    id: 'desk-lamp',
    name: '暖光閱讀桌燈',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    description:
      '低眩光暖白照明設計，搭配簡潔的金屬支架與柔和線條，適合書桌、床頭與閱讀角落。亮度與角度都方便調整，讓長時間使用更舒適。',
    price: 1280,
    category: '居家',
  },
  {
    id: 'bottle',
    name: '不鏽鋼保溫瓶',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    description:
      '雙層不鏽鋼結構可保冷與保溫，口徑合適方便清潔，適合通勤、旅行與日常補水。簡約外型也能自然融入工作與居家生活裡。',
    price: 750,
    category: '隨身',
  },
  {
    id: 'notebook',
    name: '橄欖綠方格筆記本',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    description:
      '採用厚實紙質與清晰格線，讓手寫紀錄、待辦清單與靈感草稿都更輕鬆。封面色調偏自然橄欖綠，放在桌面上也有清爽的質感。',
    price: 220,
    category: '文具',
  },
  {
    id: 'throw-blanket',
    name: '柔織毯',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    description:
      '細緻纖維交織而成，觸感輕柔且保暖中性，能在沙發上披著休息，也適合加溫臥室與客廳的空間層次。顏色柔和、不會搶走室內裝飾焦點。',
    price: 1580,
    category: '居家',
  },
  {
    id: 'tea-set',
    name: '晨霧玻璃茶具組',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    description:
      '透明玻璃茶壺與杯組設計，讓茶湯的澄澈與香氣一目了然。適合慢慢泡茶、招待朋友時使用，也符合簡約日常的靜謐節奏。',
    price: 1100,
    category: '餐廚',
  },
  {
    id: 'incense-holder',
    name: '黃銅線香座',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    description:
      '黃銅材質帶有輕微金屬光澤，穩定的底座可承托線香與香盒。用於入門、冥想或日常小儀式時，讓空間更有節奏感與木質溫度。',
    price: 390,
    category: '香氛',
  },
  {
    id: 'cushion',
    name: '棉麻靠枕套',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    description:
      '棉麻布料混搭了輕盈透氣感與舒服支撐力，適合在沙發、主臥與閱讀角落中使用。內芯可替換、保養簡單，讓日常居家細節保持輕鬆有序。',
    price: 560,
    category: '居家',
  },
];

export const productMap = Object.fromEntries(products.map((product) => [product.id, product]));
