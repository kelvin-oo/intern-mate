"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  ClipboardList, 
  Clock, 
  Filter, 
  LineChart, 
  Mail, 
  Search, 
  Settings, 
  Target 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: ClipboardList,
    title: "Application Tracking",
    description: "Keep track of all your internship applications in one place. Monitor status, deadlines, and follow-ups effortlessly.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Never miss a deadline or update. Get timely reminders for applications, interviews, and important follow-ups.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Visualize your application progress with detailed analytics. Understand your success rate and improve your strategy.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Quickly find any application or company. Filter by status, date, or any custom tags you've created.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Calendar,
    title: "Timeline View",
    description: "See your entire internship journey on an interactive timeline. Plan ahead and stay organized.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Settings,
    title: "Customizable Workflow",
    description: "Adapt the platform to your needs. Create custom statuses, tags, and tracking fields.",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const benefits = [
  {
    title: "Save Time",
    description: "Automate tracking and spend more time on what matters - preparing for interviews and improving your skills.",
  },
  {
    title: "Stay Organized",
    description: "No more scattered spreadsheets or lost emails. Everything you need is in one place.",
  },
  {
    title: "Improve Success Rate",
    description: "Learn from analytics and insights to optimize your application strategy.",
  },
  {
    title: "Reduce Stress",
    description: "Feel confident knowing you're on top of every application and deadline.",
  },
];

export default function About() {
  return (
    <main className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] -z-10" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
                Streamline Your
              </span>
              <br />
              Internship Search
            </h1>
            <p className="text-xl text-muted-foreground">
              InternMate helps you manage your internship applications efficiently, 
              so you can focus on landing your dream role.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground mt-2">Everything you need to succeed in your internship search</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative p-6 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/50 hover:border-border/80 transition-colors duration-300">
                    <div className={`mb-5 inline-block rounded-xl p-3 bg-gradient-to-r ${feature.gradient} bg-opacity-10`}>
                      <Icon className={`h-6 w-6 text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text`} />
                    </div>

                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-t">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Why Choose InternMate?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-primary/30 rounded-3xl blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-10 rounded-3xl" />
                <div className="absolute inset-6 bg-background/80 backdrop-blur-xl rounded-2xl border border-white/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Join thousands of students who are already using InternMate to land their dream internships.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">Start Tracking Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 