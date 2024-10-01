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
import { Content } from '@prisma/client';
import { ContentController } from 'src/modules/content/application/controllers/content.controller';

@Controller('studyModule')
export class StudyModuleController {
  constructor(
    private readonly studyModuleService: StudyModuleService,
    private readonly contentController: ContentController,
  ) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      content: Content;
      trackId: string;
    },
  ) {
    // const content = await this.contentController.create(body.content);
    // const studyModule = new StudyModule(content, body.trackId);

    return this.studyModuleService.create(body);
  }

  @Get('track/:id')
  async findByTrackId(@Param('id') id: string) {
    return this.studyModuleService.findByTrackId(id);
  }

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.studyModuleService.findById(id);
  // }

  // @Get()
  // async findAll() {
  //   return this.studyModuleService.findAll();
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body()
  //   body: {
  //     title: string;
  //     description: string;
  //     content: string;
  //   },
  // ) {
  //   const studyModule = new StudyModule(
  //     body.title,
  //     body.description,
  //     body.content,
  //   );
  //   return this.studyModuleService.update(id, studyModule);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.studyModuleService.delete(id);
  // }
}
