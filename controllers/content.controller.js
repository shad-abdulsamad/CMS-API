import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = "jwtsecretkey";

export const createContent = async (req, res) => {
  const { title, body, tags, categoryName } = req.body;
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;
    console.log(userId);

    // Create the content
    const content = await prisma.content.create({
      data: {
        title,
        body,
        date_created: new Date(),
        user: { connect: { id: userId } },
      },
    });

    // Connect tags to the content
    if (Array.isArray(tags) && tags.length > 0) {
      const tagIds = await Promise.all(
        tags.map(async (tagName) => {
          const tag = await prisma.tag.create({
            data: { tag_name: tagName },
          });
          return tag.id;
        })
      );
      await prisma.contentTag.createMany({
        data: tagIds.map((tagId) => ({
          content_id: content.id,
          tag_id: tagId,
        })),
      });
    }

    // Create the category if it doesn't exist
    if (categoryName) {
      const category = await prisma.category.create({
        data: { category_name: categoryName },
      });
      await prisma.categoryContent.create({
        data: {
          content_id: content.id,
          category_id: category.id,
        },
      });
    }

    return res.status(201).json({ message: "Content created successfully", content });
  } catch (error) {
    console.error("Error creating content:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
