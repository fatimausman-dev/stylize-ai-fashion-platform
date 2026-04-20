-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPaymentSetup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isShopSetup" BOOLEAN NOT NULL DEFAULT false;
