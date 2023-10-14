import prisma from "../prisma";

const checkQuota = async (phoneNumber: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: String(phoneNumber) },
    });
    return user;
  } catch (err) {
    console.error(err);
  }
};

export default checkQuota;
