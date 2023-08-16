import { Question } from "@/shared-types/QuestionsResponse"

export type Answer={
    question: Question,
    freeTextAnswer?: string,
    choiceAnswers?: boolean[],
    scalar?: number,
    acceptable: boolean
}