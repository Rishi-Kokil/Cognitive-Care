import { Typography, Card, Button, Radio } from '@material-tailwind/react';
import React, { useState } from 'react';

function VisualTestSection() {
    const [section, setSection] = useState(true);
    const RenderInstructions = () => (
        <div className="container mx-auto mt-8 px-3">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4"></h1>
                <Typography
                    variant='h4'
                    className='mb-2'
                > MMSE Test Instructions </Typography>
                <p className="text-lg mb-2">In this section, you will be given <strong>Images</strong> of various types, including <strong>animals, birds, objects, fruits, and flowers</strong>. Your task is to show the images to the patient and then assess them based on the response they give. </p>
                <p className="text-lg mb-2">Please assess the patient's responses carefully and choose the most fitting option based on the categories listed below:</p>
                <ul
                    className='list-decimal ml-6 mb-4'
                >
                    <li>
                        Correct Identification: The patient accurately identifies and names the images presented to them.
                    </li>
                    <li>
                        Almost There: The patient may recall the image but cannot name it.
                    </li>
                    <li>
                        No Response: The patient is unable to identify or name any of the presented images.
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
                        Correct Identification: 5 marks
                    </li>
                    <li>
                        Almost there: 2 marks
                    </li>
                    <li>
                        No Response: 0 marks
                    </li>
                </ul>

                <Button
                    onClick={() => { setSection(!section) }}
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
            >Visual Test Section</Typography>

            <section >
                {section ? <RenderInstructions /> : <RenderQuestions />}
            </section>

        </>
    )
}

export default VisualTestSection