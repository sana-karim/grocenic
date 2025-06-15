import React, { useRef } from "react";
import { ModalWrapper } from "../ModalWrapper.component";
import { Image, TouchableOpacity, View } from "react-native";
import styles from './AddItemModal.style';
import { PrimaryText } from "../../texts/PrimaryText";
import { InputField, InputFieldRef } from "../../formFields/InputField.component";
import { PrimaryButton } from "../../buttons/PrimaryButton.component";
import { useAppDispatch } from "../../../redux/hooks";
import { createItem, editItem } from "../../../redux/thunks/itemsThunks";

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
                        ref={ref => { inputRefs.current['name'] = ref }}
                        name={'name'}
                        formData={formDataRef}
                        placeholder="Enter item name"
                        isEdit={isEdit}
                        id={defaultValue?.id ?? ''}
                        defaultValue={defaultValue?.name ?? ''}
                        required={true}
                        containerStyle={{ marginBottom: 16 }}
                        validationMsg='Item name is required'
                    />
                    <InputField
                        ref={ref => { inputRefs.current['quantity'] = ref }}
                        formData={formDataRef}
                        name={'quantity'}
                        placeholder="Enter quantity"
                        isEdit={isEdit}
                        id={defaultValue?.id ?? ''}
                        defaultValue={defaultValue?.quantity ?? ''}
                        required={true}
                        containerStyle={{ marginBottom: 16 }}
                        validationMsg='Quantity is required'
                    />
                    <PrimaryButton label={isEdit ? 'Update' : 'Add'} onPress={handleSubmit} containerStyle={styles.btnStyle} labelStyle={styles.btnLabel} />
                </View>
            </View>
        </ModalWrapper >
    )

}