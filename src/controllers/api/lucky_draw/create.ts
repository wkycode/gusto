import yup from "yup";
import { Request, Response } from "express";
import prisma from "../../_helpers/prisma.js";
import controllersApiUsersShow from "../users/show.ts";
import controllersApiUsersCreate from "../users/create.ts";
import drawPrize from "../../_helpers/drawPrize.ts";

const createSchema = yup.object({
  phone: yup.string().required(),
});

const controllersApiLuckyDrawCreate = async (req: Request, res: Response) => {
  try {
    const prizes = await prisma.prize.findMany();
    const prize_drawn = drawPrize(prizes);
    
    return res.status(201).json("abc");
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default controllersApiLuckyDrawCreate;
