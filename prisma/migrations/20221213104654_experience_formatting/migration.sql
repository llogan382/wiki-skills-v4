/*
  Warnings:

  - You are about to drop the column `experience` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ExperienceUnit" AS ENUM ('MONTHS', 'YEARS');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "experience",
ADD COLUMN     "experienceTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "experienceUnit" "ExperienceUnit" NOT NULL DEFAULT 'MONTHS';
