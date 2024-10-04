import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { StudyPlanService } from '../services/studyPlan.service'; // Adjust service import if needed
import { StudyPlan } from '../../domain/entities/studyPlan.entity'; // Make sure this imports the correct entity
import OpenAI from 'openai';
import { UserRepositoryService } from 'src/modules/user/infrastructure/repositories/user-repository/user-repository.service';

@Controller('studyPlan') // Adjusted the route to reflect study plans
export class StudyPlanController {
  constructor(
    private readonly studyPlanService: StudyPlanService,
    private readonly studyRepositoryService: UserRepositoryService,
  ) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      userId: string; // User ID
      dailyStudyTime: number; // Tempo disponível para estudo por dia, em minutos
      weekDays: boolean[];
      modulesAmount: number; // Quantidade de módulos para o estudo
    },
  ) {
    const testDate = 2; // Definindo uma data para o teste
    const daysLeft =
      new Date(new Date().setDate(testDate)).getDate() - new Date().getDate(); // Calculando dias restantes até o teste

    const timePerModule = body.dailyStudyTime / body.modulesAmount;

    const user = await this.studyRepositoryService.getUserById(body.userId);
    const modules = user.studyTrack.modules.map((module) => module.id);

    const studyDays = body.weekDays
      .map((day, index) => (day ? index : null))
      .filter((index) => index !== null);

    const studyPlanPerDay = [];
    let moduleIndex = 0;

    // Loop through the study days
    studyDays.forEach((day) => {
      studyPlanPerDay[day] = [];

      // Distribute the modules to be studied evenly across the available days
      let remainingDailyTime = body.dailyStudyTime;

      // Continue assigning modules to the day until the time is filled
      while (remainingDailyTime > 0) {
        if (!modules[moduleIndex]) moduleIndex = 0; // Reset module index when we run out of modules

        const studyTimeForModule = Math.min(timePerModule, remainingDailyTime);
        studyPlanPerDay[day].push({
          userId: body.userId,
          moduleId: modules[moduleIndex],
          studyTime: studyTimeForModule, // Assign time per module or remaining time
          day: day,
        });

        remainingDailyTime -= studyTimeForModule; // Reduce the remaining time
        moduleIndex++;
      }
    });

    return studyPlanPerDay;
    // return this.studyPlanService.create(studyPlanPerDay.filter((day) => day));
  }

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.studyPlanService.findById(id);
  // }

  // @Get()
  // async findAll() {
  //   return this.studyPlanService.findAll();
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body()
  //   body: {
  //     userId: string; // User ID
  //     moduleId: string; // Module ID
  //     studyTime: number; // Study duration in minutes
  //     day: number; // Day of the study routine
  //   },
  // ) {
  //   const studyPlan = new StudyPlan(
  //     body.userId,
  //     body.moduleId,
  //     body.studyTime,
  //     body.day,
  //   );
  //   return this.studyPlanService.update(id, studyPlan);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.studyPlanService.delete(id);
  // }

  // @Get('listAll/:id')
  // async findStudyPlansByUserId(@Param('id') userId: string) {
  //   return this.studyPlanService.findStudyPlansByUserId(userId);
  // }
}

// {
//   "userId": "9eec2963-4f65-40b0-9193-0b28f71bbea8",
//   "moduleId": "85005371-aede-46f2-a79e-6123d156621f",
//   "studyTime": 15,
//   "day": 1
// }
