/*
  Warnings:

  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostedUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Favos" DROP CONSTRAINT "Favos_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Favos" DROP CONSTRAINT "Favos_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Login" DROP CONSTRAINT "Login_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PostedUser" DROP CONSTRAINT "PostedUser_post_id_fkey";

-- DropForeignKey
ALTER TABLE "PostedUser" DROP CONSTRAINT "PostedUser_user_id_fkey";

-- DropTable
DROP TABLE "Comments";

-- DropTable
DROP TABLE "Favos";

-- DropTable
DROP TABLE "Login";

-- DropTable
DROP TABLE "PostedUser";

-- DropTable
DROP TABLE "User";
