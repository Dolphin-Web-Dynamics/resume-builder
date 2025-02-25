// components/ResumeDisplay.tsx

'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ResumeContext } from '@/context/Home';
import { ClassicTemplate, ModernTemplate, CustomTemplate } from './templates';
import { PrinterIcon } from '@heroicons/react/24/solid';
import SidebarPanel from './SidebarPanel';

const ResumeDisplay: React.FC = () => {
    const { resumeData } = useContext(ResumeContext);
    const [isDesktop, setIsDesktop] = useState<boolean>(true);

    // Determine if the device is considered a desktop.
    useEffect(() => {
        const checkIfDesktop = () => {
            // You can adjust the breakpoint (here: 1024px) as needed.
            setIsDesktop(window.innerWidth >= 1280);
        };

        checkIfDesktop();
        window.addEventListener('resize', checkIfDesktop);
        return () => window.removeEventListener('resize', checkIfDesktop);
    }, []);

    // If not on desktop, show a message indicating that the app is supported on desktops only.
    if (!isDesktop) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-pulse">
                    Desktop Only
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                    This resume builder is supported on desktop devices only.
                </p>
                <p className="text-sm text-gray-500">
                    Please switch to a desktop computer to access all features.
                </p>
            </div>
        );
    }

    const renderTemplate = () => {
        switch (resumeData.selectedTemplate) {
            case 'modern':
                return <ModernTemplate data={resumeData} />;
            case 'classic':
                return <ClassicTemplate data={resumeData} />;
            case 'custom':
                return <CustomTemplate data={resumeData} />;
            default:
                return <p>Template not found.</p>;
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="grid grid-cols-4 gap-4">
            {/* Left Panel: Sidebar with selectors */}
            <div className="col-span-1">
                <SidebarPanel />
            </div>

            {/* Right Panel: Resume Preview */}
            <div className="col-span-3 place-self-center">
                <div className="bg-gray-100 min-h-screen w-[calc(8.5in)] print:w-full print:m-0 grid print:visible">
                    {/* Print button */}
                    <div className="flex justify-end mb-4 print:hidden">
                        <button
                            onClick={handlePrint}
                            className="fixed bottom-8 mr-2 flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            aria-label="Print Resume"
                        >
                            <PrinterIcon className="h-5 w-5 mr-2" />
                            Print Resume
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-md print:visible print:[&_*]:visible max-w-[8.5in] w-full">
                        <div
                            className="w-full print:absolute print:left-0 print:top-0 print:w-full"
                            style={{ padding: `${resumeData.resumeMargin || 0.1}in` }}
                        >
                            {resumeData.selectedTemplate ? (
                                renderTemplate()
                            ) : (
                                <p className="text-center">
                                    Select a template to preview your resume.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeDisplay;