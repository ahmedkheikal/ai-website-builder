import { Section } from '@/types/section';

interface SectionCardProps {
  section: Section;
}

export default function SectionCard({ section }: SectionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Website Idea</h3>
        <p className="text-gray-600 italic">&ldquo;{section.idea}&rdquo;</p>
      </div>
      
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-700 mb-3">Generated Sections:</h4>
        <div className="space-y-4">
          {section.sections.map((sectionItem, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-semibold text-gray-800 mb-2">{sectionItem.title}</h5>
              <p className="text-gray-600 text-sm leading-relaxed">{sectionItem.content}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-gray-500 border-t pt-3">
        Created: {formatDate(section.createdAt)}
      </div>
    </div>
  );
} 