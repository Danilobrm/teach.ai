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

@Controller('studyPlan') // Adjusted the route to reflect study plans
export class StudyPlanController {
  constructor(private readonly studyPlanService: StudyPlanService) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      userId: string; // User ID
      moduleId: string; // Module ID
      studyTime: number; // Study duration in minutes
      day: number; // Day of the study routine
    },
  ) {
    const studyPlan = new StudyPlan(
      body.userId,
      body.moduleId,
      body.studyTime,
      body.day,
    );

    return this.studyPlanService.create(studyPlan);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.studyPlanService.findById(id);
  }

  @Get()
  async findAll() {
    return this.studyPlanService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      userId: string; // User ID
      moduleId: string; // Module ID
      studyTime: number; // Study duration in minutes
      day: number; // Day of the study routine
    },
  ) {
    const studyPlan = new StudyPlan(
      body.userId,
      body.moduleId,
      body.studyTime,
      body.day,
    );
    return this.studyPlanService.update(id, studyPlan);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.studyPlanService.delete(id);
  }

  @Get('listAll/:id')
  async findStudyPlansByUserId(@Param('id') userId: string) {
    return this.studyPlanService.findStudyPlansByUserId(userId);
  }
}
