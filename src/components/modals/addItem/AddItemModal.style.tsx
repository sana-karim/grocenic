import { StyleSheet } from "react-native";
import { GrocenicTheme } from "../../../theme/GrocenicTheme";

export default StyleSheet.create({
    addItemContainer: {
        backgroundColor: GrocenicTheme.colors.white,
        borderRadius: GrocenicTheme.borderRadius.md,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        // elevation: 3,
        boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px', //boxShadow isn't officially supported in pure React Native (StyleSheet.create).
    },
    headerContainer: {
        paddingVertical: GrocenicTheme.spacing.md,
        marginBottom: GrocenicTheme.spacing.sm
    },
    modalTitle: {
        fontFamily: GrocenicTheme.fonts.semiBold,
        color: GrocenicTheme.colors.textSecondary,
        fontSize: GrocenicTheme.fontSize.large,
        textAlign: 'center'
    },
    closeBtn: {
        alignItems: 'baseline',
        position: 'absolute',
        right: 16,
        marginVertical: 16,
    },
    formContainer: {
        marginHorizontal: GrocenicTheme.spacing.md,
    },
    btnStyle: {
        marginBottom: GrocenicTheme.spacing.md,
        backgroundColor: GrocenicTheme.colors.secondary,
        width: '49.2%'
    },
    btnLabel: {
        paddingVertical: 11,
        paddingHorizontal: 10,
        color: GrocenicTheme.colors.textPrimary,
        fontSize: GrocenicTheme.fontSize.large,
    }
});