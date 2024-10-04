/*
  Warnings:

  - You are about to drop the `list` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "list";

-- CreateTable
CREATE TABLE "List" (
    "list_id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("list_id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List"("list_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
