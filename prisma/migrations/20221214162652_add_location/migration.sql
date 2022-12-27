-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "street1" TEXT NOT NULL,
    "street2" TEXT,
    "city" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT true,
    "locationProfile" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationProfile_key" ON "Location"("locationProfile");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_locationProfile_fkey" FOREIGN KEY ("locationProfile") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
