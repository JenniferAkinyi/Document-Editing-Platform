/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_ownerId_fkey";

-- DropTable
DROP TABLE "Document";

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
