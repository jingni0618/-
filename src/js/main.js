import { initStarfield } from './animations.js';
import { loadDeck, renderSpread, checkVipAndStart, initFanDeck } from './tarot.js';
import { checkNightMode, toggleMusic, showHistoryPanel, closeHistoryPanel, startDailyDraw, updateStatus, playSound } from './ui.js';
import { loadHistory, clearHistory } from './history.js';

console.log("main.js loaded");

function showEnergyEffect(isVip = false) {
  console.log("Entering showEnergyEffect");
  document.getElementById("uiElements").classList.add("fade-out");
  updateStatus("灵感正在凝聚，片刻后进入占卜仪式...");
  const energyText = document.getElementById("energyText");
  energyText.innerText = isVip ? "能量已接收...深层的因果锁链已被解开" : "灵感已汇聚...星盘开始转动";
  energyText.style.display = "block";

  const spreadContainer = document.getElementById("spreadContainer");
  if (spreadContainer) {
    spreadContainer.style.display = "flex";
    spreadContainer.style.opacity = "0";
  }

  setTimeout(() => {
    console.log("First timeout in showEnergyEffect");
    energyText.style.display = "none";
    playSound("drawSound");
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    const shuffleArea = document.getElementById("shuffleArea");
    shuffleArea.style.display = "flex";
    setTimeout(() => {
      console.log("Second timeout in showEnergyEffect, calling initFanDeck");
      shuffleArea.style.display = "none";
      document.getElementById("deckArea").style.display = "flex";
      initFanDeck();
    }, 2500);
  }, 3500);
  console.log("Exiting showEnergyEffect");
}

function initApp() {
    console.log("Entering initApp");
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);
    document.getElementById('dailyBtn').addEventListener('click', startDailyDraw);
    document.getElementById('historyBtn').addEventListener('click', showHistoryPanel);
    document.getElementById('quickDrawBtn').addEventListener('click', () => {
        console.log("Quick draw button clicked");
        document.getElementById("spreadSelect").value = "single";
        renderSpread();
        updateStatus("直觉速取准备中，抽取你的灵感之牌...");
        showEnergyEffect();
    });
    document.getElementById('startBtn').addEventListener('click', () => {
        console.log("Start button clicked");
        if (checkVipAndStart(true)) {
            showEnergyEffect(true);
        }
    });
    document.querySelector('.history-clear-btn').addEventListener('click', clearHistory);
    document.querySelector('.save-btn.restart').addEventListener('click', closeHistoryPanel);
    console.log("Exiting initApp");
}

window.onload = async function() {
  console.log("window.onload triggered");
  await loadDeck();
  console.log("Deck loaded");
  checkNightMode();
  console.log("Night mode checked");
  initStarfield();
  console.log("Starfield initialized");
  renderSpread();
  console.log("Spread rendered");
  loadHistory();
  console.log("History loaded");
  initApp();
  console.log("App initialized");

  const introStr = document.body.classList.contains('night-mode') 
    ? "亲爱的旅人，夜深了。\n闭上眼，告诉我你心中的困惑..." 
    : "亲爱的旅人，欢迎来到命运星盘。\n深呼吸，告诉我你最想问的是什么...";
  
  let i = 0;
  const introText = document.getElementById('introText');
  const introScreen = document.getElementById('introScreen');
  const uiElements = document.getElementById('uiElements');

  function typeIntro() {
    if(i < introStr.length) {
      introText.innerText += introStr.charAt(i);
      i++;
      setTimeout(typeIntro, 80);
    } else {
      setTimeout(() => {
        introScreen.style.opacity = 0;
        setTimeout(()=> { 
          introScreen.style.display = 'none'; 
          uiElements.style.opacity = 1; 
        }, 1500);
      }, 1500);
    }
  }
  
  if (introText) {
      console.log("Starting intro animation");
      typeIntro();
  }
  console.log("Exiting window.onload");
};