import prisma from "../prisma";

const createUser = async (phoneNumber: string)  => {
  try {
    const newUser = await prisma.user.create({
      data: {
        phoneNumber: phoneNumber,
      },
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

export default createUser;
