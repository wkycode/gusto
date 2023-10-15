/*
  Warnings:

  - The required column `redeemCode` was added to the `LuckyDraw` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "LuckyDraw" ADD COLUMN     "redeemCode" TEXT NOT NULL;
