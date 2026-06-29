import { Response } from "express";

interface errorPayload {
    success: boolean
    msg: string
}

interface successPayload<T> extends errorPayload {
    data: T[]
}

interface createPayload<T> extends errorPayload {
    data: T
}

// api response 200
export const Success = <T>(
    res: Response,
    data: T[],
) => {
    const payload: successPayload<T> = {
        success: true,
        data: data,
        msg: "Success"
    }
    return res.status(200).json(payload)
}

// api response 201
export const create = <T>(
    res: Response,
    data: T
) => {
    const payload: createPayload<T> = {
        success: true,
        data: data,
        msg: "Create Sucess"
    }
    return res.status(201).json(payload)
}

// response error 
// status code ex: 500、404、401、400...s
export const ErrorRes = (
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

export const getErrorMessage = (err: unknown): string => {
    return err instanceof Error ? err.message : "Unknown error"
}