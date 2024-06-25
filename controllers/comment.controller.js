import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret = "jwtsecretkey";



export const getComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await prisma.comment.findMany({
            where: {
                content_id:postId
            },
          
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const deleteComment = async (req, res) => {
    const { postId,commentId } = req.params;
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const userId = decoded.userId;
        
        const comment = await prisma.comment.findUnique({
            where: {
                id: parseInt(commentId)
            }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment Not Found" });
        }
        
        if (comment.user_id === parseInt(userId) || decoded.role === "ADMIN") {
            await prisma.comment.delete({
                where: {
                    id: parseInt(commentId)
                }
            });

            return res.status(200).json({ message: "Comment deleted successfully" });
        } else {
            return res.status(403).json({ message: "Unauthorized: You are not allowed to delete this comment" });
        }
    } catch (error) {
        console.error("Error deleting Comment:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany();
        
        res.json(comments);
    } catch (error) {
        console.error("Failed to retrieve comments:", error);
        res.status(500).send("Error retrieving comments");
    }
};


export const deleteCommentByAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await prisma.comment.delete({
            where: { id: parseInt(id) },
        });

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully", deletedComment });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(500).json({ message: "Server error", error });
    }
};

/* 
export const createCommentByAdmin = async (req, res) => {

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
 */

export const createCommentByAdmin = async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    let decoded;
    try {
        decoded = jwt.verify(token, secret);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }

    const userId = decoded.userId;

    if (!text) {
        return res.status(400).json({ message: "Comment text is required." });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                comment: text,
                content_id: parseInt(id),
                user_id: parseInt(userId),
                date_commented: new Date()
            },
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the comment.", error: error.message });
    }
};


export const getPostsForComments = async (req, res) => {
    try {
        const posts = await prisma.content.findMany({
            select: {
                id: true,
                title: true
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving the posts.", error: error.message });
    }
};