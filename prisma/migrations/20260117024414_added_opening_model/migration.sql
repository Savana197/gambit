-- CreateTable
CREATE TABLE "Opening" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "authorId" INTEGER,

    CONSTRAINT "Opening_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Opening" ADD CONSTRAINT "Opening_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
