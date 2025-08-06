import { Controller, Post, Get, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { Section } from './section.schema';
import type { AiProvider } from './ai-provider.factory';

export class CreateSectionDto {
  idea: string;
  provider?: AiProvider;
}

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async createSection(@Body() createSectionDto: CreateSectionDto): Promise<Section> {
    try {
      if (!createSectionDto.idea || createSectionDto.idea.trim() === '') {
        throw new HttpException('Website idea is required', HttpStatus.BAD_REQUEST);
      }

      return await this.sectionsService.generateSections(
        createSectionDto.idea.trim(),
        createSectionDto.provider
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to generate sections', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllSections(): Promise<Section[]> {
    try {
      return await this.sectionsService.getAllSections();
    } catch (error) {
      throw new HttpException('Failed to fetch sections', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('models')
  async getAvailableModels(@Query('provider') provider?: AiProvider): Promise<string[]> {
    try {
      return await this.sectionsService.getAvailableModels(provider);
    } catch (error) {
      throw new HttpException('Failed to fetch available models', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('provider')
  async getDefaultProvider(): Promise<{ provider: AiProvider }> {
    try {
      const provider = this.sectionsService.getDefaultProvider();
      return { provider };
    } catch (error) {
      throw new HttpException('Failed to get default provider', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 