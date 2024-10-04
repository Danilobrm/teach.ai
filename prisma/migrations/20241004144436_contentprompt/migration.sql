-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_promptId_fkey";

-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "promptId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "OpenaiPrompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
