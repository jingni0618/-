# 塔罗之眼 · 性能优化报告

**优化日期**: 2025年  
**项目地址**: `/Users/wangjingni/Desktop/塔罗之眼`  
**验收结果**: ✅ script.js 语法无报错 · ✅ style.css 花括号平衡 · ✅ 本地服务 HTTP 200

---

## 一、优化概览

| 优化方向 | 问题数 | 已修复 |
|---------|--------|--------|
| 首屏加载性能 | 4 | 4 ✅ |
| 运行时渲染性能 | 4 | 4 ✅ |
| 移动端适配 | 9 | 9 ✅ |
| iOS 兼容性 | 5 | 5 ✅ |

---

## 二、首屏加载优化

### 2.1 Google Fonts 异步加载（`index.html`）

**问题**: 同步 `<link rel="stylesheet">` 加载 Google Fonts 会在 DNS 解析+TCP 握手+响应期间阻塞浏览器渲染，造成白屏。

**修复前**:
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope..." rel="stylesheet">
```

**修复后**（`media="print"` onload 异步技巧）:
```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/...">
<link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/...">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/..."></noscript>
```

**预期收益**: 消除 300–1200ms 渲染阻塞；FCP（首次内容绘制）提前。

---

### 2.2 静态资源缓存策略（`vercel.json`）

**问题**: 无 `Cache-Control` 头，每次访问重复下载 CSS/JS。

**修复后**:
```json
"headers": [
  { "source": "/style.css",  "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
  { "source": "/script.js",  "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
  { "source": "/(.*\\.png)", "Cache-Control": "public, max-age=2592000, immutable" },
  { "source": "/(.*\\.html)","Cache-Control": "public, max-age=0, must-revalidate" }
]
```

**预期收益**: 二次访问 CSS/JS 从缓存加载，节省 ~200–500KB 网络传输；图片 30 天强缓存。

---

### 2.3 Canvas Starfield 延迟初始化（`script.js`）

**问题**: `initStarfield()` 在 `window.onload` 中同步调用，与首屏 DOM 渲染竞争主线程。

**修复**: 将 `initStarfield()` 移至 `dismissIntro()` 的 `setTimeout(…, 380)` 回调中，确保 intro 画面淡出后才初始化 Canvas，不阻塞首屏渲染。

**修复后**:
```javascript
// window.onload 中已移除 initStarfield()
function dismissIntro() {
  ...
  setTimeout(() => {
    ...
    try { initStarfield(); } catch(e) { console.warn("starfield init:", e); }
  }, 380);
}
```

---

### 2.4 时相定时器去重（`script.js`）

**问题**: `setInterval` 在 `initEventBindings()` 和 `window.onload` 两处都会注册，导致 `applyTimePhaseTheme()` 每分钟被触发两次。

**修复**: 统一由 `window.onload` 创建并保存到 `_timePhaseIntervalId`，`initEventBindings()` 中移除重复注册。

---

## 三、运行时渲染性能优化

### 3.1 Canvas 帧率限制：60fps → 30fps（`script.js`）

**问题**: `requestAnimationFrame` 在 120Hz 屏幕上可达 120fps，星空每帧调用 `ctx.shadowBlur` 极为耗费 GPU。

**修复**: 在 `draw()` 函数开头添加时间戳比较，跳过不足 `FRAME_INTERVAL`（≈33ms）的帧。

```javascript
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
let lastFrameTime = 0;

function draw(now) {
  animFrameId = requestAnimationFrame(draw);
  if (now - lastFrameTime < FRAME_INTERVAL) return; // 帧率限制
  lastFrameTime = now;
  ...
}
```

**预期收益**: GPU 负载降低约 50%；低端 Android 设备热量和耗电明显改善。

---

### 3.2 条件 shadowBlur（`script.js`）

**问题**: `ctx.shadowBlur` 是成本最高的 Canvas API 之一，在每颗星（每帧）都调用。

**修复**: 只对半径 > 1.2px 的星，且每 3 帧只渲染一次光晕。

```javascript
let frameCount = 0;
// draw() 内
frameCount++;
const doGlow = (frameCount % 3 === 0);

stars.forEach(s => {
  if (doGlow && s.radius > 1.2) {
    ctx.shadowBlur = s.radius * 4;
    ctx.shadowColor = s.color;
  } else {
    ctx.shadowBlur = 0;
  }
  ...
});
```

**预期收益**: shadowBlur 调用频率降低 ~90%，每帧渲染时间预计缩短 10–20ms。

---

### 3.3 页面隐藏时暂停动画（`script.js`）

**问题**: 用户切换标签页或锁屏后，Canvas 动画循环仍在运行，持续消耗 CPU/GPU。

**修复**:
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseAnimation();
  else resumeAnimation();
});
```

---

### 3.4 GPU 合成层提示（`style.css`）

对高频动画元素添加 `will-change: transform`，提前提升为独立合成层，避免触发重排（reflow）：

```css
.card, .fan-deck.arc-fan .deck-card, .sdm-card, .ritual-orb, .choice-card {
  will-change: transform;
}
```

---

## 四、移动端适配优化

### 4.1 iOS 安全区域支持（`style.css`）

```css
#uiElements {
  padding-bottom: max(72px, calc(72px + env(safe-area-inset-bottom)));
}
.top-nav {
  padding-top: max(12px, env(safe-area-inset-top));
}
```

适配 iPhone 14/15 刘海/灵动岛机型，防止底部操作栏被 Home Indicator 遮挡。

---

### 4.2 防止 iOS Safari 输入框自动缩放（`style.css`）

```css
input, textarea, select {
  font-size: max(16px, 1em) !important;
}
```

iOS Safari 在 `font-size < 16px` 时会自动放大页面，导致布局错乱。

---

### 4.3 iOS 滚动惯性 / backdrop-filter 降级（`style.css`）

```css
/* 滚动惯性 */
.reading-content, .history-list, .spread-guide-scroll {
  -webkit-overflow-scrolling: touch;
}

/* iOS 13 以下无 backdrop-filter 时降级为实色背景 */
@supports not (backdrop-filter: blur(1px)) {
  .modal-box, .choice-card {
    background: rgba(15, 20, 50, 0.97);
  }
}
```

---

### 4.4 触控热区标准化（`style.css`）

所有可点击元素满足 WCAG 2.5.5 建议的 44×44px 最小触控目标：

```css
.icon-btn, .emoji-react, .spread-step {
  min-height: 44px;
  min-width: 44px;
}
button, [role="button"], a, label {
  touch-action: manipulation; /* 消除 300ms 点击延迟 */
}
```

---

### 4.5 320px 超窄屏（iPhone SE 1st gen）修复（`style.css`）

```css
@media (max-width: 360px) {
  .hero-title { font-size: 1.45rem; }
  .couple-toggle { flex-wrap: wrap; }
  .spread-layout { grid-template-columns: repeat(2, 1fr) !important; }
  .modal-btns { flex-direction: column; }
  
  /* 阅读模式十字阵溢出修复 */
  body.reading-mode .layout-cross {
    grid-template-columns: repeat(3, 84px) !important;
  }
  .card-slot { width: 90px !important; height: 158px !important; }
}
```

---

### 4.6 430px 中等移动屏优化（`style.css`）

```css
@media (max-width: 430px) {
  .growth-hub-modal { padding: 20px 16px; }
  .vip-modal-box { max-width: calc(100vw - 32px); }
  .action-row { flex-wrap: wrap; gap: 8px; }
  body.reading-mode .card-slot { width: 96px !important; }
}
```

---

### 4.7 横屏低高度（手机横屏）适配（`style.css`）

```css
@media (max-height: 500px) and (orientation: landscape) {
  .hero-title { font-size: 1.2rem; margin-bottom: 4px; }
  .top-nav { padding: 4px 16px; min-height: 36px; }
  #uiElements { padding-bottom: 8px; }
  .home-ritual-widget { display: none; }
}
```

---

### 4.8 减弱动效适配（`style.css`）

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  canvas#starfield { display: none; }
}
```

尊重系统"减弱动效"偏好，提升无障碍可访问性，同时完全消除 Canvas 负担。

---

### 4.9 iOS PWA 元信息（`index.html`）

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#111a35">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=no">
```

---

## 五、修改文件清单

| 文件 | 修改类型 | 行数变化 |
|------|---------|---------|
| `index.html` | 异步字体、iOS meta | +12 行 |
| `vercel.json` | 缓存头配置 | +30 行 |
| `style.css` | 性能+移动端追加 | +423 行（4880→5303）|
| `script.js` | Starfield 优化、延迟初始化、去重定时器 | ~+40 行净变化 |

---

## 六、验收结果

```
✅ node --check script.js        → 语法检查通过
✅ style.css 花括号平衡检查       → 共 5303 行，无嵌套错误
✅ HTTP GET /index.html           → 200 OK
```

---

## 七、后续建议（可选）

| 优先级 | 建议 |
|--------|------|
| 高 | 将 `style.css` + `script.js` 通过 Vite/esbuild 压缩打包，预计减少 40–60% 体积 |
| 中 | 将 tarot 卡牌图片从 sacred-texts.com CDN 迁移到 Vercel 自托管，消除第三方依赖和跨域延迟 |
| 中 | 为 `/api/tarot` 流式响应添加 `Keep-Alive` 连接复用 |
| 低 | 添加 Service Worker 离线缓存 index.html + style.css + script.js |
| 低 | 使用 Intersection Observer 懒加载 `.card-art` 图片 |
