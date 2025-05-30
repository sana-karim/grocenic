import React from "react";
import { StyleSheet, Text } from "react-native";

interface primaryTextProps {
    text: string | number;
    customStyle?: object;
}

export const PrimaryText: React.FC<primaryTextProps> = ({ text, customStyle }) => {
    return (
        <Text style={[styles.textStyle, customStyle]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        textAlignVertical: 'center',
        includeFontPadding: false
    }
})