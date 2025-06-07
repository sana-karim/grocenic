import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";
import { ContextMenu } from "../contextMenu/ContextMenu.component";
import { ContextMenuItemTypes } from "../contextMenu/utils/ContextMenuItemTypes";

interface ListItemProps {
    id: string | number;
    itemLabel: string | number;
    quantity?: string | number;
    onOptBtn?: any;
};

export const ListItem: React.FC<ListItemProps> = ({ id, itemLabel, quantity, onOptBtn }) => {

    const onEdit = (itemId: string | number) => {
        const data = { type: ContextMenuItemTypes.EDIT, id: itemId, name: itemLabel, quantity: quantity };
        onOptBtn(data);
    }
    const onDelete = (itemId: string | number) => {
        const data = { type: ContextMenuItemTypes.DELETE, id: itemId, name: itemLabel, quantity: quantity };
        onOptBtn(data);
    }
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{itemLabel}</Text>
                <Text style={styles.quantity}>{quantity}</Text>
            </View >
            <ContextMenu
                id={id}
                options={[
                    { label: 'Edit', onPress: () => onEdit(id) },
                    { label: 'Delete', onPress: onDelete, textStyle: { color: GrocenicTheme.colors.danger } },
                ]}
            >
                <Image source={require('../../assets/images/more_option.png')} />
            </ContextMenu>
        </View >

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