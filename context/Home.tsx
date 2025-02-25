// context/ResumeContext.tsx

'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ResumeData } from '@/types/resume';

interface ResumeContextProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const defaultResumeData: ResumeData = {
    candidate_name: '',
    candidate_title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    skills: [],
    work_experience: [],
    education_certifications: {
        education: [],
        certifications: [],
    },
    selectedTemplate: '', // <-- Added property here
    candidate_image: '',  // <-- If needed
};

export const ResumeContext = createContext<ResumeContextProps>({
    resumeData: defaultResumeData,
    setResumeData: () => { },
});

export const Home: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/data.json');
                if (!res.ok) {
                    throw new Error('Failed to fetch data.');
                }
                const data: ResumeData = await res.json();
                setResumeData(data);
            } catch (error) {
                console.error('Error fetching resume data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData }}>
            {children}
        </ResumeContext.Provider>
    );
};