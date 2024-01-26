import express from "express";
import cors from "cors";
import cookieParse from "cookie-parser";
import { errorHandler } from "./utils/error.handler.js";
import userrouter from "./routers/user.api.js";
import audioRouter from "./routers/audio.api.js";
import { authenticate } from "./middleware/auth.handler.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParse());
app.use("/api/v1/user", userrouter)
app.use("/api/v1/audio",authenticate,audioRouter);
app.use(errorHandler);
export default app;