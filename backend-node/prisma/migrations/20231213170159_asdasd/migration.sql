/*
  Warnings:

  - A unique constraint covering the columns `[name,shopId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Category_shopId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_shopId_key" ON "Category"("name", "shopId");
