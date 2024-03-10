import { sendEmail } from '../utils/email.service.js';
import { User } from '../models/users.model.js';
import { CustomError } from '../utils/error.handler.js';
import { uploadToCloudinary } from '../utils/couldinary.config.js';
import { AccessPayload, UserType } from '../interface/user.interface.js';
import jwt from 'jsonwebtoken';
export class UsersService {
  /**
   * save
   */
  public static async save(body: UserType, files?: any): Promise<string> {
    try {
      let cloudResult = await uploadToCloudinary(files.path);
      let user = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        userName: body.userName,
        avatar: cloudResult.url,
        password: body.password
      };
      let saveUser = await User.create(user);
      sendEmail({
        to: [saveUser.email],
        text: `Hi ${saveUser.firstName}`,
        subject: 'testing'
      });
      return saveUser.id;
    } catch (error) {
      throw error;
    }
  }
  public static async update(param: {
    id: string;
    userName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    refreshToken?: string;
  }): Promise<object> {
    try {
      let user = await User.findByIdAndUpdate(param.id, param, {
        new: true
      }).select(['_id', 'email', 'userName']);
      if (!user) {
        throw new CustomError('User Not Found', 404);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  public static async getuser(id: string): Promise<any> {
    try {
      let user = await User.findById(id).select(['-password', '-__v']);
      return user;
    } catch (error) {
      throw error;
    }
  }
  public static async get(id: string, page: number = 1, pageSize: number = 10): Promise<any> {
    try {
      // Calculate the skip value based on the page and pageSize
      const skip = (page - 1) * pageSize;
      let projection = { password: false };

      // Aggregation pipeline to support pagination
      const aggregationPipeline = [
        // Add your match or other stages here if needed
        {
          $project: projection
        },
        {
          $skip: skip
        },
        {
          $limit: pageSize
        }
      ];

      // Execute the aggregation pipeline
      const users = await User.aggregate(aggregationPipeline);
      return users;
    } catch (error) {
      throw error;
    }
  }
  /**
   * userlogin
   */
  public static async userlogin(username: string, password: string) {
    try {
      let user = await User.findOne({ userName: username });
      if (!user) throw new CustomError('Username or Password Invalid', 400);
      let chekedPassword = await user.isPasswordCorrect(password);
      if (!chekedPassword) throw new CustomError('Username or Password Invalid', 400);
      let token = this.generateToken({ use_id: user._id });
      return token;
    } catch (error) {
      throw error;
    }
  }
  public static async userlogout(id: string) {
    try {
      let user = await User.findByIdAndUpdate(id, { refreshToken: null }, { new: true }).select(['_id', 'refreshToken']);
      return user;
    } catch (error) {
      throw error;
    }
  }
  private static generateToken(payload: AccessPayload) {
    try {
      let accessToken = jwt.sign(payload, String(process.env.ACCESSSECRET), {
        algorithm: 'HS512',
        expiresIn: '1h'
      });
      // let privateKey = fs.readFileSync("private.pem","utf-8");
      let refreshToken = jwt.sign(payload, String(process.env.REFRESHSECRET), {
        algorithm: 'HS512',
        expiresIn: '7d'
      });
      return {
        accessToken,
        refreshToken
      };
    } catch (error) {
      throw error;
    }
  }
}
