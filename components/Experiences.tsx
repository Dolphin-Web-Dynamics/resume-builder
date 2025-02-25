"use client"

import React, { useState, useEffect } from "react"
import { Minus, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Schema } from '@/amplify/data/resource';
import ExperienceUpdateForm from "@/ui-components/ExperienceUpdateForm";
import ExperienceCreateForm from "@/ui-components/ExperienceCreateForm";
import { generateClient } from 'aws-amplify/data';
// Button } from '@aws-amplify/ui-react';
import { PlusIcon } from '@heroicons/react/24/solid';

const client = generateClient<Schema>();


// interface ExperiencesProps {
//     setSelectedExperience: React.Dispatch<React.SetStateAction<Schema['Experience']['type']>>;
// }

// Helper function to format dates (year and month)
function formatDate(dateString?: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Format to something like "Jan 2023"
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}


// export default function Experiences({ setSelectedExperience }: ExperiencesProps) {
export default function Experiences() {
    // const [experiences, setExperiences] = useState<Item[]>(initialexperiences)
    const [expandedexperiences, setExpandedexperiences] = useState<Set<string>>(new Set())
    const [experiences, setExperiences] = useState<Schema['Experience']['type'][]>([]);
    const [showCreateForm, setShowCreateForm] = React.useState(false);


    async function deleteExperience(id: string) {
        try {
            const deletedExperience = await client.models.Experience.delete({ id });
            return deletedExperience
        } catch (error) {
            console.error("Failed to delete experience:", error);
            return null
        }
    }

    // async function createExperience(fields: Schema['Experience']['createType']) {
    //     try {
    //         const newExperience = await client.models.Experience.create(fields);
    //         return newExperience
    //     } catch (error) {
    //         console.error("Failed to create experience:", error);
    //         return null
    //     }
    // }




    useEffect(() => {
        const sub = client.models.Experience.observeQuery().subscribe({
            // next: ({ items, isSynced }) => {
            next: ({ items }) => {
                setExperiences([...items]);
            },
        });
        return () => sub.unsubscribe();
    }, []);

    const handleDelete = (id: string) => {
        setExperiences(experiences.filter((item) => item.id !== id))
        setExpandedexperiences((prev) => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
        })
        deleteExperience(id)
    }




    // const toggleExpand = (experience: string | Schema['Experience']['createType']) => {
    //     const id = typeof experience === 'string' ? experience : experience.id;

    //     if (id) {
    //         setExpandedexperiences((prev) => {
    //             const newSet = new Set(prev);
    //             if (newSet.has(id)) {
    //                 newSet.delete(id);
    //             } else {
    //                 newSet.add(id);
    //             }
    //             return newSet;
    //         });
    //     }
    // };

    const toggleExpand = (id: string) => {
        setExpandedexperiences((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }
    return (
        <div className="w-full max-w-md space-y-4">

            {experiences.map((item) => (
                <Card key={item.id}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            {item.job_title && <span>{item.job_title}</span>}
                            {item.company_name && <span className="ml-1">at {item.company_name}</span>}
                            {(item?.start_date || item?.end_date) && (
                                <span className="block text-xs text-muted-foreground">
                                    {item?.start_date ? formatDate(item.start_date) : ""}
                                    {item?.start_date && item?.end_date ? " - " : ""}
                                    {item?.end_date ? formatDate(item.end_date) : ""}
                                </span>
                            )}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => toggleExpand(item.id)}
                            >
                                {expandedexperiences.has(item.id) ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                                <span className="sr-only">Toggle expand</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDelete(item.id)}
                            >
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">Delete item</span>
                            </Button>
                        </div>
                    </CardHeader>
                    {expandedexperiences.has(item.id) && (
                        <CardContent>
                            <ExperienceUpdateForm experience={item} onSubmit={(fields) => {
                                toggleExpand(item.id)
                                return fields
                            }} />
                        </CardContent>
                    )}
                </Card>
            ))}

            <div>
                <Button
                    aria-label={showCreateForm ? 'Cancel' : 'Add new experience'}
                    onClick={() => setShowCreateForm((prev) => !prev)}
                >
                    {showCreateForm ? 'Cancel' : 'Add New Experience'}
                    <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                </Button>
                {showCreateForm && (
                    <div className="mt-4">
                        <ExperienceCreateForm
                            onSubmit={(fields) => {
                                setShowCreateForm(false)
                                return fields
                            }}
                        />
                    </div>
                )}
            </div>

        </div>
    )
}

