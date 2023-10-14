import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.create({
    data: {
      phoneNumber: "55512332",
    },
  });

  const createPrizes = await prisma.prize.createMany({
    data: [
      {
        name: "$5 Cash Coupon",
        slug: "5_cash_coupon",
        probability: 0.005,
        hasQuota: false,
      },
      {
        name: "$2 Cash Coupon",
        slug: "2_cash_coupon",
        probability: 0.02,
        hasQuota: false,
      },
      {
        name: "Buy 1 Get 1 Coupon",
        slug: "buy1_get1_coupon",
        probability: 0.8,
        hasQuota: false,
      },
      {
        name: "No Prize",
        slug: "no_prize",
        probability: 0.175,
        hasQuota: false,
      },
    ],
    skipDuplicates: true,
  });

  const createQuotas = await prisma.quota.createMany({
    data: [
      {
        prizeId: 1,
        daily: 100,
        total: 500,
        remaining: 500,
      },
      {
        prizeId: 2,
        daily: 500,
        total: 5000,
        remaining: 500,
      },
    ],
    skipDuplicates: true,
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
