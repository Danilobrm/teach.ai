import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TopicService } from '../services/topic.service';
import { Content } from 'src/modules/content/domain/entities/content.entity';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      content: Content;
      subjectId: string;
    },
  ) {
    return this.topicService.create(body);
  }

  // @Get('subject/:id')
  // async findBySubjectId(@Param('id') id: string) {
  //   return this.topicService.findBySubjectId(id);
  // }

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.topicService.findById(id);
  // }

  @Get()
  async findAll() {
    return this.topicService.findAll();
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body()
  //   body: {
  //     content: Content;
  //     subjectId: string;
  //   },
  // ) {
  //   const updatedTopic = {
  //     contentId: body.content.id,
  //     subjectId: body.subjectId,
  //   };

  //   return this.topicService.update(id, updatedTopic);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.topicService.delete(id);
  // }
}
