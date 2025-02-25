// components/templates/ModernTemplate.tsx

import React from 'react';
import SkillsTable, { Skill } from '../SkillsTable';
import { ResumeData } from '@/components/types/resume';
import ReactMarkDown from 'react-markdown';

interface ModernTemplateProps {
  data: ResumeData;
}

// Utility function to simplify the URL
const simplifyUrl = (url: string) => {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
};

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const skills: Skill[] = (data.skills || []).map((skill) =>
    typeof skill === 'string' ? { technology: skill, is_relevant: true } : (skill as Skill)
  );
  return (
    <>
      {/* // The container class here enforces a consistent max-width (if you have container sizes defined)
      // You can adjust the container’s max-width in your Tailwind config or add a specific max-w-* class. */}
      {/* Header Section */}
      < header className="w-full flex items-center justify-between print:visible" >
        <div className="w-1/2 flex-shrink-0">
          <h1 className="text-4xl font-bold">{data.candidate_name}</h1>
          <p className="text-md font-semibold text-gray-600">{data.candidate_title}</p>
        </div>
        <div className="w-1/2 flex-shrink-0 text-right">
          {data.linkedin && (
            <a href={data.linkedin} className="text-blue-500 underline">
              {simplifyUrl(data.linkedin)}
            </a>
          )}
          <p className="text-sm text-gray-600">{data.email}</p>
          <p className="text-sm text-gray-600">{data.phone}</p>
          <p className="text-sm text-gray-600">{data.location}</p>
        </div>
      </header >

      {/* Skills and Job Listing */}
      {/* <h2 className="text-lg uppercase font-semibold ">Skills</h2> */}
      <div className="flex w-full print:visible mt-1">
        <section className="mb-3 print:visible w-full">
          <SkillsTable skills={skills} bulletType="solid" />
        </section>
      </div>

      {/* Work Experience */}
      < section className="mb-6 print:visible" >
        {/* <h2 className="text-lg uppercase font-semibold">Work Experience</h2> */}
        <hr className="mb-2" />
        {data.work_experience.map((job, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold">{job.job_title}</h3>
            <p className="text-sm text-gray-600">
              {job.company_name} | {job.start_year} - {job.end_year}
            </p>
            <ul className="list-disc list-inside mt-2 ml-5">
              {job.bullet_points.map((point, idx) => (
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
            <p className="text-sm text-gray-600 mt-1 ml-5">
              <strong>Stack:</strong>{' '}
              {job?.stack?.map((tech, idx) => (
                <span key={idx} className={tech.is_relevant ? 'font-bold' : ''}>
                  {tech.technology}
                  {idx < job.stack.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        ))
        }
      </section >

      <hr className="mb-2" />

      {/* Education and Certifications */}
      < section className=" print:visible" >
        {/* <h2 className="text-xl font-semibold mb-2">Education and Certifications</h2> */}
        {
          data.education_certifications.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{edu.degree}</strong> - {edu.school_name}
              </p>
              {edu.notable_achievements && (
                <ul className=" list-inside ml-5">
                  {edu.notable_achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        }
        <div>
          {/* <strong>Certifications:</strong> */}
          <ul className=" list-inside mt-1 ml-5">
            {data.education_certifications.certifications.map((cert, index) => (
              <li key={index}>
                {cert.certification_name} - {cert.issuing_organization}
              </li>
            ))}
          </ul>
        </div>
      </section >
    </>
  );
};

export default ModernTemplate;