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
import { Quiz } from '../../domain/entities/quiz.entity';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/create')
  async create(
    @Body()
    body: {
      question: string;
      correctAnswerIndex: number;
      options: string[];
      contentId: string;
    },
  ) {
    return this.quizService.create(body);
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
