import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './section.schema';
import { AiProviderFactory, AiProvider } from './ai-provider.factory';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    private aiProviderFactory: AiProviderFactory,
  ) {}

  async generateSections(idea: string, provider?: AiProvider): Promise<Section> {
    try {
      // Generate sections using the selected AI provider
      const sections = await this.aiProviderFactory.generateSections(idea, provider);
      
      // Create and save the section to MongoDB
      const newSection = new this.sectionModel({
        idea,
        sections,
        createdAt: new Date(),
      });

      return await newSection.save();
    } catch (error) {
      console.error('Error in generateSections:', error);
      throw error;
    }
  }

  async getAllSections(): Promise<Section[]> {
    return await this.sectionModel.find().sort({ createdAt: -1 }).exec();
  }

  async getAvailableModels(provider?: AiProvider): Promise<string[]> {
    return await this.aiProviderFactory.getAvailableModels(provider);
  }

  getDefaultProvider(): AiProvider {
    return this.aiProviderFactory.getDefaultProvider();
  }
} 