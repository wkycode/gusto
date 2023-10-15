import yup from "yup";
import handleErrors from "../../_helpers/handle-error";
import prisma from "../../_helpers/prisma";
import { Response, Request } from "express";
import redisClient from "../../_helpers/redis";

const controllersApiLuckyDrawUpdate = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const createSchema = yup.object({
      userPhoneNumber: yup.string().required(),
      redeemCode: yup.string().required(),
    });
    const verifiedData = await createSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const retrieveLuckyDrawCache = await redisClient.get(
      `luckyDraw:${verifiedData.userPhoneNumber}: ${verifiedData.redeemCode}`
    );
    if (verifiedData && !retrieveLuckyDrawCache) {
      const redeemRecord = await prisma.luckyDraw.update({
        where: {
          userPhoneNumber: verifiedData.userPhoneNumber,
          redeemCode: verifiedData.redeemCode,
        },
        data: {
          isRedeemed: true,
        },
      });
      const { isRedeemed, redeemCode: rc, userPhoneNumber: upn } = redeemRecord;
      await redisClient.set(`luckyDraw:${upn}: ${rc}`, 1);
      return res
        .status(201)
        .json({ isRedeemed: isRedeemed, redeemCode: rc, userPhoneNumber: upn });
    } else {
      return res
        .status(201)
        .json({ message: "Prize has already been redeemed" });
    }
  } catch (err) {
    return handleErrors(res, err);
  }
};

export default controllersApiLuckyDrawUpdate;
