import yup from "yup";
import { Request, Response } from "express";
import prisma from "../../_helpers/prisma.js";
import { drawPrize } from "../../_helpers/lucky-draw/draw-prize.ts";
import handleErrors from "../../_helpers/handle-error.ts";
import checkUser from "../../_helpers/users/check-user.ts";

const createSchema = yup.object({
  phoneNumber: yup.string().required(),
});

const controllersApiLuckyDrawCreate = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    // Verify Posted Data
    const verifiedData = await createSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    console.log(verifiedData);
    // Check if user exists if not create user record
    const existing_user = await checkUser(verifiedData?.phoneNumber);
    console.log(existing_user, "user exists");
    if (!existing_user) {
      const user = await (
        await import("../../_helpers/users/create-user.ts")
      ).default(verifiedData?.phoneNumber);
      console.log(user, "abc");
    }
    // End of Check if user exists if not create user record

    const prizes = await prisma.prize.findMany();
    const prize_drawn = drawPrize(prizes);

    return res.status(201).json("abc");
  } catch (err) {
    console.log("error");
    return handleErrors(res, err);
  }
};

export default controllersApiLuckyDrawCreate;
