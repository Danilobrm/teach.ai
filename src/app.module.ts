import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudyTrackModule } from './modules/studyTrack/studyTrack.module';
import { GeneratedContentModule } from './modules/generatedContent/generatedContent.module';
import { StudyModuleModule } from './modules/studyModule/studyModule.module';
import { StudyPlanModule } from './modules/studyPlan/studyPlan.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    StudyTrackModule,
    StudyModuleModule,
    GeneratedContentModule,
    StudyPlanModule,
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
