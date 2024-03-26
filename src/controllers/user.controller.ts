import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../services/users.service.js';
import ApiRespose from '../utils/ApiRespose.js';
import logger from '../utils/logger.js';

export class UserConntroller {
  /**
   * getAllUser
   */
  public static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      let user = await UsersService.getuser(req.user?.use_id);
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
      logger.info('Hi');
      let saveduser = await UsersService.save(req.body, req.file);
      res.status(200).json(new ApiRespose(200, 'Successfully saved', { id: saveduser }));
    } catch (error) {
      next(error);
    }
  }
  public static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      let updateduser = await UsersService.update(req.body);
      res.status(200).json(new ApiRespose(200, 'Successfully update', updateduser));
    } catch (error) {
      next(error);
    }
  }
  /**
   * login
   */
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      let { username, password } = req.body;
      let login = await UsersService.userlogin(username, password);
      res
        .status(200)
        .cookie('ACCESSTOKEN', login.accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60
        })
        .cookie('REFRESHTOKEN', login.refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .json(new ApiRespose(200, 'ok', login));
    } catch (error) {
      next(error);
    }
  }
  public static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      let logout = await UsersService.userlogout(req.user?.userid);
      res.status(200).clearCookie('ACCESSTOKEN').clearCookie('REFRESHTOKEN').json(new ApiRespose(200, 'logout successfull'));
    } catch (error) {
      next(error);
    }
  }
}
