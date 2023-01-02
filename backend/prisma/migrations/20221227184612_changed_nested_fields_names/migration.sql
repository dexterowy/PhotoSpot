/*
  Warnings:

  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ListToSpot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ListToSpot" DROP CONSTRAINT "_ListToSpot_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListToSpot" DROP CONSTRAINT "_ListToSpot_B_fkey";

-- DropTable
DROP TABLE "List";

-- DropTable
DROP TABLE "_ListToSpot";

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CollectionToSpot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToSpot_AB_unique" ON "_CollectionToSpot"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToSpot_B_index" ON "_CollectionToSpot"("B");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToSpot" ADD CONSTRAINT "_CollectionToSpot_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToSpot" ADD CONSTRAINT "_CollectionToSpot_B_fkey" FOREIGN KEY ("B") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
