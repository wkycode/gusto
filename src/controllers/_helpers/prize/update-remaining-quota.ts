import moment from "moment";
import prisma from "../prisma";
import redisClient from "../redis";

const updateRemainingQuota = async (
  prizeDrawnId: number | any,
  dailyQuota: number | any,
  remainingQuota: number
) => {
  try {
    const currentDate = moment().format("DDMMYY");
    const dailyQuotaCacheResult = await redisClient.get(
      `quota:${prizeDrawnId}:${currentDate}`
    );

    if (!dailyQuotaCacheResult) {
      await redisClient.set(`quota:${prizeDrawnId}:${currentDate}`, 1);
    } else {
      if (Number(dailyQuotaCacheResult) < dailyQuota) {
        if (dailyQuota - Number(dailyQuotaCacheResult) === 1) {
          await redisClient.watch(`quota:${prizeDrawnId}:${currentDate}`);
          const multi = redisClient.multi();
          multi.incrBy(`quota:${prizeDrawnId}:${currentDate}`, 1);
          const result = await multi.exec();
          await redisClient.unwatch();
          if (!result) {
            return {
              error: {
                message: "slow",
              },
            };
          } else {
            await prisma.prize.update({
              where: {
                id: prizeDrawnId,
              },
              data: {
                remaining: remainingQuota - 1,
              },
            });
          }
        }
      } else {
        return {
          error: {
            message: "This gift has reached its daily quota.",
          },
        };
      }
    }
  } catch (err) {
    console.error(err, "here");
  }
};

export default updateRemainingQuota;
