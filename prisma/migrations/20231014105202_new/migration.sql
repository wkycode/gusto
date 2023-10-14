/*
  Warnings:

  - Added the required column `isRedeemed` to the `LuckyDraw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LuckyDraw" ADD COLUMN     "isRedeemed" BOOLEAN NOT NULL;
