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

const spreadGuideMeta = {
  single: { title: "单牌神谕", icon: "🃏", count: 1, mood: "免费", desc: "当下直觉快照，适合想要一句提醒的时候。" },
  yesno: { title: "是非决断阵", icon: "⚖️", count: 3, mood: "免费", desc: "看见支持与阻力，帮你做清晰判断。" },
  time: { title: "时间之流", icon: "⏳", count: 3, mood: "免费", desc: "过去、现在、未来三段式梳理问题脉络。" },
  relationship: { title: "情感透视阵", icon: "💞", count: 4, mood: "付费", desc: "拆解你与对方的状态、阻碍和关系走向。" },
  career: { title: "财富事业阵", icon: "💼", count: 4, mood: "付费", desc: "聚焦现状、机遇、风险与下一步方向。" },
  choice: { title: "二选一岔路阵", icon: "🧭", count: 5, mood: "付费", desc: "并排比较两条路径的趋势与结果。" },
  cross: { title: "灵感十字阵", icon: "✚", count: 5, mood: "付费", desc: "从核心、阻碍、潜意识到结局做完整推演。" }
};

let currentSpreadConfig = {}; let requiredCardsCount = 0; let cardsDrawn = 0; let cardsFlipped = 0; let drawnCardsData = []; let shuffledDeck = []; let isMobile = false; let paymentPending = false; let isNightMode = false;
let activeReadingMode = "standard";
const DAILY_CACHE_KEY = "tarotDailyReading";
const VIP_TOKEN_KEY = "tarotVipToken";
const WARM_BOARD_KEY = "tarotWarmBoard";
const VAULT_META_KEY = "tarotVaultMeta";
const HISTORY_LIMIT = 20;
const NOTES_LIMIT = 40;
const emotionLabels = {
  1: "冷静旁观",
  2: "轻微波动",
  3: "平静观察",
  4: "情绪起伏",
  5: "强烈拉扯"
};

window.onload = function() {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  applyTimePhaseTheme(); initStarfield(); renderSpread(); renderSpreadGuide(); loadHistory(); initEventBindings(); renderWarmBoard(); renderHomeDate(); updateStatus("");
  
  const introStr = isNightMode ? "夜已深，愿你在这里看见真实的自己。\n把困惑放在掌心，我们慢慢拆解。" : "欢迎回来，今天也值得被认真对待。\n从一个问题开始，把答案交给牌面。";
  let i = 0;
  function typeIntro() {
    if(i < introStr.length) {
      document.getElementById('introText').innerText += introStr.charAt(i); i++; setTimeout(typeIntro, 80);
    } else {
      setTimeout(() => {
        document.getElementById('introScreen').style.opacity = 0;
        setTimeout(()=> {
          document.getElementById('introScreen').style.display = 'none';
          document.getElementById('uiElements').style.opacity = 1;
          document.body.classList.add("home-ready");
        }, 1500);
      }, 1500);
    }
  }
  typeIntro();
};

function initEventBindings() {
  const byId = id => document.getElementById(id);
  byId("dailyBtn")?.addEventListener("click", startDailyDraw);
  byId("growthHubBtn")?.addEventListener("click", openGrowthHub);
  byId("feedbackBtn")?.addEventListener("click", openFeedbackModal);
  byId("contactBtn")?.addEventListener("click", openContactModal);
  byId("quickDrawBtn")?.addEventListener("click", quickDrawSingleCard);
  byId("startBtn")?.addEventListener("click", () => checkVipAndStart({ requireQuestion: true, mode: "standard" }));
  byId("startCoupleBtn")?.addEventListener("click", startCompatibilityReading);
  byId("spreadSelect")?.addEventListener("change", () => {
    renderSpread();
    renderSpreadGuide();
  });
  byId("emotionRange")?.addEventListener("input", updateEmotionLabel);
  byId("timelineFilter")?.addEventListener("change", () => renderTimeline());
  byId("timelineSort")?.addEventListener("change", () => renderTimeline());
  byId("saveJournalNoteBtn")?.addEventListener("click", saveJournalNote);
  byId("vaultUnlockBtn")?.addEventListener("click", unlockVault);
  byId("mobilePayBtn")?.addEventListener("click", mobilePayFlow);
  byId("pcPayBtn")?.addEventListener("click", pcPayFlow);
  byId("closeVipBtn")?.addEventListener("click", closeVipModal);
  byId("verifyVipBtn")?.addEventListener("click", verifyVipUnlock);
  byId("clearHistoryBtn")?.addEventListener("click", clearHistory);
  byId("closeGrowthHubBtn")?.addEventListener("click", closeGrowthHub);
  byId("closeGrowthHubPanelBtn")?.addEventListener("click", closeGrowthHub);
  byId("closeFeedbackBtn")?.addEventListener("click", closeFeedbackModal);
  byId("closeContactBtn")?.addEventListener("click", closeContactModal);
  byId("sendFeedbackBtn")?.addEventListener("click", sendFeedback);
  byId("saveBtn")?.addEventListener("click", saveAsImage);
  byId("copyBtn")?.addEventListener("click", copyReadingText);
  byId("restartBtn")?.addEventListener("click", returnToHomePage);
  byId("historyDetailCloseBtn")?.addEventListener("click", closeHistoryDetail);

  byId("growthHubModal")?.addEventListener("click", e => {
    if (e.target?.id === "growthHubModal") closeGrowthHub();
  });
  byId("contactModal")?.addEventListener("click", e => {
    if (e.target?.id === "contactModal") closeContactModal();
  });
  byId("feedbackModal")?.addEventListener("click", e => {
    if (e.target?.id === "feedbackModal") closeFeedbackModal();
  });
  updateEmotionLabel();
  setInterval(() => {
    applyTimePhaseTheme();
    renderWarmBoard();
    renderHomeDate();
  }, 60 * 1000);
}

function renderHomeDate() {
  const dateEl = document.getElementById("homeDate");
  if (!dateEl) return;
  const now = new Date();
  const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][now.getDay()];
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  dateEl.textContent = `${now.getFullYear()}年${mm}月${dd}日 · ${weekday}`;
}

function getTimePhase() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "dawn";
  if (hour >= 11 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "dusk";
  return "night";
}

function applyTimePhaseTheme() {
  const phase = getTimePhase();
  const phaseLabels = {
    dawn: "晨曦时辰 · 适合立愿",
    day: "白昼时辰 · 适合决策",
    dusk: "黄昏时辰 · 适合复盘",
    night: "夜深时辰 · 适合疗愈"
  };

  document.body.setAttribute("data-phase", phase);
  applySeasonWeatherTheme();
  document.body.classList.toggle("night-mode", phase === "night");
  isNightMode = phase === "night";

  const chip = document.getElementById("timePhaseChip");
  if (chip) chip.textContent = phaseLabels[phase];
}

function applySeasonWeatherTheme() {
  const now = new Date();
  const month = now.getMonth() + 1;
  let season = "spring";
  if ([6, 7, 8].includes(month)) season = "summer";
  else if ([9, 10, 11].includes(month)) season = "autumn";
  else if ([12, 1, 2].includes(month)) season = "winter";

  const term = getSolarTerm(now);
  const weather = getDailyWeatherMood(now);
  const weatherLabel = { sunny: "晴朗", cloudy: "多云", rainy: "雨幕", misty: "薄雾" };

  document.body.setAttribute("data-season", season);
  document.body.setAttribute("data-weather", weather);

  const climateChip = document.getElementById("climateChip");
  if (climateChip) climateChip.textContent = `${term} · ${weatherLabel[weather]}意象`;
}

function getDailyWeatherMood(date) {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const weatherTypes = ["sunny", "cloudy", "rainy", "misty"];
  const seed = Math.abs(key.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0));
  return weatherTypes[seed % weatherTypes.length];
}

function getSolarTerm(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const terms = {
    1: [[6, "小寒"], [20, "大寒"]],
    2: [[4, "立春"], [19, "雨水"]],
    3: [[6, "惊蛰"], [21, "春分"]],
    4: [[5, "清明"], [20, "谷雨"]],
    5: [[6, "立夏"], [21, "小满"]],
    6: [[6, "芒种"], [21, "夏至"]],
    7: [[7, "小暑"], [22, "大暑"]],
    8: [[7, "立秋"], [23, "处暑"]],
    9: [[7, "白露"], [23, "秋分"]],
    10: [[8, "寒露"], [23, "霜降"]],
    11: [[7, "立冬"], [22, "小雪"]],
    12: [[7, "大雪"], [22, "冬至"]]
  };
  const list = terms[m] || [];
  if (!list.length) return "节气流转";
  return d < list[1][0] ? list[0][1] : list[1][1];
}

function getWarmQuotes() {
  return [
    "你并不需要一下子变好，先把今天过温柔就很了不起。",
    "把注意力从“我够不够好”移到“我今天能做什么”。",
    "关系不是输赢，是两个人一起把夜路走亮。",
    "慢一点不是退步，是给灵魂呼吸的间隙。",
    "你反复在意的事情，往往正在提醒你真正的渴望。",
    "答案不会总是轰鸣出现，它常常像一盏小灯。",
    "把自己从苛责里救出来，运势也会跟着松动。",
    "今天只做一件关键小事，也足够改变走向。"
  ];
}

function renderWarmBoard() {
  const textEl = document.getElementById("warmBoardText");
  const metaEl = document.getElementById("warmBoardMeta");
  if (!textEl || !metaEl) return;

  const now = new Date();
  const dayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const quotes = getWarmQuotes();
  let selected = null;

  try {
    const cached = JSON.parse(localStorage.getItem(WARM_BOARD_KEY) || "null");
    if (cached?.dayKey === dayKey) selected = cached;
  } catch {}

  if (!selected) {
    const seed = Math.abs(dayKey.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0));
    selected = { dayKey, text: quotes[seed % quotes.length] };
    localStorage.setItem(WARM_BOARD_KEY, JSON.stringify(selected));
  }

  textEl.textContent = selected.text;
  const phase = getTimePhase();
  const phaseGuide = {
    dawn: "晨曦提醒：先立一个今天最小可执行目标",
    day: "白昼提醒：优先做最关键的一件事",
    dusk: "黄昏提醒：复盘今天，放下没必要的自责",
    night: "夜深提醒：慢下来，先照顾情绪再做判断"
  };
  metaEl.textContent = `${phaseGuide[phase]} · 每日更新`;
}

async function sendFeedback() {
  const nameEl = document.getElementById("feedbackName");
  const emailEl = document.getElementById("feedbackEmail");
  const msgEl = document.getElementById("feedbackMessage");
  const btn = document.getElementById("sendFeedbackBtn");
  const name = nameEl?.value?.trim() || "匿名用户";
  const email = emailEl?.value?.trim() || "未填写";
  const message = msgEl?.value?.trim() || "";

  if (!message) {
    alert("请先填写你的意见内容。");
    return;
  }

  const payload = {
    name,
    email,
    message,
    page: window.location.href,
    createdAt: new Date().toISOString()
  };

  if (btn) {
    btn.disabled = true;
    btn.textContent = "发送中...";
  }

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error("邮箱服务暂不可用");
    }

    if (msgEl) msgEl.value = "";
    if (nameEl) nameEl.value = "";
    if (emailEl) emailEl.value = "";
    closeFeedbackModal();
    updateStatus("感谢你的意见，已发送到👀仔邮箱。");
  } catch {
    const subject = encodeURIComponent("命运星盘用户意见反馈");
    const body = encodeURIComponent(`称呼：${name}\n邮箱：${email}\n时间：${new Date().toLocaleString()}\n页面：${window.location.href}\n\n意见内容：\n${message}`);
    window.location.href = `mailto:jingni18@hotmail.com?subject=${subject}&body=${body}`;
    updateStatus("已为你打开邮箱草稿，请点击发送完成反馈。");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "投递给👀仔";
    }
  }
}

function renderSpreadGuide() {
  const wrap = document.getElementById("spreadVisualGuide");
  const select = document.getElementById("spreadSelect");
  if (!wrap || !select) return;

  const selected = select.value;
  const keys = Object.keys(spreadGuideMeta).filter(k => {
    const option = Array.from(select.options).find(opt => opt.value === k);
    return option && !option.hidden && !option.disabled;
  });

  const cards = keys.map(key => {
    const info = spreadGuideMeta[key];
    const activeClass = key === selected ? "active" : "";
    return `
      <button class="spread-pill ${activeClass}" data-spread="${key}" type="button">
        <span class="spread-pill__icon">${info.icon}</span>
        <span class="spread-pill__name">${info.title}</span>
        <span class="spread-pill__meta">${info.count}张 · ${info.mood}</span>
      </button>
    `;
  }).join("");

  const info = spreadGuideMeta[selected] || spreadGuideMeta.cross;
  wrap.innerHTML = `
    <div class="spread-pills">${cards}</div>
    <div class="spread-guide-text">${info.desc}</div>
  `;

  wrap.querySelectorAll(".spread-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-spread");
      if (!next || !select.querySelector(`option[value="${next}"]`)) return;
      select.value = next;
      renderSpread();
      renderSpreadGuide();
    });
  });
}

function getEmotionState() {
  const value = Number(document.getElementById("emotionRange")?.value || 3);
  return { value, label: emotionLabels[value] || emotionLabels[3] };
}

function updateEmotionLabel() {
  const labelEl = document.getElementById("emotionLabel");
  if (!labelEl) return;
  labelEl.textContent = getEmotionState().label;
}

function getReadingContext(question = "", mode = activeReadingMode) {
  const isCompatibility = mode === "compatibility";
  const userName = isCompatibility ? (document.getElementById("coupleUserInput")?.value?.trim() || "") : "";
  const partnerName = isCompatibility ? (document.getElementById("couplePartnerInput")?.value?.trim() || "") : "";
  const baseQuestion = isCompatibility
    ? (document.getElementById("coupleQuestionInput")?.value?.trim() || "")
    : (document.getElementById("questionInput")?.value?.trim() || "");
  const emotion = getEmotionState();
  const finalQuestion = question || baseQuestion;
  return { userName, partnerName, emotion, isCompatibility, question: finalQuestion, mode };
}

function inferTimelineTopic(record) {
  const spread = String(record?.spread || "");
  const q = String(record?.question || "");
  if (spread.includes("情感") || /爱|感情|关系|复合|喜欢|暧昧/.test(q)) return "情感";
  if (spread.includes("财富") || spread.includes("事业") || /工作|升职|面试|副业|赚钱/.test(q)) return "事业";
  if (spread.includes("二选一") || spread.includes("是非") || /选|决定|要不要|该不该/.test(q)) return "选择";
  return "综合";
}

function extractTimelineTags(record) {
  const topic = inferTimelineTopic(record);
  const tags = new Set([topic, "经典解牌"]);
  if (record?.isCompatibility) tags.add("双人合盘");
  if (record?.emotionLabel) tags.add(record.emotionLabel);
  return Array.from(tags);
}

function renderTimeline() {
  const list = document.getElementById("timelineList");
  const filter = document.getElementById("timelineFilter")?.value || "all";
  const sortMode = document.getElementById("timelineSort")?.value || "desc";
  const summary = document.getElementById("timelineSummary");
  if (!list) return;
  const records = Array.isArray(HistoryService.records) ? HistoryService.records : [];
  list.innerHTML = "";

  if (summary) {
    const total = records.length;
    const compatibility = records.filter(r => r.isCompatibility).length;
    const notes = JournalService.notes.length;
    const avgEmotion = total ? (records.reduce((sum, r) => sum + Number(r.emotionLevel || 3), 0) / total).toFixed(1) : "0.0";
    summary.innerHTML = `
      <div class="timeline-summary-item"><div class="timeline-summary-label">总记录</div><div class="timeline-summary-value">${total}</div></div>
      <div class="timeline-summary-item"><div class="timeline-summary-label">双人占卜</div><div class="timeline-summary-value">${compatibility}</div></div>
      <div class="timeline-summary-item"><div class="timeline-summary-label">心情均值</div><div class="timeline-summary-value">${avgEmotion}/5</div></div>
      <div class="timeline-summary-item"><div class="timeline-summary-label">笔记数</div><div class="timeline-summary-value">${notes}</div></div>
    `;
  }

  if (!records.length) {
    list.innerHTML = '<div class="timeline-item"><div class="timeline-item-main">暂无时间线，先完成一次占卜吧。</div></div>';
    return;
  }

  let mapped = records.map(r => ({ record: r, topic: inferTimelineTopic(r), tags: extractTimelineTags(r) }));
  if (sortMode === "asc") mapped = [...mapped].reverse();
  const filtered = filter === "all" ? mapped : mapped.filter(m => m.topic === filter);

  if (!filtered.length) {
    list.innerHTML = '<div class="timeline-item"><div class="timeline-item-main">该主题暂时没有记录。</div></div>';
    return;
  }

  filtered.forEach(({ record, tags, topic }) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    const snippet = String(record.reading || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 62);
    item.innerHTML = `
      <div class="timeline-item-time">${record.date || "未知时间"}</div>
      <div class="timeline-item-main">${record.question || "直觉速取"} · ${record.spread || "未知牌阵"}</div>
      <div class="timeline-item-snippet">${snippet ? `${snippet}...` : "无解读节选"}</div>
      <div class="timeline-tags">${tags.map(t => `<span class="timeline-tag">${t}</span>`).join("")}</div>
    `;
    item.addEventListener("click", () => openHistoryDetail({ ...record, timelineTopic: topic }));
    list.appendChild(item);
  });

  renderJournalRecordOptions();
}

function checkNightMode() {
  applyTimePhaseTheme();
}

function updateStatus(text) {
  const banner = document.getElementById("statusBanner"); if (banner) banner.innerText = text;
}

const HistoryService = {
  records: [],
  storageKey() {
    return `tarotHistory:${getVaultStorageSuffix()}`;
  },
  save() {
    localStorage.setItem(this.storageKey(), JSON.stringify(this.records));
  },
  load() {
    const raw = localStorage.getItem(this.storageKey());
    if (!raw) {
      this.records = [];
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      this.records = Array.isArray(parsed) ? parsed.slice(0, HISTORY_LIMIT) : [];
    } catch (e) {
      this.records = [];
    }
  },
  add(record) {
    this.records.unshift(record);
    this.records = this.records.slice(0, HISTORY_LIMIT);
    this.save();
    renderTimeline();
  },
  clear() {
    this.records = [];
    this.save();
    renderTimeline();
  }
};

const JournalService = {
  notes: [],
  storageKey() {
    return `tarotJournal:${getVaultStorageSuffix()}`;
  },
  load() {
    const raw = localStorage.getItem(this.storageKey());
    if (!raw) {
      this.notes = [];
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      this.notes = Array.isArray(parsed) ? parsed.slice(0, NOTES_LIMIT) : [];
    } catch {
      this.notes = [];
    }
  },
  save() {
    localStorage.setItem(this.storageKey(), JSON.stringify(this.notes));
  },
  add(note) {
    this.notes.unshift(note);
    this.notes = this.notes.slice(0, NOTES_LIMIT);
    this.save();
    renderJournalNotes();
    renderTimeline();
  }
};

function loadHistory() { HistoryService.load(); JournalService.load(); }
function addHistoryRecord(record) { HistoryService.add(record); }
function clearHistory() { HistoryService.clear(); updateStatus("记录已清空，重新开始你的占卜旅程。"); }

function simpleHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash.toString(16);
}

function readVaultMeta() {
  try {
    return JSON.parse(localStorage.getItem(VAULT_META_KEY) || "null");
  } catch {
    return null;
  }
}

function getVaultStorageSuffix() {
  const meta = readVaultMeta();
  if (!meta?.name || !meta?.pinHash) return "guest";
  return `${meta.name}:${meta.pinHash}`;
}

function unlockVault() {
  const nameInput = document.getElementById("vaultNameInput");
  const pinInput = document.getElementById("vaultPinInput");
  const name = nameInput?.value?.trim() || "";
  const pin = pinInput?.value?.trim() || "";

  if (!name) {
    alert("请输入档案昵称");
    return;
  }
  if (!/^\d{4}$/.test(pin)) {
    alert("口令需为4位数字");
    return;
  }

  const meta = readVaultMeta();
  const pinHash = simpleHash(pin);
  if (meta?.name && meta.pinHash !== pinHash) {
    alert("口令不正确，请重试。");
    return;
  }

  localStorage.setItem(VAULT_META_KEY, JSON.stringify({ name, pinHash }));
  loadHistory();
  JournalService.load();
  showGrowthHubPanel();
}

function openGrowthHub() {
  const modal = document.getElementById("growthHubModal");
  const authPanel = document.getElementById("vaultAuthPanel");
  const panel = document.getElementById("growthHubPanel");
  const nameInput = document.getElementById("vaultNameInput");
  if (!modal || !authPanel || !panel) return;

  const meta = readVaultMeta();
  if (nameInput && meta?.name) nameInput.value = meta.name;

  authPanel.style.display = "block";
  panel.style.display = "none";
  modal.style.display = "flex";
}

function showGrowthHubPanel() {
  const authPanel = document.getElementById("vaultAuthPanel");
  const panel = document.getElementById("growthHubPanel");
  const meta = readVaultMeta();
  if (!panel || !authPanel || !meta?.name) return;

  authPanel.style.display = "none";
  panel.style.display = "block";

  const vaultMeta = document.getElementById("vaultMeta");
  if (vaultMeta) {
    vaultMeta.textContent = `当前档案：${meta.name} · 仅此口令可访问`;
  }

  renderTimeline();
  renderJournalNotes();
}

function closeGrowthHub() {
  const modal = document.getElementById("growthHubModal");
  if (modal) modal.style.display = "none";
}

function renderJournalRecordOptions() {
  const select = document.getElementById("journalRecordSelect");
  if (!select) return;
  const options = ['<option value="">不关联记录</option>'];
  HistoryService.records.forEach((r, idx) => {
    const title = `${r.date || "未知时间"} · ${r.question || "直觉速取"}`;
    options.push(`<option value="${idx}">${title}</option>`);
  });
  select.innerHTML = options.join("");
}

function saveJournalNote() {
  const noteInput = document.getElementById("journalNoteInput");
  const recordSelect = document.getElementById("journalRecordSelect");
  const text = noteInput?.value?.trim() || "";
  if (!text) {
    alert("先写一点内容再保存吧。");
    return;
  }
  const selectedIndex = Number(recordSelect?.value || "-1");
  const linked = Number.isInteger(selectedIndex) && selectedIndex >= 0 ? HistoryService.records[selectedIndex] : null;
  const emotion = getEmotionState();
  JournalService.add({
    text,
    date: new Date().toLocaleString(),
    emotionLabel: emotion.label,
    emotionLevel: emotion.value,
    linkedQuestion: linked?.question || "",
    linkedSpread: linked?.spread || ""
  });
  if (noteInput) noteInput.value = "";
  updateStatus("心情笔记已保存到成长档案。");
}

function renderJournalNotes() {
  const list = document.getElementById("journalNotesList");
  if (!list) return;
  list.innerHTML = "";
  if (!JournalService.notes.length) {
    list.innerHTML = '<div class="timeline-item"><div class="timeline-item-main">还没有笔记，写下今天第一条心情记录吧。</div></div>';
    return;
  }
  JournalService.notes.forEach(note => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-item-time">${note.date}</div>
      <div class="timeline-item-main">${note.emotionLabel}${note.linkedSpread ? ` · ${note.linkedSpread}` : ""}</div>
      <div class="timeline-item-snippet">${note.text}</div>
      <div class="timeline-tags">
        ${note.linkedQuestion ? `<span class="timeline-tag">${note.linkedQuestion.slice(0, 18)}</span>` : ""}
      </div>
    `;
    list.appendChild(item);
  });
}

function openContactModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;
  modal.style.display = "flex";
}

function openFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  if (!modal) return;
  modal.style.display = "flex";
}

function closeFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  if (!modal) return;
  modal.style.display = "none";
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;
  modal.style.display = "none";
}

function returnToHomePage() {
  const hideIds = [
    "vipModal",
    "historyDetailModal",
    "growthHubModal",
    "feedbackModal",
    "contactModal",
    "dailyCardArea",
    "shuffleArea",
    "deckArea",
    "revealInstruction",
    "readingWrapper",
    "actionBtns",
    "actionPlanBox",
    "energyText"
  ];
  hideIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  const intro = document.getElementById("introScreen");
  if (intro) {
    intro.style.display = "none";
    intro.style.opacity = "0";
  }

  const ui = document.getElementById("uiElements");
  if (ui) {
    ui.classList.remove("fade-out");
    ui.style.display = "flex";
    ui.style.opacity = "1";
  }

  const spreadContainer = document.getElementById("spreadContainer");
  if (spreadContainer) {
    spreadContainer.style.display = "none";
    spreadContainer.style.opacity = "0";
  }

  const readingBox = document.getElementById("readingBox");
  if (readingBox) readingBox.classList.remove("visible", "theme-night", "theme-nebula");
  const stream = document.getElementById("streamContent");
  if (stream) stream.innerHTML = "";

  const backBtn = document.getElementById("backBtnId");
  if (backBtn) backBtn.remove();

  activeReadingMode = "standard";
  const spreadSelect = document.getElementById("spreadSelect");
  if (spreadSelect) {
    Array.from(spreadSelect.options).forEach(opt => {
      opt.hidden = false;
      opt.disabled = false;
    });
  }
  renderSpread();
  updateStatus("");
}

function startCompatibilityReading() {
  activeReadingMode = "compatibility";
  const partnerName = document.getElementById("couplePartnerInput")?.value?.trim();
  if (!partnerName) {
    alert("请先填写 TA 的昵称，再开启双人占卜。");
    return;
  }
  const spreadSelect = document.getElementById("spreadSelect");
  if (spreadSelect) {
    Array.from(spreadSelect.options).forEach(opt => {
      const keep = opt.value === "relationship";
      opt.hidden = !keep;
      opt.disabled = !keep;
    });
    spreadSelect.value = "relationship";
  }
  renderSpread();
  checkVipAndStart({ requireQuestion: true, mode: "compatibility" });
}

function openHistoryDetail(record) {
  const modal = document.getElementById("historyDetailModal");
  const body = document.getElementById("historyDetailBody");
  if (!modal || !body) return;

  const cardsText = Array.isArray(record.cards) && record.cards.length
    ? `<ul>${record.cards.map(c => `<li>${c.position || "位置"}：${c.cardName || c.name || "未知牌"}</li>`).join("")}</ul>`
    : "<p>本次未保存牌面详情。</p>";

  body.innerHTML = `
    <p><strong>时间：</strong>${record.date || "未知"}</p>
    <p><strong>模式：</strong>${record.mode || "占卜"}</p>
    <p><strong>问题：</strong>${record.question || "未输入"}</p>
    <p><strong>主题：</strong>${record.timelineTopic || inferTimelineTopic(record)}</p>
    <p><strong>解牌：</strong>经典韦特流</p>
    <p><strong>情绪雷达：</strong>${record.emotionLabel || "平静观察"}</p>
    <p><strong>双人合盘：</strong>${record.isCompatibility ? `${record.userName || "你"} × ${record.partnerName}` : "未启用"}</p>
    <p><strong>牌阵：</strong>${record.spread || "未知"}</p>
    <hr style="border-color: rgba(255,255,255,0.16); margin: 12px 0;">
    <p><strong>牌面详情</strong></p>
    ${cardsText}
    <hr style="border-color: rgba(255,255,255,0.16); margin: 12px 0;">
    <p><strong>解读节选</strong></p>
    <div>${record.reading || "暂无解读正文。"}</div>
  `;

  modal.style.display = "flex";
}

function closeHistoryDetail() {
  const modal = document.getElementById("historyDetailModal");
  if (modal) modal.style.display = "none";
}

function copyReadingText() {
  const content = document.getElementById("streamContent"); if (!content) return;
  const text = content.innerText.trim();
  if (!text) { alert("当前还没有解读内容可复制。"); return; }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => { alert("解读已复制，快分享到你的灵魂圈子。"); }).catch(() => { prompt("请复制以下内容：", text); });
  } else { prompt("请复制以下内容：", text); }
}

function shuffle(array) { let cur = array.length, rnd; while (cur !== 0) { rnd = Math.floor(Math.random() * cur); cur--; [array[cur], array[rnd]] = [array[rnd], array[cur]]; } return array; }
function forcePlayMusic() { return; }
function playSound(id) { const audio = document.getElementById(id); audio.currentTime = 0; audio.volume = 0.4; audio.play().catch(e => {}); }

/* 核心修复：渲染空卡牌，默认先隐藏（display:none），冥想结束后才出现 */
function renderSpread() {
  const spreadType = document.getElementById("spreadSelect").value;
  currentSpreadConfig = spreadsOptions[spreadType]; requiredCardsCount = currentSpreadConfig.cards.length;
  
  const container = document.getElementById("spreadContainer"); container.innerHTML = ""; 
  container.className = `spread-container layout-${currentSpreadConfig.cssClass}`;
  
  currentSpreadConfig.cards.forEach((pos, index) => {
    container.innerHTML += `<div class="card-slot" id="slot-${index}"><div class="slot-label" id="label-${index}">${pos.label}</div><div class="card" id="card-${index}"><div class="card-face card-back">✧</div><div class="card-face card-front"><div class="emoji" id="emoji-${index}">❓</div><div class="name" id="name-${index}">等待抽取</div></div></div></div>`;
  });
  renderSpreadGuide();
}

function checkVipAndStart({ requireQuestion = true, mode = "standard" } = {}) {
  activeReadingMode = mode;
  if (mode !== "compatibility") {
    const spreadSelect = document.getElementById("spreadSelect");
    if (spreadSelect) {
      Array.from(spreadSelect.options).forEach(opt => {
        opt.hidden = false;
        opt.disabled = false;
      });
    }
  }
  const ctx = getReadingContext("", mode);
  const q = ctx.question;
  if (requireQuestion && !q) { alert("请先输入你的问题，星空才能回应。" ); return; }
  updateStatus(mode === "compatibility" ? "准备进入双人占卜..." : "准备进入深度问卜...");
  if (requiredCardsCount > 3 && !hasValidVipToken()) {
    document.getElementById("vipModal").style.display = "flex";
    updateStatus("4~5张深度牌阵（含双人占卜）需要解锁，赞赏后输入口令继续。");
    if (isMobile) { document.getElementById("mobilePayBtn").style.display = "block"; document.getElementById("pcPayBtn").style.display = "none"; } else { document.getElementById("mobilePayBtn").style.display = "none"; document.getElementById("pcPayBtn").style.display = "block"; }
    return;
  }
  showEnergyEffect(requiredCardsCount > 3 && hasValidVipToken());
}

function quickDrawSingleCard() {
  activeReadingMode = "quick";
  document.getElementById("spreadSelect").value = "single";
  renderSpread();
  document.getElementById("questionInput").value = "";
  updateStatus("直觉速取准备中，抽取你的灵感之牌...");
  showEnergyEffect();
}

function closeVipModal() { document.getElementById("vipModal").style.display = "none"; paymentPending = false; }
function pcPayFlow() { const btn = document.getElementById("pcPayBtn"); btn.innerText = "✅ 已赞赏，请输入口令"; btn.disabled = true; setTimeout(() => { btn.disabled = false; }, 1200); document.getElementById("vipCodeInput")?.focus(); }
function mobilePayFlow() {
  const btn = document.getElementById("mobilePayBtn"); const imgUrl = document.getElementById("qrImage").src; btn.innerText = "🔄 正在跳转微信..."; paymentPending = true;
  fetch(imgUrl).then(res => res.blob()).then(blob => {
    const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.style.display = 'none'; a.href = url; a.download = '命运星盘扫码二维码.jpg'; document.body.appendChild(a); a.click(); window.URL.revokeObjectURL(url);
    setTimeout(() => { window.location.href = "weixin://"; btn.innerText = "扫码完成后请切回"; }, 1000);
  }).catch(() => { window.location.href = "weixin://"; btn.innerText = "请自行截图前往微信"; });
}
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible' && paymentPending) {
    paymentPending = false; document.getElementById("mobilePayBtn").innerText = "✅ 已赞赏，请输入口令";
    setTimeout(() => { document.getElementById("vipCodeInput")?.focus(); }, 1200);
  }
});

function readVipToken() {
  try {
    const raw = localStorage.getItem(VIP_TOKEN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.token || !parsed?.expiresAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

function hasValidVipToken() {
  const vip = readVipToken();
  if (!vip) return false;
  return Date.now() < vip.expiresAt;
}

async function verifyVipUnlock() {
  const input = document.getElementById("vipCodeInput");
  const btn = document.getElementById("verifyVipBtn");
  const unlockCode = input?.value?.trim() || "";
  if (!unlockCode) {
    alert("请输入解锁口令");
    return;
  }

  btn.disabled = true;
  btn.innerText = "验证中...";

  try {
    const response = await fetch("/api/vip-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unlockCode })
    });

    if (!response.ok) {
      throw new Error("口令无效或服务暂不可用");
    }

    const data = await response.json();
    localStorage.setItem(VIP_TOKEN_KEY, JSON.stringify({ token: data.token, expiresAt: data.expiresAt }));
    closeVipModal();
    showEnergyEffect(true);
  } catch (err) {
    alert(`解锁失败：${err.message}`);
  } finally {
    btn.disabled = false;
    btn.innerText = "验证";
  }
}

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
    const context = getReadingContext("", activeReadingMode);
    const question = context.question;
    const style = "classic";
    document.getElementById("readingWrapper").style.display = "block"; document.getElementById("readingBox").classList.add("visible");
    fetchStream(question, style, drawnCardsData, context);
  }
}

function generateActionPlan({ question, cards, emotion, isCompatibility, userName, partnerName }) {
  const firstCard = cards?.[0]?.cardName || "这张牌";
  const planner = [];
  planner.push(`在接下来 24 小时内，用一句话写下你真正想要的结果，并贴在手机备忘录。`);
  planner.push(`围绕“${firstCard}”做一次最小行动：把一个拖延事项拆成 15 分钟可完成的第一步。`);

  if (emotion?.value >= 4) {
    planner.push("情绪偏高，先做 4 轮深呼吸（4秒吸气-4秒停顿-6秒呼气）后再做决定。");
  } else {
    planner.push("情绪较稳，今天适合完成一件需要专注的关键任务，时长建议 45 分钟。");
  }

  if (isCompatibility) {
    planner.push(`为 ${partnerName || "对方"} 发送一条不带指责的信息，格式：观察 + 感受 + 具体请求。`);
  }

  if (question) {
    planner.push(`今晚复盘问题“${question}”：记录一个证据，证明你正在朝答案前进。`);
  }

  return planner.slice(0, 5);
}

function renderActionPlan(context, cards, style) {
  const box = document.getElementById("actionPlanBox");
  const list = document.getElementById("actionPlanList");
  if (!box || !list) return;
  const plans = generateActionPlan({
    question: context.question,
    cards,
    emotion: context.emotion,
    isCompatibility: context.isCompatibility,
    userName: context.userName,
    partnerName: context.partnerName
  });
  list.innerHTML = plans.map(item => `<li>${item}</li>`).join("");
  box.style.display = "block";
}

const TarotApiService = {
  async requestReadingStream(payload) {
    const response = await fetch("/api/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("宇宙网关拥堵，请稍后重试");
    }

    if (!response.body) {
      throw new Error("响应流为空");
    }

    return response.body;
  },

  async requestDailyReading(card) {
    const response = await fetch("/api/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDaily: true, cards: [card] })
    });

    if (!response.ok) {
      throw new Error("日签请求失败");
    }

    return response.json();
  },

  async requestFallbackReading(payload) {
    const response = await fetch("/api/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, fallbackShort: true })
    });

    if (!response.ok) {
      throw new Error("兜底解读失败");
    }

    return response.json();
  }
};

/* 流式输出解码 */
async function fetchStream(question, style, cards, context = getReadingContext(question, activeReadingMode)) {
  const streamContent = document.getElementById("streamContent"); const cursor = document.getElementById("cursor");
  streamContent.innerHTML = ""; let htmlBuffer = "";
  const aiStatus = document.getElementById("aiStatus"); if(aiStatus) aiStatus.style.display = "flex";
  let historyRecord = null;
  const vipToken = readVipToken()?.token || null;
  const detailContext = context || getReadingContext(question, activeReadingMode);
  const compositeQuestion = detailContext.isCompatibility
    ? `[双人合盘：${detailContext.userName || "我"} x ${detailContext.partnerName}] ${detailContext.question || "关系走向"}`
    : detailContext.question;

  try {
    const streamBody = await TarotApiService.requestReadingStream({
      question: compositeQuestion,
      cards: cards,
      readingStyle: "classic",
      userName: detailContext.userName,
      partnerName: detailContext.partnerName,
      emotionLevel: detailContext.emotion.value,
      emotionLabel: detailContext.emotion.label,
      isCompatibility: detailContext.isCompatibility,
      isNight: isNightMode,
      vipToken
    });
    const reader = streamBody.getReader(); const decoder = new TextDecoder("utf-8");

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
    const displayQuestion = compositeQuestion || "直觉速取";
    const mode = detailContext.mode === "compatibility" ? "双人合盘" : (detailContext.mode === "quick" ? "直觉速取" : "深度问卜");
    historyRecord = {
      mode,
      question: displayQuestion,
      style: "classic",
      spread: spreadLabel,
      date: new Date().toLocaleString(),
      cards,
      reading: htmlBuffer || streamContent.innerHTML,
      userName: detailContext.userName,
      partnerName: detailContext.partnerName,
      isCompatibility: detailContext.isCompatibility,
      emotionLabel: detailContext.emotion.label,
      emotionLevel: detailContext.emotion.value
    };
    renderActionPlan(detailContext, cards, style);
  } catch (error) {
    try {
      const fallback = await TarotApiService.requestFallbackReading({
        question: compositeQuestion,
        cards,
        readingStyle: "classic",
        userName: detailContext.userName,
        partnerName: detailContext.partnerName,
        emotionLevel: detailContext.emotion.value,
        emotionLabel: detailContext.emotion.label,
        isCompatibility: detailContext.isCompatibility,
        isNight: isNightMode,
        vipToken
      });
      const fallbackText = fallback.reading || "连接星界暂时不稳，已为你生成简版解读。";
      streamContent.innerHTML = fallbackText.replace(/\n/g, "<br>");
      const spreadLabel = document.getElementById("spreadSelect") ? document.getElementById("spreadSelect").selectedOptions[0].innerText : "未知牌阵";
      const displayQuestion = compositeQuestion || "直觉速取";
      const mode = detailContext.mode === "compatibility" ? "双人合盘" : (detailContext.mode === "quick" ? "直觉速取" : "深度问卜");
      historyRecord = {
        mode,
        question: displayQuestion,
        style: "classic",
        spread: spreadLabel,
        date: new Date().toLocaleString(),
        cards,
        reading: fallbackText,
        userName: detailContext.userName,
        partnerName: detailContext.partnerName,
        isCompatibility: detailContext.isCompatibility,
        emotionLabel: detailContext.emotion.label,
        emotionLevel: detailContext.emotion.value
      };
      renderActionPlan(detailContext, cards, style);
      updateStatus("流式连接异常，已自动切换为稳定解读模式。");
    } catch {
      streamContent.innerHTML = `<span style="color:#ff6b6b">🔮 宇宙连接中断: ${error.message}</span>`;
      updateStatus("连接异常，请稍后重试。");
    }
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
  document.getElementById("uiElements").style.display = "none"; document.getElementById("dailyCardArea").style.display = "block";
  const today = new Date();
  const dayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const dateCN = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`;
  document.getElementById("dailyDate").innerText = dateCN;

  let dailyData = null;
  try {
    const raw = localStorage.getItem(DAILY_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.dayKey === dayKey) {
        dailyData = parsed;
      }
    }
  } catch {}

  if (!dailyData) {
    const randomMajor = deck[Math.floor(Math.random() * 22)];
    try {
      const data = await TarotApiService.requestDailyReading(randomMajor);
      dailyData = {
        dayKey,
        cardName: randomMajor.name,
        cardEmoji: randomMajor.emoji,
        reading: data.reading || "跟随内心的指引，今天也是充满奇迹的一天。"
      };
      localStorage.setItem(DAILY_CACHE_KEY, JSON.stringify(dailyData));
    } catch {
      dailyData = {
        dayKey,
        cardName: randomMajor.name,
        cardEmoji: randomMajor.emoji,
        reading: "跟随内心的指引，今天也是充满奇迹的一天。"
      };
      localStorage.setItem(DAILY_CACHE_KEY, JSON.stringify(dailyData));
    }
  }

  document.getElementById("dailyEmoji").innerText = dailyData.cardEmoji;
  document.getElementById("dailyName").innerText = dailyData.cardName;
  document.getElementById("dailyQuote").innerText = `“${dailyData.reading}”`;
  
  const backBtn = document.createElement("button"); backBtn.className = "save-btn restart"; backBtn.innerText = "返回星盘"; backBtn.style.display = "block"; backBtn.style.margin = "30px auto";
  backBtn.onclick = () => returnToHomePage();
  if(!document.getElementById("backBtnId")) { backBtn.id = "backBtnId"; document.getElementById("dailyCardArea").appendChild(backBtn); }
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
  const captureArea = document.getElementById("readingWrapper");
  const readingBox = document.getElementById("readingBox");
  const theme = document.getElementById("shareThemeSelect")?.value || "parchment";
  document.getElementById("shareHeader").style.display = "block";
  const btn = document.getElementById("saveBtn");
  btn.innerText = "正在生成图片...";
  btn.disabled = true;

  if (readingBox) {
    readingBox.classList.remove("theme-night", "theme-nebula");
    if (theme === "night") readingBox.classList.add("theme-night");
    if (theme === "nebula") readingBox.classList.add("theme-nebula");
  }

  html2canvas(captureArea, { scale: 2, useCORS: true, backgroundColor: "#0a0a0c" }).then(canvas => {
    document.getElementById("shareHeader").style.display = "none";
    btn.innerText = "📸 保存羊皮卷轴";
    btn.disabled = false;
    if (readingBox) readingBox.classList.remove("theme-night", "theme-nebula");
    const link = document.createElement("a");
    link.download = "命运星盘占卜报告.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }).catch(() => {
    document.getElementById("shareHeader").style.display = "none";
    btn.innerText = "📸 保存羊皮卷轴";
    btn.disabled = false;
    if (readingBox) readingBox.classList.remove("theme-night", "theme-nebula");
  });
}