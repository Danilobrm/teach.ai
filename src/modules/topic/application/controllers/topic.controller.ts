import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { TopicService } from '../services/topic.service';
import { ContentService } from 'src/modules/content/application/services/content.service';
import { Response } from 'express';
import { Topic } from '../../domain/entities/topic.entity';
import { IContent } from 'src/modules/content/domain/entities/content.entity';

@Controller('topic')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly contentService: ContentService,
  ) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      subjectId: string;
      subjectTitle: string;
      prompt: string;
      max_tokens: number;
    },
  ) {
    // redis aqui para procurar no cache se ja tem topico

    //criar prompt
    const prompt = await this.contentService.createPrompt({
      prompt: body.prompt,
      max_tokens: body.max_tokens,
    });

    //chamar openai para criar o conteúdo do tópico
    const content = await this.contentService.createContent({
      title: body.subjectTitle,
      max_tokens: body.max_tokens,
      prompt: prompt,
    });

    // const contentData = new IContent(
    //   body.content.title,
    //   body.content.description,
    //   body.content.prompt,
    // );

    // const topic = new Topic(body.subjectId, content.id);
    // console.log(topic);
    return this.topicService.create({
      contentId: content.id,
      subjectId: body.subjectId,
    });
  }

  // @Get('subject/:id')
  // async findBySubjectId(@Param('id') id: string) {
  //   // redis aqui para procurar no cache topicos por assunto
  //   // return this.topicService.findBySubjectId(id);
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
