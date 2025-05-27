import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

interface ListItemProps {
    itemLabel: string | number;
    quantity?: string | number;
    onOptBtn?: any
};

export const ListItem: React.FC<ListItemProps> = ({ itemLabel, quantity, onOptBtn }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{itemLabel}</Text>
                <Text style={styles.quantity}>{quantity}</Text>
            </View >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    //TODO: function called later
                }}
            >
                <Image source={require('../../assets/images/more_option.png')} />
            </TouchableOpacity>
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
        flexDirection: 'row',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: GrocenicTheme.spacing.sm,
        flex: 1,
    },
    text: {
        fontSize: GrocenicTheme.fontSize.medium,
        fontFamily: GrocenicTheme.fonts.medium,
        color: GrocenicTheme.colors.textPrimary
    },
    quantity: {
        fontSize: GrocenicTheme.fontSize.medium,
        fontFamily: GrocenicTheme.fonts.medium,
        color: GrocenicTheme.colors.textSecondary
    }
})