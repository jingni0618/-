/* =================================================================
   第一部分：全局变量与初始化 (完整78张牌 + 稳定无防盗链真实图片URL)
================================================================= */
// 使用稳定的 GitHub Raw 图床，全球访问无阻且支持跨域截图
const baseImageUrl = "https://raw.githubusercontent.com/howarder3/tarot-json/master/src/assets/images/";

const deck = [
  // 大阿尔卡那 (22张)
  { name: "愚者 (The Fool)", emoji: "🚶‍♂️", img: "m00.jpg", meaning: "新的开始、自发性、信念的飞跃、天真" },
  { name: "魔术师 (The Magician)", emoji: "🪄", img: "m01.jpg", meaning: "创造力、技能、意志力、显化、掌控资源" },
  { name: "女祭司 (The High Priestess)", emoji: "🌙", img: "m02.jpg", meaning: "直觉、潜意识、内在声音、神秘" },
  { name: "女皇 (The Empress)", emoji: "👑", img: "m03.jpg", meaning: "丰收、母性、自然、富足、孕育" },
  { name: "皇帝 (The Emperor)", emoji: "🏰", img: "m04.jpg", meaning: "权威、结构、逻辑、稳定、秩序" },
  { name: "教皇 (The Hierophant)", emoji: "📜", img: "m05.jpg", meaning: "传统、信仰系统、教育、精神指引" },
  { name: "恋人 (The Lovers)", emoji: "❤️", img: "m06.jpg", meaning: "爱、和谐、关系、价值观的选择与对齐" },
  { name: "战车 (The Chariot)", emoji: " रथ", img: "m07.jpg", meaning: "控制、意志力、成功、行动、克服困难" },
  { name: "力量 (Strength)", emoji: "🦁", img: "m08.jpg", meaning: "勇气、耐心、内心的力量、同情与温柔" },
  { name: "隐士 (The Hermit)", emoji: "🏮", img: "m09.jpg", meaning: "灵魂探索、内省、孤独、内在指引" },
  { name: "命运之轮 (Wheel of Fortune)", emoji: "🎡", img: "m10.jpg", meaning: "好运、业力、生命的循环、转折点" },
  { name: "正义 (Justice)", emoji: "⚖️", img: "m11.jpg", meaning: "公平、真相、因果法则、法律、平衡" },
  { name: "倒吊人 (The Hanged Man)", emoji: "🦇", img: "m12.jpg", meaning: "暂停、放手、换个视角看问题、牺牲" },
  { name: "死神 (Death)", emoji: "💀", img: "m13.jpg", meaning: "结束、转变、过渡、彻底的清理与重生" },
  { name: "节制 (Temperance)", emoji: "⛲", img: "m14.jpg", meaning: "平衡、中庸、耐心、目的、炼金术" },
  { name: "恶魔 (The Devil)", emoji: "👿", img: "m15.jpg", meaning: "沉迷、物质主义、束缚、阴暗面、执念" },
  { name: "高塔 (The Tower)", emoji: "⚡", img: "m16.jpg", meaning: "突变、混乱、旧信念的崩塌、觉醒" },
  { name: "星星 (The Star)", emoji: "⭐", img: "m17.jpg", meaning: "希望、信念、灵感、治愈、宁静" },
  { name: "月亮 (The Moon)", emoji: "🌖", img: "m18.jpg", meaning: "幻觉、恐惧、焦虑、潜意识、未知的秘密" },
  { name: "太阳 (The Sun)", emoji: "☀️", img: "m19.jpg", meaning: "积极、活力、成功、快乐、纯真" },
  { name: "审判 (Judgement)", emoji: "📯", img: "m20.jpg", meaning: "重生、内在呼唤、宽恕、了结过去" },
  { name: "世界 (The World)", emoji: "🌍", img: "m21.jpg", meaning: "完成、整合、成就、旅行、圆满" },

  // 小阿尔卡那 - 权杖 (Wands)
  { name: "权杖一 (Ace of Wands)", emoji: "🔥", img: "w01.jpg", meaning: "灵感、新机会、成长、潜能迸发" },
  { name: "权杖二 (Two of Wands)", emoji: "🗺️", img: "w02.jpg", meaning: "未来规划、决策、走出舒适区" },
  { name: "权杖三 (Three of Wands)", emoji: "🚢", img: "w03.jpg", meaning: "远见、领导力、探索、扩张与合作" },
  { name: "权杖四 (Four of Wands)", emoji: "🎪", img: "w04.jpg", meaning: "庆祝、和谐、家庭、回到避风港" },
  { name: "权杖五 (Five of Wands)", emoji: "🤼", img: "w05.jpg", meaning: "冲突、竞争、分歧、紧张局势" },
  { name: "权杖六 (Six of Wands)", emoji: "🏇", img: "w06.jpg", meaning: "胜利、认可、公众赞赏、自信" },
  { name: "权杖七 (Seven of Wands)", emoji: "🤺", img: "w07.jpg", meaning: "防守、坚持立场、面对挑战" },
  { name: "权杖八 (Eight of Wands)", emoji: "☄️", img: "w08.jpg", meaning: "快速行动、突然的变化、消息传来" },
  { name: "权杖九 (Nine of Wands)", emoji: "🤕", img: "w09.jpg", meaning: "韧性、防备、接近完成时的疲惫" },
  { name: "权杖十 (Ten of Wands)", emoji: "🪵", img: "w10.jpg", meaning: "重担、责任过重、辛劳与压力" },
  { name: "权杖侍从 (Page of Wands)", emoji: "🏃", img: "w11.jpg", meaning: "探索、兴奋、充满活力的新想法" },
  { name: "权杖骑士 (Knight of Wands)", emoji: "🐎", img: "w12.jpg", meaning: "热情、冒险、冲动、充满能量的行动" },
  { name: "权杖星币 (Queen of Wands)", emoji: "💃", img: "w13.jpg", meaning: "勇气、自信、独立、社交与魅力" },
  { name: "权杖国王 (King of Wands)", emoji: "🤴", img: "w14.jpg", meaning: "天生的领导者、远见卓识、创业精神" },

  // 小阿尔卡那 - 圣杯 (Cups)
  { name: "圣杯一 (Ace of Cups)", emoji: "💧", img: "c01.jpg", meaning: "纯粹的爱、新感情、同情心、创造力" },
  { name: "圣杯二 (Two of Cups)", emoji: "🥂", img: "c02.jpg", meaning: "统一、伴侣关系、互相吸引、平等结合" },
  { name: "圣杯三 (Three of Cups)", emoji: "🍻", img: "c03.jpg", meaning: "庆祝、友谊、合作、社交聚会" },
  { name: "圣杯四 (Four of Cups)", emoji: "🧘", img: "c04.jpg", meaning: "沉思、冷漠、错失良机、内省" },
  { name: "圣杯五 (Five of Cups)", emoji: "🥀", img: "c05.jpg", meaning: "悲伤、失落、沉溺于过去的遗憾" },
  { name: "圣杯六 (Six of Cups)", emoji: "🧒", img: "c06.jpg", meaning: "回忆、童年、纯真、怀旧与重逢" },
  { name: "圣杯七 (Seven of Cups)", emoji: "💭", img: "c07.jpg", meaning: "幻想、选择困难、白日梦、欲望" },
  { name: "圣杯八 (Eight of Cups)", emoji: "🚶", img: "c08.jpg", meaning: "离开、寻找更深的意义、放弃现有" },
  { name: "圣杯九 (Nine of Cups)", emoji: "🧞", img: "c09.jpg", meaning: "心满意足、愿望实现、物质享受" },
  { name: "圣杯十 (Ten of Cups)", emoji: "🌈", img: "c10.jpg", meaning: "神圣的爱、幸福的家庭、和谐圆满" },
  { name: "圣杯侍从 (Page of Cups)", emoji: "💌", img: "c11.jpg", meaning: "创意、新感情的开始、直觉的萌芽" },
  { name: "圣杯骑士 (Knight of Cups)", emoji: "🏇", img: "c12.jpg", meaning: "浪漫、魅力、想象力、理想主义" },
  { name: "圣杯王后 (Queen of Cups)", emoji: "🧜‍♀️", img: "c13.jpg", meaning: "富有同情心、直觉敏锐、情感的滋养" },
  { name: "圣杯国王 (King of Cups)", emoji: "🧔", img: "c14.jpg", meaning: "情感控制、外交手腕、情绪的平衡" },

  // 小阿尔卡那 - 宝剑 (Swords)
  { name: "宝剑一 (Ace of Swords)", emoji: "🗡️", img: "s01.jpg", meaning: "突破、清晰、锐利的思想、真理" },
  { name: "宝剑二 (Two of Swords)", emoji: "盲", img: "s02.jpg", meaning: "僵局、困难的选择、逃避现实" },
  { name: "宝剑三 (Three of Swords)", emoji: "💔", img: "s03.jpg", meaning: "心碎、悲伤、悲痛、痛苦的分离" },
  { name: "宝剑四 (Four of Swords)", emoji: "🛌", img: "s04.jpg", meaning: "休息、恢复、疗愈、从压力中撤退" },
  { name: "宝剑五 (Five of Swords)", emoji: "⚔️", img: "s05.jpg", meaning: "冲突、分歧、不计代价的胜利、敌意" },
  { name: "宝剑六 (Six of Swords)", emoji: "🛶", img: "s06.jpg", meaning: "过渡、离开困境、平复心情、疗愈之旅" },
  { name: "宝剑七 (Seven of Swords)", emoji: "🥷", img: "s07.jpg", meaning: "背叛、欺骗、策略、逃避责任" },
  { name: "宝剑八 (Eight of Swords)", emoji: "⛓️", img: "s08.jpg", meaning: "自我设限、束缚、无力感、受困的思维" },
  { name: "宝剑九 (Nine of Swords)", emoji: "😨", img: "s09.jpg", meaning: "焦虑、噩梦、担忧、内心的恐惧" },
  { name: "宝剑十 (Ten of Swords)", emoji: "📌", img: "s10.jpg", meaning: "痛苦的结局、背叛、低谷、彻底崩溃" },
  { name: "宝剑侍从 (Page of Swords)", emoji: "🕵️", img: "s11.jpg", meaning: "好奇心、机智、警惕、新的沟通方式" },
  { name: "宝剑骑士 (Knight of Swords)", emoji: "🤺", img: "s12.jpg", meaning: "直言不讳、冲动、快速行动、急躁" },
  { name: "宝剑王后 (Queen of Swords)", emoji: "👩‍⚖️", img: "s13.jpg", meaning: "独立、客观、清晰的边界、洞察力" },
  { name: "宝剑国王 (King of Swords)", emoji: "👨‍⚖️", img: "s14.jpg", meaning: "智力、理性、权威、清晰的判断" },

  // 小阿尔卡那 - 星币 (Pentacles)
  { name: "星币一 (Ace of Pentacles)", emoji: "🪙", img: "p01.jpg", meaning: "新的财务机会、繁荣、物质表现" },
  { name: "星币二 (Two of Pentacles)", emoji: "🤹", img: "p02.jpg", meaning: "平衡、适应能力、时间或资金管理" },
  { name: "星币三 (Three of Pentacles)", emoji: "🤝", img: "p03.jpg", meaning: "团队合作、初步成果、专业的技能" },
  { name: "星币四 (Four of Pentacles)", emoji: "🏦", img: "p04.jpg", meaning: "控制、稳定、保守、占有欲、吝啬" },
  { name: "星币五 (Five of Pentacles)", emoji: "🏚️", img: "p05.jpg", meaning: "财务损失、贫困、孤立无援、艰难时刻" },
  { name: "星币六 (Six of Pentacles)", emoji: "🤲", img: "p06.jpg", meaning: "慈善、分享、施与受、财富的流动" },
  { name: "星币七 (Seven of Pentacles)", emoji: "🌱", img: "p07.jpg", meaning: "长期愿景、耐心等待、投资与评估" },
  { name: "星币八 (Eight of Pentacles)", emoji: "🔨", img: "p08.jpg", meaning: "勤奋、学徒期、精通技能、注重细节" },
  { name: "星币九 (Nine of Pentacles)", emoji: "🍇", img: "p09.jpg", meaning: "自给自足、物质享受、独立与回报" },
  { name: "星币十 (Ten of Pentacles)", emoji: "🏡", img: "p10.jpg", meaning: "财富传承、家庭、长期成功、稳定" },
  { name: "星币侍从 (Page of Pentacles)", emoji: "🧑‍🎓", img: "p11.jpg", meaning: "好学、务实、新技能的开始" },
  { name: "星币骑士 (Knight of Pentacles)", emoji: "🚜", img: "p12.jpg", meaning: "效率、例行公事、可靠、脚踏实地" },
  { name: "星币王后 (Queen of Pentacles)", emoji: "🤱", img: "p13.jpg", meaning: "务实、舒适、提供滋养、财务安全" },
  { name: "星币国王 (King of Pentacles)", emoji: "🏦", img: "p14.jpg", meaning: "财富创造、商业领袖、富足与稳定" }
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

// 动态渲染空牌阵 (改变了内部结构以支持真实图片)
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
            <!-- 这里用来显示真实塔罗图片 -->
            <img id="img-${index}" class="tarot-image" src="" alt="tarot" style="display:none;">
            <!-- 黑色半透明蒙版显示文字名字 -->
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
  const totalCards = 50; 
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
    img: baseImageUrl + cardData.img // 记录真实的无防盗链图片URL
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
    
    // 显示图片
    const imgEl = document.getElementById(`img-${i}`);
    imgEl.src = data.img;
    imgEl.style.display = "block";
    
    // 显示名字覆盖层
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