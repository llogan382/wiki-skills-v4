/*
  Warnings:

  - You are about to drop the column `experience` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interests" ADD COLUMN     "experience" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "experience";
