import * as state from './state.js';

function saveHistory() {
  localStorage.setItem("tarotHistory", JSON.stringify(state.historyRecords));
}

export function loadHistory() {
  const raw = localStorage.getItem("tarotHistory");
  if (raw) {
    try {
      state.setHistory(JSON.parse(raw).slice(0, 6));
    } catch (e) {
      state.setHistory([]);
    }
  }
  renderHistory();
}

export function addHistoryRecord(record) {
  state.unshiftHistory(record);
  saveHistory();
  renderHistory();
}

export function clearHistory() {
  state.setHistory([]);
  saveHistory();
  renderHistory();
  // updateStatus("记录已清空，重新开始你的占卜旅程。"); // 应该由调用者处理
}

export function renderHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;

  list.innerHTML = "";
  if (state.historyRecords.length === 0) {
    const item = document.createElement("div");
    item.className = "history-item";
    item.textContent = "暂无记录，开始你的第一场命运占卜。";
    list.appendChild(item);
    return;
  }

  state.historyRecords.forEach(r => {
    const item = document.createElement("div");
    item.className = "history-item";
    const title = document.createElement("div");
    title.textContent = `${r.mode} · ${r.spread} · ${r.date}`;
    const detail = document.createElement("span");
    detail.textContent = `问题：${r.question || '未输入'} · 风格：${r.style}`;
    item.appendChild(title);
    item.appendChild(detail);
    list.appendChild(item);
  });
}
