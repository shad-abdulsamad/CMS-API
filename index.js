import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import winston from "winston";
const app = express();

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
}); 