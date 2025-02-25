// components/JobListingForm.tsx

'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeContext } from '../context/Home';

const JobListingForm: React.FC = () => {
    const router = useRouter();
    const { resumeData, setResumeData } = useContext(ResumeContext);
    const [form, setForm] = useState({
        job_title: resumeData.job_listing?.job_title || '',
        company_name: resumeData.job_listing?.company_name || '',
        job_description: resumeData.job_listing?.job_description || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setResumeData((prev) => ({
            ...prev,
            job_listing: form,
        }));
        router.push('/resume');
    };

    return (
        <div className="max-w-xl mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-6">Job Listing Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">
                        Job Title
                    </label>
                    <input
                        type="text"
                        name="job_title"
                        id="job_title"
                        value={form.job_title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Position You're Applying For"
                    />
                </div>
                <div>
                    <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="company_name"
                        id="company_name"
                        value={form.company_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Company Name"
                    />
                </div>
                <div>
                    <label htmlFor="job_description" className="block text-sm font-medium text-gray-700">
                        Job Description
                    </label>
                    <textarea
                        name="job_description"
                        id="job_description"
                        value={form.job_description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe the job you're applying for"
                        rows={5}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                    Generate Resume
                </button>
            </form>
        </div>
    );
};

export default JobListingForm;