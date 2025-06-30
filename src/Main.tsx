import { useEffect } from "react";
import { StatusBar } from "react-native";
// import { ToastProvider } from 'react-native-toast-notifications';
import MainNavigation from "./navigation/navigation";
import { GrocenicTheme } from "./theme/GrocenicTheme";
import BootSplash from "react-native-bootsplash";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/toasts/utils/ToastConfig";

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
        <Provider store={store}>
            <StatusBar
                animated={true}
                backgroundColor={GrocenicTheme.colors.textPrimary}
            />
            {/* <ToastProvider> */}
            <MainNavigation />
            <Toast config={toastConfig} />
            {/* </ToastProvider> */}
        </Provider>
    )
}