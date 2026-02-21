import { auth } from "@/auth";
import { db } from "./prisma";

export const checkUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // NextAuth Prisma adapter should have created the user, 
    // but in case of any manual check or initial setup:
    const newUser = await db.user.create({
      data: {
        name: session.user.name,
        image: session.user.image,
        email: session.user.email,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
