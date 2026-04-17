import { render } from './ui.js';

// 定义应用状态常量
export const APP_STATES = {
  IDLE: 'IDLE',
  DEALING: 'DEALING',
  AWAITING_DRAW: 'AWAITING_DRAW',
  AWAITING_FLIP: 'AWAITING_FLIP',
  SHOWING_INTERPRETATION: 'SHOWING_INTERPRETATION',
  ENDED: 'ENDED',
};

// 中央状态对象
export let appState = {
  currentState: APP_STATES.IDLE,
  deck: [],
  shuffledDeck: [],
  drawnCardsData: [],
  currentSpreadConfig: {},
  get requiredCardsCount() {
    return this.currentSpreadConfig.cards?.length || 0;
  },
  get cardsDrawn() {
    return this.drawnCardsData.length;
  },
  cardsFlipped: 0,
  userSoulCard: null,
  isMobile: false,
  isMusicPlaying: false,
  isNightMode: false,
  historyRecords: [],
  reading: null, // 用于存储AI解读结果
};

// 唯一的状态更新函数
export function setState(newState, payload) {
  console.log(`%cState changed: ${appState.currentState} -> ${newState}`, 'color: #2e9fff; font-weight: bold;', payload || '');

  // 更新状态
  appState.currentState = newState;

  // 处理数据负载
  if (payload) {
    Object.keys(payload).forEach(key => {
      if (key in appState) {
        appState[key] = payload[key];
      } else {
        console.warn(`Warning: Attempted to set unknown state property '${key}'`);
      }
    });
  }
  
  // 重置逻辑
  if (newState === APP_STATES.IDLE) {
      appState.drawnCardsData = [];
      appState.cardsFlipped = 0;
      appState.currentSpreadConfig = {};
      appState.reading = null;
  }

  // 触发UI重新渲染
  render(appState);
}

// 用于更新状态而不触发渲染的辅助函数
export function updateStateSilently(key, value) {
    if (key in appState) {
        appState[key] = value;
    } else {
        console.warn(`Warning: Attempted to set unknown state property '${key}'`);
    }
}

// 特定状态的便捷设置函数
export function setMusicPlaying(playing) {
    updateStateSilently('isMusicPlaying', playing);
}

export function setNightMode(night) {
    updateStateSilently('isNightMode', night);
}

export function setHistory(records) {
    updateStateSilently('historyRecords', records);
}

export function unshiftHistory(record) {
    const newHistory = [record, ...appState.historyRecords];
    if (newHistory.length > 6) {
        newHistory.pop();
    }
    updateStateSilently('historyRecords', newHistory);
}
