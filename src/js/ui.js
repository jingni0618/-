import * as state from './state.js';
import { fetchReading } from './api.js';

export function updateStatus(text) {
  const banner = document.getElementById("statusBanner");
  if (banner) banner.innerText = text;
}

export function checkNightMode() {
  const hour = new Date().getHours();
  if (hour >= 22 || hour <= 4) {
    state.setNightMode(true);
    document.body.classList.add("night-mode");
    document.getElementById("mainSubtitle").innerText = "夜深星象更清晰，静心倾听宇宙。";
  }
}

export function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.4;
    audio.play().catch(e => {});
  }
}

export function toggleMusic() {
  const bgMusic = document.getElementById("bgMusic");
  const btn = document.getElementById("musicToggle");
  if (state.isMusicPlaying) {
    bgMusic.pause();
    btn.innerText = "🎵 灵性环境音";
  } else {
    bgMusic.volume = 0.4;
    let p = bgMusic.play();
    if (p !== undefined) {
      p.then(_ => {
        btn.innerText = "🔇 静音";
      }).catch(e => {});
    }
  }
  state.setMusicPlaying(!state.isMusicPlaying);
}

function setAsideMode(show) {
  const pageGrid = document.querySelector('.page-grid');
  const aside = document.querySelector('.aside-panel');
  if (!pageGrid) return;

  pageGrid.classList.toggle('with-aside', show);
  if (aside) {
    aside.style.display = show ? 'flex' : 'none';
  }
}

export function showHistoryPanel() {
  const aside = document.querySelector(".aside-panel");
  if (!aside) return;

  document.getElementById("uiElements").style.display = "none";
  document.getElementById("dailyCardArea").style.display = "none";
  document.getElementById("historyCardArea").style.display = "block";
  setAsideMode(true);
  updateStatus("占卜记录已打开，查看你的历史占卜。");
}

export function closeHistoryPanel() {
  document.getElementById("historyCardArea").style.display = "none";
  document.getElementById("dailyCardArea").style.display = "none";
  document.getElementById("uiElements").style.display = "block";
  setAsideMode(false);
  updateStatus("回到星盘界面，继续你的占卜旅程。");
}

export async function startDailyDraw() {
  if (state.deck.length === 0) {
    updateStatus("错误：卡牌数据未加载，无法获取日签。");
    return;
  }
  // forcePlayMusic();
  setAsideMode(true);
  document.getElementById("uiElements").style.display = "none";
  document.getElementById("historyCardArea").style.display = "none";
  document.getElementById("dailyCardArea").style.display = "block";
  const today = new Date();
  const dateCN = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  document.getElementById("dailyDate").innerText = dateCN;
  const randomMajor = state.deck[Math.floor(Math.random() * 22)];
  document.getElementById("dailyEmoji").innerText = randomMajor.emoji;
  document.getElementById("dailyName").innerText = randomMajor.name;

  try {
    const response = await fetch("/api/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDaily: true, cards: [randomMajor] })
    });
    if (response.ok) {
      const data = await response.json();
      document.getElementById("dailyQuote").innerText = `“${data.reading}”`;
    } else {
      document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”";
    }
  } catch (e) {
    document.getElementById("dailyQuote").innerText = "“跟随内心的指引，今天也是充满奇迹的一天。”";
  }

  const backBtn = document.createElement("button");
  backBtn.className = "save-btn restart";
  backBtn.innerText = "返回星盘";
  backBtn.style.display = "block";
  backBtn.style.margin = "30px auto";
  backBtn.onclick = () => {
    document.getElementById("dailyCardArea").style.display = "none";
    document.getElementById("uiElements").style.display = "block";
    setAsideMode(false);
    updateStatus("回到星盘界面，继续你的占卜旅程。");
  };
  if (!document.getElementById("backBtnId")) {
    backBtn.id = "backBtnId";
    document.getElementById("dailyCardArea").appendChild(backBtn);
  }
}
