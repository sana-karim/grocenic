import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

interface ListItemProps {
    itemLabel: string | number;
    quantity?: string | number;
};

export const ListItem: React.FC<ListItemProps> = ({ itemLabel, quantity }) => {
    return (
        <View style={styles.container}>
            <Text>{itemLabel}</Text>
            <Text>{quantity}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: GrocenicTheme.spacing.md,
        paddingHorizontal: GrocenicTheme.spacing.sm,
        marginVertical: GrocenicTheme.spacing.xs,
        backgroundColor: GrocenicTheme.colors.background,
        borderRadius: GrocenicTheme.borderRadius.md,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})