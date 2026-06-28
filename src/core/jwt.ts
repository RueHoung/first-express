import jwt from 'jsonwebtoken'
import { env } from './env.js'
import type { StringValue } from "ms";
import { strict } from 'assert';

type Role = 'admin' | 'manager' | 'user'


export interface RefreshPayload {
    sub: number
    type: string
}

export interface AccessPayload extends RefreshPayload {
    name: string
    role: Role
}

// accessToken
export const accessToken = (req : AccessPayload): string => {
    const accessPayload: AccessPayload = {
        sub: 123, //預設使用者id為123
        name: req.name,
        role: req.role,
        type: "access"
    }
    return jwt.sign(
        accessPayload, 
        env.jwtAccess, 
        { 
            algorithm : "HS256", 
            expiresIn : env.accessExpires as StringValue
        }
    );
}

// refreshToken
export const refreshToken = (): string => {
    const refreshPauload: RefreshPayload = {
        sub: 123, //預設使用者id為123
        type: "refresh"
    }
    return jwt.sign(
        refreshPauload,
        env.jwtRefresh,
        {
            algorithm: "HS256",
            expiresIn: env.refreshExpires as StringValue
        }
    )
}

// refresh Access Token for Refresh Token
export const refresh = (token: string): string => {
    try {
        const decode = jwt.verify(token, env.jwtRefresh)
        console.log(decode)
        if (decode && typeof(decode) === "object" && decode.type === "refresh") {
            const accessPayload: AccessPayload = {
                sub: 123, //預設使用者id為123
                name: "Jeff",
                role: "user",
                type: "access"
            }
            return accessToken(accessPayload)
        }
        return ""
    } catch (err) {
        console.log(err)
        return ""
    }
}