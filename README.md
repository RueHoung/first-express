# first-express

使用 TypeScript 建立的 Express API 範例專案，目前包含 JWT access/refresh token 簽發、MongoDB Atlas 連線、pino HTTP request logger、集中式路由管理，以及 admin user 建立功能。

## 技術棧

- Node.js 24.14.1
- TypeScript
- Express 5
- MongoDB Atlas / Mongoose
- bcrypt
- jsonwebtoken
- pino / pino-http / pino-pretty
- tsx

## 專案結構

```text
.
├── src
│   ├── app
│   │   └── admin
│   │       ├── controller
│   │       │   └── admin.ts  # admin API controller
│   │       ├── dto
│   │       │   └── admin.ts  # admin request payload 型別
│   │       ├── model
│   │       │   └── admin.ts  # Mongoose User schema/model
│   │       └── service
│   │           └── admin.ts  # admin business logic 與密碼 hash
│   ├── core
│   │   ├── db.ts        # Mongoose 連線設定
│   │   ├── env.ts       # 讀取與驗證環境變數
│   │   ├── jwt.ts       # JWT access/refresh token 產生與刷新
│   │   ├── logger.ts    # pino logger 設定
│   │   └── response.ts  # 統一成功/錯誤 response helper
│   ├── route
│   │   ├── admin.ts     # admin route
│   │   └── route.ts     # API 路由集中管理
│   └── index.ts         # Express app 入口、middleware、MongoDB 啟動流程
├── .env.dev             # 開發環境變數
├── .env.prod            # 生產環境變數
├── package.json
└── tsconfig.json
```

## 安裝

```bash
npm install
```

## 環境變數

專案透過 Node.js 的 `--env-file` 載入環境變數：

- `npm run dev` 會載入 `.env.dev`
- `npm run prod` 會載入 `.env.prod`

範例：

```env
Port=3000
JWTACCESSToken=your-access-token-secret
JWTREFRESHToken=your-refresh-token-secret
ACCESSEXPIRES=15m
REFRESHEXPIRES=30d
NODE_ENV=development
LOG_LEVEL=info
MONGOACCOUNT=your-mongodb-account
MONGOPASSWORD=your-mongodb-password
DATABASE=your-database-name
```

| 變數 | 說明 | 範例 |
| --- | --- | --- |
| `Port` | Express 伺服器監聽 port，未設定時預設為 `3000` | `3000` |
| `JWTACCESSToken` | Access token 簽章密鑰，必填 | `your-access-token-secret` |
| `JWTREFRESHToken` | Refresh token 簽章密鑰，必填 | `your-refresh-token-secret` |
| `ACCESSEXPIRES` | Access token 有效時間，必填 | `15m` |
| `REFRESHEXPIRES` | Refresh token 有效時間，必填 | `30d` |
| `NODE_ENV` | 執行環境；非 `production` 時 logger 會使用 pretty output | `development` |
| `LOG_LEVEL` | pino log level，未設定時預設為 `info` | `info`, `debug`, `error` |
| `MONGOACCOUNT` | MongoDB Atlas 帳號，必填 | `your-mongodb-account` |
| `MONGOPASSWORD` | MongoDB Atlas 密碼，必填 | `your-mongodb-password` |
| `DATABASE` | Mongoose 連線使用的 database name，必填 | `my-first-express` |

`.env.*` 已被 `.gitignore` 忽略，請不要提交實際密鑰、資料庫帳號或密碼。

## 啟動

開發環境：

```bash
npm run dev
```

生產環境：

```bash
npm run prod
```

啟動流程：

1. 載入環境變數
2. 建立 Express app
3. 註冊 `express.json()` 與 `pino-http`
4. 註冊 API routes
5. 透過 Mongoose 連線 MongoDB Atlas
6. MongoDB 連線成功後啟動 HTTP server

預設服務位址：

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

依照 request body 產生 access token 與 refresh token。

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
  "access_token": "jwt-access-token",
  "refresh_token": "jwt-refresh-token"
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

### `POST /refresh`

使用 refresh token 產生新的 access token。

Request body：

```json
{
  "token": "jwt-refresh-token"
}
```

Response：

```json
{
  "new_access_token": "jwt-access-token"
}
```

PowerShell 測試範例：

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/refresh" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"token":"jwt-refresh-token"}'
```

curl 測試範例：

```bash
curl -X POST http://localhost:3000/refresh \
  -H "Content-Type: application/json" \
  -d '{"token":"jwt-refresh-token"}'
```

### `POST /user`

建立 admin user。密碼會先使用 `bcrypt` hash 後，再透過 Mongoose `User` model 寫入 MongoDB。

Request body：

```json
{
  "name": "Jeff",
  "role": "admin",
  "email": "jeff@example.com",
  "password": "password123",
  "birth": "1990-01-01",
  "phone": "0912345678"
}
```

Response：

```json
{
  "success": true,
  "data": "mongodb-document-id",
  "msg": "Create Sucess"
}
```

錯誤時會回傳：

```json
{
  "success": false,
  "msg": "error message"
}
```

PowerShell 測試範例：

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/user" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"Jeff","role":"admin","email":"jeff@example.com","password":"password123","birth":"1990-01-01","phone":"0912345678"}'
```

curl 測試範例：

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff","role":"admin","email":"jeff@example.com","password":"password123","birth":"1990-01-01","phone":"0912345678"}'
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
- 目前 token 內的 `sub` 暫時在 `src/core/jwt.ts` 固定為 `123`，`/refresh` 產生的新 access token 也暫時使用固定的 `name` 與 `role`。
- `src/core/logger.ts` 會依 `NODE_ENV` 決定是否使用 `pino-pretty`。
- `src/core/db.ts` 會在 app 啟動時透過 Mongoose 連線 MongoDB Atlas，連線失敗會記錄 fatal log 並停止啟動。
- `src/core/response.ts` 提供 `Success`、`create`、`ErrorRes` 與 `getErrorMessage` helper，可用於後續 API 統一 response 格式。
- `src/app/admin/service/admin.ts` 建立 user 前會使用 `bcrypt`，目前 salt rounds 設定為 `12`。
