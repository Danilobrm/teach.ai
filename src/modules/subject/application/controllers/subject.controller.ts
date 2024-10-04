import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { Content } from '@prisma/client';
import { IContent } from 'src/modules/content/domain/entities/content.entity';
import { ContentService } from 'src/modules/content/application/services/content.service';
import { Subject } from '../../domain/entities/subject.entity';

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly contentService: ContentService,
  ) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      content: {
        title: string;
        description: string;
        prompt?: string;
        max_tokens: number;
      };
      moduleId: string;
    },
  ) {
    const content = await this.contentService.createContent(body.content);

    const subject = new Subject(content.id, body.moduleId);
    return this.subjectService.create(subject);
  }

  @Get('track/:id')
  async findByTrackId(@Param('id') id: string) {
    return this.subjectService.findByTrackId(id);
  }

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.subjectService.findById(id);
  // }

  @Get()
  async findAll() {
    return this.subjectService.findAll();
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body()
  //   body: {
  //     content: Content;
  //     moduleId?: string; // Optional: update the moduleId
  //     topics: Topic[]; // Update list of topics
  //   },
  // ) {
  //   const updatedSubject = {
  //     contentId: body.content.id,
  //     moduleId: body.moduleId,
  //     topics: body.topics,
  //   };

  //   return this.subjectService.update(id, updatedSubject);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.subjectService.delete(id);
  // }
}
