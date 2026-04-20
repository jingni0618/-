# 塔罗之眼项目开发接手说明书

## 1. 项目定位

这是一个不依赖前端框架的单页塔罗应用，前端核心逻辑几乎全部集中在 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1)，页面骨架在 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:1)，样式在 `style.css`，后端接口在 `api/` 目录。

接手时最重要的认知是：这是一个“原生 DOM 驱动应用”，不是组件化工程。大多数功能修改都需要同时理解：

- DOM 结构
- 全局状态变量
- 事件绑定
- 样式 class 切换

## 2. 先看哪几个文件

### 第一优先级

- [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1)
- [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:45)
- [api/tarot.js](/Users/wangjingni/Desktop/塔罗之眼/api/tarot.js:37)

这三个文件基本就能帮助你理解 80% 的主流程。

### 第二优先级

- [api/_vipPaymentRepository.js](/Users/wangjingni/Desktop/塔罗之眼/api/_vipPaymentRepository.js:1)
- [api/_db.js](/Users/wangjingni/Desktop/塔罗之眼/api/_db.js:1)
- [api/vip-payment-alipay-notify.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-alipay-notify.js:145)
- [api/feedback.js](/Users/wangjingni/Desktop/塔罗之眼/api/feedback.js:28)

这部分是支付和反馈链路。

## 3. 主流程从哪里进

### 前端初始化入口

- 页面通过 [index.html](/Users/wangjingni/Desktop/塔罗之眼/index.html:384) 加载 `script.js`
- 真正初始化发生在 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:138) 的 `window.onload`
- 事件绑定集中在 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:156) 的 `initEventBindings()`

### 首页三条入口

- 单张速读：`quickDrawSingleCard()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1337)
- 深度占问：`checkVipAndStart()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1306)
- 双人合盘：`startCompatibilityReading()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1208)

## 4. 主业务流怎么串起来

### 抽牌链路

1. 用户点击入口按钮
2. 进入 `checkVipAndStart()` 或 `quickDrawSingleCard()`
3. 通过 `showEnergyEffect()` 切换到阅读模式，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1512)
4. `initFanDeck()` 初始化牌扇，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1533)
5. `userDrawsOneCard()` 完成逐张抽牌，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1746)
6. `userFlipsCard()` 完成逐张翻牌，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1776)
7. `triggerFinalRevealAndReading()` 进入解读区，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1845)
8. `fetchStream()` 请求后端并流式渲染，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2002)

### 日签链路

- 入口：`startDailyDraw()`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:2236)
- 后端仍然复用 `/api/tarot`

### 历史与札记

- 历史：`HistoryService`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:724)
- 札记：`JournalService`，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:759)

## 5. 当前关键全局状态

最需要注意的是下面这些全局变量，因为很多逻辑都直接依赖它们：

- `currentSpreadConfig`
- `requiredCardsCount`
- `cardsDrawn`
- `cardsFlipped`
- `drawnCardsData`
- `shuffledDeck`
- `activeReadingMode`
- `latestReadingRecord`
- `deckSpreadProgress`
- `deckSpreadUnlocked`

定义位置见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:84)。

如果你要改抽牌、翻牌、切换模式、返回首页，这一组变量必须一起看。

## 6. 哪些地方最容易踩坑

### 坑 1：很多“页面切换”其实是 DOM 显隐，不是路由

`enterReadingMode()`、`enterDailyMode()`、`returnToHomePage()` 都是通过 class 和 `display` 切换完成的，见 [script.js](/Users/wangjingni/Desktop/塔罗之眼/script.js:1092)。

这意味着：

- 你加新页面时，不是加路由
- 而是要确保不同区域显隐和状态清理完整

### 坑 2：`script.js` 里既有主流程，也有残留逻辑

例如：

- `cardsLeft` 有更新逻辑，但 HTML 里没有对应节点
- `pushLatestReadingToArchive()` 已实现，但当前没有入口触发

改动前不要默认所有函数都在使用中。

### 坑 3：支付后端能力比前端接入更完整

后端已经有：

- 创建订单
- 查订单
- 订单支付成功标记
- 支付宝回调
- 支付后签发 token

但前端当前主要还是静态二维码 + 手动继续。因此如果你接支付，不要重复发明后端，优先复用现有 `api/` 能力。

### 坑 4：解读渲染依赖外部脚本

- `marked` 从 CDN 异步加载
- `html2canvas` 在保存海报时动态加载

如果你遇到“首次渲染样式不对”或“海报偶发失败”，优先排查外部脚本是否及时可用。

## 7. 接手开发时的建议顺序

### 如果你的目标是修 bug

1. 先确认问题在 DOM、状态还是接口
2. 再回看 `initEventBindings()` 有没有绑定到正确节点
3. 再看 `returnToHomePage()` 是否清理了旧状态

### 如果你的目标是接支付

1. 先读 [api/vip-payment-order.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-order.js:18)
2. 再读 [api/vip-payment-status.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-status.js:18)
3. 再读 [api/vip-payment-unlock.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-unlock.js:19)
4. 最后把前端 `prepareVipPaymentFlow()` 和 `confirmVipPaidAndContinue()` 接上真实订单流

### 如果你的目标是接产品新功能

优先从不破坏主流程的增强项开始：

- 分享能力
- 历史导出
- 稳定性优化
- 配置化改造

这样风险最低。

## 8. 环境与部署注意点

### 依赖

- `package.json` 当前仅声明 `pg`
- 前端不是构建产物，静态文件可直接部署

### 关键环境变量

从代码可见，至少涉及：

- `OPENAI_API_KEY`
- `ALLOWED_ORIGINS`
- `VIP_UNLOCK_CODE`
- `VIP_SIGNING_SECRET`
- `VIP_FRIEND_TEST_CODES`
- `DATABASE_URL`
- `PGSSLMODE`
- `VIP_ALIPAY_QR_IMAGE_URL`
- `VIP_ADMIN_KEY`
- `ALIPAY_PUBLIC_KEY`
- `ALIPAY_APP_ID`
- `ALIPAY_APP_PRIVATE_KEY`
- `ALIPAY_NOTIFY_URL`
- `RESEND_API_KEY`
- `FEEDBACK_FROM_EMAIL`

支付闭环说明：

- 配齐 `ALIPAY_APP_ID`、`ALIPAY_APP_PRIVATE_KEY`、`ALIPAY_PUBLIC_KEY` 后，`/api/vip-payment-order` 会走支付宝 `alipay.trade.precreate`，生成绑定 `orderId/out_trade_no` 的订单二维码。
- `ALIPAY_NOTIFY_URL` 可显式指定回调地址；不配置时会按当前请求域名推导到 `/api/vip-payment-alipay-notify`。
- 如果支付宝预创建配置不完整，但配置了 `VIP_ALIPAY_QR_IMAGE_URL`，系统会回退到静态二维码模式。静态二维码不能自动回调，只能依赖后台调用 `/api/vip-payment-admin-mark-paid` 标记订单为已支付。

主要对应文件：

- [api/tarot.js](/Users/wangjingni/Desktop/塔罗之眼/api/tarot.js:43)
- [api/_db.js](/Users/wangjingni/Desktop/塔罗之眼/api/_db.js:4)
- [api/vip-verify.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-verify.js:24)
- [api/vip-payment-order.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-order.js:24)
- [api/vip-payment-admin-mark-paid.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-admin-mark-paid.js:24)
- [api/vip-payment-alipay-notify.js](/Users/wangjingni/Desktop/塔罗之眼/api/vip-payment-alipay-notify.js:46)
- [api/feedback.js](/Users/wangjingni/Desktop/塔罗之眼/api/feedback.js:41)

## 9. 推荐的下一步接手任务

如果让我给后续接手人排优先级，我会建议按这个顺序来：

1. 打通前端支付闭环
2. 增加真正分享能力
3. 清理残留逻辑和无效状态
4. 降低外部 CDN 依赖
5. 再考虑补全牌库和做更大功能升级

## 10. 最后提醒

这个项目的核心不是“难懂”，而是“集中”。绝大多数逻辑都压在一个 `script.js` 里，所以接手时不要急着拆分，先把主流程跑顺、状态关系看懂，再做局部重构会更稳。对于这个项目，理解状态切换比理解单个函数更重要。
