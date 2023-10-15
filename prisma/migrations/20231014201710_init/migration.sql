/*
  Warnings:

  - You are about to drop the `Quota` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `daily` to the `Prize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remaining` to the `Prize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Prize` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quota" DROP CONSTRAINT "Quota_prizeId_fkey";

-- AlterTable
ALTER TABLE "Prize" ADD COLUMN     "daily" INTEGER NOT NULL,
ADD COLUMN     "remaining" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Quota";
