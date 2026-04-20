/*
  Warnings:

  - You are about to drop the column `measureOf` on the `SizeChart` table. All the data in the column will be lost.
  - The `sizeUnits` column on the `SizeChart` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `sizeChart` to the `SizeChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SizeChart" DROP COLUMN "measureOf",
ADD COLUMN     "sizeChart" TEXT NOT NULL,
DROP COLUMN "sizeUnits",
ADD COLUMN     "sizeUnits" TEXT[],
ALTER COLUMN "measurements" SET NOT NULL,
ALTER COLUMN "measurements" SET DATA TYPE TEXT;
