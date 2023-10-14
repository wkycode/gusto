import prisma from "../../_helpers/prisma.js";
import { Request, Response } from "express";

const controllersApiUsersShow = async (req: Request, res: Response) => {
  try {
    const {
      params: { phoneNumber },
    } = req;
    const user = await prisma.user.findUnique({
      where: { phoneNumber: String(phoneNumber) },
    });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

export default controllersApiUsersShow;
