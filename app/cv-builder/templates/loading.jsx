import { Card } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
            <div className="p-6">
              <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 