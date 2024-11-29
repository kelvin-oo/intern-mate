"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";


const stories = [
  {
    name: "Sarah Johnson",
    course: "Computer Science",
    company: "Microsoft",
    howTheyGotIn: "Applied through the company website and completed three rounds of technical interviews",
    advice: "Start preparing for technical interviews early and contribute to open source projects to stand out.",
  },
  {
    name: "David Chen",
    course: "Software Engineering",
    company: "Google",
    howTheyGotIn: "Got referred by a university alumnus and went through their internship process",
    advice: "Network with alumni and don't be afraid to reach out. Practice your problem-solving skills daily.",
  },
  {
    name: "Aisha Patel",
    course: "Information Technology",
    company: "IBM",
    howTheyGotIn: "Connected with recruiters at a career fair and followed up consistently",
    advice: "Attend every career fair you can and make meaningful connections. Your soft skills matter as much as technical skills.",
  },
];

export function InternshipStories() {
  return (
    <section className="py-16">
      <div className="container">
        <motion.div 
          className="space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Learn from Their Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how successful interns navigated their way into top companies and what advice they have for aspiring interns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="absolute inset-0 p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg opacity-70">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/95 dark:from-black/90 dark:to-black/95" />
                </div>

                <CardContent className="relative p-5 space-y-4">
                  <div className="relative p-4 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20 dark:border-white/10">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-xl leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                          {story.name}
                        </h3>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600 whitespace-nowrap text-xs px-2.5 py-0.5">
                          {story.course}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Interned at</span>
                        <span className="text-sm font-medium bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                          {story.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 transform transition-all duration-300 group-hover:translate-x-1 border border-indigo-100 dark:border-indigo-900/50">
                      <h4 className="text-sm font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                        How they got the internship
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {story.howTheyGotIn}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 transform transition-all duration-300 group-hover:translate-x-1 border border-purple-100 dark:border-purple-900/50">
                      <h4 className="text-sm font-semibold mb-2 text-purple-700 dark:text-purple-300">
                        Advice for future interns
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {story.advice}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-2xl transform -translate-x-8 translate-y-8 group-hover:-translate-x-10 group-hover:translate-y-10 transition-transform duration-700" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InternshipStories; 