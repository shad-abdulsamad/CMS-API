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
