/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `ShopOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAtBuyer" TIMESTAMP(3),
ADD COLUMN     "deletedAtRetail" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ShopOrder" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAtBuyer" TIMESTAMP(3),
ADD COLUMN     "deletedAtRetail" TIMESTAMP(3);
