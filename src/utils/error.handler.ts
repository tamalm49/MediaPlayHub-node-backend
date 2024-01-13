import { NextFunction, Request, Response } from 'express'
export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export class CustomError extends Error {
    status: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'CustomError';
        this.status = statusCode
    }
}