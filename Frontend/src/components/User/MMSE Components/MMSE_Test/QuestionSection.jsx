import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import MCQComponent from "./MCQComponent";

function QuestionSection({ instruction, questions, sectionIndex, marks, handleMarkChange }) {
    const [openInstructions, setOpenInstructions] = useState(false);

    return (
        <>
            {
                instruction && (
                    <div className="h-full mx-4 my-4 overflow-y-auto scrollbar-hide" 
                    style={
                        {
                            scrollbarWidth : "none",
                            msOverflowStyle : 'none',
                        }
                    }>
                        <Accordion open={openInstructions} className="transition-all duration-300">
                            <AccordionHeader onClick={() => setOpenInstructions(!openInstructions)}>
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-lg font-semibold">{instruction.title}</p>
                                    <div className={`transition-transform duration-300 ${openInstructions ? 'rotate-180' : ''}`}>
                                        {openInstructions ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
                                    </div>
                                </div>
                            </AccordionHeader>
                            <AccordionBody className="transition-all duration-300 ease-in-out">
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    {
                                        instruction.para.map(
                                            (item, index) => (<p key={index} className="mb-2 text-gray-700">{item}</p>)
                                        )
                                    }
                                    <ul className="pl-4 mt-2 list-disc text-gray-700">
                                        {
                                            instruction.validate.map(
                                                (item, index) => (<li key={index} className="mb-1">{item}</li>)
                                            )
                                        }
                                    </ul>
                                    <Typography variant="h5" className="mt-3 mb-2 text-gray-800">Score Guidelines</Typography>
                                    <ul className="pl-4 mt-1 list-disc text-gray-700">
                                        {
                                            instruction.score.map(
                                                (item) => (<li key={item.id} className="mb-1">{`${item.title} : ${item.marks}`}</li>)
                                            )
                                        }
                                    </ul>
                                </div>
                            </AccordionBody>
                        </Accordion>
                        <section>
                            {
                                questions.map(
                                    (item, questionIndex) => (
                                        <div key={questionIndex} className="mt-4">
                                            <p className="text-lg font-medium mb-2">{item}</p>
                                            <MCQComponent
                                                obj={instruction.score}
                                                selectedMark={marks[sectionIndex]?.[questionIndex]}
                                                onChange={(mark) => handleMarkChange(sectionIndex, questionIndex, mark)}
                                            />
                                        </div>
                                    )
                                )
                            }
                        </section>
                    </div>
                )
            }
        </>
    );
}

export default QuestionSection;
