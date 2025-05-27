import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { ToastProvider } from 'react-native-toast-notifications';
import MainNavigation from "./navigation/navigation";
import { GrocenicTheme } from "./theme/GrocenicTheme";
import BootSplash from "react-native-bootsplash";

export const Main = () => {

    useEffect(() => {
        const init = async () => {
            // …do multiple sync or async tasks
        };

        init().finally(async () => {
            await BootSplash.hide({ fade: true });
        });
    }, []);

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