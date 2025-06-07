import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import Modal from 'react-native-modal';

interface ModalWrapperProps {
    show: boolean
    children: React.ReactNode;
    onClose: () => void;
    modalContainerStyle?: object;
}

export const ModalWrapper: React.FC<PropsWithChildren<ModalWrapperProps>> = ({ show, children, onClose, modalContainerStyle }) => {
    return (
        <Modal
            isVisible={show}
            useNativeDriver
            statusBarTranslucent
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            backdropColor="#FFFFFF00"
            backdropOpacity={0.8}
            style={modalContainerStyle}
            hideModalContentWhileAnimating
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'transparent' }}>
                {children}
            </View>
        </Modal>
    )
}