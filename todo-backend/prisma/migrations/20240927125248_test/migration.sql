/*
  Warnings:

  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_list_id_fkey";

-- DropTable
DROP TABLE "List";

-- CreateTable
CREATE TABLE "list" (
    "list_id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "list_pkey" PRIMARY KEY ("list_id")
);
