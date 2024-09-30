import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { StudyTrackService } from '../services/studyTrack.service';
import { Response } from 'express';

@Controller('studyTrack')
export class StudyTrackController {
  constructor(private readonly studyTrackService: StudyTrackService) {}

  @Post('create')
  async create(
    @Body() body: { title: string; description?: string | undefined },
    @Res() res: Response,
  ): Promise<Response<{ message: string; status: number }>> {
    const studyTrack = await this.studyTrackService.createStudyTrack(
      body.title,
      body.description,
    );

    return res.json({
      statusCode: res.statusCode,
      message: 'Trilha de estudo criada com sucesso!',
      studyTrack,
    });
  }

  @Get('list')
  async findAll(
    @Res() res: Response,
  ): Promise<Response<{ studyTracks: any[] }>> {
    const studyTracks = await this.studyTrackService.findAllStudyTracks();

    return res.json({
      statusCode: res.statusCode,
      studyTracks,
    });
  }
}
