import React from 'react';
import { ResumeData } from '../../types/resume';
import SkillsTable, { Skill } from '../SkillsTable';
import ReactMarkDown from 'react-markdown';

interface ClassicTemplateProps {
  data: ResumeData;
}

// Utility function to simplify the URL
const simplifyUrl = (url: string) => {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
};

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const skills: Skill[] = (data.skills || []).map((skill) =>
    typeof skill === 'string' ? { technology: skill, is_relevant: true } : (skill as Skill)
  );

  return (
    <>
      {/* Header Section */}
      <header className="text-center print:visible">
        <h1 className="text-3xl font-bold">{data.candidate_name}</h1>
        <p className="text-md text-gray-600">
          {data.email} &middot; {data.phone} &middot; {data.location} &middot;{' '}
          {data.linkedin && (
            <a href={data.linkedin} className="text-blue-500 underline">
              {simplifyUrl(data.linkedin)}
            </a>
          )}
        </p>
      </header>

      {/* Skills Section */}
      <section className="mb-3 print:visible">
        <h2 className="text-l uppercase font-semibold">Skills</h2>
        <hr className="mb-2" />
        <SkillsTable skills={skills} bulletType="solid" />
      </section>

      {/* Work Experience */}
      <section className="mb-6 print:visible">
        <h2 className="text-l uppercase font-semibold">Work Experience</h2>
        <hr className="mb-2" />
        {data.work_experience.map((job, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{job.job_title}</h3>
            <p className="text-sm text-gray-600">
              {job.company_name} | {job.start_year} - {job.end_year}
            </p>
            <ul className="list-disc list-inside mt-2 ml-5">
              {job.bullet_points.map((point: string, idx: number) => (
                <li key={idx}>
                  <ReactMarkDown
                    components={{
                      // Render paragraphs as a span to avoid extra margins
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      p: ({ node, ...props }) => <span {...props} />
                    }}
                  >
                    {point}
                  </ReactMarkDown>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              <strong className='ml-5'>Stack:</strong>{' '}
              {job?.stack?.map((tech, idx) => (
                <span key={idx} className={tech.is_relevant ? 'font-bold' : ''}>
                  {tech.technology}
                  {idx < job.stack.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="print:visible">
        <h2 className="text-l uppercase font-semibold">Education and Certifications</h2>
        <hr className="mb-2" />
        {data.education_certifications.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>{edu.degree}</strong> - {edu.school_name}
            </p>
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      <section className="print:visible">
        {data.education_certifications.certifications &&
          data.education_certifications.certifications.map((cert, index) => (
            <div key={index} className="">
              <p className='ml-5'>
                {cert.certification_name} - {cert.issuing_organization}
              </p>
            </div>
          ))}
      </section>
    </>
  );
};

export default ClassicTemplate;