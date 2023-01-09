/*
  Warnings:

  - Added the required column `photoIdCDN` to the `ReviewPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoIdCDN` to the `SpotPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewPhoto" ADD COLUMN     "photoIdCDN" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SpotPhoto" ADD COLUMN     "photoIdCDN" TEXT NOT NULL;
