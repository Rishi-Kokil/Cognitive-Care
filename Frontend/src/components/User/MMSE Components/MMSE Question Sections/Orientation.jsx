
import { Typography, Card, Button, Radio } from '@material-tailwind/react';
import React, { useState } from 'react';
import { orientaionSectionQuestion, orientaionSectionAnswers } from '../questions';
import AnswerComponent from './AnswerComponent';


const Orientation = ({ setOrientationMarks, handlePrev, handleNext }) => {
    const [section, setSection] = useState(true); // 0 for instructions, 1 for questions
    const [marks, setMarks] = useState(0); // 0 for instructions, 1 for questions


    const handleSubmit = (event) => {
        setOrientationMarks(marks);
        handleNext()
    };

    const RenderInstructions = () => (
        <div className="container mx-auto mt-8 px-3">
            <div className="bg-white p-8 rounded-lg">
                <Typography
                    variant='h4'
                    className='mb-2'
                > MMSE Test Instructions </Typography>
                <p className="text-md mb-2">In this section, you will ask the Alzheimer's patient the following questions and evaluate their answers based on the options provided. Select the appropriate radio button for each question, and in the end, submit the test.</p>
                <p className="text-md mb-2">Please assess the patient's responses carefully and choose the most fitting option based on the categories listed below:</p>
                <ul
                    className='list-decimal ml-6 mb-4'
                >
                    <li>
                        Able to Answer Correctly: The patient provides the correct answer to the question.
                    </li>
                    <li>
                        Close to The Correct Answer: The patient's response is nearly accurate but may have slight variations.
                    </li>
                    <li>
                        Moderately Different Answer: The patient's answer is somewhat different from the correct response.
                    </li>
                    <li>
                        Incorrectly Answered / Not Able to Answer: The patient either gives an incorrect answer or is unable to respond to the question.
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
                        Able to Answer Correctly: 3 marks
                    </li>
                    <li>
                        Close to The Correct Answer: 2 marks
                    </li>
                    <li>
                        Moderately Different Answer: 1 mark
                    </li>
                    <li>
                        Incorrectly Answered / Not Able to Answer: 0 marks
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

    const RenderQuestions = () => (
        <div className="bg-white rounded-lg container mx-auto mt-4 px-8">
            <section>
                {
                    orientaionSectionQuestion &&
                    (
                        orientaionSectionQuestion.map(
                            (item) => (
                                <>
                                    <Typography
                                        key={item.id}
                                        className='mb-2'
                                    >
                                        {`${item.id}. ${item.question}`}
                                    </Typography>
                                    <AnswerComponent name={item.name} />

                                </>
                            )
                        )
                    )
                }
            </section>

            <section
                className='flex gap-10 p-2'
            >
                <Button onClick={ handleSubmit } >
                    Submit
                </Button>
                <Button onClick={handleSubmit}>
                    Back
                </Button>
            </section>
        </div>
    );

    return (
        <>
            <Typography variant='h3'
                className='text-center my-1'
            >Orientation Section </Typography>

            <section >
                {section ? <RenderInstructions /> : <RenderQuestions />}
            </section>


        </>
    );
};

export default Orientation;
