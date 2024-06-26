import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret = "jwtsecretkey";

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

export const getSingleComment = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('Fetching comment with id:', id);
        const comment = await prisma.comment.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                user: true,
                content: true,
            },
        });

        if (!comment) {
            console.log('Comment not found');
            return res.status(404).json({ error: 'Comment not found' });
        }

        console.log('Comment fetched:', comment);
        res.json(comment);
    } catch (err) {
        console.error('Error fetching comment:', err.message);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};



export const EditCommentByAdmin = async (req, res) => {
    const { id } = req.params; 
    const { text } = req.body; 

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(id) }
        });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { comment: text }
        });

        res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    } catch (err) {
        res.status(500).json({ message: 'Error updating comment', error: err.message });
    }
};