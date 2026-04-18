# 支付配置速查（静态收款码 + 人工确认）

这份文档只解决两件事：
1. 你要在哪里填配置。
2. 每个配置项填什么。

## 1) 在哪里填

如果你部署在 Vercel：
1. 打开项目后台。
2. 进入 Settings -> Environment Variables。
3. 按下面变量名逐条新增。
4. 选中环境：Production（至少）。
5. 保存后重新部署一次。

本地调试可在项目根目录创建 .env.local（不提交到仓库）。

## 2) 必填变量（直接照抄变量名）

### A. 数据库

DATABASE_URL
- 含义：PostgreSQL 连接串
- 示例：postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require

### B. 收款码

VIP_ALIPAY_QR_IMAGE_URL
- 含义：支付宝收款码图片 URL（用户扫码支付）
- 填法：填写你自己的收款码图片地址
- 兼容：未配置时会回退到 VIP_QR_IMAGE_URL

### C. 业务安全与前端来源

VIP_SIGNING_SECRET
- 含义：你自己系统签发 token 的密钥
- 建议：至少 32 位随机字符串

ALLOWED_ORIGINS
- 含义：允许跨域访问的前端域名白名单
- 填法：多个域名用英文逗号分隔
- 示例：https://your-domain.com,https://www.your-domain.com

### D. 朋友测试码（可选）

VIP_FRIEND_TEST_CODES
- 含义：免支付测试码列表
- 填法：逗号分隔
- 示例：FRIEND,FRIENDS,Friends

## 3) 平台侧无需额外配置

本方案不接入真实商家回调，不需要配置支付宝开放平台通知地址。

你只需要保证：
1. 收款码能正常扫码支付。
2. 人工确认流程可执行（你能手动标记订单已确认）。

## 4) 上线前 5 分钟自检

1. 下单接口能创建订单。
2. 数据库里能看到 vip_payment_orders 新记录。
3. 完成扫码支付后，你可手动确认订单（后台管理接口）。
4. 用户点击“检查确认结果”后，状态可从 pending -> paid。
5. 前端能正常拿到解锁 token。

## 5) 当前项目支付结论

当前项目已切换为“静态收款码 + 人工确认”单通道。

理由：
1. 你不需要申请并维护真实商家回调接入。
2. 你和用户都走“二维码扫码支付 + 人工确认放行”的统一流程。
3. 单通道先跑通上线，后续再按需要扩展第二支付方式。

## 6) 常见报错对照

1. 回调签名失败
- 当前方案不依赖回调验签，可忽略此项

2. 解密失败
- 当前方案无解密步骤，可忽略此项

3. 订单一直 pending
- 优先检查：是否已人工确认订单、用户是否点击“检查确认结果”

4. 数据库报错
- 优先检查：DATABASE_URL 是否可连通，用户权限是否允许建表/写入

## 7) 人工确认放行（可直接复制）

先准备 2 个值：
1. 你的线上域名（例如 https://your-domain.com）
2. 订单号 orderId（例如 vip_xxx）

### A. 将订单标记为已确认

```bash
curl -X POST "https://your-domain.com/api/vip-payment-admin-mark-paid" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"vip_xxx","adminKey":"你的VIP_ADMIN_KEY"}'
```

成功会返回类似：

```json
{"orderId":"vip_xxx","status":"paid","paidAt":1710000000000}
```

### B. 查询订单状态（给用户点“检查确认结果”前自检）

```bash
curl "https://your-domain.com/api/vip-payment-status?orderId=vip_xxx"
```

当 status 为 paid 或 unlocked 时，用户前端点击“检查确认结果”就会放行。
