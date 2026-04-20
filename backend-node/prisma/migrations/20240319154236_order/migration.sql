/*
  Warnings:

  - You are about to drop the column `orderNo` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `OrderDetail` table. All the data in the column will be lost.
  - Added the required column `shopOrderId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shopId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_orderId_fkey";

-- DropIndex
DROP INDEX "Order_orderNo_key";

-- DropIndex
DROP INDEX "Order_shopId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderNo",
DROP COLUMN "shopId",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "orderId",
DROP COLUMN "total",
ADD COLUMN     "shopOrderId" INTEGER NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ShopOrder" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "shippingFee" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShopOrder" ADD CONSTRAINT "ShopOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopOrder" ADD CONSTRAINT "ShopOrder_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_shopOrderId_fkey" FOREIGN KEY ("shopOrderId") REFERENCES "ShopOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
