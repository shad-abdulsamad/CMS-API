import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import winston from "winston";
import authRouter from "./routes/auth.route.js";
import categoryRouter from "./routes/category.route.js";
import commentRouter from "./routes/comment.route.js";
import contentRouter from "./routes/content.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import userRouter from "./routes/user.route.js";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
app.use(cookieParser());

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    }
});

const upload = multer({ storage });

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", upload.single('image'), contentRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);
app.use("/api/dashboard", dashboardRouter); 
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
