import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Orientation from './MMSE Question Section/Orientation';
import MemorySection from './MMSE Question Section/MemorySection';
import VisualTestSection from './MMSE Question Section/VisualTestSection';



function MMSETest() {
    const [sectionTrack, setSectionTrack] = useState(1);

    // Function to handle advancing to the next section
    const handleNextSection = () => {
        setSectionTrack(sectionTrack + 1);
    };

    // Function to render the current section based on sectionTrack
    const renderSection = () => {
        switch (sectionTrack) {
            case 1:
                return <Orientation setSectionTrack={setSectionTrack} onNextSection={handleNextSection} />;
            // Add cases for other sections
            case 2:
                return <MemorySection setSectionTrack={setSectionTrack} />;
            case 3:
                return <VisualTestSection />;
            // case 4:
            //     return <OtherComponent4 />;
            default:
                return null;
        }
    };

    return (
        <div className='h-full p-3'>
            {renderSection()}
        </div>
    );
}

export default MMSETest;