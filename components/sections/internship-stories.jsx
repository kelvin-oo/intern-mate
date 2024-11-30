"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";


const stories = [
  {
    name: "Hafsah",
    course: "Geology",
    company: "Oando Energy Resources",
    howTheyGotIn: "The offers I got came in through the help of family and great pillars of support.",
    advice: "To get a placement, reach out to every possible person and let them know you need it urgently. Start informing them early enough and always check with them. Give them reasons to help you, build your portfolio, have required resources available at all times. Practice aptitude tests as early as possible.",
  },
  {
    name: "Ruby",
    course: "Geophysics",
    company: "SLB (formerly Schlumberger)",
    howTheyGotIn: "I attended the NAPE Conference in 2023, where I visited company booths, including SLB's. I met their recruiting HR, asked questions, and was provided official application details (careers.slb.com). I applied in November, got a response in December, and wrote the aptitude exam in January. I received my offer letter after passing the exam.",
    advice: "Apply early and to multiple companies to increase your chances. Speak to people who you believe can help. As an intern, aim to stand out, be nice, approachable, professional, and network with everyone.",
  },
  {
    name: "Igbalode",
    course: "Geology",
    company: "Ministry of Environment and Water Resources",
    howTheyGotIn: "I got in via the Permanent Secretary of the Ministry.",
    advice: "You could earn placement there if you go yourself and follow instructions for proper registration into the ministry. You could go just twice weekly, but they don’t pay stipends/salary. Payments are possible after each EIA exercise.",
  },
  {
    name: "Isaac",
    course: "Geology",
    company: "Aquaearth Consulting",
    howTheyGotIn: "I got my internship by sending an email before a physical visit, where I was examined.",
    advice: "Be persistent , don’t  put all hope on oil industries",
  },
  {
    name: "Daniel",
    course: "Geophysics",
    company: "Total Energies EP Nigeria Limited",
    howTheyGotIn: "I saw the application online, researched, and reached out to people who had interned there. I got tips on the application process, applied twice, and got in on my second attempt.",
    advice: "Start early, network, and strategize. Be persistent and don’t put all hope on oil industries.",
  },
  {
    name: "Jayde",
    course: "Geophysics",
    company: "SLB (formerly Schlumberger)",
    howTheyGotIn: "I got the HR’s email at the last NAPE conference and sent multiple emails to the company.",
    advice: "If you have a desired company, never be shy to send multiple emails. The worst they can say is no, but you ensure they don’t miss your application.",
  },
  {
    name: "Lolade",
    course: "Geology",
    company: "Department of Petroleum Resources (Now Ministry of Petroleum Resources)",
    howTheyGotIn: "I got the internship through an acquaintance.",
    advice: "Look for a place where you can learn and get hands-on experience. Focus on where your research interest lies. If I hadn’t gotten DPR, my next option was a geophysical and geotechnical company.",
  },
  {
    name: "Olamide Oki",
    course: "Geophysics",
    company: "Antan Producing Limited (NNPC, formerly Addax Petroleum Limited)",
    howTheyGotIn: "I secured the internship through the assistance of a lecturer who reached out to a company contact. After passing a test, I got the position.",
    advice: "Stay open-minded, persevere, and build relationships with people willing to support you.",
  },
  {
    name: "Demilade",
    course: "Geophysics",
    company: "Shell Nigeria Exploration and Production Company (SNEPCo)",
    howTheyGotIn: "I applied numerous times from November 2023 to February 2024. A friend of mine got in by cold messaging the HR on LinkedIn. I also wrote Chevron's test but didn’t get it.",
    advice: "Start early, apply to as many companies as possible, and don’t wait till the last minute.",
  },
];


export function InternshipStories() {
  const [expandedStories, setExpandedStories] = useState({});

  const toggleExpand = (index) => {
    setExpandedStories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const needsExpansion = (text) => {
    if (!text) return false;
    return text.length > 120;
  };

  return (
    <section className="">
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
              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
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
                      <div className="flex flex-col space-y-1">
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
                      <div className={`relative ${!expandedStories[`${index}-how`] && needsExpansion(story.howTheyGotIn) ? "h-[4.5rem] overflow-hidden" : ""}`}>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {story.howTheyGotIn}
                        </p>
                        {needsExpansion(story.howTheyGotIn) && (
                          <div className={`${!expandedStories[`${index}-how`] ? "absolute bottom-0 left-0 right-0" : "mt-2"}`}>
                            <div className={`${!expandedStories[`${index}-how`] ? "bg-gradient-to-t from-indigo-50 to-transparent dark:from-indigo-950/30 pt-8 -mt-8" : ""}`}>
                              <button
                                onClick={() => toggleExpand(`${index}-how`)}
                                className="w-full flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium
                                  bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
                                  text-white rounded-full transition-all duration-200 hover:shadow-lg"
                              >
                                {expandedStories[`${index}-how`] ? (
                                  <>Show Less <ChevronUp className="h-3 w-3" /></>
                                ) : (
                                  <>Show More <ChevronDown className="h-3 w-3" /></>
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 transform transition-all duration-300 group-hover:translate-x-1 border border-purple-100 dark:border-purple-900/50">
                      <h4 className="text-sm font-semibold mb-2 text-purple-700 dark:text-purple-300">
                        Advice for future interns
                      </h4>
                      <div className={`relative ${!expandedStories[`${index}-advice`] && needsExpansion(story.advice) ? "h-[4.5rem] overflow-hidden" : ""}`}>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {story.advice}
                        </p>
                        {needsExpansion(story.advice) && (
                          <div className={`${!expandedStories[`${index}-advice`] ? "absolute bottom-0 left-0 right-0" : "mt-2"}`}>
                            <div className={`${!expandedStories[`${index}-advice`] ? "bg-gradient-to-t from-purple-50 to-transparent dark:from-purple-950/30 pt-8 -mt-8" : ""}`}>
                              <button
                                onClick={() => toggleExpand(`${index}-advice`)}
                                className="w-full flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium
                                  bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                                  text-white rounded-full transition-all duration-200 hover:shadow-lg"
                              >
                                {expandedStories[`${index}-advice`] ? (
                                  <>Show Less <ChevronUp className="h-3 w-3" /></>
                                ) : (
                                  <>Show More <ChevronDown className="h-3 w-3" /></>
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
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