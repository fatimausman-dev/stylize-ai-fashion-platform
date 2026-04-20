-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ShopOrder" ADD COLUMN     "deletedAt" TIMESTAMP(3);
