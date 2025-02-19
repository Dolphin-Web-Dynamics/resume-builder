// components/CustomTemplate.tsx

import React from 'react';
import Image from 'next/image';
import { ResumeData } from '../../types/resume';
import SkillsTable from '../SkillsTable';
import ReactMarkdown from 'react-markdown';

interface CustomTemplateProps {
    data: ResumeData;
}

const CustomTemplate: React.FC<CustomTemplateProps> = ({ data }) => {
    // Fallback size if candidate_image_size is not set
    const imageSize = data.candidate_image_size || 80;

    return (
        <div className="text-black-900">
            {/* Header with candidate info on the left and candidate image (logo) on the right */}
            <header className="flex justify-between items-start">
                <div className="flex flex-col">
                    <h1 className="text-[36px] font-bold text-left -my-[8px]">
                        {data.candidate_name}
                    </h1>
                    {data.candidate_title && (
                        <h2 className="text-[22px] text-left font-semibold">
                            {data.candidate_title}
                        </h2>
                    )}
                    {data.email && (
                        <a
                            href={`mailto:${data.email}`}
                            className="italic text-[14px] underline text-left text-blue-700"
                        >
                            {data.email}
                        </a>
                    )}
                </div>
                {data.candidate_image && (
                    <div className="mr-16 -mt-4">
                        <Image
                            src={data.candidate_image}
                            alt="Candidate Logo"
                            width={imageSize}
                            height={imageSize}
                            className="object-contain"
                            unoptimized={true} // use only if necessary (e.g., blob URLs)
                        />
                    </div>
                )}
            </header>

            {/* Main Body Content */}
            <main className="mt-2 text-[14px]">
                {data.skills && data.skills.length > 0 && (
                    <section className="mb-3 print:visible">
                        <h3 className="font-bold uppercase text-base">Skills</h3>
                        <SkillsTable skills={data.skills} bulletType="solid" />
                    </section>
                )}

                {/* Work Experience Section */}
                {data.work_experience && data.work_experience.length > 0 && (
                    <section className="mb-4">
                        <h3 className="font-bold uppercase text-base">Work Experience</h3>
                        {data.work_experience.map((job, index) => (
                            <div key={index} className="mb-1">
                                <span className="font-medium text-lg">
                                    {job.job_title} at {job.company_name}
                                </span>
                                <span className='ml-2 before:content-["|"] before:mr-2 '>
                                    {job.start_year} - {job.end_year}
                                </span>
                                {job.bullet_points && (
                                    <ul className="list-disc list-inside">
                                        {job.bullet_points.map((point, idx) => (
                                            <li key={idx} className="ml-5">
                                                <ReactMarkdown
                                                    components={{
                                                        // Render paragraphs as a span to avoid extra margins
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        p: ({ node, ...props }) => <span {...props} />
                                                    }}
                                                >
                                                    {point}
                                                </ReactMarkdown>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {job.stack && job.stack.length > 0 && (
                                    <p className=" text-[14px]">
                                        <strong className='ml-5'>Stack:</strong>{' '}
                                        {job?.stack?.map((tech, idx) => (
                                            <span key={idx} className={tech.is_relevant ? 'font-bold' : ''}>
                                                {tech.technology}
                                                {idx < job.stack.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Education and Certifications Section */}
                {data.education_certifications && (
                    <section className="mb-4">
                        <h3 className="font-bold uppercase text-base">Education and Certifications</h3>
                        {/* Education */}
                        {data.education_certifications.education && data.education_certifications.education.map((edu, index) => (
                            <div key={index} className="mb-1">
                                <p>
                                    <strong>{edu.degree}</strong> - {edu.school_name}
                                </p>
                            </div>
                        ))}

                        {/* Certifications */}
                        {data.education_certifications.certifications && data.education_certifications.certifications.map((cert, index) => (
                            <div key={index}>
                                <p className="ml-5">
                                    {cert.certification_name} - {cert.issuing_organization}
                                </p>
                            </div>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
};

export default CustomTemplate;