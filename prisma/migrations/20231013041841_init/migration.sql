/*
  Warnings:

  - You are about to drop the `Participation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `remaining` to the `Quota` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_userId_user_phone_numer_fkey";

-- AlterTable
ALTER TABLE "Quota" ADD COLUMN     "remaining" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Participation";

-- CreateTable
CREATE TABLE "LuckyDraw" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "user_phone_numer" TEXT NOT NULL,
    "prizeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "LuckyDraw_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LuckyDraw" ADD CONSTRAINT "LuckyDraw_userId_user_phone_numer_fkey" FOREIGN KEY ("userId", "user_phone_numer") REFERENCES "User"("id", "phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuckyDraw" ADD CONSTRAINT "LuckyDraw_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
