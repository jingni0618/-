// 1. 完整 78 张塔罗牌库 (大阿尔卡那 + 四元素小阿尔卡那)
const deck = [
  // 大阿尔卡那 (22张)
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

  // 权杖牌组 (火元素：行动、热情、创造)
  { name: "权杖一 (Ace of Wands)", emoji: "🔥", meaning: "灵感、新机会、成长、潜能迸发" },
  { name: "权杖二 (Two of Wands)", emoji: "🗺️", meaning: "未来规划、决策、走出舒适区" },
  { name: "权杖三 (Three of Wands)", emoji: "🚢", meaning: "远见、领导力、探索、扩张与合作" },
  { name: "权杖四 (Four of Wands)", emoji: "🎪", meaning: "庆祝、和谐、家庭、回到避风港" },
  { name: "权杖五 (Five of Wands)", emoji: "🤼", meaning: "冲突、竞争、分歧、紧张局势" },
  { name: "权杖六 (Six of Wands)", emoji: "🏇", meaning: "胜利、认可、公众赞赏、自信" },
  { name: "权杖七 (Seven of Wands)", emoji: "🤺", meaning: "防守、坚持立场、面对挑战" },
  { name: "权杖八 (Eight of Wands)", emoji: "☄️", meaning: "快速行动、突然的变化、消息传来" },
  { name: "权杖九 (Nine of Wands)", emoji: "🤕", meaning: "韧性、防备、接近完成时的疲惫" },
  { name: "权杖十 (Ten of Wands)", emoji: "🪵", meaning: "重担、责任过重、辛劳与压力" },
  { name: "权杖侍从 (Page of Wands)", emoji: "🏃", meaning: "探索、兴奋、充满活力的新想法" },
  { name: "权杖骑士 (Knight of Wands)", emoji: "🐎", meaning: "热情、冒险、冲动、充满能量的行动" },
  { name: "权杖星币 (Queen of Wands)", emoji: "💃", meaning: "勇气、自信、独立、社交与魅力" },
  { name: "权杖国王 (King of Wands)", emoji: "🤴", meaning: "天生的领导者、远见卓识、创业精神" },

  // 圣杯牌组 (水元素：情感、直觉、关系)
  { name: "圣杯一 (Ace of Cups)", emoji: "💧", meaning: "纯粹的爱、新感情、同情心、创造力" },
  { name: "圣杯二 (Two of Cups)", emoji: "🥂", meaning: "统一、伴侣关系、互相吸引、平等结合" },
  { name: "圣杯三 (Three of Cups)", emoji: "🍻", meaning: "庆祝、友谊、合作、社交聚会" },
  { name: "圣杯四 (Four of Cups)", emoji: "🧘", meaning: "沉思、冷漠、错失良机、内省" },
  { name: "圣杯五 (Five of Cups)", emoji: "🥀", meaning: "悲伤、失落、沉溺于过去的遗憾" },
  { name: "圣杯六 (Six of Cups)", emoji: "🧒", meaning: "回忆、童年、纯真、怀旧与重逢" },
  { name: "圣杯七 (Seven of Cups)", emoji: "💭", meaning: "幻想、选择困难、白日梦、欲望" },
  { name: "圣杯八 (Eight of Cups)", emoji: "🚶", meaning: "离开、寻找更深的意义、放弃现有" },
  { name: "圣杯九 (Nine of Cups)", emoji: "🧞", meaning: "心满意足、愿望实现、物质享受" },
  { name: "圣杯十 (Ten of Cups)", emoji: "🌈", meaning: "神圣的爱、幸福的家庭、和谐圆满" },
  { name: "圣杯侍从 (Page of Cups)", emoji: "💌", meaning: "创意、新感情的开始、直觉的萌芽" },
  { name: "圣杯骑士 (Knight of Cups)", emoji: "🏇", meaning: "浪漫、魅力、想象力、理想主义" },
  { name: "圣杯王后 (Queen of Cups)", emoji: "🧜‍♀️", meaning: "富有同情心、直觉敏锐、情感的滋养" },
  { name: "圣杯国王 (King of Cups)", emoji: "🧔", meaning: "情感控制、外交手腕、情绪的平衡" },

  // 宝剑牌组 (风元素：思想、冲突、沟通)
  { name: "宝剑一 (Ace of Swords)", emoji: "🗡️", meaning: "突破、清晰、锐利的思想、真理" },
  { name: "宝剑二 (Two of Swords)", emoji: "盲", meaning: "僵局、困难的选择、逃避现实" },
  { name: "宝剑三 (Three of Swords)", emoji: "💔", meaning: "心碎、悲伤、悲痛、痛苦的分离" },
  { name: "宝剑四 (Four of Swords)", emoji: "🛌", meaning: "休息、恢复、疗愈、从压力中撤退" },
  { name: "宝剑五 (Five of Swords)", emoji: "⚔️", meaning: "冲突、分歧、不计代价的胜利、敌意" },
  { name: "宝剑六 (Six of Swords)", emoji: "🛶", meaning: "过渡、离开困境、平复心情、疗愈之旅" },
  { name: "宝剑七 (Seven of Swords)", emoji: "🥷", meaning: "背叛、欺骗、策略、逃避责任" },
  { name: "宝剑八 (Eight of Swords)", emoji: "⛓️", meaning: "自我设限、束缚、无力感、受困的思维" },
  { name: "宝剑九 (Nine of Swords)", emoji: "😨", meaning: "焦虑、噩梦、担忧、内心的恐惧" },
  { name: "宝剑十 (Ten of Swords)", emoji: "📌", meaning: "痛苦的结局、背叛、低谷、彻底崩溃" },
  { name: "宝剑侍从 (Page of Swords)", emoji: "🕵️", meaning: "好奇心、机智、警惕、新的沟通方式" },
  { name: "宝剑骑士 (Knight of Swords)", emoji: "🤺", meaning: "直言不讳、冲动、快速行动、急躁" },
  { name: "宝剑王后 (Queen of Swords)", emoji: "👩‍⚖️", meaning: "独立、客观、清晰的边界、洞察力" },
  { name: "宝剑国王 (King of Swords)", emoji: "👨‍⚖️", meaning: "智力、理性、权威、清晰的判断" },

  // 星币牌组 (土元素：物质、现实、金钱)
  { name: "星币一 (Ace of Pentacles)", emoji: "🪙", meaning: "新的财务机会、繁荣、物质表现" },
  { name: "星币二 (Two of Pentacles)", emoji: "🤹", meaning: "平衡、适应能力、时间或资金管理" },
  { name: "星币三 (Three of Pentacles)", emoji: "🤝", meaning: "团队合作、初步成果、专业的技能" },
  { name: "星币四 (Four of Pentacles)", emoji: "🏦", meaning: "控制、稳定、保守、占有欲、吝啬" },
  { name: "星币五 (Five of Pentacles)", emoji: "🏚️", meaning: "财务损失、贫困、孤立无援、艰难时刻" },
  { name: "星币六 (Six of Pentacles)", emoji: "🤲", meaning: "慈善、分享、施与受、财富的流动" },
  { name: "星币七 (Seven of Pentacles)", emoji: "🌱", meaning: "长期愿景、耐心等待、投资与评估" },
  { name: "星币八 (Eight of Pentacles)", emoji: "🔨", meaning: "勤奋、学徒期、精通技能、注重细节" },
  { name: "星币九 (Nine of Pentacles)", emoji: "🍇", meaning: "自给自足、物质享受、独立与回报" },
  { name: "星币十 (Ten of Pentacles)", emoji: "🏡", meaning: "财富传承、家庭、长期成功、稳定" },
  { name: "星币侍从 (Page of Pentacles)", emoji: "🧑‍🎓", meaning: "好学、务实、新技能的开始" },
  { name: "星币骑士 (Knight of Pentacles)", emoji: "🚜", meaning: "效率、例行公事、可靠、脚踏实地" },
  { name: "星币王后 (Queen of Pentacles)", emoji: "🤱", meaning: "务实、舒适、提供滋养、财务安全" },
  { name: "星币国王 (King of Pentacles)", emoji: "🏦", meaning: "财富创造、商业领袖、富足与稳定" }
];

// 2. 动态牌阵配置库 (加入了是非决断阵)
const spreadsOptions = {
  single: [
    { label: "核心指引" }
  ],
  yesno: [
    { label: "支持的力量" },
    { label: "反对的力量" },
    { label: "最终的答案" }
  ],
  time: [
    { label: "过去的因果" },
    { label: "当下的现状" },
    { label: "未来的趋势" }
  ],
  relationship: [
    { label: "你的现状" },
    { label: "对方的状态" },
    { label: "当前的阻碍" },
    { label: "未来的走向" }
  ],
  cross: [
    { label: "当下的核心问题" },
    { label: "面临的阻碍" },
    { label: "潜在的目标/理想" },
    { label: "深层的潜意识" },
    { label: "最终的可能结局" }
  ]
};

// 3. 动态渲染牌阵
function renderSpread() {
  const spreadType = document.getElementById("spreadSelect").value;
  const layout = spreadsOptions[spreadType];
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
}

// 页面加载时渲染
window.onload = renderSpread;

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
  const spreadType = document.getElementById("spreadSelect").value;
  const layout = spreadsOptions[spreadType];
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
      const errorText = await response.text(); 
      let errorMessage = "未知网络错误";
      try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || JSON.stringify(errorJson);
      } catch (e) {
          errorMessage = errorText;
      }
      throw new Error(`请求失败: ${errorMessage}`);
    }

    const data = await response.json();
    readingBox.innerHTML = data.reading;

  } catch (error) {
    console.error("Fetch 捕获到错误:", error);
    readingBox.innerHTML = `
      <div style="background: rgba(255,107,107,0.1); border: 1px solid #ff6b6b; padding: 20px; border-radius: 8px;">
        <h4 style="color: #ff6b6b; margin-top: 0;">🔮 星空信号受到干扰</h4>
        <p style="color: #ffcccc; font-family: monospace; font-size: 14px;">${error.message}</p>
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
