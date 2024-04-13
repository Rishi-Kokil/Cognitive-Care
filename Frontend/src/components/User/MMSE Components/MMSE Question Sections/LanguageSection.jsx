import React, { useState } from 'react';
import { Typography, Button } from '@material-tailwind/react';

function LanguageSection({ setLanguageMarks, handleNext, handlePrev }) {
    const [section, setSection] = useState(true);

    const RenderInstructions = () => (
        <div className="container mx-auto mt-8 px-3">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <Typography variant='h4' className='mb-2'>MMSE Language Test Instructions</Typography>
                <p className="text-md mb-2">
                    In this section, you will assess the Alzheimer's patient's language abilities.
                    Observe their pronunciation, sentence formation, voice clarity, and confidence.
                    Choose the most fitting option based on the patient's language skills.
                    Select the appropriate radio button for each question.
                </p>
                <Typography variant='h5' className='mb-2'>Scoring Guidelines</Typography>
                <ul className='list-decimal ml-6 my-2'>
                    <li>Clear Pronunciation, Good Sentences, Confident Voice: 5 marks</li>
                    <li>Fair Pronunciation, Average Sentences, Somewhat Confident Voice: 3 marks</li>
                    <li>Poor Pronunciation, Incoherent Sentences, Unconfident Voice: 1 mark</li>
                    <li>No Response: 0 marks</li>
                </ul>

                <Button onClick={() => setSection(!section)}>Start Test</Button>
            </div>
        </div>
    );

    const handleSubmit = () => {
        // Mock implementation: Calculate marks based on user observation
        const marks = 5; // Assuming the patient's language skills are assessed as excellent
        setLanguageMarks(marks); // Set language test marks
        handleNext(); // Move to the next section
    };

    const RenderQuestions = () => (
        <div className="bg-white rounded-lg container mx-auto mt-4 px-8">
            <section>
                <Typography variant='h4' className='mb-4'>Language Test Questions</Typography>
                <div className="mb-4">
                    <Typography>Assess the patient's language:</Typography>
                    <div>
                        <input type="radio" id="clear" name="language" value="clear" />
                        <label htmlFor="clear">Clear Pronunciation, Good Sentences, Confident Voice</label><br />
                    </div>
                    <div>
                        <input type="radio" id="fair" name="language" value="fair" />
                        <label htmlFor="fair">Fair Pronunciation, Average Sentences, Somewhat Confident Voice</label><br />
                    </div>
                    <div>
                        <input type="radio" id="poor" name="language" value="poor" />
                        <label htmlFor="poor">Poor Pronunciation, Incoherent Sentences, Unconfident Voice</label><br />
                    </div>
                    <div>
                        <input type="radio" id="no-response" name="language" value="no-response" />
                        <label htmlFor="no-response">No Response</label>
                    </div>
                </div>
            </section>
            <section className='flex gap-10 p-2'>
                <Button onClick={handlePrev}>Back</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </section>
        </div>
    );

    return (
        <>
            <Typography variant='h3' className='text-center my-1'>Language Section</Typography>
            <section>
                {section ? <RenderInstructions /> : <RenderQuestions />}
            </section>
        </>
    );
}

export default LanguageSection;
