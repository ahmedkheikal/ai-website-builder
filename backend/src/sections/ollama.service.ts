import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SectionItem {
  title: string;
  content: string;
}

@Injectable()
export class OllamaService {
  private ollamaUrl: string;

  constructor(private configService: ConfigService) {
    this.ollamaUrl = this.configService.get<string>('OLLAMA_URL') || 'http://localhost:11434';
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

      const model = this.configService.get<string>('OLLAMA_MODEL') || 'llama3.2:3b';

      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 1000,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.response;

      if (!aiResponse) {
        throw new Error('No response from Ollama service');
      }

      // Try to extract JSON from the response
      let sections: SectionItem[];
      try {
        // Look for JSON array in the response
        const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          sections = JSON.parse(jsonMatch[0]);
        } else {
          // If no JSON array found, try to parse the entire response
          sections = JSON.parse(aiResponse);
        }
      } catch (parseError) {
        console.error('Failed to parse Ollama response as JSON:', aiResponse);
        throw new Error('Invalid JSON response from Ollama service');
      }

      // Validate the response structure
      if (!Array.isArray(sections) || sections.length !== 3) {
        throw new Error('Invalid response format from Ollama service');
      }

      // Validate each section has title and content
      sections.forEach((section, index) => {
        if (!section.title || !section.content) {
          throw new Error(`Invalid section structure at index ${index}`);
        }
      });

      return sections;
    } catch (error) {
      console.error('Error generating sections with Ollama:', error);
      throw new Error('Failed to generate sections with Ollama service');
    }
  }

  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.ollamaUrl}/api/tags`);
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.models?.map((model: any) => model.name) || [];
    } catch (error) {
      console.error('Error fetching Ollama models:', error);
      return [];
    }
  }
} 