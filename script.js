const deck = [
  { name: "愚者", emoji: "🚶‍♂️", meaning: "新的开始、自发性、信念的飞跃" }, { name: "魔术师", emoji: "🪄", meaning: "创造力、技能、意志力" }, { name: "女祭司", emoji: "🌙", meaning: "直觉、潜意识、神秘" }, { name: "女皇", emoji: "👑", meaning: "丰收、母性、自然" }, { name: "皇帝", emoji: "🏰", meaning: "权威、结构、稳定" }, { name: "教皇", emoji: "📜", meaning: "传统、信仰、指引" }, { name: "恋人", emoji: "❤️", meaning: "爱、和谐、关系" }, { name: "战车", emoji: "🏇", meaning: "控制、意志力、行动" }, { name: "力量", emoji: "🦁", meaning: "勇气、耐心、温柔" }, { name: "隐士", emoji: "🏮", meaning: "灵魂探索、孤独、内省" }, { name: "命运之轮", emoji: "🎡", meaning: "好运、业力、转折点" }, { name: "正义", emoji: "⚖️", meaning: "公平、真相、因果" }, { name: "倒吊人", emoji: "🦇", meaning: "暂停、放手、换视角" }, { name: "死神", emoji: "💀", meaning: "结束、转变、彻底重生" }, { name: "节制", emoji: "⛲", meaning: "平衡、中庸、耐心" }, { name: "恶魔", emoji: "👿", meaning: "沉迷、物质主义、束缚" }, { name: "高塔", emoji: "⚡", meaning: "突变、混乱、崩塌" }, { name: "星星", emoji: "⭐", meaning: "希望、信念、治愈" }, { name: "月亮", emoji: "🌖", meaning: "幻觉、恐惧、潜意识" }, { name: "太阳", emoji: "☀️", meaning: "积极、活力、成功" }, { name: "审判", emoji: "📯", meaning: "重生、呼唤、宽恕" }, { name: "世界", emoji: "🌍", meaning: "完成、整合、圆满" },
  { name: "权杖一", emoji: "🔥", meaning: "灵感、新机会" }, { name: "权杖二", emoji: "🗺️", meaning: "未来规划、决策" }, { name: "权杖三", emoji: "🚢", meaning: "远见、探索" }, { name: "权杖十", emoji: "🪵", meaning: "重担、压力" },
  { name: "圣杯一", emoji: "💧", meaning: "纯粹的爱、同情" }, { name: "圣杯二", emoji: "🥂", meaning: "统一、伴侣关系" }, { name: "圣杯三", emoji: "🍻", meaning: "庆祝、友谊" }, { name: "圣杯十", emoji: "🌈", meaning: "神圣的爱、家庭" },
  { name: "宝剑一", emoji: "🗡️", meaning: "突破、清晰的思想" }, { name: "宝剑二", emoji: "⚔️", meaning: "僵局、困难的选择" }, { name: "宝剑三", emoji: "💔", meaning: "心碎、痛苦的分离" }, { name: "宝剑十", emoji: "📌", meaning: "痛苦的结局、低谷" },
  { name: "星币一", emoji: "🪙", meaning: "新的财务机会" }, { name: "星币二", emoji: "🤹", meaning: "平衡、资金管理" }, { name: "星币三", emoji: "🤝", meaning: "团队合作、技能" }, { name: "星币十", emoji: "🏡", meaning: "财富传承、长期成功" }
];

const TAROT_IMAGE_BASE_URL = "https://www.sacred-texts.com/tarot/pkt/img/";
const tarotCardCodeMap = {
  "愚者": "ar00",
  "魔术师": "ar01",
  "女祭司": "ar02",
  "女皇": "ar03",
  "皇帝": "ar04",
  "教皇": "ar05",
  "恋人": "ar06",
  "战车": "ar07",
  "力量": "ar08",
  "隐士": "ar09",
  "命运之轮": "ar10",
  "正义": "ar11",
  "倒吊人": "ar12",
  "死神": "ar13",
  "节制": "ar14",
  "恶魔": "ar15",
  "高塔": "ar16",
  "星星": "ar17",
  "月亮": "ar18",
  "太阳": "ar19",
  "审判": "ar20",
  "世界": "ar21",
  "权杖一": "waac",
  "权杖二": "wa02",
  "权杖三": "wa03",
  "权杖十": "wa10",
  "圣杯一": "cuac",
  "圣杯二": "cu02",
  "圣杯三": "cu03",
  "圣杯十": "cu10",
  "宝剑一": "swac",
  "宝剑二": "sw02",
  "宝剑三": "sw03",
  "宝剑十": "sw10",
  "星币一": "peac",
  "星币二": "pe02",
  "星币三": "pe03",
  "星币十": "pe10"
};

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
  single: { title: "单牌神谕", icon: "🃏", count: 1, mood: "免费", paid: false, desc: "当下直觉快照，适合想要一句提醒的时候。" },
  yesno: { title: "是非决断阵", icon: "⚖️", count: 3, mood: "免费", paid: false, desc: "看见支持与阻力，帮你做清晰判断。" },
  time: { title: "时间之流", icon: "⏳", count: 3, mood: "免费", paid: false, desc: "过去、现在、未来三段式梳理问题脉络。" },
  relationship: { title: "情感透视阵", icon: "💞", count: 4, mood: "进阶", paid: true, priceFen: 300, desc: "拆解你与对方的状态、阻碍和关系走向。" },
  career: { title: "财富事业阵", icon: "💼", count: 4, mood: "进阶", paid: true, priceFen: 300, desc: "聚焦现状、机遇、风险与下一步方向。" },
  choice: { title: "二选一岔路阵", icon: "🧭", count: 5, mood: "进阶", paid: true, priceFen: 300, desc: "并排比较两条路径的趋势与结果。" },
  cross: { title: "灵感十字阵", icon: "✚", count: 5, mood: "进阶", paid: true, priceFen: 300, desc: "从核心、阻碍、潜意识到结局做完整推演。" }
};

const VIP_PRICE_DEEP_FEN = 300;
const VIP_PRICE_COMPAT_FEN = 500;

function formatFenPrice(amountFen = 0) {
  return `¥${(Number(amountFen || 0) / 100).toFixed(0)}`;
}

function getUnlockPriceForMode(mode = activeReadingMode, spread = document.getElementById("spreadSelect")?.value || "") {
  if (mode === "compatibility") return VIP_PRICE_COMPAT_FEN;
  if (spread && spreadGuideMeta[spread]?.paid) return VIP_PRICE_DEEP_FEN;
  return 0;
}

let currentSpreadConfig = {}; let requiredCardsCount = 0; let cardsDrawn = 0; let cardsFlipped = 0; let drawnCardsData = []; let shuffledDeck = []; let isMobile = false; let isNightMode = false;
let activeReadingMode = "standard";
let currentPreviewIndex = -1;
let latestReadingRecord = null;
let screenModeHideTimer = null;
let vipConfirmCountdownTimer = null;
let vipConfirmRemainingSeconds = 0;
let startHoldTimer = null;
let startHoldStartedAt = 0;
let startHoldCommitted = false;
let deckSpreadProgress = 0;
let deckSpreadUnlocked = false;
let deckGestureCleanup = null;
let finalRevealTransitionRunning = false;
const DAILY_CACHE_KEY = "tarotDailyReading";
const VIP_TOKEN_KEY = "tarotVipToken";
const VIP_ORDER_ID_KEY = "tarotVipOrderId";
const VIP_STATIC_QR_URL = "https://i.postimg.cc/P525Vk7w/IMG-9071.png";
const VAULT_META_KEY = "tarotVaultMeta";
const DENSITY_MODE_KEY = "tarotReadingDensityMode";
const HISTORY_LIMIT = 20;
const NOTES_LIMIT = 40;
const START_HOLD_MS = 3000;
const DECK_SPREAD_THRESHOLD = 140;
// Removed emotion range labels — now using emoji reaction bar

// ── Intro dismiss ────────────────────────────────────────────────────────
let introDone = false;
let initDone = false;
function dismissIntro() {
  if (introDone) return;
  // Don't dismiss until initEventBindings has run, unless failsafe kicks in
  if (!initDone) return;
  introDone = true;
  const introEl = document.getElementById('introScreen');
  if (introEl) introEl.style.opacity = 0;
  setTimeout(() => {
    if (introEl) introEl.style.display = 'none';
    const ui = document.getElementById('uiElements');
    if (ui) { ui.style.opacity = 1; ui.style.display = 'flex'; }
    document.body.classList.add("home-ready");
  }, 380);
}
// Absolute failsafe: force dismiss after 6s even if window.onload never fires
let eventsBound = false;
setTimeout(() => {
  if (!eventsBound) { try { initEventBindings(); eventsBound = true; } catch(e) { console.error(e); } }
  if (!introDone) {
    initDone = true;
    dismissIntro();
  }
}, 6000);

window.onload = function() {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // ── Event bindings first — must not be blocked by other init failures ───
  if (!eventsBound) { try { initEventBindings(); eventsBound = true; } catch(e) { console.error("initEventBindings failed:", e); } }

  // ── Rest of init ─────────────────────────────────────────────────────────
  try {
    applyDensityMode(localStorage.getItem(DENSITY_MODE_KEY) || "compact");
    applyTimePhaseTheme(); initStarfield(); renderSpread(); renderSpreadGuide(); loadHistory(); renderHomeDate(); updateStatus("");
  } catch(e) { console.error("init failed:", e); }

  // Mark init complete, then auto-dismiss intro after a brief pause
  initDone = true;
  setTimeout(dismissIntro, 800);
};

function applyDensityMode(mode = "compact") {
  const normalized = mode === "relaxed" ? "relaxed" : "compact";
  document.body.classList.remove("reading-density-compact", "reading-density-relaxed");
  document.body.classList.add(`reading-density-${normalized}`);
}

function initEventBindings() {
  const byId = id => document.getElementById(id);
  const bindReturnHome = element => {
    if (!element) return;
    let lastTriggerAt = 0;
    const trigger = () => {
      const now = Date.now();
      if (now - lastTriggerAt < 250) return;
      lastTriggerAt = now;
      handleReturnToHomePage();
    };
    element.addEventListener("click", trigger);
    element.addEventListener("pointerup", event => {
      event.preventDefault();
      trigger();
    });
  };
  byId("dailyBtn")?.addEventListener("click", startDailyDraw);
  bindReturnHome(byId("dailyBackBtn"));
  byId("growthHubBtn")?.addEventListener("click", openGrowthHub);
  byId("feedbackBtn")?.addEventListener("click", openFeedbackModal);
  byId("quickDrawBtn")?.addEventListener("click", quickDrawSingleCard);
  initStartHoldGesture();
  byId("startBtn")?.addEventListener("click", () => {
    checkVipAndStart({ requireQuestion: true, mode: "standard" });
  });
  byId("startCoupleBtn")?.addEventListener("click", startCompatibilityReading);
  byId("coupleToggleBtn")?.addEventListener("click", () => {
    const card = document.getElementById("coupleCard");
    if (card) card.classList.toggle("couple-collapsed");
  });
  byId("spreadSelect")?.addEventListener("change", () => {
    renderSpread();
    renderSpreadGuide();
  });

  byId("saveJournalNoteBtn")?.addEventListener("click", saveJournalNote);
  byId("confirmVipPaidBtn")?.addEventListener("click", openVipConfirmModal);
  byId("submitVipCodeBtn")?.addEventListener("click", submitVipCode);
  byId("vipCodeInput")?.addEventListener("keydown", event => {
    if (event.key === "Enter") submitVipCode();
  });
  byId("cancelVipConfirmBtn")?.addEventListener("click", closeVipConfirmModal);
  byId("confirmVipContinueBtn")?.addEventListener("click", confirmVipPaidAndContinue);
  byId("closeVipBtn")?.addEventListener("click", closeVipModal);
  byId("clearHistoryBtn")?.addEventListener("click", clearHistory);
  byId("closeGrowthHubBtn")?.addEventListener("click", closeGrowthHub);
  byId("closeGrowthHubPanelBtn")?.addEventListener("click", closeGrowthHub);
  byId("closeFeedbackBtn")?.addEventListener("click", closeFeedbackModal);
  byId("closeContactBtn")?.addEventListener("click", closeContactModal);
  byId("closeCardPreviewBtn")?.addEventListener("click", closeCardPreview);
  byId("sendFeedbackBtn")?.addEventListener("click", sendFeedback);
  byId("saveBtn")?.addEventListener("click", saveAsImage);
  byId("newQuestionBtn")?.addEventListener("click", () => {
    handleReturnToHomePage();
    setTimeout(() => {
      const qi = document.getElementById("questionInput");
      if (qi) { qi.focus(); qi.scrollIntoView({ behavior: "smooth" }); }
    }, 300);
  });
  bindReturnHome(byId("immersiveBackBtn"));
  byId("historyDetailCloseBtn")?.addEventListener("click", closeHistoryDetail);
  byId("questionInput")?.addEventListener("input", () => updateQuestionHint());
  byId("coupleQuestionInput")?.addEventListener("input", () => updateCoupleHint());
  document.querySelectorAll(".emoji-react").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".emoji-react").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  byId("growthHubModal")?.addEventListener("click", e => {
    if (e.target?.id === "growthHubModal") closeGrowthHub();
  });
  byId("contactModal")?.addEventListener("click", e => {
    if (e.target?.id === "contactModal") closeContactModal();
  });
  byId("feedbackModal")?.addEventListener("click", e => {
    if (e.target?.id === "feedbackModal") closeFeedbackModal();
  });
  byId("cardPreviewModal")?.addEventListener("click", e => {
    if (e.target?.id === "cardPreviewModal") closeCardPreview();
  });

  // Card preview prev/next navigation
  byId("cardPreviewPrev")?.addEventListener("click", () => {
    if (currentPreviewIndex <= 0) return;
    const prevIdx = currentPreviewIndex - 1;
    if (drawnCardsData[prevIdx]) openCardPreview(drawnCardsData[prevIdx], prevIdx);
  });
  byId("cardPreviewNext")?.addEventListener("click", () => {
    if (currentPreviewIndex < 0 || currentPreviewIndex >= drawnCardsData.length - 1) return;
    const nextIdx = currentPreviewIndex + 1;
    if (drawnCardsData[nextIdx]) openCardPreview(drawnCardsData[nextIdx], nextIdx);
  });

  // Touch swipe for card preview modal
  let _swipeStartX = 0;
  const previewModal = byId("cardPreviewModal");
  if (previewModal) {
    previewModal.addEventListener("touchstart", e => { _swipeStartX = e.touches[0].clientX; }, { passive: true });
    previewModal.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - _swipeStartX;
      if (Math.abs(dx) < 50) return;
      if (dx < 0 && currentPreviewIndex >= 0 && currentPreviewIndex < drawnCardsData.length - 1) {
        const ni = currentPreviewIndex + 1;
        if (drawnCardsData[ni]) openCardPreview(drawnCardsData[ni], ni);
      } else if (dx > 0 && currentPreviewIndex > 0) {
        const pi = currentPreviewIndex - 1;
        if (drawnCardsData[pi]) openCardPreview(drawnCardsData[pi], pi);
      }
    }, { passive: true });
  }
  updateQuestionHint();
  updateCoupleHint();
  setInterval(() => {
    applyTimePhaseTheme();
    renderHomeDate();
  }, 60 * 1000);
}

/* Old ritual-hold-btn functions removed — start button is now a normal click,
   ritual orb on homepage handles hold gesture separately. */

function clearStartHoldTimer() {
  if (startHoldTimer) {
    clearInterval(startHoldTimer);
    startHoldTimer = null;
  }
}

function initStartHoldGesture() {
  const btn = document.getElementById("ritualOrbBtn");
  if (!btn) return;

  const energyMessages = [
    "✦ 今日能量：热情与创造力在涌动",
    "✦ 今日能量：你的直觉比平时更敏锐",
    "✦ 今日能量：适合静心，答案会自己浮现",
    "✦ 今日能量：改变正在悄悄靠近你",
    "✦ 今日能量：放下执念，好运自然来",
    "✦ 今日能量：今天适合做一个小小的冒险",
    "✦ 今日能量：身边有人正想着你",
    "✦ 今日能量：你比自己以为的更强大",
  ];

  const onDown = e => {
    if (e?.cancelable) e.preventDefault();
    if (startHoldTimer || startHoldCommitted) return;
    startHoldStartedAt = performance.now();
    setRitualOrbProgress(0.02);
    setRitualOrbLabel("感应中…");
    btn.classList.add("is-charging");

    startHoldTimer = setInterval(() => {
      const elapsed = performance.now() - startHoldStartedAt;
      const progress = Math.min(1, elapsed / START_HOLD_MS);
      setRitualOrbProgress(progress);
      if (progress < 1) {
        const leftSec = Math.max(0, Math.ceil((START_HOLD_MS - elapsed) / 1000));
        setRitualOrbLabel(`能量校准中… ${leftSec}s`);
        return;
      }
      startHoldCommitted = true;
      clearStartHoldTimer();
      btn.classList.remove("is-charging");
      btn.classList.add("is-ready");
      if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
      const msg = energyMessages[Math.floor(Math.random() * energyMessages.length)];
      setRitualOrbLabel(msg);
      setTimeout(() => {
        resetRitualOrbState();
        setRitualOrbLabel("再按一次，感应新的能量");
      }, 4000);
    }, 16);
  };

  const onUp = () => {
    if (startHoldCommitted) return;
    clearStartHoldTimer();
    setRitualOrbProgress(0);
    setRitualOrbLabel("松开了…再试一次");
    btn.classList.remove("is-charging");
    setTimeout(() => setRitualOrbLabel("长按水晶球，感应今日能量"), 1800);
  };

  btn.addEventListener("mousedown", onDown);
  btn.addEventListener("touchstart", onDown, { passive: false });
  btn.addEventListener("mouseup", onUp);
  btn.addEventListener("mouseleave", onUp);
  btn.addEventListener("touchend", onUp);
  btn.addEventListener("touchcancel", onUp);
  btn.addEventListener("contextmenu", e => e.preventDefault());
}

function setRitualOrbProgress(progress = 0) {
  const ring = document.getElementById("ritualOrbProgress");
  const btn = document.getElementById("ritualOrbBtn");
  if (!ring) return;
  const p = Math.max(0, Math.min(1, Number(progress) || 0));
  ring.style.transform = `scaleX(${p})`;
  if (btn) {
    btn.classList.toggle("is-charging", p > 0 && p < 1);
    btn.classList.toggle("is-ready", p >= 1);
  }
}

function setRitualOrbLabel(text) {
  const label = document.getElementById("ritualOrbLabel");
  if (label) label.textContent = text;
}

function resetRitualOrbState() {
  clearStartHoldTimer();
  startHoldStartedAt = 0;
  startHoldCommitted = false;
  setRitualOrbProgress(0);
  const btn = document.getElementById("ritualOrbBtn");
  if (btn) btn.classList.remove("is-charging", "is-ready");
}

function setFlowStep(step) {
  const wrap = document.getElementById("flowSteps");
  if (!wrap) return;
  wrap.style.display = "grid";
  wrap.querySelectorAll(".flow-step").forEach(el => {
    const n = Number(el.getAttribute("data-step") || "0");
    el.classList.toggle("active", n === step);
    el.classList.toggle("done", n < step);
  });
}

function hideFlowSteps() {
  const wrap = document.getElementById("flowSteps");
  if (wrap) wrap.style.display = "none";
}

function updateQuestionHint(isError = false) {
  const hint = document.getElementById("questionHint");
  const input = document.getElementById("questionInput");
  if (!hint || !input) return;
  if (isError && !input.value.trim()) {
    hint.textContent = "请先写下你的问题，再开启解牌。";
    hint.classList.add("error");
    return;
  }
  hint.textContent = "你的问题仅用于本次解牌，不会公开展示。";
  hint.classList.remove("error");
}

function updateCoupleHint(isError = false) {
  const hint = document.getElementById("coupleQuestionHint");
  const input = document.getElementById("coupleQuestionInput");
  if (!hint || !input) return;
  if (isError && !input.value.trim()) {
    hint.textContent = "建议补充关系课题，牌意会更清晰。";
    hint.classList.add("error");
    return;
  }
  hint.textContent = "双人信息仅用于本次解牌，不会被公开。";
  hint.classList.remove("error");
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
    dawn: "晨光时段 · 宜立意",
    day: "白昼时段 · 宜决断",
    dusk: "薄暮时段 · 宜复盘",
    night: "夜深时段 · 宜疗愈"
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
  const weather = getDailyWeatherMood(now);

  document.body.setAttribute("data-weather", weather);
}

function getDailyWeatherMood(date) {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const weatherTypes = ["sunny", "cloudy", "rainy", "misty"];
  const seed = Math.abs(key.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0));
  return weatherTypes[seed % weatherTypes.length];
}

async function sendFeedback() {
  const msgEl = document.getElementById("feedbackMessage");
  const btn = document.getElementById("sendFeedbackBtn");
  const message = msgEl?.value?.trim() || "";

  if (!message) {
    alert("请先写下你想告诉我的话。");
    return;
  }

  const payload = {
    name: "匿名用户",
    email: "未填写",
    message,
    page: window.location.href,
    createdAt: new Date().toISOString()
  };

  if (btn) {
    btn.disabled = true;
    btn.textContent = "投递中…";
  }

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let errMsg = "信使暂时离线";
      try { const d = await res.json(); errMsg = d.error || errMsg; } catch {}
      throw new Error(errMsg);
    }

    if (msgEl) msgEl.value = "";
    const statusEl = document.getElementById("feedbackSendStatus");
    if (statusEl) statusEl.style.display = "none";
    document.getElementById("feedbackMailtoFallback")?.style.setProperty("display", "none", "important");
    closeFeedbackModal();
    updateStatus("感谢你的星语，已送达邮箱。");
  } catch (err) {
    const statusEl = document.getElementById("feedbackSendStatus");
    const fallback = document.getElementById("feedbackMailtoFallback");
    if (statusEl) {
      statusEl.textContent = `接口暂时不可用：${err.message || "网络异常"}。可以直接发邮件给我。`;
      statusEl.style.display = "block";
    }
    if (fallback) {
      const subject = encodeURIComponent("塔罗之眼用户意见反馈");
      const body = encodeURIComponent(`意见：\n${message}`);
      fallback.href = `mailto:jingni18@hotmail.com?subject=${subject}&body=${body}`;
      fallback.style.display = "inline-block";
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "投递星语";
    }
  }
}

const SPREAD_DOTS_HTML = {
  single:       `<span class="sdr"><i class="sd"></i></span>`,
  yesno:        `<span class="sdr"><i class="sd"></i><i class="sd"></i><i class="sd"></i></span>`,
  time:         `<span class="sdr"><i class="sd"></i><i class="sd"></i><i class="sd"></i></span>`,
  relationship: `<span class="sdr"><i class="sd"></i><i class="sd"></i></span><span class="sdr"><i class="sd"></i><i class="sd"></i></span>`,
  career:       `<span class="sdr"><i class="sd"></i><i class="sd"></i></span><span class="sdr"><i class="sd"></i><i class="sd"></i></span>`,
  choice:       `<span class="sdr"><i class="sd sd-g"></i><i class="sd"></i><i class="sd sd-g"></i></span><span class="sdr"><i class="sd"></i><i class="sd"></i><i class="sd"></i></span><span class="sdr"><i class="sd sd-g"></i><i class="sd"></i><i class="sd sd-g"></i></span>`,
  cross:        `<span class="sdr"><i class="sd sd-g"></i><i class="sd"></i><i class="sd sd-g"></i></span><span class="sdr"><i class="sd"></i><i class="sd"></i><i class="sd"></i></span><span class="sdr"><i class="sd sd-g"></i><i class="sd"></i><i class="sd sd-g"></i></span>`,
};

function renderSpreadGuide() {
  const wrap = document.getElementById("spreadVisualGuide");
  const select = document.getElementById("spreadSelect");
  if (!wrap || !select) return;

  const selected = select.value;
  const keys = Object.keys(spreadGuideMeta).filter(k => {
    const option = Array.from(select.options).find(opt => opt.value === k);
    return option && !option.hidden && !option.disabled;
  });

  const freeCards = keys.filter(k => !spreadGuideMeta[k].paid).map(k => {
    const info = spreadGuideMeta[k];
    const activeClass = k === selected ? "active" : "";
    const dots = SPREAD_DOTS_HTML[k] || "";
    return `
      <button class="spread-pill ${activeClass}" data-spread="${k}" type="button">
        <span class="spread-pill__icon">${info.icon}</span>
        <span class="spread-pill__name">${info.title}</span>
        <span class="spread-pill__meta">${info.count}张 · 免费</span>
        <span class="spread-pill__dots">${dots}</span>
      </button>
    `;
  }).join("");

  const paidCards = keys.filter(k => spreadGuideMeta[k].paid).map(k => {
    const info = spreadGuideMeta[k];
    const activeClass = k === selected ? "active" : "";
    const priceFen = info.priceFen || VIP_PRICE_DEEP_FEN;
    const dots = SPREAD_DOTS_HTML[k] || "";
    return `
      <button class="spread-pill is-paid ${activeClass}" data-spread="${k}" type="button">
        <span class="spread-pill__icon">${info.icon}</span>
        <span class="spread-pill__name">${info.title}</span>
        <span class="spread-pill__meta">${info.count}张 · 🔒 ${formatFenPrice(priceFen)}/次</span>
        <span class="spread-pill__dots">${dots}</span>
      </button>
    `;
  }).join("");

  const info = spreadGuideMeta[selected] || spreadGuideMeta.cross;
  const payHint = document.getElementById("payHintText");
  const startBtn = document.getElementById("startBtn");
  const isPaid = Boolean(info.paid);
  if (payHint) {
    payHint.textContent = isPaid
      ? `当前为进阶牌阵，价格 ${formatFenPrice(getUnlockPriceForMode(activeReadingMode, selected))}/次，开启后将进入支付校验流程。`
      : "当前牌阵无需解锁。";
    payHint.classList.toggle("locked", isPaid);
  }
  if (startBtn) {
    const priceText = formatFenPrice(getUnlockPriceForMode(activeReadingMode, selected));
    startBtn.textContent = isPaid ? `🔮 开启解牌（${priceText}/次）` : "🔮 开启解牌";
  }

  const currentInfo = spreadGuideMeta[selected] || spreadGuideMeta.cross;

  wrap.innerHTML = `
    <div class="spread-current-pick">
      <span class="spread-current-pick__icon">${currentInfo.icon}</span>
      <span class="spread-current-pick__name">${currentInfo.title}</span>
      <span class="spread-current-pick__meta">${currentInfo.count}张${currentInfo.paid ? ' · 🔒' : ''}</span>
      <button class="spread-current-pick__change" type="button">更换牌阵</button>
    </div>
    <div class="spread-picker-drawer" style="display:none;">
      <div class="spread-pills-groups">
        <div class="spread-pills spread-pills--free">${freeCards}</div>
        <details class="spread-pills-advanced">
          <summary class="spread-pills-advanced__toggle">进阶牌阵 <span class="spread-pills-advanced__arrow">▾</span></summary>
          <div class="spread-pills spread-pills--paid">${paidCards}</div>
        </details>
      </div>
    </div>
    <div class="spread-guide-text">${info.desc}</div>
  `;

  wrap.querySelector(".spread-current-pick__change")?.addEventListener("click", () => {
    const drawer = wrap.querySelector(".spread-picker-drawer");
    if (drawer) drawer.style.display = drawer.style.display === "none" ? "" : "none";
  });

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

function getSelectedMood() {
  const active = document.querySelector(".emoji-react.active");
  const mood = active?.getAttribute("data-mood") || "calm";
  const label = active?.textContent?.trim() || "😌 平静";
  return { value: mood, label };
}

function getReadingContext(question = "", mode = activeReadingMode) {
  const isCompatibility = mode === "compatibility";
  const userName = isCompatibility ? (document.getElementById("coupleUserInput")?.value?.trim() || "") : "";
  const partnerName = isCompatibility ? (document.getElementById("couplePartnerInput")?.value?.trim() || "") : "";
  const baseQuestion = isCompatibility
    ? (document.getElementById("coupleQuestionInput")?.value?.trim() || "")
    : (document.getElementById("questionInput")?.value?.trim() || "");
  const emotion = getSelectedMood();
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
  const sortMode = "desc";
  const summary = document.getElementById("timelineSummary");
  if (!list) return;
  const records = Array.isArray(HistoryService.records) ? HistoryService.records : [];
  list.innerHTML = "";

  if (summary) {
    const total = records.length;
    const compatibility = records.filter(r => r.isCompatibility).length;
    const notes = JournalService.notes.length;
    const avgEmotion = total ? (records.reduce((sum, r) => sum + getMoodScore(r.emotionLevel), 0) / total).toFixed(1) : "0.0";
    summary.innerHTML = `
      <div class="timeline-summary-item"><div class="timeline-summary-label">总记录</div><div class="timeline-summary-value">${total}</div></div>
      <div class="timeline-summary-item"><div class="timeline-summary-label">双人占卜</div><div class="timeline-summary-value">${compatibility}</div></div>
      <div class="timeline-summary-item"><div class="timeline-summary-label">心情均值</div><div class="timeline-summary-value">${avgEmotion}/5</div></div>
      <div class="timeline-summary-item"><div class="timeline-summary-label">笔记数</div><div class="timeline-summary-value">${notes}</div></div>
    `;
  }

  if (!records.length) {
    list.innerHTML = '<div class="timeline-item"><div class="timeline-item-main">暂无解牌记录。先完成一次解牌，再回来复盘你的模式。</div></div>';
    return;
  }

  const mapped = records.map(r => ({ record: r, topic: inferTimelineTopic(r), tags: extractTimelineTags(r) }));
  const filtered = mapped;

  if (!filtered.length) {
    list.innerHTML = '<div class="timeline-item"><div class="timeline-item-main">暂无记录。</div></div>';
    return;
  }

  filtered.forEach(({ record, tags, topic }) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    const snippet = String(record.reading || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 62);
    item.innerHTML = `
      <div class="timeline-item-time">${record.date || "未知时间"}</div>
      <div class="timeline-item-main">${record.question || "单牌速读"} · ${record.spread || "未知牌阵"}</div>
      <div class="timeline-item-snippet">${snippet ? `${snippet}…` : "无解牌节选"}</div>
      <div class="timeline-tags">${tags.map(t => `<span class="timeline-tag">${t}</span>`).join("")}</div>
    `;
    item.addEventListener("click", () => openHistoryDetail({ ...record, timelineTopic: topic }));
    list.appendChild(item);
  });

  renderJournalRecordOptions();
}

function updateStatus(text) {
  const banner = document.getElementById("statusBanner");
  if (!banner) return;
  if (/已抽取|请点击牌面抽取|已进入深度模式|已进入双人模式|直觉速取准备中|灵感正在凝聚/.test(text)) return;
  banner.innerText = text;
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
function clearHistory() {
  const count = HistoryService.records.length;
  if (!count) { updateStatus("暂无记录可清空。"); return; }
  const msg = `确定要清空全部 ${count} 条解牌记录吗？此操作不可撤销。`;
  if (!confirm(msg)) return;
  HistoryService.clear();
  renderVaultMeta();
  renderTimeline();
  updateStatus("解牌记录已清空，新的旅程可以开始了。");
}

function getMoodScore(level) {
  const moodScoreMap = {
    calm: 3,
    inspired: 4,
    confused: 2,
    excited: 5
  };
  const normalized = String(level || "").trim();
  if (normalized in moodScoreMap) return moodScoreMap[normalized];
  const numeric = Number(normalized);
  if (Number.isFinite(numeric) && numeric > 0) return Math.max(1, Math.min(5, numeric));
  return 3;
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

function openGrowthHub() {
  const modal = document.getElementById("growthHubModal");
  const panel = document.getElementById("growthHubPanel");
  if (!modal || !panel) return;

  loadHistory();
  JournalService.load();
  renderVaultMeta();
  panel.style.display = "block";
  modal.style.display = "flex";
  renderTimeline();
  renderJournalNotes();
  renderJournalRecordOptions();
}


function closeGrowthHub() {
  const modal = document.getElementById("growthHubModal");
  if (modal) modal.style.display = "none";
}

function renderVaultMeta() {
  const metaEl = document.getElementById("vaultMeta");
  if (!metaEl) return;

  const meta = readVaultMeta();
  const totalReadings = Array.isArray(HistoryService.records) ? HistoryService.records.length : 0;
  const totalNotes = Array.isArray(JournalService.notes) ? JournalService.notes.length : 0;

  if (!meta?.name) {
    metaEl.textContent = `当前为访客档案，共保存 ${totalReadings} 条解牌记录、${totalNotes} 条札记。`;
    return;
  }

  metaEl.textContent = `${meta.name} 的成长档案，当前保存 ${totalReadings} 条解牌记录、${totalNotes} 条札记。`;
}

function renderJournalRecordOptions() {
  const select = document.getElementById("journalRecordSelect");
  if (!select) return;
  const options = ['<option value="">不关联记录</option>'];
  HistoryService.records.forEach((r, idx) => {
    const title = `${r.date || "未知时间"} · ${r.question || "单牌速读"}`;
    options.push(`<option value="${idx}">${title}</option>`);
  });
  select.innerHTML = options.join("");
}

function saveJournalNote() {
  const noteInput = document.getElementById("journalNoteInput");
  const recordSelect = document.getElementById("journalRecordSelect");
  const text = noteInput?.value?.trim() || "";
  if (!text) {
    alert("先写下一点感受再保存吧。");
    return;
  }
  const selectedIndex = Number(recordSelect?.value || "-1");
  const linked = Number.isInteger(selectedIndex) && selectedIndex >= 0 ? HistoryService.records[selectedIndex] : null;
  const emotion = getSelectedMood();
  JournalService.add({
    text,
    date: new Date().toLocaleString(),
    emotionLabel: emotion.label,
    emotionLevel: emotion.value,
    linkedQuestion: linked?.question || "",
    linkedSpread: linked?.spread || ""
  });
  if (noteInput) noteInput.value = "";
  renderVaultMeta();
  updateStatus("心境札记已保存到成长档案。");
}

function renderJournalNotes() {
  const list = document.getElementById("journalNotesList");
  if (!list) return;
  list.innerHTML = "";
  if (!JournalService.notes.length) {
    list.innerHTML = '<div class="timeline-item"><div class="timeline-item-main">还没有札记，写下今天第一条心境记录吧。</div></div>';
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
  const statusEl = document.getElementById("feedbackSendStatus");
  if (statusEl) statusEl.style.display = "none";
  document.getElementById("feedbackMailtoFallback")?.style.setProperty("display", "none", "important");
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

function openCardPreview(cardData, index = -1) {
  const modal = document.getElementById("cardPreviewModal");
  const imageEl = document.getElementById("cardPreviewImage");
  const emojiEl = document.getElementById("cardPreviewEmoji");
  const positionEl = document.getElementById("cardPreviewPosition");
  const nameEl = document.getElementById("cardPreviewName");
  const meaningEl = document.getElementById("cardPreviewMeaning");
  if (!modal || !imageEl || !emojiEl || !positionEl || !nameEl || !meaningEl || !cardData) return;

  currentPreviewIndex = index;

  positionEl.textContent = cardData.position || "已翻开的牌";
  nameEl.textContent = normalizeCardName(cardData.cardName) || cardData.cardName || "未知牌";
  meaningEl.textContent = cardData.meaning || "这张牌正在给你一个更清楚的提示。";

  if (cardData.imageUrl) {
    imageEl.src = cardData.imageUrl;
    imageEl.alt = `${normalizeCardName(cardData.cardName)}牌面大图`;
    imageEl.style.display = "block";
    emojiEl.style.display = "none";
    imageEl.onerror = () => {
      imageEl.style.display = "none";
      emojiEl.style.display = "flex";
      emojiEl.textContent = cardData.emoji || "✧";
    };
  } else {
    imageEl.style.display = "none";
    emojiEl.style.display = "flex";
    emojiEl.textContent = cardData.emoji || "✧";
  }

  // Show/hide prev-next nav based on available flipped cards
  const flippedCount = drawnCardsData.filter(Boolean).length;
  const showNav = index >= 0 && flippedCount > 1;
  const prevBtn = document.getElementById("cardPreviewPrev");
  const nextBtn = document.getElementById("cardPreviewNext");
  if (prevBtn) prevBtn.style.display = showNav ? "" : "none";
  if (nextBtn) nextBtn.style.display = showNav ? "" : "none";

  modal.style.display = "flex";
}

function closeCardPreview() {
  const modal = document.getElementById("cardPreviewModal");
  if (modal) modal.style.display = "none";
}

function normalizeCardName(cardName = "") {
  return String(cardName).replace(/\s*\((?:逆位|正位)\)\s*/g, "").trim();
}

function getTarotCardCode(cardName = "") {
  return tarotCardCodeMap[normalizeCardName(cardName)] || "";
}

function getTarotImageUrl(cardName = "") {
  const code = getTarotCardCode(cardName);
  return code ? `${TAROT_IMAGE_BASE_URL}${code}.jpg` : "";
}

function applyFaceArtwork(slotIndex, cardData) {
  const artWrap = document.getElementById(`art-${slotIndex}`);
  const imageEl = document.getElementById(`image-${slotIndex}`);
  const emojiEl = document.getElementById(`emoji-${slotIndex}`);
  if (!artWrap || !imageEl || !emojiEl) return;

  if (cardData?.imageUrl) {
    artWrap.style.display = "block";
    imageEl.style.display = "block";
    imageEl.src = cardData.imageUrl;
    imageEl.alt = `${normalizeCardName(cardData.cardName)}牌面`;
    emojiEl.style.display = "none";
    imageEl.onerror = () => {
      artWrap.style.display = "none";
      imageEl.style.display = "none";
      emojiEl.style.display = "block";
    };
    return;
  }

  artWrap.style.display = "none";
  imageEl.style.display = "none";
  emojiEl.style.display = "block";
}

function applyDailyCardArtwork(cardName = "", fallbackEmoji = "✨") {
  const imageEl = document.getElementById("dailyImage");
  const emojiEl = document.getElementById("dailyEmoji");
  if (!imageEl || !emojiEl) return;

  const imageUrl = getTarotImageUrl(cardName);
  if (imageUrl) {
    imageEl.src = imageUrl;
    imageEl.alt = `${normalizeCardName(cardName)}牌面`;
    imageEl.style.display = "block";
    emojiEl.style.display = "none";
    imageEl.onerror = () => {
      imageEl.style.display = "none";
      emojiEl.style.display = "block";
      emojiEl.innerText = fallbackEmoji;
    };
    return;
  }

  imageEl.style.display = "none";
  emojiEl.style.display = "block";
  emojiEl.innerText = fallbackEmoji;
}

function hideHomeShell(modeClass) {
  const ui = document.getElementById("uiElements");
  if (screenModeHideTimer) {
    clearTimeout(screenModeHideTimer);
    screenModeHideTimer = null;
  }

  document.body.classList.remove("reading-mode", "daily-mode");
  document.body.classList.add(modeClass);
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (!ui) return;
  ui.classList.add("fade-out");
  screenModeHideTimer = window.setTimeout(() => {
    if (document.body.classList.contains(modeClass)) {
      ui.style.display = "none";
    }
  }, 420);
}

function enterReadingMode() {
  hideHomeShell("reading-mode");
  // immersiveBackBtn intentionally not shown — restartBtn in actionBtns handles going home
}

function enterDailyMode() {
  hideHomeShell("daily-mode");
}

function returnToHomePage() {
  stopVipOrderPolling();
  resetRitualOrbState();
  resetDeckSpreadState();
  finalRevealTransitionRunning = false;
  // Clear VIP token so each paid reading requires fresh payment
  sessionStorage.removeItem(VIP_TOKEN_KEY);
  localStorage.removeItem(VIP_ORDER_ID_KEY);
  document.body.classList.remove("screen-shake");
  const finalFlash = document.getElementById("finalFlashOverlay");
  if (finalFlash) finalFlash.classList.remove("active");
  const backBtn = document.getElementById("immersiveBackBtn");
  if (backBtn) backBtn.style.display = "none";
  const hideIds = [
    "vipModal",
    "historyDetailModal",
    "growthHubModal",
    "feedbackModal",
    "contactModal",
    "cardPreviewModal",
    "dailyCardArea",
    "shuffleArea",
    "deckArea",
    "revealInstruction",
    "readingWrapper",
    "actionBtns",
    "energyText"
  ];
  hideIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  if (screenModeHideTimer) {
    clearTimeout(screenModeHideTimer);
    screenModeHideTimer = null;
  }
  document.body.classList.remove("daily-mode");
  document.body.classList.remove("reading-mode");
  document.body.classList.remove("reading-text-active");

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
  const miniCardBar = document.getElementById("miniCardBar");
  if (miniCardBar) {
    miniCardBar.style.display = "none";
    miniCardBar.innerHTML = "";
  }
  const stream = document.getElementById("streamContent");
  if (stream) stream.innerHTML = "";
  const summary = document.getElementById("readingSummary");
  if (summary) {
    summary.style.display = "none";
    summary.innerHTML = "";
  }

  activeReadingMode = "standard";
  hideFlowSteps();

  const deep = document.getElementById("deepSettings");
  const couple = document.getElementById("couplePanel");
  if (deep) deep.style.display = "";
  if (couple) couple.style.display = "";

  // Ensure all homepage cards are restored after any reading flow.
  document.querySelectorAll(".card-quick, .card-deep, .card-love").forEach(card => {
    card.style.display = "";
  });

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

function handleReturnToHomePage() {
  try {
    returnToHomePage();
  } catch (error) {
    console.error("[Tarot Eye] returnToHomePage failed:", error);
  }
}

function startCompatibilityReading() {
  const partnerName = document.getElementById("couplePartnerInput")?.value?.trim();
  if (!partnerName) {
    alert("请先填写 TA 的昵称，再开启双人合盘。");
    return;
  }
  activeReadingMode = "compatibility";
  setFlowStep(1);
  updateCoupleHint(true);
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
    <p><strong>模式：</strong>${record.mode || "解牌"}</p>
    <p><strong>问题：</strong>${record.question || "未填写"}</p>
    <p><strong>主题：</strong>${record.timelineTopic || inferTimelineTopic(record)}</p>
    <p><strong>解牌：</strong>经典韦特流</p>
    <p><strong>情绪雷达：</strong>${record.emotionLabel || "平静观察"}</p>
    <p><strong>双人合盘：</strong>${record.isCompatibility ? `${record.userName || "你"} × ${record.partnerName}` : "未开启"}</p>
    <p><strong>牌阵：</strong>${record.spread || "未知"}</p>
    <hr style="border-color: rgba(255,255,255,0.16); margin: 12px 0;">
    <p><strong>牌面详情</strong></p>
    ${cardsText}
    <hr style="border-color: rgba(255,255,255,0.16); margin: 12px 0;">
    <p><strong>解读节选</strong></p>
    <div>${record.reading || "暂无解牌正文。"}</div>
  `;

  modal.style.display = "flex";
}

function closeHistoryDetail() {
  const modal = document.getElementById("historyDetailModal");
  if (modal) modal.style.display = "none";
}

function pushLatestReadingToArchive() {
  if (!latestReadingRecord) {
    alert("先完成一次解牌，再写入成长档案。");
    return;
  }
  const summaryText = String(latestReadingRecord.reading || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
  const emotion = latestReadingRecord.emotionLabel || "平静观察";
  JournalService.add({
    text: `来自解牌总结：${summaryText || "已完成一次解牌，后续可继续补充行动反馈。"}`,
    date: new Date().toLocaleString(),
    emotionLabel: emotion,
    emotionLevel: latestReadingRecord.emotionLevel || "calm",
    linkedQuestion: latestReadingRecord.question || "",
    linkedSpread: latestReadingRecord.spread || ""
  });
  renderVaultMeta();
  updateStatus("已写入成长档案，可在心境札记继续补充行动反馈。");
  openGrowthHub();
}

function shuffle(array) { let cur = array.length, rnd; while (cur !== 0) { rnd = Math.floor(Math.random() * cur); cur--; [array[cur], array[rnd]] = [array[rnd], array[cur]]; } return array; }

function playSound(id) { const audio = document.getElementById(id); audio.currentTime = 0; audio.volume = 0.4; audio.play().catch(e => {}); }

/* 核心修复：渲染空卡牌，默认先隐藏（display:none），冥想结束后才出现 */
function renderSpread() {
  const spreadType = document.getElementById("spreadSelect").value;
  currentSpreadConfig = spreadsOptions[spreadType]; requiredCardsCount = currentSpreadConfig.cards.length;
  
  const container = document.getElementById("spreadContainer"); container.innerHTML = ""; 
  container.className = `spread-container layout-${currentSpreadConfig.cssClass}`;
  
  currentSpreadConfig.cards.forEach((pos, index) => {
    container.innerHTML += `<div class="card-slot" id="slot-${index}"><div class="slot-label" id="label-${index}">${pos.label}</div><div class="card" id="card-${index}"><div class="card-face card-back">✧</div><div class="card-face card-front"><div class="card-art" id="art-${index}"><img class="card-image" id="image-${index}" alt="塔罗牌面"></div><div class="emoji" id="emoji-${index}">❓</div><div class="name" id="name-${index}">等待抽取</div></div></div></div>`;
  });
  renderSpreadGuide();
}

function checkVipAndStart({ requireQuestion = true, mode = "standard" } = {}) {
  activeReadingMode = mode;
  setFlowStep(1);
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
  if (requireQuestion && !q) {
    if (mode === "compatibility") updateCoupleHint(true);
    else updateQuestionHint(true);
    updateStatus("先写下问题，再开启解牌。");
    return;
  }
  updateStatus(mode === "compatibility" ? "正在准备双人合盘…" : "正在准备深度解牌…");
  if (requiredCardsCount > 3 && !hasValidVipToken()) {
    document.getElementById("vipModal").style.display = "flex";
    const priceFen = getUnlockPriceForMode(mode, document.getElementById("spreadSelect")?.value || "");
    updateStatus(`该牌阵需解锁，当前价格 ${formatFenPrice(priceFen)}/次。扫码支付后点击“我已完成支付”继续。`);
    prepareVipPaymentFlow();
    return;
  }
  showEnergyEffect(requiredCardsCount > 3 && hasValidVipToken());
}

function quickDrawSingleCard() {
  activeReadingMode = "quick";
  setFlowStep(1);
  document.getElementById("spreadSelect").value = "single";
  renderSpread();
  document.getElementById("questionInput").value = "";
  updateStatus("单牌速读准备中，抽取你的灵感之牌…");
  updateQuestionHint();
  showEnergyEffect();
}

function setVipOrderStatus(text, meta = "") {
  const box = document.getElementById("vipOrderStatusBox");
  const textEl = document.getElementById("vipOrderStatusText");
  const metaEl = document.getElementById("vipOrderMeta");
  if (box) box.style.display = "block";
  if (textEl) textEl.textContent = text;
  if (metaEl) metaEl.textContent = meta;
}

function setVipCodeHint(text, isError = false) {
  const hint = document.getElementById("vipCodeHint");
  if (!hint) return;
  hint.textContent = text;
  hint.classList.toggle("error", isError);
}

function stopVipOrderPolling() {
  localStorage.removeItem(VIP_ORDER_ID_KEY);
}

function prepareVipPaymentFlow() {
  const priceFen = getUnlockPriceForMode(activeReadingMode, document.getElementById("spreadSelect")?.value || "");
  const qrImg = document.getElementById("qrImage");
  const codeInput = document.getElementById("vipCodeInput");
  if (qrImg) qrImg.src = VIP_STATIC_QR_URL;
  if (codeInput) codeInput.value = "";
  setVipCodeHint("", false);
  setVipOrderStatus("状态：请扫码支付", `当前价格 ${formatFenPrice(priceFen)}/次，支付后点击“我已完成支付，继续解牌”。`);
}

function closeVipModal() {
  document.getElementById("vipModal").style.display = "none";
  closeVipConfirmModal();
  stopVipOrderPolling();
}

function clearVipConfirmCountdown() {
  if (vipConfirmCountdownTimer) {
    clearInterval(vipConfirmCountdownTimer);
    vipConfirmCountdownTimer = null;
  }
}

function updateVipConfirmButtonState() {
  const btn = document.getElementById("confirmVipContinueBtn");
  if (!btn) return;
  if (vipConfirmRemainingSeconds > 0) {
    btn.disabled = true;
    btn.textContent = `确认并继续（${vipConfirmRemainingSeconds}）`;
    return;
  }
  btn.disabled = false;
  btn.textContent = "确认并继续";
}

function openVipConfirmModal() {
  const modal = document.getElementById("vipConfirmModal");
  if (!modal) return;
  clearVipConfirmCountdown();
  vipConfirmRemainingSeconds = 2;
  updateVipConfirmButtonState();
  modal.style.display = "flex";
  vipConfirmCountdownTimer = setInterval(() => {
    vipConfirmRemainingSeconds -= 1;
    updateVipConfirmButtonState();
    if (vipConfirmRemainingSeconds <= 0) clearVipConfirmCountdown();
  }, 1000);
}

function closeVipConfirmModal() {
  clearVipConfirmCountdown();
  vipConfirmRemainingSeconds = 0;
  const modal = document.getElementById("vipConfirmModal");
  if (modal) modal.style.display = "none";
  updateVipConfirmButtonState();
}

function confirmVipPaidAndContinue() {
  if (vipConfirmRemainingSeconds > 0) return;
  closeVipConfirmModal();
  closeVipModal();
  showEnergyEffect(true);
}

function readVipToken() {
  try {
    const raw = sessionStorage.getItem(VIP_TOKEN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.token || !parsed?.expiresAt) return null;
    if (!String(parsed.token).includes(".")) return null;
    return parsed;
  } catch {
    return null;
  }
}

function hasValidVipToken() {
  const vip = readVipToken();
  if (!vip) return false;
  const stillValid = Date.now() < vip.expiresAt;
  if (!stillValid) {
    sessionStorage.removeItem(VIP_TOKEN_KEY);
    return false;
  }
  return true;
}

async function requestVipTokenByCode(code) {
  const endpoints = [
    { url: "/api/vip-verify", payload: { unlockCode: code } },
    { url: "/api/vip-test-code-verify", payload: { code } }
  ];

  for (const item of endpoints) {
    try {
      const response = await fetch(item.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item.payload)
      });

      if (!response.ok) continue;
      const data = await response.json();
      if (data?.token && data?.expiresAt) return data;
    } catch {
      continue;
    }
  }

  throw new Error("口令无效或当前验证服务不可用");
}

async function submitVipCode() {
  const input = document.getElementById("vipCodeInput");
  const button = document.getElementById("submitVipCodeBtn");
  const code = String(input?.value || "").trim();
  if (!code) {
    setVipCodeHint("请先输入 VIP 口令或朋友测试码。", true);
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "验证中…";
  }

  try {
    const tokenData = await requestVipTokenByCode(code);
    sessionStorage.setItem(VIP_TOKEN_KEY, JSON.stringify({ token: tokenData.token, expiresAt: tokenData.expiresAt }));
    setVipCodeHint("校验通过，已为你解锁本次会话。", false);
    setVipOrderStatus("状态：已验证", "口令校验通过，现在可以继续解牌。");
    closeVipModal();
    showEnergyEffect(true);
  } catch (error) {
    setVipCodeHint(error.message || "口令校验失败，请重试。", true);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "口令解锁";
    }
  }
}

function showEnergyEffect(isVip = false) {
  setFlowStep(1);
  enterReadingMode();
  const energyText = document.getElementById("energyText");
  energyText.innerText = isVip ? "能量已接收，更深层的因果线正在展开" : "灵感已汇聚，塔罗之眼正在缓缓张开";
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
    setTimeout(() => { shuffleArea.style.display = "none"; document.getElementById("deckArea").style.display = "flex"; initFanDeck(); }, 2000);
  }, 800);
}

function initFanDeck() {
  cardsDrawn = 0; cardsFlipped = 0; drawnCardsData = []; shuffledDeck = shuffle([...deck]);
  const fanDeck = document.getElementById("fanDeck"); fanDeck.innerHTML = "";
  fanDeck.classList.add("arc-fan", "is-stacked");
  fanDeck.classList.remove("is-unlocked");
  fanDeck.style.setProperty("--spread-progress", "0");
  deckSpreadProgress = 0;
  deckSpreadUnlocked = false;
  const totalCards = isMobile ? 21 : 33;
  const fanRange = isMobile ? 130 : 148; // total arc in degrees
  const cardsLeftEl = document.getElementById("cardsLeft"); if (cardsLeftEl) cardsLeftEl.innerText = requiredCardsCount;
  for (let i = 0; i < totalCards; i++) {
    const ratio = totalCards <= 1 ? 0.5 : i / (totalCards - 1);
    const fanAngle = (ratio - 0.5) * fanRange; // -66 to +66 deg
    const jitter = (Math.random() - 0.5) * 8; // stacked randomness (deg)
    const distFromCenter = Math.abs(i - Math.floor(totalCards / 2));
    const cardEl = document.createElement("div");
    cardEl.className = "deck-card";
    cardEl.style.setProperty("--fan-angle", `${fanAngle.toFixed(2)}deg`);
    cardEl.style.setProperty("--stack-jitter", `${jitter.toFixed(2)}deg`);
    cardEl.style.zIndex = String(120 + totalCards - distFromCenter); // center cards on top when stacked
    cardEl.onclick = function() {
      if (!deckSpreadUnlocked) return;
      if (cardsDrawn < requiredCardsCount && !this.classList.contains("drawn")) {
        userDrawsOneCard(this);
      }
    };
    fanDeck.appendChild(cardEl);
  }
  attachDeckSpreadGesture(fanDeck);
  updateStatus("牌阵准备中，稍候自动展开…");
  const hint = document.getElementById("deckSpreadHint");
  if (hint) {
    hint.classList.remove("show", "unlocked", "near-unlock");
    hint.textContent = "正在感应你的能量…";
    window.setTimeout(() => hint.classList.add("show"), 420);
  }

  const spreadContainer = document.getElementById("spreadContainer");
  if (spreadContainer) spreadContainer.style.opacity = "1";

  // 自动展开牌扇，让用户直接点牌
  const autoSpreadSteps = [0, 0.12, 0.28, 0.45, 0.62, 0.78, 0.9, 1.0];
  autoSpreadSteps.forEach((p, i) => {
    setTimeout(() => {
      if (deckSpreadUnlocked) return;
      setDeckSpreadProgress(p);
      if (p >= 1) unlockDeckSpread();
    }, 1000 + i * 100);
  });
}

function setDeckSpreadProgress(nextProgress = 0) {
  const fanDeck = document.getElementById("fanDeck");
  if (!fanDeck) return;
  deckSpreadProgress = Math.max(0, Math.min(1, Number(nextProgress) || 0));
  fanDeck.style.setProperty("--spread-progress", deckSpreadProgress.toFixed(3));
  fanDeck.classList.toggle("is-unlocked", deckSpreadProgress >= 0.999);
  fanDeck.classList.toggle("is-stacked", deckSpreadProgress < 0.999);
}

function unlockDeckSpread() {
  if (deckSpreadUnlocked) return;
  deckSpreadUnlocked = true;
  setDeckSpreadProgress(1);
  updateStatus("牌已展开，点击你感应到的那张牌。");
  if (navigator.vibrate) navigator.vibrate(35);
  const hint = document.getElementById("deckSpreadHint");
  if (hint) {
    hint.classList.remove("show");
    hint.classList.add("unlocked");
    hint.textContent = "✨ 点击你感应到的那张牌";
    hint.classList.add("show");
    window.setTimeout(() => hint.classList.remove("show"), 3000);
  }
  // 更新标题文字和光晕提示
  const instrEl = document.getElementById("instructionText");
  if (instrEl) {
    instrEl.textContent = "✨ 用心感受，点击你感应到的牌";
    instrEl.classList.add("draw-hint");
  }

  const spreadContainer = document.getElementById("spreadContainer");
  if (spreadContainer) spreadContainer.style.opacity = "1";

  // Inject draw progress tracker into deckArea
  const deckAreaForTracker = document.getElementById("deckArea");
  let tracker = document.getElementById("drawSlotTracker");
  if (tracker) tracker.remove();
  tracker = document.createElement("div");
  tracker.id = "drawSlotTracker";
  tracker.className = "draw-slot-tracker";
  tracker.innerHTML = currentSpreadConfig.cards.map((pos, i) =>
    `<span class="dst-slot" id="dst-${i}"><span class="dst-dot"></span><span class="dst-label">${pos.label}</span></span>`
  ).join("");
  if (deckAreaForTracker) deckAreaForTracker.appendChild(tracker);
}

function updateDeckSpreadHint(progress = 0) {
  const hint = document.getElementById("deckSpreadHint");
  if (!hint || deckSpreadUnlocked) return;
  hint.classList.remove("unlocked");
  if (progress <= 0.01) {
    hint.classList.remove("show");
    return;
  }
  const pct = Math.min(100, Math.round(progress * 100));
  if (progress >= 0.35) {
    hint.textContent = `松手即可展开牌阵（${pct}%）`;
    hint.classList.add("show", "near-unlock");
  } else {
    hint.textContent = `继续滑动展开牌阵（${pct}%）`;
    hint.classList.remove("near-unlock");
    hint.classList.add("show");
  }
}

function resetDeckSpreadState() {
  if (typeof deckGestureCleanup === "function") {
    deckGestureCleanup();
    deckGestureCleanup = null;
  }
  deckSpreadProgress = 0;
  deckSpreadUnlocked = false;
  const fanDeck = document.getElementById("fanDeck");
  if (!fanDeck) return;
  fanDeck.style.setProperty("--spread-progress", "0");
  fanDeck.classList.remove("is-unlocked");
  fanDeck.classList.add("is-stacked");
  const hint = document.getElementById("deckSpreadHint");
  if (hint) hint.classList.remove("show", "unlocked", "near-unlock");
}

function attachDeckSpreadGesture(fanDeck) {
  if (!fanDeck) return;
  if (typeof deckGestureCleanup === "function") {
    deckGestureCleanup();
    deckGestureCleanup = null;
  }

  let isDragging = false;
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let originProgress = 0;
  const threshold = isMobile ? DECK_SPREAD_THRESHOLD * 0.72 : DECK_SPREAD_THRESHOLD;

  const onDown = event => {
    if (deckSpreadUnlocked) return;
    isDragging = true;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    originProgress = deckSpreadProgress;
    fanDeck.classList.add("is-dragging");
    if (fanDeck.setPointerCapture && pointerId !== null) {
      fanDeck.setPointerCapture(pointerId);
    }
  };

  const onMove = event => {
    if (!isDragging || deckSpreadUnlocked) return;
    if (pointerId !== null && event.pointerId !== pointerId) return;
    const delta = Math.abs(event.clientX - startX);
    const progress = Math.max(originProgress, delta / threshold);
    setDeckSpreadProgress(progress);
    updateDeckSpreadHint(progress);
    if (progress >= 1) {
      unlockDeckSpread();
      onUp(event);
    }
  };

  const onUp = event => {
    if (!isDragging) return;
    if (pointerId !== null && event?.pointerId !== undefined && event.pointerId !== pointerId) return;
    isDragging = false;
    fanDeck.classList.remove("is-dragging");
    // Tap detection: if barely moved, treat as tap → auto-expand
    const dx = event ? Math.abs(event.clientX - startX) : 0;
    const dy = event ? Math.abs(event.clientY - startY) : 0;
    const isTap = dx < 10 && dy < 10;
    if (!deckSpreadUnlocked) {
      if (isTap || deckSpreadProgress >= 0.4) {
        unlockDeckSpread();
      } else if (deckSpreadProgress < 0.15) {
        setDeckSpreadProgress(0);
        updateDeckSpreadHint(0);
      } else {
        updateDeckSpreadHint(deckSpreadProgress);
      }
    }
    if (fanDeck.releasePointerCapture && pointerId !== null) {
      try { fanDeck.releasePointerCapture(pointerId); } catch {}
    }
    pointerId = null;
  };

  fanDeck.addEventListener("pointerdown", onDown);
  fanDeck.addEventListener("pointermove", onMove);
  fanDeck.addEventListener("pointerup", onUp);
  fanDeck.addEventListener("pointercancel", onUp);
  fanDeck.addEventListener("pointerleave", onUp);

  deckGestureCleanup = () => {
    fanDeck.removeEventListener("pointerdown", onDown);
    fanDeck.removeEventListener("pointermove", onMove);
    fanDeck.removeEventListener("pointerup", onUp);
    fanDeck.removeEventListener("pointercancel", onUp);
    fanDeck.removeEventListener("pointerleave", onUp);
  };
}

function userDrawsOneCard(clickedCardElement) {
  playSound("drawSound"); if (navigator.vibrate) navigator.vibrate(50); 
  clickedCardElement.classList.add("drawn");
  const cardData = shuffledDeck.pop();
  const isReversed = Math.random() < 0.2; const reversedText = isReversed ? " (逆位)" : " (正位)";

  const drawnImageUrl = getTarotImageUrl(cardData.name);
  drawnCardsData.push({ position: currentSpreadConfig.cards[cardsDrawn].label, cardName: cardData.name + reversedText, meaning: cardData.meaning, isReversed: isReversed, emoji: cardData.emoji, imageUrl: drawnImageUrl });
  if (drawnImageUrl) { const preImg = new Image(); preImg.src = drawnImageUrl; }
  const targetSlotCard = document.getElementById(`card-${cardsDrawn}`);
  targetSlotCard.classList.add("dealt"); document.getElementById(`label-${cardsDrawn}`).classList.add("visible");
  // Update draw progress tracker
  const dstSlot = document.getElementById(`dst-${cardsDrawn}`);
  if (dstSlot) dstSlot.classList.add("filled");
  cardsDrawn++; const cardsLeftEl2 = document.getElementById("cardsLeft"); if (cardsLeftEl2) cardsLeftEl2.innerText = (requiredCardsCount - cardsDrawn);

  if (cardsDrawn === requiredCardsCount) { 
    const deckArea = document.getElementById("deckArea");
    setTimeout(() => {
      if (deckArea) deckArea.classList.add("fading-out");
      setTimeout(() => {
        if (deckArea) { deckArea.style.display = "none"; deckArea.classList.remove("fading-out"); }
        document.getElementById("revealInstruction").style.display = "block";
        updateStatus("牌已就位，依次翻牌揭晓答案。");
        for(let i=0; i<requiredCardsCount; i++) { document.getElementById(`card-${i}`).onclick = function() { userFlipsCard(i); }; }
      }, 560);
    }, 500);
  }
}

function userFlipsCard(i) {
  const cardElement = document.getElementById(`card-${i}`);
  if(cardElement.classList.contains("flipped")) {
    openCardPreview(drawnCardsData[i], i);
    return;
  }

  playSound("revealSound"); if (navigator.vibrate) navigator.vibrate(80); 
  const data = drawnCardsData[i];
  applyFaceArtwork(i, data);
  document.getElementById(`emoji-${i}`).innerText = data.emoji; document.getElementById(`name-${i}`).innerText = data.cardName;
  cardElement.classList.add("flipped"); if(data.isReversed) cardElement.classList.add("reversed");
  cardElement.classList.add("previewable");
  
  cardsFlipped++;
  if (cardsFlipped === requiredCardsCount) {
    document.getElementById("revealInstruction").style.display = "none";
    setFlowStep(2);
    updateStatus("牌面已揭晓，正在进入最终转场…");
    const context = getReadingContext("", activeReadingMode);
    const question = context.question;
    const style = "classic";
    triggerFinalRevealAndReading(question, style, drawnCardsData, context);
  }
}

function waitMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeOutAndPauseAudio() {
  const audios = Array.from(document.querySelectorAll("audio"));
  if (!audios.length) return;
  const active = audios.filter(a => !a.paused && a.volume > 0.01);
  if (!active.length) return;

  for (let step = 0; step < 7; step++) {
    active.forEach(audio => {
      const nextVolume = Math.max(0, audio.volume - 0.12);
      audio.volume = nextVolume;
      if (nextVolume <= 0.01) audio.pause();
    });
    await waitMs(55);
  }
}

async function playFinalFlashTransition() {
  fadeOutAndPauseAudio(); // fire-and-forget
  await waitMs(400);

  const overlay = document.getElementById("finalFlashOverlay");
  if (overlay) {
    overlay.classList.add("active");
  }
  if (navigator.vibrate) navigator.vibrate(25);

  await waitMs(1500);
  if (overlay) overlay.classList.remove("active");
}

async function triggerFinalRevealAndReading(question, style, cards, context) {
  if (finalRevealTransitionRunning) return;
  finalRevealTransitionRunning = true;
  try {
    await playFinalFlashTransition();
    // Keep spread container visible — CSS reading-text-active moves it to left sidebar
    document.body.classList.add("reading-text-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("readingWrapper").style.display = "block";
    document.getElementById("readingBox").classList.add("visible");
    renderMiniCardBar(cards);
    fetchStream(question, style, cards, context);
  } finally {
    finalRevealTransitionRunning = false;
  }
}

function renderMiniCardBar(cards = []) {
  const bar = document.getElementById("miniCardBar");
  if (!bar) return;

  const miniCards = Array.isArray(cards) ? cards.slice(0, 5) : [];
  if (!miniCards.length) {
    bar.style.display = "none";
    bar.innerHTML = "";
    return;
  }

  bar.innerHTML = miniCards.map((item, index) => {
    const emoji = String(item?.emoji || "🔮");
    const position = String(item?.position || `位置${index + 1}`);
    const baseName = normalizeCardName(item?.cardName || "");
    return `
      <div class="mini-card-item" role="button" tabindex="0" data-idx="${index}" title="${baseName}">
        <span class="mini-card-emoji">${emoji}</span>
        <span class="mini-card-position">${position}</span>
        <span class="mini-card-name">${baseName}</span>
      </div>
    `;
  }).join("");

  bar.style.display = "flex";
  bar.querySelectorAll(".mini-card-item").forEach(el => {
    const onClick = () => {
      const idx = parseInt(el.getAttribute("data-idx"), 10);
      if (!isNaN(idx) && drawnCardsData[idx]) openCardPreview(drawnCardsData[idx], idx);
    };
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") onClick(); });
  });
}

function wrapReadingSectionsAsCollapsible() {
  const container = document.getElementById("streamContent");
  if (!container) return;
  // Only wrap h3 headings that are NOT the quick-takeaway header
  const allH3 = Array.from(container.querySelectorAll("h3")).filter(h =>
    !h.textContent.includes("速览") && !h.textContent.includes("takeaway")
  );
  if (allH3.length < 2) return;

  allH3.forEach((h, idx) => {
    const nextH = allH3[idx + 1] || null;
    const parent = h.parentNode;
    if (!parent) return;

    const details = document.createElement("details");
    if (idx === 0) details.setAttribute("open", "");
    details.className = "reading-section-details";

    const summary = document.createElement("summary");
    summary.className = "reading-section-summary";
    summary.textContent = h.textContent.trim();
    details.appendChild(summary);

    // Collect sibling nodes between this h3 and the next h3
    const toMove = [];
    let cur = h.nextSibling;
    while (cur && cur !== nextH) {
      toMove.push(cur);
      cur = cur.nextSibling;
    }
    toMove.forEach(node => details.appendChild(node));
    parent.replaceChild(details, h);
  });
}

function renderReadingSummary(rawHtml) {
  const box = document.getElementById("readingSummary");
  if (!box) return;

  // Try to extract the AI-generated summary div first
  const summaryMatch = String(rawHtml || "").match(/<div class="reading-summary">([\s\S]*?)<\/div>/);
  if (summaryMatch) {
    box.innerHTML = `<div class="reading-summary">${summaryMatch[1]}</div>`;
    box.style.display = "block";
    return;
  }

  // Fallback: extract first 3 sentences
  const plain = String(rawHtml || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!plain) { box.style.display = "none"; return; }
  const parts = plain.split(/(?<=[。！？!?])/).map(s => s.trim()).filter(Boolean).slice(0, 3);
  if (!parts.length) { box.style.display = "none"; return; }
  box.innerHTML = `<div class="reading-summary">${parts.join("")}</div>`;
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
      throw new Error("星界通道拥堵，请稍后重试");
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
      throw new Error("日签抽取失败");
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
      throw new Error("简版解牌生成失败");
    }

    return response.json();
  }
};

/* 流式输出解码 */
async function fetchStream(question, style, cards, context = getReadingContext(question, activeReadingMode)) {
  const streamContent = document.getElementById("streamContent"); const cursor = document.getElementById("cursor");
  streamContent.innerHTML = ""; let htmlBuffer = "";
  const escapeRegExp = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const getCardBaseNames = () => {
    return [...new Set((Array.isArray(cards) ? cards : [])
      .map(item => String(item?.cardName || "").replace(/\s*\((逆位|正位)\)\s*/g, "").trim())
      .filter(Boolean))];
  };
  const injectCoreQuoteBlock = (source = "") => {
    const markdown = String(source || "").trim();
    if (!markdown) return markdown;
    if (/^\s*>/m.test(markdown)) return markdown;
    // 若 AI 已输出 reading-keywords 块，不再重复注入引用
    if (/class="reading-keywords"/.test(markdown)) return markdown;
    const quote = extractCoreQuote(markdown);
    if (!quote) return markdown;
    return `> ${quote}\n\n${markdown}`;
  };
  const injectQuickTakeaways = (source = "") => {
    const markdown = String(source || "").trim();
    if (!markdown) return markdown;
    if (/###\s*三点速览/.test(markdown)) return markdown;

    const plain = stripRichText(markdown);
    if (!plain || plain.length < 48) return markdown;
    const points = plain.split(/(?<=[。！？!?])/).map(s => s.trim()).filter(Boolean).slice(0, 3);
    if (points.length < 2) return markdown;
    const block = `### 三点速览\n${points.map(p => `- ${p}`).join("\n")}\n\n---\n\n`;
    return `${block}${markdown}`;
  };
  const applyTarotTagHighlight = () => {
    const root = streamContent;
    if (!root) return;
    const names = getCardBaseNames();
    if (!names.length) return;
    const sorted = names.slice().sort((a, b) => b.length - a.length);
    const nameSet = new Set(sorted);
    const regex = new RegExp(`(${sorted.map(escapeRegExp).join("|")})`, "g");
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const value = String(node?.nodeValue || "");
        if (!value.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("code, pre, .tarot-tag")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let current = walker.nextNode();
    while (current) {
      nodes.push(current);
      current = walker.nextNode();
    }

    nodes.forEach(node => {
      const text = String(node.nodeValue || "");
      const parts = text.split(regex);
      if (parts.length <= 1) return;

      const frag = document.createDocumentFragment();
      parts.forEach(part => {
        if (!part) return;
        if (nameSet.has(part)) {
          const tag = document.createElement("span");
          tag.className = "tarot-tag";
          tag.textContent = part;
          frag.appendChild(tag);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode?.replaceChild(frag, node);
    });
  };

  const renderMarkdown = (markdownText = "", isFinal = false) => {
    let cleaned = String(markdownText || "")
      .replace(/```html/gi, '').replace(/```/g, '')
      .replace(/<\/?(?:div|span|style)[^>]*>/gi, '')
      .replace(/<h4>(.*?)<\/h4>/gi, '#### $1')
      .replace(/<\/?p>/gi, '\n')
      .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<\/?(?:ul|ol)>/gi, '')
      .replace(/<li>(.*?)<\/li>/gi, '- $1');
    const source = isFinal ? injectQuickTakeaways(cleaned) : cleaned;
    if (typeof marked !== "undefined" && typeof marked.parse === "function") {
      streamContent.innerHTML = marked.parse(source);
      applyTarotTagHighlight();
      return;
    }
    streamContent.textContent = source;
  };
  let rafPending = false;

  if (typeof marked !== "undefined" && typeof marked.setOptions === "function") {
    marked.setOptions({ gfm: true, breaks: true });
  }

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
            if(dataStr.startsWith('[ERROR]')) {
              htmlBuffer += `\n\n> ${dataStr}`;
              renderMarkdown(htmlBuffer);
              continue;
            }
            const data = JSON.parse(dataStr);
            const content = data.choices?.[0]?.delta?.content || "";
            htmlBuffer += content;
            if (!rafPending) {
              rafPending = true;
              requestAnimationFrame(() => { renderMarkdown(htmlBuffer); rafPending = false; });
            }
            if (cursor) cursor.style.display = "inline-block";
          } catch (e) {
            console.error("流数据解析失败", e);
            updateStatus("内容加载有轻微抖动，系统正在自动修复中…");
          }
        }
      }
    }

    const spreadLabel = document.getElementById("spreadSelect") ? document.getElementById("spreadSelect").selectedOptions[0].innerText : "未知牌阵";
    const displayQuestion = compositeQuestion || "直觉速取";
    const mode = detailContext.mode === "compatibility" ? "双人合盘" : (detailContext.mode === "quick" ? "直觉速取" : "深度占卜");
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
    renderMarkdown(htmlBuffer, true);
    renderReadingSummary(historyRecord.reading);
    setFlowStep(3);
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
      const fallbackText = fallback.reading || "星界连接暂时不稳，已为你生成简版解牌。";
      renderMarkdown(fallbackText);
      const spreadLabel = document.getElementById("spreadSelect") ? document.getElementById("spreadSelect").selectedOptions[0].innerText : "未知牌阵";
      const displayQuestion = compositeQuestion || "直觉速取";
      const mode = detailContext.mode === "compatibility" ? "双人合盘" : (detailContext.mode === "quick" ? "直觉速取" : "深度占卜");
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
      renderReadingSummary(historyRecord.reading);
      setFlowStep(3);
      updateStatus("网络波动，已自动切换到稳定模式。你可以继续阅读，不影响结果。");
    } catch {
      renderMarkdown(`> 🔮 宇宙连接中断: ${error.message}`);
      updateStatus("连接失败：请检查网络后重试，或返回主页重新抽牌。");
    }
  } finally {
    if(cursor) cursor.style.display = "none";
    if(aiStatus) aiStatus.style.display = "none";
    const actionBtns = document.getElementById("actionBtns"); if(actionBtns) actionBtns.style.display = "flex";
    wrapReadingSectionsAsCollapsible();
    if (historyRecord) {
      latestReadingRecord = historyRecord;
      addHistoryRecord(historyRecord);
      updateStatus("解牌已生成并存入成长档案，可直接保存图片或继续复盘。");
    }
  }
}

/* 日签逻辑 */
async function startDailyDraw() {
  enterDailyMode();
  document.getElementById("dailyCardArea").style.display = "grid";
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
        cardImage: getTarotImageUrl(randomMajor.name),
        reading: data.reading || "跟随内在指引，今天也是会被命运眷顾的一天。"
      };
      localStorage.setItem(DAILY_CACHE_KEY, JSON.stringify(dailyData));
    } catch {
      dailyData = {
        dayKey,
        cardName: randomMajor.name,
        cardEmoji: randomMajor.emoji,
        cardImage: getTarotImageUrl(randomMajor.name),
        reading: "跟随内在指引，今天也是会被命运眷顾的一天。"
      };
      localStorage.setItem(DAILY_CACHE_KEY, JSON.stringify(dailyData));
    }
  }

  applyDailyCardArtwork(dailyData.cardName, dailyData.cardEmoji);
  document.getElementById("dailyName").innerText = dailyData.cardName;
  document.getElementById("dailyQuote").innerText = dailyData.reading;
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
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); }); resize(); draw();
}

/* Old canvas drawing helpers removed — saveAsImage now uses html2canvas */

function stripRichText(input = "") {
  return String(input || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/`{1,3}/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[>-]\s+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCoreQuote(reading = "") {
  const plain = stripRichText(reading);
  if (!plain) return "此刻的答案，藏在你已经看见却还没行动的那一步里。";
  const parts = plain.split(/(?<=[。！？!?])/).map(s => s.trim()).filter(Boolean);
  const first = parts[0] || plain;
  return first.length > 72 ? `${first.slice(0, 72)}…` : first;
}

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`脚本加载失败: ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`脚本加载失败: ${src}`)), { once: true });
    document.head.appendChild(script);
  });
}

async function saveAsImage() {
  const btn = document.getElementById("saveBtn");
  if (!btn) return;

  if (!latestReadingRecord || !Array.isArray(latestReadingRecord.cards) || !latestReadingRecord.cards.length) {
    alert("请先完成一次解牌后再保存海报");
    return;
  }

  btn.innerText = "正在生成海报…";
  btn.disabled = true;

  try {
    if (typeof html2canvas !== "function") {
      await loadExternalScript("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js");
    }
    if (typeof html2canvas !== "function") {
      throw new Error("html2canvas 未加载");
    }

    const host = document.getElementById("posterCanvasHost");
    const poster = document.getElementById("posterCanvas");
    if (!host || !poster) throw new Error("海报容器不存在");

    fillPosterCanvasFromReading(latestReadingRecord);
    host.classList.add("is-rendering");
    await waitMs(40);

    const canvas = await html2canvas(poster, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
      width: 1080,
      height: 1920
    });

    const link = document.createElement("a");
    link.download = "塔罗之眼海报-9x16.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    host.classList.remove("is-rendering");
  } catch (error) {
    alert(`生成海报失败：${error.message || "未知错误"}`);
  } finally {
    const host = document.getElementById("posterCanvasHost");
    if (host) host.classList.remove("is-rendering");
    btn.innerText = "📸 保存解牌卷轴";
    btn.disabled = false;
  }
}

function extractPosterCoreLineFromDom() {
  const quoteNode = document.querySelector("#streamContent blockquote p");
  const quoteText = String(quoteNode?.textContent || "").replace(/\s+/g, " ").trim();
  if (quoteText) return quoteText.slice(0, 64);

  const plain = String(document.getElementById("streamContent")?.textContent || "").replace(/\s+/g, " ").trim();
  if (!plain) return "你真正要的答案，已经在你心里出现了第一束光。";
  const first = plain.split(/(?<=[。！？!?])/).map(s => s.trim()).filter(Boolean)[0] || plain;
  return first.slice(0, 64);
}

function fillPosterCanvasFromReading(record) {
  const cardsWrap = document.getElementById("posterCards");
  const quoteEl = document.getElementById("posterQuote");
  const qrEl = document.getElementById("posterQr");
  const metaEl = document.getElementById("posterMeta");
  if (!cardsWrap || !quoteEl || !qrEl || !metaEl) return;

  const cards = Array.isArray(record?.cards) ? record.cards.slice(0, 5) : [];
  cardsWrap.innerHTML = cards.map((card, idx) => {
    const name = String(card?.cardName || `牌 ${idx + 1}`);
    const position = String(card?.position || `位置${idx + 1}`);
    const imgUrl = String(card?.imageUrl || "").trim();
    if (imgUrl) {
      return `<div class="poster-card"><img src="${imgUrl}" alt="${name}"><span>${position}</span></div>`;
    }
    return `<div class="poster-card"><div class="poster-card-emoji">${String(card?.emoji || "🔮")}</div><span>${position}</span></div>`;
  }).join("");

  quoteEl.textContent = `“${extractPosterCoreLineFromDom()}”`;
  qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(window.location.origin)}`;
  metaEl.textContent = `${record?.date || new Date().toLocaleString()} · 塔罗之眼`; 
}