import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { InteractionManager, Keyboard, StyleSheet, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";
import { PrimaryText } from "../texts/PrimaryText";

export interface InputFieldRef {
    value: string;             //Current text value
    validate: () => boolean;   //Run validation: returns true if valid
    reset: () => void;         //Clear the field and errors
    clear: () => void;         //
    focus: () => void;       //focus the input from parent : Optional
}

interface InputFieldProps {
    id: string | number | undefined;
    name: string;
    formData: any;
    isEdit: boolean;
    type?: 'text' | 'number';
    placeholder?: string;
    required?: boolean;
    validationMsg?: string;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    errorStyle?: TextStyle;
    defaultValue?: string;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
    autoFocus?: boolean;
    returnKeyType?: 'next' | 'done';
}

// Shared map to reference all inputs by name
const inputRefsMap: { [key: string]: TextInput | null } = {};

export const InputField = forwardRef<InputFieldRef, InputFieldProps>(({
    id,
    name,
    formData,
    isEdit,
    type = 'text',
    placeholder = '',
    required = false,
    validationMsg = 'This field is required',
    containerStyle,
    inputStyle,
    errorStyle,
    defaultValue,
    onChangeText: onChangeTextProp,
    onBlur: onBlurProp,
    autoFocus = false,
    returnKeyType = 'next'
}, ref) => {

    const valueRef = useRef<string>(!!defaultValue ? formData.current[name] = defaultValue : ''); // to store input value
    const [error, setError] = useState<string>('') // to store error msg
    const inputRef = useRef<TextInput>(null);      //using this internal ref only for keyboard open on focused modal open

    //Autofocus
    useEffect(() => {
        if (autoFocus && !isEdit) {
            InteractionManager.runAfterInteractions(() => {
                requestAnimationFrame(() => {
                    inputRef.current?.focus();
                });
            })
        }
    }, [autoFocus]);

    useEffect(() => {
        inputRefsMap[name] = inputRef.current;
        return () => {
            delete inputRefsMap[name];
        };
    }, []);

    if (isEdit && id !== undefined) {
        formData.current['id'] = id;
        formData.current['type'] = 'UPDATE';
    }
    if ((!isEdit && id === undefined) || (!isEdit && id !== undefined)) {
        delete formData.current.id;
        formData.current['type'] = 'CREATE';
    }

    // === Validation ===
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

    // === Expose Methods to Parent via Ref ===
    useImperativeHandle(ref, () => ({
        get value() {
            return valueRef.current;
        },
        validate: () => validate(),
        reset: () => {
            valueRef.current = '';
            formData.current[name] = '';
            inputRef.current?.clear();
            setError('');
        },
        clear: () => {
            valueRef.current = '';
            formData.current[name] = '';
            inputRef.current?.clear();
        },
        focus: () => {
            InteractionManager.runAfterInteractions(() => {
                requestAnimationFrame(() => {
                    inputRef.current?.focus();
                })
            })
        }
    }));

    // === Handlers ===
    const onChangeText = (inputText: string) => {
        valueRef.current = inputText; //updating ref here
        formData.current[name] = inputText;
        onChangeTextProp?.(inputText);   // bubble up if needed
        if (!!inputText) {
            validate();
        };
    };

    const handleSubmitEditing = () => {
        const keys = Object.keys(inputRefsMap);
        const currentIndex = keys.indexOf(name);
        if (currentIndex !== -1 && currentIndex + 1 < keys.length) {
            const nextInput = inputRefsMap[keys[currentIndex + 1]];
            nextInput?.focus();
        } else {
            Keyboard.dismiss();
        }
    };

    const handleBlur = () => {
        // validate();         //Validating on blur
        onBlurProp?.();
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                ref={inputRef}                              //using this internal ref only for keyboard open on focused modal open
                placeholder={placeholder}
                placeholderTextColor={GrocenicTheme.colors.textSecondary}
                keyboardType={type === 'number' ? 'numeric' : 'default'}
                returnKeyType={returnKeyType}
                defaultValue={valueRef.current}
                onChangeText={onChangeText}
                onSubmitEditing={handleSubmitEditing}
                onBlur={handleBlur}
                blurOnSubmit={false}
                style={[
                    styles.inputField,
                    inputStyle,
                    { borderColor: error ? GrocenicTheme.colors.danger : 'transparent' }
                ]}
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