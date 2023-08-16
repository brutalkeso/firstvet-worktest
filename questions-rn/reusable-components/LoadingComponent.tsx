import { StyleSheet, ActivityIndicator, View, Text } from "react-native"
import { Theme } from "../injection/Injection"

const styles=StyleSheet.create({
    wrapper: {
        backgroundColor: Theme.Colors.primary,
        borderRadius: 8,
        paddingVertical: Theme.Paddings.D
    },
    text: {
        textAlign: "center",
        color: Theme.Colors.text,
        marginBottom: Theme.Paddings.B
    }
})

function LoadingComponent() {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>Fetching questions</Text>
            <ActivityIndicator />
        </View>
    )
}

export default LoadingComponent