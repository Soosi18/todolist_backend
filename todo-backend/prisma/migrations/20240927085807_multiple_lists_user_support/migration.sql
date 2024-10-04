-- CreateTable
CREATE TABLE "Todo" (
    "todo_id" SERIAL NOT NULL,
    "description" VARCHAR(255),
    "is_complete" BOOLEAN NOT NULL,
    "list_id" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todo_id")
);

-- CreateTable
CREATE TABLE "List" (
    "list_id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("list_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "password" CHAR(60) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List"("list_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
