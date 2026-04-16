/* 全局变量与图库 (国内 CDN 加速) */
const deck = [
  { name: "愚者", emoji: "🚶‍♂️", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m00.jpg", meaning: "新的开始、自发性、信念的飞跃" },
  { name: "魔术师", emoji: "🪄", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m01.jpg", meaning: "创造力、技能、意志力、显化" },
  { name: "女祭司", emoji: "🌙", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m02.jpg", meaning: "直觉、潜意识、神秘" },
  { name: "女皇", emoji: "👑", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m03.jpg", meaning: "丰收、母性、自然、富足" },
  { name: "皇帝", emoji: "🏰", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m04.jpg", meaning: "权威、结构、逻辑、稳定" },
  { name: "教皇", emoji: "📜", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m05.jpg", meaning: "传统、信仰、精神指引" },
  { name: "恋人", emoji: "❤️", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m06.jpg", meaning: "爱、和谐、关系、价值观对齐" },
  { name: "战车", emoji: " रथ", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m07.jpg", meaning: "控制、意志力、行动" },
  { name: "力量", emoji: "🦁", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m08.jpg", meaning: "勇气、耐心、同情与温柔" },
  { name: "隐士", emoji: "🏮", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m09.jpg", meaning: "灵魂探索、内省、内在指引" },
  { name: "命运之轮", emoji: "🎡", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m10.jpg", meaning: "好运、业力、转折点" },
  { name: "正义", emoji: "⚖️", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m11.jpg", meaning: "公平、真相、因果、平衡" },
  { name: "倒吊人", emoji: "🦇", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m12.jpg", meaning: "暂停、放手、换个视角" },
  { name: "死神", emoji: "💀", img: "https://ghproxy.net/https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m13.jpg", meaning: "结束、转变、彻底重生" },
  { name: "节制", emoji: "⛲", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m14.jpg", meaning: "平衡、中庸、耐心、目的" },
  { name: "恶魔", emoji: "👿", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m15.jpg", meaning: "沉迷、物质主义、束缚" },
  { name: "高塔", emoji: "⚡", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m16.jpg", meaning: "突变、混乱、旧信念的崩塌" },
  { name: "星星", emoji: "⭐", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m17.jpg", meaning: "希望、信念、灵感、治愈" },
  { name: "月亮", emoji: "🌖", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m18.jpg", meaning: "幻觉、恐惧、潜意识" },
  { name: "太阳", emoji: "☀️", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m19.jpg", meaning: "积极、活力、成功、快乐" },
  { name: "审判", emoji: "📯", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m20.jpg", meaning: "重生、内在呼唤、宽恕" },
  { name: "世界", emoji: "🌍", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m21.jpg", meaning: "完成、整合、成就、圆满" },
  { name: "权杖一", emoji: "🔥", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/w01.jpg", meaning: "灵感、新机会、成长" },
  { name: "权杖二", emoji: "🗺️", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/w02.jpg", meaning: "未来规划、决策" },
  { name: "权杖三", emoji: "🚢", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/w03.jpg", meaning: "远见、探索、扩张与合作" },
  { name: "权杖十", emoji: "🪵", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/w10.jpg", meaning: "重担、责任过重、压力" },
  { name: "圣杯一", emoji: "💧", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/c01.jpg", meaning: "纯粹的爱、创造力" },
  { name: "圣杯二", emoji: "🥂", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/c02.jpg", meaning: "统一、伴侣关系、平等结合" },
  { name: "圣杯三", emoji: "🍻", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/c03.jpg", meaning: "庆祝、友谊、社交聚会" },
  { name: "圣杯十", emoji: "🌈", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/c10.jpg", meaning: "神圣的爱、家庭、和谐" },
  { name: "宝剑一", emoji: "🗡️", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/s01.jpg", meaning: "突破、清晰、锐利的思想" },
  { name: "宝剑二", emoji: "盲", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/s02.jpg", meaning: "僵局、困难的选择、逃避现实" },
  { name: "宝剑三", emoji: "💔", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/s03.jpg", meaning: "心碎、悲痛、痛苦的分离" },
  { name: "宝剑十", emoji: "📌", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/s10.jpg", meaning: "痛苦的结局、背叛、低谷" },
  { name: "星币一", emoji: "🪙", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/p01.jpg", meaning: "新的财务机会、繁荣、物质" },
  { name: "星币二", emoji: "🤹", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/p02.jpg", meaning: "平衡、适应能力、资金管理" },
  { name: "星币三", emoji: "🤝", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/p03.jpg", meaning: "团队合作、专业的技能" },
  { name: "星币十", emoji: "🏡", img: "https://ghproxy.net/https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/p10.jpg", meaning: "财富传承、家庭、长期成功" }
];

const spreadsOptions = {
  single: [{ label: "核心指引" }],
  yesno: [{ label: "支持的力量" }, { label: "反对的力量" }, { label: "最终的答案" }],
  time: [{ label: "过去的因果" }, { label: "当下的现状" }, { label: "未来的趋势" }],
  relationship: [{ label: "你的现状" }, { label: "对方的状态" }, { label: "当前的阻碍" }, { label: "未来的走向" }],
  cross: [{ label: "当下的核心问题" }, { label: "面临的阻碍" }, { label: "潜在的目标" }, { label: "深层的潜意识" }, { label: "最终的可能结局" }]
};

let currentSpreadLayout = []; 
let requiredCardsCount = 0;   
let cardsDrawn = 0;           
let drawnCardsData = [];      
let shuffledDeck = [];        

window.onload = function() {
  initStarfield(); 
  renderSpread();
  preloadImages(); // 性能预加载
};

// 预加载所有图片，保证翻牌秒开
function preloadImages() {
  deck.forEach(card => {
    const img = new Image();
    img.src = card.img;
  });
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function renderSpread() {
  const spreadType = document.getElementById("spreadSelect").value;
  currentSpreadLayout = spreadsOptions[spreadType];
  requiredCardsCount = currentSpreadLayout.length;
  if(document.getElementById("cardsLeft")) {
      document.getElementById("cardsLeft").innerText = requiredCardsCount;
  }

  const container = document.getElementById("spreadContainer");
  container.innerHTML = ""; 
  currentSpreadLayout.forEach((pos, index) => {
    container.innerHTML += `
      <div class="card-slot">
        <div class="slot-label" id="label-${index}">${pos.label}</div>
        <div class="card" id="card-${index}">
          <div class="card-face card-back">✧</div>
          <div class="card-face card-front">
            <img id="img-${index}" class="tarot-image" src="" style="display:none;">
            <div class="name-overlay" id="name-${index}">等待抽取</div>
          </div>
        </div>
      </div>
    `;
  });
}

/* VIP 付费墙逻辑 */
function checkVipAndStart() {
  const question = document.getElementById("questionInput").value.trim();
  if (!question) { alert("星空需要知道你的疑惑，请在上方输入问题。"); return; }
  
  // 如果牌数 > 3，弹出付费框
  if (requiredCardsCount > 3) {
    document.getElementById("vipModal").style.display = "flex";
  } else {
    startRitual();
  }
}
function closeVipModal() { document.getElementById("vipModal").style.display = "none"; }
function confirmVip() {
  document.getElementById("vipModal").style.display = "none";
  startRitual();
}

/* 冥想与抽牌交互 */
function startRitual() {
  // 1. 启动全屏冥想动画
  const overlay = document.getElementById("meditationOverlay");
  overlay.style.display = "flex";
  document.getElementById("controlPanel").style.display = "none";
  
  // 冥想 4 秒后进入选牌
  setTimeout(() => {
    overlay.style.display = "none";
    document.getElementById("deckArea").style.display = "block";
    
    cardsDrawn = 0; drawnCardsData = []; shuffledDeck = shuffle([...deck]);
    const fanDeck = document.getElementById("fanDeck");
    fanDeck.innerHTML = "";
    const totalCards = 38; 
    const angleStep = 120 / totalCards;

    for (let i = 0; i < totalCards; i++) {
      const angle = -60 + (i * angleStep);
      const cardEl = document.createElement("div");
      cardEl.className = "deck-card";
      cardEl.style.transform = `rotate(${angle}deg) translateY(-20px)`;
      cardEl.style.zIndex = i;
      cardEl.onclick = function() {
        if (cardsDrawn < requiredCardsCount && !this.classList.contains("drawn")) { userDrawsOneCard(this); }
      };
      fanDeck.appendChild(cardEl);
    }
  }, 4000);
}

function userDrawsOneCard(clickedCardElement) {
  playSound("drawSound"); 
  clickedCardElement.classList.add("drawn");
  
  const cardData = shuffledDeck.pop();
  const isReversed = Math.random() < 0.2; 
  const reversedText = isReversed ? " (逆位)" : " (正位)";

  drawnCardsData.push({
    position: currentSpreadLayout[cardsDrawn].label,
    cardName: cardData.name + reversedText,
    meaning: cardData.meaning,
    isReversed: isReversed,
    img: cardData.img 
  });

  const targetSlotCard = document.getElementById(`card-${cardsDrawn}`);
  targetSlotCard.classList.add("dealt");
  document.getElementById(`label-${cardsDrawn}`).classList.add("visible");

  cardsDrawn++;
  document.getElementById("cardsLeft").innerText = (requiredCardsCount - cardsDrawn);

  if (cardsDrawn === requiredCardsCount) { setTimeout(revealCardsAndRead, 1000); }
}

async function revealCardsAndRead() {
  document.getElementById("deckArea").style.display = "none"; 

  for (let i = 0; i < requiredCardsCount; i++) {
    await new Promise(r => setTimeout(r, 600)); 
    playSound("revealSound"); 
    
    const data = drawnCardsData[i];
    const imgEl = document.getElementById(`img-${i}`);
    imgEl.src = data.img;
    imgEl.style.display = "block";
    document.getElementById(`name-${i}`).innerText = data.cardName;
    
    const cardElement = document.getElementById(`card-${i}`);
    cardElement.classList.add("flipped");
    if(data.isReversed) cardElement.classList.add("reversed");
  }

  const question = document.getElementById("questionInput").value.trim();
  document.getElementById("readingBox").classList.add("visible");
  await fetchStream(question, drawnCardsData);
}

/* 流式输出解码器 (像打字机一样打印 AI 的话) */
async function fetchStream(question, cards) {
  const streamContent = document.getElementById("streamContent");
  const cursor = document.getElementById("cursor");
  streamContent.innerHTML = "";

  try {
    const response = await fetch("/api/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, cards })
    });

    if (!response.ok) throw new Error("网络错误");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      // 解析 OpenAI 流式数据格式: data: {...}
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        if (line.includes('[DONE]')) continue;
        if (line.startsWith('data: ')) {
          try {
            const dataStr = line.replace('data: ', '');
            // 处理后端传来的原始错误信息
            if(dataStr.startsWith('[ERROR]')) {
              streamContent.innerHTML += `<br><span style="color:red">${dataStr}</span>`;
              continue;
            }
            const data = JSON.parse(dataStr);
            const content = data.choices[0]?.delta?.content || "";
            // 清理可能出现的 markdown 符号
            const cleanContent = content.replace(/```html|```/gi, '');
            streamContent.innerHTML += cleanContent;
            // 自动向下滚动
            document.getElementById("readingWrapper").scrollIntoView({ behavior: 'smooth', block: 'end' });
          } catch (e) {}
        }
      }
    }
  } catch (error) {
    streamContent.innerHTML = `<span style="color:red">🔮 宇宙连接中断，请重试。</span>`;
  } finally {
    cursor.style.display = "none";
    document.getElementById("saveBtn").style.display = "inline-block";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
}

/* 截图功能与音效开关等保持不变 */
let isMusicPlaying = false;
function toggleMusic() {
  const bgMusic = document.getElementById("bgMusic");
  const btn = document.getElementById("musicToggle");
  if (isMusicPlaying) { bgMusic.pause(); btn.innerText = "🎵 开启灵性环境音"; } 
  else { bgMusic.volume = 0.4; bgMusic.play(); btn.innerText = "🔇 关闭环境音"; }
  isMusicPlaying = !isMusicPlaying;
}
function playSound(id) { const audio = document.getElementById(id); audio.currentTime = 0; audio.volume = 0.7; audio.play().catch(e => {}); }

function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let width, height, stars = [];
  function resize() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; initStars(); }
  function initStars() { stars = []; const numStars = window.innerWidth < 768 ? 100 : 200; for (let i = 0; i < numStars; i++) { stars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5, vx: Math.floor(Math.random() * 50) - 25, vy: Math.floor(Math.random() * 50) - 25, opacity: Math.random() }); } }
  function draw() { ctx.clearRect(0, 0, width, height); for (let star of stars) { star.x += star.vx / 100; star.y += star.vy / 100; if (star.x < 0 || star.x > width) star.vx = -star.vx; if (star.y < 0 || star.y > height) star.vy = -star.vy; star.opacity += (Math.random() - 0.5) * 0.1; star.opacity = Math.max(0.1, Math.min(1, star.opacity)); ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI); ctx.fillStyle = `rgba(249, 211, 66, ${star.opacity})`; ctx.fill(); } requestAnimationFrame(draw); }
  window.addEventListener('resize', resize); resize(); draw();
}

function saveAsImage() {
  const captureArea = document.getElementById("captureArea");
  const shareHeader = document.getElementById("shareHeader");
  const shareFooter = document.getElementById("shareFooter");
  const btn = document.getElementById("saveBtn");
  shareHeader.style.display = "block"; shareFooter.style.display = "block";
  btn.innerText = "正在生成..."; btn.disabled = true;
  const originalBg = captureArea.style.background;
  captureArea.style.background = "#1a1a2e"; captureArea.style.padding = "20px"; captureArea.style.borderRadius = "20px";
  html2canvas(captureArea, { scale: 2, useCORS: true, backgroundColor: "#1a1a2e" }).then(canvas => {
    shareHeader.style.display = "none"; shareFooter.style.display = "none";
    captureArea.style.background = originalBg; btn.innerText = "📸 保存专属卡片"; btn.disabled = false;
    const link = document.createElement("a"); link.download = "塔罗启示.png"; link.href = canvas.toDataURL("image/png"); link.click();
  });
}
