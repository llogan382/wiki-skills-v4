/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_locationProfile_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "State" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "experience" TIMESTAMP(3),
ADD COLUMN     "street1" TEXT,
ADD COLUMN     "street2" TEXT,
ADD COLUMN     "zipcode" INTEGER;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Profile";
