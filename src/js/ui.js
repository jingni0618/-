import { APP_STATES, setState, appState, setMusicPlaying, setNightMode } from './state.js';
import { handleDrawCard, handleFlipCard, startReading, getSpreadConfig, shuffleAndDeal } from './tarot.js';
import { clearHistory } from './history.js';

const appView = document.getElementById('app-view');

// --- 视图模板 --- //

function createIdleView() {
    return `
    <div class="container">
      <div class="hero-header">
        <h1 class="classic-title">👀仔的命运星盘</h1>
        <p class="subtitle">倾听宇宙回响，洞察灵魂轨迹</p>
      </div>
      <div class="status-banner">请选择占卜方式：直觉速取或深度问卜</div>

      <div class="hero-grid">
        <div class="choice-card choice-card--secondary">
          <div class="choice-card__eyebrow">直觉速取</div>
          <h2 class="choice-card__title">一张灵感牌</h2>
          <p class="choice-card__desc">无需提问，快速抽取一张塔罗牌，直达当下答案。</p>
          <div class="choice-card__icon">✨</div>
          <div class="choice-card__feature">单张解读 · 直觉优先 · 立即启示</div>
          <div class="choice-card__footer">
            <button id="quickDrawBtn" class="secondary-btn">直接抽一张</button>
          </div>
        </div>

        <div class="choice-card choice-card--main">
          <div class="choice-card__eyebrow">深度问卜</div>
          <h2 class="choice-card__title">输入问题，开启占卜</h2>
          <p class="choice-card__desc">让塔罗回应你的疑惑，生成专属的星盘解析。</p>
          <div class="choice-card__body">
            <div class="input-group">
              <label>你最想问的是什么？</label>
              <input type="text" id="questionInput" placeholder="越具体，启示越清晰...">
            </div>
            <div class="input-group">
              <label>选择解牌风格</label>
              <select id="styleSelect">
                <option value="classic">🔮 经典韦特流（客观、睿智、中正）</option>
                <option value="healing">🌸 星空疗愈流（极度温柔、情绪安抚）</option>
                <option value="harsh">🗡️ 暗黑毒舌流（犀利一针见血、专治不醒悟）</option>
              </select>
            </div>
            <div class="input-group">
              <label>选择牌阵</label>
              <select id="spreadSelect">
                <optgroup label="基础指引">
                  <option value="single">单牌神谕（1张：直觉指引）</option>
                  <option value="yesno">是非决断阵（3张：支持/反对/答案）</option>
                  <option value="time">时间之流（3张：过去/现在/未来）</option>
                </optgroup>
                <optgroup label="深度专栏">
                  <option value="relationship">情感透视阵（4张：你/对方/阻碍/未来）</option>
                  <option value="career">财富事业阵（4张：现状/机遇/风险/走向）</option>
                  <option value="choice">二选一岔路阵（5张：现状/选A/选B/A结局/B结局）</option>
                  <option value="cross" selected>灵感十字阵（5张：核心/阻碍/目标/潜意识/结局）</option>
                </optgroup>
              </select>
            </div>
          </div>
          <div class="choice-card__footer">
            <button id="startBtn" class="main-btn">开始问卜</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createDealingView() {
    return `
    <div class="immersive-container">
      <div id="shuffleArea" class="deck-area">
         <h3 class="ritual-text">洗牌中...潜意识正在注入星盘</h3>
         <div class="shuffling-deck"></div>
      </div>
    </div>
    `;
}

function createDrawView() {
    return `
    <div class="immersive-container">
      <div id="deckArea" class="deck-area">
        <h3 id="instructionText" class="ritual-text">请点击抽取 <span id="cardsLeft">${appState.requiredCardsCount - appState.cardsDrawn}</span> 张牌</h3>
        <div class="fan-deck" id="fanDeck"></div>
      </div>
    </div>
    `;
}

function createFlipView() {
    return `
    <div class="immersive-container">
      <div id="revealInstruction" class="ritual-text" style="margin-top: 20px;">命运已就位，请依次点击牌背揭晓...</div>
      <div class="spread-container" id="spreadContainer"></div>
    </div>
    `;
}

function createInterpretationView() {
    return `
    <div class="immersive-container">
      <div class="reading-wrapper" id="readingWrapper">
        <div class="parchment-box" id="readingBox">
          <div class="ai-status" id="aiStatus"><div class="crystal-ball">🔮</div><span>塔罗师正在为你推演星象...</span></div>
          <div id="streamContent" class="stream-content parchment-text"></div>
          <span id="cursor" class="typing-cursor"></span>
        </div>
        <div id="shareHeader" class="share-only" style="color: #2c241b; font-weight: bold; margin-bottom: 20px;">✨ 命运星盘 · 专属占卜报告 ✨</div>
      </div>
      <div id="actionBtns" class="action-btns" style="margin-top: 30px; justify-content: center; gap: 15px; padding-bottom: 50px;">
        <button id="saveBtn" class="save-btn">📸 保存羊皮卷轴</button>
        <button id="copyBtn" class="save-btn">📋 复制解读</button>
        <button id="restartBtn" class="save-btn restart">重新占卜</button>
      </div>
    </div>
    `;
}

// --- 渲染引擎 --- //

export function render(state) {
    appView.innerHTML = ''; // 清空视图

    switch (state.currentState) {
        case APP_STATES.IDLE:
            appView.innerHTML = createIdleView();
            requestAnimationFrame(() => {
                bindIdleViewEvents();
            });
            break;
        case APP_STATES.DEALING:
            appView.innerHTML = createDealingView();
            // 动画结束后自动转换状态
            setTimeout(() => {
                shuffleAndDeal(); // 这个函数现在只负责数据处理
                setState(APP_STATES.AWAITING_DRAW);
            }, 2500);
            break;
        case APP_STATES.AWAITING_DRAW:
            appView.innerHTML = createDrawView();
            initFanDeckUI(); // UI渲染
            break;
        case APP_STATES.AWAITING_FLIP:
            appView.innerHTML = createFlipView();
            renderSpreadUI(); // UI渲染
            break;
        case APP_STATES.SHOWING_INTERPRETATION:
            appView.innerHTML = createInterpretationView();
            bindInterpretationViewEvents();
            startReading(); // 开始获取并显示解读
            break;
        case APP_STATES.ENDED:
            setState(APP_STATES.IDLE);
            break;
    }
}

// --- 事件绑定 --- //

function bindIdleViewEvents() {
    document.getElementById('quickDrawBtn').addEventListener('click', () => {
        const config = getSpreadConfig('single');
        setState(APP_STATES.DEALING, { currentSpreadConfig: config });
    });

    document.getElementById('startBtn').addEventListener('click', () => {
        const spread = document.getElementById('spreadSelect').value;
        const question = document.getElementById('questionInput').value;
        const style = document.getElementById('styleSelect').value;
        const config = getSpreadConfig(spread, question, style);
        setState(APP_STATES.DEALING, { currentSpreadConfig: config });
    });
}

function initFanDeckUI() {
    const fanDeck = document.getElementById('fanDeck');
    if (!fanDeck) return;

    for (let i = 0; i < 22; i++) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-in-fan';
        cardElement.style.setProperty('--i', i);
        cardElement.addEventListener('click', () => handleDrawCard(i, cardElement));
        fanDeck.appendChild(cardElement);
    }
}

function renderSpreadUI() {
    const spreadContainer = document.getElementById('spreadContainer');
    if (!spreadContainer) return;

    appState.drawnCardsData.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-in-spread';
        cardElement.innerHTML = `<div class="card-back"></div><div class="card-front"></div>`;
        cardElement.addEventListener('click', () => handleFlipCard(card, cardElement, index));
        spreadContainer.appendChild(cardElement);
    });
}

function bindInterpretationViewEvents() {
    document.getElementById('restartBtn').addEventListener('click', () => {
        setState(APP_STATES.IDLE);
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
        const readingBox = document.getElementById('readingBox');
        html2canvas(readingBox).then(canvas => {
            const link = document.createElement('a');
            link.download = '命运星盘解读.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    document.getElementById('copyBtn').addEventListener('click', () => {
        const content = document.getElementById('streamContent').innerText;
        navigator.clipboard.writeText(content).then(() => alert('解读已复制到剪贴板！'));
    });
}


// --- 其他 UI 函数 --- //

export function checkNightMode() {
  const hour = new Date().getHours();
  if (hour >= 22 || hour <= 4) {
    setNightMode(true);
    document.body.classList.add("night-mode");
  } else {
    setNightMode(false);
    document.body.classList.remove("night-mode");
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
  if (appState.isMusicPlaying) {
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
  setMusicPlaying(!appState.isMusicPlaying);
}

export function showHistoryPanel() {
    const historyPanel = document.getElementById('historyPanel');
    historyPanel.innerHTML = `
        <div class="history-card">
          <div class="history-title">占卜记录</div>
          <div id="historyList" class="history-list">
            ${appState.historyRecords.map(r => `<div class="history-item"><b>${r.question || '快速抽牌'}</b><br>${r.cards.map(c => c.name).join(', ')}<br><i>${r.date}</i></div>`).join('') || '<p>暂无记录</p>'}
          </div>
          <button id="clearHistoryBtn" class="history-clear-btn">清空记录</button>
          <button id="closeHistoryBtn" class="save-btn restart" style="margin-top: 16px; width: 100%;">返回星盘</button>
        </div>
    `;
    historyPanel.style.display = 'block';

    document.getElementById('closeHistoryBtn').addEventListener('click', () => historyPanel.style.display = 'none');
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
        clearHistory();
        showHistoryPanel(); // 重新渲染
    });
}

export function updateReading(content, isFinal = false) {
    const streamContent = document.getElementById('streamContent');
    const cursor = document.getElementById('cursor');
    const aiStatus = document.getElementById('aiStatus');

    if (streamContent) {
        streamContent.innerHTML = content;
    }
    if (isFinal) {
        if (cursor) cursor.style.display = 'none';
        if (aiStatus) aiStatus.style.display = 'none';
        // 保存历史记录
        
    }
}
