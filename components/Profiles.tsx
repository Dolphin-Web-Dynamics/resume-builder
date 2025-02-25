"use client"

import React, { useState, useEffect } from "react"
import { Minus, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Schema } from '@/amplify/data/resource';
import ProfileUpdateForm from "@/ui-components/ProfileUpdateForm"
import ProfileCreateForm from "@/ui-components/ProfileCreateForm"
import { generateClient } from 'aws-amplify/data';
import { PlusIcon } from '@heroicons/react/24/solid';


const client = generateClient<Schema>();


// interface ProfilesProps {
//     setSelectedProfile: React.Dispatch<React.SetStateAction<Schema['Profile']['type']>>;
// }


// export default function Profiles({ setSelectedProfile }: ProfilesProps) {
export default function Profiles() {
    // const [profiles, setProfiles] = useState<Item[]>(initialprofiles)
    const [expandedprofiles, setExpandedprofiles] = useState<Set<string>>(new Set())
    const [profiles, setProfiles] = useState<Schema['Profile']['type'][]>([]);
    const [showCreateForm, setShowCreateForm] = React.useState(false);


    async function deleteProfile(id: string) {
        try {
            const deletedProfile = await client.models.Profile.delete({ id });
            return deletedProfile
        } catch (error) {
            console.error("Failed to delete profile:", error);
            return null
        }
    }



    useEffect(() => {
        const sub = client.models.Profile.observeQuery().subscribe({
            // next: ({ items, isSynced }) => {
            next: ({ items }) => {
                setProfiles([...items]);
            },
        });
        return () => sub.unsubscribe();
    }, []);

    const handleDelete = (id: string) => {
        setProfiles(profiles.filter((item) => item.id !== id))
        setExpandedprofiles((prev) => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
        })
        deleteProfile(id)
    }

    const toggleExpand = (id: string) => {
        setExpandedprofiles((prev) => {
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
            {profiles.map((item) => (
                <Card key={item.id}>
                    <CardHeader className="flex flex-row profiles-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                        <div className="flex profiles-center space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleExpand(item.id)}>
                                {expandedprofiles.has(item.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                <span className="sr-only">Toggle expand</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(item.id)}>
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">Delete item</span>
                            </Button>
                        </div>
                    </CardHeader>
                    {expandedprofiles.has(item.id) && (
                        <CardContent>
                            <ProfileUpdateForm
                                profile={item}
                                onSubmit={(fields) => {
                                    toggleExpand(item.id)
                                    return fields
                                }} />
                        </CardContent>
                    )}
                </Card>
            ))}

            <div>
                <Button
                    aria-label={showCreateForm ? 'Cancel' : 'Add new profile'}
                    onClick={() => setShowCreateForm((prev) => !prev)}
                >
                    {showCreateForm ? 'Cancel' : 'Add New Profile'}
                    <PlusIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                </Button>
                {showCreateForm && (
                    <div className="mt-4">
                        <ProfileCreateForm
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

