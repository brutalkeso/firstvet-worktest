export type QuestionInput="radio"|"checkbox"|"scalar"|"freetext"|"unsupportedAddedType"

export type Question={
    question: string,
    input: QuestionInput
}

export type QuestionPage={
    questions: Question[]
}