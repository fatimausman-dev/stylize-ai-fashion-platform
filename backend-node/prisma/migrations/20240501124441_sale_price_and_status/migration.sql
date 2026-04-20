/*
  Warnings:

  - Added the required column `salePrice` to the `SaleItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "SaleItem" ADD COLUMN     "salePrice" INTEGER NOT NULL;
