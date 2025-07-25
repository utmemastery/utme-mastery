-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "goalScore" INTEGER,
ADD COLUMN     "onboardingDone" BOOLEAN NOT NULL DEFAULT false;
