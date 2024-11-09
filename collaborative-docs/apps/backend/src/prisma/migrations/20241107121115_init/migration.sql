/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_ownerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "Document";
