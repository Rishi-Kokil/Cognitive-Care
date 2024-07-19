import { useParams } from 'react-router-dom';
import { Stepper, Step, Button } from "@material-tailwind/react";
import { Locate, Database, MessageSquare, ScanEye } from 'lucide-react';
import QuestionSection from './QuestionSection';
import { Orient_Instruction, Memory_Instruction, Visual_Instruction, Language_Instruction, Orient_Questions } from "../../../../constants/constants";

import { useState } from 'react';

function MMSETestComponent() {
    const { pid: patient_id } = useParams(); // pid is passed to patient_id 
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(true);

    const [instruction, setInstruction] = useState(Orient_Instruction);
    const [questions, setQuestions] = useState(Orient_Questions);

    const [marks, setMarks] = useState({});

    const handleMarkChange = (sectionIndex, questionIndex, mark) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [sectionIndex]: {
                ...prevMarks[sectionIndex],
                [questionIndex]: mark
            }
        }));
    };


    const instructionObject = {
        0: Orient_Instruction,
        1: Memory_Instruction,
        2: Language_Instruction,
        3: Visual_Instruction,
    };

    const questionObject = {
        0: Orient_Questions,
    };

    const handleNext = () => {
        if (activeStep < 3) {
            const nextStep = activeStep + 1;
            setActiveStep(nextStep);
            setInstruction(instructionObject[nextStep]);
            setQuestions(questionObject[nextStep]);
        }
    };

    const handlePrev = () => {
        if (activeStep > 0) {
            const prevStep = activeStep - 1;
            setActiveStep(prevStep);
            setInstruction(instructionObject[prevStep]);
            setQuestions(questionObject[prevStep]);
        }
    };



    return (
        <>
            <QuestionSection
                instruction={instruction}
                questions={questions}
                sectionIndex={activeStep}
                marks={marks}
                handleMarkChange={handleMarkChange}
            />

            <div className='mx-4 my-4 '>
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    <Step onClick={() => setActiveStep(0)}>
                        <Locate className="h-5 w-5" />
                    </Step>
                    <Step onClick={() => setActiveStep(1)}>
                        <Database className="h-5 w-5" />
                    </Step>
                    <Step onClick={() => setActiveStep(2)}>
                        <MessageSquare className="h-5 w-5" />
                    </Step>
                    <Step onClick={() => setActiveStep(3)}>
                        <ScanEye className="h-5 w-5" />
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
        </>
    );
}

export default MMSETestComponent;
