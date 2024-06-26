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

        const hashedPassword = existingUser.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                username: name || existingUser.username,
                email: email || existingUser.email,
                password: hashedPassword,
            }
        });

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const createUserByAdmin = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword, 
                role
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const updateUserByAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    try {
        
        if (!username || !email || !role) {
            return res.status(400).json({ message: 'Username, email, and role are required' });
        }

        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                username,
                email,
                role,
            },
        });

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user by admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await prisma.user.delete({
            where: { id: Number(id) }
        });

        res.status(200).json({ message: 'User deleted successfully' });
    }catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
}
};