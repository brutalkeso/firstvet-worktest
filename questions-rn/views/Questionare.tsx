import { Text } from "react-native"
import { useEffect, useState, useRef } from "react"
import QuestionsMicroservice from "../network/QuestionsMicroservice"
import { questionsMicroservice } from "../injection/Injection"
import BetterSafeAreaView from "./BetterSafeAreaView"

import { QuestionPage, QuestionPages } from "@/shared-types/QuestionsResponse"

type ViewState="initial"|"loading"|"error"|"data"

type Props={ questionMs?: QuestionsMicroservice }

function Questionare({
    questionMs=questionsMicroservice
}: Props) {
    const [viewState, setViewState]=useState<ViewState>("initial")
    const data=useRef<QuestionPages>()

    useEffect(() => {
        data.current=undefined
        if (viewState!=="loading"&&viewState!=="initial") {
            setViewState("loading")
        }

        questionMs.questions()
            .then(result => {
                data.current=result
                setViewState("data")
            }).catch(e => {
                console.log(e)
                setViewState("error")
            })
    }, [])

    switch (viewState) {
        case "initial":
        case "loading":
            return <BetterSafeAreaView><Text>loading</Text></BetterSafeAreaView>
        case "data":
            return <BetterSafeAreaView><Text>data</Text></BetterSafeAreaView>
        case "error":
            return <BetterSafeAreaView><Text>error</Text></BetterSafeAreaView>
    }
}

export default Questionare