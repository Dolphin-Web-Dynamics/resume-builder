// src/app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { UserIcon, BriefcaseIcon, AcademicCapIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import ProfileSelector from '@/components/ProfileSelector';
import Experiences from '@/components/Experiences';
import Profiles from '@/components/Profiles';
import type { Schema } from '@/amplify/data/resource';


// Import DegreeSection and CertificationSection when they are ready

const sections = [
    { name: 'Profiles', icon: UserIcon },
    { name: 'Experiences', icon: BriefcaseIcon },
    { name: 'Degrees', icon: AcademicCapIcon },
    { name: 'Certifications', icon: CheckBadgeIcon },
];

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('Profiles');
    const [selectedProfile, setSelectedProfile] = useState<Schema['Profile']['type'] | null>(null);

    const renderSection = () => {
        switch (activeSection) {
            case 'Profiles':
                return (
                    <>
                        {/* You can add a Profiles component or other profile details here */}
                        <Profiles />
                    </>
                );
            case 'Experiences':
                return (
                    <>
                        <Experiences selectedProfile={selectedProfile} />
                    </>
                );
            // Uncomment and implement when ready:
            // case 'Degrees':
            //   return <DegreeSection selectedProfile={selectedProfile} />;
            // case 'Certifications':
            //   return <CertificationSection selectedProfile={selectedProfile} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <nav>
                    <ul>
                        {sections.map((section) => (
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
            <main className="flex-1 p-6 overflow-auto">
                {activeSection !== 'Profiles' && (
                    <div className="w-48">
                        <ProfileSelector
                            selectedProfile={selectedProfile}
                            onProfileChange={setSelectedProfile}
                        />
                    </div>
                )}
                {renderSection()}
            </main>
        </div>
    );
}