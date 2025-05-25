import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

interface SubHeaderProps {
    headerLabel: string;
}

export const SubHeader: React.FC<SubHeaderProps> = ({ headerLabel }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.subHeaderLabel}>{headerLabel}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: GrocenicTheme.spacing.md,
    },
    subHeaderLabel: {
        fontSize: GrocenicTheme.fontSize.title,
        fontFamily: GrocenicTheme.fonts.medium,
        color: GrocenicTheme.colors.textSecondary
    }
})