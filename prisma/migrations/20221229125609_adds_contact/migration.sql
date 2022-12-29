/*
  Warnings:

  - You are about to drop the column `text` on the `UserContact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserContact" DROP COLUMN "text",
ADD COLUMN     "textMessage" TEXT;
