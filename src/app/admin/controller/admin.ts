import { Request, Response } from "express";
import { userPayload } from "../dto/admin.js";
import { CreateUser } from "../service/admin.js";
import { create, ErrorRes, getErrorMessage, getErrorStatusCode } from "../../../core/response.js";
import logger from "../../../core/logger.js";

// create user
export async function Create(req: Request, res: Response) {
    try {
        const payload: userPayload = req.body
        const user_id = await CreateUser(payload)

        create<string>(res, user_id.toString())
    } catch (err) {
        const message = getErrorMessage(err)
        const statusCode = getErrorStatusCode(err)
        logger.error(err, message)
        ErrorRes(res, statusCode, message)
    }
}