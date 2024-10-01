import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudyTrackModule } from './modules/studyTrack/studyTrack.module';
import { StudyModuleModule } from './modules/studyModule/studyModule.module';
import { StudyPlanModule } from './modules/studyPlan/studyPlan.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { ContentModule } from './modules/content/content.module';
import { SubjectModule } from './modules/subject/subject.module';
import { TopicModule } from './modules/topic/topic.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    StudyTrackModule,
    StudyModuleModule,
    StudyPlanModule,
    QuizModule,
    ContentModule,
    SubjectModule,
    TopicModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
