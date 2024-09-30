import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  Delete,
} from '@nestjs/common';
import { GeneratedContentService } from '../services/generatedContent.service';
import { Response } from 'express';
// import OpenAI from 'openai';

@Controller('generatedContent')
export class GeneratedContentController {
  constructor(
    private readonly generatedContentService: GeneratedContentService,
  ) {}

  @Post('create')
  async create(
    @Body()
    body: {
      title: string;
      description?: string;
      content: string;
      moduleId?: string;
      trackId?: string;
    },
    @Res() res: Response,
  ) {
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const generatedContent = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [
    //     { role: 'system', content: 'You are a helpful assistant.' },
    //     {
    //       role: 'user',
    //       content: body.content,
    //     },
    //   ],
    // });

    const generatedContent =
      await this.generatedContentService.createGeneratedContent(body);

    return res.json({
      statusCode: res.statusCode,
      message: 'Conteúdo gerado criado com sucesso!',
      generatedContent,
    });
  }

  @Get('track/:id')
  async findByTrackId(@Param('id') id: string) {
    return this.generatedContentService.findByTrackId(id);
  }

  @Get('module/:id')
  async findByModuleId(@Param('id') id: string) {
    return this.generatedContentService.findByModuleId(id);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const contents = await this.generatedContentService.findAll();
    return res.json(contents);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.generatedContentService.delete(id);
    return res.json({
      statusCode: res.statusCode,
      message: 'Conteúdo apagado com sucesso!',
    });
  }
}
