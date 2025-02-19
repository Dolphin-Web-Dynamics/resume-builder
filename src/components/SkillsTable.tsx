// components/SkillsTable.tsx

import React from 'react';

// Define the bullet types, adjust as needed
export type BulletType = 'none' | 'solid' | 'dashed';

// Define the Skill interface
export interface Skill {
    technology: string;
    is_relevant: boolean;
}

interface SkillsTableProps {
    skills: Skill[];
    bulletType?: BulletType;
}

const SkillsTable: React.FC<SkillsTableProps> = ({ skills, bulletType = 'solid' }) => {
    // Divide skills into 3 columns for layout
    const columns: Skill[][] = [[], [], []];
    skills.forEach((skill, index) => {
        columns[index % 3].push(skill);
    });

    // Helper function for bullet styling
    const getBullet = () => {
        if (bulletType === 'solid') return '•';
        if (bulletType === 'dashed') return '-';
        return '';
    };

    return (
        <div className="flex w-full ml-5">
            {columns.map((col, colIndex) => (
                <ul key={colIndex} className="list-none flex-1">
                    {col.map((skill, index) => (
                        <li key={index} className={`mb-1 text-xs ${skill.is_relevant ? 'font-bold' : ''}`}>
                            {bulletType !== 'none' && (
                                <span className="mr-2">{getBullet()}</span>
                            )}
                            {skill.technology}
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default SkillsTable;