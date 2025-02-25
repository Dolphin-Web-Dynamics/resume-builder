"use client"

import React, { useState, useEffect } from "react"
import { Minus, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Schema } from '@/amplify/data/resource';
import ExperienceUpdateForm from "@/ui-components/ExperienceUpdateForm";
import ExperienceCreateForm from "@/ui-components/ExperienceCreateForm";
import { generateClient } from 'aws-amplify/data';
import { PlusIcon } from '@heroicons/react/24/solid';

const client = generateClient<Schema>();

interface ExperiencesProps {
    selectedProfile: Schema['Profile']['type'] | null;
}

function formatDate(dateString?: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function Experiences({ selectedProfile }: ExperiencesProps) {
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

    useEffect(() => {
        if (!selectedProfile) return;
        const sub = client.models.Experience.observeQuery({
            filter: { profileId: { eq: selectedProfile.id } }
        }).subscribe({
            next: ({ items }) => {
                setExperiences([...items]);
            },
        });
        return () => sub.unsubscribe();
    }, [selectedProfile]);

    const handleDelete = (id: string) => {
        setExperiences(experiences.filter((item) => item.id !== id))
        setExpandedexperiences((prev) => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
        })
        deleteExperience(id)
    }

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
        <div>
            <h2 className="text-2xl font-bold mb-4">Experiences</h2>
            {selectedProfile ? (
                <p>Showing experiences for: {selectedProfile.name}</p>
            ) : (
                <p>Please select a profile to view experiences.</p>
            )}
            {experiences.map((item) => (
                <Card key={item.id}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            {item.job_title && <span>{item.job_title}</span>}
                            {item.company_name && <span className="ml-1">at {item.company_name}</span>}
                            {(item.start_date || item.end_date) && (
                                <span className="block text-xs text-muted-foreground">
                                    {item.start_date ? formatDate(item.start_date) : ""}
                                    {item.start_date && item.end_date ? " - " : ""}
                                    {item.end_date ? formatDate(item.end_date) : ""}
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
                                const updatedFields = { ...fields, profileId: selectedProfile?.id };
                                return updatedFields;
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}