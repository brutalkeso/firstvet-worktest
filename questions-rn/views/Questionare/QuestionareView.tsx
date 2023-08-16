import { useEffect, useState } from "react"
import QuestionsMicroservice from "../../network/QuestionsMicroservice"
import { Theme, questionsMicroservice } from "../../injection/Injection"
import BetterSafeAreaView from "../BetterSafeAreaView"
import QuestionareFetchComponent from "./QuestionareFetchComponent"
import { StartState } from "../StartState"

import { QuestionPages, Answer } from "@/shared-types/QuestionsResponse"
import QuestionareSheetComponent from "./QuestionareSheetComponent"

const markAsAcceptableIfAnswered=(answer: Answer) => {
    switch (answer.input) {
        case "freetext":
            // only text with length over one is acceptable
            answer.acceptable=!!answer.freeTextAnswer?.length
            break
        case "radio":
            answer.acceptable=!!answer.choiceAnswers?.find(v => v)
            break
        case "scalar":
            answer.acceptable=answer.scalar!==undefined
            break
        case "checkbox":
            answer.acceptable=(answer.choiceAnswers?.length??0)>0
            break
        default:
            break
    }
}

type Props={ questionsMs?: QuestionsMicroservice }
type Data={ questions: QuestionPages, answers: Answer[], pageIndex: number }

// TODO: Double check that updates are batched in RN with react 18
function QuestionareView({
    questionsMs=questionsMicroservice
}: Props) {
    const [startState, setStartState]=useState<StartState>("initial")
    const [data, setData]=useState<Data>()

    useEffect(() => {
        setData(undefined)
        if (startState!=="loading"&&startState!=="initial") {
            setStartState("loading")
        }

        questionsMs.questions()
            .then(result => {
                const answers: Answer[]=result.pages.map(page => {
                    return {
                        input: page.input,
                        acceptable: false
                    }
                })
                setData({ questions: result, answers, pageIndex: 0 })
            }).catch(e => {
                console.log(e)
                setStartState("error")
            })
    }, [])

    if (data) {
        const answerUpdated=() => {
            const answer=data.answers[data.pageIndex]
            const newData={ ...data }
            markAsAcceptableIfAnswered(answer)
            newData.answers[newData.pageIndex]=answer
            setData(newData)
        }

        const continueToNextQuestion=() => {
            if (!data.answers[data.pageIndex].acceptable) { return }

            if (data.pageIndex===data.answers.length-1) {
                // go to end screen
            } else {
                const newData={ ...data }
                newData.pageIndex+=1
                setData(newData)
            }
        }

        return (
            <BetterSafeAreaView style={{ marginHorizontal: Theme.Paddings.column }}>
                <QuestionareSheetComponent
                    questionPage={data.questions.pages[data.pageIndex]}
                    answer={data.answers[data.pageIndex]}
                    answerUpdated={answerUpdated}
                    continueToNextQuestion={continueToNextQuestion}
                />
            </BetterSafeAreaView>
        )
    }

    return (
        <BetterSafeAreaView style={{ marginHorizontal: Theme.Paddings.column }}>
            <QuestionareFetchComponent
                startState={startState}
            />
        </BetterSafeAreaView>
    )
}

export default QuestionareView