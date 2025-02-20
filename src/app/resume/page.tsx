// app/resume/page.tsx

'use client';

import ResumeDisplay from '../../components/ResumeDisplay';
// import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';



const ResumePage: React.FC = () => {
    return (
        <div>
            <Authenticator>
                <ResumeDisplay />
            </Authenticator>
        </div>
    );
};

export default ResumePage;