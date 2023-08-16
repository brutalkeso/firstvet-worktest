import { QuestionInput, Question, QuestionPage, QuestionPages } from "@/shared-types/QuestionsResponse"

// helper functions
const QuestionMapper=(questionInput: QuestionInput, index: number) => {
    return {
        questions: [
            {
                title: `Question ${index}`,
                input: questionInput
            }
        ]
    }
}

// data
const pageValues: QuestionInput[]=["radio", "checkbox", "scalar", "freetext"]
const singleQuestionPages: QuestionPage[]=pageValues.map(QuestionMapper)
const multipleQuestionsPage: QuestionPage={
    questions: [
        {
            title: "MulQuestion 1",
            input: "radio"
        },

        {
            title: "MulQuestion 2",
            input: "freetext"
        }
    ]
}

export const mockQuestions: QuestionPages={
    pages: [
        ...singleQuestionPages,
        multipleQuestionsPage
    ]
}