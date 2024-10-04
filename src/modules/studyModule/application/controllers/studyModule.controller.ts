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
import { IStudyModule } from '../../domain/entities/studyModule.entity';
import { Content, StudyModule } from '@prisma/client';
import { IContent } from 'src/modules/content/domain/entities/content.entity';
import { ContentService } from 'src/modules/content/application/services/content.service';

@Controller('studyModule')
export class StudyModuleController {
  constructor(
    private readonly studyModuleService: StudyModuleService,
    private readonly contentService: ContentService,
  ) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      content: {
        title: string;
        description?: string;
        prompt?: string;
        max_tokens?: number;
      };
      trackId: string;
    },
  ): Promise<StudyModule> {
    // const content = await this.contentController.create(body.content);
    // const studyModule = new StudyModule(content, body.trackId);

    const content = await this.contentService.createContent(body.content);

    const studyModule = new IStudyModule(content.id, body.trackId);

    return this.studyModuleService.create(studyModule);
  }

  // @Get('track/:id')
  // async findByTrackId(@Param('id') id: string) {
  //   return this.studyModuleService.findByTrackId(id);
  // }

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.studyModuleService.findById(id);
  // }

  @Get()
  async findAll() {
    return this.studyModuleService.findAll();
  }

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
