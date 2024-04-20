import express from "express";
import userRouter from "./routes/auth.route.js";
const app = express();

app.use(express.json());
app.use("/api/auth",userRouter);

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
}); 