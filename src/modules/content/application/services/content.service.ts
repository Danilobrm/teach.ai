import { Injectable } from '@nestjs/common';
import { IContent } from '../../domain/entities/content.entity';
import { ContentRepositoryService } from '../../infrastructure/repositories/content-repository/content-repository.service';
import OpenAI from 'openai';
import { Content } from '@prisma/client';

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepositoryService) {}

  async createContent(content: {
    title: string;
    description?: string;
    prompt?: string;
    max_tokens?: number;
  }): Promise<Content> {
    //cria content

    if (content.prompt) {
      content.description = await this.openaiGenerate(
        content.prompt,
        content.max_tokens,
      );
    }

    // const content = generatedContent.choices[0].message.content;
    console.log(content.description)

    return this.contentRepository.create(content);
  }

  async createPrompt(topic: { prompt: string; max_tokens: number }) {
    return await this.openaiGenerate(topic.prompt, topic.max_tokens);
  }

  async openaiGenerate(prompt: string, max_tokens?: number) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const generatedContent = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: max_tokens,
      // "Gere um conteúdo detalhado para estudos sobre o tópico 'Herança' em programação orientada a objetos. O tempo de estudo destinado ao tópico é de 20 minutos. Você pode incluir exemplos ou não, conforme achar necessário. O conteúdo deve ser explicado de forma clara e objetiva, com o objetivo de ajudar quem está estudando a entender os conceitos principais e avançados sobre herança. O resultado deve ser retornado dentro de um objeto no seguinte formato: { 'title': 'Título do tópico', 'description': 'Conteúdo de estudo aprofundado' }. Certifique-se de que o conteúdo seja adequado ao tempo de estudo.",

      //   max_tokens: 300,
    });

    return generatedContent.choices[0].message.content;
  }

  // async createStudyPlan(theme: string) {
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // const generatedContent = await openai.chat.completions.create({
  //   model: 'gpt-4o-mini',
  //   messages: [
  //     { role: 'system', content: 'You are a helpful assistant.' },
  //     {
  //       role: 'user',
  //       content: `
  //         você é profissional na área de desenvolvimento, irá ajudar na construção de uma apostila.
  //         instrução 1: considere que você irá escrever um artigo acadêmico.
  //         passo 1: considere o objeto com title: string, description: string.
  //         passo 2: escolha um nome para dentro do title considerando o nome do tópico, sendo ele ${theme}, nome curto, poucas palavras.
  //         passo 3: coloque dentro do description uma descrição aprofundada sobre ${theme}, que caiba dentro de 5 minutos de estudo.
  //         Exemplo de saída: { title: "Exemplo", description: "Esta é uma descrição de exemplo." }
  //       `,
  //     },
  //   ],
  //   max_tokens: 300,
  // });

  // const content = generatedContent.choices[0].message.content;

  // console.log(new Object(content));
  // return this.contentRepository.create(content);
  // }

  // async findByTrackId(trackId: string): Promise<Content[]> {
  //   return this.contentRepository.findByTrackId(trackId);
  // }

  // async findByModuleId(moduleId: string): Promise<Content[]> {
  //   return this.contentRepository.findByModuleId(moduleId);
  // }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.findAll();
  }

  async findById(contentId: string): Promise<Content> {
    return this.contentRepository.findById(contentId);
  }

  async delete(id: string): Promise<void> {
    this.contentRepository.delete(id);
  }
}
