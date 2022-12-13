/*
  Warnings:

  - You are about to drop the column `experienceTime` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `experienceUnit` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "experienceTime",
DROP COLUMN "experienceUnit",
ADD COLUMN     "experience" TIMESTAMP(3);

-- DropEnum
DROP TYPE "ExperienceUnit";
