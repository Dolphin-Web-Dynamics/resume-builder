// types/resume.ts

export interface Skill {
    technology: string;
    is_relevant: boolean;
}

export interface WorkExperience {
    job_title: string;
    company_name: string;
    start_year?: string;
    end_year?: string;
    bullet_points: string[];
    stack: Skill[];
}

export interface Education {
    degree: string;
    school_name: string;
    start_year?: string;
    end_year?: string;
    notable_achievements?: string[];
}

export interface Certification {
    certification_name: string;
    issuing_organization: string;
    year_earned?: string;
}

export interface EducationCertifications {
    education: Education[];
    certifications: Certification[];
}

export interface JobListing {
    job_title: string;
    company_name: string;
    job_description: string;
}

export interface ResumeData {
    candidate_name: string;
    candidate_title: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    selectedTemplate?: string;
    job_listing?: JobListing;
    skills: Skill[];
    work_experience: WorkExperience[];
    education_certifications: EducationCertifications;
    candidate_image?: string;
    candidate_image_size?: number;
    resumeMargin?: number;
}