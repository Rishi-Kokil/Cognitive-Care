import React from 'react'
import { orientaionSectionAnswers } from '../questions';
import { Radio } from '@material-tailwind/react';

function AnswerComponent({ name }) {
    return (
        <>
            <div 
                className='flex gap-10 my-1'
            >
                {
                    orientaionSectionAnswers &&
                    (
                        orientaionSectionAnswers.map(
                            (item) => (
                                <Radio label={item.title} value={item.marks} name={name} />
                            )
                        )
                    )
                }
            </div>
        </>
    )
}

export default AnswerComponent;