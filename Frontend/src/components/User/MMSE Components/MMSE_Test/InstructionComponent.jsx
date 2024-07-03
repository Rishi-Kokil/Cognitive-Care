import { Spinner, Typography } from '@material-tailwind/react';
import React from 'react';

function InstructionComponent({ obj }) {
    // Obj will contain para, validate, score
    // para contains a short description of the section
    // validate contains how patients are validated
    // score will tell the score of each options that are provided

    console.log(obj.score);
    return (
        <>  
            {obj === null ? <Spinner /> : (
                <>
                    {obj.para.map((p, index) => (
                        <p key={index} className='text-md mb-2'>
                            {p}
                        </p>
                    ))}
                    <ul className='list-decimal ml-6 my-2'>
                        {obj.validate.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Typography variant='h5' className='mb-2'>
                        Scoring Guidelines
                    </Typography>
                    <ul className='list-decimal ml-6 my-2'>
                        {obj.score.map((item, index) => (
                            <li key={index}>
                                {`${item.title} : ${item.marks} marks`}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}

export default InstructionComponent;
