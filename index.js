import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import winston from "winston";
import authRouter from "./routes/auth.route.js";
import categoryRouter from "./routes/category.route.js";
import commentRouter from "./routes/comment.route.js";
import contentRouter from "./routes/content.route.js";
import userRouter from "./routes/user.route.js";
dotenv.config();
const app = express();
app.use(cookieParser());

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/posts", contentRouter);
app.use("/api/categories", categoryRouter );
app.use("/api/comments", commentRouter);
app.listen(3000, ()=>{
    console.log("server is running on port 3000");
}); 