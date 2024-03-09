import { Typography, Card, Button, Radio } from '@material-tailwind/react';
import React, { useState } from 'react';

function MemorySection({ setSectionTrack }) {

    const [section, setSection] = useState(true);


    const RenderInstructions = () => (
        <div className="container mx-auto mt-8 px-3">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4"></h1>
                <Typography
                    variant='h4'
                    className='mb-2'
                > MMSE Test Instructions </Typography>
                <p className="text-lg mb-2">In this section, you will be given a series of <strong>words | letters | numbers</strong>. Your task is to communicate them to the Alzheimer's patient correctly and then ask them to repeat it in correct order.</p>
                <p className="text-lg mb-2">Please assess the patient's responses carefully and choose the most fitting option based on the categories listed below:</p>
                <ul
                    className='list-decimal ml-6 mb-4'
                >
                    <li>
                        Correct Answer: The patient accurately recalls and repeats the series of words, letters, or numbers presented to them.
                    </li>
                    <li>
                        Almost there: The patient recalls <strong>Most</strong> of the words, letters, or numbers correctly.
                    </li>
                    <li>
                        Needs improvement : The patient recalls <strong>Some</strong> of the words, letters, or numbers correctly.
                    </li>
                    <li>
                        No Response: Unable to recall or repeat any of the presented information.
                    </li>
                </ul>
                <Typography
                    variant='h5'
                    className='mb-2'
                > Scoring Guidelines </Typography>
                <ul
                    className='list-decimal ml-6 my-2'
                >
                    <li>
                        Correct Answer: 3 marks
                    </li>
                    <li>
                        Almost there: 2 marks
                    </li>
                    <li>
                        Needs improvement: 1 mark
                    </li>
                    <li>
                        No Response: 0 marks
                    </li>
                </ul>

                <Button
                    onClick={() => { setSectionTrack(3) }}
                >
                    Start Test
                </Button>
            </div>
        </div>
    );

    return (
        <>


            <Typography variant='h3'
                className='text-center my-1'
            >Memory Section </Typography>

            <section >
                {section ? <RenderInstructions /> : <RenderQuestions />}
            </section>

        </>
    )
}

export default MemorySection;