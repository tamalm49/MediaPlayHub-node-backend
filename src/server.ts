import dotenv from 'dotenv';
import connectDB from "./db.config.js";
import app from './app.js';
dotenv.config();
let enviroment = process.env.NODE_ENV;
const port = process.env.PORT;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`${enviroment} server is running on ${port}`);
    })
}).catch((err) => {
    console.error("Mongo db error" + err);
    process.on("exit", () => {
        console.log("server stoped");
    }
    )
});