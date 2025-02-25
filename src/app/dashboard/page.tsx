'use client';

import React, { useState, useEffect } from 'react';
import { UserIcon, BriefcaseIcon, AcademicCapIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
// import ProfileSection from '@/src/components/ProfileSection';
// import ExperienceSection from '@/src/components/ExperienceSection';
// Import additional sections when they're ready
// import DegreeSection from '@/src/components/DegreeSection';
// import CertificationSection from '@/src/components/CertificationSection';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

const sections = [
    { name: 'Profile', icon: UserIcon },
    { name: 'Experiences', icon: BriefcaseIcon },
    { name: 'Degrees', icon: AcademicCapIcon },
    { name: 'Certifications', icon: CheckBadgeIcon },
];

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('Profile');
    const [profile, setProfile] = useState<Schema['Profile']['type'] | null>(null);
    const [experiences, setExperiences] = useState<Schema['Experience']['type'][]>([]);
    // Add these states for degrees and certifications when ready:
    // const [degrees, setDegrees] = useState<Schema['Degree']['type'][]>([]);
    // const [certifications, setCertifications] = useState<Schema['Certification']['type'][]>([]);

    // Fetch functions
    const fetchProfile = async () => {
        const { data: profiles, errors } = await client.models.Profile.list({ limit: 1 });
        if (errors) {
            console.error('Error fetching profile:', errors);
            return;
        }
        setProfile(profiles.length > 0 ? profiles[0] : null);
    };


    // For degrees and certifications, define similar functions:
    // const fetchDegrees = async () => { ... };
    // const fetchCertifications = async () => { ... };

    const fetchExperiences = () => {
        const sub = client.models.Experience.observeQuery().subscribe({
            next: ({ items }) => {
                setExperiences([...items]);
            },
        });
        return () => sub.unsubscribe();
    };

    useEffect(() => {
        fetchProfile();
        const unsubscribe = fetchExperiences();
        // fetchDegrees();
        // fetchCertifications();

        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     if (profile) {
    //         setProfile
    //         // fetchDegrees();
    //         // fetchCertifications();
    //     }
    // }, [profile])



    const renderSection = () => {
        switch (activeSection) {
            case 'Profile':
                return (
                    <>
                    </>
                    // <ProfileSection
                    //     profile={profile}
                    //     refreshProfile={fetchProfile}
                    // />
                );
            case 'Experiences':
                return (
                    <>
                    </>
                    // <ExperienceSection
                    //     profile={profile}
                    //     experiences={experiences}
                    //     refreshExperiences={fetchExperiences}
                    // />
                );
            // case 'Degrees':
            //   return <DegreeSection profile={profile} degrees={degrees} refreshDegrees={fetchDegrees} />;
            // case 'Certifications':
            //   return <CertificationSection profile={profile} certifications={certifications} refreshCertifications={fetchCertifications} />;
            default:
                return <ProfileSection profile={profile} refreshProfile={fetchProfile} />;
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <nav>
                    <ul>
                        {sections.map(section => (
                            <li key={section.name} className="mb-2">
                                <button
                                    className={`flex items-center p-2 w-full text-left rounded hover:bg-gray-200 ${activeSection === section.name ? 'bg-gray-200' : ''
                                        }`}
                                    onClick={() => setActiveSection(section.name)}
                                >
                                    <section.icon className="h-5 w-5 mr-2" />
                                    <span>{section.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 overflow-auto">{renderSection()}</main>
        </div>
    );
}