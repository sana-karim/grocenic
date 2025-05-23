import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { ToastProvider } from 'react-native-toast-notifications';
import MainNavigation from "./navigation/navigation";
import { GrocenicTheme } from "./theme/GrocenicTheme";

export const Main = () => {

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={GrocenicTheme.colors.textPrimary}
            />
            <ToastProvider>
                <MainNavigation />
            </ToastProvider>
        </>
    )
}