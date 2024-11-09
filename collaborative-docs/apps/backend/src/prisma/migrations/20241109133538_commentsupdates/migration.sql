/*
  Warnings:

  - You are about to drop the column `userId` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "userId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
