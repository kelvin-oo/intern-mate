"use client";
import { useRef, useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import { useCVStore } from '@/store';

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf",
      fontWeight: 600,
    },
  ],
});

// Define styles for PDF'
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#0066B3",
    padding: 20,
    color: "white",
  },
  mainContent: {
    width: "70%",
    padding: 20,
  },
  sectionHeader: {
    backgroundColor: "#0066B3",
    color: "white",
    padding: 5,
    marginVertical: 10,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    fontSize: 13,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Open Sans",
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
    fontFamily: "Open Sans",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Open Sans",
    color: "#0066B3",
    backgroundColor: "white",
    padding: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    fontFamily: "Open Sans",
  },
  bold: {
    fontWeight: "bold",
  },
  experienceItem: {
    marginBottom: 15,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: "Open Sans",
  }
});

// Create PDF Document component
const CVDocument = ({ data }) => (
  <Document>
  <Page size="A4" style={styles.page}>
    {/* Sidebar */}
    <View style={styles.sidebar}>
      <Text style={styles.name}>{data.fullName.split(" ")[0]}</Text>
      <Text style={styles.name}>{data.fullName.split(" ")[1]}</Text>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.contactInfo}>Phone: {data.phoneNumber}</Text>
        <Text style={styles.contactInfo}>Email: {data.email}</Text>
        <Text style={styles.contactInfo}>LinkedIn: {data.linkedIn}</Text>
        <Text style={styles.contactInfo}>Address: {data.address}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Profile Summary</Text>
        <Text style={styles.text}>{data.profileSummary}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Soft Skills</Text>
        {data.skills.soft.map((skill, index) => (
          <Text key={index} style={styles.listItem}>• {skill}</Text>
        ))}
      </View>
    </View>

    {/* Main Content */}
    <View style={styles.mainContent}>
      <Text style={styles.sectionHeader}>EDUCATION</Text>
      <View style={styles.experienceItem}>
        <Text style={[styles.text, styles.bold]}>{data.education.degree}</Text>
        <Text style={styles.text}>{data.education.institution}</Text>
        <Text style={[styles.text, styles.bold]}>G.P.A: {data.education.cgpa}/5</Text>
      </View>

     {
      data.associations.length > 0 && <>
       <View style={styles.experienceItem}>
        <Text style={[styles.text, styles.bold]}>Associations</Text>
        {data.associations.map((association, index) => (
          <Text key={index} style={styles.listItem}>• {association}</Text>
        ))}
      </View>
      </>
     }

      <Text style={styles.sectionHeader}>EXPERIENCE AND RELEVANT COURSEWORK</Text>
      <View style={styles.experienceItem}>
        <Text style={[styles.text, styles.bold]}>Relevant Coursework</Text>
        {data.relevantCourseWork.map((course, index) => (
          <Text key={index} style={styles.listItem}>• {course}</Text>
        ))}
      </View>

      {
        data.experiences.length > 0 && <>
        {data.experiences.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={[styles.text, styles.bold]}>{exp.role}</Text>
          <Text style={styles.text}>{exp.company} | {exp.startDate} - {exp.endDate}</Text>
          {exp.responsibilities.map((resp, idx) => (
            <Text key={idx} style={styles.listItem}>• {resp}</Text>
          ))}
          </View>
        ))}
        </>
      }

      {
        data.leadership.length > 0 && <>
         <Text style={styles.sectionHeader}>LEADERSHIP EXPERIENCE</Text>
      {data.leadership.map((lead, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={[styles.text, styles.bold]}>{lead.position}</Text>
          <Text style={styles.text}>{lead.organization}</Text>
          <Text style={styles.text}>Duration: {lead.startDate} to {lead.endDate}</Text>
          {lead.achievements.map((achievement, idx) => (
            <Text key={idx} style={styles.listItem}>• {achievement}</Text>
          ))}
        </View>
      ))}

        </>
      }

{
        data.volunteer.length > 0 && <>
         <Text style={styles.sectionHeader}>VOLUNTEER EXPERIENCE</Text>
      {data.volunteer.map((vol, index) => (
        <View key={index} style={styles.experienceItem}>
              <Text style={[styles.text, styles.bold]}>{vol.position}</Text>
          <Text style={styles.text}>{vol.organization}</Text>
          <Text style={styles.text}>Duration: {vol.startDate} to {vol.endDate}</Text>
          {vol.achievements.map((achievement, idx) => (
            <Text key={idx} style={styles.listItem}>• {achievement}</Text>
          ))}
        </View>
      ))}

        </>
      }

      {
        data.awards.length > 0 && <>

      <View style={styles.experienceItem}>
        <Text style={[styles.text, styles.bold]}>Awards & Honors</Text>
        {data.awards.map((award, index) => (
          <Text key={index} style={styles.listItem}>• {award}</Text>
        ))}
      </View>

      <View style={styles.experienceItem}>
        <Text style={[styles.text, styles.bold]}>Extracurricular Activities</Text>
        {data.extracurricular.map((activity, index) => (
          <Text key={index} style={styles.listItem}>• {activity}</Text>
        ))}
      </View>

      </>
      }

      {
        data.skills.technical.length > 0 && <>
      <View style={styles.experienceItem}>
        <Text style={[styles.text, styles.bold]}>Technical Skills</Text>
        {data.skills.technical.map((skill, index) => (
          <Text key={index} style={styles.listItem}>• {skill}</Text>
        ))}
      </View>

      <View style={styles.experienceItem}>
        <Text style={[styles.text, styles.bold]}>Tools</Text>
        {data.skills.tools.map((tool, index) => (
          <Text key={index} style={styles.listItem}>• {tool}</Text>
        ))}
      </View>

      <Text style={styles.sectionHeader}>CERTIFICATIONS</Text>
      {data.certifications.map((cert, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={[styles.text, styles.bold]}>{cert.platform} - {cert.name}</Text>
          {cert.outcomes.map((outcome, idx) => (
            <Text key={idx} style={styles.listItem}>• {outcome}</Text>
          ))}
        </View>
      ))}
      </>
        }
    </View>
  </Page>
</Document>
);

export default function CVTemplate() {
  const cvData = useCVStore((state) => state.cvData);
  const [PDFDownloadLink, setPDFDownloadLink] = useState();
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    // Import PDF renderer
    import('@react-pdf/renderer').then(module => {
      setPDFDownloadLink(() => module.PDFDownloadLink);
    });

    // Check if cvData is available and has required properties
    if (cvData && cvData.fullName) {
      setIsDataReady(true);
    }
  }, [cvData]);


  const formData = {
    fullName: "Jane Doe",
    address: "456 Elm Street, Abuja, Nigeria",
    email: "janedoe@example.com",
    phoneNumber: "08123456789",
    linkedIn: "https://linkedin.com/in/janedoe",
    profileSummary:
      "Motivated and detail-oriented Geoscience graduate with a proven track record in geological mapping, data analysis, and project management. Passionate about leveraging technology and teamwork to solve complex problems in energy and environmental sectors.",
    education: {
      institution: "University of Abuja",
      degree: "Bachelor of Science in Geology",
      startDate: "2017-09",
      endDate: "2021-06",
      cgpa: "4.80",
    },
    relevantCourseWork: [
      "Analyzed and mapped geological formations across the Benue Trough.",
      "Investigated groundwater quality using advanced geophysical techniques.",
      "Processed seismic and resistivity data to identify subsurface anomalies.",
      "Researched the environmental impact of mining activities in the Plateau region.",
    ],
    skills: {
      technical: [
        "Seismic Data Processing using Petrel and HampsonRussell",
        "Proficient in Python for geospatial data analysis",
        "GIS Tools: Experienced with ArcGIS and QGIS",
        "Advanced knowledge of Microsoft Excel for data modeling",
        "Remote Sensing and Photogrammetry Techniques",
      ],
      soft: [
        "Strong communication and presentation skills",
        "Team leadership and conflict resolution abilities",
        "Adaptability to dynamic and high-pressure environments",
        "Effective time management and multitasking capabilities",
      ],
      tools: [
        "MATLAB for computational modeling",
        "Git and GitHub for version control",
        "Microsoft Office Suite for documentation and presentations",
        "Trello for project management",
        "Adobe Illustrator for creating visual reports",
      ],
    },
    associations: [
      "Nigerian Association of Geoscience Students (NAGS) - Member",
      "American Association of Petroleum Geologists (AAPG) - Student Member",
      "Society of Exploration Geophysicists (SEG) - Active Member",
    ],
    certifications: [
      {
        platform: "Coursera",
        name: "Data Analysis and Visualization",
        outcomes: [
          "Learned advanced Python techniques for data wrangling and visualization.",
          "Gained hands-on experience with Tableau and Power BI for creating dashboards.",
          "Developed predictive models to identify geological trends.",
        ],
      },
      {
        platform: "Udemy",
        name: "Project Management Basics",
        outcomes: [
          "Mastered project lifecycle management and stakeholder engagement.",
          "Gained knowledge of Agile and Scrum methodologies.",
          "Learned to manage risks and deliver projects on time and within budget.",
        ],
      },
    ],
    awards: [
      "Best Student Research Project Award - University of Abuja (2021)",
      "Dean’s Honor List for Outstanding Academic Performance (2020, 2021)",
    ],
    leadership: [
      {
        position: "President",
        organization: "Geoscience Students’ Society",
        startDate: "2020-09",
        endDate: "2021-06",
        achievements: [
          "Organized a nationwide geology conference with over 500 participants.",
          "Spearheaded a mentorship program connecting students with industry professionals.",
        ],
      },
      {
        position: "Team Lead",
        organization: "University Debate Club",
        startDate: "2019-01",
        endDate: "2020-12",
        achievements: [
          "Led the team to victory in the National Debate Championship.",
          "Introduced a structured training program for new members.",
        ],
      },
    ],
    extracurricular: [
      "Led geological field trips to study sedimentary rock formations in Niger State.",
      "Volunteered in community clean-up campaigns organized by Green Earth Initiative.",
      "Represented the university in the National Geoscience Quiz Competition.",
    ],
    volunteer: [
      {
        position: "Environmental Advocate",
        organization: "Save Our Planet Foundation",
        startDate: "2020-01",
        endDate: "2021-12",
        achievements: [
          "Planted over 1,000 trees as part of a reforestation initiative.",
          "Organized workshops on sustainable water management for local farmers.",
        ],
      },
    ],
    experiences: [
      {
        company: "Nigerian National Petroleum Corporation (NNPC)",
        role: "Intern - Geoscience Division",
        startDate: "2020-06",
        endDate: "2020-12",
        responsibilities: [
          "Assisted in seismic data interpretation and reservoir characterization.",
          "Participated in geological field studies and data acquisition.",
          "Prepared detailed reports and presentations on research findings.",
        ],
      },
      {
        company: "TotalEnergies",
        role: "Field Assistant",
        startDate: "2019-01",
        endDate: "2019-06",
        responsibilities: [
          "Collaborated with senior geologists in analyzing core samples.",
          "Provided logistical support during field operations.",
          "Documented project progress and maintained equipment inventory.",
        ],
      },
    ],
  };

  if (!isDataReady) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">
          Loading CV data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg">
      {PDFDownloadLink ? (
        <PDFDownloadLink
          document={<CVDocument data={cvData} />}
          fileName="cv.pdf"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-150 ease-in-out"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Generating PDF..." : "Download PDF"
          }
        </PDFDownloadLink>
      ) : (
        <button
          className="bg-gray-400 text-white font-semibold py-2 px-4 rounded shadow"
          disabled
        >
          Loading PDF Generator...
        </button>
      )}
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="w-full md:w-72 bg-[#0066b2] text-white p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold">{cvData.fullName.split(" ")[0]}</h1>
              <h1 className="text-4xl font-bold mt-2">{cvData.fullName.split(" ")[1]}</h1>
            </div>

            <div className="space-y-2">
              <p>
                  <span className="font-bold">Phone:</span> {cvData.phoneNumber}
              </p>
              <p>
                <span className="font-bold">Email:</span>{" "}
                <a href={`mailto:${cvData.email}`} className="underline">
                  {cvData.email}
                </a>
              </p>
              <p>
                <span className="font-bold">LinkedIn:</span>{" "}
                <a href={cvData.linkedIn} className="underline">
                  {cvData.linkedIn}
                </a>
              </p>
              <p>
                <span className="font-bold">Address:</span> {cvData.address}
              </p>
            </div>

            <div>
              <h3 className="bg-white text-[#0066b2] font-bold p-2 mb-3">
                Profile Summary
              </h3>
              <p className="text-sm leading-relaxed">{cvData.profileSummary}</p>
            </div>

            <div>
              <h3 className="bg-white text-[#0066b2] font-bold p-2 mb-3">
                Soft Skills
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                {cvData.skills.soft.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 text-black">
          {/* Education Section */}
          <div className="mb-6">
            <h3 className="bg-[#0066b2] text-white font-bold p-2 mb-4">
              EDUCATION
            </h3>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold">{cvData.education.degree}</h4>
                <p className="text-sm">{cvData.education.institution}</p>
              </div>
              <p className="font-bold">G.P.A: {cvData.education.cgpa}/5</p>
            </div>

            <div className="mt-4">
              <p className="font-bold mb-2">Associations</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {cvData.associations.map((association, index) => (
                  <li key={index}>{association}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Experience and Relevant Coursework Section */}
          <div className="mb-6">
            <h3 className="bg-[#0066b2] text-white font-bold p-2 mb-4">
              EXPERIENCE AND RELEVANT COURSEWORK
            </h3>

            <div className="mb-6">
              <h4 className="font-bold">Relevant Coursework</h4>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                {cvData.relevantCourseWork.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>

            {
              cvData.experiences.length > 0 && <>
              <div className="mb-6">
              <h4 className="font-bold">Experience</h4>
              {cvData.experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{exp.role}</h3>
                  <p className="text-sm">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </p>
                  <ul className="list-disc list-inside text-sm ml-4 space-y-2 mt-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
              </>
            }
          </div>

          {/* Leadership Experience Section */}
          {
            cvData.leadership.length > 0 && <>
 <div className="mb-6">
            <h3 className="bg-[#0066b2] text-white font-bold p-2 mb-4">
              LEADERSHIP EXPERIENCE
            </h3>

            {cvData.leadership.map((lead, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-bold">{lead.position}</h4>
                <p className="text-sm">{lead.organization}</p>
                <p className="text-sm italic">
                  Duration: {lead.startDate} to {lead.endDate}
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                  {lead.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
            </>
          }


          {
            cvData.volunteer.length > 0 && <>  
          <div className="mb-6">
            <h3 className="bg-[#0066b2] text-white font-bold p-2 mb-4">
              VOLUNTEER EXPERIENCE
            </h3>

            {cvData.volunteer.map((vol, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-bold">{vol.position}</h4>
                <p className="text-sm">{vol.organization}</p>
                <p className="text-sm italic">
                  Duration: {vol.startDate} to {vol.endDate}
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                  {vol.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
            </>
          }

          {/* Awards & Honors */}
          {
            cvData.awards.length > 0 && <>
          <div className="mb-6">
            <h4 className="font-bold">Awards & Honors</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              {cvData.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </div>
            </>
          }

          {/* Extracurricular Activities */}
          {
            cvData.extracurricular.length > 0 && <>
          <div className="mb-6">
            <h4 className="font-bold">Extracurricular Activities</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              {cvData.extracurricular.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
            </>
          }

          {/* Technical Skills */}
          {
            cvData.skills.technical.length > 0 && <>
          <div className="mb-6">
            <h4 className="font-bold">Technical Skills</h4>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
              {cvData.skills.technical.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
            </>
          }

          {/* Tools */}
          {
            cvData.skills.tools.length > 0 && <>
          <div className="mb-6">
            <h4 className="font-bold">Tools</h4>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
              {cvData.skills.tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
            </>
          }

          {/* Certifications */}
          {
            cvData.certifications.length > 0 && <>
          <div>
            <h3 className="bg-[#0066b2] text-white font-bold p-2 mb-4">
              CERTIFICATIONS
            </h3>
            <div className="text-sm">
              {cvData.certifications.map((cert, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold mb-2">
                    {cert.platform} - {cert.name}
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {cert.outcomes.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
            </>
          }
            </div>
      </div>
    </div>
  );
}
