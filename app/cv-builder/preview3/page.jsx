"use client";
import { useRef, useState, useEffect, } from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  Link,
} from '@react-pdf/renderer';
import { useCVStore } from '@/store';

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf', fontWeight: 600 }
  ]
})


const styles = StyleSheet.create({
  page: {
    fontFamily: 'Open Sans',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  leftColumn: {
    width: '60%',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  rightColumn: {
    width: '40%',
    padding: 20,
    backgroundColor: '#e08500',
    color: 'white ',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#e08500',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#e08500',
    borderBottom: '1px solid #e08500',
    paddingBottom: 2,
  },
  sectionTitle2: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
    borderBottom: '1px solid white',
    paddingBottom: 2,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333333',
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
    marginLeft: 10,
    color: '#333333',
  },
  listItem2: {
    fontSize: 12,
    marginBottom: 3,
    marginLeft: 10,
    color: 'white',
  },
  rightColumnText: {
    fontSize: 12,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 600,
  },
  certName: {
    fontSize: 12,
    marginBottom: 5,
    color: 'white',
    fontWeight: 600,
  },
  experienceHeader: {
    fontSize: 12,
    marginBottom: 5,
    color: 'black',
    fontWeight: 600,
  },
  platform: {
    fontSize: 12,
    marginBottom: 5,
    color: 'white',
    fontWeight: 600,
  },
  skillsHeader: {
    fontSize: 12,
    marginBottom: 5,
    color: 'white',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
});


// Create PDF Document component
const CVDocument = ({ data }) => (
 
  <Document>
  <Page size="A4" style={styles.page}>
    {/* Left Column */}
    <View style={styles.leftColumn}>
      <Text style={styles.header}>{data.fullName}</Text>

      {/* Profile Summary */}
      {data.profileSummary && (
        <View>
          <Text style={styles.sectionTitle}>OBJECTIVE</Text>
          <Text style={styles.text}>{data.profileSummary}</Text>
        </View>
      )}

      {/* Education */}
      {data.education && (
        <View>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          <Text style={[styles.text, styles.boldText]}>
            {data.education.degree}, {data.education.institution} - Expected{" "}
            {data.education.endDate}
          </Text>
          <Text style={styles.text}>CGPA: {data.education.cgpa}</Text>
          {data.relevantCourseWork?.length > 0 && (
            <View>
              <Text style={[styles.text, styles.boldText]}>
                RELEVANT COURSEWORK:
              </Text>
              {data.relevantCourseWork.map((course, index) => (
                <Text key={index} style={styles.listItem}>
                  • {course}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Work Experience */}
      {data.experiences?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experiences.map((experience, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={[styles.text, styles.boldText]}>
                {experience.role}
              </Text>
              <Text style={styles.text}>{experience.company}</Text>
              <Text style={styles.text}>
                {experience.startDate} - {experience.endDate}
              </Text>
              {experience.responsibilities.map((task, i) => (
                <Text key={i} style={styles.listItem}>
                  • {task}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

    {/* Professional Associations */}
{data.associations?.length > 0 && (
  <View>
    <Text style={styles.sectionTitle}>PROFESSIONAL ASSOCIATIONS</Text>
    {data.associations.map((association, index) => (
      <Text key={index} style={styles.listItem}>
        • {association}
      </Text>
    ))}
  </View>
)}

{/* Volunteer Experience */}
{data.volunteer?.length > 0 && (
  <View>
    <Text style={styles.sectionTitle}>VOLUNTEER EXPERIENCE</Text>
    {data.volunteer.map((role, index) => (
      <View key={index} style={{ marginBottom: 10 }}>
        <Text style={styles.experienceHeader}>{role.position}</Text>
        <Text style={styles.experienceHeader}>{role.organization}</Text>
        <Text style={styles.text}>
          {role.startDate} - {role.endDate}
        </Text>
        {role.achievements?.length > 0 && (
          <View style={{ marginTop: 5 }}>
            {role.achievements.map((achievement, i) => (
              <Text key={i} style={styles.listItem}>
                • {achievement}
              </Text>
            ))}
          </View>
        )}
      </View>
    ))}
  </View>
)}

{data.leadership?.length > 0 && (
  <View>
    <Text style={styles.sectionTitle}>LEADERSHIP EXPERIENCE</Text>
    {data.leadership.map((role, index) => (
      <View key={index} style={{ marginBottom: 10 }}>
        <Text style={styles.experienceHeader}>{role.position}</Text>
        <Text style={styles.experienceHeader}>{role.organization}</Text>
        <Text style={styles.text}>
          {role.startDate} - {role.endDate}
        </Text>
        {role.achievements?.length > 0 && (
          <View style={{ marginTop: 5 }}>
            {role.achievements.map((achievement, i) => (
              <Text key={i} style={styles.listItem}>
                • {achievement}
              </Text>
            ))}
          </View>
        )}
      </View>
    ))}
  </View>
)}


{/* Awards */}
{data.awards?.length > 0 && (
  <View>
    <Text style={styles.sectionTitle}>AWARDS</Text>
    {data.awards.map((award, index) => (
      <Text key={index} style={styles.listItem}>
        • {award}
      </Text>
    ))}
  </View>
)}

{/* Extracurricular Activities */}
{data.extracurricular?.length > 0 && (
  <View>
    <Text style={styles.sectionTitle}>EXTRACURRICULAR ACTIVITIES</Text>
    {data.extracurricular.map((activity, index) => (
      <Text key={index} style={styles.listItem}>
        • {activity}
      </Text>
    ))}
  </View>
)}

    </View>

    {/* Right Column */}
    <View style={styles.rightColumn}>
      <Text style={styles.rightColumnText}>{data.address}</Text>
      <Text style={styles.rightColumnText}>{data.phoneNumber}</Text>
      <Text style={styles.rightColumnText}>{data.email}</Text>
      {data.linkedIn && (
        <Link src={data.linkedIn} style={styles.rightColumnText}>
          {data.linkedIn}
        </Link>
      )}

      {/* Skills */}
      {data.skills && (
  <View>
    <Text style={styles.sectionTitle2}>SKILLS</Text>

    {/* Technical Skills */}
    {data.skills.technical?.length > 0 && (
      <View>
        <Text style={[styles.skillsHeader, { marginBottom: 5 }]}>
          TECHNICAL SKILLS
        </Text>
        {data.skills.technical.map((skill, index) => (
          <Text key={index} style={styles.listItem2}>
            • {skill}
          </Text>
        ))}
      </View>
    )}

    {/* Soft Skills */}
    {data.skills.soft?.length > 0 && (
      <View>
        <Text style={[styles.skillsHeader, { marginBottom: 5 }]}>
          SOFT SKILLS
        </Text>
        {data.skills.soft.map((skill, index) => (
          <Text key={index} style={styles.listItem2}>
            • {skill}
          </Text>
        ))}
      </View>
    )}

    {/* Tools */}
    {data.skills.tools?.length > 0 && (
      <View>
        <Text style={[styles.skillsHeader, { marginBottom: 5 }]}>
          TOOLS
        </Text>
        {data.skills.tools.map((tool, index) => (
          <Text key={index} style={styles.listItem2}>
            • {tool}
          </Text>
        ))}
      </View>
    )}
  </View>
)}


      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle2}>CERTIFICATIONS</Text>
          {data.certifications.map((cert, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={styles.certName}>
                {cert.name}
              </Text>
              <Text style={styles.platform}>{cert.platform}</Text>
              {cert.outcomes.map((outcome, i) => (
                <Text key={i} style={styles.listItem2}>
                  • {outcome}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
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
    <div className="max-w-6xl mx-auto shadow-lg">
  {PDFDownloadLink ? (
    <PDFDownloadLink
      document={<CVDocument data={cvData} />}
      fileName="cv.pdf"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-150 ease-in-out"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Generating PDF...' : 'Download PDF'
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
  <div className="grid grid-cols-5">
    {/* Left Column */}
    <div className="col-span-3 p-8 bg-white">
      <h1 className="text-4xl font-bold text-amber-600 mb-6">
        {cvData.fullName}
      </h1>

      {cvData.profileSummary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-600 border-b border-amber-600 pb-1 mb-3">
            OBJECTIVE
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {cvData.profileSummary}
          </p>
        </section>
      )}

      {cvData.education && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-600 border-b border-amber-600 pb-1 mb-3">
            EDUCATION
          </h2>
          <h3 className="text-lg font-semibold mb-1 text-black">
            {cvData.education.degree}, {cvData.education.institution},{" "}
            Expected in {cvData.education.endDate}
          </h3>
          <p className="text-sm text-gray-700 font-bold">
            CGPA: {cvData.education.cgpa}
          </p>

          {cvData.relevantCourseWork?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-1 text-black">
                Relevant Coursework
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {cvData.relevantCourseWork.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {cvData.associations?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-600 border-b border-amber-600 pb-1 mb-3">
            PROFESSIONAL ASSOCIATIONS
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {cvData.associations.map((association, index) => (
              <li key={index}>{association}</li>
            ))}
          </ul>
        </section>
      )}

      {cvData.experiences?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-600 border-b border-amber-600 pb-1 mb-3">
            WORK EXPERIENCE
          </h2>
          {cvData.experiences.map((experience, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-black">
                {experience.role}
              </h3>
              <p className="text-sm text-gray-700">{experience.company}</p>
              <p className="text-sm italic text-gray-700">
                {experience.startDate} - {experience.endDate}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-2">
                {experience.responsibilities.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {cvData.volunteer?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-600 border-b border-amber-600 pb-1 mb-3">
            VOLUNTEER EXPERIENCE
          </h2>
          {cvData.volunteer.map((role, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-black">
                {role.position}
              </h3>
              <p className="text-sm text-gray-700">{role.organization}</p>
              <p className="text-sm italic text-gray-700">
                {role.startDate} - {role.endDate}
              </p>
              <ul className="text-sm space-y-1 mt-2 text-gray-700">
                {role.achievements.map((achievement, i) => (
                  <li key={i}>• {achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

{cvData.leadership?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-600 border-b border-amber-600 pb-1 mb-3">
            LEADERSHIP EXPERIENCE
          </h2>
          {cvData.leadership.map((role, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-black">
                {role.position}
              </h3>
              <p className="text-sm text-gray-700">{role.organization}</p>
              <p className="text-sm italic text-gray-700">
                {role.startDate} - {role.endDate}
              </p>
              <ul className="text-sm space-y-1 mt-2 text-gray-700">
                {role.achievements.map((achievement, i) => (
                  <li key={i}>• {achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {cvData.awards?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-600 border-b border-amber-600 pb-1 mb-3">
            AWARDS
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {cvData.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </section>
      )}

      {cvData.extracurricular?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-600 border-b border-amber-600 pb-1 mb-3">
            EXTRACURRICULAR ACTIVITIES
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {cvData.extracurricular.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </section>
      )}
    </div>

    {/* Right Column */}
    <div className="col-span-2 p-8 bg-amber-600 text-white">
      <div className="mb-6 text-sm">
        <p>{cvData.address}</p>
        <p>{cvData.phoneNumber}</p>
        <p>{cvData.email}</p>
        <p>
          <a href={cvData.linkedIn} className="text-white underline">
            {cvData.linkedIn}
          </a>
        </p>
      </div>

      {cvData.skills && (
  <section className="mb-6">
    <h2 className="text-xl font-bold border-b border-white pb-1 mb-3">
      SKILLS
    </h2>

    {/* Technical Skills */}
    {cvData.skills.technical?.length > 0 && (
      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Technical Skills</h3>
        <ul className="text-sm space-y-1">
          {cvData.skills.technical.map((skill, index) => (
            <li key={index}>• {skill}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Soft Skills */}
    {cvData.skills.soft?.length > 0 && (
      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Soft Skills</h3>
        <ul className="text-sm space-y-1">
          {cvData.skills.soft.map((skill, index) => (
            <li key={index}>• {skill}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Tools */}
    {cvData.skills.tools?.length > 0 && (
      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Tools</h3>
        <ul className="text-sm space-y-1">
          {cvData.skills.tools.map((tool, index) => (
            <li key={index}>• {tool}</li>
          ))}
        </ul>
      </div>
    )}
  </section>
)}


      {cvData.certifications?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-white pb-1 mb-3">
            CERTIFICATIONS
          </h2>
          {cvData.certifications.map((cert, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold mt-2 mb-1">
                {cert.name}
              </h3>
              <p className="text-sm mb-2">{cert.platform}</p>
              <ul className="text-sm space-y-1">
                {cert.outcomes.map((outcome, i) => (
                  <li key={i}>• {outcome}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  </div>
</div>

  );
}
