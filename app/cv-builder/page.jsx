"use client";

import Link from 'next/link';
import { FileText, Pencil, Brain, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function CVBuilderPage() {
  const router = useRouter();

  const handleOptionClick = (path) => {
    router.push(`/cv-builder/${path}`);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="text-center py-6 px-4 md:py-8">
        <h1 className="text-4xl font-bold mb-3">Build Your Perfect CV</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose a method to create your CV. Whether you need a quick template, 
          full customization, or AI assistance, we've got you covered.
        </p>
      </div>

      {/* Options Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Template Option */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <FileText className="h-12 w-12 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold mb-3">
                Try Our Well-Crafted Template
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Fill out a simple form and get a professionally designed CV instantly.
              </p>
              <Button 
                className="w-full"
                onClick={() => handleOptionClick('templates')}
              >
                Start with a Template
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Custom Option */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Pencil className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold mb-3">
                Create Your Own CV
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Customize your CV from scratch using our text editor.
              </p>
              <Button 
                className="w-full"
                onClick={() => handleOptionClick('custom')}
              >
                Start Editing
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* AI Option */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Brain className="h-12 w-12 text-purple-500" />
              </div>
              <h2 className="text-xl font-semibold mb-3">
                Create Your CV with AI
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Let AI create a personalized CV for you based on your input.
              </p>
              <Button 
                className="w-full"
                onClick={() => handleOptionClick('ai')}
              >
                Generate with AI
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="py-8 px-4 text-center">
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <Link 
            href="/cv-tips" 
            className="hover:text-gray-900 transition-colors"
          >
            CV Tips
          </Link>
          <Link 
            href="/faqs" 
            className="hover:text-gray-900 transition-colors"
          >
            FAQs
          </Link>
          <Link 
            href="/feedback" 
            className="hover:text-gray-900 transition-colors"
          >
            Send Feedback
          </Link>
        </div>
      </footer>
    </div>
  );
} 