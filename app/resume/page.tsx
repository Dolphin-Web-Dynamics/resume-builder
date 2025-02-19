// app/resume/page.tsx

'use client';

import ResumeDisplay from '../../components/ResumeDisplay';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const ResumePage: React.FC = () => {
    return (
        <Authenticator>
            <div>
                <ResumeDisplay />
            </div>
        </Authenticator>
    );
};

export default ResumePage;