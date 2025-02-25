// src/components/ProfileSelector.tsx
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { SelectField } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

interface ProfileSelectorProps {
    selectedProfile: Schema['Profile']['type'] | null;
    onProfileChange: (profile: Schema['Profile']['type'] | null) => void;
}

export default function ProfileSelector({
    selectedProfile,
    onProfileChange,
}: ProfileSelectorProps) {
    const [profiles, setProfiles] = useState<Schema['Profile']['type'][]>([]);

    useEffect(() => {
        // Subscribe to the profiles list using an observer query.
        const sub = client.models.Profile.observeQuery().subscribe({
            next: ({ items }) => {
                setProfiles([...items]);
            },
        });
        return () => sub.unsubscribe();
    }, []);

    return (
        <div className="mb-4">
            <SelectField
                label="Select Profile"
                id="profile-select"
                value={selectedProfile?.id || ''}
                onChange={(e) => {
                    const newProfile = profiles.find((p) => p.id === e.target.value) || null;
                    onProfileChange(newProfile);
                }}
                className="max-w-xs" // Tailwind CSS class to limit width
            // Alternatively, you can use inline styles:
            // style={{ maxWidth: '200px' }}
            >
                <option value="">-- Choose a profile --</option>
                {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                        {profile.name}
                    </option>
                ))}
            </SelectField>
        </div>
    );
}