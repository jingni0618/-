import { appState, setHistory, unshiftHistory } from './state.js';

export function saveHistory() {
  localStorage.setItem("tarotHistory", JSON.stringify(appState.historyRecords));
}

export function loadHistory() {
  const raw = localStorage.getItem("tarotHistory");
  if (raw) {
    try {
      setHistory(JSON.parse(raw).slice(0, 6));
    } catch (e) {
      setHistory([]);
    }
  } else {
    setHistory([]);
  }
  renderHistory();
}

export function addHistoryRecord(record) {
  unshiftHistory(record);
  saveHistory();
  renderHistory();
}

export function clearHistory() {
  setHistory([]);
  saveHistory();
  renderHistory();
  // updateStatus("记录已清空，重新开始你的占卜旅程。"); // 应该由调用者处理
}

export function renderHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;

  list.innerHTML = "";
  if (appState.historyRecords.length === 0) {
    const item = document.createElement("div");
    item.className = "history-item";
    item.textContent = "暂无记录，开始你的第一场命运占卜。";
    list.appendChild(item);
    return;
  }

  appState.historyRecords.forEach(r => {
    const item = document.createElement("div");
    item.className = "history-item";
    const title = document.createElement("div");
    const mode = r.mode || '占卜';
    const spread = r.spread || '未知牌阵';
    const date = r.date || '未知时间';
    title.textContent = `${mode} · ${spread} · ${date}`;
    const detail = document.createElement("span");
    detail.textContent = `问题：${r.question || '未输入'} · 风格：${r.style || 'classic'}`;
    item.appendChild(title);
    item.appendChild(detail);
    list.appendChild(item);
  });
}
