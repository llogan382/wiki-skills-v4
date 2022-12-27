-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userContactUserIdForContact" INTEGER;

-- AlterTable
ALTER TABLE "UsersOnInterests" ADD COLUMN     "experienceDetails" TEXT;

-- CreateTable
CREATE TABLE "UserContact" (
    "userIdForContact" INTEGER NOT NULL,
    "phone" TEXT,
    "faceTime" TEXT,
    "email" TEXT,
    "text" TEXT,
    "linkedIn" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "tikTok" TEXT,
    "youtube" TEXT,

    CONSTRAINT "UserContact_pkey" PRIMARY KEY ("userIdForContact")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userContactUserIdForContact_fkey" FOREIGN KEY ("userContactUserIdForContact") REFERENCES "UserContact"("userIdForContact") ON DELETE SET NULL ON UPDATE CASCADE;
