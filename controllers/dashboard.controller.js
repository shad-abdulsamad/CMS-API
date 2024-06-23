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

export const CommentPerPost = async (req, res) => {
    try {
        const commentsPerPost = await prisma.content.findMany({
            select: {
                id: true,
                title: true,
                _count: {
                    select: { comments: true },
                },
            },
        });

        const formattedData = commentsPerPost.map(post => ({
            postId: post.id,
            postTitle: post.title,
            commentCount: post._count.comments,
        }));

        res.json(formattedData);
    } catch (error) {
        console.error("Error fetching comments per post:", error);
        res.status(500).json({ error: "Internal server error", error:error.message });
    }
};




export const UserGrowthPerMonth = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                date_created: true,
            },
        });

        // Count users created per month
        const userGrowth = users.reduce((acc, user) => {
            const month = user.date_created.getMonth(); // Get the month (0-11)
            const year = user.date_created.getFullYear(); // Get the year
            const key = `${year}-${month}`;
            
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += 1;
            return acc;
        }, {});

        // Format the data for the frontend (example format)
        const formattedData = Object.keys(userGrowth).map(key => ({
            month: key,
            users: userGrowth[key],
        }));

        res.json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUniqueVisitorsData = async (req, res) => {
    try {
        const visitorsData = await prisma.visitor.findMany({
            select: {
                date: true,
                uniqueCount: true
            },
            orderBy: {
                date: 'asc'
            }
        });

        const data = visitorsData.map(entry => ({
            date: entry.date.toISOString().slice(0, 10), 
            uniqueCount: entry.uniqueCount
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching unique visitors data' });
    }
};

export const getVisitorTypeData = async (req, res) => {
    try {
        const newVisitors = await prisma.visitor.count({ where: { isNew: true } });
        const returningVisitors = await prisma.visitor.count({ where: { isNew: false } });

        res.json({ newVisitors, returningVisitors });
    } catch (error) {
        console.error("Error fetching visitor type data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};