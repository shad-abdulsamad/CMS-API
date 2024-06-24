/* import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

 const getUserIdByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      return user.id;
    } else {
      console.log(`User with email ${email} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user ID:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export default getUserIdByEmail;

 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUserIdByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      return user.id;
    } else {
      console.log(`User with email ${email} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user ID:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getUserIdByEmail;
