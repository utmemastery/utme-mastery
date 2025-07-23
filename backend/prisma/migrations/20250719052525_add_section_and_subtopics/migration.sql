/*
  Warnings:

  - You are about to drop the column `recommendedTexts` on the `Syllabus` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Topic_name_idx";

-- AlterTable
ALTER TABLE "Flashcard" ADD COLUMN     "subtopicReference" TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "subtopicReference" TEXT;

-- AlterTable
ALTER TABLE "Syllabus" DROP COLUMN "recommendedTexts";

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "objectives" TEXT[],
ADD COLUMN     "parentTopicId" INTEGER,
ADD COLUMN     "sectionId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendedText" (
    "id" SERIAL NOT NULL,
    "syllabusId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "year" INTEGER,
    "publisher" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecommendedText_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Section_subjectId_idx" ON "Section"("subjectId");

-- CreateIndex
CREATE INDEX "RecommendedText_syllabusId_idx" ON "RecommendedText"("syllabusId");

-- CreateIndex
CREATE INDEX "Flashcard_subtopicReference_idx" ON "Flashcard"("subtopicReference");

-- CreateIndex
CREATE INDEX "Question_subtopicReference_idx" ON "Question"("subtopicReference");

-- CreateIndex
CREATE INDEX "Syllabus_subjectId_idx" ON "Syllabus"("subjectId");

-- CreateIndex
CREATE INDEX "Topic_sectionId_idx" ON "Topic"("sectionId");

-- CreateIndex
CREATE INDEX "Topic_parentTopicId_idx" ON "Topic"("parentTopicId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedText" ADD CONSTRAINT "RecommendedText_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "Syllabus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_parentTopicId_fkey" FOREIGN KEY ("parentTopicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
