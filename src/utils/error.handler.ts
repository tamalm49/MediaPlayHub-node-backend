import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof CustomError) {
        res.status(err.status).json({ message: err.message });
    } else if (err instanceof multer.MulterError) {
        res.status(400).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message });
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