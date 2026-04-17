export let deck = [];
export let shuffledDeck = [];
export let drawnCardsData = [];

export let currentSpreadConfig = {};
export let requiredCardsCount = 0;
export let cardsDrawn = 0;
export let cardsFlipped = 0;

export let userSoulCard = null;
export let isMobile = false;
export let paymentPending = false;
export let paymentConfirmed = false;
export let isMusicPlaying = false;
export let isNightMode = false;

export let historyRecords = [];

// 状态更新函数
export function setDeck(newDeck) {
  deck = newDeck;
}

export function setShuffledDeck(newShuffledDeck) {
  shuffledDeck = newShuffledDeck;
}

export function addDrawnCard(cardData) {
  drawnCardsData.push(cardData);
}

export function resetDrawnCards() {
  drawnCardsData = [];
  cardsDrawn = 0;
  cardsFlipped = 0;
}

export function setSpreadConfig(config) {
  currentSpreadConfig = config;
  requiredCardsCount = config.cards.length;
}

export function incrementCardsDrawn() {
  cardsDrawn++;
}

export function incrementCardsFlipped() {
  cardsFlipped++;
}

export function setMobile(mobile) {
  isMobile = mobile;
}

export function setPaymentStatus({ pending, confirmed }) {
  if (pending !== undefined) paymentPending = pending;
  if (confirmed !== undefined) paymentConfirmed = confirmed;
}

export function setMusicPlaying(playing) {
  isMusicPlaying = playing;
}

export function setNightMode(night) {
  isNightMode = night;
}

export function setHistory(records) {
  historyRecords = records;
}

export function unshiftHistory(record) {
    historyRecords.unshift(record);
    if (historyRecords.length > 6) {
        historyRecords.pop();
    }
}
