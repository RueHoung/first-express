import { Response } from "express";

interface errorPayload {
    success: boolean
    msg: string
}

interface successPayload<T> extends errorPayload {
    data: T[]
}

export const Ok = <T>(
    res: Response,
    data: T[],
) =>  {
    const payload: successPayload<T> = {
        success: true,
        data: data,
        msg: "Success"
    }
    return res.status(200).json(payload)
}

export const Error = (
    res: Response,
    statusCode: number,
    msg: string,
) => {
    const payload: errorPayload = {
        success: false,
        msg: msg
    }
    return res.status(statusCode).json(payload)
}