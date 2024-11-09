-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "documentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
