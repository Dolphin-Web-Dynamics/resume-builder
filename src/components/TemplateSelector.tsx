// components/TemplateSelector.tsx

'use client';

import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { ResumeContext } from '../context/Home';
import { SingleValue } from 'react-select';


// Dynamically import react-select with SSR disabled.
const DynamicSelect = dynamic(() => import('react-select'), { ssr: false });

interface Template {
    id: string;
    name: string;
    preview?: string; // URL to a preview image
}

interface OptionType {
    value: string;
    label: string;
}

const templates: Template[] = [
    {
        id: 'classic',
        name: 'Classic',
        preview: '/templates/classic-preview.png',
    },
    {
        id: 'modern',
        name: 'Modern',
        preview: '/templates/modern-preview.png',
    },
    {
        id: 'custom',
        name: 'Custom',
        preview: '/templates/custom-preview.png',
    },
    // Add more templates as needed
];

const TemplateSelector: React.FC = () => {
    const { setResumeData } = useContext(ResumeContext);

    const handleSelect = (templateId: string) => {
        setResumeData((prev) => ({
            ...prev,
            selectedTemplate: templateId,
        }));
    };

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">Select a Resume Template</h2>
            <DynamicSelect
                defaultValue={{ value: 'classic', label: 'Classic' }}
                options={templates.map((template) => ({
                    value: template.id,
                    label: template.name,
                }))}
                onChange={(newValue) => {
                    const selectedOption = newValue as SingleValue<OptionType>;
                    if (selectedOption) {
                        handleSelect(selectedOption.value);
                    }
                }}
                placeholder="Select a template"
            />
        </>
    );
};

export default TemplateSelector;