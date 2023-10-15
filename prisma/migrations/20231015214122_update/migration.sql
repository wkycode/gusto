/*
  Warnings:

  - A unique constraint covering the columns `[userPhoneNumber]` on the table `LuckyDraw` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[redeemCode]` on the table `LuckyDraw` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LuckyDraw_userPhoneNumber_key" ON "LuckyDraw"("userPhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "LuckyDraw_redeemCode_key" ON "LuckyDraw"("redeemCode");
