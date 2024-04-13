import React, { useState } from 'react';
import { Stepper, Step, Button } from "@material-tailwind/react";

import {
    Home,
    Eye,
    ClipboardList,
    AudioLines
} from "lucide-react";
import Orientation from './MMSE Question Sections/Orientation';
import MemorySection from './MMSE Question Sections/MemorySection';
import VisualSection from './MMSE Question Sections/VisualTestSection';
import LanguageSection from './MMSE Question Sections/LanguageSection';

const MMSETest = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(true); // Initially set to true for the first step

    const [orientationMarks, setOrientationMarks] = useState(0);
    const [visualMarks, setVisualMarks] = useState(0);
    const [memoryMarks, setMemoryMarks] = useState(0);
    const [languageMarks, setLanguageMarks] = useState(0);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    // Update the onClick handlers to navigate to specific steps
    const handleStepClick = (stepIndex) => {
        setActiveStep(stepIndex);
        setIsFirstStep(stepIndex === 0);
        setIsLastStep(stepIndex === 3);
    };

    return (
        <div className='border-2 h-[99vh] w-full rounded-lg'>
            <div className='h-[80%] border-2 overflow-y-scroll'>
                {/* Render the content based on activeStep */}
                {activeStep === 0 && <Orientation
                    setOrientationMarks={setOrientationMarks}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />}
                {activeStep === 1 && <MemorySection
                    setMemoryMarks={setMemoryMarks}
                    handleNext={handleNext}
                />}
                {activeStep === 2 && <VisualSection
                setVisualMarks={setVisualMarks}
                handleNext={handleNext} />}
                {activeStep === 3 && <LanguageSection
                setLanguageMarks={setLanguageMarks}
                handleNext={handleNext} 
                handlePrev={handlePrev} />
                }
                

            </div>
            <div className="w-full px-8 py-2 h-[15%] bg-transparent">
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    <Step onClick={() => handleStepClick(0)}>
                        <Home className="h-5 w-5" />

                    </Step>
                    <Step onClick={() => handleStepClick(1)}>
                        <Eye className="h-5 w-5" />

                    </Step>
                    <Step onClick={() => handleStepClick(2)}>
                        <ClipboardList className="h-5 w-5" />

                    </Step>
                    <Step onClick={() => handleStepClick(3)}>
                        <AudioLines className="h-5 w-5" />

                    </Step>
                </Stepper>
                <div className="mt-8 flex justify-between">
                    <Button onClick={handlePrev} disabled={isFirstStep}>
                        Prev
                    </Button>
                    <Button onClick={handleNext} disabled={isLastStep}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MMSETest;
