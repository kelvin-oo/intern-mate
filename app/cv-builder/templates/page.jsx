"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const templates = [
  {
    id: 'preview1',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech and creative roles',
    image: '/template-picture1.svg',
  },
  {
    id: 'preview2',
    name: 'Classic Executive',
    description: 'Traditional layout ideal for corporate and management positions',
    image: '/template-picture1.svg',
  },
  {
    id: 'preview3',
    name: 'Creative Portfolio',
    description: 'Dynamic design for creative professionals and designers',
    image: '/template-picture1.svg',
  },
];

export default function TemplateSelectionPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const handleContinue = () => {
    router.push(`/cv-builder/${selectedTemplate.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Choose Your Template</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select from our professionally designed templates to create your perfect CV. 
          Each template is optimized for ATS and crafted to highlight your strengths.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={template.image}
                alt={template.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-muted-foreground mb-4">
                {template.description}
              </p>
              <Button 
                className="w-full"
                onClick={() => handleTemplateSelect(template)}
              >
                Choose Template
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Great Choice!</DialogTitle>
            <DialogDescription>
              {selectedTemplate && (
                <>
                  You&apos;ve selected the {selectedTemplate.name} template. 
                  {selectedTemplate.description}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {selectedTemplate && (
              <div className="aspect-[3/4] relative w-full max-h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={selectedTemplate.image}
                  alt={selectedTemplate.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Change Template
            </Button>
            <Button onClick={handleContinue}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 