/*
  Warnings:

  - Added the required column `measures` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeChart` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "measures" TEXT NOT NULL,
ADD COLUMN     "selectedSizes" TEXT[],
ADD COLUMN     "sizeChart" TEXT NOT NULL;
