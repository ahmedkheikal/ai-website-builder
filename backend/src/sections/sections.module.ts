import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { AiService } from './ai.service';
import { OllamaService } from './ollama.service';
import { AiProviderFactory } from './ai-provider.factory';
import { Section, SectionSchema } from './section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
    ConfigModule,
  ],
  controllers: [SectionsController],
  providers: [SectionsService, AiService, OllamaService, AiProviderFactory],
})
export class SectionsModule {} 