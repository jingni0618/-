const deck = [
  { name: "愚者", emoji: "🚶‍♂️", meaning: "新的开始、自发性、信念的飞跃" }, { name: "魔术师", emoji: "🪄", meaning: "创造力、技能、意志力" }, { name: "女祭司", emoji: "🌙", meaning: "直觉、潜意识、神秘" }, { name: "女皇", emoji: "👑", meaning: "丰收、母性、自然" }, { name: "皇帝", emoji: "🏰", meaning: "权威、结构、稳定" }, { name: "教皇", emoji: "📜", meaning: "传统、信仰、指引" }, { name: "恋人", emoji: "❤️", meaning: "爱、和谐、关系" }, { name: "战车", emoji: " रथ", meaning: "控制、意志力、行动" }, { name: "力量", emoji: "🦁", meaning: "勇气、耐心、温柔" }, { name: "隐士", emoji: "🏮", meaning: "灵魂探索、孤独、内省" }, { name: "命运之轮", emoji: "🎡", meaning: "好运、业力、转折点" }, { name: "正义", emoji: "⚖️", meaning: "公平、真相、因果" }, { name: "倒吊人", emoji: "🦇", meaning: "暂停、放手、换视角" }, { name: "死神", emoji: "💀", meaning: "结束、转变、重生" }, { name: "节制", emoji: "⛲", meaning: "平衡、中庸、耐心" }, { name: "恶魔", emoji: "👿", meaning: "沉迷、物质主义、束缚" }, { name: "高塔", emoji: "⚡", meaning: "突变、混乱、崩塌" }, { name: "星星", emoji: "⭐", meaning: "希望、信念、治愈" }, { name: "月亮", emoji: "🌖", meaning: "幻觉、恐惧、潜意识" }, { name: "太阳", emoji: "☀️", meaning: "积极、活力、成功" }, { name: "审判", emoji: "📯", meaning: "重生、呼唤、宽恕" }, { name: "世界", emoji: "🌍", meaning: "完成、整合、圆满" },
  { name: "权杖一", emoji: "🔥", meaning: "灵感、新机会" }, { name: "权杖二", emoji: "🗺️", meaning: "未来规划、决策" }, { name: "权杖三", emoji: "🚢", meaning: "远见、探索" }, { name: "权杖十", emoji: "🪵", meaning: "重担、压力" },
  { name: "圣杯一", emoji: "💧", meaning: "纯粹的爱、同情" }, { name: "圣杯二", emoji: "🥂", meaning: "统一、伴侣关系" }, { name: "圣杯三", emoji: "🍻", meaning: "庆祝、友谊" }, { name: "圣杯十", emoji: "🌈", meaning: "神圣的爱、家庭" },
  { name: "宝剑一", emoji: "🗡️", meaning: "突破、清晰的思想" }, { name: "宝剑二", emoji: "盲", meaning: "僵局、困难的选择" }, { name: "宝剑三", emoji: "💔", meaning: "心碎、痛苦的分离" }, { name: "宝剑十", emoji: "📌", meaning: "痛苦的结局、低谷" },
  { name: "星币一", emoji: "🪙", meaning: "新的财务机会" }, { name: "星币二", emoji: "🤹", meaning: "平衡、资金管理" }, { name: "星币三", emoji: "🤝", meaning: "团队合作、技能" }, { name: "星币十", emoji: "🏡", meaning: "财富传承、长期成功" }
];

const spreadsOptions = {
  single: [{ label: "核心指引" }], yesno: [{ label: "支持的力量" }, { label: "反对的力量" }, { label: "最终的答案" }], time: [{ label: "过去的因果" }, { label: "当下的现状" }, { label: "未来的趋势" }],
  relationship: [{ label: "你的现状" }, { label: "对方的状态" }, { label: "当前的阻碍" }, { label: "未来的走向" }], career: [{ label: "事业现状" }, { label: "潜在机遇" }, { label: "未知风险" }, { label: "财务走向" }],
  choice: [{ label: "当前现状" }, { label: "选择A的过程" }, { label: "选择B的过程" }, { label: "选择A的结局" }, { label: "选择B的结局" }], cross: [{ label: "当下的核心问题" }, { label: "面临的阻碍" }, { label: "潜在的目标" }, { label: "深层的潜意识" }, { label: "最终的结局" }]
};

let currentSpreadLayout = []; let requiredCardsCount = 0; let cardsDrawn = 0; let cardsFlipped = 0; let drawnCardsData = []; let shuffledDeck = []; let userSoulCard = null; let isMobile = false; let paymentPending = false; let isMusicPlaying = false;

window.onload = function() {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  initStarfield(); renderSpread();
};

function shuffle(array) { let cur = array.length, rnd; while (cur !== 0) { rnd = Math.floor(Math.random() * cur); cur--; [array[cur], array[rnd]] = [array[rnd], array[cur]]; } return array; }

function renderSpread() {
  const spreadType = document.getElementById("spreadSelect").value;
  currentSpreadLayout = spreadsOptions[spreadType]; requiredCardsCount = currentSpreadLayout.length;
  if(document.getElementById("cardsLeft")) document.getElementById("cardsLeft").innerText = requiredCardsCount;

  const container = document.getElementById("spreadContainer"); container.innerHTML = ""; 
  currentSpreadLayout.forEach((pos, index) => {
    container.innerHTML += `<div class="card-slot"><div class="slot-label" id="label-${index}">${pos.label}</div><div class="card" id="card-${index}"><div class="card-face card-back">✧</div><div class="card-face card-front"><div class="emoji" id="emoji-${index}">❓</div><div class="name" id="name-${index}">等待抽取</div></div></div></div>`;
  });
}

/* 4. 灵魂卡牌计算 */
function calculateSoulCard() {
  const input = document.getElementById("birthInput").value.trim();
  if(!/^\d{8}$/.test(input)) { alert("请严格输入8位数字，如 19950821"); return; }
  let sum = 0; for(let char of input) sum += parseInt(char);
  while(sum > 22) { let temp = 0; for(let char of sum.toString()) temp += parseInt(char); sum = temp; }
  if(sum === 22) sum = 0; // 愚者映射为0
  userSoulCard = deck[sum];
  const resBox = document.getElementById("soulCardResult");
  resBox.innerHTML = `🔮 你的灵魂卡牌是：<strong>${userSoulCard.name}</strong><br><span style="font-size:12px; color:#8e8579;">AI 将在解盘时融入你的灵魂特质</span>`;
  resBox.style.display = "block";
}

function forcePlayMusic() {
  if (!isMusicPlaying) { const bgMusic = document.getElementById("bgMusic"); bgMusic.volume = 0.4; let p = bgMusic.play(); if (p !== undefined) { p.then(_ => { isMusicPlaying = true; document.getElementById("musicToggle").innerText = "🔇 静音"; }).catch(e => {}); } }
}
function playSound(id) { const audio = document.getElementById(id); audio.currentTime = 0; audio.volume = 0.7; audio.play().catch(e => {}); }

/* VIP 墙 */
function checkVipAndStart() {
  const q = document.getElementById("questionInput").value.trim();
  if (!q) { alert("请先输入问题，星空才能为你指引。"); return; }
  if (requiredCardsCount > 3) {
    document.getElementById("vipModal").style.display = "flex";
    if (isMobile) { document.getElementById("mobilePayBtn").style.display = "block"; document.getElementById("pcPayBtn").style.display = "none"; } else { document.getElementById("mobilePayBtn").style.display = "none"; document.getElementById("pcPayBtn").style.display = "block"; }
  } else { startShuffling(); }
}
function closeVipModal() { document.getElementById("vipModal").style.display = "none"; paymentPending = false;}
function pcPayFlow() { const btn = document.getElementById("pcPayBtn"); btn.innerText = "🔄 核实中..."; btn.disabled = true; setTimeout(() => { closeVipModal(); startShuffling(); }, 3500); }
function mobilePayFlow() {
  const btn = document.getElementById("mobilePayBtn"); const imgUrl = document.getElementById("qrImage").src;
  btn.innerText = "🔄 正在为您跳转微信..."; paymentPending = true; 
  fetch(imgUrl).then(res => res.blob()).then(blob => {
    const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.style.display = 'none'; a.href = url; a.download = '微信赞赏码.jpg'; document.body.appendChild(a); a.click(); window.URL.revokeObjectURL(url);
    setTimeout(() => { window.location.href = "weixin://"; btn.innerText = "扫码完成后，请切回此页面"; }, 1000);
  }).catch(() => { window.location.href = "weixin://"; btn.innerText = "请自行截图后前往微信扫码，完成后切回"; });
}
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible' && paymentPending) {
    paymentPending = false; const btn = document.getElementById("mobilePayBtn"); btn.innerText = "✅ 能量已接收..."; btn.style.background = "#c5a059"; btn.style.color = "#000";
    setTimeout(() => { closeVipModal(); startShuffling(); }, 2000);
  }
});

/* 6. 沉浸式隐退 UI -> 洗牌 -> 冥想 -> 划牌 */
function startShuffling() {
  forcePlayMusic();
  // 核心：全屏沉浸，让顶部导航、输入框等消失
  document.getElementById("uiElements").classList.add("fade-out");
  
  setTimeout(() => {
    playSound("drawSound"); if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]); 
    const shuffleArea = document.getElementById("shuffleArea"); shuffleArea.style.display = "flex";
    setTimeout(() => { shuffleArea.style.display = "none"; startMeditation(); }, 3000);
  }, 1000); // 等待 UI 消失完毕
}

function startMeditation() {
  const overlay = document.getElementById("meditationOverlay"); overlay.style.display = "flex";
  setTimeout(() => {
    overlay.style.display = "none"; document.getElementById("deckArea").style.display = "flex";
    cardsDrawn = 0; cardsFlipped = 0; drawnCardsData = []; shuffledDeck = shuffle([...deck]);
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
  playSound("drawSound"); if (navigator.vibrate) navigator.vibrate(50); 
  clickedCardElement.classList.add("drawn");
  const cardData = shuffledDeck.pop();
  const isReversed = Math.random() < 0.2; const reversedText = isReversed ? " (逆位)" : " (正位)";

  drawnCardsData.push({ position: currentSpreadLayout[cardsDrawn].label, cardName: cardData.name + reversedText, meaning: cardData.meaning, isReversed: isReversed, emoji: cardData.emoji });
  const targetSlotCard = document.getElementById(`card-${cardsDrawn}`);
  targetSlotCard.classList.add("dealt");
  document.getElementById(`label-${cardsDrawn}`).classList.add("visible");
  cardsDrawn++; document.getElementById("cardsLeft").innerText = (requiredCardsCount - cardsDrawn);

  // 5. 抽满后，进入“手动点击揭秘”阶段
  if (cardsDrawn === requiredCardsCount) { 
    setTimeout(() => {
      document.getElementById("deckArea").style.display = "none"; 
      document.getElementById("revealInstruction").style.display = "block";
      // 给每张已发的牌绑定翻面事件
      for(let i=0; i<requiredCardsCount; i++) {
        const cEl = document.getElementById(`card-${i}`);
        cEl.onclick = function() { userFlipsCard(i); };
      }
    }, 1000); 
  }
}

// 5. 用户亲手逐一点开牌
function userFlipsCard(i) {
  const cardElement = document.getElementById(`card-${i}`);
  if(cardElement.classList.contains("flipped")) return; // 防止重复点击

  playSound("revealSound"); if (navigator.vibrate) navigator.vibrate(80); 
  const data = drawnCardsData[i];
  document.getElementById(`emoji-${i}`).innerText = data.emoji; 
  document.getElementById(`name-${i}`).innerText = data.cardName;
  cardElement.classList.add("flipped"); 
  if(data.isReversed) cardElement.classList.add("reversed");
  
  cardsFlipped++;
  // 如果所有牌都翻开了，触发 AI
  if (cardsFlipped === requiredCardsCount) {
    document.getElementById("revealInstruction").style.display = "none";
    const question = document.getElementById("questionInput").value.trim();
    const userName = document.getElementById("nameInput") ? document.getElementById("nameInput").value.trim() : "";
    document.getElementById("readingWrapper").style.display = "block"; document.getElementById("readingBox").classList.add("visible");
    fetchStream(question, userName, drawnCardsData);
  }
}

/* 流式输出解码 */
async function fetchStream(question, userName, cards) {
  const streamContent = document.getElementById("streamContent"); const cursor = document.getElementById("cursor"); const loadingText = document.getElementById("loadingText"); 
  streamContent.innerHTML = ""; let htmlBuffer = "";
  const aiStatus = document.getElementById("aiStatus"); if(aiStatus) aiStatus.style.display = "flex";

  try {
    const response = await fetch("/api/tarot", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question, cards: cards, userName: userName, soulCard: userSoulCard, isNight: false })
    });
    if (!response.ok) throw new Error("宇宙网关拥堵，请稍后重试");
    
    loadingText.style.display = "none";
    const reader = response.body.getReader(); const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      const chunk = decoder.decode(value, { stream: true }); const lines = chunk.split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        if (line.includes('[DONE]')) continue;
        if (line.startsWith('data: ')) {
          try {
            const dataStr = line.replace('data: ', '');
            if(dataStr.startsWith('[ERROR]')) { streamContent.innerHTML += `<br><span style="color:#ff6b6b">${dataStr}</span>`; continue; }
            const data = JSON.parse(dataStr); const content = data.choices[0]?.delta?.content || ""; htmlBuffer += content;
            streamContent.innerHTML = htmlBuffer.replace(/```html/gi, '').replace(/```/g, '');
            document.getElementById("readingWrapper").scrollIntoView({ behavior: 'smooth', block: 'end' });
          } catch (e) {}
        }
      }
    }
  } catch (error) { streamContent.innerHTML = `<span style="color:#ff6b6b">🔮 宇宙连接中断: ${error.message}</span>`;
  } finally {
    cursor.style.display = "none"; if(aiStatus) aiStatus.style.display = "none"; 
    const actionBtns = document.getElementById("actionBtns");
    if(actionBtns) { actionBtns.style.display = "flex"; }
  }
}

/* 日签逻辑 */
async function startDailyDraw() {
  forcePlayMusic();
  document.getElementById("uiElements").style.display = "none";
  document.getElementById("dailyCardArea").style.display = "block";

  const today = new Date(); document.getElementById("dailyDate").innerText = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`;
  const randomMajor = deck[Math.floor(Math.random() * 22)];
  document.getElementById("dailyEmoji").innerText = randomMajor.emoji; document.getElementById("dailyName").innerText = randomMajor.name;

  try {
    const response = await fetch("/api/tarot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isDaily: true, cards: [randomMajor] }) });
    if (response.ok) { const data = await response.json(); document.getElementById("dailyQuote").innerText = `“${data.reading}”`; } 
    else { document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”"; }
  } catch(e) { document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”"; }
  
  const backBtn = document.createElement("button");
  backBtn.className = "save-btn restart"; backBtn.innerText = "返回命运星盘"; backBtn.style.display = "block"; backBtn.style.margin = "30px auto";
  backBtn.onclick = () => window.location.reload();
  document.getElementById("dailyCardArea").appendChild(backBtn);
}

function toggleMusic() {
  const bgMusic = document.getElementById("bgMusic"); const btn = document.getElementById("musicToggle");
  if (isMusicPlaying) { bgMusic.pause(); btn.innerText = "🎵 灵性环境音"; } else { bgMusic.volume = 0.4; let p = bgMusic.play(); if(p !== undefined) { p.then(_ => { btn.innerText = "🔇 静音"; }).catch(e => {}); } }
  isMusicPlaying = !isMusicPlaying;
}

function initStarfield() {
  const canvas = document.getElementById('starfield'); const ctx = canvas.getContext('2d'); let width, height, stars = [];
  function resize() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; initStars(); }
  function initStars() { stars = []; const numStars = window.innerWidth < 768 ? 80 : 150; for (let i = 0; i < numStars; i++) { stars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5, vx: Math.floor(Math.random() * 50) - 25, vy: Math.floor(Math.random() * 50) - 25, opacity: Math.random() }); } }
  function draw() { ctx.clearRect(0, 0, width, height); for (let star of stars) { star.x += star.vx / 100; star.y += star.vy / 100; if (star.x < 0 || star.x > width) star.vx = -star.vx; if (star.y < 0 || star.y > height) star.vy = -star.vy; star.opacity += (Math.random() - 0.5) * 0.1; star.opacity = Math.max(0.1, Math.min(1, star.opacity)); ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI); ctx.fillStyle = `rgba(197, 160, 89, ${star.opacity})`; ctx.fill(); } requestAnimationFrame(draw); }
  window.addEventListener('resize', resize); resize(); draw();
}

function saveAsImage() {
  const captureArea = document.getElementById("captureArea");
  document.getElementById("shareHeader").style.display = "block"; 
  document.getElementById("saveBtn").innerText = "正在生成..."; document.getElementById("saveBtn").disabled = true;
  
  html2canvas(captureArea, { scale: 2, useCORS: true, backgroundColor: "#0a0a0c" }).then(canvas => {
    document.getElementById("shareHeader").style.display = "none"; 
    document.getElementById("saveBtn").innerText = "📸 保存羊皮卷轴"; document.getElementById("saveBtn").disabled = false;
    const link = document.createElement("a"); link.download = "塔罗启示.png"; link.href = canvas.toDataURL("image/png"); link.click();
  });
}
