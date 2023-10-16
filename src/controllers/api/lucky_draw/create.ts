import yup from "yup";
import { Request, Response } from "express";
import prisma from "../../_helpers/prisma.js";
import { drawPrize } from "../../_helpers/lucky-draw/draw-prize.ts";
import handleErrors from "../../_helpers/handle-error.ts";
import checkUser from "../../_helpers/users/check-user.ts";
import updateRemainingQuota from "../../_helpers/prize/update-remaining-quota.ts";
import redisClient from "../../_helpers/redis.ts";

const createSchema = yup.object({
  phoneNumber: yup
    .string()
    .required()
    .matches(/^\d+$/, "The field should have digits only"),
  // If there are regional prefix, update the regex
});

const controllersApiLuckyDrawCreate = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    // Verify Request Body
    const verifiedData = await createSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    // End of Verify Request Body

    // Draw Prize
    const prizesCache = await redisClient.get("prizes");
    var prizes;
    if (!prizesCache) {
      const getPrizes = await prisma.prize.findMany();
      await redisClient.set("prizes", JSON.stringify(getPrizes));
      prizes = getPrizes;
    } else {
      prizes = JSON.parse(prizesCache);
    }
    const prizeDrawnId = drawPrize(prizes);
    // End of Draw Prize

    // Check Quotas
    const quotas = prizes.find((ele: any) => ele.id === prizeDrawnId);
    if (quotas && quotas?.remaining === 0) {
      throw { message: "Prize has been all gifted." };
    }
    if (quotas?.remaining) {
      const updateQuota = await updateRemainingQuota(
        prizeDrawnId,
        quotas.daily,
        quotas?.remaining
      );
      if (updateQuota?.error) {
        throw { message: updateQuota.error.message };
      }
    }
    // End of check Quotas

    // Check if user exists if not create user record
    var userRecord;
    const existingUser = await checkUser(verifiedData?.phoneNumber);
    if (!existingUser) {
      await (
        await import("../../_helpers/users/create-user.ts")
      )
        .default(verifiedData?.phoneNumber)
        .then((result) => {
          userRecord = result;
        })
        .catch((err) => err);
    } else {
      userRecord = existingUser;
    }
    // End of Check if user exists if not create user record

    // Create lucky Draw record
    const luckyDrawRecord = await (
      await import("../../_helpers/lucky-draw/create-draw-record.ts")
    ).default(userRecord!.id, userRecord!.phoneNumber, prizeDrawnId!);
    return res.status(201).json(luckyDrawRecord);
    // End of Create lucky Draw record
  } catch (err) {
    return handleErrors(res, err);
  }
};

export default controllersApiLuckyDrawCreate;
