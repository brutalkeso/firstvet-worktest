import { Answer } from "@/shared-types/QuestionsResponse"

export type AppScreens={
    Questionare: undefined,
    Summary: {
        answers: Answer[]
    }
}