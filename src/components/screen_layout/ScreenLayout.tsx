import React from "react";
import { StyleSheet, View } from "react-native";
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
        <View style={[styles.container, { backgroundColor }]}>
            {/* Top safe area space */}
            <View style={{ height: insets.top }} />

            {/* Optional Header */}
            {headerComponent}

            {/* Main Content Area */}
            <View style={[
                styles.content,
                { paddingBottom: insets.bottom },
            ]}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 2
    },
    content: {
        flex: 1,
    }
})