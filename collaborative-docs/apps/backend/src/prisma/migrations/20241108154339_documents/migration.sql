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
