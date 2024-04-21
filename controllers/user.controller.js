import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: "Failed to fetch users", because:error });
    }
}

export const getSingleUser = async (req,res)=>{
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({
            where:{
                 id: parseInt(id)
            }
        });
        if(user){
            res.json(user);
        }else{
            res.status(404).json({message:"User not Found"});
        }
        
    } catch (err) {
        res.status(500).json({message: "Internal server error", error:err})
    }
}