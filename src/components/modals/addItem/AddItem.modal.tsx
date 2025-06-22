import React, { useRef } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "../../../redux/hooks";
import { createItem, editItem } from "../../../redux/thunks/itemsThunks";
import { PrimaryButton } from "../../buttons/PrimaryButton.component";
import { InputField, InputFieldRef } from "../../formFields/InputField.component";
import { PrimaryText } from "../../texts/PrimaryText";
import { ModalWrapper } from "../ModalWrapper.component";
import styles from './AddItemModal.style';

type defaultValueData = {
    id: number | string | undefined;
    name: string;
    quantity: string;
};

interface AddItemModalProps {
    show: boolean;
    onClose: () => void;
    defaultValue?: defaultValueData;
    isEdit?: boolean;
}

// In the future, if we need to collect the user's gender and age from this modal,
// we should pass the input fields and refs from the parent component.

export const AddItemModal: React.FC<AddItemModalProps> = ({ show, onClose, isEdit = false, defaultValue = {} }) => {

    const inputRefs = useRef<{ [key: string]: InputFieldRef | null }>({});
    const formDataRef = useRef<{ [key: string]: any }>(isEdit && defaultValue ? { ...defaultValue } : {});

    const dispatch = useAppDispatch();

    const handleSubmit = () => {

        let allValid = true;

        Object.values(inputRefs.current).forEach(ref => {
            if (ref && typeof ref.validate === 'function') {
                const isValid = ref.validate();
                if (!isValid) {
                    allValid = false;
                }
            }
        });

        if (allValid) {

            if (formDataRef.current?.type === 'CREATE') {
                const payload = {
                    name: formDataRef.current.name,
                    quantity: formDataRef.current.quantity,
                    shared: false
                };
                dispatch(createItem(payload));
            } else if (formDataRef.current?.type === 'UPDATE') {
                const payload = {
                    id: formDataRef.current.id,
                    name: formDataRef.current.name,
                    quantity: formDataRef.current.quantity,
                    shared: false
                };
                dispatch(editItem(payload));
            }

            onClose();
        }
    }

    return (
        <ModalWrapper show={show} onClose={onClose}>
            <View style={styles.addItemContainer}>
                <View style={styles.headerContainer}>
                    <PrimaryText text={isEdit ? 'Update Item' : 'Add Item'} customStyle={styles.modalTitle} />
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.8}>
                        <Image source={require('../../../assets/images/close_icon.png')} resizeMode={'center'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <InputField
                        id={defaultValue?.id ?? ''}
                        name={'name'}
                        formData={formDataRef}
                        isEdit={isEdit}
                        placeholder="Enter item name"
                        required={true}
                        validationMsg='Item name is required'
                        containerStyle={{ marginBottom: 16 }}
                        defaultValue={defaultValue?.name ?? ''}
                        autoFocus
                        ref={ref => { inputRefs.current['name'] = ref }}
                    />
                    <InputField
                        id={defaultValue?.id ?? ''}
                        name={'quantity'}
                        formData={formDataRef}
                        isEdit={isEdit}
                        placeholder="Enter quantity"
                        required={true}
                        validationMsg='Quantity is required'
                        containerStyle={{ marginBottom: 16 }}
                        defaultValue={defaultValue?.quantity ?? ''}
                        returnKeyType="done"
                        ref={ref => { inputRefs.current['quantity'] = ref }}
                    />
                    <PrimaryButton label={isEdit ? 'Update' : 'Add'} onPress={handleSubmit} containerStyle={styles.btnStyle} labelStyle={styles.btnLabel} />
                </View>
            </View>
        </ModalWrapper >
    )

}