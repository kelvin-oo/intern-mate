"use client";

import { ArrowRight, Briefcase, CheckCircle2, Sparkles, Calendar, Clock, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  "Track Multiple Applications",
  "Smart Deadline Reminders",
  "Real-time Progress Analytics",
];

const applications = [
  {
    company: "Google",
    role: "Software Engineering Intern",
    status: "Interview",
    date: "Mar 15",
    isNew: true,
  },
  {
    company: "Microsoft",
    role: "Product Management Intern",
    status: "Applied",
    date: "Mar 14",
    isNew: false,
  },
  {
    company: "Amazon",
    role: "Frontend Developer Intern",
    status: "Completed",
    date: "Mar 12",
    isNew: false,
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] -z-10" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="container px-4 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-left space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Your Internship Journey Starts Here</span>
              </motion.div>

              {/* Main Title */}
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-bold leading-tight lg:text-6xl"
                >
                  <span className="bg-gradient-to-r from-foreground to-foreground/70 text-transparent bg-clip-text">
                    Transform Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
                    Internship Hunt
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground max-w-xl"
                >
                  Track applications, deadlines, and progress all in one place. 
                  Take control of your future with our intelligent tracking system.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="group" asChild>
                  <Link href="/dashboard" className="gap-2">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group" asChild>
                  <Link href="/about" className="gap-2">
                    Learn More
                    <Briefcase className="h-4 w-4 transition-all group-hover:scale-110" />
                  </Link>
                </Button>
              </motion.div>

              {/* Features List */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8 border-t border-border/50"
              >
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Content - Application Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                {/* Main decorative card */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-primary/30 rounded-3xl blur-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-10 rounded-3xl" />
                  <div className="absolute inset-6 bg-background/80 backdrop-blur-xl rounded-2xl border border-white/10">
                    {/* Card Content */}
                    <div className="p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Recent Applications</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Last 7 days</span>
                        </div>
                      </div>

                      {/* Applications List */}
                      <div className="space-y-4">
                        {applications.map((app, index) => (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            key={index}
                            className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-border/80 transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{app.company}</span>
                                  {app.isNew && (
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                                      New
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {app.role}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {app.date}
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              {app.status === "Completed" ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : app.status === "Interview" ? (
                                <Star className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-primary/50" />
                              )}
                              <span className="text-sm font-medium">{app.status}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                        {[
                          { label: "Applied", value: "12" },
                          { label: "In Progress", value: "5" },
                          { label: "Completed", value: "3" },
                        ].map((stat, index) => (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            key={index}
                            className="text-center"
                          >
                            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                              {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-12 right-12 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </section>
  );
}

export default Hero; 