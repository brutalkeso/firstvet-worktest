import { QuestionInput, QuestionPages } from "@/shared-types/QuestionsResponse"

export const mockQuestions: QuestionPages={
    pages: [
        {
            title: "Question 1",
            description: "Free text input",
            input: "freetext"
        },
        {
            title: "Question 2",
            description: "Checkbox multiple selection",
            input: "checkbox",
            alternatives: [...Array(20)].map((_, i) => `Alternative ${i+1}`)
        },
        {
            title: "Question 3",
            description: "Radio single selection",
            input: "radio",
            alternatives: [...Array(10)].map((_, i) => `Alternative ${i+1}`)
        },
        {
            title: "Question 4",
            description: "Scalar, choose single value",
            input: "scalar",
            scalarAlternatives: [...Array(11)].map((_, i) => -5+i) // 
        }
    ]
}