/*
  Warnings:

  - You are about to drop the column `profileId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationProfile]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - The required column `locationProfile` was added to the `Location` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_profileId_fkey";

-- DropIndex
DROP INDEX "Location_profileId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "profileId",
ADD COLUMN     "locationProfile" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationProfile_key" ON "Location"("locationProfile");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_locationProfile_fkey" FOREIGN KEY ("locationProfile") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
