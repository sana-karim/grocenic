import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

export const HomeHeader: React.FC = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headerLabel}>Grocenic</Text>
                <TouchableOpacity style={{ position: 'absolute', top: '41%', right: '3%', backgroundColor: GrocenicTheme.colors.cardBackground }}
                    activeOpacity={0.6}
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
        paddingBottom: 5,
        paddingHorizontal: 16,
        backgroundColor: GrocenicTheme.colors.cardBackground
    },
    headerLabel: {
        fontSize: GrocenicTheme.fontSize.title,
        color: GrocenicTheme.colors.textPrimary,
        fontFamily: GrocenicTheme.fonts.medium,
    }
})