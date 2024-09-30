/*
  Warnings:

  - You are about to drop the column `studyTime` on the `StudyModule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GeneratedContent" DROP CONSTRAINT "GeneratedContent_trackId_fkey";

-- AlterTable
ALTER TABLE "StudyModule" DROP COLUMN "studyTime";
