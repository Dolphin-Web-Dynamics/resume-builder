// components/PersonalProfileForm.tsx

'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeContext } from '../context/Home';

const PersonalProfileForm: React.FC = () => {
    const router = useRouter();
    const { resumeData, setResumeData } = useContext(ResumeContext);
    const [form, setForm] = useState({
        candidate_name: resumeData.candidate_name || '',
        candidate_title: resumeData.candidate_title || '',
        email: resumeData.email || '',
        phone: resumeData.phone || '',
        location: resumeData.location || '',
        linkedin: resumeData.linkedin || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setResumeData((prev: typeof resumeData) => ({
            ...prev,
            ...form,
        }));
        router.push('/job');
    };

    return (
        <div className="max-w-xl mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-6">Personal Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="candidate_name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="candidate_name"
                        id="candidate_name"
                        value={form.candidate_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label htmlFor="candidate_title" className="block text-sm font-medium text-gray-700">
                        Professional Title
                    </label>
                    <input
                        type="text"
                        name="candidate_title"
                        id="candidate_title"
                        value={form.candidate_title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Software Engineer"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="(123) 456-7890"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={form.location}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., New York, NY"
                    />
                </div>
                <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                        LinkedIn Profile
                    </label>
                    <input
                        type="url"
                        name="linkedin"
                        id="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default PersonalProfileForm;