/*
  Warnings:

  - You are about to drop the column `userImgUrl` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_img_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userImgUrl",
ADD COLUMN     "user_img_url" TEXT NOT NULL;
