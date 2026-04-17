# 去混乱化清理报告

更新日期：2026-04-17

## 1. 入口与现行代码
- 当前生产入口文件：index.html
- 当前实际执行脚本：script.js
- 当前实际执行样式：style.css

## 2. 归档处理
为避免“双架构并存”造成误改，以下旧模块已归档，不再参与当前页面加载：
- archive/legacy-src/js/api.js
- archive/legacy-src/js/history.js
- archive/legacy-src/js/tarot.js
- archive/legacy-src/js/ui.js

说明：
- src/js 目录已保留为空目录，避免直接删除后影响你未来重新模块化。
- 本次没有做不可逆删除，所有旧代码都可从归档路径恢复。

## 3. 边界收紧（在 script.js）
- 历史记录逻辑收敛到 HistoryService（load/save/add/clear/render）。
- 接口请求逻辑收敛到 TarotApiService（requestReadingStream/requestDailyReading）。
- UI 流程函数继续保持在页面层，调用 service，不直接散落 fetch/localStorage。

## 4. 后续建议
- 若后续决定全面模块化，可将 archive/legacy-src/js 中可复用逻辑逐步迁回 src/js。
- 在未完成模块化迁移前，保持 index.html 仅引用 script.js + style.css。
