import { Express } from "express";
import express from "express";
import type { Request, Response } from 'express';
import { JwtPayload, token } from '../core/jwt.js'


export const route = (app: Express) => {
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
}