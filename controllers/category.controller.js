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

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                category_name: true,
            },
        });
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
};


export const updateCategory = async (req,res)=>{
    const {categoryName} = req.body;
    const {id} = req.params;
    try {
        const existingCategory = await prisma.category.findUnique({
            where:{
                id:parseInt(id)
            }
        });

        if(!existingCategory){
            return res.status(404).json({message:"Category Does not exist"});
        }

        await prisma.category.update({
            where:{
                id:parseInt(id)
            },
            data:{
                category_name:categoryName
            }
        });

        return res.status(201).json({message:"Category Updated Successfully", categoryName});
        
    } catch (err) {
        return res.status(500).json({message:"Internal Server Error", error:err});
        
    }
}




export const updateCategoryByAdmin = async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { category_name },
        });
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

export const deleteCategoryByAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.category.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

export const bulkDeleteCategories = async (req, res) => {
    const { ids } = req.body;

    try {
        await prisma.category.deleteMany({
            where: {
                id: {
                    in: ids.map((id) => Number(id)),
                },
            },
        });
        res.json({ message: 'Categories deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete categories' });
    }
};