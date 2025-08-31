import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { GrocenicTheme } from "../../theme/GrocenicTheme";
import { PrimaryText } from "../texts/PrimaryText";
import { AppToastProps, TypeColors } from "./utils/toastTypes";

export const AppToast: React.FC<AppToastProps> = ({ type, message, backgroundColor, actionLabel = 'Action', onAction, onDismiss }) => {

    const slideAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(slideAnimation, {
            toValue: 0,
            useNativeDriver: true,
            friction: 6,
        }).start();
    }, []);

    const handleDismiss = () => {
        if (!!onDismiss) onDismiss();
        Toast.hide();
    };

    const handleAction = () => {
        if (!!onAction) onAction();
        Toast.hide();
    };

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                { backgroundColor: type === 'action' ? backgroundColor || TypeColors[type] : TypeColors[type] || GrocenicTheme.toastColors.default },
                { transform: [{ translateX: slideAnimation }] }
            ]}
        >
            <PrimaryText text={message} customStyle={styles.message} />
            {
                type === 'action' && (
                    <TouchableOpacity activeOpacity={0.8} onPress={handleAction}>
                        <PrimaryText text={actionLabel} customStyle={styles.action} />
                    </TouchableOpacity>
                )
            }
            <TouchableOpacity activeOpacity={0.8} onPress={handleDismiss} style={styles.closeButton}>
                <Image source={require('../../assets/images/close_icon_light.png')} />
            </TouchableOpacity>
        </Animated.View >
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 8,
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 4,
        overflow: 'hidden',
    },
    message: {
        color: GrocenicTheme.colors.white,
        flex: 1,
        marginRight: 8,
        fontSize: 14,
    },
    action: {
        color: GrocenicTheme.colors.white,
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 12,
    },
    closeButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    closeText: {
        color: GrocenicTheme.colors.white,
        fontSize: 16,
    },
});