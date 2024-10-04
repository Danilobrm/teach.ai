import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { ContentService } from 'src/modules/content/application/services/content.service';
import { IQuiz } from '../../domain/entities/quiz.entity';

@Controller('quizzes')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly contentService: ContentService,
  ) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      contentId: string;
    },
  ) {
    // question: string;
    //   correctAnswerIndex: number;
    //   options: string[];
    const content = await this.contentService.findById(body.contentId);
    console.log(content);
    const quizContent = await this.contentService.openaiGenerate(`
      Crie um quiz sobre o tema ${content.title}, baseado no conteúdo
      ${content.description}, O quiz deve conter os seguintes campos json:
      - **question:** uma string que representa o título da pergunta, incluindo ${content.title}.
      - **correctAnswerIndex:** um número que representa o índice da resposta correta (0 para a primeira opção, 1 para a segunda, e assim por diante).
      - **options:** uma lista de strings que contém as opções de resposta para a pergunta.
      - **contentId:** deve ser ${body.contentId}

      O quiz deve incluir pelo menos 4 perguntas com suas respectivas opções e uma resposta correta para cada uma delas.
      não quero mais nenhum texto além do quiz, quero somente o quiz, dentro de um json de lista
      `);

    const quiz: IQuiz[] = JSON.parse(
      quizContent.replace('```json', '').replace('```', ''),
    );

    return this.quizService.create(quiz);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.quizService.findById(id);
  }

  @Get()
  async findAll() {
    return this.quizService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      question?: string;
      correctAnswerIndex?: number;
      options?: string[];
    },
  ) {
    return this.quizService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.quizService.delete(id);
  }

  // @Post('answer')
  // async answerQuiz(@Body() answer: ) {
  //   return await this.quizService.answerQuiz(answerQuizDto);
  // }
}
