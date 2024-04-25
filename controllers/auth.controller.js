import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

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


 export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Wrong Credentials' });
        }
        
        const token = jwt.sign({ userId: user.id },"jwtsecretkey");
        
        res.status(200).json({ message: 'Sign in successful', token: token });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Failed to sign in', because: error });
    }
}; 



export const logout = (req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json("User has been logged out");
    } catch (error) {
        console.error(error);
    }
} 