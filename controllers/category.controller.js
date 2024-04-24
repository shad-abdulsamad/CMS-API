import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
    const { categoryName } = req.body;
    try {
        const existingCategory = await prisma.category.findUnique({
            where: {
                category_name: categoryName
            }
        });

        if (existingCategory) {
            return res.status(400).json({ message: "Category Already Exists" });
        }

        await prisma.category.create({
            data: {
                category_name: categoryName
            }
        });

        return res.status(201).json({ message: "Category Created Successfully", categoryName });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const getCategories = async(req,res)=>{
    try {
        const categories = await prisma.category.findMany();
        if(categories){
            return res.status(500).json(categories);
        }
        
    } catch (err) {
        return res.status(500).json({message:"Internal Server Error", error:err});
        
    }
}