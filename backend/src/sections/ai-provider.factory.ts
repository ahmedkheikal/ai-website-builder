import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';
import { OllamaService } from './ollama.service';

export interface SectionItem {
  title: string;
  content: string;
}

export type AiProvider = 'openai' | 'ollama';

@Injectable()
export class AiProviderFactory {
  constructor(
    private configService: ConfigService,
    private openaiService: AiService,
    private ollamaService: OllamaService,
  ) {}

  getProvider(provider: AiProvider = 'openai'): AiService | OllamaService {
    switch (provider) {
      case 'openai':
        return this.openaiService;
      case 'ollama':
        return this.ollamaService;
      default:
        return this.openaiService;
    }
  }

  getDefaultProvider(): AiProvider {
    return (this.configService.get<string>('AI_PROVIDER') as AiProvider) || 'openai';
  }

  async generateSections(idea: string, provider?: AiProvider): Promise<SectionItem[]> {
    const selectedProvider = provider || this.getDefaultProvider();
    const aiService = this.getProvider(selectedProvider);
    
    return await aiService.generateSections(idea);
  }

  async getAvailableModels(provider?: AiProvider): Promise<string[]> {
    const selectedProvider = provider || this.getDefaultProvider();
    
    if (selectedProvider === 'ollama') {
      return await this.ollamaService.getAvailableModels();
    }
    
    // OpenAI doesn't have a simple way to list models via API
    return ['gpt-4', 'gpt-3.5-turbo'];
  }
} 