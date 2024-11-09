/*
  Warnings:

  - You are about to drop the `Documents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Documents" DROP CONSTRAINT "Documents_ownerId_fkey";

-- DropTable
DROP TABLE "Documents";

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
