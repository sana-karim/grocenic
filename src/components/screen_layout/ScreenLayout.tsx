import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

interface ScreensLayoutProps {
    headerComponent?: React.ReactNode,
    children: React.ReactNode,
    backgroundColor?: string,
}

export const ScreenLayout: React.FC<ScreensLayoutProps> = ({ headerComponent, children, backgroundColor = GrocenicTheme.colors.background }) => {

    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>

            {/* Optional Header */}
            {headerComponent}

            {/* Main Content Area */}
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    }
})