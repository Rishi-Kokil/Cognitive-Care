const BACKEND_URL = "http://localhost:8080/"

// contants for instructions
const Orient_Instruction = {
    title: "Orientation Section Instructions",
    para: [
        "In this section, you will ask the Alzheimer's patient the following questions and evaluate their answers based on the options provided. Select the appropriate radio button for each question, and in the end, submit the test. ",
        "Please assess the patient's responses carefully and choose the most fitting option based on the categories listed below"],
    validate: [
        "Able to Answer Correctly: The patient provides the correct answer to the question.",
        "Close to The Correct Answer: The patient's response is nearly accurate but may have slight variations.",
        "Moderately Different Answer: The patient's answer is somewhat different from the correct response.",
        'Incorrectly Answered / Not Able to Answer: The patient either gives an incorrect answer or is unable to respond to the question.'
    ],
    score: [
        {
            id: 1,
            title: "Able to Answer Correctly",
            marks: 3
        },
        {
            id: 2,
            title: "Close to The Correct Answer",
            marks: 2
        },
        {
            id: 3,
            title: "Moderately Different Answer",
            marks: 1
        },
        {
            id: 4,
            title: "Incorrectly Answered / Not Able to Answer",
            marks: 0
        },
    ],
}

const Memory_Instruction = {
    title: "Memory Section Instructions",
    para: [
        "In this section, you will be given a series of words and numbers to remember. Ask the Alzheimer's patient to listen carefully and repeat the sequences back to you in the correct order. Evaluate their responses based on the options provided below. Select the appropriate radio button for each question.",
        "Please assess the patient's recall ability and choose the most fitting option based on the categories listed below:"],
    validate: [
        "Correct Answer: The patient accurately recalls and repeats the series of words or numbers presented.",
        "Almost there: The patient recalls most of the words or numbers correctly with minor variations.",
        "Needs improvement: The patient recalls some of the words or numbers correctly but with noticeable differences.",
        "No Response: The patient is unable to recall or repeat any of the presented information."
    ],
    score: [
        {
            id: 1,
            title: "Correct Answer",
            marks: 3
        },
        {
            id: 2,
            title: "Almost there",
            marks: 2
        },
        {
            id: 3,
            title: "Needs improvement",
            marks: 1
        },
        {
            id: 4,
            title: "No Response",
            marks: 0
        },
    ]
}


const Language_Instruction = {
    title: "Language Section Instructions",
    para: [
        "In this section, you will assess the Alzheimer's patient's language abilities.Observe their pronunciation, sentence formation, voice clarity, and confidence. Choose the most fitting option based on the patient's language skills. Select the appropriate radio button for each question."
    ],
    validate: [
        "Clear Pronunciation, Good Sentences, Confident Voice",
        "Fair Pronunciation, Average Sentences, Somewhat Confident Voice",
        "Poor Pronunciation, Incoherent Sentences, Unconfident Voice",
        "No Response"
    ],
    score: [
        {
            id: 1,
            title: "Clear Pronunciation, Good Sentences, Confident Voice",
            marks: 5
        },
        {
            id: 2,
            title: "Fair Pronunciation, Average Sentences, Somewhat Confident Voice",
            marks: 5
        },
        {
            id: 3,
            title: "Poor Pronunciation, Incoherent Sentences, Unconfident Voice",
            marks: 1
        },
        {
            id: 4,
            title: "No Response",
            marks: 0
        }
    ]
}

const Visual_Instruction = {
    title: "Visual Section Instructions",
    para: [
        "In this section, you will be shown images of animals, objects, and nature. Your task is to show these images to the patient and assess their response based on the categories listed below.",
        " Please assess the patient's responses carefully and choose the most fitting option based on the categories listed below "
    ],
    validate: [
        "Correct Identification: The patient accurately identifies and names the images presented.",
        "Almost There: The patient may recognize the image but cannot name it.",
        "No Response: The patient is unable to identify or name any of the presented images."
    ],
    score: [
        {
            id: 1,
            title: "Correct Identification",
            marks: 5
        },
        {
            id: 2,
            title: "Almost There",
            marks: 2
        },
        {
            id: 3,
            title: "No Response",
            marks: 0
        }
    ]
}

const Orient_Questions = [
    "What is the current year?",
    "Which city are we in right now?",
    "What day of the week is today ?",
    "What is the time now? (You can show clock to the patient)"
]

export { Orient_Instruction, Memory_Instruction, Visual_Instruction, Language_Instruction, Orient_Questions }