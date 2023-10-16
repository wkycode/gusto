import moment from "moment";
import prisma from "../prisma";
import redisClient from "../redis";

const createDrawRecord = async (
  userId: number,
  userPhoneNumber: string,
  prizeId: number
) => {
  try {
    const currentDate = moment().format("DDMMYY");
    const has_user_participated = await redisClient.get(
      `dailyRecord:${userId}:${currentDate}`
    );
    if (has_user_participated) {
      return {
        error: {
          message:
            "You have already participated today, please come back tomorrow.",
        },
      };
    } else {
      const luckyDrawRecord = await prisma.luckyDraw.create({
        data: {
          userId: userId,
          userPhoneNumber: userPhoneNumber,
          prizeId: prizeId,
          isRedeemed: false,
        },
      });
      redisClient.set(`dailyRecord:${userId}:${currentDate}`, 1);
      return luckyDrawRecord;
    }
  } catch (err) {
    throw err;
  }
};

export default createDrawRecord;
