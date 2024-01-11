import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const DbInstance = await mongoose.connect(`${process.env.DATABASEHOST}/${process.env.DBNAME}`);
        console.log(`Database instance connected to ${DbInstance.connection.host}`);
    } catch (error) {
        throw error;
    }
}
export default connectDB;