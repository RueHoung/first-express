# first-express

使用 TypeScript 建立的 Express API 範例專案，目前提供基本首頁路由與 JWT 簽發功能。

## 技術棧

- Node.js
- TypeScript
- Express 5
- jsonwebtoken
- tsx

## 專案結構

```text
.
├── src
│   ├── core
│   │   ├── env.ts      # 讀取與驗證環境變數
│   │   └── jwt.ts      # JWT payload 型別與 token 簽發
│   └── index.ts        # Express app 入口與路由設定
├── .env.dev            # 開發環境變數
├── .env.prod           # 生產環境變數
├── package.json
└── tsconfig.json
```

## 安裝

```bash
npm install
```

## 環境變數

專案會透過 Node.js 的 `--env-file` 載入環境變數。開發環境使用 `.env.dev`，生產環境使用 `.env.prod`。

範例：

```env
Port=3000
JWT=your-jwt-secret
EXPIRES=15m
```

| 變數 | 說明 | 範例 |
| --- | --- | --- |
| `Port` | Express 伺服器監聽 port，未設定時預設為 `3000` | `3000` |
| `JWT` | JWT 簽章密鑰，必填 | `your-jwt-secret` |
| `EXPIRES` | JWT 有效時間，必填 | `15m`, `1h`, `7d` |

## 啟動

開發環境：

```bash
npm run dev
```

生產環境：

```bash
npm run prod
```

啟動後預設服務位址：

```text
http://localhost:3000
```

## API

### `GET /`

確認服務是否正常啟動。

回應範例：

```text
Hello Express with TypeScript!
```

### `POST /sign`

依照 request body 產生 JWT access token。

Request body：

```json
{
  "name": "Jeff",
  "role": "admin"
}
```

`role` 目前支援：

- `admin`
- `manager`
- `user`

Response：

```json
{
  "accessToken": "jwt-token"
}
```

PowerShell 測試範例：

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/sign" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"Jeff","role":"admin"}'
```

curl 測試範例：

```bash
curl -X POST http://localhost:3000/sign \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff","role":"admin"}'
```

## npm scripts

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 使用 `.env.dev` 啟動 TypeScript Express 服務 |
| `npm run prod` | 使用 `.env.prod` 啟動 TypeScript Express 服務 |
| `npm test` | 目前尚未設定測試 |

## 開發備註

- 專案使用 ES Modules，`tsconfig.json` 採用 `NodeNext` module 設定。
- JWT 使用 `HS256` 演算法簽發。
- `.env.*` 已被 `.gitignore` 忽略，請不要提交實際密鑰。
