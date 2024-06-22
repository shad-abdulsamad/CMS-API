import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PostsPerUser = async (req, res) => {
    try {
        const postsPerUser = await prisma.user.findMany({
            select: {
                username: true,
                _count: {
                    select: { contents: true },
                },
            },
        });

        const data = postsPerUser.map(user => ({
            username: user.username,
            postCount: user._count.contents,
        }));

        res.json(data);
    } catch (error) {
        console.error("Error fetching posts per user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const PostsPerCategory = async (req, res) => {
    try {
        const postsPerCategory = await prisma.category.findMany({
            select: {
                category_name: true,
                _count: {
                    select: { categoryContents: true },
                },
            },
        });

        const data = postsPerCategory.map(category => ({
            categoryName: category.category_name,
            postCount: category._count.categoryContents,
        }));

        res.json(data);
    } catch (error) {
        console.error("Error fetching posts per category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const UserRoleDistribution = async (req, res) => {
    try {
        const userCount = await prisma.user.count({
            where: {
                role: 'USER'
            }
        });

        const adminCount = await prisma.user.count({
            where: {
                role: 'ADMIN'
            }
        });

        res.json({ users: userCount, admins: adminCount });
    } catch (error) {
        console.error("Error fetching user role distribution:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};