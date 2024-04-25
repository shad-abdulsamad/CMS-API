import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();
const secret = "jwtsecretkey";

export const getUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: "Failed to fetch users", because:error });
    }
}

export const getSingleUser = async (req,res)=>{
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({
            where:{
                 id: parseInt(id)
            }
        });
        if(user){
            res.json(user);
        }else{
            res.status(404).json({message:"User not Found"});
        }
        
    } catch (err) {
        res.status(500).json({message: "Internal server error", error:err})
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, secret);
        const userId = decoded.userId;

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Check if the user is an admin or the owner of the account
        if (decoded.role === "ADMIN" || user.id === userId) {
            await prisma.user.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return res.status(200).json({ message: "User deleted successfully", deletedUser: user });
        } else {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own account" });
        }
    } catch (error) {
        console.error("Error deleting User:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}



export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password if provided
        let hashedPassword = existingUser.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                username: name || existingUser.username, // Update username
                email: email || existingUser.email,
                password: hashedPassword, // Update password
            }
        });

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}