"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { X, Award, Users, Trophy, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TemplateOneForm() {
  const [step, setStep] = useState(1);
  const [currentCourseWork, setCurrentCourseWork] = useState("");
  const [currentSkill, setCurrentSkill] = useState({ type: "", value: "" });
  const [currentAssociation, setCurrentAssociation] = useState("");
  const [currentOutcome, setCurrentOutcome] = useState("");
  const [currentAward, setCurrentAward] = useState("");
  const [showingSection, setShowingSection] = useState("main");
  const [currentAchievement, setCurrentAchievement] = useState("");
  const [currentActivity, setCurrentActivity] = useState("");
  const [currentVolunteerAchievement, setCurrentVolunteerAchievement] =
    useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
    linkedIn: "",
    profileSummary: "",
    education: [],
    relevantCourseWork: [
      "Participated as part of a team of geoscience students in the geological mapping of outcrops in Abeokuta area of Ogun State.",
      "Carried out groundwater investigation at Moshood Abiola Polytechnic, Abeokuta by processing and interpreting data acquired from the application of geophysical methods such as Constant Separation Traversing, Vertical Electrical Sounding, Seismic, Magnetic, and Electromagnetic methods.",
      "Acquisition, processing, and interpretation of Electrical resistivity data to identify possible groundwater location and subsurface fault zones.",
      "Acquisition, processing, and interpretation of VLF data to detect and characterize variations in the electrical conductivity of the earth",
    ],
    softSkills: [
      "Teamwork",
      "Strong organizational skills with experience managing multiple responsibilities effectively",
      "Problem-solving",
      "Excellent communication and teamwork abilities developed through leadership roles",
    ],
    technicalSkills: [
      "Programming and Scripting: Proficiency in Python, Bash, or PowerShell for automation",
      "Data Analysis: Experience with data processing, visualization, and statistical analysis",
      "Version Control: Proficient with Git for code management and collaboration",
      "Database Management: Knowledge of SQL and database design principles",
      "Web Development: Experience with HTML, CSS, and JavaScript",
    ],
    tools: [
      "VSCode for software development",
      "Microsoft Office Suite (Word, Excel, PowerPoint)",
      "Git and GitHub for version control",
      "Project management tools (Jira, Trello)",
      "Adobe Creative Suite",
    ],
    associations: [
      "American Association of Petroleum Geologists (AAPG) - Student Member",
      "Nigerian Mining and Geosciences Society, UNILAG Chapter - Student Member",
    ],
    certifications: [
      {
        platform: "Udemy",
        name: "Copywriting Course",
        outcomes: [
          "Developed skills to create compelling and persuasive copy across various media, including print, digital, and social platforms.",
          "Mastered techniques for writing engaging headlines and call-to-actions.",
          "Learned best practices for SEO copywriting and content optimization.",
        ],
      },
    ],
    awards: [],
    leadership: [
      {
        position: "",
        organization: "",
        startDate: "",
        endDate: "",
        achievements: [],
      },
    ],
    extracurricular: [
      "Captain of the University Football Team - Led team to regional championships",
      "Member of the Debate Club - Participated in national competitions",
      "Student Government Representative - Organized campus-wide events",
    ],
    volunteer: [
      {
        position: "",
        organization: "",
        startDate: "",
        endDate: "",
        achievements: [],
      },
    ],
  });
  const router = useRouter();

  const additionalSections = [
    {
      id: "leadership",
      title: "Leadership Roles",
      description: "Add positions of responsibility and leadership experience",
      icon: Users,
      path: "/cv-builder/form/leadership",
    },
    {
      id: "extracurricular",
      title: "Extracurricular Activities",
      description: "Include sports, clubs, and other activities",
      icon: Award,
      path: "/cv-builder/form/extracurricular",
    },
    {
      id: "awards",
      title: "Awards and Honors",
      description: "Add academic or professional achievements",
      icon: Trophy,
      path: "/cv-builder/form/awards",
    },
    {
      id: "volunteer",
      title: "Volunteer Work",
      description: "Include community service and volunteering experience",
      icon: Heart,
      path: "/cv-builder/form/volunteer",
    },
  ];

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Submit form data
    console.log("Form submitted:", formData);
  };

  const addEducationEntry = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", startDate: "", endDate: "", cgpa: "" },
      ],
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = formData.education.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleAddCourseWork = () => {
    if (currentCourseWork.trim()) {
      setFormData({
        ...formData,
        relevantCourseWork: [
          ...formData.relevantCourseWork,
          currentCourseWork.trim(),
        ],
      });
      setCurrentCourseWork("");
    }
  };

  const handleRemoveCourseWork = (index) => {
    setFormData({
      ...formData,
      relevantCourseWork: formData.relevantCourseWork.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleAddSkill = (type) => {
    if (currentSkill.value.trim()) {
      setFormData({
        ...formData,
        [type]: [...formData[type], currentSkill.value.trim()],
      });
      setCurrentSkill({ type: "", value: "" });
    }
  };

  const handleRemoveSkill = (type, index) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });
  };

  const handleAddAssociation = () => {
    if (currentAssociation.trim()) {
      setFormData({
        ...formData,
        associations: [...formData.associations, currentAssociation.trim()],
      });
      setCurrentAssociation("");
    }
  };

  const handleRemoveAssociation = (index) => {
    setFormData({
      ...formData,
      associations: formData.associations.filter((_, i) => i !== index),
    });
  };

  const handleAddOutcome = (certIndex) => {
    if (currentOutcome.trim()) {
      const updatedCertifications = formData.certifications.map(
        (cert, index) => {
          if (index === certIndex) {
            return {
              ...cert,
              outcomes: [...cert.outcomes, currentOutcome.trim()],
            };
          }
          return cert;
        }
      );

      setFormData({
        ...formData,
        certifications: updatedCertifications,
      });
      setCurrentOutcome("");
    }
  };

  const handleRemoveOutcome = (certIndex, outcomeIndex) => {
    const updatedCertifications = formData.certifications.map((cert, index) => {
      if (index === certIndex) {
        return {
          ...cert,
          outcomes: cert.outcomes.filter((_, i) => i !== outcomeIndex),
        };
      }
      return cert;
    });

    setFormData({
      ...formData,
      certifications: updatedCertifications,
    });
  };

  const addCertificationEntry = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        { platform: "", name: "", outcomes: [] },
      ],
    });
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = formData.certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const removeCertificationEntry = (index) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const handleAddAward = () => {
    if (currentAward.trim()) {
      setFormData({
        ...formData,
        awards: [...formData.awards, currentAward.trim()],
      });
      setCurrentAward("");
    }
  };

  const handleRemoveAward = (index) => {
    setFormData({
      ...formData,
      awards: formData.awards.filter((_, i) => i !== index),
    });
  };

  const handleSectionClick = (sectionId) => {
    setShowingSection(sectionId);
  };

  const handleGenerateCV = () => {
    console.log(formData);
    // router.push("/cv-builder/preview");
  };

  const addLeadershipEntry = () => {
    setFormData({
      ...formData,
      leadership: [
        ...formData.leadership,
        {
          position: "",
          organization: "",
          startDate: "",
          endDate: "",
          achievements: [],
        },
      ],
    });
  };

  const handleLeadershipChange = (index, field, value) => {
    const updatedLeadership = formData.leadership.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setFormData({ ...formData, leadership: updatedLeadership });
  };

  const handleAddAchievement = (index) => {
    if (currentAchievement.trim()) {
      const updatedLeadership = formData.leadership.map((entry, i) => {
        if (i === index) {
          return {
            ...entry,
            achievements: [...entry.achievements, currentAchievement.trim()],
          };
        }
        return entry;
      });

      setFormData({
        ...formData,
        leadership: updatedLeadership,
      });
      setCurrentAchievement("");
    }
  };

  const handleRemoveAchievement = (leadershipIndex, achievementIndex) => {
    const updatedLeadership = formData.leadership.map((entry, i) => {
      if (i === leadershipIndex) {
        return {
          ...entry,
          achievements: entry.achievements.filter(
            (_, j) => j !== achievementIndex
          ),
        };
      }
      return entry;
    });

    setFormData({
      ...formData,
      leadership: updatedLeadership,
    });
  };

  const handleAddActivity = () => {
    if (currentActivity.trim()) {
      setFormData({
        ...formData,
        extracurricular: [...formData.extracurricular, currentActivity.trim()],
      });
      setCurrentActivity("");
    }
  };

  const handleRemoveActivity = (index) => {
    setFormData({
      ...formData,
      extracurricular: formData.extracurricular.filter((_, i) => i !== index),
    });
  };

  const addVolunteerEntry = () => {
    setFormData({
      ...formData,
      volunteer: [
        ...formData.volunteer,
        {
          position: "",
          organization: "",
          startDate: "",
          endDate: "",
          achievements: [],
        },
      ],
    });
  };

  const handleVolunteerChange = (index, field, value) => {
    const updatedVolunteer = formData.volunteer.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setFormData({ ...formData, volunteer: updatedVolunteer });
  };

  const handleAddVolunteerAchievement = (index) => {
    if (currentVolunteerAchievement.trim()) {
      const updatedVolunteer = formData.volunteer.map((entry, i) => {
        if (i === index) {
          return {
            ...entry,
            achievements: [
              ...entry.achievements,
              currentVolunteerAchievement.trim(),
            ],
          };
        }
        return entry;
      });

      setFormData({
        ...formData,
        volunteer: updatedVolunteer,
      });
      setCurrentVolunteerAchievement("");
    }
  };

  const handleRemoveVolunteerAchievement = (
    volunteerIndex,
    achievementIndex
  ) => {
    const updatedVolunteer = formData.volunteer.map((entry, i) => {
      if (i === volunteerIndex) {
        return {
          ...entry,
          achievements: entry.achievements.filter(
            (_, j) => j !== achievementIndex
          ),
        };
      }
      return entry;
    });

    setFormData({
      ...formData,
      volunteer: updatedVolunteer,
    });
  };

  const handleRemoveVolunteerEntry = (index) => {
    setFormData({
      ...formData,
      volunteer: formData.volunteer.filter((_, i) => i !== index),
    });
  };

  const renderSkillSection = (type, title, placeholder) => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <Textarea
          value={currentSkill.type === type ? currentSkill.value : ""}
          onChange={(e) => setCurrentSkill({ type, value: e.target.value })}
          placeholder={placeholder}
          className="min-h-[100px] flex-grow"
        />
        <Button
          type="button"
          onClick={() => handleAddSkill(type)}
          className="shrink-0 sm:self-start"
        >
          Add {title}
        </Button>
      </div>

      {formData[type].length > 0 && (
        <div className="space-y-3">
          {formData[type].map((skill, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
            >
              <p className="flex-grow text-sm leading-relaxed">{skill}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => handleRemoveSkill(type, index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove skill</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    if (showingSection === "awards") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Awards and Honors</h2>
            <p className="text-muted-foreground">
              List your academic and professional achievements
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Textarea
                value={currentAward}
                onChange={(e) => setCurrentAward(e.target.value)}
                placeholder="e.g., Dean's List, Best Research Paper Award..."
                className="min-h-[100px] flex-grow"
              />
              <Button
                type="button"
                onClick={handleAddAward}
                className="shrink-0 sm:self-start"
              >
                Add Award
              </Button>
            </div>

            {formData.awards.length > 0 && (
              <div className="space-y-3">
                {formData.awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                  >
                    <p className="flex-grow text-sm leading-relaxed">{award}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => handleRemoveAward(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove award</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (showingSection === "leadership") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Leadership Roles</h2>
            <p className="text-muted-foreground">
              Add your leadership positions and achievements
            </p>
          </div>

          {formData.leadership.map((entry, index) => (
            <div
              key={index}
              className="space-y-4 p-4 bg-muted/30 rounded-lg relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={() => handleRemoveLeadershipEntry(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove leadership entry</span>
              </Button>

              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Input
                  placeholder="e.g., Team Leader"
                  value={entry.position}
                  onChange={(e) =>
                    handleLeadershipChange(index, "position", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Organization</label>
                <Input
                  placeholder="e.g., University Student Council"
                  value={entry.organization}
                  onChange={(e) =>
                    handleLeadershipChange(
                      index,
                      "organization",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={entry.startDate}
                    onChange={(e) =>
                      handleLeadershipChange(index, "startDate", e.target.value)
                    }
                  />
                  <Input
                    type="date"
                    value={entry.endDate}
                    onChange={(e) =>
                      handleLeadershipChange(index, "endDate", e.target.value)
                    }
                    disabled={entry.endDate === "Present"}
                  />
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={entry.endDate === "Present"}
                      onChange={(e) =>
                        handleLeadershipChange(
                          index,
                          "endDate",
                          e.target.checked ? "Present" : ""
                        )
                      }
                    />
                    Present
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Achievements</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Textarea
                    value={currentAchievement}
                    onChange={(e) => setCurrentAchievement(e.target.value)}
                    placeholder="Add an achievement..."
                    className="min-h-[100px] flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddAchievement(index)}
                    className="shrink-0 sm:self-start"
                  >
                    Add Achievement
                  </Button>
                </div>

                {entry.achievements.length > 0 && (
                  <div className="space-y-3">
                    {entry.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                      >
                        <p className="flex-grow text-sm leading-relaxed">
                          {achievement}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() =>
                            handleRemoveAchievement(index, achievementIndex)
                          }
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove achievement</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addLeadershipEntry}
            className="w-full"
          >
            Add Leadership Role
          </Button>
        </div>
      );
    }

    if (showingSection === "extracurricular") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              Extracurricular Activities
            </h2>
            <p className="text-muted-foreground">
              Add your activities, clubs, sports, and other involvements
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Textarea
                value={currentActivity}
                onChange={(e) => setCurrentActivity(e.target.value)}
                placeholder="e.g., Captain of the University Football Team - Led team to regional championships"
                className="min-h-[100px] flex-grow"
              />
              <Button
                type="button"
                onClick={handleAddActivity}
                className="shrink-0 sm:self-start"
              >
                Add Activity
              </Button>
            </div>

            {formData.extracurricular.length > 0 && (
              <div className="space-y-3">
                {formData.extracurricular.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                  >
                    <p className="flex-grow text-sm leading-relaxed">
                      {activity}
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => handleRemoveActivity(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove activity</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (showingSection === "volunteer") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Volunteer Work</h2>
            <p className="text-muted-foreground">
              Add your volunteer experience and contributions
            </p>
          </div>

          {formData.volunteer.map((entry, index) => (
            <div
              key={index}
              className="space-y-4 p-4 bg-muted/30 rounded-lg relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={() => handleRemoveVolunteerEntry(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove volunteer entry</span>
              </Button>

              <div className="space-y-2">
                <label className="text-sm font-medium">Position/Role</label>
                <Input
                  placeholder="e.g., Community Outreach Volunteer"
                  value={entry.position}
                  onChange={(e) =>
                    handleVolunteerChange(index, "position", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Organization</label>
                <Input
                  placeholder="e.g., Local Food Bank"
                  value={entry.organization}
                  onChange={(e) =>
                    handleVolunteerChange(index, "organization", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={entry.startDate}
                    onChange={(e) =>
                      handleVolunteerChange(index, "startDate", e.target.value)
                    }
                  />
                  <Input
                    type="date"
                    value={entry.endDate}
                    onChange={(e) =>
                      handleVolunteerChange(index, "endDate", e.target.value)
                    }
                    disabled={entry.endDate === "Present"}
                  />
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={entry.endDate === "Present"}
                      onChange={(e) =>
                        handleVolunteerChange(
                          index,
                          "endDate",
                          e.target.checked ? "Present" : ""
                        )
                      }
                    />
                    Present
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Key Contributions & Achievements
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Textarea
                    value={currentVolunteerAchievement}
                    onChange={(e) =>
                      setCurrentVolunteerAchievement(e.target.value)
                    }
                    placeholder="Add a contribution or achievement..."
                    className="min-h-[100px] flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddVolunteerAchievement(index)}
                    className="shrink-0 sm:self-start"
                  >
                    Add Achievement
                  </Button>
                </div>

                {entry.achievements.length > 0 && (
                  <div className="space-y-3">
                    {entry.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                      >
                        <p className="flex-grow text-sm leading-relaxed">
                          {achievement}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() =>
                            handleRemoveVolunteerAchievement(
                              index,
                              achievementIndex
                            )
                          }
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove achievement</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addVolunteerEntry}
            className="w-full"
          >
            Add Volunteer Work
          </Button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Personal Information</h2>
              <p className="text-muted-foreground">
                Let&apos;s start with your basic information
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  name="fullName"
                  placeholder="e.g., John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input
                  name="address"
                  placeholder="e.g., 123 Main St, City, Country"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="e.g., john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  name="phoneNumber"
                  placeholder="e.g., +1 234 567 8900"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn Profile</label>
                <Input
                  name="linkedIn"
                  type="url"
                  placeholder="e.g., linkedin.com/in/johndoe"
                  value={formData.linkedIn}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Profile Summary</h2>
              <p className="text-muted-foreground">
                Write a compelling summary of your professional background
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Summary</label>
              <Textarea
                name="profileSummary"
                placeholder="Share your career objectives and key strengths..."
                value={formData.profileSummary}
                onChange={handleChange}
                className="min-h-[200px]"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Education</h2>
              <p className="text-muted-foreground">
                Add your educational background
              </p>
            </div>
            {formData.education.map((entry, index) => (
              <div key={index} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Institution Name
                  </label>
                  <Input
                    placeholder="e.g., University of Lagos, Akoka"
                    value={entry.institution}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "institution",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Degree/Qualification
                  </label>
                  <Input
                    placeholder="e.g., Bachelor of Science in Geology/Geophysics"
                    value={entry.degree}
                    onChange={(e) =>
                      handleEducationChange(index, "degree", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="month"
                    value={entry.startDate}
                    onChange={(e) =>
                      handleEducationChange(index, "startDate", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="month"
                      value={entry.endDate}
                      onChange={(e) =>
                        handleEducationChange(index, "endDate", e.target.value)
                      }
                      disabled={entry.endDate === "Present"}
                    />
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={entry.endDate === "Present"}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "endDate",
                            e.target.checked ? "Present" : ""
                          )
                        }
                      />
                      Present
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CGPA (Optional)</label>
                  <Input
                    placeholder="e.g., 4.5/5.0"
                    value={entry.cgpa}
                    onChange={(e) =>
                      handleEducationChange(index, "cgpa", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addEducationEntry}
              className="w-full"
            >
              Add Another Education
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Relevant Course Work</h2>
              <p className="text-muted-foreground">
                Add your key academic projects and practical experiences
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Textarea
                  value={currentCourseWork}
                  onChange={(e) => setCurrentCourseWork(e.target.value)}
                  placeholder="Describe a relevant course work or project..."
                  className="min-h-[100px] flex-grow"
                />
                <Button
                  type="button"
                  onClick={handleAddCourseWork}
                  className="shrink-0 sm:self-start"
                >
                  Add Course Work
                </Button>
              </div>

              {formData.relevantCourseWork.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Added Course Work
                  </label>
                  <div className="space-y-3">
                    {formData.relevantCourseWork.map((work, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                      >
                        <p className="flex-grow text-sm leading-relaxed">
                          {work}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => handleRemoveCourseWork(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove course work</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Skills & Expertise</h2>
              <p className="text-muted-foreground">
                Add your skills and areas of expertise
              </p>
            </div>

            {renderSkillSection(
              "softSkills",
              "Soft Skills",
              "e.g., Leadership, Communication, Problem Solving..."
            )}

            {renderSkillSection(
              "technicalSkills",
              "Technical Skills",
              "e.g., Data Analysis, Project Management, Research..."
            )}

            {renderSkillSection(
              "tools",
              "Tools & Software",
              "e.g., Microsoft Office, AutoCAD, GIS Software..."
            )}
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                Professional Associations
              </h2>
              <p className="text-muted-foreground">
                Add your memberships and professional affiliations
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Textarea
                  value={currentAssociation}
                  onChange={(e) => setCurrentAssociation(e.target.value)}
                  placeholder="e.g., American Association of Petroleum Geologists (AAPG) - Student Member"
                  className="min-h-[100px] flex-grow"
                />
                <Button
                  type="button"
                  onClick={handleAddAssociation}
                  className="shrink-0 sm:self-start"
                >
                  Add Association
                </Button>
              </div>

              {formData.associations.length > 0 && (
                <div className="space-y-3">
                  {formData.associations.map((association, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                    >
                      <p className="flex-grow text-sm leading-relaxed">
                        {association}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => handleRemoveAssociation(index)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove association</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Certifications</h2>
              <p className="text-muted-foreground">
                Add any relevant certifications(Optional)
              </p>
            </div>

            {formData.certifications.map((cert, certIndex) => (
              <div
                key={certIndex}
                className="space-y-4 p-4 bg-muted/30 rounded-lg relative"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8"
                  onClick={() => removeCertificationEntry(certIndex)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove certification</span>
                </Button>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Platform/Institution
                  </label>
                  <Input
                    placeholder="e.g., Udemy, Coursera, LinkedIn Learning"
                    value={cert.platform}
                    onChange={(e) =>
                      handleCertificationChange(
                        certIndex,
                        "platform",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Course/Certification Name
                  </label>
                  <Input
                    placeholder="e.g., Advanced Python Programming"
                    value={cert.name}
                    onChange={(e) =>
                      handleCertificationChange(
                        certIndex,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    Key Learning Outcomes
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Textarea
                      value={currentOutcome}
                      onChange={(e) => setCurrentOutcome(e.target.value)}
                      placeholder="Add a key learning outcome..."
                      className="min-h-[100px] flex-grow"
                    />
                    <Button
                      type="button"
                      onClick={() => handleAddOutcome(certIndex)}
                      className="shrink-0 sm:self-start"
                    >
                      Add Outcome
                    </Button>
                  </div>

                  {cert.outcomes.length > 0 && (
                    <div className="space-y-3">
                      {cert.outcomes.map((outcome, outcomeIndex) => (
                        <div
                          key={outcomeIndex}
                          className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                        >
                          <p className="flex-grow text-sm leading-relaxed">
                            {outcome}
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() =>
                              handleRemoveOutcome(certIndex, outcomeIndex)
                            }
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove outcome</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addCertificationEntry}
              className="w-full"
            >
              Add Certification
            </Button>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Additional Sections</h2>
              <p className="text-muted-foreground">
                Would you like to add any additional sections to your CV?
                (Optional)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className="group p-4 rounded-lg border bg-card text-left transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-full p-2 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6">
              <Button onClick={handleGenerateCV} className="w-full" size="lg">
                Generate CV
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-2">
                You can always come back and add more sections later
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          {showingSection === "main" && (
            <ProgressBar step={step} totalSteps={8} />
          )}
        </CardHeader>
        <CardContent className="px-0">{renderStep()}</CardContent>
        <CardFooter className="px-0 flex justify-between gap-4">
          {showingSection !== "main" ? (
            <>
              <Button
                onClick={() => setShowingSection("main")}
                variant="outline"
                className="w-full"
              >
                Back to Sections
              </Button>
              <Button onClick={handleGenerateCV} className="w-full">
                Generate CV
              </Button>
            </>
          ) : (
            <>
              {step > 1 && step < 8 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="w-full"
                >
                  Back
                </Button>
              )}
              {step < 8 ? (
                <Button onClick={handleNext} className="w-full">
                  Continue
                </Button>
              ) : null}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
