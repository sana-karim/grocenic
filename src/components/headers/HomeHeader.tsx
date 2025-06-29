import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

interface HomeHeaderProps {
    showDelete?: boolean;
    showSelectAll?: boolean;
    showDeselectAll?: boolean;
    onSelectAll?: () => void;
    onDeselectAll?: () => void;
    onDelete?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ showDelete, showSelectAll, showDeselectAll, onSelectAll, onDeselectAll, onDelete }) => {

    const renderButtons = (): any => {
        return (
            <>
                {
                    showDelete &&
                    <TouchableOpacity style={styles.headerBtns}
                        activeOpacity={0.8}
                        onPress={onDelete}
                    >
                        <Image source={require('../../assets/images/trash.png')} />
                    </TouchableOpacity>
                }
                {
                    showSelectAll &&
                    <TouchableOpacity style={[styles.headerBtns, { right: '17%' }]}
                        activeOpacity={0.8}
                        onPress={onSelectAll}
                    >
                        <Image source={require('../../assets/images/select_all.png')} />
                    </TouchableOpacity>
                }
                {
                    showDeselectAll &&
                    <TouchableOpacity style={[styles.headerBtns, { right: '17%' }]}
                        activeOpacity={0.8}
                        onPress={onDeselectAll}
                    >
                        <Image source={require('../../assets/images/deselect_all.png')} />
                    </TouchableOpacity>
                }
            </>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headerLabel}>Grocenic</Text>
                {renderButtons()}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 4,
        paddingHorizontal: GrocenicTheme.spacing.md,
        backgroundColor: GrocenicTheme.colors.background
    },
    headerLabel: {
        fontSize: GrocenicTheme.fontSize.headerTitle,
        color: GrocenicTheme.colors.textPrimary,
        fontFamily: GrocenicTheme.fonts.medium,
    },
    headerBtns: {
        position: 'absolute',
        top: '30%',
        right: GrocenicTheme.spacing.md,
    }
})