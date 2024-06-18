import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = "jwtsecretkey";

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
 



export const deleteContent = async (req, res) => {
  const { id } = req.params;

  try {
    
    await prisma.comment.deleteMany({
      where: {
        content_id: parseInt(id),
      },
    });

    
    await prisma.contentTag.deleteMany({
      where: {
        content_id: parseInt(id),
      },
    });


    await prisma.categoryContent.deleteMany({
      where: {
        content_id: parseInt(id),
      },
    });


    await prisma.content.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    return res.status(500).json({ error: "Internal server error", error: error });
  }
};

 export const createContentByAdmin = async (req, res) => {
    try {
        const { title, category, content } = req.body;
        const userId = 1;

        let imagePath = null;
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const newContent = await prisma.content.create({
            data: {
                user_id: userId,
                title,
                body: content,
                date_created: new Date(),
                image: imagePath,
                categoryContent: {
                    create: {
                        category_id: parseInt(category)
                    }
                },
               
            }
        });

        res.status(201).json(newContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}; 


export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.content.findMany({
            include: {
                user: true, 
                comments: {
                    include: {
                        user: true 
                    }
                },
                categoryContent: {
                    include: {
                        category: true 
                    }
                }
            }
        });

        const formattedPosts = posts.map(post => ({
            id: post.id,
            author: post.user.username,
            postTitle: post.title,
            postBody:post.body,
            category: post.categoryContent.map(cc => cc.category.category_name).join(', '),
            comments: post.comments.map(comment => ({
                id: comment.id,
                user: comment.user.username,
                content: comment.comment
            })),
            date: post.date_created.toISOString().split('T')[0],
            image: post.image
        }));

        res.status(200).json(formattedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: error.message });
    }
};


export const updateContent = async (req, res) => {
    
};