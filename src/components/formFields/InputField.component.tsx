import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { TextStyle, View, ViewStyle } from "react-native";
import { PrimaryText } from "../texts/PrimaryText";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

export interface InputFieldRef {
    value: string;             //Current text value
    validate: () => boolean;   //Run validation: returns true if valid
    reset: () => void;         //Clear the field and errors
}

interface InputFieldProps {
    id: string | number;
    type?: 'text' | 'number';
    name: string;
    formData: any;
    placeholder?: string;
    required?: boolean;
    validationMsg?: string;
    containerStyle?: ViewStyle;
    isEdit: boolean;
    defaultValue?: string;
    inputStyle?: TextStyle;
    errorStyle?: TextStyle;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
}

export const InputField = forwardRef<InputFieldRef, InputFieldProps>(({
    id,
    type = 'text',
    name,
    formData,
    placeholder = '',
    required = false,
    validationMsg = 'This field is required',
    containerStyle,
    inputStyle,
    isEdit,
    defaultValue,
    errorStyle,
    onChangeText: onChangeTextProp,
    onBlur: onBlurProp
}, ref) => {

    const valueRef = useRef<string>(!!defaultValue ? formData.current[name] = defaultValue : ''); // to store input value
    const [error, setError] = useState<string>('') // to store error msg

    if (isEdit && id !== undefined) {
        formData.current['id'] = id;
    }
    if ((!isEdit && id === undefined) || (!isEdit && id !== undefined)) {
        delete formData.current.id;
    }

    const validate = (): boolean => {
        let errorMsg = '';
        if (required && !valueRef.current) {
            errorMsg = validationMsg;
        } else if (type === 'number' && valueRef.current) {
            if (isNaN(Number(valueRef.current))) {
                errorMsg = 'Invalid number';
            }
        }
        setError(errorMsg);
        return !errorMsg; //return true if no error
    }

    useImperativeHandle(ref, () => ({
        get value() {
            return valueRef.current;
        },
        validate: () => validate(),
        reset: () => {
            valueRef.current = '';
            setError('');
        }
    }));

    const onChangeText = (inputText: string) => {
        valueRef.current = inputText; //updating ref here
        formData.current[name] = inputText;
        onChangeTextProp?.(inputText);   // bubble up if needed
        if (!!inputText) {
            validate();
        };
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                placeholderTextColor={GrocenicTheme.colors.textSecondary}
                placeholder={placeholder}
                keyboardType={type === 'number' ? 'numeric' : 'default'}
                onChangeText={onChangeText}
                defaultValue={valueRef.current}
                onBlur={() => {
                    //validate();             / / validating on blur
                    onBlurProp?.();
                }}
                style={[styles.inputField, inputStyle, { borderColor: error ? GrocenicTheme.colors.danger : 'transparent' }]}
            />
            {error && <PrimaryText text={error} customStyle={[styles.errorText, errorStyle]} />}
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0
    },
    inputField: {
        backgroundColor: GrocenicTheme.colors.background,
        paddingHorizontal: GrocenicTheme.spacing.md,
        borderRadius: GrocenicTheme.borderRadius.md,
        fontFamily: GrocenicTheme.fonts.medium,
        fontSize: GrocenicTheme.fontSize.medium,
        color: GrocenicTheme.colors.textPrimary,
        borderWidth: 1,
    },
    errorText: {
        marginTop: GrocenicTheme.spacing.xs,
        fontFamily: GrocenicTheme.fonts.semiBold,
        color: GrocenicTheme.colors.danger
    },
});