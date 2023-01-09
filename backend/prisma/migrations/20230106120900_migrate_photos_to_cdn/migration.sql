/*
  Warnings:

  - You are about to drop the column `filename` on the `ReviewPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `originalFilename` on the `ReviewPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `SpotPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `originalFilename` on the `SpotPhoto` table. All the data in the column will be lost.
  - Added the required column `thumbnailUrl` to the `ReviewPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ReviewPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `SpotPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `SpotPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewPhoto" DROP COLUMN "filename",
DROP COLUMN "originalFilename",
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SpotPhoto" DROP COLUMN "filename",
DROP COLUMN "originalFilename",
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
