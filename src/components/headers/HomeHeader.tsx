import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

export const HomeHeader: React.FC = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headerLabel}>Grocenic</Text>
                <TouchableOpacity style={styles.addItemBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                        //TODO: function called later
                    }}
                >
                    <Image source={require('../../assets/images/add_item.png')} />
                </TouchableOpacity>
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
    addItemBtn: {
        position: 'absolute',
        top: '30%',
        right: GrocenicTheme.spacing.md,
    }
})