import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { StudyModuleService } from '../services/studyModule.service';
import { StudyModule } from '../../domain/entities/studyModule.entity';

@Controller('studyModule')
export class StudyModuleController {
  constructor(private readonly studyModuleService: StudyModuleService) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      title: string;
      description: string;
      trackId: string;
    },
  ) {
    const studyModule = new StudyModule(
      body.title,
      body.description,
      body.trackId,
    );

    return this.studyModuleService.create(studyModule);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.studyModuleService.findById(id);
  }

  @Get()
  async findAll() {
    return this.studyModuleService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      title: string;
      description: string;
      trackId: string;
    },
  ) {
    const studyModule = new StudyModule(
      body.title,
      body.description,
      body.trackId,
    );
    return this.studyModuleService.update(id, studyModule);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.studyModuleService.delete(id);
  }
}
