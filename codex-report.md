# 塔罗牌项目技术梳理&优化建议报告

## 1. 项目概览

### 1.1 实际技术栈

- 前端：原生 HTML + CSS + JavaScript，无 Vue/React、无构建层
- 后端：Vercel Serverless Functions（`api/*.js`）
- AI 解读：前端请求 [api/tarot.js](/Users/wangjingni/Desktop/塔罗之眼/api/tarot.js:37)，后端再调用 DeepSeek Chat Completions
- 数据存储：
  - 用户端本地存储：`localStorage` / `sessionStorage`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:724)
  - 支付订单存储：PostgreSQL，见 [api/_db.js](/Users/wangjingni/Desktop/塔罗之眼/api/_db.js:1)
- 第三方依赖：
  - `pg`：数据库连接，见 [package.json](/Users/wangjingni/Desktop/塔罗之眼/package.json:1)
  - `marked`：前端 Markdown 渲染，CDN 引入，见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:11)
  - `html2canvas`：海报保存时动态加载，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2618)

### 1.2 目录结构

```text
塔罗之眼/
├─ index.html                 # 单页应用页面骨架
├─ style.css                  # 全站视觉、动效、响应式样式
├─ script.js                  # 前端全部核心业务逻辑
├─ api/
│  ├─ tarot.js                # AI 解牌/日签接口
│  ├─ feedback.js             # 用户反馈邮件接口
│  ├─ _db.js                  # PostgreSQL 连接与表结构初始化
│  ├─ _vipToken.js            # VIP token 签发
│  ├─ _vipPaymentRepository.js# VIP 订单仓储
│  ├─ vip-verify.js           # 固定 VIP 口令校验
│  ├─ vip-test-code-verify.js # 朋友测试码校验
│  ├─ vip-payment-order.js    # 创建付费订单
│  ├─ vip-payment-status.js   # 查询付费订单状态
│  ├─ vip-payment-unlock.js   # 已支付订单换取 token
│  ├─ vip-payment-admin-mark-paid.js # 管理员手动标记支付成功
│  └─ vip-payment-alipay-notify.js   # 支付宝异步回调
├─ vercel.json                # Vercel 配置
├─ package.json               # 仅声明 pg 依赖
└─ node_modules/              # 已安装依赖
```

## 2. 核心模块梳理

### 2.1 牌库数据模块

- 牌库主数据定义在 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1)
- `deck` 是当前项目唯一牌库来源，包含 `name / emoji / meaning`
- 当前并非完整 78 张韦特牌，而是：
  - 22 张大阿卡那
  - 16 张小阿卡那的节选牌（每个花色仅少量牌）
- 牌面图片映射在 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:9)
  - `TAROT_IMAGE_BASE_URL`
  - `tarotCardCodeMap`
  - `getTarotImageUrl()` 负责把牌名映射到外部图片 URL，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1018)

### 2.2 抽牌核心算法

- 洗牌函数：`shuffle(array)`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1288)
- 初始化牌扇：`initFanDeck()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1533)
- 用户抽牌：`userDrawsOneCard(clickedCardElement)`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1746)
- 关键逻辑：
  - 使用 `shuffle([...deck])` 拷贝后 Fisher-Yates 风格乱序
  - 每抽一张牌通过 `shuffledDeck.pop()` 取出，确保单次占卜不重复
  - 逆位概率固定为 `Math.random() < 0.2`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1750)
  - 抽牌后写入 `drawnCardsData`

### 2.3 牌阵逻辑模块

- 牌阵配置：`spreadsOptions`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:51)
- 牌阵展示元信息：`spreadGuideMeta`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:61)
- 牌阵渲染：`renderSpread()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1293)
- 牌阵选择 UI：`renderSpreadGuide()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:542)
- 已配置牌阵：
  - `single` 单牌神谕
  - `yesno` 是非决断阵
  - `time` 时间之流
  - `relationship` 情感透视阵
  - `career` 财富事业阵
  - `choice` 二选一岔路阵
  - `cross` 灵感十字阵

### 2.4 牌意解读生成模块

- 前端发起流式解读：`fetchStream()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2002)
- 前端 API 封装：`TarotApiService`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1953)
- 后端 AI 接口：`handler()`，见 [api/tarot.js](/Users/wangjingni/Desktop/塔罗之眼/api/tarot.js:37)
- Prompt 拼装：
  - 日签模式 prompt，见 [api/tarot.js](/Users/wangjingni/Desktop/塔罗之眼/api/tarot.js:63)
  - 长文解读 prompt，见 [api/tarot.js](/Users/wangjingni/Desktop/塔罗之眼/api/tarot.js:73)
- 渲染增强：
  - Markdown 渲染：`marked.parse(...)`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2094)
  - 关键词高亮：`applyTarotTagHighlight()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2037)
  - 自动摘要：`renderReadingSummary()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1932)
  - 段落折叠：`wrapReadingSectionsAsCollapsible()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1897)

### 2.5 前端交互页面

- 首页主入口：见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:45)
- 单张速读卡：见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:75)
- 深度占问卡：见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:86)
- 双人合盘卡：见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:115)
- 每日神谕页：见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:187)
- 抽牌沉浸区/牌阵区/解读区：见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:206)
- 成长档案/历史详情/反馈/卡牌预览/支付弹窗：见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:265)

### 2.6 路由 / 状态管理

- 无前端路由库
- 无状态管理库（Vuex/Pinia/Redux/Zustand 均不存在）
- 状态管理方式为：
  - 全局变量：如 `activeReadingMode / currentSpreadConfig / drawnCardsData`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:84)
  - DOM 显隐切换：如 `enterReadingMode()` / `returnToHomePage()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1092)
  - 本地缓存：`HistoryService / JournalService`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:724)

### 2.7 工具函数与基础设施

- 图片与牌名工具：
  - `normalizeCardName()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1010)
  - `getTarotCardCode()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1014)
  - `getTarotImageUrl()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1018)
- 主题/时间工具：
  - `applyTimePhaseTheme()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:437)
  - `getDailyWeatherMood()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:462)
- 文本处理：
  - `stripRichText()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2572)
  - `extractCoreQuote()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2585)
- 海报生成：
  - `saveAsImage()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2618)
  - `fillPosterCanvasFromReading()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2680)
- 支付与 token：
  - `createVipToken()`，见 [api/_vipToken.js](/Users/wangjingni/Desktop/塔罗之眼/api/_vipToken.js:3)
  - `createVipPaymentOrder()` 等仓储方法，见 [api/_vipPaymentRepository.js](/Users/wangjingni/Desktop/塔罗之眼/api/_vipPaymentRepository.js:34)

## 3. 核心业务流程拆解

### 3.1 用户进入首页

1. 页面加载 `index.html`，底部注入 [script.js](/Users/wangjingni/Desktop/塔罗之眼/index.html:384)
2. `window.onload` 中执行初始化，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:138)
3. 初始化内容包括：
   - 读取阅读密度
   - 按时间切换主题
   - 初始化星空背景
   - 渲染默认牌阵
   - 渲染牌阵选择器
   - 加载历史档案
4. 开场 splash 消失后展示首页，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:113)

### 3.2 选择牌阵

1. 首页深度占问区提供隐藏的 `select#spreadSelect` 和可视化牌阵按钮，见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:95)
2. `renderSpreadGuide()` 读取 `spreadGuideMeta` 生成“免费/进阶”牌阵按钮，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:542)
3. 点击牌阵按钮后：
   - 修改 `spreadSelect.value`
   - 调用 `renderSpread()`
   - 重新调用 `renderSpreadGuide()`
4. 付费提示与按钮文案也在该函数中同步更新，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:582)

### 3.3 开启抽牌

#### 深度占问链路

1. 点击 `#startBtn`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:179)
2. 进入 `checkVipAndStart()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1306)
3. 逻辑判断：
   - 是否填写问题
   - 当前牌阵是否超过 3 张
   - 若为高级牌阵，是否已有有效 VIP token
4. 若无需付费或已有 token，执行 `showEnergyEffect()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1512)

#### 单张速读链路

1. 点击 `#quickDrawBtn`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:177)
2. 进入 `quickDrawSingleCard()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1337)
3. 强制牌阵切换到 `single`
4. 清空问题输入，直接进入能量动画与抽牌流程

#### 双人合盘链路

1. 点击 `#startCoupleBtn`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:182)
2. 进入 `startCompatibilityReading()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1208)
3. 逻辑：
   - 必须填写对方昵称
   - 强制锁定牌阵为 `relationship`
   - 模式切换为 `compatibility`
   - 继续复用 `checkVipAndStart()`

### 3.4 抽牌实现

1. `showEnergyEffect()` 先切入阅读模式并展示能量文案，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1512)
2. 800ms 后显示洗牌动画，再延时 2s 进入牌扇区域，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1525)
3. `initFanDeck()` 完成：
   - 重置计数器
   - 洗牌
   - 生成牌扇 DOM
   - 自动展开牌扇
   - 注册滑动/点击展开手势
4. 用户点击牌扇牌片后触发 `userDrawsOneCard()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1746)
5. 每次抽牌写入：
   - 牌位
   - 牌名（附正位/逆位）
   - 基础牌义
   - 图片 URL
6. 抽满后隐藏牌扇，显示“依次翻牌揭晓”，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1762)

### 3.5 翻牌与进入解读

1. 每个牌位卡片在抽满后绑定 `userFlipsCard(i)`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1770)
2. `userFlipsCard()` 完成：
   - 翻转动画
   - 牌面图/emoji 渲染
   - 逆位视觉处理
   - “点击放大”提示
3. 全部翻完后执行：
   - `setFlowStep(2)`
   - `triggerFinalRevealAndReading(question, style, drawnCardsData, context)`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1800)
4. `triggerFinalRevealAndReading()` 负责：
   - 最终闪白转场
   - 布局切为 `reading-text-active`
   - 显示 mini card bar
   - 启动 AI 流式解读，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1845)

### 3.6 生成解读

1. `fetchStream()` 组装 payload，包含：
   - 问题文本
   - 已抽牌列表
   - 情绪标签
   - 是否双人合盘
   - 夜间模式状态
   - VIP token
2. 调用 `POST /api/tarot`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2116)
3. 后端 [api/tarot.js](/Users/wangjingni/Desktop/塔罗之眼/api/tarot.js:46) 根据 `isDaily / fallbackShort / isCompatibility` 拼 prompt
4. 长文模式下后端直通 DeepSeek 的流式响应，前端按 SSE 行解码，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2130)
5. 结束后前端执行：
   - `renderMarkdown(htmlBuffer, true)`
   - `renderReadingSummary(...)`
   - `wrapReadingSectionsAsCollapsible()`
   - 构建 `historyRecord`

### 3.7 结果保存 / 分享

#### 已实现的保存

1. 解读完成后将记录自动写入本地历史档案，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2227)
2. 用户可点击“保存图片”生成海报，按钮见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:259)
3. `saveAsImage()` 动态加载 `html2canvas`，将隐藏海报模板转成图片并下载，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2618)

#### 分享现状

- 当前项目没有真正的“社交分享”流程
- 更准确地说，现状是“保存海报用于自行分享”，而不是内建分享 SDK / Web Share API
- 海报中会生成站点 QR 码，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2698)

### 3.8 每日神谕链路

1. 点击 `#dailyBtn`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:173)
2. 进入 `startDailyDraw()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2236)
3. 优先读取 `localStorage.tarotDailyReading`
4. 若当天无缓存，则从 `deck` 的前 22 张大阿卡那中随机一张
5. 调用 `POST /api/tarot`，参数为 `isDaily: true`
6. 将日签牌名、图片、文案缓存到本地并渲染页面

## 4. 三类清单

### 4.1 已完整实现的核心功能清单

- 单页式首页入口、开场动效、昼夜主题切换
- 单张速读、深度占问、双人合盘三种主入口
- 7 种牌阵配置与前端可视化切换
- 洗牌、牌扇展开、点击抽牌、逐张翻牌的完整交互
- 正位/逆位展示
- AI 长文解读流式渲染
- AI 失败时自动回退简版解读，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2180)
- 解读摘要提炼、牌名高亮、章节折叠
- 卡牌放大预览与左右切换
- 每日神谕功能及本地日缓存
- 解读历史自动归档到本地 `localStorage`
- 成长档案页面、历史详情查看、手动札记记录
- 反馈提交接口与邮件兜底
- 海报图片导出保存
- VIP 口令/测试码校验并生成会话 token
- 后端已具备支付订单、状态查询、支付宝回调、数据库落库能力

### 4.2 现有代码中的潜在风险、逻辑漏洞、兼容性问题、性能优化点

#### 高优先级

- 牌库并不完整，不是标准 78 张塔罗。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1)
  - 影响：如果产品对外宣称“完整韦特塔罗”，当前实现与用户预期会不一致；部分牌阵解释的丰富度也受限。

- 高级牌阵支付主链路前端未真正接入订单创建/查询/核销。
  - 前端当前只展示静态二维码并支持“我已完成支付”直接继续，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1368) 和 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1425)
  - 但后端已经存在 `vip-payment-order/status/unlock` 等接口，见 [api/vip-payment-order.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-order.js:18)
  - 影响：真实支付闭环在前端视角并不完整，用户点击“已支付，继续”不会校验订单状态，只是直接放行到 `showEnergyEffect(true)`。

- 结果“分享”并未真正实现，只实现了“导出海报图片”。
  - 证据：[index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:259) 仅有保存按钮，无分享按钮/分享调用
  - 影响：如果验收要求是“结果保存/分享全链路”，当前只能算“保存已实现，分享待补”。

- Markdown 渲染依赖 CDN 且是 `async` 加载，存在首轮解读时 `marked` 尚未可用的概率。
  - 证据：[index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:11)，[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2094)
  - 影响：弱网下可能退化成纯文本渲染，影响解读排版与可读性。

#### 中优先级

- 洗牌与逆位判定都基于 `Math.random()`，随机性足够做娱乐产品，但不可审计、不可复现。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1288) 和 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1750)
  - 影响：若未来强调“公平性”“可复盘”，当前算法缺少种子记录与结果追踪。

- 逆位概率被硬编码为 20%。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1750)
  - 影响：不同流派常见做法并不一致；该值不可配置，会影响解读风格一致性。

- 多处图片和脚本依赖外部 CDN/第三方站点。
  - 牌面图片见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:9)
  - 音效见 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:20)
  - `html2canvas` 见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2632)
  - QR 码接口见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2699)
  - 影响：外链失效、跨域、限流都会直接影响核心体验。

- `streamContent.innerHTML = marked.parse(source)` 会直接渲染模型输出 HTML。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2094)
  - 虽然前端会先做基础清洗，后端 prompt 也禁止 HTML，但没有严格的 HTML 白名单。
  - 影响：理论上存在模型输出意外 HTML 时的渲染风险。

- 历史与札记完全存于浏览器本地，不支持跨设备、跨浏览器同步。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:724)
  - 影响：清缓存即丢失，且“成长档案”更像单设备缓存，不是真正持久档案。

- `cardsLeft` 在脚本中被更新，但当前 HTML 中没有对应元素。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1543)，仓库搜索未发现 `id="cardsLeft"`
  - 影响：属于残留逻辑，虽然已做空判断不报错，但说明 UI/逻辑存在脱节。

- `pushLatestReadingToArchive()` 已实现但当前没有按钮或事件调用。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1264)
  - 影响：属于死代码，增加维护成本，也容易让后续接手者误判实际功能。

#### 低优先级

- `renderSpread()` 使用字符串拼接 `innerHTML +=` 循环构建牌位 DOM。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1300)
  - 影响：当前规模不大问题不明显，但不是最优的 DOM 构建方式。

- 星空背景动画长期运行，移动端低性能设备可能有额外耗电与掉帧风险。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2284)

- 海报生成依赖隐藏 DOM + `html2canvas`，长图性能与成功率受设备影响较大。
  - 证据：[script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2646)

### 4.3 在不改动现有核心逻辑前提下的可落地优化建议

#### P0

- 打通前端与 `vip-payment-order / vip-payment-status / vip-payment-unlock` 的真实支付闭环。
  - 这样可在不改抽牌/解牌核心逻辑的前提下，把“静态二维码 + 手动继续”升级为真实订单流。

- 明确产品口径。
  - 若继续使用当前牌库，应对外描述为“轻量塔罗牌库/精选牌库”而非完整 78 张。
  - 若要对标完整塔罗，再单独补牌库数据和图片映射。

- 补足真正的“分享”能力。
  - 在现有海报保存基础上增加 Web Share API 或复制链接分享，不必改动解牌主流程。

#### P1

- 将 `marked` 和 `html2canvas` 从运行时 CDN 依赖改为更稳定的本地托管或构建内置。
  - 这会显著降低弱网下的渲染波动和海报失败率。

- 为抽牌结果记录一个会话级随机种子或抽牌日志。
  - 不需要改动用户体验，只需增加记录字段，就能支持后续复盘与问题排查。

- 将逆位概率、牌阵价格、牌阵开放状态做成配置项。
  - 当前这些值散落在多个常量中，后续运营调价或改规则会更稳。

- 增加 AI 输出渲染白名单。
  - 在现有 `marked` 渲染前增加更严格的 HTML 过滤，降低异常输出风险。

#### P2

- 清理残留逻辑与无效状态字段。
  - 如 `cardsLeft`、`pushLatestReadingToArchive()`、未接通的订单缓存字段。

- 为成长档案增加导出能力。
  - 例如导出 JSON/图片，不动核心抽牌逻辑，只增强复盘价值。

- 对星空动画和海报生成加“低性能模式”。
  - 检测移动端或低端设备时自动降级，提升稳定性。

## 5. 文件级对应关系总表

| 模块 | 对应文件 | 作用 |
|---|---|---|
| 牌库数据 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1) | 定义所有塔罗牌名称、emoji、基础含义 |
| 牌面图片映射 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:9) | 牌名转图片 URL |
| 牌阵配置 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:51) | 定义牌阵结构、牌位文案、布局类型 |
| 牌阵展示与价格 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:61) | 定义牌阵标题、付费标记、描述 |
| 首页与弹窗骨架 | [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:45) | 承载所有页面结构 |
| 前端事件绑定 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:156) | 统一绑定按钮与交互 |
| 抽牌算法 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1288) | 洗牌与随机抽取 |
| 牌扇/抽牌交互 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1533) | 初始化牌堆、展开、抽牌 |
| 翻牌逻辑 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1776) | 点击翻牌、展示牌面 |
| 解读流式渲染 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2002) | 请求 AI、流式解码、写历史 |
| AI 解读后端 | [api/tarot.js](/Users/wangjingni/Desktop/塔罗之眼/api/tarot.js:37) | 生成 prompt 并请求模型 |
| 日签逻辑 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2236) | 日签缓存、抽卡、渲染 |
| 历史档案 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:724) | 历史记录本地存储 |
| 心境札记 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:759) | 本地札记管理 |
| 海报保存 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2618) | 导出分享海报图片 |
| 用户反馈 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:469)、[api/feedback.js](/Users/wangjingni/Desktop/塔罗之眼/api/feedback.js:28) | 提交反馈并发邮件 |
| VIP token 校验 | [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1432)、[api/vip-verify.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-verify.js:18) | 付费口令校验 |
| 朋友测试码 | [api/vip-test-code-verify.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-test-code-verify.js:26) | 测试 token 签发 |
| VIP 订单仓储 | [api/_vipPaymentRepository.js](/Users/wangjingni/Desktop/塔罗之眼/api/_vipPaymentRepository.js:34) | 支付订单读写 |
| 支付数据库 | [api/_db.js](/Users/wangjingni/Desktop/塔罗之眼/api/_db.js:1) | PostgreSQL 连接与建表 |
| 支付宝回调 | [api/vip-payment-alipay-notify.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-alipay-notify.js:145) | 回调验签、更新订单状态 |

## 6. 结论

当前项目的主体是一个“原生前端单页 + Vercel Serverless API”的塔罗应用，核心体验链路已经比较完整：首页选模式/牌阵、抽牌、翻牌、AI 解读、历史归档、海报保存都已具备实际代码支撑。最关键的真实问题不在主流程，而在边界能力：牌库并非完整 78 张、支付订单前端未真正接通、分享能力停留在海报导出、以及若干外部 CDN 依赖带来的稳定性风险。

如果后续要进入正式运营，优先级最高的不是重写架构，而是补齐支付闭环、统一产品口径、增强分享和稳定性。这样可以在尽量不动现有核心抽牌/解牌逻辑的前提下，最快提升可用性与可信度。
