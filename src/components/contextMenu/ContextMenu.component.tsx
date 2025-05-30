import React, { ReactNode, useEffect, useRef, useState } from "react";
import { BackHandler, Pressable, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";
import { findNodeHandle, TextStyle, ViewStyle } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

interface MenuOption {
    label: string;
    textStyle?: any;
    onPress: (id: string | number) => void;
}

interface ContextMenuProps {
    id: string | number;
    children: ReactNode;
    options: MenuOption[];
    menuStyle?: ViewStyle;
    optionStyle?: ViewStyle;
    optionTextStyle?: TextStyle;
}

let activeMenuId: string | number | null = null;
const listeners = new Set<(id: string | number | null) => void>();

function setActiveMenuId(id: string | number | null) {
    activeMenuId = id;
    listeners.forEach(cb => cb(id));
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ id, children, options, menuStyle, optionStyle, optionTextStyle }) => {

    const [visible, setVisible] = useState<Boolean>(false);
    const [position, setPosition] = useState<any>({ top: 0, right: 0 });
    const triggerRef = useRef<any>(null);

    useEffect(() => {
        const cb = (openId: string | number | null) => setVisible(openId === id);
        listeners.add(cb);
        setVisible(activeMenuId === id);

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (activeMenuId === id) {
                setActiveMenuId(null);
                return true;
            };
        });

        return () => {
            listeners.delete(cb);
            backHandler.remove();
        };
    }, [id])


    const openMenu = () => {
        const handle = findNodeHandle(triggerRef.current);
        if (handle) {
            UIManager.measure(handle, (_x, _y, width) => {
                setPosition({ top: _y, right: _y + width });
                setActiveMenuId(visible ? null : id);
                // setVisible((prev) => !prev);
            })
        }
    }

    const closeMenu = () => setActiveMenuId(null);

    return (
        <>
            <TouchableOpacity ref={triggerRef} onPress={openMenu}>
                {children}
            </TouchableOpacity>

            {
                visible && (
                    <Pressable style={[styles.contextContainer, { top: position.top, right: position.right }]} onPress={closeMenu}>
                        <View style={[styles.menu, menuStyle]}>

                            {
                                options.map((option, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={[styles.option, optionStyle]}
                                        onPress={() => {
                                            closeMenu();
                                            option.onPress(id);
                                        }}
                                    >
                                        <Text style={[styles.optionLabel, optionTextStyle, option.textStyle]} >{option.label}</Text>
                                    </TouchableOpacity>
                                ))
                            }

                        </View>
                    </Pressable >
                )
            }
        </>
    )

}

const styles = StyleSheet.create({
    contextContainer: {
        position: 'absolute',
        backgroundColor: GrocenicTheme.colors.white,
        borderRadius: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        zIndex: 1000,
        minWidth: 120,
    },
    menu: {
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',

    },
    optionLabel: {
        fontFamily: GrocenicTheme.fonts.semiBold,
        color: GrocenicTheme.colors.textSecondary
    }
})