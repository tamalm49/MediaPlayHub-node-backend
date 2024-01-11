import express from "express";
import cors from "cors";
import cookieParse from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParse());
export default app;
