/* 全局变量与图库 (国内免墙 CDN) */
const baseImageUrl = "https://cdn.jsdelivr.net/gh/howarder3/tarot-json@master/src/assets/images/";
const deck = [
  { name: "愚者 (The Fool)", emoji: "🚶‍♂️", img: baseImageUrl + "m00.jpg", meaning: "新的开始、自发性、信念的飞跃" },
  { name: "魔术师 (The Magician)", emoji: "🪄", img: baseImageUrl + "m01.jpg", meaning: "创造力、技能、意志力、显化" },
  { name: "女祭司 (The High Priestess)", emoji: "🌙", img: baseImageUrl + "m02.jpg", meaning: "直觉、潜意识、神秘" },
  { name: "女皇 (The Empress)", emoji: "👑", img: baseImageUrl + "m03.jpg", meaning: "丰收、母性、自然、富足" },
  { name: "皇帝 (The Emperor)", emoji: "🏰", img: baseImageUrl + "m04.jpg", meaning: "权威、结构、逻辑、稳定" },
  { name: "教皇 (The Hierophant)", emoji: "📜", img: baseImageUrl + "m05.jpg", meaning: "传统、信仰、精神指引" },
  { name: "恋人 (The Lovers)", emoji: "❤️", img: baseImageUrl + "m06.jpg", meaning: "爱、和谐、关系、价值观对齐" },
  { name: "战车 (The Chariot)", emoji: " रथ", img: baseImageUrl + "m07.jpg", meaning: "控制、意志力、行动" },
  { name: "力量 (Strength)", emoji: "🦁", img: baseImageUrl + "m08.jpg", meaning: "勇气、耐心、同情与温柔" },
  { name: "隐士 (The Hermit)", emoji: "🏮", img: baseImageUrl + "m09.jpg", meaning: "灵魂探索、内省、内在指引" },
  { name: "命运之轮 (Wheel of Fortune)", emoji: "🎡", img: baseImageUrl + "m10.jpg", meaning: "好运、业力、转折点" },
  { name: "正义 (Justice)", emoji: "⚖️", img: baseImageUrl + "m11.jpg", meaning: "公平、真相、因果、平衡" },
  { name: "倒吊人 (The Hanged Man)", emoji: "🦇", img: baseImageUrl + "m12.jpg", meaning: "暂停、放手、换个视角" },
  { name: "死神 (Death)", emoji: "💀", img: baseImageUrl + "m13.jpg", meaning: "结束、转变、彻底重生" },
  { name: "节制 (Temperance)", emoji: "⛲", img: baseImageUrl + "m14.jpg", meaning: "平衡、中庸、耐心、目的" },
  { name: "恶魔 (The Devil)", emoji: "👿", img: baseImageUrl + "m15.jpg", meaning: "沉迷、物质主义、束缚" },
  { name: "高塔 (The Tower)", emoji: "⚡", img: baseImageUrl + "m16.jpg", meaning: "突变、混乱、旧信念的崩塌" },
  { name: "星星 (The Star)", emoji: "⭐", img: baseImageUrl + "m17.jpg", meaning: "希望、信念、灵感、治愈" },
  { name: "月亮 (The Moon)", emoji: "🌖", img: baseImageUrl + "m18.jpg", meaning: "幻觉、恐惧、潜意识" },
  { name: "太阳 (The Sun)", emoji: "☀️", img: baseImageUrl + "m19.jpg", meaning: "积极、活力、成功、快乐" },
  { name: "审判 (Judgement)", emoji: "📯", img: baseImageUrl + "m20.jpg", meaning: "重生、内在呼唤、宽恕" },
  { name: "世界 (The World)", emoji: "🌍", img: baseImageUrl + "m21.jpg", meaning: "完成、整合、成就、圆满" },
  { name: "权杖一", emoji: "🔥", img: baseImageUrl + "w01.jpg", meaning: "灵感、新机会、成长" },
  { name: "权杖二", emoji: "🗺️", img: baseImageUrl + "w02.jpg", meaning: "未来规划、决策" },
  { name: "权杖三", emoji: "🚢", img: baseImageUrl + "w03.jpg", meaning: "远见、探索、扩张与合作" },
  { name: "权杖十", emoji: "🪵", img: baseImageUrl + "w10.jpg", meaning: "重担、责任过重、压力" },
  { name: "圣杯一", emoji: "💧", img: baseImageUrl + "c01.jpg", meaning: "纯粹的爱、创造力" },
  { name: "圣杯二", emoji: "🥂", img: baseImageUrl + "c02.jpg", meaning: "统一、伴侣关系、平等结合" },
  { name: "圣杯三", emoji: "🍻", img: baseImageUrl + "c03.jpg", meaning: "庆祝、友谊、社交聚会" },
  { name: "圣杯十", emoji: "🌈", img: baseImageUrl + "c10.jpg", meaning: "神圣的爱、家庭、和谐" },
  { name: "宝剑一", emoji: "🗡️", img: baseImageUrl + "s01.jpg", meaning: "突破、清晰、锐利的思想" },
  { name: "宝剑二", emoji: "盲", img: baseImageUrl + "s02.jpg", meaning: "僵局、困难的选择、逃避现实" },
  { name: "宝剑三", emoji: "💔", img: baseImageUrl + "s03.jpg", meaning: "心碎、悲痛、痛苦的分离" },
  { name: "宝剑十", emoji: "📌", img: baseImageUrl + "s10.jpg", meaning: "痛苦的结局、背叛、低谷" },
  { name: "星币一", emoji: "🪙", img: baseImageUrl + "p01.jpg", meaning: "新的财务机会、繁荣、物质" },
  { name: "星币二", emoji: "🤹", img: baseImageUrl + "p02.jpg", meaning: "平衡、适应能力、资金管理" },
  { name: "星币三", emoji: "🤝", img: baseImageUrl + "p03.jpg", meaning: "团队合作、专业的技能" },
  { name: "星币十", emoji: "🏡", img: baseImageUrl + "p10.jpg", meaning: "财富传承、家庭、长期成功" }
];

const spreadsOptions = {
  single: [{ label: "核心指引" }],
  yesno: [{ label: "支持的力量" }, { label: "反对的力量" }, { label: "最终的答案" }],
  time: [{ label: "过去的因果" }, { label: "当下的现状" }, { label: "未来的趋势" }],
  relationship: [{ label: "你的现状" }, { label: "对方的状态" }, { label: "当前的阻碍" }, { label: "未来的走向" }],
  career: [{ label: "事业现状" }, { label: "潜在机遇" }, { label: "未知风险" }, { label: "财务走向" }],
  choice: [{ label: "当前现状" }, { label: "选择A的过程" }, { label: "选择B的过程" }, { label: "选择A的结局" }, { label: "选择B的结局" }],
  cross: [{ label: "当下的核心问题" }, { label: "面临的阻碍" }, { label: "潜在的目标" }, { label: "深层的潜意识" }, { label: "最终的可能结局" }]
};

let currentSpreadLayout = []; 
let requiredCardsCount = 0;   
let cardsDrawn = 0;           
let drawnCardsData = [];      
let shuffledDeck = [];        
let isNightMode = false;

window.onload = function() {
  checkNightMode(); // 检测是否深夜
  initStarfield(); 
  renderSpread();
  preloadImages(); 
};

// 6. 深夜模式检测
function checkNightMode() {
  const hour = new Date().getHours();
  if (hour >= 22 || hour <= 4) {
    isNightMode = true;
    document.body.classList.add("night-mode");
    document.getElementById("mainTitle").innerText = "🌙 深夜星盘";
    document.getElementById("mainSubtitle").innerText = "夜深了，让星空安抚你疲惫的灵魂";
  }
}

// 预加载所有图片，保证翻牌秒开
function preloadImages() { deck.forEach(card => { const img = new Image(); img.src = card.img; }); }

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--; [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; }
  return array;
}

function renderSpread() {
  const spreadType = document.getElementById("spreadSelect").value;
  currentSpreadLayout = spreadsOptions[spreadType];
  requiredCardsCount = currentSpreadLayout.length;
  if(document.getElementById("cardsLeft")) document.getElementById("cardsLeft").innerText = requiredCardsCount;

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
  
  if (requiredCardsCount > 3) {
    const confirmBtn = document.getElementById("vipConfirmBtn");
    confirmBtn.innerText = "✅ 我已赞赏，开启占卜";
    confirmBtn.disabled = false;
    confirmBtn.style.opacity = "1";
    document.getElementById("vipModal").style.display = "flex";
  } else {
    startRitual();
  }
}
function closeVipModal() { document.getElementById("vipModal").style.display = "none"; }
function confirmVip() {
  const confirmBtn = document.getElementById("vipConfirmBtn");
  confirmBtn.innerText = "🔄 正在核实能量交换...";
  confirmBtn.disabled = true; confirmBtn.style.opacity = "0.7";
  setTimeout(() => { document.getElementById("vipModal").style.display = "none"; startRitual(); }, 3500);
}

/* 冥想与抽牌交互 */
function startRitual() {
  const overlay = document.getElementById("meditationOverlay");
  overlay.style.display = "flex";
  document.getElementById("controlPanel").style.display = "none";
  
  setTimeout(() => {
    overlay.style.display = "none";
    document.getElementById("deckArea").style.display = "block";
    
    cardsDrawn = 0; drawnCardsData = []; shuffledDeck = shuffle([...deck]);
    const fanDeck = document.getElementById("fanDeck");
    fanDeck.innerHTML = "";
    const totalCards = 38; const angleStep = 120 / totalCards;

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
  }, 4000); // 冥想 4 秒
}

function userDrawsOneCard(clickedCardElement) {
  playSound("drawSound"); 
  // 5. 手机震动反馈
  if (navigator.vibrate) navigator.vibrate(50);

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
    if (navigator.vibrate) navigator.vibrate(100); // 翻牌重震
    
    const data = drawnCardsData[i];
    const imgEl = document.getElementById(`img-${i}`);
    imgEl.src = data.img; imgEl.style.display = "block";
    document.getElementById(`name-${i}`).innerText = data.cardName;
    
    const cardElement = document.getElementById(`card-${i}`);
    cardElement.classList.add("flipped");
    if(data.isReversed) cardElement.classList.add("reversed");
  }

  const question = document.getElementById("questionInput").value.trim();
  const userName = document.getElementById("nameInput").value.trim();
  document.getElementById("readingWrapper").style.display = "block";
  document.getElementById("readingBox").classList.add("visible");
  
  await fetchStream(question, userName, drawnCardsData);
}

/* 流式输出解码器 */
async function fetchStream(question, userName, cards) {
  const streamContent = document.getElementById("streamContent");
  const cursor = document.getElementById("cursor");
  const loadingText = document.getElementById("loadingText");
  
  streamContent.innerHTML = "";
  let htmlBuffer = "";

  try {
    const response = await fetch("/api/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, cards, userName, isNight: isNightMode })
    });

    if (!response.ok) throw new Error("宇宙网关拥堵，请稍后重试");

    loadingText.style.display = "none";

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (line.includes('[DONE]')) continue;
        if (line.startsWith('data: ')) {
          try {
            const dataStr = line.replace('data: ', '');
            if(dataStr.startsWith('[ERROR]')) { streamContent.innerHTML += `<br><span style="color:#ff6b6b">${dataStr}</span>`; continue; }
            
            const data = JSON.parse(dataStr);
            const content = data.choices[0]?.delta?.content || "";
            htmlBuffer += content;
            
            let displayHtml = htmlBuffer.replace(/```html/gi, '').replace(/```/g, '');
            streamContent.innerHTML = displayHtml;
            document.getElementById("readingWrapper").scrollIntoView({ behavior: 'smooth', block: 'end' });
          } catch (e) {}
        }
      }
    }
  } catch (error) {
    streamContent.innerHTML = `<span style="color:#ff6b6b">🔮 宇宙连接中断: ${error.message}</span>`;
  } finally {
    cursor.style.display = "none";
    document.getElementById("actionBtns").style.display = "flex";
    document.getElementById("saveBtn").style.display = "inline-block";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
}

/* 7. 每日一抽 (日签逻辑) */
async function startDailyDraw() {
  document.getElementById("controlPanel").style.display = "none";
  document.getElementById("spreadContainer").style.display = "none";
  document.getElementById("dailyCardArea").style.display = "block";
  document.getElementById("actionBtns").style.display = "flex";
  document.getElementById("saveBtn").style.display = "inline-block";
  document.getElementById("restartBtn").style.display = "inline-block";
  document.getElementById("dailyBtn").style.display = "none";

  // 日期
  const today = new Date();
  document.getElementById("dailyDate").innerText = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`;

  // 随机抽一张大牌 (前22张)
  const randomMajor = deck[Math.floor(Math.random() * 22)];
  document.getElementById("dailyImg").src = randomMajor.img;
  document.getElementById("dailyName").innerText = randomMajor.name;

  try {
    const response = await fetch("/api/tarot", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDaily: true, cards: [randomMajor] })
    });
    if (response.ok) {
      const data = await response.json();
      document.getElementById("dailyQuote").innerText = `“${data.reading}”`;
    } else {
      document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”";
    }
  } catch(e) {
    document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”";
  }
}

/* 音效与星空 */
let isMusicPlaying = false;
function toggleMusic() {
  const bgMusic = document.getElementById("bgMusic"); const btn = document.getElementById("musicToggle");
  if (isMusicPlaying) { bgMusic.pause(); btn.innerText = "🎵 灵性环境音"; } else { bgMusic.volume = 0.4; bgMusic.play(); btn.innerText = "🔇 关闭环境音"; }
  isMusicPlaying = !isMusicPlaying;
}
function playSound(id) { const audio = document.getElementById(id); audio.currentTime = 0; audio.volume = 0.7; audio.play().catch(e => {}); }
function initStarfield() {
  const canvas = document.getElementById('starfield'); const ctx = canvas.getContext('2d'); let width, height, stars = [];
  function resize() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; initStars(); }
  function initStars() { stars = []; const numStars = window.innerWidth < 768 ? 80 : 150; for (let i = 0; i < numStars; i++) { stars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5, vx: Math.floor(Math.random() * 50) - 25, vy: Math.floor(Math.random() * 50) - 25, opacity: Math.random() }); } }
  function draw() { ctx.clearRect(0, 0, width, height); for (let star of stars) { star.x += star.vx / 100; star.y += star.vy / 100; if (star.x < 0 || star.x > width) star.vx = -star.vx; if (star.y < 0 || star.y > height) star.vy = -star.vy; star.opacity += (Math.random() - 0.5) * 0.1; star.opacity = Math.max(0.1, Math.min(1, star.opacity)); ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI); ctx.fillStyle = `rgba(249, 211, 66, ${star.opacity})`; ctx.fill(); } requestAnimationFrame(draw); }
  window.addEventListener('resize', resize); resize(); draw();
}

function saveAsImage() {
  const captureArea = document.getElementById("captureArea");
  const shareHeader = document.getElementById("shareHeader");
  const shareFooter = document.getElementById("shareFooter");
  const btn = document.getElementById("saveBtn");
  
  if(shareHeader) shareHeader.style.display = "block"; 
  if(shareFooter) shareFooter.style.display = "block";
  btn.innerText = "正在生成..."; btn.disabled = true;
  
  const originalBg = captureArea.style.background;
  captureArea.style.background = isNightMode ? "#0d0614" : "#1a1a2e"; 
  captureArea.style.padding = "20px"; captureArea.style.borderRadius = "20px";

  html2canvas(captureArea, { scale: 2, useCORS: true, backgroundColor: isNightMode ? "#0d0614" : "#1a1a2e" }).then(canvas => {
    if(shareHeader) shareHeader.style.display = "none"; 
    if(shareFooter) shareFooter.style.display = "none";
    captureArea.style.background = originalBg; btn.innerText = "📸 保存专属卡片"; btn.disabled = false;
    const link = document.createElement("a"); link.download = "塔罗启示.png"; link.href = canvas.toDataURL("image/png"); link.click();
  });
}
