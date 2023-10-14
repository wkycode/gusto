/*
  Warnings:

  - You are about to drop the column `user_phone_numer` on the `LuckyDraw` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userPhoneNumber` to the `LuckyDraw` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LuckyDraw" DROP CONSTRAINT "LuckyDraw_userId_user_phone_numer_fkey";

-- AlterTable
ALTER TABLE "LuckyDraw" DROP COLUMN "user_phone_numer",
ADD COLUMN     "userPhoneNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "LuckyDraw" ADD CONSTRAINT "LuckyDraw_userId_userPhoneNumber_fkey" FOREIGN KEY ("userId", "userPhoneNumber") REFERENCES "User"("id", "phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
