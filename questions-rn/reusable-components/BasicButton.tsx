import { TouchableOpacity, StyleSheet, View, Text } from "react-native"
import { Theme } from "../injection/Injection"

const styles=StyleSheet.create({
    wrapper: {
        backgroundColor: Theme.Colors.cta,
        borderRadius: 8
    },
    wrapperDisabled: {
        backgroundColor: Theme.Colors.ctaDisabled,
        borderRadius: 8
    },
    buttonText: {
        color: Theme.Colors.text,
        fontSize: 20,
        paddingVertical: Theme.Paddings.D,
        textAlign: "center"
    }
})

type Props={
    title: string,
    disabled: boolean,
    onPress: () => void
}
function BasicButton({ title, disabled, onPress }: Props) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
            <View style={disabled? styles.wrapperDisabled:styles.wrapper}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BasicButton