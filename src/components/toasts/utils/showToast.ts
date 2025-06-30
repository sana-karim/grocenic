import Toast from "react-native-toast-message";
import { ToastTypes } from "./toastTypes";

interface ShowToastOptions {
    type: ToastTypes;
    message: string;
    backgroundColor?: string;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss?: () => void;
    duration?: number;
    onAutoDismiss?: () => void;
}

export const showToast = ({ type, message, backgroundColor, actionLabel, onAction, onDismiss, duration = 3000, onAutoDismiss }: ShowToastOptions) => {
    Toast.show({
        type: 'custom',
        text1: message,
        position: 'top',
        autoHide: true,
        visibilityTime: duration,
        props: {
            type,
            backgroundColor,
            onAction,
            actionLabel,
            onDismiss,
        }
    });

    if (onAutoDismiss) {
        setTimeout(() => {
            onAutoDismiss();
        }, duration);
    };
};