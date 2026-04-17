import { initStarfield } from './animations.js';
import { loadDeck } from './tarot.js';
import { checkNightMode, toggleMusic, showHistoryPanel } from './ui.js';
import { loadHistory } from './history.js';
import { setState, appState } from './state.js';

// 初始化永久性事件监听器
function initPermanentListeners() {
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    const historyBtn = document.getElementById('historyBtn');
    if (historyBtn) {
        historyBtn.addEventListener('click', showHistoryPanel);
    }
}

// 应用初始化函数
async function initApp() {
    console.log("App initialization started.");

    // 检查夜间模式
    checkNightMode();

    // 初始化星空背景
    initStarfield();

    // 加载永久性事件监听器
    initPermanentListeners();

    // 加载塔罗牌数据
    await loadDeck();

    // 加载历史记录
    loadHistory();

    // 初始化完成，将状态设置为 IDLE，触发第一次渲染
    setState(appState.currentState); 

    console.log("App initialized. Current state:", appState.currentState);
}

// 当DOM加载完毕后启动应用
document.addEventListener('DOMContentLoaded', initApp);
