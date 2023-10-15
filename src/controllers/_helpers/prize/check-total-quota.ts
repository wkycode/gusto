// import prisma from "../prisma";

// const checkTotalQuota = async (prizeId: number | undefined) => {
//   try {
//     const drawn_prize_quotas = await prisma.quota.findUnique({
//       where: { prizeId: prizeId },
//     });
//     console.log(drawn_prize_quotas, "drawn_prize_quotas");
//     return drawn_prize_quotas;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export default checkTotalQuota;
