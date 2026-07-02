export class AppError extends Error{
    statusCode: number

    constructor(statuscode: number, message: string){
        super(message)
        this.statusCode = statuscode
        this.name = "AppError"
    }
}

export const isAppError = (err: unknown): err is AppError => {
    return err instanceof AppError
}