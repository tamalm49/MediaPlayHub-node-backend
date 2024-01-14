import { User, UserType } from "../models/users.model.js";

export class UsersService {
    /**
     * save
     */
    public static async save(user: UserType): Promise<string> {
        try {
            let newUser = new User(user);
            let saveUser = await newUser.save();
            return saveUser.id;
        } catch (error) {
            throw error;

        }
    }
}