/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Favos" DROP CONSTRAINT "Favos_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PostedUser" DROP CONSTRAINT "PostedUser_user_id_fkey";

-- DropTable
DROP TABLE "User";
