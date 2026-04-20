/*
  Warnings:

  - You are about to drop the column `colors` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `buyerId` on the `SizeChart` table. All the data in the column will be lost.
  - You are about to drop the column `measurements` on the `SizeChart` table. All the data in the column will be lost.
  - You are about to drop the column `sizeUnits` on the `SizeChart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `measures` to the `SizeChart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SizeChart" DROP CONSTRAINT "SizeChart_buyerId_fkey";

-- DropIndex
DROP INDEX "SizeChart_buyerId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "colors",
ADD COLUMN     "selectedColors" TEXT[],
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'active',
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SizeChart" DROP COLUMN "buyerId",
DROP COLUMN "measurements",
DROP COLUMN "sizeUnits",
ADD COLUMN     "measures" TEXT NOT NULL,
ADD COLUMN     "selectedSizes" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_userId_key" ON "VerificationCode"("userId");
