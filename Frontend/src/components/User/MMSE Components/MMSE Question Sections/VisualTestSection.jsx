import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-tailwind/react';

function VisualSection({ handleNext, setVisualMarks }) {
    const [section, setSection] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const categories = ['nature', 'bird', 'object'];
            const imageLists = [];

            for (const category of categories) {
                const response = await fetch(
                    `https://api.unsplash.com/photos/random?count=1&query=${category}&client_id=6zruNDxsStEpTYRLMcOPZ28WDA1v96-CIe-5jSrCsls`
                );

                if (response.ok) {
                    const data = await response.json();
                    const imageUrl = data[0].urls.regular;
                    imageLists.push(imageUrl);
                } else {
                    console.error(`Failed to fetch images for category: ${category}`);
                }
            }

            setImages(imageLists);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };


    const handleSubmit = () => {
        let marks = 0; // Initialize marks

        setVisualMarks(marks); // Set visual test marks
        handleNext(); // Move to the next section
    };

    const RenderInstructions = () => (
        <div className="container mx-auto mt-8 px-3">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <Typography variant='h4' className='mb-2'>MMSE Visual Test Instructions</Typography>
                <p className="text-lg mb-2">
                    In this section, you will be shown images of animals, objects, and nature. Your task is to show these images
                    to the patient and assess their response based on the categories listed below.
                </p>
                <p className="text-lg mb-2">
                    Please assess the patient's responses carefully and choose the most fitting option based on the categories listed below:
                </p>
                <ul className='list-decimal ml-6 mb-4'>
                    <li>
                        Correct Identification: The patient accurately identifies and names the images presented.
                    </li>
                    <li>
                        Almost There: The patient may recognize the image but cannot name it.
                    </li>
                    <li>
                        No Response: The patient is unable to identify or name any of the presented images.
                    </li>
                </ul>
                <Typography variant='h5' className='mb-2'>Scoring Guidelines</Typography>
                <ul className='list-decimal ml-6 my-2'>
                    <li>
                        Correct Identification: 5 marks
                    </li>
                    <li>
                        Almost There: 2 marks
                    </li>
                    <li>
                        No Response: 0 marks
                    </li>
                </ul>
                <Button onClick={() => setSection(false)}>Start Test</Button>
            </div>
        </div>
    );

    const RenderQuestions = () => (
        <div className="container mx-auto mt-8 px-3 flex flex-col items-center justify-center">
            <div className="flex flex-col">
                {images.map((imageUrl, index) => (
                    <div key={index} className="bg-gray-200 p-4 rounded-md shadow-md flex flex-col mx-auto">
                        <img src={imageUrl} alt={`Image ${index}`} className="w-[300px] h-auto" />
                        {/* Radio buttons for user response */}
                        <div className="mt-4">
                            <Typography variant="subtitle">Image {index + 1}</Typography>
                            <div>
                                <input type="radio" id={`option-${index}-correct`} name={`response-${index}`} value="correct" />
                                <label htmlFor={`option-${index}-correct`} className="ml-2">Correct Identification</label>
                            </div>
                            <div>
                                <input type="radio" id={`option-${index}-almost`} name={`response-${index}`} value="almost" />
                                <label htmlFor={`option-${index}-almost`} className="ml-2">Almost There</label>
                            </div>
                            <div>
                                <input type="radio" id={`option-${index}-no-response`} name={`response-${index}`} value="no-response" />
                                <label htmlFor={`option-${index}-no-response`} className="ml-2">No Response</label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={handleSubmit} className="mt-8">Submit</Button>
        </div>
    );


    return (
        <>
            <Typography variant='h3' className='text-center my-1'>Visual Test Section</Typography>
            <section>
                {section ? <RenderInstructions /> : <RenderQuestions />}
            </section>
        </>
    );
}

export default VisualSection;
