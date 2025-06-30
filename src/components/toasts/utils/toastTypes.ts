import { GrocenicTheme } from "../../../theme/GrocenicTheme";

export type ToastTypes = 'success' | 'warning' | 'danger' | 'action';

export interface AppToastProps {
    type: ToastTypes;
    message: string;
    backgroundColor?: string;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss?: () => void;
};

export const TypeColors: Record<ToastTypes, string> = {
    success: GrocenicTheme.toastColors.success,
    warning: GrocenicTheme.toastColors.warning,
    danger: GrocenicTheme.toastColors.danger,
    action: GrocenicTheme.toastColors.action
};