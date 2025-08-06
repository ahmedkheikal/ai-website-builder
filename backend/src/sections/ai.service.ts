import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface SectionItem {
  title: string;
  content: string;
}

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateSections(idea: string): Promise<SectionItem[]> {
    try {
      const prompt = `Given a website idea: "${idea}", generate three website sections: Hero, About, and Contact. 
      
      For each section, provide:
      - A compelling title
      - Approximately 150 words of engaging, professional content that matches the website's purpose
      
      Return the response as a JSON array with this exact format:
      [
        {
          "title": "Hero Section Title",
          "content": "Hero section content (around 150 words)..."
        },
        {
          "title": "About Section Title", 
          "content": "About section content (around 150 words)..."
        },
        {
          "title": "Contact Section Title",
          "content": "Contact section content (around 150 words)..."
        }
      ]
      
      Make the content engaging, professional, and tailored to the specific website idea.`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional web content writer. Generate engaging, professional website sections that are tailored to the specific website idea provided.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('No response from AI service');
      }

      // Parse the JSON response
      const sections = JSON.parse(response);
      
      // Validate the response structure
      if (!Array.isArray(sections) || sections.length !== 3) {
        throw new Error('Invalid response format from AI service');
      }

      // Validate each section has title and content
      sections.forEach((section, index) => {
        if (!section.title || !section.content) {
          throw new Error(`Invalid section structure at index ${index}`);
        }
      });

      return sections;
    } catch (error) {
      console.error('Error generating sections with AI:', error);
      throw new Error('Failed to generate sections with AI service');
    }
  }
} 