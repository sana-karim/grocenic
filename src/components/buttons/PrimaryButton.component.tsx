import React from "react";
import { GrocenicTheme } from "../../theme/GrocenicTheme";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { PrimaryText } from "../texts/PrimaryText";

interface PrimaryButtonProps {
    label: string;
    onPress: () => void;
    bgColor?: string;
    labelStyle?: object;
    containerStyle?: object;
    disabled?: boolean;
    showLoadingSpinner?: boolean;
    loadingSpinnerColor?: string;
    children?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    label = "Button",
    onPress,
    bgColor,
    labelStyle,
    containerStyle = null,
    disabled = false,
    showLoadingSpinner = false,
    loadingSpinnerColor = GrocenicTheme.colors.white,
    children
}) => {

    const getBackgroundColor = () => {
        if (!!bgColor) {
            return {
                backgroundColor: bgColor,
            };
        }
        return null;
    };

    const renderContent = () => {
        if (showLoadingSpinner) {
            return (
                <ActivityIndicator size={18} color={loadingSpinnerColor} />
            )
        }
        return (
            <PrimaryText text={label} customStyle={[styles.label, labelStyle]} />
        )
    }

    return (
        <TouchableOpacity
            style={[styles.container, getBackgroundColor(), containerStyle, disabled && styles.disabled]}
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled || showLoadingSpinner}
        >
            {renderContent()}
            {children && children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        backgroundColor: GrocenicTheme.colors.primary,
        borderRadius: GrocenicTheme.borderRadius.md,
        paddingVertical: 11,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        textAlign: 'center',
        fontSize: GrocenicTheme.fontSize.medium,
        color: GrocenicTheme.colors.white,
        fontFamily: GrocenicTheme.fonts.semiBold,
    },
    disabled: {
        backgroundColor: GrocenicTheme.colors.primaryDisabled
    }
})