'use client';

import { useState, useEffect } from 'react';
import { Section, AiProvider } from '@/types/section';
import { ApiService } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import SectionCard from '@/components/SectionCard';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<AiProvider>('openai');
  const [defaultProvider, setDefaultProvider] = useState<AiProvider>('openai');

  useEffect(() => {
    fetchSections();
    fetchDefaultProvider();
  }, []);

  const fetchSections = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await ApiService.getAllSections();
      setSections(data);
    } catch (err) {
      setError('Failed to load sections. Please try again.');
      console.error('Error fetching sections:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDefaultProvider = async () => {
    try {
      const { provider } = await ApiService.getDefaultProvider();
      setDefaultProvider(provider);
      setSelectedProvider(provider);
    } catch (err) {
      console.error('Error fetching default provider:', err);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
      setError('Please enter a website idea');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const newSection = await ApiService.createSection({ 
        idea: idea.trim(),
        provider: selectedProvider
      });
      setSections([newSection, ...sections]);
      setIdea('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate sections');
      console.error('Error creating section:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Website Sections Generator
          </h1>
          <p className="text-lg text-gray-600">
            Enter your website idea and get AI-generated section suggestions
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                Website Idea
              </label>
              <input
                type="text"
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g., Landing page for a bakery"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                AI Provider
              </label>
              <select
                id="provider"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as AiProvider)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                disabled={isSubmitting}
              >
                <option value="openai">OpenAI GPT-4</option>
                <option value="ollama">Ollama (Local)</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                {selectedProvider === 'openai' 
                  ? 'Uses OpenAI GPT-4 for high-quality content generation'
                  : 'Uses local Ollama models for privacy and cost-effectiveness'
                }
              </p>
            </div>
            
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting || !idea.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Sections...
                </div>
              ) : (
                'Generate Sections'
              )}
            </button>
          </form>
        </div>

        {/* Sections Display */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Generated Sections
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : sections.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No sections generated yet. Try submitting a website idea above!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <SectionCard key={section._id} section={section} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
