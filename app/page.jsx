import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Briefcase, ArrowRight, CheckCircle, Clock, Users } from 'lucide-react';
import { InternshipStories } from "@/components/sections/internship-stories";
import WhyChoose from '@/components/sections/why-choose';
import { Hero } from '@/components/sections/hero';
export default function Home() {
  return (
    <main>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        <Hero />
       <WhyChoose />
      </div>
      <InternshipStories />
    </main>
  );
}