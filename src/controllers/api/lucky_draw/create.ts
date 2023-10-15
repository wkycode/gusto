import yup from "yup";
import { Request, Response } from "express";
import prisma from "../../_helpers/prisma.js";
import { drawPrize } from "../../_helpers/lucky-draw/draw-prize.ts";
import handleErrors from "../../_helpers/handle-error.ts";
import checkUser from "../../_helpers/users/check-user.ts";
import updateRemainingQuota from "../../_helpers/prize/update-remaining-quota.ts";

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

    // Check if user exists if not create user record
    var user_record;
    const existing_user = await checkUser(verifiedData?.phoneNumber);
    if (!existing_user) {
      const user = await (
        await import("../../_helpers/users/create-user.ts")
      )
        .default(verifiedData?.phoneNumber)
        .then((result) => {
          user_record = result;
        })
        .catch((err) => err);
    } else {
      user_record = existing_user;
    }

    const prizes = await prisma.prize.findMany();
    const prize_drawn_id = drawPrize(prizes);
    const quotas = prizes.find((ele) => ele.id === prize_drawn_id);

    if (quotas && quotas?.remaining === 0) {
      throw { message: "Prize has been all gifted." };
    }

    if (quotas?.remaining) {
      const updateQuota = await updateRemainingQuota(
        prize_drawn_id,
        quotas.daily,
        quotas?.remaining
      );
      if (updateQuota?.error === true) {
        throw { message: updateQuota?.message };
      }
    }

    const luckyDrawRecord = await (
      await import("../../_helpers/lucky-draw/create-draw-record.ts")
    ).default(user_record!.id, user_record!.phoneNumber, prize_drawn_id!);

    return res.status(201).json(luckyDrawRecord);
  } catch (err) {
    return handleErrors(res, err);
  }
};

export default controllersApiLuckyDrawCreate;
