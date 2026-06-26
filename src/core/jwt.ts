import jwt from 'jsonwebtoken'
import { env } from './env.js'
import type { StringValue } from "ms";

type Role = 'admin' | 'manager' | 'user'


export interface JwtPayload {
    name: string
    role: Role
}

export const token = (req : JwtPayload): string => {
    return jwt.sign(
        { 
            'name': req.name,
            'role': req.role
        }, 
        env.jwtSecret, 
        { 
            algorithm : "HS256", 
            expiresIn : env.expires as StringValue
        }
    );
}