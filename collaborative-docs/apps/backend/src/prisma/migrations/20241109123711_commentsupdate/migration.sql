/*
  Warnings:

  - Added the required column `userId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
