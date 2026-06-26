import express from 'express'; 
import { env } from './core/env.js'
import { route } from './route/route.js';

const app = express();

// 路由
route(app)

// 啟動伺服器
app.listen(env.port, () => {
    console.log(`Server is running at http://localhost:${env.port}`);
});