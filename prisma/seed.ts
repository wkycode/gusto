import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const createUser = await prisma.user.create({
    data: {
      phoneNumber: "55667788",
    },
  });

  const createPrizes = await prisma.prize.createMany({
    data: [
      {
        name: "$5 Cash Coupon",
        slug: "5_cash_coupon",
        probability: 0.005,
        hasQuota: true,
        daily: 100,
        total: 500,
        remaining: 500,
      },
      {
        name: "$2 Cash Coupon",
        slug: "2_cash_coupon",
        probability: 0.02,
        hasQuota: true,
        daily: 500,
        total: 5000,
        remaining: 5000,
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
