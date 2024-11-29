"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Bell,
  BarChart2,
  ClipboardList,
  Target,
  CalendarRange,
  LucideIcon
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: Boxes,
    title: "Centralized Application Tracking",
    description:
      "Keep all your internship applications organized in one place. Never lose track of where you've applied and what's next.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Get timely reminders for application deadlines, interview schedules, and follow-ups. Stay on top of every opportunity.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart2,
    title: "Progress Analytics",
    description:
      "Visualize your application journey with detailed analytics. Understand your success rate and improve your strategy.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: ClipboardList,
    title: "Task Management",
    description:
      "Break down your application process into manageable tasks. Track requirements, documents, and deadlines efficiently.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description:
      "Set and track your internship goals. Monitor your progress and celebrate your achievements along the way.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: CalendarRange,
    title: "Timeline View",
    description:
      "Visualize your application timeline. Plan ahead and manage your time effectively with our intuitive timeline view.",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function WhyChoose() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-6"
        >
          <div className="inline-block">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              Features You&apos;ll Love
            </motion.span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
              Why Choose InternMate?
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Transform your internship search from chaos to clarity. Our powerful features 
            are designed to make your journey smoother and more successful.
          </motion.p>

          {/* Decorative line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-8"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative p-6 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/50 hover:border-border/80 transition-colors duration-300">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  
                  {/* Icon with gradient background */}
                  <div className={`mb-5 inline-block rounded-xl p-3 bg-gradient-to-r ${feature.gradient} bg-opacity-10`}>
                    <div className="relative z-10">
                      <Icon />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative gradient line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" 
                    style={{
                      backgroundImage: `linear-gradient(to right, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})`,
                    }} 
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChoose; 