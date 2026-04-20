/*
  Warnings:

  - You are about to drop the column `return` on the `Policy` table. All the data in the column will be lost.
  - The `shippingFee` column on the `Policy` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `idDocBack` to the `Retailer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idDocFront` to the `Retailer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerificationCode_userId_key";

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "return",
ADD COLUMN     "returnPolicy" TEXT,
DROP COLUMN "shippingFee",
ADD COLUMN     "shippingFee" INTEGER;

-- AlterTable
ALTER TABLE "Retailer" ADD COLUMN     "idDocBack" TEXT NOT NULL,
ADD COLUMN     "idDocFront" TEXT NOT NULL;
