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
import { ContentController } from 'src/modules/content/application/controllers/content.controller';

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly contentController: ContentController,
  ) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      content: Content;
      moduleId?: string; // Optional moduleId association
    },
  ) {
    return this.subjectService.create(body);
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
