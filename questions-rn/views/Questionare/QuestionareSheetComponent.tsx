import { Question } from "@/shared-types/QuestionsResponse"
import { AnswerHolder } from "../../AnswerHolder"
import { View, Text, TextInput, KeyboardAvoidingView, Platform, FlatList, TouchableWithoutFeedback } from "react-native"
import BasicButton from "../../reusable-components/BasicButton"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Theme } from "../../injection/Injection"

type Props={
    questionPage: Question,
    answer: AnswerHolder,
    answerUpdated: () => void,
    continueToNextQuestion: () => void
}

function QuestionareSheetComponent({
    questionPage,
    answer,
    answerUpdated,
    continueToNextQuestion
}: Props) {
    const insets=useSafeAreaInsets()

    return (
        <View style={{ flex: 1, alignContent: "flex-end" }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 24 }}>{questionPage.title}</Text>
                <Text>{questionPage.description}</Text>
                <QuestionareSheetInput
                    questionPage={questionPage}
                    answer={answer}
                    answerUpdated={answerUpdated}
                />
            </View>
            <KeyboardAvoidingView keyboardVerticalOffset={insets.top} behavior={Platform.OS==='ios'? 'padding':'height'}>
                <BasicButton
                    disabled={!answer.acceptable}
                    onPress={continueToNextQuestion}
                    title="Continue"
                />
            </KeyboardAvoidingView>
        </View>
    )
}

type InputProps={
    questionPage: Question,
    answer: AnswerHolder,
    answerUpdated: () => void
}
const inputAccessoryViewID="QuestionareInputAccessoryId"

function QuestionareSheetInput({
    questionPage,
    answer,
    answerUpdated
}: InputProps) {
    switch (questionPage.input) {
        case "freetext":
            return (
                <View style={{ borderRadius: 8 }}>
                    <TextInput placeholder="Input answer" inputAccessoryViewID={inputAccessoryViewID} multiline={true} style={{ backgroundColor: "#f9f9f9", borderRadius: 8, minHeight: 200, maxHeight: 200 }} onChangeText={t => {
                        answer.freeTextAnswer=t
                        answerUpdated()
                    }} />
                </View>
            )
        case "radio":
            return <FlatList
                renderItem={info => (
                    <Checkbox
                        onPress={() => {
                            updateAnswerRadio(questionPage.alternatives!, answer, info.index)
                            answerUpdated()
                        }}
                        title={info.item}
                        selected={answer.choiceAnswers? answer.choiceAnswers[info.index]:false}
                    />
                )}
                ItemSeparatorComponent={Seperator}
                data={questionPage.alternatives!}
            />
        case "checkbox":
            return <FlatList
                renderItem={info => (
                    <Checkbox
                        onPress={() => {
                            updateAnswerCheckbox(questionPage.alternatives!, answer, info.index)
                            answerUpdated()
                        }}
                        title={info.item}
                        selected={answer.choiceAnswers? answer.choiceAnswers[info.index]:false}
                    />
                )}
                ItemSeparatorComponent={Seperator}
                data={questionPage.alternatives!}
            />
        case "scalar":
            return (
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={info => (
                        <ScalarSelection selected={answer.scalar===info.item} title={info.item} onPress={() => {
                            answer.scalar=info.item
                            answerUpdated()
                        }} />
                    )}
                    ItemSeparatorComponent={HorizontalSeperator}
                    data={questionPage.scalarAlternatives!}
                    contentContainerStyle={{ alignItems: "center" }}
                />
            )
        default:
            // Probably show an error view and allow user to continue to next question
            return null
    }
}

const updateAnswerCheckbox=(
    alternatives: string[],
    answer: AnswerHolder,
    index: number
) => {
    if (!answer.choiceAnswers) {
        answer.choiceAnswers=alternatives.map(_ => false)
    }
    answer.choiceAnswers[index]=!answer.choiceAnswers[index]
}

const updateAnswerRadio=(
    alternatives: string[],
    answer: AnswerHolder,
    index: number
) => {
    answer.choiceAnswers=alternatives.map(_ => false)
    answer.choiceAnswers[index]=true
}

function Checkbox({ title, selected, onPress }: { title: string, selected: boolean, onPress: () => void }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ backgroundColor: selected? Theme.Colors.cta:Theme.Colors.ctaDisabled, flex: 1 }}>
                <Text style={{ paddingVertical: Theme.Paddings.D, fontSize: 16 }}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

function ScalarSelection({ title, selected, onPress }: { title: number, selected: boolean, onPress: () => void }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ backgroundColor: selected? Theme.Colors.primary:Theme.Colors.ctaDisabled, height: 100, width: 100, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 40 }}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

function Seperator() {
    return <View style={{ height: Theme.Paddings.B }} />
}

function HorizontalSeperator() {
    return <View style={{ width: Theme.Paddings.B }} />
}


export default QuestionareSheetComponent