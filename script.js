/* 1. 牌库与配置 */
const deck = [
  { name: "愚者", emoji: "🚶‍♂️", meaning: "新的开始、自发性、信念的飞跃" },
  { name: "魔术师", emoji: "🪄", meaning: "创造力、技能、意志力、显化" },
  { name: "女祭司", emoji: "🌙", meaning: "直觉、潜意识、神秘" },
  { name: "女皇", emoji: "👑", meaning: "丰收、母性、自然、富足" },
  { name: "皇帝", emoji: "🏰", meaning: "权威、结构、逻辑、稳定" },
  { name: "教皇", emoji: "📜", meaning: "传统、信仰、精神指引" },
  { name: "恋人", emoji: "❤️", meaning: "爱、和谐、关系、价值观对齐" },
  { name: "战车", emoji: " रथ", meaning: "控制、意志力、行动" },
  { name: "力量", emoji: "🦁", meaning: "勇气、耐心、同情与温柔" },
  { name: "隐士", emoji: "🏮", meaning: "灵魂探索、内省、内在指引" },
  { name: "命运之轮", emoji: "🎡", meaning: "好运、业力、转折点" },
  { name: "正义", emoji: "⚖️", meaning: "公平、真相、因果、平衡" },
  { name: "倒吊人", emoji: "🦇", meaning: "暂停、放手、换个视角" },
  { name: "死神", emoji: "💀", meaning: "结束、转变、彻底重生" },
  { name: "节制", emoji: "⛲", meaning: "平衡、中庸、耐心、目的" },
  { name: "恶魔", emoji: "👿", meaning: "沉迷、物质主义、束缚" },
  { name: "高塔", emoji: "⚡", meaning: "突变、混乱、旧信念的崩塌" },
  { name: "星星", emoji: "⭐", meaning: "希望、信念、灵感、治愈" },
  { name: "月亮", emoji: "🌖", meaning: "幻觉、恐惧、潜意识" },
  { name: "太阳", emoji: "☀️", meaning: "积极、活力、成功、快乐" },
  { name: "审判", emoji: "📯", meaning: "重生、内在呼唤、宽恕" },
  { name: "世界", emoji: "🌍", meaning: "完成、整合、成就、圆满" },
  { name: "权杖一", emoji: "🔥", meaning: "灵感、新机会、成长" },
  { name: "权杖二", emoji: "🗺️", meaning: "未来规划、决策" },
  { name: "权杖三", emoji: "🚢", meaning: "远见、探索、扩张与合作" },
  { name: "权杖十", emoji: "🪵", meaning: "重担、责任过重、压力" },
  { name: "圣杯一", emoji: "💧", meaning: "纯粹的爱、创造力" },
  { name: "圣杯二", emoji: "🥂", meaning: "统一、伴侣关系、平等结合" },
  { name: "圣杯三", emoji: "🍻", meaning: "庆祝、友谊、社交聚会" },
  { name: "圣杯十", emoji: "🌈", meaning: "神圣的爱、家庭、和谐" },
  { name: "宝剑一", emoji: "🗡️", meaning: "突破、清晰、锐利的思想" },
  { name: "宝剑二", emoji: "盲", meaning: "僵局、困难的选择、逃避现实" },
  { name: "宝剑三", emoji: "💔", meaning: "心碎、悲痛、痛苦的分离" },
  { name: "宝剑十", emoji: "📌", meaning: "痛苦的结局、背叛、低谷" },
  { name: "星币一", emoji: "🪙", meaning: "新的财务机会、繁荣、物质" },
  { name: "星币二", emoji: "🤹", meaning: "平衡、适应能力、资金管理" },
  { name: "星币三", emoji: "🤝", meaning: "团队合作、专业的技能" },
  { name: "星币十", emoji: "🏡", meaning: "财富传承、家庭、长期成功" }
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

let currentSpreadLayout = []; let requiredCardsCount = 0; let cardsDrawn = 0; let drawnCardsData = []; let shuffledDeck = []; let isNightMode = false; let isMobile = false; let paymentPending = false;

window.onload = function() {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  checkNightMode(); initStarfield(); renderSpread();
};

function checkNightMode() {
  const hour = new Date().getHours();
  if (hour >= 22 || hour <= 4) {
    isNightMode = true; document.body.classList.add("night-mode");
    document.getElementById("mainTitle").innerText = "🌙 深夜星盘";
    document.getElementById("mainSubtitle").innerText = "夜深了，让星空安抚你疲惫的灵魂";
  }
}

function shuffle(array) {
  let cur = array.length, rnd;
  while (cur !== 0) { rnd = Math.floor(Math.random() * cur); cur--; [array[cur], array[rnd]] = [array[rnd], array[cur]]; }
  return array;
}

function renderSpread() {
  const spreadType = document.getElementById("spreadSelect").value;
  currentSpreadLayout = spreadsOptions[spreadType];
  requiredCardsCount = currentSpreadLayout.length;
  if(document.getElementById("cardsLeft")) document.getElementById("cardsLeft").innerText = requiredCardsCount;

  const container = document.getElementById("spreadContainer"); container.innerHTML = ""; 
  currentSpreadLayout.forEach((pos, index) => {
    container.innerHTML += `
      <div class="card-slot"><div class="slot-label" id="label-${index}">${pos.label}</div><div class="card" id="card-${index}">
      <div class="card-face card-back">✧</div><div class="card-face card-front"><div class="emoji" id="emoji-${index}">❓</div><div class="name" id="name-${index}">等待抽取</div></div></div></div>`;
  });
}

/* VIP 付费墙及移动端唤起微信逻辑 */
function checkVipAndStart() {
  const q = document.getElementById("questionInput").value.trim();
  if (!q) { alert("星空需要知道你的疑惑，请在上方输入问题。"); return; }
  
  if (requiredCardsCount > 3) {
    document.getElementById("vipModal").style.display = "flex";
    // 针对手机端和 PC 端显示不同的按钮
    if (isMobile) {
      document.getElementById("mobilePayBtn").style.display = "block";
      document.getElementById("pcPayBtn").style.display = "none";
    } else {
      document.getElementById("mobilePayBtn").style.display = "none";
      document.getElementById("pcPayBtn").style.display = "block";
    }
  } else {
    startShuffling(); 
  }
}

function closeVipModal() { document.getElementById("vipModal").style.display = "none"; paymentPending = false;}

// PC端用户自己扫码，点击确认
function pcPayFlow() {
  const btn = document.getElementById("pcPayBtn");
  btn.innerText = "🔄 正在核实能量交换..."; btn.disabled = true; btn.style.opacity = "0.7";
  setTimeout(() => { document.getElementById("vipModal").style.display = "none"; startShuffling(); }, 3500);
}

// 移动端：下载图片并尝试唤起微信
function mobilePayFlow() {
  const btn = document.getElementById("mobilePayBtn");
  const imgUrl = document.getElementById("qrImage").src;
  
  btn.innerText = "🔄 正在为您保存收款码并跳转微信...";
  paymentPending = true; // 标记用户正在支付

  // 1. 触发下载收款码到手机相册
  fetch(imgUrl).then(response => response.blob()).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.style.display = 'none'; a.href = url;
    a.download = '微信赞赏码.jpg';
    document.body.appendChild(a); a.click(); window.URL.revokeObjectURL(url);
    
    // 2. 尝试唤起微信
    setTimeout(() => {
      window.location.href = "weixin://";
      btn.innerText = "扫码完成后，请切回此页面";
    }, 1000);
  }).catch(() => {
    // 如果浏览器拦截了下载，就直接唤起微信
    window.location.href = "weixin://";
    btn.innerText = "请自行截图后前往微信扫码，完成后切回此页面";
  });
}

// 监听手机用户切回网页的动作，自动解锁！
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible' && paymentPending) {
    paymentPending = false;
    const btn = document.getElementById("mobilePayBtn");
    btn.innerText = "✅ 能量已接收，开启命运星盘...";
    btn.style.background = "#4CAF50";
    btn.style.color = "white";
    
    // 假装核对两秒钟然后放行
    setTimeout(() => {
      document.getElementById("vipModal").style.display = "none"; 
      startShuffling();
    }, 2000);
  }
});

/* 洗牌、冥想与划牌 */
function startShuffling() {
  document.getElementById("divinationSection").style.display = "none";
  document.getElementById("dailyEntrance").style.display = "none";
  playSound("drawSound"); 
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]); 
  const shuffleArea = document.getElementById("shuffleArea"); shuffleArea.style.display = "flex";
  setTimeout(() => { shuffleArea.style.display = "none"; startMeditation(); }, 3000);
}

function startMeditation() {
  const overlay = document.getElementById("meditationOverlay"); overlay.style.display = "flex";
  setTimeout(() => {
    overlay.style.display = "none"; document.getElementById("deckArea").style.display = "flex";
    cardsDrawn = 0; drawnCardsData = []; shuffledDeck = shuffle([...deck]);
    const fanDeck = document.getElementById("fanDeck"); fanDeck.innerHTML = "";
    const totalCards = 38; const angleStep = 120 / totalCards;
    for (let i = 0; i < totalCards; i++) {
      const angle = -60 + (i * angleStep);
      const cardEl = document.createElement("div"); cardEl.className = "deck-card"; cardEl.style.transform = `rotate(${angle}deg) translateY(-20px)`; cardEl.style.zIndex = i;
      cardEl.onclick = function() { if (cardsDrawn < requiredCardsCount && !this.classList.contains("drawn")) { userDrawsOneCard(this); } };
      fanDeck.appendChild(cardEl);
    }
  }, 4000); 
}

function userDrawsOneCard(clickedCardElement) {
  playSound("drawSound"); 
  if (navigator.vibrate) navigator.vibrate(50); 
  clickedCardElement.classList.add("drawn");
  const cardData = shuffledDeck.pop();
  const isReversed = Math.random() < 0.2; 
  const reversedText = isReversed ? " (逆位)" : " (正位)";

  drawnCardsData.push({ position: currentSpreadLayout[cardsDrawn].label, cardName: cardData.name + reversedText, meaning: cardData.meaning, isReversed: isReversed, emoji: cardData.emoji });
  const targetSlotCard = document.getElementById(`card-${cardsDrawn}`);
  targetSlotCard.classList.add("dealt");
  document.getElementById(`label-${cardsDrawn}`).classList.add("visible");
  cardsDrawn++; document.getElementById("cardsLeft").innerText = (requiredCardsCount - cardsDrawn);

  if (cardsDrawn === requiredCardsCount) { setTimeout(revealCardsAndRead, 1000); }
}

async function revealCardsAndRead() {
  document.getElementById("deckArea").style.display = "none"; 
  for (let i = 0; i < requiredCardsCount; i++) {
    await new Promise(r => setTimeout(r, 600)); 
    playSound("revealSound"); if (navigator.vibrate) navigator.vibrate(80); 
    const data = drawnCardsData[i];
    document.getElementById(`emoji-${i}`).innerText = data.emoji; document.getElementById(`name-${i}`).innerText = data.cardName;
    const cardElement = document.getElementById(`card-${i}`);
    cardElement.classList.add("flipped"); if(data.isReversed) cardElement.classList.add("reversed");
  }
  const question = document.getElementById("questionInput").value.trim();
  const userName = document.getElementById("nameInput").value.trim();
  document.getElementById("readingWrapper").style.display = "block"; document.getElementById("readingBox").classList.add("visible");
  await fetchStream(question, userName, drawnCardsData);
}

/* 流式输出解码 */
async function fetchStream(question, userName, cards) {
  const streamContent = document.getElementById("streamContent"); const cursor = document.getElementById("cursor");
  const loadingText = document.getElementById("loadingText"); streamContent.innerHTML = ""; let htmlBuffer = "";

  // 如果大模型回答太长需要滚动，我们让占星师动画一直存在
  const aiStatus = document.getElementById("aiStatus");
  if(aiStatus) aiStatus.style.display = "flex";

  try {
    const response = await fetch("/api/tarot", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, cards, userName, isNight: isNightMode })
    });
    if (!response.ok) throw new Error("宇宙网关拥堵，请稍后重试");
    loadingText.style.display = "none";
    const reader = response.body.getReader(); const decoder = new TextDecoder("utf-8");

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
            const data = JSON.parse(dataStr); const content = data.choices[0]?.delta?.content || ""; htmlBuffer += content;
            let displayHtml = htmlBuffer.replace(/```html/gi, '').replace(/```/g, '');
            streamContent.innerHTML = displayHtml;
            document.getElementById("readingWrapper").scrollIntoView({ behavior: 'smooth', block: 'end' });
          } catch (e) {}
        }
      }
    }
  } catch (error) { streamContent.innerHTML = `<span style="color:#ff6b6b">🔮 宇宙连接中断: ${error.message}</span>`;
  } finally {
    cursor.style.display = "none";
    if(aiStatus) aiStatus.style.display = "none"; // 隐藏大师头像
    document.getElementById("actionBtns").style.display = "flex";
  }
}

/* 7. 日签逻辑 */
async function startDailyDraw() {
  document.getElementById("mainContainer").style.display = "none";
  document.getElementById("dailyCardArea").style.display = "block";
  document.getElementById("dailyBtn").style.display = "none";

  const today = new Date(); document.getElementById("dailyDate").innerText = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`;
  const randomMajor = deck[Math.floor(Math.random() * 22)];
  document.getElementById("dailyEmoji").innerText = randomMajor.emoji; document.getElementById("dailyName").innerText = randomMajor.name;

  try {
    const response = await fetch("/api/tarot", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDaily: true, cards: [randomMajor] })
    });
    if (response.ok) {
      const data = await response.json(); document.getElementById("dailyQuote").innerText = `“${data.reading}”`;
    } else { document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”"; }
  } catch(e) { document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”"; }
  
  // 生成一个返回按钮
  const backBtn = document.createElement("button");
  backBtn.className = "save-btn restart"; backBtn.innerText = "返回命运星盘";
  backBtn.style.display = "block"; backBtn.style.margin = "30px auto";
  backBtn.onclick = () => window.location.reload();
  document.getElementById("dailyCardArea").appendChild(backBtn);
}

/* 音效与星空 */
let isMusicPlaying = false;
function toggleMusic() {
  const bgMusic = document.getElementById("bgMusic"); const btn = document.getElementById("musicToggle");
  if (isMusicPlaying) { bgMusic.pause(); btn.innerText = "🎵 灵性环境音"; } else { bgMusic.volume = 0.4; let p = bgMusic.play(); if(p!==undefined){p.catch(e=>{});} btn.innerText = "🔇 关闭环境音"; }
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

/* 高端海报生成 */
function generateHighEndPoster() {
  const captureArea = document.getElementById("posterCaptureArea");
  
  // 1. 把当前的数据填入隐藏的海报模板中
  document.getElementById("posterQuestion").innerText = "疑惑：" + document.getElementById("questionInput").value.trim();
  
  const posterCards = document.getElementById("posterCards");
  posterCards.innerHTML = "";
  drawnCardsData.forEach(card => {
    posterCards.innerHTML += `
      <div class="poster-card">
         <div class="emoji">${card.emoji}</div>
         <div class="name">${card.cardName.replace(' ', '<br>')}</div>
      </div>
    `;
  });
  
  // 提取大模型回答里的第一句话作为金句
  const fullText = document.getElementById("streamContent").innerText;
  const firstSentence = fullText.split('。')[0] + "。";
  document.getElementById("posterQuote").innerText = `“${firstSentence}”`;

  const btn = document.getElementById("saveBtn");
  btn.innerText = "正在生成..."; btn.disabled = true;
  
  // 显示出来但藏在屏幕外，让 html2canvas 能截到
  captureArea.style.top = "0"; captureArea.style.left = "0"; captureArea.style.position = "relative";
  
  html2canvas(captureArea, { scale: 2, useCORS: true, backgroundColor: "#1a1a2e" }).then(canvas => {
    // 恢复原状
    captureArea.style.position = "absolute"; captureArea.style.top = "-9999px"; captureArea.style.left = "-9999px";
    btn.innerText = "📸 保存专属命运海报"; btn.disabled = false;
    const link = document.createElement("a"); link.download = "命运星盘海报.png"; link.href = canvas.toDataURL("image/png"); link.click();
  });
}