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

    const content = await prisma.content.create({
      data: {
        title,
        body,
        date_created: new Date(),
        user: { connect: { id: userId } },
      },
    });


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


export const showPosts = async (req,res)=>{
  try {
     const posts = await prisma.content.findMany();
     res.status(200).json(posts);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users", because:error });
  }
}

export const getSinglePost = async (req,res) =>{
  const {id} = req.params;
    try {
      const post = await prisma.content.findUnique({
        where:{
          id:parseInt(id)
        }
      });

      if(post){
        res.status(200).json(post);
      }else{
        res.status(404).json({message:"Post not Found"});
      }

    } catch (err) {
      res.status(500).json({message:"Internal Server Error", error:err });
      
    }
}
export const updateContent = async (req, res) => {
  const { id } = req.params;
  const { title, body, tags, categoryName } = req.body;
  try {
    const content = await prisma.content.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!content) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    // Update the content
    const updatedContent = await prisma.content.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        body
        // You can add more fields to update here
      }
    });

    res.status(200).json({ message: "Content updated successfully", data: updatedContent });
  } catch (err) {
    console.error("Error Updating Content:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
