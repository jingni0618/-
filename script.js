/* =================================================================
   第一部分：全局变量与初始化 (100%可用、无防盗链 GitHub 图床)
================================================================= */
const deck = [
  // 大阿尔卡那 (22张)
  { name: "愚者 (The Fool)", emoji: "🚶‍♂️", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m00.jpg", meaning: "新的开始、自发性、信念的飞跃、天真" },
  { name: "魔术师 (The Magician)", emoji: "🪄", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m01.jpg", meaning: "创造力、技能、意志力、显化" },
  { name: "女祭司 (The High Priestess)", emoji: "🌙", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m02.jpg", meaning: "直觉、潜意识、内在声音、神秘" },
  { name: "女皇 (The Empress)", emoji: "👑", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m03.jpg", meaning: "丰收、母性、自然、富足、孕育" },
  { name: "皇帝 (The Emperor)", emoji: "🏰", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m04.jpg", meaning: "权威、结构、逻辑、稳定、秩序" },
  { name: "教皇 (The Hierophant)", emoji: "📜", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m05.jpg", meaning: "传统、信仰系统、教育、精神指引" },
  { name: "恋人 (The Lovers)", emoji: "❤️", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m06.jpg", meaning: "爱、和谐、关系、价值观的对齐" },
  { name: "战车 (The Chariot)", emoji: " रथ", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m07.jpg", meaning: "控制、意志力、成功、行动" },
  { name: "力量 (Strength)", emoji: "🦁", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m08.jpg", meaning: "勇气、耐心、内心的力量" },
  { name: "隐士 (The Hermit)", emoji: "🏮", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m09.jpg", meaning: "灵魂探索、内省、孤独、内在指引" },
  { name: "命运之轮 (Wheel of Fortune)", emoji: "🎡", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m10.jpg", meaning: "好运、业力、生命的循环、转折点" },
  { name: "正义 (Justice)", emoji: "⚖️", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m11.jpg", meaning: "公平、真相、因果法则、平衡" },
  { name: "倒吊人 (The Hanged Man)", emoji: "🦇", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m12.jpg", meaning: "暂停、放手、换个视角看问题、牺牲" },
  { name: "死神 (Death)", emoji: "💀", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m13.jpg", meaning: "结束、转变、过渡、清理" },
  { name: "节制 (Temperance)", emoji: "⛲", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m14.jpg", meaning: "平衡、中庸、耐心、目的" },
  { name: "恶魔 (The Devil)", emoji: "👿", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m15.jpg", meaning: "沉迷、物质主义、束缚、阴暗面" },
  { name: "高塔 (The Tower)", emoji: "⚡", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m16.jpg", meaning: "突变、混乱、旧信念的崩塌" },
  { name: "星星 (The Star)", emoji: "⭐", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m17.jpg", meaning: "希望、信念、灵感、治愈" },
  { name: "月亮 (The Moon)", emoji: "🌖", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m18.jpg", meaning: "幻觉、恐惧、焦虑、潜意识" },
  { name: "太阳 (The Sun)", emoji: "☀️", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m19.jpg", meaning: "积极、活力、成功、快乐" },
  { name: "审判 (Judgement)", emoji: "📯", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m20.jpg", meaning: "重生、内在呼唤、宽恕" },
  { name: "世界 (The World)", emoji: "🌍", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/m21.jpg", meaning: "完成、整合、成就、旅行、圆满" },

  // 小阿尔卡那精选
  { name: "权杖一 (Ace of Wands)", emoji: "🔥", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/w01.jpg", meaning: "灵感、新机会、成长" },
  { name: "权杖二 (Two of Wands)", emoji: "🗺️", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/w02.jpg", meaning: "未来规划、决策、走出舒适区" },
  { name: "权杖三 (Three of Wands)", emoji: "🚢", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/w03.jpg", meaning: "远见、探索、扩张与合作" },
  { name: "权杖十 (Ten of Wands)", emoji: "🪵", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/w10.jpg", meaning: "重担、责任过重、压力" },
  { name: "圣杯一 (Ace of Cups)", emoji: "💧", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/c01.jpg", meaning: "纯粹的爱、新感情、创造力" },
  { name: "圣杯二 (Two of Cups)", emoji: "🥂", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/c02.jpg", meaning: "统一、伴侣关系、平等结合" },
  { name: "圣杯三 (Three of Cups)", emoji: "🍻", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/c03.jpg", meaning: "庆祝、友谊、社交聚会" },
  { name: "圣杯十 (Ten of Cups)", emoji: "🌈", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/c10.jpg", meaning: "神圣的爱、家庭、和谐" },
  { name: "宝剑一 (Ace of Swords)", emoji: "🗡️", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/s01.jpg", meaning: "突破、清晰、锐利的思想" },
  { name: "宝剑二 (Two of Swords)", emoji: "盲", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/s02.jpg", meaning: "僵局、困难的选择、逃避现实" },
  { name: "宝剑三 (Three of Swords)", emoji: "💔", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/s03.jpg", meaning: "心碎、悲痛、痛苦的分离" },
  { name: "宝剑十 (Ten of Swords)", emoji: "📌", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/s10.jpg", meaning: "痛苦的结局、背叛、低谷" },
  { name: "星币一 (Ace of Pentacles)", emoji: "🪙", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/p01.jpg", meaning: "新的财务机会、繁荣、物质" },
  { name: "星币二 (Two of Pentacles)", emoji: "🤹", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/p02.jpg", meaning: "平衡、适应能力、资金管理" },
  { name: "星币三 (Three of Pentacles)", emoji: "🤝", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/p03.jpg", meaning: "团队合作、专业的技能" },
  { name: "星币十 (Ten of Pentacles)", emoji: "🏡", img: "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/p10.jpg", meaning: "财富传承、家庭、长期成功" }
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
            <img id="img-${index}" class="tarot-image" src="" alt="tarot" style="display:none;">
            <div class="name-overlay" id="name-${index}">等待抽取</div>
          </div>
        </div>
      </div>
    `;
  });
}

/* 音效与星空特效 */
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

function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];

  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width; canvas.height = height;
    initStars();
  }

  function initStars() {
    stars = [];
    const numStars = window.innerWidth < 768 ? 100 : 200;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width, y: Math.random() * height,
        radius: Math.random() * 1.5, vx: Math.floor(Math.random() * 50) - 25, vy: Math.floor(Math.random() * 50) - 25,
        opacity: Math.random()
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let star of stars) {
      star.x += star.vx / 100; star.y += star.vy / 100;
      if (star.x < 0 || star.x > width) star.vx = -star.vx;
      if (star.y < 0 || star.y > height) star.vy = -star.vy;
      star.opacity += (Math.random() - 0.5) * 0.1;
      star.opacity = Math.max(0.1, Math.min(1, star.opacity));
      ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(249, 211, 66, ${star.opacity})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize); resize(); draw();
}

/* 交互抽牌 */
function startRitual() {
  const question = document.getElementById("questionInput").value.trim();
  if (!question) { alert("星空需要知道你的疑惑，请在上方输入问题。"); return; }

  document.getElementById("controlPanel").style.display = "none";
  const deckArea = document.getElementById("deckArea");
  deckArea.style.display = "block";
  
  cardsDrawn = 0; drawnCardsData = []; shuffledDeck = shuffle([...deck]);

  const fanDeck = document.getElementById("fanDeck");
  fanDeck.innerHTML = "";
  const totalCards = 38; // 展示部分牌面扇形
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
    img: cardData.img // 绝对路径图片
  });

  const targetSlotCard = document.getElementById(`card-${cardsDrawn}`);
  targetSlotCard.classList.add("dealt");
  document.getElementById(`label-${cardsDrawn}`).classList.add("visible");

  cardsDrawn++;
  document.getElementById("cardsLeft").innerText = (requiredCardsCount - cardsDrawn);

  if (cardsDrawn === requiredCardsCount) { setTimeout(revealCardsAndRead, 1000); }
}

/* 翻牌与请求大模型 */
async function revealCardsAndRead() {
  document.getElementById("deckArea").style.display = "none"; 

  // 依次翻开阵位上的牌，加载真实图片
  for (let i = 0; i < requiredCardsCount; i++) {
    await new Promise(r => setTimeout(r, 600)); 
    playSound("revealSound"); 
    
    const data = drawnCardsData[i];
    
    // 显示真实图片
    const imgEl = document.getElementById(`img-${i}`);
    imgEl.src = data.img;
    imgEl.style.display = "block";
    
    document.getElementById(`name-${i}`).innerText = data.cardName;
    
    const cardElement = document.getElementById(`card-${i}`);
    cardElement.classList.add("flipped");
    if(data.isReversed) cardElement.classList.add("reversed");
  }

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
    
    document.getElementById("saveBtn").style.display = "inline-block";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
}

/* 截图分享功能 */
function saveAsImage() {
  const captureArea = document.getElementById("captureArea");
  const shareHeader = document.getElementById("shareHeader");
  const shareFooter = document.getElementById("shareFooter");
  const btn = document.getElementById("saveBtn");
  
  shareHeader.style.display = "block";
  shareFooter.style.display = "block";
  btn.innerText = "正在生成命运卡片...";
  btn.disabled = true;
  
  const originalBackground = captureArea.style.background;
  captureArea.style.background = "#1a1a2e"; 
  captureArea.style.padding = "20px";
  captureArea.style.borderRadius = "20px";

  html2canvas(captureArea, {
    scale: 2, 
    useCORS: true,
    backgroundColor: "#1a1a2e"
  }).then(canvas => {
    shareHeader.style.display = "none";
    shareFooter.style.display = "none";
    captureArea.style.background = originalBackground;
    btn.innerText = "📸 保存专属命运卡片";
    btn.disabled = false;

    const link = document.createElement("a");
    link.download = "我的塔罗启示.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
