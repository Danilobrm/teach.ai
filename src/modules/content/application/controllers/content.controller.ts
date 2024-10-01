import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  Delete,
} from '@nestjs/common';
import { ContentService } from '../services/content.service';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
// import OpenAI from 'openai';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  async create(
    @Body()
    body: {
      title: string;
      description: string;
    },
  ) {
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const content = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [
    //     { role: 'system', content: 'You are a helpful assistant.' },
    //     {
    //       role: 'user',
    //       content: body.content,
    //     },
    //   ],
    // });

    const content = await this.contentService.createContent(body);
    return content;
  }

  // @Get('track/:id')
  // async findByTrackId(@Param('id') id: string) {
  //   return this.contentService.findByTrackId(id);
  // }

  // @Get('module/:id')
  // async findByModuleId(@Param('id') id: string) {
  //   return this.contentService.findByModuleId(id);
  // }

  @Get()
  async findAll(@Res() res: Response) {
    const contents = await this.contentService.findAll();
    return res.json(contents);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string, @Res() res: Response) {
  //   await this.contentService.delete(id);
  //   return res.json({
  //     statusCode: res.statusCode,
  //     message: 'Conteúdo apagado com sucesso!',
  //   });
  // }
}
