"use client";
import { useRef, useState, useEffect, } from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font 
} from '@react-pdf/renderer';
import { useCVStore } from '@/store';

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf', fontWeight: 600 }
  ]
})

// Define styles for PDF'
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Open Sans",
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
  },
  contact: {
    fontSize: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight:600,
    marginBottom: 10,
    marginTop: 5,
    borderBottom: 1,
    textTransform: "uppercase",
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.4,
  },
  content2: {
    fontSize: 10,
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 1.4,
    fontWeight: 600,
  },
  education: {
    marginBottom: 10,
  },
  schoolName: {
    fontSize: 10,
    fontWeight: 600,
  },
  degree: {
    fontSize: 10,
  },
  bullet: {
    marginLeft: 15,
    marginBottom: 5,
  },
  bulletContent: {
    flexDirection: "row",
  },
  bulletPoint: {
    width: 10,
    fontSize: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
  },
});

// Create PDF Document component
const CVDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName.toUpperCase()}</Text>
        <Text style={styles.contact}>
          {data.address} | {data.email} | {data.phoneNumber} | {data.linkedIn}
        </Text>
      </View>

      {/* Profile */}
      <View>
        <Text style={styles.sectionHeader}>PROFILE</Text>
        <Text style={styles.content}>{data.profileSummary}</Text>
      </View>

      {/* Education */}
      <View>
        <Text style={styles.sectionHeader}>EDUCATION</Text>
        <View style={styles.education}>
          <Text style={styles.schoolName}>{data.education.institution}</Text>
          <Text style={styles.degree}>
            {data.education.degree} | {data.education.startDate} - {data.education.endDate} | CGPA: {data.education.cgpa}
          </Text>
          {
            data.relevantCourseWork.length > 0 && <>
            <Text style={styles.content2}>Relevant Coursework:</Text>
          {data.relevantCourseWork.map((course, index) => (
            <View key={index} style={styles.bullet}>
              <View style={styles.bulletContent}>
                <Text style={styles.bulletPoint}>• </Text>
                <Text style={styles.bulletText}>{course}</Text>
              </View>
            </View>
          ))}
            </>
          }
        </View>
      </View>

      {/* Certifications */}
     {
      data.certifications.length > 0 && <>
       <Text style={styles.sectionHeader}>COURSES AND CERTIFICATIONS</Text>
      {data.certifications.map((cert, index) => (
        <View key={index} style={styles.education}>
          <Text style={styles.schoolName}>{cert.platform}</Text>
          <Text style={styles.degree}>{cert.name}</Text>
          {cert.outcomes.map((outcome, outcomeIndex) => (
            <View key={outcomeIndex} style={styles.bullet}>
              <View style={styles.bulletContent}>
                <Text style={styles.bulletPoint}>• </Text>
                <Text style={styles.bulletText}>{outcome}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
      </>
     }

      {/* Associations */}
    {
      data.associations.length > 0 && <>
        <View>
        <Text style={styles.sectionHeader}>ASSOCIATIONS</Text>
        {data.associations.map((association, index) => (
          <View key={index} style={styles.bullet}>
            <View style={styles.bulletContent}>
              <Text style={styles.bulletPoint}>• </Text>
              <Text style={styles.bulletText}>{association}</Text>
            </View>
          </View>
        ))}
      </View>

      </>
    }
      {/* Additional Skills */}
      <View>
        <Text style={styles.sectionHeader}>ADDITIONAL SKILLS</Text>
       {
        data.skills.technical.length > 0 && <>
         <Text style={styles.content2}>Technical Skills:</Text>
        {data.skills.technical.map((skill, index) => (
          <View key={index} style={styles.bullet}>
            <View style={styles.bulletContent}>
              <Text style={styles.bulletPoint}>• </Text>
              <Text style={styles.bulletText}>{skill}</Text>
            </View>
          </View>
        ))}
        </>
       }
        
        <Text style={styles.content2}>Soft Skills:</Text>
        <View style={styles.bullet}>
          <View style={styles.bulletContent}>
            <Text style={styles.bulletPoint}>• </Text>
            <Text style={styles.bulletText}>{data.skills.soft.join(', ')}</Text>
          </View>
        </View>

       {
        data.skills.tools.length > 0 && <>
         <Text style={styles.content2}>Tools:</Text>
        <View style={styles.bullet}>
          <View style={styles.bulletContent}>
            <Text style={styles.bulletPoint}>• </Text>
            <Text style={styles.bulletText}>{data.skills.tools.join(', ')}</Text>
          </View>
        </View>
        </>
       }
      </View>

      {/* Volunteer Work Section */}
     {
      data.volunteer.length > 0 && <>
      <View>
        <Text style={styles.sectionHeader}>VOLUNTEER WORK</Text>
        {data.volunteer.map((role, index) => (
          <View key={index} style={styles.education}>
            <Text style={styles.schoolName}>{role.position}</Text>
            <Text style={styles.degree}>
              {role.organization} | {role.startDate} - {role.endDate}
            </Text>
            {role.achievements.map((achievement, achievementIndex) => (
              <View key={achievementIndex} style={styles.bullet}>
                <View style={styles.bulletContent}>
                  <Text style={styles.bulletPoint}>• </Text>
                  <Text style={styles.bulletText}>{achievement}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
      </>
     }

      {/* Leadership Section */}
     {
      data.leadership.length > 0 && <>
      <View>
        <Text style={styles.sectionHeader}>LEADERSHIP</Text>
        {data.leadership.map((role, index) => (
          <View key={index} style={styles.education}>
            <Text style={styles.schoolName}>{role.position}</Text>
            <Text style={styles.degree}>
              {role.organization} | {role.startDate} - {role.endDate}
            </Text>
            {role.achievements.map((achievement, achievementIndex) => (
              <View key={achievementIndex} style={styles.bullet}>
                <View style={styles.bulletContent}>
                  <Text style={styles.bulletPoint}>• </Text>
                  <Text style={styles.bulletText}>{achievement}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
      </>
     }

      {/* Extracurricular Activities Section */}
     {
      data.extracurricular.length > 0 && <>
      <View>
        <Text style={styles.sectionHeader}>EXTRACURRICULAR ACTIVITIES</Text>
        {data.extracurricular.map((activity, index) => (
          <View key={index} style={styles.bullet}>
            <View style={styles.bulletContent}>
              <Text style={styles.bulletPoint}>• </Text>
              <Text style={styles.bulletText}>{activity}</Text>
            </View>
          </View>
        ))}
      </View>
      </>
     }

      {/* Awards Section */}
     {
      data.awards.length > 0 && <>
      <View>
        <Text style={styles.sectionHeader}>AWARDS</Text>
        {data.awards.map((award, index) => (
          <View key={index} style={styles.bullet}>
            <View style={styles.bulletContent}>
              <Text style={styles.bulletPoint}>• </Text>
              <Text style={styles.bulletText}>{award}</Text>
            </View>
          </View>
        ))}
      </View>
      </>
     }

      {/* Work Experience Section in PDF */}
     {
      data.experiences.length > 0 && <>
      <View>
        <Text style={styles.sectionHeader}>WORK EXPERIENCE</Text>
        {data.experiences.map((exp, index) => (
          <View key={index} style={styles.education}>
            <Text style={styles.schoolName}>{exp.role}</Text>
            <Text style={styles.degree}>
              {exp.company} | {exp.startDate} - {exp.endDate}
            </Text>
            {exp.responsibilities.map((responsibility, respIndex) => (
              <View key={respIndex} style={styles.bullet}>
                <View style={styles.bulletContent}>
                  <Text style={styles.bulletPoint}>• </Text>
                  <Text style={styles.bulletText}>{responsibility}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
      </>
     }
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
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 text-black" style={{
      fontFamily: 'Times New Roman, serif'
    }}>
      <div className="max-w-3xl mx-auto mb-4">
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
          <button className="bg-gray-400 text-white font-semibold py-2 px-4 rounded shadow" disabled>
            Loading PDF Generator...
          </button>
        )}
      </div>
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{cvData.fullName}</h1>
        <p className="text-sm">
          {cvData.address} | {cvData.email} | {cvData.phoneNumber} | {cvData.linkedIn}
        </p>
      </header>

      {/* Profile Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-black mb-4">PROFILE</h2>
        <p className="text-sm">
          {cvData.profileSummary}
        </p>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-black mb-4">EDUCATION</h2>
        
        <div className="mb-6">
          <h3 className="font-bold">{cvData.education.institution}</h3>
          <p className="text-sm">{cvData.education.degree}| {cvData.education.startDate} - {cvData.education.endDate} | {cvData.education.cgpa}</p>
         {
          cvData.relevantCourseWork.length > 0 && (
            <>
             <p className="font-bold text-sm mt-2">Relevant Coursework:</p>
          <ul className="list-disc list-inside text-sm ml-4 space-y-2">
          {
            cvData.relevantCourseWork.map((course, index) => (
              <li key={index}>{course}</li>
            ))
          }
          </ul>
            </>
          )
         }
        </div>

       {
        cvData.certifications.length > 0 && (
          <>
           <h2 className="text-lg font-bold border-b-2 border-black mb-4">COURSES AND CERTIFICATIONS</h2>

{
  cvData.certifications.map((cert, index) => (
    <div className="mb-6" key={index}>
  <h3 className="font-bold">{cert.platform}</h3>
  <p className="font-bold text-sm">{cert.name}</p>
  <ul className="list-disc list-inside text-sm ml-4 space-y-2">
    {
      cert.outcomes.map((outcome, index) => (
        <li key={index}>{outcome}</li>
      ))
    }
  </ul>
</div>
  ))
}

          </>
        )
       }
      </section>

      {/* Associations Section */}
     {
      cvData.associations.length > 0 && (
        <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-black mb-4">ASSOCIATIONS</h2>
        <ul className="list-none space-y-4 text-sm">
        {
          cvData.associations.map((assoc, index) => (
            <li key={index}>{assoc}</li>
          ))
        }
        </ul>
      </section>
      )
     }

      {/* Additional Skills Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-black mb-4">SKILLS</h2>
        
       {
        cvData.skills.technical.length > 0 && <>
         <p className="font-bold text-sm">Technical Skills:</p>
        <ul className="list-disc list-inside text-sm ml-4">
        {
          cvData.skills.technical.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))
        }
        </ul>
        </>
       }

<div className="mb-4">
          <p className="font-bold text-sm">Soft Skills:</p>
            <ul className="list-disc list-inside text-sm ml-4">
            {
              cvData.skills.soft.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            }
          </ul>
        </div>

       {
        cvData.skills.tools.length > 0 && <>

        <div>
          <p className="font-bold text-sm">Tools:</p>
          <ul className="list-disc list-inside text-sm ml-4">
          {
            cvData.skills.tools.map((tool, index) => (
              <li key={index}>{tool}</li>
            ))
          }
          </ul>
        </div>
        </>
       }
      </section>

      {/* Volunteer Work Section */}
      {cvData.volunteer.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-black mb-4">VOLUNTEER WORK</h2>
          {cvData.volunteer.map((role, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold">{role.position}</h3>
              <p className="text-sm">{role.organization} | {role.startDate} - {role.endDate}</p>
              {role.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm ml-4 space-y-2 mt-2">
                  {role.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Leadership Section */}
      {cvData.leadership.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-black mb-4">LEADERSHIP</h2>
          {cvData.leadership.map((role, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold">{role.position}</h3>
              <p className="text-sm">{role.organization} | {role.startDate} - {role.endDate}</p>
              {role.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm ml-4 space-y-2 mt-2">
                  {role.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Extracurricular Activities Section */}
      {cvData.extracurricular.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-black mb-4">EXTRACURRICULAR ACTIVITIES</h2>
          <ul className="list-disc list-inside text-sm ml-4 space-y-2">
            {cvData.extracurricular.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Awards Section */}
      {cvData.awards.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-black mb-4">AWARDS</h2>
          <ul className="list-disc list-inside text-sm ml-4 space-y-2">
            {cvData.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Work Experience Section in HTML preview */}
      {cvData.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-black mb-4">WORK EXPERIENCE</h2>
          {cvData.experiences.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold">{exp.role}</h3>
              <p className="text-sm">{exp.company} | {exp.startDate} - {exp.endDate}</p>
              {exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside text-sm ml-4 space-y-2 mt-2">
                  {exp.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex}>{responsibility}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  </div>
  );
}
