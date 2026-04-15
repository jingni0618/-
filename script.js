/* =================================================================
   第一部分：全局变量与初始化
================================================================= */
const deck = [
  { name: "愚者 (The Fool)", emoji: "🚶‍♂️", meaning: "新的开始、自发性、信念的飞跃、天真" },
  { name: "魔术师 (The Magician)", emoji: "🪄", meaning: "创造力、技能、意志力、显化、掌控资源" },
  { name: "女祭司 (The High Priestess)", emoji: "🌙", meaning: "直觉、潜意识、内在声音、神秘" },
  { name: "女皇 (The Empress)", emoji: "👑", meaning: "丰收、母性、自然、富足、孕育" },
  { name: "皇帝 (The Emperor)", emoji: "🏰", meaning: "权威、结构、逻辑、稳定、秩序" },
  { name: "教皇 (The Hierophant)", emoji: "📜", meaning: "传统、信仰系统、教育、精神指引" },
  { name: "恋人 (The Lovers)", emoji: "❤️", meaning: "爱、和谐、关系、价值观的选择与对齐" },
  { name: "战车 (The Chariot)", emoji: " रथ", meaning: "控制、意志力、成功、行动、克服困难" },
  { name: "力量 (Strength)", emoji: "🦁", meaning: "勇气、耐心、内心的力量、同情与温柔" },
  { name: "隐士 (The Hermit)", emoji: "🏮", meaning: "灵魂探索、内省、孤独、内在指引" },
  { name: "命运之轮 (Wheel of Fortune)", emoji: "🎡", meaning: "好运、业力、生命的循环、转折点" },
  { name: "正义 (Justice)", emoji: "⚖️", meaning: "公平、真相、因果法则、法律、平衡" },
  { name: "倒吊人 (The Hanged Man)", emoji: "🦇", meaning: "暂停、放手、换个视角看问题、牺牲" },
  { name: "死神 (Death)", emoji: "💀", meaning: "结束、转变、过渡、彻底的清理与重生" },
  { name: "节制 (Temperance)", emoji: "⛲", meaning: "平衡、中庸、耐心、目的、炼金术" },
  { name: "恶魔 (The Devil)", emoji: "👿", meaning: "沉迷、物质主义、束缚、阴暗面、执念" },
  { name: "高塔 (The Tower)", emoji: "⚡", meaning: "突变、混乱、旧信念的崩塌、觉醒" },
  { name: "星星 (The Star)", emoji: "⭐", meaning: "希望、信念、灵感、治愈、宁静" },
  { name: "月亮 (The Moon)", emoji: "🌖", meaning: "幻觉、恐惧、焦虑、潜意识、未知的秘密" },
  { name: "太阳 (The Sun)", emoji: "☀️", meaning: "积极、活力、成功、快乐、纯真" },
  { name: "审判 (Judgement)", emoji: "📯", meaning: "重生、内在呼唤、宽恕、了结过去" },
  { name: "世界 (The World)", emoji: "🌍", meaning: "完成、整合、成就、旅行、圆满" },
  { name: "权杖一 (Ace of Wands)", emoji: "🔥", meaning: "灵感、新机会、成长、潜能迸发" },
  { name: "权杖二 (Two of Wands)", emoji: "🗺️", meaning: "未来规划、决策、走出舒适区" },
  { name: "圣杯一 (Ace of Cups)", emoji: "💧", meaning: "纯粹的爱、新感情、同情心、创造力" },
  { name: "圣杯二 (Two of Cups)", emoji: "🥂", meaning: "统一、伴侣关系、互相吸引、平等结合" },
  { name: "宝剑一 (Ace of Swords)", emoji: "🗡️", meaning: "突破、清晰、锐利的思想、真理" },
  { name: "宝剑二 (Two of Swords)", emoji: "盲", meaning: "僵局、困难的选择、逃避现实" },
  { name: "星币一 (Ace of Pentacles)", emoji: "🪙", meaning: "新的财务机会、繁荣、物质表现" },
  { name: "星币二 (Two of Pentacles)", emoji: "🤹", meaning: "平衡、适应能力、时间或资金管理" }
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
  initStarfield(); // 启动星空背景
  renderSpread();  // 渲染空牌阵
};

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// 动态渲染空牌阵
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
            <div class="emoji" id="emoji-${index}">❓</div>
            <div class="name" id="name-${index}">等待抽取</div>
          </div>
        </div>
      </div>
    `;
  });
}

/* =================================================================
   第二部分：音效与星空特效 (点子 1 & 2)
================================================================= */
let isMusicPlaying = false;
function toggleMusic() {
  const bgMusic = document.getElementById("bgMusic");
  const btn = document.getElementById("musicToggle");
  if (isMusicPlaying) {
    bgMusic.pause();
    btn.innerText = "🎵 开启灵性环境音";
  } else {
    bgMusic.volume = 0.4;
    bgMusic.play();
    btn.innerText = "🔇 关闭环境音";
  }
  isMusicPlaying = !isMusicPlaying;
}

function playSound(id) {
  const audio = document.getElementById(id);
  audio.currentTime = 0;
  audio.volume = 0.7;
  audio.play().catch(e => {}); 
}

// Canvas 星空粒子动画
function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
  }

  function initStars() {
    stars = [];
    const numStars = window.innerWidth < 768 ? 100 : 200;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
        opacity: Math.random()
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let star of stars) {
      star.x += star.vx / 100;
      star.y += star.vy / 100;
      if (star.x < 0 || star.x > width) star.vx = -star.vx;
      if (star.y < 0 || star.y > height) star.vy = -star.vy;
      star.opacity += (Math.random() - 0.5) * 0.1;
      star.opacity = Math.max(0.1, Math.min(1, star.opacity));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(212, 175, 55, ${star.opacity})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* =================================================================
   第三部分：仪式级交互抽牌 (点子 4)
================================================================= */

function startRitual() {
  const question = document.getElementById("questionInput").value.trim();
  if (!question) {
    alert("星空需要知道你的疑惑，请在上方输入问题。");
    return;
  }

  document.getElementById("controlPanel").style.display = "none";
  const deckArea = document.getElementById("deckArea");
  deckArea.style.display = "block";
  
  cardsDrawn = 0;
  drawnCardsData = [];
  shuffledDeck = shuffle([...deck]);

  const fanDeck = document.getElementById("fanDeck");
  fanDeck.innerHTML = "";
  const totalCards = 50; 
  const angleStep = 120 / totalCards;

  for (let i = 0; i < totalCards; i++) {
    const angle = -60 + (i * angleStep);
    const cardEl = document.createElement("div");
    cardEl.className = "deck-card";
    cardEl.style.transform = `rotate(${angle}deg) translateY(-20px)`;
    cardEl.style.zIndex = i;
    
    cardEl.onclick = function() {
      if (cardsDrawn < requiredCardsCount && !this.classList.contains("drawn")) {
        userDrawsOneCard(this);
      }
    };
    fanDeck.appendChild(cardEl);
  }
}

// 用户手动点击牌堆里的一张牌
function userDrawsOneCard(clickedCardElement) {
  playSound("drawSound"); // 播放抽牌音效
  clickedCardElement.classList.add("drawn");
  
  const cardData = shuffledDeck.pop();
  const isReversed = Math.random() < 0.2; 
  const reversedText = isReversed ? " (逆位)" : " (正位)";

  drawnCardsData.push({
    position: currentSpreadLayout[cardsDrawn].label,
    cardName: cardData.name + reversedText,
    meaning: cardData.meaning,
    isReversed: isReversed,
    emoji: cardData.emoji
  });

  const targetSlotCard = document.getElementById(`card-${cardsDrawn}`);
  targetSlotCard.classList.add("dealt");
  document.getElementById(`label-${cardsDrawn}`).classList.add("visible");

  cardsDrawn++;
  document.getElementById("cardsLeft").innerText = (requiredCardsCount - cardsDrawn);

  if (cardsDrawn === requiredCardsCount) {
    setTimeout(revealCardsAndRead, 1000); 
  }
}

/* =================================================================
   第四部分：翻牌与请求大模型
================================================================= */
async function revealCardsAndRead() {
  document.getElementById("deckArea").style.display = "none"; 

  // 依次翻开阵位上的牌
  for (let i = 0; i < requiredCardsCount; i++) {
    await new Promise(r => setTimeout(r, 600)); 
    playSound("revealSound"); // 叮的一声
    
    const data = drawnCardsData[i];
    document.getElementById(`emoji-${i}`).innerText = data.emoji;
    document.getElementById(`name-${i}`).innerText = data.cardName;
    
    const cardElement = document.getElementById(`card-${i}`);
    cardElement.classList.add("flipped");
    if(data.isReversed) cardElement.classList.add("reversed");
  }

  // 翻牌完毕，请求 AI
  const question = document.getElementById("questionInput").value.trim();
  document.getElementById("loadingBox").style.display = "block";
  await requestAIReading(question, drawnCardsData);
}

// 发起网络请求
async function requestAIReading(question, cards) {
  const loading = document.getElementById("loadingBox");
  const readingBox = document.getElementById("readingBox");

  try {
    const response = await fetch("/api/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question, cards: cards })
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      let errorMessage = "未知网络错误";
      try { errorMessage = JSON.parse(errorText).error || errorText; } catch(e){}
      throw new Error(errorMessage);
    }

    const data = await response.json();
    readingBox.innerHTML = data.reading;

  } catch (error) {
    readingBox.innerHTML = `<div style="padding: 20px; border: 1px solid #ff6b6b; color:#ffcccc;">🔮 信号干扰: ${error.message}</div>`;
  } finally {
    loading.style.display = "none";
    readingBox.classList.add("visible");
    readingBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // 显示截图分享按钮和重新占卜按钮
    document.getElementById("saveBtn").style.display = "inline-block";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
}

/* =================================================================
   第五部分：生成截图分享 (点子 3)
================================================================= */
function saveAsImage() {
  const captureArea = document.getElementById("captureArea");
  const shareHeader = document.getElementById("shareHeader");
  const shareFooter = document.getElementById("shareFooter");
  const btn = document.getElementById("saveBtn");
  
  // 截图前准备：显示水印，临时改底板颜色（防止因为毛玻璃透明而截图变黑）
  shareHeader.style.display = "block";
  shareFooter.style.display = "block";
  btn.innerText = "正在生成命运卡片...";
  btn.disabled = true;
  
  const originalBackground = captureArea.style.background;
  captureArea.style.background = "#0b0f19"; 
  captureArea.style.padding = "20px";
  captureArea.style.borderRadius = "20px";

  html2canvas(captureArea, {
    scale: 2, 
    useCORS: true,
    backgroundColor: "#0b0f19"
  }).then(canvas => {
    // 恢复原状
    shareHeader.style.display = "none";
    shareFooter.style.display = "none";
    captureArea.style.background = originalBackground;
    btn.innerText = "📸 保存专属命运卡片";
    btn.disabled = false;

    // 触发下载
    const link = document.createElement("a");
    link.download = "我的塔罗启示.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
