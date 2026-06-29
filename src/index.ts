import express from 'express'; 
import { env } from './core/env.js'
import { route } from './route/route.js';
import logger from "./core/logger.js";
import { pinoHttp } from "pino-http";
import { connectMongo } from './core/db.js';


const app = express();

// Middleware
app.use(express.json());
app.use(pinoHttp({ logger }));
// 路由
route(app)

async function start() {
    await connectMongo();

    app.listen(env.port, () => {
        logger.info(`Server is running at http://localhost:${env.port}`);
    });
}

// 啟動伺服器
start().catch((err) => {
    logger.fatal(err, "Application startup failed");
    process.exit(1);
});