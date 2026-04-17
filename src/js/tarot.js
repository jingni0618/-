import * as state from './state.js';

console.log("tarot.js loaded");

const spreadsOptions = {
  single: { cssClass: 'linear', cards: [{ label: "核心指引" }] },
  yesno: { cssClass: 'linear', cards: [{ label: "支持的力量" }, { label: "反对的力量" }, { label: "最终答案" }] },
  time: { cssClass: 'linear', cards: [{ label: "过去的因果" }, { label: "当下的现状" }, { label: "未来的趋势" }] },
  relationship: { cssClass: 'grid', cards: [{ label: "你的现状" }, { label: "对方的状态" }, { label: "当前的阻碍" }, { label: "未来的走向" }] },
  career: { cssClass: 'grid', cards: [{ label: "事业现状" }, { label: "潜在机遇" }, { label: "未知风险" }, { label: "财务走向" }] },
  choice: { cssClass: 'cross', cards: [{ label: "当前现状" }, { label: "选A的走向" }, { label: "选B的走向" }, { label: "选A结局" }, { label: "选B结局" }] },
  cross: { cssClass: 'cross', cards: [{ label: "核心问题" }, { label: "面临的阻碍" }, { label: "潜在的目标" }, { label: "深层的潜意识" }, { label: "最终的可能结局" }] }
};

import { fetchReading } from './api.js';
import { playSound, updateStatus } from './ui.js';

function userFlipsCard(index) {
    console.log(`Entering userFlipsCard for card ${index}`);
    const card = state.drawnCardsData[index];
    if (!card || card.isFlipped) return;

    const cardElement = document.getElementById(`card-${index}`);
    if (!cardElement) return;

    playSound("revealSound");
    if (navigator.vibrate) navigator.vibrate(30);
    cardElement.classList.add("flipped");
    card.isFlipped = true;
    state.incrementCardsFlipped();

    document.getElementById(`emoji-${index}`).innerText = card.emoji;
    document.getElementById(`name-${index}`).innerText = card.cardName.replace(/ \(.*?\)/, '');

    updateStatus(`你翻开了【${card.cardName}】...`);

    if (state.cardsFlipped === state.requiredCardsCount) {
        console.log("All cards flipped, fetching reading...");
        document.getElementById("revealInstruction").style.display = "none";
        const readingWrapper = document.getElementById("readingWrapper");
        readingWrapper.style.display = "block";
        
        const question = document.getElementById("questionInput").value;
        const style = document.getElementById("styleSelect").value;
        
        fetchReading(
            question,
            style,
            "默认用户", 
            state.drawnCardsData,
            null, 
            state.isNightMode
        );
    }
}

function userDrawsOneCard(clickedCardElement) {
    console.log("Entering userDrawsOneCard");
    // playSound("drawSound"); 
    if (navigator.vibrate) navigator.vibrate(50);
    clickedCardElement.classList.add("drawn");
    const cardData = state.shuffledDeck.pop();
    const isReversed = Math.random() < 0.2;
    const reversedText = isReversed ? " (逆位)" : " (正位)";

    state.addDrawnCard({ 
        position: state.currentSpreadConfig.cards[state.cardsDrawn].label, 
        cardName: cardData.name + reversedText, 
        isReversed: isReversed, 
        emoji: cardData.emoji,
        isFlipped: false
    });

    const targetSlotCard = document.getElementById(`card-${state.cardsDrawn}`);
    targetSlotCard.classList.add("dealt");
    document.getElementById(`label-${state.cardsDrawn}`).classList.add("visible");
    state.incrementCardsDrawn();
    document.getElementById("cardsLeft").innerText = (state.requiredCardsCount - state.cardsDrawn);
    // updateStatus(`已抽取 ${state.cardsDrawn} 张，还需抽取 ${state.requiredCardsCount - state.cardsDrawn} 张`);

    if (state.cardsDrawn === state.requiredCardsCount) {
        console.log("All cards drawn");
        setTimeout(() => {
            document.getElementById("deckArea").style.display = "none";
            document.getElementById("revealInstruction").style.display = "block";
            document.getElementById('quickDrawBtn').disabled = true;
            // updateStatus("牌已到位，依次点击牌背揭晓答案。");
            for(let i=0; i<state.requiredCardsCount; i++) {
                document.getElementById(`card-${i}`).onclick = function() { 
                    userFlipsCard(i);
                }; 
            }
        }, 1000);
    }
    console.log("Exiting userDrawsOneCard");
}

export async function loadDeck() {
  console.log("Entering loadDeck");
  try {
    const response = await fetch('tarot-deck.json');
    if (!response.ok) {
      throw new Error('无法加载卡牌数据，请检查 tarot-deck.json 文件是否存在。');
    }
    const deckData = await response.json();
    state.setDeck(deckData);
    console.log('卡牌数据加载成功！');
  } catch (error) {
    console.error("Error in loadDeck:", error);
  }
  console.log("Exiting loadDeck");
}

export function shuffle(array) {
  let cur = array.length, rnd;
  while (cur !== 0) {
    rnd = Math.floor(Math.random() * cur);
    cur--;
    [array[cur], array[rnd]] = [array[rnd], array[cur]];
  }
  return array;
}

export function renderSpread() {
  console.log("Entering renderSpread");
  const spreadSelect = document.getElementById("spreadSelect");
  if (!spreadSelect) {
      console.error("renderSpread: spreadSelect element not found!");
      return;
  }
  const spreadType = spreadSelect.value;
  console.log("renderSpread: Selected spread type:", spreadType);
  const config = spreadsOptions[spreadType];
  if (!config) {
      console.error("renderSpread: Invalid spread type selected!");
      return;
  }
  state.setSpreadConfig(config);
  console.log("renderSpread: Spread config set:", config);
  
  const container = document.getElementById("spreadContainer");
  if (!container) {
      console.error("renderSpread: spreadContainer element not found!");
      return;
  }

  container.innerHTML = "";
  container.className = `spread-container layout-${config.cssClass}`;
  
  config.cards.forEach((pos, index) => {
    container.innerHTML += `<div class="card-slot" id="slot-${index}"><div class="slot-label" id="label-${index}">${pos.label}</div><div class="card" id="card-${index}"><div class="card-face card-back">✧</div><div class="card-face card-front"><div class="emoji" id="emoji-${index}">❓</div><div class="name" id="name-${index}">等待抽取</div></div></div></div>`;
  });

  const cardsLeftEl = document.getElementById('cardsLeft');
  if (cardsLeftEl) {
      cardsLeftEl.innerText = state.requiredCardsCount;
      console.log("renderSpread: Updated cardsLeft to", state.requiredCardsCount);
  }
  console.log("Exiting renderSpread");
}

export function checkVipAndStart(requireQuestion = true) {
  console.log("Entering checkVipAndStart");
  const q = document.getElementById("questionInput").value.trim();
  if (requireQuestion && !q) {
    alert("请先输入你的问题，星空才能回应。");
    return false;
  }
  if (state.requiredCardsCount > 3 && !state.paymentConfirmed) {
    document.getElementById("vipModal").style.display = "flex";
    if (state.isMobile) {
      document.getElementById("mobilePayBtn").style.display = "block";
      document.getElementById("pcPayBtn").style.display = "none";
    } else {
      document.getElementById("mobilePayBtn").style.display = "none";
      document.getElementById("pcPayBtn").style.display = "block";
    }
    console.log("checkVipAndStart: VIP modal shown");
    return false;
  }
  console.log("checkVipAndStart: proceeding to energy effect");
  return true;
}

export function initFanDeck() {
  console.log("Entering initFanDeck");
  if (state.deck.length === 0) {
    console.error("initFanDeck: Deck is not loaded!");
    return;
  }
  state.resetDrawnCards();
  const shuffled = shuffle([...state.deck]);
  state.setShuffledDeck(shuffled);
  console.log("initFanDeck: Deck shuffled");

  const fanDeck = document.getElementById("fanDeck");
  fanDeck.innerHTML = "";
  const totalCards = 38;
  const angleStep = 120 / totalCards;
  document.getElementById("cardsLeft").innerText = state.requiredCardsCount;
  console.log(`initFanDeck: Setting cardsLeft to ${state.requiredCardsCount}`);

  for (let i = 0; i < totalCards; i++) {
    const angle = -60 + (i * angleStep);
    const cardEl = document.createElement("div");
    cardEl.className = "deck-card";
    cardEl.style.transform = `rotate(${angle}deg) translateY(-20px)`;
    cardEl.style.zIndex = i;
    cardEl.onclick = function() {
      if (state.cardsDrawn < state.requiredCardsCount && !this.classList.contains("drawn")) {
        userDrawsOneCard(this);
      }
    };
    fanDeck.appendChild(cardEl);
  }

  const spreadContainer = document.getElementById("spreadContainer");
  if (spreadContainer) {
    spreadContainer.style.opacity = "1";
  }
  console.log("Exiting initFanDeck");
}
