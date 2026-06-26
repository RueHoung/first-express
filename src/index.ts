import express from 'express'; 
import type { Request, Response } from 'express';
import { env } from './core/env.js'
import { JwtPayload, token } from './core/jwt.js'

const app = express();

// Middleware
app.use(express.json());

// 基礎路由
app.get('/', (req: Request, res: Response) => {
    res.send('Hello Express with TypeScript!');
});

// JWT Sign
app.post(
    "/sign", (req: Request, res: Response) =>{
        console.log(req.body);
        const payload: JwtPayload = req.body
        const accessToken = token(payload)
        res.json({
            accessToken
        });
    }
)

// 啟動伺服器
app.listen(env.port, () => {
    console.log(`Server is running at http://localhost:${env.port}`);
});