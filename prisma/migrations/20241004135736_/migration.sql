-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dailyStudyTime" INTEGER NOT NULL,
    "studyTrackId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlanPerDay" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StudyPlanPerDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyTrack" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "StudyTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenaiPrompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "OpenaiPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyModule" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "StudyModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "correctAnswerIndex" INTEGER NOT NULL,
    "options" TEXT[],
    "contentId" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "studyTime" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "StudyPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuizProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "UserQuizProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudyPlanToStudyPlanPerDay" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_StudyPlanToStudyPlanPerDay_AB_unique" ON "_StudyPlanToStudyPlanPerDay"("A", "B");

-- CreateIndex
CREATE INDEX "_StudyPlanToStudyPlanPerDay_B_index" ON "_StudyPlanToStudyPlanPerDay"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_studyTrackId_fkey" FOREIGN KEY ("studyTrackId") REFERENCES "StudyTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanPerDay" ADD CONSTRAINT "StudyPlanPerDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "OpenaiPrompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyModule" ADD CONSTRAINT "StudyModule_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "StudyTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyModule" ADD CONSTRAINT "StudyModule_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "StudyModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "StudyModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizProgress" ADD CONSTRAINT "UserQuizProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizProgress" ADD CONSTRAINT "UserQuizProgress_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudyPlanToStudyPlanPerDay" ADD CONSTRAINT "_StudyPlanToStudyPlanPerDay_A_fkey" FOREIGN KEY ("A") REFERENCES "StudyPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudyPlanToStudyPlanPerDay" ADD CONSTRAINT "_StudyPlanToStudyPlanPerDay_B_fkey" FOREIGN KEY ("B") REFERENCES "StudyPlanPerDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
