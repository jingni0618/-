// 1. 塔罗牌库（为了让你测试，我放了 10 张经典大阿尔卡那，你可以以后自己加满 78 张）
const deck = [
  { name: "愚者 (The Fool)", emoji: "🚶‍♂️", meaning: "新的开始、自发性、信念的飞跃" },
  { name: "魔术师 (The Magician)", emoji: "🪄", meaning: "创造力、技能、意志力、显化" },
  { name: "女祭司 (The High Priestess)", emoji: "🌙", meaning: "直觉、潜意识、内在声音" },
  { name: "女皇 (The Empress)", emoji: "👑", meaning: "丰收、母性、自然、富足" },
  { name: "皇帝 (The Emperor)", emoji: "🏰", meaning: "权威、结构、逻辑、稳定" },
  { name: "恋人 (The Lovers)", emoji: "❤️", meaning: "爱、和谐、关系、价值观的对齐" },
  { name: "战车 (The Chariot)", emoji: " रथ", meaning: "控制、意志力、成功、行动" },
  { name: "命运之轮 (Wheel of Fortune)", emoji: "🎡", meaning: "好运、业力、生命的循环" },
  { name: "高塔 (The Tower)", emoji: "⚡", meaning: "突变、混乱、启示、觉醒" },
  { name: "星星 (The Star)", emoji: "⭐", meaning: "希望、信念、目的、灵性" }
];

// 2. 定义四牌阵的位置
const layout = [
  { id: "pos-1", label: "你的现状" },
  { id: "pos-2", label: "对方的状态" },
  { id: "pos-3", label: "当前的阻碍或连接" },
  { id: "pos-4", label: "未来的可能走向" }
];

// 3. 页面一加载，就自动在 HTML 里生成这 4 张盖着的牌
window.onload = function() {
  const container = document.getElementById("spreadContainer");
  container.innerHTML = ""; // 清空容器
  
  layout.forEach((pos, index) => {
    // 动态创建 HTML
    const slotHTML = `
      <div class="card-slot">
        <div class="slot-label" id="label-${index}">${pos.label}</div>
        <div class="card" id="card-${index}">
          <div class="card-face card-back">✧</div>
          <div class="card-face card-front">
            <div class="emoji" id="emoji-${index}">❓</div>
            <div class="name" id="name-${index}">等待抽取</div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += slotHTML;
  });
};

// 4. 洗牌算法（打乱数组顺序）
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// 5. 点击“抽取四张牌”按钮触发的主流程
async function startDivination() {
  const question = document.getElementById("questionInput").value.trim();
  const btn = document.getElementById("drawBtn");
  const readingBox = document.getElementById("readingBox");

  if (!question) {
    alert("请先输入你心中的疑惑。");
    return;
  }

  // 重置状态
  readingBox.classList.remove("visible");
  readingBox.innerHTML = "";
  btn.disabled = true;
  btn.innerText = "洗牌与抽牌中...";

  // 准备一套洗好的牌
  let currentDeck = shuffle([...deck]);
  let drawnCardsData = []; // 用来存抽到的牌的信息，稍后发给后端

  // 依次翻开 4 张牌
  for (let i = 0; i < layout.length; i++) {
    // 制造 0.6 秒的停顿，让翻牌有节奏感
    await new Promise(r => setTimeout(r, 600)); 
    
    // 从牌堆里弹出一张牌
    const cardData = currentDeck.pop();
    
    // 随机决定是否是逆位 (20% 概率)
    const isReversed = Math.random() < 0.2;
    const reversedText = isReversed ? " (逆位)" : " (正位)";

    // 记录这张牌的数据
    drawnCardsData.push({
      position: layout[i].label,
      cardName: cardData.name + reversedText,
      meaning: cardData.meaning
    });

    // 改变页面上的文字和 emoji
    document.getElementById(`label-${i}`).classList.add("visible");
    document.getElementById(`emoji-${i}`).innerText = cardData.emoji;
    document.getElementById(`name-${i}`).innerText = cardData.name + reversedText;
    
    // 如果是逆位，给卡牌加个旋转 180 度的效果
    const cardElement = document.getElementById(`card-${i}`);
    if(isReversed) {
        cardElement.style.transform = "rotateY(180deg) rotateZ(180deg)"; // 翻面的同时倒过来
    } else {
        cardElement.style.transform = "rotateY(180deg)";
    }
  }

  // 牌翻完后，呼叫我们的后端 API
  btn.innerText = "等待命运的启示...";
  document.getElementById("loadingBox").style.display = "block";
  
  await requestAIReading(question, drawnCardsData);
}

// 6. 向我们自己的安全后端发起请求（取代之前直接请求 OpenAI）
async function requestAIReading(question, cards) {
  const loading = document.getElementById("loadingBox");
  const readingBox = document.getElementById("readingBox");
  const btn = document.getElementById("drawBtn");

  try {
    // 这里的 /api/tarot 就是我们马上要在 Vercel 里跑起来的后端接口地址
    const response = await fetch("/api/tarot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question,
        cards: cards
      })
    });

    // 如果后端报错了
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "占星网关连接失败");
    }

    // 拿到后端传回来的大模型解读结果
    const data = await response.json();
    readingBox.innerHTML = data.reading;

  } catch (error) {
    readingBox.innerHTML = `<p style="color: #ff6b6b;">🔮 星空信号受到干扰：${error.message}</p>`;
  } finally {
    loading.style.display = "none";
    readingBox.classList.add("visible");
    readingBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    btn.innerText = "重新占卜";
    btn.disabled = false;
    btn.onclick = () => { window.location.reload(); };
  }
}