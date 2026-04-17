import { appState, setState, APP_STATES, updateStateSilently } from './state.js';
import { fetchReading } from './api.js';
import { playSound, updateReading } from './ui.js';

const SPREAD_OPTIONS = {
  single: { cssClass: 'linear', cards: [{ label: "核心指引" }] },
  yesno: { cssClass: 'linear', cards: [{ label: "支持的力量" }, { label: "反对的力量" }, { label: "最终答案" }] },
  time: { cssClass: 'linear', cards: [{ label: "过去的因果" }, { label: "当下的现状" }, { label: "未来的趋势" }] },
  relationship: { cssClass: 'grid', cards: [{ label: "你的现状" }, { label: "对方的状态" }, { label: "当前的阻碍" }, { label: "未来的走向" }] },
  career: { cssClass: 'grid', cards: [{ label: "事业现状" }, { label: "潜在机遇" }, { label: "未知风险" }, { label: "财务走向" }] },
  choice: { cssClass: 'cross', cards: [{ label: "当前现状" }, { label: "选A的走向" }, { label: "选B的走向" }, { label: "选A结局" }, { label: "选B结局" }] },
  cross: { cssClass: 'cross', cards: [{ label: "核心问题" }, { label: "面临的阻碍" }, { label: "潜在的目标" }, { label: "深层的潜意识" }, { label: "最终的可能结局" }] }
};

export async function loadDeck() {
  try {
    const response = await fetch('tarot-deck.json');
    if (!response.ok) throw new Error('无法加载卡牌数据');
    const deckData = await response.json();
    updateStateSilently('deck', deckData);
    console.log('卡牌数据加载成功！');
  } catch (error) {
    console.error("加载卡牌数据失败:", error);
  }
}

function shuffle(array) {
  let cur = array.length, rnd;
  while (cur !== 0) {
    rnd = Math.floor(Math.random() * cur);
    cur--;
    [array[cur], array[rnd]] = [array[rnd], array[cur]];
  }
  return array;
}

export function getSpreadConfig(spreadType, question = '', style = 'classic') {
    const config = SPREAD_OPTIONS[spreadType];
    return { ...config, question, style };
}

export function shuffleAndDeal() {
    const shuffled = shuffle([...appState.deck]);
    updateStateSilently('shuffledDeck', shuffled);
    playSound('drawSound');
    console.log("卡牌已洗好并准备发牌");
}

export function handleDrawCard(cardIndex, cardElement) {
    if (appState.cardsDrawn >= appState.requiredCardsCount) return;

    cardElement.classList.add("drawn");
    const cardData = appState.shuffledDeck.pop();
    const isReversed = Math.random() < 0.2;
    const reversedText = isReversed ? " (逆位)" : " (正位)";

    const newDrawnCards = [...appState.drawnCardsData, {
        position: appState.currentSpreadConfig.cards[appState.cardsDrawn].label,
        cardName: cardData.name + reversedText,
        isReversed: isReversed,
        emoji: cardData.emoji,
        isFlipped: false
    }];
    
    updateStateSilently('drawnCardsData', newDrawnCards);
    
    // 更新UI中的剩余牌数
    const cardsLeftEl = document.getElementById('cardsLeft');
    if(cardsLeftEl) {
        cardsLeftEl.innerText = appState.requiredCardsCount - appState.cardsDrawn;
    }

    if (appState.cardsDrawn === appState.requiredCardsCount) {
        setTimeout(() => setState(APP_STATES.AWAITING_FLIP), 1000);
    }
}

export function handleFlipCard(cardData, cardElement, index) {
    if (cardData.isFlipped) return;

    playSound("revealSound");
    cardElement.classList.add("flipped");
    
    // 更新卡片UI
    const front = cardElement.querySelector('.card-front');
    if(front) {
        front.innerHTML = `<div class="emoji">${cardData.emoji}</div><div class="name">${cardData.cardName.replace(/ \(.*?\)/, '')}</div>`;
    }

    // 更新状态
    const updatedDrawnCards = [...appState.drawnCardsData];
    updatedDrawnCards[index].isFlipped = true;
    const newFlippedCount = appState.cardsFlipped + 1;

    updateStateSilently('drawnCardsData', updatedDrawnCards);
    updateStateSilently('cardsFlipped', newFlippedCount);

    if (newFlippedCount === appState.requiredCardsCount) {
        setTimeout(() => setState(APP_STATES.SHOWING_INTERPRETATION), 1500);
    }
}

export async function startReading() {
    const { question, style, drawnCardsData, isNightMode } = appState.currentSpreadConfig;
    
    try {
        const stream = await fetchReading(question, style, "用户", drawnCardsData, null, isNightMode);
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let readingText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            readingText += decoder.decode(value, { stream: true });
            updateReading(readingText.replace(/\n/g, '<br>'));
        }
        
        updateReading(readingText.replace(/\n/g, '<br>'), true); // 标记为最终版本
        updateStateSilently('reading', readingText);

    } catch (error) {
        console.error("解读失败:", error);
        updateReading("抱歉，连接星界失败，请稍后再试。", true);
    }
}
