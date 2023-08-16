import { View, ViewStyle } from "react-native"
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context"

const EdgeInsetsToViewStyle=(insets: EdgeInsets): ViewStyle => {
    return {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left
    }
}

type Props={ children: JSX.Element|JSX.Element[] }
function BetterSafeAreaView({
    children
}: Props) {
    const insets=useSafeAreaInsets()
    return (
        <View style={EdgeInsetsToViewStyle(insets)}>
            {children}
        </View>
    )
}

export default BetterSafeAreaView