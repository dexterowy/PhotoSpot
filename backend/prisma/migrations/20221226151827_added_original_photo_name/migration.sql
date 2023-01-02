/*
  Warnings:

  - You are about to drop the column `path` on the `SpotPhoto` table. All the data in the column will be lost.
  - Added the required column `originalFilename` to the `ReviewPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalFilename` to the `SpotPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewPhoto" ADD COLUMN     "originalFilename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SpotPhoto" DROP COLUMN "path",
ADD COLUMN     "originalFilename" TEXT NOT NULL;
