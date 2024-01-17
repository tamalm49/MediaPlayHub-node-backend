import { sendEmail } from "../utils/email.service.js";
import { User, UserType } from "../models/users.model.js";
import { CustomError } from "../utils/error.handler.js";
export class UsersService {
    /**
     * save
     */
    public static async save(user: UserType): Promise<string> {
        try {
            // let newUser = new User(user);
            // let saveUser = await newUser.save();
            let saveUser = await User.create(user);
            await sendEmail({ to: [saveUser.email], text: `Hi ${saveUser.firstName}`, subject: "testing" })
            return saveUser.id;
        } catch (error) {
            throw error;
        }
    }
    public static async update(param: {
        id: string,
        userName?: string,
        email?: string,
        firstName?: string,
        lastName?: string,
        avatar?: string,
        watchHistory?: string[],
        password?: string,
        refreshToken?: string
    }): Promise<string> {
        try {
            let user = await User.findByIdAndUpdate(param.id, param, { new: true });
            console.log(user);
            if (!user) {
                throw new CustomError("User Not Found", 404);
            }
            return user?.id;
        } catch (error) {
            throw error;
        }
    }
    public static async get(page: number = 1, pageSize: number = 10): Promise<any> {
        try {

            // Calculate the skip value based on the page and pageSize
            const skip = (page - 1) * pageSize;
            let projection = { firstName: false, lastName: false }

            // Aggregation pipeline to support pagination
            const aggregationPipeline = [
                // Add your match or other stages here if needed
                {
                    $project: projection,
                },
                {
                    $skip: skip,
                },
                {
                    $limit: pageSize,
                },
            ];

            // Execute the aggregation pipeline
            const users = await User.aggregate(aggregationPipeline);
            return users;

        } catch (error) {
            throw error;
        }
    }
}