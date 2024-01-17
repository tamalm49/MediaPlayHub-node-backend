import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service.js";

export class UserConntroller {
    /**
     * getAllUser
     */
    public static async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await UsersService.get();
            res.status(200).json(user);
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
    public static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            let updateduser = await UsersService.update(req.body);
            res.status(200).json({ id: updateduser, message: "Successfully update" });
        } catch (error) {
            next(error);
        }
    }
}