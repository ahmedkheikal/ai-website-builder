import { Section, CreateSectionRequest, AiProvider } from '@/types/section';

const API_BASE_URL = 'http://localhost:3001';

export class ApiService {
  static async createSection(data: CreateSectionRequest): Promise<Section> {
    const response = await fetch(`${API_BASE_URL}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create section');
    }

    return response.json();
  }

  static async getAllSections(): Promise<Section[]> {
    const response = await fetch(`${API_BASE_URL}/sections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }

    return response.json();
  }

  static async getAvailableModels(provider?: AiProvider): Promise<string[]> {
    const url = provider 
      ? `${API_BASE_URL}/sections/models?provider=${provider}`
      : `${API_BASE_URL}/sections/models`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available models');
    }

    return response.json();
  }

  static async getDefaultProvider(): Promise<{ provider: AiProvider }> {
    const response = await fetch(`${API_BASE_URL}/sections/provider`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch default provider');
    }

    return response.json();
  }
} 