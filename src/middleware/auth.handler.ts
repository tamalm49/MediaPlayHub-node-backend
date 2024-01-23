import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/error.handler.js";
// Extend the Request type to include a new property 'userid'
declare global {
    namespace Express {
      interface Request {
        user?: any// or whatever type your user ID is
      }
    }
  }

export const authenticate = (req:Request,res:Response,next:NextFunction)=>{
try {
    let {ACCESSTOKEN,REFRESHTOKEN} = req.cookies;
    if(!ACCESSTOKEN) throw new CustomError("Unauthorised",401);
    let payload = jwt.verify(ACCESSTOKEN,String(process.env.ACCESSSECRET));
    if(!payload) throw new CustomError("Unauthorised",401);
    req.user = payload
    return next();
} catch (error) {
    next(error);
}
}