export type QuestionInput="radio"|"checkbox"|"scalar"|"freetext"

export type Question={
    title: string
    description: string
    input: QuestionInput,
    alternatives?: string[]
    scalarAlternatives?: number[]
}

export type QuestionPages={
    pages: Question[]
}

export type Answer={
    input: QuestionInput,
    freeTextAnswer?: string,
    choiceAnswers?: boolean[],
    scalar?: number,
    acceptable: boolean
}