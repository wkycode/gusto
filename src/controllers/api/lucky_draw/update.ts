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
    if (!retrieveLuckyDrawCache) {
      const redeemPrize = await prisma.luckyDraw.updateMany({
        where: {
          userPhoneNumber: verifiedData.userPhoneNumber,
          redeemCode: verifiedData.redeemCode,
        },
        data: {
          isRedeemed: true,
        },
      });
      if (redeemPrize.count !== 0) {
        await redisClient.set(
          `luckyDraw:${verifiedData.userPhoneNumber}: ${verifiedData.redeemCode}`,
          1
        );
        return res.status(201).json({
          isRedeemed: true,
          redeemCode: verifiedData.redeemCode,
          userPhoneNumber: verifiedData.userPhoneNumber,
        });
      } else {
        throw { message: "Invalid lucky draw record" };
      }
    } else {
      throw { message: "Prize has already been redeemed" };
    }
  } catch (err) {
    return handleErrors(res, err);
  }
};

export default controllersApiLuckyDrawUpdate;
