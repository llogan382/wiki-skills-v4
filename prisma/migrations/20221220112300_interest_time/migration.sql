/*
  Warnings:

  - You are about to drop the column `experience` on the `Interests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interests" DROP COLUMN "experience",
ADD COLUMN     "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileId" DROP NOT NULL;
