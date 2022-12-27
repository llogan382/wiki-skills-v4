/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");
