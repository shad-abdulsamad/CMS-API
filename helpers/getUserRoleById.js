import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getUserRoleById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user.role;
  } catch (error) {
    console.error("Error retrieving user role:", error);
    throw error;
  }
}
