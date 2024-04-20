import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);
    try {
        const newUser = await prisma.user.create({
            data:{
                username:username,
                email:email,
                password:hashedPassword
            }
        });

        res.status(201).json({ message: "User created successfully", user: newUser });
        
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user", because:error });
    }
}