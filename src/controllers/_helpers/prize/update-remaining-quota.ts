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
    console.log(dailyQuotaCacheResult, "dailyQuotaCacheResult");

    if (!dailyQuotaCacheResult) {
      const setQuotaCache = await redisClient.set(
        `quota:${prizeDrawnId}:${currentDate}`,
        1
      );
    } else {
      if (Number(dailyQuotaCacheResult) < dailyQuota) {
        if (dailyQuota - Number(dailyQuotaCacheResult) === 1) {
          await redisClient.watch(`quota:${prizeDrawnId}:${currentDate}`);
          const multi = redisClient.multi();
          multi.incrBy(`quota:${prizeDrawnId}:${currentDate}`, 1);
          const result = await multi
            .exec()
            .catch((err) => console.log(err, "here"));
          console.log(result, "multi");
          await redisClient.unwatch();
          if (!result) {
            return {
              error: true,
              message: "slow",
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
          error: true,
          message: "This gift has reached its daily quota.",
        };
      }
    }
  } catch (err) {
    console.error(err, "here");
  }
};

export default updateRemainingQuota;
