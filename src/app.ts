import express from "express";
import cors from "cors";
import cookieParse from "cookie-parser";
import { errorHandler } from "./utils/error.handler.js";
import router from "./routers/user.api.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParse());
app.use("/", router)
app.use(errorHandler);
export default app;