/*
  Warnings:

  - You are about to drop the column `postId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Favos` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Favos` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `PostedUser` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PostedUser` table. All the data in the column will be lost.
  - You are about to drop the column `familyName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - Added the required column `post_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Favos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Favos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `PostedUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `PostedUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `family_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favos" DROP CONSTRAINT "Favos_postId_fkey";

-- DropForeignKey
ALTER TABLE "Favos" DROP CONSTRAINT "Favos_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostedUser" DROP CONSTRAINT "PostedUser_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostedUser" DROP CONSTRAINT "PostedUser_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Favos" DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageUrl",
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostedUser" DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "familyName",
DROP COLUMN "firstName",
ADD COLUMN     "family_name" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PostedUser" ADD CONSTRAINT "PostedUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostedUser" ADD CONSTRAINT "PostedUser_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favos" ADD CONSTRAINT "Favos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favos" ADD CONSTRAINT "Favos_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
