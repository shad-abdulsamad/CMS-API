import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret = "jwtsecretkey";
export const createComment = async (req, res) => {

    const { text } = req.body;  
    const { id } = req.params; 
    console.log(id);
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;
    console.log(userId);

    
    if (!text) {
        return res.status(400).json({ message: "Comment text is required." });
    }

    try {
    
        const comment = await prisma.comment.create({
    data: {
        comment: text,         
        content_id: parseInt(id),    
        user_id: parseInt(userId) ,
        date_commented:new Date()
    },
});


        
        res.status(201).json(comment);
    } catch (error) {
    
        res.status(500).json({ message: "An error occurred while creating the comment.", error: error.message });
    }
};

