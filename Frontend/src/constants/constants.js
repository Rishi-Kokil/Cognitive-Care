const BACKEND_URL = "http://localhost:8080/"


// contants for instructions
const Orient_Instruction = {
    para : [
        "In this section, you will ask the Alzheimer's patient the following questions and evaluate their answers based on the options provided. Select the appropriate radio button for each question, and in the end, submit the test. " , 
        "Please assess the patient's responses carefully and choose the most fitting option based on the categories listed below"],
    validate : [
        "Able to Answer Correctly: The patient provides the correct answer to the question.",
        "Close to The Correct Answer: The patient's response is nearly accurate but may have slight variations.",
        "Moderately Different Answer: The patient's answer is somewhat different from the correct response.",
        'Incorrectly Answered / Not Able to Answer: The patient either gives an incorrect answer or is unable to respond to the question.'
    ],
    score : [
        {
            id : 1,
            title : "Able to Answer Correctly",
            marks : 3
        },
        {
            id : 2,
            title : "Close to The Correct Answer",
            marks : 2
        },
        {
            id : 3,
            title : "Moderately Different Answer",
            marks : 1
        },
        {
            id : 4,
            title : "Incorrectly Answered / Not Able to Answer",
            marks : 0
        },
    ]
}

const Orient_Answers = [
    {
        marks : 3,
        title : "Correctly answered",
    },
    {
        marks : 2,
        title : "Close to correct answer",
    },
    {
        marks : 1,
        title : "Moderately different answer",
    },
    {
        marks : 0,
        title : "Incorrect answer / Not able to answer",
    }
]

const Memory_Instruction = {
    para : [
        "In this section, you will be given a series of words and numbers to remember. Ask the Alzheimer's patient to listen carefully and repeat the sequences back to you in the correct order. Evaluate their responses based on the options provided below. Select the appropriate radio button for each question." , 
        "Please assess the patient's recall ability and choose the most fitting option based on the categories listed below:"],
    validate : [
        "Correct Answer: The patient accurately recalls and repeats the series of words or numbers presented.",
        "Almost there: The patient recalls most of the words or numbers correctly with minor variations.",
        "Needs improvement: The patient recalls some of the words or numbers correctly but with noticeable differences.",
        "No Response: The patient is unable to recall or repeat any of the presented information."
    ],
    score : [
        "Correct Answer: 3 marks",
        "Almost there: 2 marks",
        "Needs improvement: 1 mark",
        "No Response: 0 marks"
    ]
}
const Language_Instruction = {
    para : [
        "In this section, you will assess the Alzheimer's patient's language abilities.Observe their pronunciation, sentence formation, voice clarity, and confidence. Choose the most fitting option based on the patient's language skills. Select the appropriate radio button for each question."
    ],
    validate : [
        "Clear Pronunciation, Good Sentences, Confident Voice",
        "Fair Pronunciation, Average Sentences, Somewhat Confident Voice",
        "Poor Pronunciation, Incoherent Sentences, Unconfident Voice",
        "No Response"
    ],
    score : [
        "Clear Pronunciation, Good Sentences, Confident Voice: 5 marks",
        "Fair Pronunciation, Average Sentences, Somewhat Confident Voice: 3 marks",
        "Poor Pronunciation, Incoherent Sentences, Unconfident Voice: 1 mark",
        "No Response: 0 marks"
    ]
}

const Visual_Instruction = {
    para : [
        "In this section, you will be shown images of animals, objects, and nature. Your task is to show these images to the patient and assess their response based on the categories listed below.",
        " Please assess the patient's responses carefully and choose the most fitting option based on the categories listed below "
    ],
    validate : [
        "Correct Identification: The patient accurately identifies and names the images presented.",
        "Almost There: The patient may recognize the image but cannot name it.",
        "No Response: The patient is unable to identify or name any of the presented images."
    ],
    score : [
        "Correct Identification: 5 marks",
        "Almost There: 2 marks",
        "No Response: 0 marks",
    ]
}




const orientaionSectionQuestion = [
    {
        id : 1,
        question : "What is the current year?",
        name : "Q1"
    },
    {
        id : 2,
        question : "Which city are we in right now?",
        name : "Q2"
    },
    {
        id : 3,
        question : "What day of the week is today ?",
        name : "Q3"
    },
    {
        id : 4,
        question : "What is the time now? (You can show clock to the patient)",
        name : "Q4"  
    },
]



const temp = 23;


export {orientaionSectionQuestion ,orientaionSectionAnswers};



export { Orient_Instruction, BACKEND_URL};