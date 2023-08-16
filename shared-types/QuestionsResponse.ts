export type QuestionInput="radio"|"checkbox"|"scalar"|"freetext"|"unsupported-type"

export type Question={
    title: string
    input: QuestionInput
}

export type QuestionPage={
    questions: Question[]
}

export type QuestionPages={
    pages: QuestionPage[]
}