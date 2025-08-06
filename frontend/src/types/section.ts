export interface SectionItem {
  title: string;
  content: string;
}

export interface Section {
  _id: string;
  idea: string;
  sections: SectionItem[];
  createdAt: string;
}

export interface CreateSectionRequest {
  idea: string;
  provider?: 'openai' | 'ollama';
}

export type AiProvider = 'openai' | 'ollama';