/*
  Warnings:

  - You are about to drop the column `color` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `subTotal` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `WishlistItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WishlistItem" DROP COLUMN "color",
DROP COLUMN "quantity",
DROP COLUMN "size",
DROP COLUMN "subTotal",
DROP COLUMN "total";

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
