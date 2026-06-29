import { Express } from "express";
import type { Request, Response } from 'express';
import { AccessPayload, accessToken, refreshToken, refresh } from '../core/jwt.js'



export const route = (app: Express) => {

    // 基礎路由
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello Express with TypeScript!');
    });

    // JWT Sign
    app.post(
        "/sign", (req: Request, res: Response) =>{
            const payload: AccessPayload = req.body
            const access_token = accessToken(payload)
            const refresh_token = refreshToken()
            res.json({
                access_token,
                refresh_token
            });
        }
    )

    // JWT Refresh
    app.post(
        "/refresh", (req: Request, res: Response) =>{
            const payload: string = req.body.token
            const new_access_token = refresh(payload)
            res.json({
                new_access_token
            });
        }
    )
}