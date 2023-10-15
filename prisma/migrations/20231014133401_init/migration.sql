-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "hasQuota" BOOLEAN NOT NULL,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quota" (
    "id" SERIAL NOT NULL,
    "prizeId" INTEGER NOT NULL,
    "daily" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "dailyRemaining" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,

    CONSTRAINT "Quota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuckyDraw" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userPhoneNumber" TEXT NOT NULL,
    "prizeId" INTEGER NOT NULL,
    "isRedeemed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "LuckyDraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_phoneNumber_key" ON "User"("id", "phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Quota_prizeId_key" ON "Quota"("prizeId");

-- AddForeignKey
ALTER TABLE "Quota" ADD CONSTRAINT "Quota_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuckyDraw" ADD CONSTRAINT "LuckyDraw_userId_userPhoneNumber_fkey" FOREIGN KEY ("userId", "userPhoneNumber") REFERENCES "User"("id", "phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuckyDraw" ADD CONSTRAINT "LuckyDraw_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
