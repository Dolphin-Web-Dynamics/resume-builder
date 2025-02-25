// components/SidebarPanel.tsx

'use client';

import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { ResumeContext } from '../context/Home';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import TemplateSelector from './TemplateSelector';

const SidebarPanel: React.FC = () => {
    const { resumeData, setResumeData } = useContext(ResumeContext);

    // Local state for the JSON input. We also track if the user has manually edited the field.
    const [inputValue, setInputValue] = useState<string>(
        JSON.stringify(resumeData, null, 2)
    );
    const [hasEdited, setHasEdited] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    // State for file preview URL and image size (default 80)
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [imageSize, setImageSize] = useState<number>(80);

    // Update local state if resumeData changes and the user hasn't edited the field yet.
    useEffect(() => {
        if (!hasEdited) {
            setInputValue(JSON.stringify(resumeData, null, 2));
        }
    }, [resumeData, hasEdited]);

    // Debounced effect to update resumeData based on the JSON input.
    useEffect(() => {
        const timer = setTimeout(() => {
            let jsonString = inputValue;

            // Check if the JSON is wrapped in markdown code fences.
            const lines = jsonString.split('\n');
            if (
                lines.length > 1 &&
                lines[0].trim().startsWith('```json') &&
                lines[lines.length - 1].trim() === '```'
            ) {
                // Remove the first and last lines.
                lines.shift();
                lines.pop();
                jsonString = lines.join('\n');
            }

            try {
                const parsedData = JSON.parse(jsonString);
                setResumeData((prevData) => ({
                    ...prevData, // Keep previous settings
                    ...parsedData, // Merge in new data
                }));
                setIsValid(true);
                setError('');
            } catch {
                setIsValid(false);
                setError('Invalid JSON. Please check your syntax.');
            }
        }, 500); // 500ms debounce delay

        return () => clearTimeout(timer);
    }, [inputValue, setResumeData]);

    // Update local state as the user types.
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHasEdited(true);
        setInputValue(e.target.value);
    };

    // File input handler: update preview URL and candidate image.
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
            setResumeData({
                ...resumeData,
                candidate_image: fileUrl,
            });
        }
    };

    // Slider change handler: update the image size.
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = Number(e.target.value);
        setImageSize(newSize);
        setResumeData({
            ...resumeData,
            candidate_image_size: newSize,
        });
    };

    // Define the templates that accept a profile picture.
    const templatesWithPicture = ['custom'];

    return (
        <div className="flex flex-col gap-4 print:hidden">
            {/* JSON Input Section */}
            <section className="bg-white p-4 rounded-md shadow">
                <h2 className="text-2xl font-semibold mb-4">Paste Job JSON Data</h2>
                <div className="mb-4 text-center">
                    <a
                        href="https://chatgpt.com/g/g-67a3dfc519888191966a72e6d8e35b62-resume-builder-dwd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        Click here to obtain your JSON from a GPT
                    </a>
                </div>
                <textarea
                    id="json-input"
                    name="json-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    rows={15}
                    className="w-full border border-gray-300 rounded-md p-2"
                />
                <div className="mt-2 flex items-center">
                    {isValid ? (
                        <div className="text-green-600 flex items-center">
                            <CheckCircleIcon className="h-5 w-5 mr-1" />
                            <span>Valid JSON! Ready to generate resume.</span>
                        </div>
                    ) : (
                        <div className="text-red-600 flex items-center">
                            <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </section>

            {/* Conditionally Render Profile Picture & Slider Section */}
            {templatesWithPicture.includes(resumeData.selectedTemplate ?? '') && (
                <section className="bg-white p-4 rounded-md shadow">
                    <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
                    <div className="flex items-center">
                        <div className="w-full">
                            <label htmlFor="file-upload" className="block font-medium mb-2">
                                Upload Profile Picture
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full"
                            />
                        </div>
                        {previewUrl && (
                            <div
                                className="ml-4 relative"
                                style={{ width: imageSize, height: imageSize }}
                            >
                                <Image
                                    src={previewUrl}
                                    alt="Profile Preview"
                                    width={imageSize}
                                    height={imageSize}
                                    className="rounded-full"
                                    unoptimized={true} // required for blob URLs
                                />
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="image-size-slider"
                            className="block text-sm font-medium mb-1"
                        >
                            Image Size: {imageSize}px
                        </label>
                        <input
                            id="image-size-slider"
                            type="range"
                            min="50"
                            max="200"
                            value={imageSize}
                            onChange={handleSliderChange}
                            className="w-full"
                        />
                    </div>
                </section>
            )}

            {/* Resume Margin Control Section */}
            <section className="bg-white p-4 rounded-md shadow">
                <h2 className="text-xl font-semibold mb-4">Resume Margin (in inches)</h2>
                <div className="flex items-center">
                    <input
                        id="resume-margin-slider"
                        type="range"
                        min="0.1"
                        max="0.5"
                        step="0.01"
                        value={resumeData.resumeMargin || 0.1}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                resumeMargin: parseFloat(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="0.5"
                        value={resumeData.resumeMargin || 0.0}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                resumeMargin: parseFloat(e.target.value),
                            })
                        }
                        className="w-16 ml-4 border border-gray-300 rounded-md p-1"
                    />
                </div>
            </section>

            {/* Template Selector Section */}
            <section className="bg-white p-4 rounded-md shadow">
                <TemplateSelector />
            </section>
        </div>
    );
};

export default SidebarPanel;