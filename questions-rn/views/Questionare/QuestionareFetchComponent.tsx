import { Text, View } from "react-native"
import { StartState } from "../StartState"
import LoadingComponent from "../../reusable-components/LoadingComponent"
import ErrorComponent from "../../reusable-components/ErrorComponent"

type Props={ startState: StartState }
function QuestionareFetchComponent({ startState }: Props) {
    switch (startState) {
        case "initial":
        case "loading":
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <LoadingComponent />
                </View>
            )
        case "error":
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ErrorComponent retry={() => console.log("lol")} />
                </View>
            )
    }
}

export default QuestionareFetchComponent