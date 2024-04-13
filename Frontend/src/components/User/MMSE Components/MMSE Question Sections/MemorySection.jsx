import React, { useState } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import AnswerComponent from './AnswerComponent';

function MemorySection({ setMemoryMarks, setActiveStep, handleNext, handlePrev }) {
    const [section, setSection] = useState(true);
    const [questions, setQuestions] = useState([]);

    // Generate random sequences for memory test
    const generateMemorySequences = () => {
        const numberSequence = generateRandomNumberSequence(4); // Generate a sequence of 4 random numbers
        const wordSequence = generateRandomWordSequence(4); // Generate a sequence of 4 random words

        const memoryQuestions = [
            { id: 1, question: `Repeat the number sequence: ${numberSequence.join(', ')}`, answer: numberSequence },
            { id: 2, question: `Repeat the word sequence: ${wordSequence.join(', ')}`, answer: wordSequence },
            // Add more randomized questions as needed
        ];

        setQuestions(memoryQuestions);
    };

    // Helper function to generate a random sequence of numbers
    const generateRandomNumberSequence = (length) => {
        const sequence = [];
        for (let i = 0; i < length; i++) {
            sequence.push(Math.floor(Math.random() * 10)); // Generate random number between 0 and 9
        }
        return sequence;
    };

    // Helper function to generate a random sequence of words
    const generateRandomWordSequence = (length) => {
        const words = ['Apple', 'Banana', 'Orange', 'Grape', 'Peach', 'Strawberry', 'Kiwi', 'Pear', 'Melon', 'Plum'];
        const sequence = [];
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            sequence.push(words[randomIndex]);
        }
        return sequence;
    };

    const handleSubmit = () => {
        // Calculate marks based on user responses
        let marks = 0;
        questions.forEach((question) => {
            const selectedAnswer = document.querySelector(`input[name="${question.id}"]:checked`);
            if (selectedAnswer && selectedAnswer.value === 'true') {
                marks += 3; // Correct Answer
            } else if (selectedAnswer && selectedAnswer.value === 'close') {
                marks += 2; // Almost there
            } else if (selectedAnswer && selectedAnswer.value === 'improve') {
                marks += 1; // Needs improvement
            } else {
                marks += 0; // No Response
            }
        });

        setMemoryMarks(marks); // Set memory test marks
        handleNext(); // Move to the next section
    };

    const RenderInstructions = () => (
        <div className="container mx-auto mt-8 px-3">
            <div className="bg-white p-8 rounded-lg">
                <Typography variant='h4' className='mb-2'>MMSE Memory Test Instructions</Typography>
                <p className="text-md mb-2">
                    In this section, you will be given a series of words and numbers to remember.
                    Ask the Alzheimer's patient to listen carefully and repeat the sequences back to you
                    in the correct order. Evaluate their responses based on the options provided below.
                    Select the appropriate radio button for each question.
                </p>
                <p className="text-md mb-2">
                    Please assess the patient's recall ability and choose the most fitting option
                    based on the categories listed below:
                </p>
                <ul className='list-decimal ml-6 mb-4'>
                    <li>
                        Correct Answer: The patient accurately recalls and repeats the series of words or numbers presented.
                    </li>
                    <li>
                        Almost there: The patient recalls most of the words or numbers correctly with minor variations.
                    </li>
                    <li>
                        Needs improvement: The patient recalls some of the words or numbers correctly but with noticeable differences.
                    </li>
                    <li>
                        No Response: The patient is unable to recall or repeat any of the presented information.
                    </li>
                </ul>
                <Typography variant='h5' className='mb-2'>Scoring Guidelines</Typography>
                <ul className='list-decimal ml-6 my-2'>
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
                <Button onClick={() => { generateMemorySequences(); setSection(false); }}>Start Test</Button>
            </div>

        </div>
    );

    const RenderQuestions = () => (
        <div className="bg-white rounded-lg container mx-auto mt-4 px-8">
            <section>
                <Typography variant='h4' className='mb-4'>Memory Test Questions</Typography>
                {questions.map((item) => (
                    <div key={item.id}>
                        <Typography className='mb-2'>{item.question}</Typography>
                        <AnswerComponent name={item.id} />
                    </div>
                ))}
            </section>
            <section className='flex gap-10 p-2'>
                <Button onClick={handlePrev}>Back</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </section>
        </div>
    );

    return (
        <>
            <Typography variant='h3' className='text-center my-1'>Memory Section</Typography>
            <section>
                {section ? <RenderInstructions /> : <RenderQuestions />}
            </section>
        </>
    );
}

export default MemorySection;
