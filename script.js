// 1. 塔罗牌库
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

// 3. 页面加载时生成牌的骨架
window.onload = function() {
  const container = document.getElementById("spreadContainer");
  container.innerHTML = ""; 
  
  layout.forEach((pos, index) => {
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

// 4. 洗牌算法
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// 5. 点击抽取触发主流程
async function startDivination() {
  const question = document.getElementById("questionInput").value.trim();
  const btn = document.getElementById("drawBtn");
  const readingBox = document.getElementById("readingBox");

  if (!question) {
    alert("请先输入你心中的疑惑。");
    return;
  }

  readingBox.classList.remove("visible");
  readingBox.innerHTML = "";
  btn.disabled = true;
  btn.innerText = "洗牌与抽牌中...";

  let currentDeck = shuffle([...deck]);
  let drawnCardsData = [];

  for (let i = 0; i < layout.length; i++) {
    await new Promise(r => setTimeout(r, 600)); 
    
    const cardData = currentDeck.pop();
    const isReversed = Math.random() < 0.2;
    const reversedText = isReversed ? " (逆位)" : " (正位)";

    drawnCardsData.push({
      position: layout[i].label,
      cardName: cardData.name + reversedText,
      meaning: cardData.meaning
    });

    document.getElementById(`label-${i}`).classList.add("visible");
    document.getElementById(`emoji-${i}`).innerText = cardData.emoji;
    document.getElementById(`name-${i}`).innerText = cardData.name + reversedText;
    
    const cardElement = document.getElementById(`card-${i}`);
    if(isReversed) {
        cardElement.style.transform = "rotateY(180deg) rotateZ(180deg)";
    } else {
        cardElement.style.transform = "rotateY(180deg)";
    }
  }

  btn.innerText = "等待命运的启示...";
  document.getElementById("loadingBox").style.display = "block";
  
  await requestAIReading(question, drawnCardsData);
}

// 6. 向后端 API 发起真实请求
async function requestAIReading(question, cards) {
  const loading = document.getElementById("loadingBox");
  const readingBox = document.getElementById("readingBox");
  const btn = document.getElementById("drawBtn");

  try {
    // 强制使用相对路径，匹配 Vercel 的 Serverless Function 路由
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

    if (!response.ok) {
      const errorText = await response.text(); // 获取后端返回的原始报错信息
      let errorMessage = "未知网络错误";
      try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || JSON.stringify(errorJson);
      } catch (e) {
          errorMessage = errorText;
      }
      throw new Error(`请求失败 (HTTP ${response.status}): ${errorMessage}`);
    }

    const data = await response.json();
    readingBox.innerHTML = data.reading;

  } catch (error) {
    console.error("Fetch 捕获到错误:", error);
    readingBox.innerHTML = `
      <div style="background: rgba(255,107,107,0.1); border: 1px solid #ff6b6b; padding: 20px; border-radius: 8px;">
        <h4 style="color: #ff6b6b; margin-top: 0;">🔮 星空信号受到干扰</h4>
        <p style="color: #ffcccc; font-family: monospace; font-size: 14px; word-break: break-all;">
          ${error.message}
        </p>
        <p style="color: #a8b2d1; font-size: 13px; margin-bottom: 0;">
          * 请截图此错误信息发送给开发者进行 Debug。
        </p>
      </div>`;
  } finally {
    loading.style.display = "none";
    readingBox.classList.add("visible");
    readingBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    btn.innerText = "重新占卜";
    btn.disabled = false;
    btn.onclick = () => { window.location.reload(); };
  }
}