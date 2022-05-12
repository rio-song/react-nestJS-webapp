/*
  Warnings:

  - You are about to drop the column `userId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Favos` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PostedUser` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favos" DROP CONSTRAINT "Favos_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostedUser" DROP CONSTRAINT "PostedUser_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Favos" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "PostedUser" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Login" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostedUser" ADD CONSTRAINT "PostedUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favos" ADD CONSTRAINT "Favos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
