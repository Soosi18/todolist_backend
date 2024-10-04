/*
  Warnings:

  - You are about to drop the column `list_id` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `belongsToId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_list_id_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "list_id",
ADD COLUMN     "belongsToId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "List"("list_id") ON DELETE RESTRICT ON UPDATE CASCADE;
