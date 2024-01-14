import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service.js";

export class UserConntroller {
    /**
     * getAllUser
     */
    public static async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ message: "Hi" })
        } catch (error) {
            next(error);
        }
    }
    /**
     * saveUser
     */
    public static async saveUser(req: Request, res: Response, next: NextFunction) {
        try {
            let saveduser = await UsersService.save(req.body);
            res.status(200).json({ id: saveduser, message: "Successfully saved" });
        } catch (error) {
            next(error);
        }
    }
}