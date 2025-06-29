import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";
import { ContextMenu } from "../contextMenu/ContextMenu.component";
import { ContextMenuItemTypes } from "../contextMenu/utils/ContextMenuItemTypes";
import { PrimaryText } from "../texts/PrimaryText";

interface ListItemProps {
    id: string | number;
    itemLabel: string;
    quantity: string;
    isSelected: boolean;
    onLongPress: (item: { id: string | number; name: string; quantity: string }) => void;
    onPress: (item: { id: string | number; name: string; quantity: string }) => void;
    onOptBtn: (data: { type: string; id: string | number; name: string; quantity: string }) => void;
}

const ListItemComponent: React.FC<ListItemProps> = ({
    id,
    itemLabel,
    quantity,
    isSelected,
    onLongPress,
    onPress,
    onOptBtn,
}) => {
    const onEdit = (itemId: string | number) => {
        const data = { type: ContextMenuItemTypes.EDIT, id: itemId, name: itemLabel, quantity };
        onOptBtn(data);
    };

    const onDelete = (itemId: string | number) => {
        const data = { type: ContextMenuItemTypes.DELETE, id: itemId, name: itemLabel, quantity };
        onOptBtn(data);
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isSelected
                        ? GrocenicTheme.colors.selectedBackground
                        : GrocenicTheme.colors.background,
                },
            ]}
        >
            <TouchableOpacity
                style={{ zIndex: 10, flex: 1, justifyContent: 'center' }}
                activeOpacity={1}
                onPress={() => onPress({ id, name: itemLabel, quantity })}
                onLongPress={() => onLongPress({ id, name: itemLabel, quantity })}
            >
                <View style={styles.textContainer}>
                    <PrimaryText text={itemLabel} customStyle={styles.text} />
                    <PrimaryText text={quantity} customStyle={styles.quantity} />
                </View>
            </TouchableOpacity>
            <View style={styles.optionBtnContainer}>
                <ContextMenu
                    id={id}
                    options={[
                        { label: 'Edit', onPress: () => onEdit(id) },
                        {
                            label: 'Delete',
                            onPress: () => onDelete(id),
                            textStyle: { color: GrocenicTheme.colors.danger },
                        },
                    ]}
                >
                    <Image source={require('../../assets/images/more_option.png')} />
                </ContextMenu>
            </View>
        </View>
    );
};

// Export with memoization and a custom comparison function
export const ListItem = React.memo(ListItemComponent, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.itemLabel === next.itemLabel &&
        prev.quantity === next.quantity &&
        prev.isSelected === next.isSelected &&
        prev.onLongPress === next.onLongPress &&
        prev.onPress === next.onPress &&
        prev.onOptBtn === next.onOptBtn
    );
});

const styles = StyleSheet.create({
    container: {
        marginVertical: GrocenicTheme.spacing.xs,
        backgroundColor: GrocenicTheme.colors.background,
        borderRadius: GrocenicTheme.borderRadius.md,
        flexDirection: 'row',
    },
    textContainer: {
        paddingVertical: GrocenicTheme.spacing.md,
        paddingLeft: GrocenicTheme.spacing.sm,
        borderRadius: GrocenicTheme.borderRadius.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1,
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
    },
    optionBtnContainer: {
        justifyContent: 'center',
        paddingVertical: GrocenicTheme.spacing.md,
    }
})