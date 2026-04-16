const deck = [
  { name: "愚者", emoji: "🚶‍♂️", meaning: "新的开始、自发性、信念的飞跃" }, { name: "魔术师", emoji: "🪄", meaning: "创造力、技能、意志力" }, { name: "女祭司", emoji: "🌙", meaning: "直觉、潜意识、神秘" }, { name: "女皇", emoji: "👑", meaning: "丰收、母性、自然" }, { name: "皇帝", emoji: "🏰", meaning: "权威、结构、稳定" }, { name: "教皇", emoji: "📜", meaning: "传统、信仰、指引" }, { name: "恋人", emoji: "❤️", meaning: "爱、和谐、关系" }, { name: "战车", emoji: " रथ", meaning: "控制、意志力、行动" }, { name: "力量", emoji: "🦁", meaning: "勇气、耐心、温柔" }, { name: "隐士", emoji: "🏮", meaning: "灵魂探索、孤独、内省" }, { name: "命运之轮", emoji: "🎡", meaning: "好运、业力、转折点" }, { name: "正义", emoji: "⚖️", meaning: "公平、真相、因果" }, { name: "倒吊人", emoji: "🦇", meaning: "暂停、放手、换视角" }, { name: "死神", emoji: "💀", meaning: "结束、转变、彻底重生" }, { name: "节制", emoji: "⛲", meaning: "平衡、中庸、耐心" }, { name: "恶魔", emoji: "👿", meaning: "沉迷、物质主义、束缚" }, { name: "高塔", emoji: "⚡", meaning: "突变、混乱、崩塌" }, { name: "星星", emoji: "⭐", meaning: "希望、信念、治愈" }, { name: "月亮", emoji: "🌖", meaning: "幻觉、恐惧、潜意识" }, { name: "太阳", emoji: "☀️", meaning: "积极、活力、成功" }, { name: "审判", emoji: "📯", meaning: "重生、呼唤、宽恕" }, { name: "世界", emoji: "🌍", meaning: "完成、整合、圆满" },
  { name: "权杖一", emoji: "🔥", meaning: "灵感、新机会" }, { name: "权杖二", emoji: "🗺️", meaning: "未来规划、决策" }, { name: "权杖三", emoji: "🚢", meaning: "远见、探索" }, { name: "权杖十", emoji: "🪵", meaning: "重担、压力" },
  { name: "圣杯一", emoji: "💧", meaning: "纯粹的爱、同情" }, { name: "圣杯二", emoji: "🥂", meaning: "统一、伴侣关系" }, { name: "圣杯三", emoji: "🍻", meaning: "庆祝、友谊" }, { name: "圣杯十", emoji: "🌈", meaning: "神圣的爱、家庭" },
  { name: "宝剑一", emoji: "🗡️", meaning: "突破、清晰的思想" }, { name: "宝剑二", emoji: "盲", meaning: "僵局、困难的选择" }, { name: "宝剑三", emoji: "💔", meaning: "心碎、痛苦的分离" }, { name: "宝剑十", emoji: "📌", meaning: "痛苦的结局、低谷" },
  { name: "星币一", emoji: "🪙", meaning: "新的财务机会" }, { name: "星币二", emoji: "🤹", meaning: "平衡、资金管理" }, { name: "星币三", emoji: "🤝", meaning: "团队合作、技能" }, { name: "星币十", emoji: "🏡", meaning: "财富传承、长期成功" }
];

const spreadsOptions = {
  single: { cssClass: 'linear', cards: [{ label: "核心指引" }] },
  yesno: { cssClass: 'linear', cards: [{ label: "支持的力量" }, { label: "反对的力量" }, { label: "最终答案" }] },
  time: { cssClass: 'linear', cards: [{ label: "过去的因果" }, { label: "当下的现状" }, { label: "未来的趋势" }] },
  relationship: { cssClass: 'grid', cards: [{ label: "你的现状" }, { label: "对方的状态" }, { label: "当前的阻碍" }, { label: "未来的走向" }] },
  career: { cssClass: 'grid', cards: [{ label: "事业现状" }, { label: "潜在机遇" }, { label: "未知风险" }, { label: "财务走向" }] },
  choice: { cssClass: 'cross', cards: [{ label: "当前现状" }, { label: "选A的走向" }, { label: "选B的走向" }, { label: "选A结局" }, { label: "选B结局" }] },
  cross: { cssClass: 'cross', cards: [{ label: "核心问题" }, { label: "面临的阻碍" }, { label: "潜在的目标" }, { label: "深层的潜意识" }, { label: "最终的可能结局" }] }
};

let currentSpreadConfig = {}; let requiredCardsCount = 0; let cardsDrawn = 0; let cardsFlipped = 0; let drawnCardsData = []; let shuffledDeck = []; let userSoulCard = null; let isMobile = false; let paymentPending = false; let paymentConfirmed = false; let isMusicPlaying = false; let isNightMode = false; let historyRecords = [];

window.onload = function() {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  checkNightMode(); initStarfield(); renderSpread(); loadHistory(); updateStatus("请选择占卜方式：直觉速取或深度问卜");
  
  const introStr = isNightMode ? "亲爱的旅人，夜深了。\n闭上眼，告诉我你心中的困惑..." : "亲爱的旅人，欢迎来到命运星盘。\n深呼吸，告诉我你最想问的是什么...";
  let i = 0;
  function typeIntro() {
    if(i < introStr.length) {
      document.getElementById('introText').innerText += introStr.charAt(i); i++; setTimeout(typeIntro, 80);
    } else {
      setTimeout(() => {
        document.getElementById('introScreen').style.opacity = 0;
        setTimeout(()=> { document.getElementById('introScreen').style.display = 'none'; document.getElementById('uiElements').style.opacity = 1; }, 1500);
      }, 1500);
    }
  }
  typeIntro();
};

function checkNightMode() {
  const hour = new Date().getHours();
  if (hour >= 22 || hour <= 4) {
    isNightMode = true;
    document.body.classList.add("night-mode");
    document.getElementById("mainSubtitle").innerText = "夜深星象更清晰，静心倾听宇宙。";
  }
}

function updateStatus(text) {
  const banner = document.getElementById("statusBanner"); if (banner) banner.innerText = text;
}

function saveHistory() { localStorage.setItem("tarotHistory", JSON.stringify(historyRecords)); }
function loadHistory() {
  const raw = localStorage.getItem("tarotHistory");
  if (raw) {
    try { historyRecords = JSON.parse(raw).slice(0, 6); } catch (e) { historyRecords = []; }
  }
  renderHistory();
}
function addHistoryRecord(record) {
  historyRecords.unshift(record); historyRecords = historyRecords.slice(0, 6); saveHistory(); renderHistory();
}
function renderHistory() {
  const aside = document.querySelector(".aside-panel");
  const card = document.getElementById("historyCardArea");
  const list = document.getElementById("historyList");
  if (!aside || !card || !list) return;
  list.innerHTML = "";
  if (historyRecords.length === 0) {
    card.style.display = "none";
    aside.style.display = "none";
    return;
  }
  aside.style.display = "flex";
  card.style.display = "block";
  historyRecords.forEach(r => {
    const item = document.createElement("div"); item.className = "history-item";
    const title = document.createElement("div"); title.textContent = `${r.mode} · ${r.spread} · ${r.date}`;
    const detail = document.createElement("span"); detail.textContent = `问题：${r.question || '未输入'} · 风格：${r.style}`;
    item.appendChild(title);
    item.appendChild(detail);
    list.appendChild(item);
  });
}
function clearHistory() { historyRecords = []; saveHistory(); renderHistory(); updateStatus("记录已清空，重新开始你的占卜旅程。"); }

function copyReadingText() {
  const content = document.getElementById("streamContent"); if (!content) return;
  const text = content.innerText.trim();
  if (!text) { alert("当前还没有解读内容可复制。"); return; }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => { alert("解读已复制，快分享到你的灵魂圈子。"); }).catch(() => { prompt("请复制以下内容：", text); });
  } else { prompt("请复制以下内容：", text); }
}

function shuffle(array) { let cur = array.length, rnd; while (cur !== 0) { rnd = Math.floor(Math.random() * cur); cur--; [array[cur], array[rnd]] = [array[rnd], array[cur]]; } return array; }
function forcePlayMusic() { if (!isMusicPlaying) { const bgMusic = document.getElementById("bgMusic"); bgMusic.volume = 0.4; let p = bgMusic.play(); if (p !== undefined) { p.then(_ => { isMusicPlaying = true; document.getElementById("musicToggle").innerText = "🔇 静音"; }).catch(e => {}); } } }
function playSound(id) { const audio = document.getElementById(id); audio.currentTime = 0; audio.volume = 0.4; audio.play().catch(e => {}); }

function calculateSoulCard() {
  const input = document.getElementById("birthInput").value.trim();
  if(!/^\d{8}$/.test(input)) { alert("请输入连续8位数字，如 19950821"); return; }
  let sum = 0; for(let char of input) sum += parseInt(char);
  while(sum > 22) { let temp = 0; for(let char of sum.toString()) temp += parseInt(char); sum = temp; }
  if(sum === 22) sum = 0; userSoulCard = deck[sum];
  const resBox = document.getElementById("soulCardResult");
  resBox.innerHTML = `🔮 灵魂本命牌：<strong>${userSoulCard.name}</strong><br><span style="font-size:12px; color:#8e8579;">大师将在解盘时融入你的灵魂底色。</span>`;
  resBox.style.display = "block";
}

/* 核心修复：渲染空卡牌，默认先隐藏（display:none），冥想结束后才出现 */
function renderSpread() {
  const spreadType = document.getElementById("spreadSelect").value;
  currentSpreadConfig = spreadsOptions[spreadType]; requiredCardsCount = currentSpreadConfig.cards.length;
  
  const container = document.getElementById("spreadContainer"); container.innerHTML = ""; 
  container.className = `spread-container layout-${currentSpreadConfig.cssClass}`;
  
  currentSpreadConfig.cards.forEach((pos, index) => {
    container.innerHTML += `<div class="card-slot" id="slot-${index}"><div class="slot-label" id="label-${index}">${pos.label}</div><div class="card" id="card-${index}"><div class="card-face card-back">✧</div><div class="card-face card-front"><div class="emoji" id="emoji-${index}">❓</div><div class="name" id="name-${index}">等待抽取</div></div></div></div>`;
  });
}

function checkVipAndStart(requireQuestion = true) {
  const q = document.getElementById("questionInput").value.trim();
  if (requireQuestion && !q) { alert("请先输入你的问题，星空才能回应。" ); return; }
  updateStatus("准备进入深度问卜...");
  if (requiredCardsCount > 3 && !paymentConfirmed) {
    document.getElementById("vipModal").style.display = "flex";
    updateStatus("高级牌阵需要解锁，赞赏后即可继续测算。");
    if (isMobile) { document.getElementById("mobilePayBtn").style.display = "block"; document.getElementById("pcPayBtn").style.display = "none"; } else { document.getElementById("mobilePayBtn").style.display = "none"; document.getElementById("pcPayBtn").style.display = "block"; }
    return;
  }
  showEnergyEffect(requiredCardsCount > 3 && paymentConfirmed);
}

function quickDrawSingleCard() {
  document.getElementById("spreadSelect").value = "single";
  renderSpread();
  updateStatus("直觉速取准备中，抽取你的灵感之牌...");
  showEnergyEffect();
}

function closeVipModal() { document.getElementById("vipModal").style.display = "none"; paymentPending = false; }
function pcPayFlow() { const btn = document.getElementById("pcPayBtn"); btn.innerText = "🔄 核实中..."; btn.disabled = true; setTimeout(() => { paymentConfirmed = true; closeVipModal(); showEnergyEffect(true); }, 3500); }
function mobilePayFlow() {
  const btn = document.getElementById("mobilePayBtn"); const imgUrl = document.getElementById("qrImage").src; btn.innerText = "🔄 正在跳转微信..."; paymentPending = true;
  fetch(imgUrl).then(res => res.blob()).then(blob => {
    const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.style.display = 'none'; a.href = url; a.download = '命运星盘扫码二维码.jpg'; document.body.appendChild(a); a.click(); window.URL.revokeObjectURL(url);
    setTimeout(() => { window.location.href = "weixin://"; btn.innerText = "扫码完成后请切回"; }, 1000);
  }).catch(() => { window.location.href = "weixin://"; btn.innerText = "请自行截图前往微信"; });
}
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible' && paymentPending) {
    paymentPending = false; paymentConfirmed = true; document.getElementById("mobilePayBtn").innerText = "✅ 能量已接收...";
    setTimeout(() => { closeVipModal(); showEnergyEffect(true); }, 2000);
  }
});

function showEnergyEffect(isVip = false) {
  forcePlayMusic();
  document.getElementById("uiElements").classList.add("fade-out");
  updateStatus("灵感正在凝聚，片刻后进入占卜仪式...");
  const energyText = document.getElementById("energyText");
  energyText.innerText = isVip ? "能量已接收...深层的因果锁链已被解开" : "灵感已汇聚...星盘开始转动";
  energyText.style.display = "block";

  const spreadContainer = document.getElementById("spreadContainer");
  if (spreadContainer) {
      spreadContainer.style.display = "flex";
      spreadContainer.style.opacity = "0";
  }

  setTimeout(() => {
    energyText.style.display = "none";
    playSound("drawSound"); if (navigator.vibrate) navigator.vibrate([100, 50, 100]); 
    const shuffleArea = document.getElementById("shuffleArea"); shuffleArea.style.display = "flex";
    setTimeout(() => { shuffleArea.style.display = "none"; document.getElementById("deckArea").style.display = "flex"; initFanDeck(); }, 2500);
  }, 3500);
}

function initFanDeck() {
  cardsDrawn = 0; cardsFlipped = 0; drawnCardsData = []; shuffledDeck = shuffle([...deck]);
  const fanDeck = document.getElementById("fanDeck"); fanDeck.innerHTML = "";
  const totalCards = 38; const angleStep = 120 / totalCards;
  document.getElementById("cardsLeft").innerText = requiredCardsCount;
  updateStatus(`请点击牌面抽取 ${requiredCardsCount} 张牌`);
  for (let i = 0; i < totalCards; i++) {
    const angle = -60 + (i * angleStep);
    const cardEl = document.createElement("div"); cardEl.className = "deck-card"; cardEl.style.transform = `rotate(${angle}deg) translateY(-20px)`; cardEl.style.zIndex = i;
    cardEl.onclick = function() { if (cardsDrawn < requiredCardsCount && !this.classList.contains("drawn")) { userDrawsOneCard(this); } };
    fanDeck.appendChild(cardEl);
  }
  
  const spreadContainer = document.getElementById("spreadContainer");
  if(spreadContainer) {
      spreadContainer.style.opacity = "1";
  }
}

function userDrawsOneCard(clickedCardElement) {
  playSound("drawSound"); if (navigator.vibrate) navigator.vibrate(50); 
  clickedCardElement.classList.add("drawn");
  const cardData = shuffledDeck.pop();
  const isReversed = Math.random() < 0.2; const reversedText = isReversed ? " (逆位)" : " (正位)";

  drawnCardsData.push({ position: currentSpreadConfig.cards[cardsDrawn].label, cardName: cardData.name + reversedText, meaning: cardData.meaning, isReversed: isReversed, emoji: cardData.emoji });
  const targetSlotCard = document.getElementById(`card-${cardsDrawn}`);
  targetSlotCard.classList.add("dealt"); document.getElementById(`label-${cardsDrawn}`).classList.add("visible");
  cardsDrawn++; document.getElementById("cardsLeft").innerText = (requiredCardsCount - cardsDrawn);
  updateStatus(`已抽取 ${cardsDrawn} 张，还需抽取 ${requiredCardsCount - cardsDrawn} 张`);

  if (cardsDrawn === requiredCardsCount) { 
    setTimeout(() => {
      document.getElementById("deckArea").style.display = "none"; 
      document.getElementById("revealInstruction").style.display = "block";
      updateStatus("牌已到位，依次点击牌背揭晓答案。");
      for(let i=0; i<requiredCardsCount; i++) { document.getElementById(`card-${i}`).onclick = function() { userFlipsCard(i); }; }
    }, 1000); 
  }
}

function userFlipsCard(i) {
  const cardElement = document.getElementById(`card-${i}`);
  if(cardElement.classList.contains("flipped")) return; 

  playSound("revealSound"); if (navigator.vibrate) navigator.vibrate(80); 
  const data = drawnCardsData[i];
  document.getElementById(`emoji-${i}`).innerText = data.emoji; document.getElementById(`name-${i}`).innerText = data.cardName;
  cardElement.classList.add("flipped"); if(data.isReversed) cardElement.classList.add("reversed");
  
  cardsFlipped++;
  if (cardsFlipped === requiredCardsCount) {
    document.getElementById("revealInstruction").style.display = "none";
    updateStatus("牌已揭晓，正在生成个人化占卜解读...");
    const question = document.getElementById("questionInput").value.trim();
    const style = document.getElementById("styleSelect").value;
    const userName = document.getElementById("nameInput") ? document.getElementById("nameInput").value.trim() : "";
    document.getElementById("readingWrapper").style.display = "block"; document.getElementById("readingBox").classList.add("visible");
    fetchStream(question, style, userName, drawnCardsData);
  }
}

/* 流式输出解码 */
async function fetchStream(question, style, userName, cards) {
  const streamContent = document.getElementById("streamContent"); const cursor = document.getElementById("cursor");
  streamContent.innerHTML = ""; let htmlBuffer = "";
  const aiStatus = document.getElementById("aiStatus"); if(aiStatus) aiStatus.style.display = "flex";
  let historyRecord = null;

  try {
    const response = await fetch("/api/tarot", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question, cards: cards, readingStyle: style, userName: userName, soulCard: userSoulCard, isNight: isNightMode })
    });
    if (!response.ok) throw new Error("宇宙网关拥堵，请稍后重试");
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
            const data = JSON.parse(dataStr);
            const content = data.choices?.[0]?.delta?.content || "";
            htmlBuffer += content;
            streamContent.innerHTML = htmlBuffer.replace(/```html/gi, '').replace(/```/g, '');
            if (cursor) cursor.style.display = "inline-block";
          } catch (e) {
            console.error("流数据解析失败", e);
          }
        }
      }
    }

    const spreadLabel = document.getElementById("spreadSelect") ? document.getElementById("spreadSelect").selectedOptions[0].innerText : "未知牌阵";
    const displayQuestion = question || "直觉速取";
    const mode = requiredCardsCount === 1 && question === "" ? "直觉速取" : "深度问卜";
    historyRecord = { mode, question: displayQuestion, style, spread: spreadLabel, date: new Date().toLocaleString() };
  } catch (error) {
    streamContent.innerHTML = `<span style="color:#ff6b6b">🔮 宇宙连接中断: ${error.message}</span>`;
    updateStatus("连接异常，请稍后重试。");
  } finally {
    if(cursor) cursor.style.display = "none";
    if(aiStatus) aiStatus.style.display = "none";
    const actionBtns = document.getElementById("actionBtns"); if(actionBtns) actionBtns.style.display = "flex";
    if (historyRecord) {
      addHistoryRecord(historyRecord);
      updateStatus("解读已生成，查看你的命运报告。你也可以复制或保存结果。");
    }
  }
}

/* 日签逻辑 */
async function startDailyDraw() {
  forcePlayMusic();
  const aside = document.querySelector(".aside-panel");
  if (aside) aside.style.display = "flex";
  document.getElementById("uiElements").style.display = "none";
  document.getElementById("dailyCardArea").style.display = "block";
  const today = new Date(); const dateCN = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`; document.getElementById("dailyDate").innerText = dateCN;
  const randomMajor = deck[Math.floor(Math.random() * 22)];
  document.getElementById("dailyEmoji").innerText = randomMajor.emoji; document.getElementById("dailyName").innerText = randomMajor.name;

  try {
    const response = await fetch("/api/tarot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isDaily: true, cards: [randomMajor] }) });
    if (response.ok) { const data = await response.json(); document.getElementById("dailyQuote").innerText = `“${data.reading}”`; } 
    else { document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”"; }
  } catch(e) { document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”"; }
  
  const backBtn = document.createElement("button"); backBtn.className = "save-btn restart"; backBtn.innerText = "返回星盘"; backBtn.style.display = "block"; backBtn.style.margin = "30px auto";
  backBtn.onclick = () => window.location.reload();
  if(!document.getElementById("backBtnId")) { backBtn.id = "backBtnId"; document.getElementById("dailyCardArea").appendChild(backBtn); }
}

function toggleMusic() {
  const bgMusic = document.getElementById("bgMusic"); const btn = document.getElementById("musicToggle");
  if (isMusicPlaying) { bgMusic.pause(); btn.innerText = "🎵 灵性环境音"; } else { bgMusic.volume = 0.4; let p = bgMusic.play(); if(p !== undefined) { p.then(_ => { btn.innerText = "🔇 静音"; }).catch(e => {}); } }
  isMusicPlaying = !isMusicPlaying;
}

function initStarfield() {
  const canvas = document.getElementById('starfield'); const ctx = canvas.getContext('2d'); let width, height, stars = [], shootingStars = [];
  function resize() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; initStars(); }
  function initStars() { stars = []; const numStars = window.innerWidth < 768 ? 90 : 180; const colors = ["rgba(255,255,255,", "rgba(240,220,165,", "rgba(195,160,90,"]; for (let i = 0; i < numStars; i++) { stars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.8 + 0.3, vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 0.5) * 12, opacity: Math.random() * 0.8 + 0.15, color: colors[Math.floor(Math.random() * colors.length)] }); } shootingStars = []; }
  function createShootingStar() { shootingStars.push({ x: Math.random() * width * 0.5 + width * 0.25, y: Math.random() * height * 0.4 + 20, length: Math.random() * 120 + 90, vx: Math.random() * 8 + 10, vy: Math.random() * 1.2 - 0.4, opacity: 0.85, life: 1 }); }
  function draw() { ctx.clearRect(0, 0, width, height); for (let star of stars) { star.x += star.vx / 100; star.y += star.vy / 100; if (star.x < 0 || star.x > width) star.vx = -star.vx; if (star.y < 0 || star.y > height) star.vy = -star.vy; star.opacity += (Math.random() - 0.5) * 0.06; star.opacity = Math.max(0.15, Math.min(1, star.opacity)); ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI); ctx.fillStyle = `${star.color}${star.opacity})`; ctx.shadowColor = `${star.color}${star.opacity * 0.8})`; ctx.shadowBlur = star.radius * 1.8; ctx.fill(); ctx.shadowBlur = 0; }
    if (Math.random() < 0.008 && shootingStars.length < 3) createShootingStar();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const sh = shootingStars[i]; sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.01; if (sh.x > width + 80 || sh.y < -50 || sh.life <= 0) { shootingStars.splice(i, 1); continue; }
      const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.length, sh.y - sh.length * 0.2);
      grad.addColorStop(0, `rgba(255,255,255,${sh.opacity})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = grad; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh.x - sh.length, sh.y - sh.length * 0.2); ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${sh.opacity})`; ctx.beginPath(); ctx.arc(sh.x, sh.y, 2.2, 0, 2 * Math.PI); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize); resize(); draw();
}

function saveAsImage() {
  const captureArea = document.getElementById("readingWrapper"); document.getElementById("shareHeader").style.display = "block"; const btn = document.getElementById("saveBtn"); btn.innerText = "正在生成图片..."; btn.disabled = true;
  html2canvas(captureArea, { scale: 2, useCORS: true, backgroundColor: "#0a0a0c" }).then(canvas => { document.getElementById("shareHeader").style.display = "none"; btn.innerText = "📸 保存羊皮卷轴"; btn.disabled = false; const link = document.createElement("a"); link.download = "命运星盘占卜报告.png"; link.href = canvas.toDataURL("image/png"); link.click(); }); 
}