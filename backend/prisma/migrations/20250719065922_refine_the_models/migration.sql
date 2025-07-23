/*
  Warnings:

  - The values [VOCABULARY,FORMULA,PRONUNCIATION] on the enum `FlashcardType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MODERATOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `subtopicReference` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `subjects` on the `MockExam` table. All the data in the column will be lost.
  - You are about to drop the column `totalScore` on the `MockExam` table. All the data in the column will be lost.
  - The `userAnswer` column on the `MockExamQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionType` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `subtopicReference` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `subjects` on the `QuizAttempt` table. All the data in the column will be lost.
  - The `userAnswer` column on the `QuizQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `duration` on the `StudySession` table. All the data in the column will be lost.
  - You are about to drop the `Leaderboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LearningProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerformancePrediction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecommendationLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyGroupMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyStreak` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Made the column `topicId` on table `Flashcard` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `FlashcardReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MockExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MockExamQuestion` table without a default value. This is not possible if the table is not empty.
  - Made the column `topicId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `QuizQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudyPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudyTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserProgress` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuizType" AS ENUM ('PRACTICE', 'TIMED', 'ADAPTIVE');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('FULL_UTME', 'SUBJECT_SPECIFIC');

-- AlterEnum
BEGIN;
CREATE TYPE "FlashcardType_new" AS ENUM ('DEFINITION', 'CONCEPT', 'FILL_IN_THE_BLANK', 'DIAGRAM_LABELING', 'QUICK_FACT', 'MNEMONIC');
ALTER TABLE "Flashcard" ALTER COLUMN "flashcardType" TYPE "FlashcardType_new" USING ("flashcardType"::text::"FlashcardType_new");
ALTER TYPE "FlashcardType" RENAME TO "FlashcardType_old";
ALTER TYPE "FlashcardType_new" RENAME TO "FlashcardType";
DROP TYPE "FlashcardType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('STUDENT', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_userId_fkey";

-- DropForeignKey
ALTER TABLE "LearningProfile" DROP CONSTRAINT "LearningProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "PerformancePrediction" DROP CONSTRAINT "PerformancePrediction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_topicId_fkey";

-- DropForeignKey
ALTER TABLE "RecommendationLog" DROP CONSTRAINT "RecommendationLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudyGroupMember" DROP CONSTRAINT "StudyGroupMember_studyGroupId_fkey";

-- DropForeignKey
ALTER TABLE "StudyGroupMember" DROP CONSTRAINT "StudyGroupMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudyStreak" DROP CONSTRAINT "StudyStreak_userId_fkey";

-- DropIndex
DROP INDEX "Feedback_priority_idx";

-- DropIndex
DROP INDEX "Feedback_status_idx";

-- DropIndex
DROP INDEX "Feedback_type_idx";

-- DropIndex
DROP INDEX "Flashcard_subjectId_topicId_idx";

-- DropIndex
DROP INDEX "Flashcard_subtopicReference_idx";

-- DropIndex
DROP INDEX "Question_questionType_idx";

-- DropIndex
DROP INDEX "Question_subjectId_topicId_idx";

-- DropIndex
DROP INDEX "Question_subtopicReference_idx";

-- DropIndex
DROP INDEX "UserProgress_userId_topicId_idx";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "description",
DROP COLUMN "priority",
DROP COLUMN "status",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "subtopicReference",
ADD COLUMN     "mediaUrl" TEXT,
ADD COLUMN     "subtopicId" INTEGER,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "topicId" SET NOT NULL,
ALTER COLUMN "difficulty" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FlashcardReview" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "responseTimeMs" INTEGER,
ADD COLUMN     "reviewRating" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MockExam" DROP COLUMN "subjects",
DROP COLUMN "totalScore",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "examType" "ExamType",
ADD COLUMN     "questionCount" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MockExamQuestion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sectionId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "userAnswer",
ADD COLUMN     "userAnswer" JSONB;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctAnswer",
DROP COLUMN "options",
DROP COLUMN "questionType",
DROP COLUMN "subtopicReference",
ADD COLUMN     "correctOptionId" INTEGER,
ADD COLUMN     "imageId" INTEGER,
ADD COLUMN     "subtopicId" INTEGER,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "topicId" SET NOT NULL;

-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "score",
DROP COLUMN "subjects",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "questionCount" INTEGER,
ADD COLUMN     "quizType" "QuizType",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "QuizQuestion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "userAnswer",
ADD COLUMN     "userAnswer" JSONB;

-- AlterTable
ALTER TABLE "StudyPlan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StudySession" DROP COLUMN "duration",
ADD COLUMN     "subjectId" INTEGER,
ADD COLUMN     "topicId" INTEGER;

-- AlterTable
ALTER TABLE "StudyTask" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mockExamId" INTEGER,
ADD COLUMN     "quizAttemptId" INTEGER,
ADD COLUMN     "subtopicId" INTEGER,
ADD COLUMN     "topicId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avgResponseTime" DOUBLE PRECISION,
ADD COLUMN     "learningStyle" TEXT;

-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "confidenceInterval" DOUBLE PRECISION,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "predictedScore" DOUBLE PRECISION,
ADD COLUMN     "subtopicId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Leaderboard";

-- DropTable
DROP TABLE "LearningProfile";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "PerformancePrediction";

-- DropTable
DROP TABLE "RecommendationLog";

-- DropTable
DROP TABLE "StudyGroup";

-- DropTable
DROP TABLE "StudyGroupMember";

-- DropTable
DROP TABLE "StudyStreak";

-- DropEnum
DROP TYPE "QuestionType";

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER,
    "topicId" INTEGER,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizSubject" (
    "id" SERIAL NOT NULL,
    "quizAttemptId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockExamSubject" (
    "id" SERIAL NOT NULL,
    "mockExamId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MockExamSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Option_questionId_idx" ON "Option"("questionId");

-- CreateIndex
CREATE INDEX "Image_subjectId_topicId_idx" ON "Image"("subjectId", "topicId");

-- CreateIndex
CREATE INDEX "QuizSubject_quizAttemptId_subjectId_idx" ON "QuizSubject"("quizAttemptId", "subjectId");

-- CreateIndex
CREATE INDEX "MockExamSubject_mockExamId_subjectId_idx" ON "MockExamSubject"("mockExamId", "subjectId");

-- CreateIndex
CREATE INDEX "Flashcard_subjectId_topicId_subtopicId_idx" ON "Flashcard"("subjectId", "topicId", "subtopicId");

-- CreateIndex
CREATE INDEX "MockExamQuestion_sectionId_idx" ON "MockExamQuestion"("sectionId");

-- CreateIndex
CREATE INDEX "Question_subjectId_topicId_subtopicId_idx" ON "Question"("subjectId", "topicId", "subtopicId");

-- CreateIndex
CREATE INDEX "Question_imageId_idx" ON "Question"("imageId");

-- CreateIndex
CREATE INDEX "StudySession_subjectId_topicId_idx" ON "StudySession"("subjectId", "topicId");

-- CreateIndex
CREATE INDEX "StudyTask_topicId_subtopicId_idx" ON "StudyTask"("topicId", "subtopicId");

-- CreateIndex
CREATE INDEX "StudyTask_quizAttemptId_mockExamId_idx" ON "StudyTask"("quizAttemptId", "mockExamId");

-- CreateIndex
CREATE INDEX "UserProgress_userId_topicId_subtopicId_idx" ON "UserProgress"("userId", "topicId", "subtopicId");

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSubject" ADD CONSTRAINT "QuizSubject_quizAttemptId_fkey" FOREIGN KEY ("quizAttemptId") REFERENCES "QuizAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSubject" ADD CONSTRAINT "QuizSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyTask" ADD CONSTRAINT "StudyTask_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyTask" ADD CONSTRAINT "StudyTask_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyTask" ADD CONSTRAINT "StudyTask_quizAttemptId_fkey" FOREIGN KEY ("quizAttemptId") REFERENCES "QuizAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyTask" ADD CONSTRAINT "StudyTask_mockExamId_fkey" FOREIGN KEY ("mockExamId") REFERENCES "MockExam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockExamSubject" ADD CONSTRAINT "MockExamSubject_mockExamId_fkey" FOREIGN KEY ("mockExamId") REFERENCES "MockExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockExamSubject" ADD CONSTRAINT "MockExamSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockExamQuestion" ADD CONSTRAINT "MockExamQuestion_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
