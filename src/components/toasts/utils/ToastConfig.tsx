import { ToastConfigParams } from 'react-native-toast-message';
import { AppToast } from '../AppToast.component';
import { AppToastProps } from './toastTypes';

export const toastConfig = {
    custom: ({ text1, props }: ToastConfigParams<AppToastProps>) => (
        <AppToast
            type={props.type}
            message={text1 || ''}
            backgroundColor={props?.backgroundColor}
            actionLabel={props?.actionLabel}
            onAction={props?.onAction}
            onDismiss={props?.onDismiss}
        />
    ),
};