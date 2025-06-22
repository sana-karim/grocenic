import { StyleSheet } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

export default StyleSheet.create({
    listAndBtnContainer: {
        flex: 1,
        paddingHorizontal: GrocenicTheme.spacing.md,
        backgroundColor: GrocenicTheme.colors.white,
        borderTopLeftRadius: GrocenicTheme.borderRadius.lg,
        borderTopRightRadius: GrocenicTheme.borderRadius.lg,
    },
    btnContainer: {
        backgroundColor: GrocenicTheme.colors.white,
        paddingHorizontal: GrocenicTheme.spacing.md,
        paddingVertical: GrocenicTheme.spacing.sm,
    },
    addItemBtnContainer: {
        width: '100%',
    },
    addItemBtn: {
        fontSize: GrocenicTheme.fontSize.large     
    },
    emptyListContainer: {
        display: 'flex',
        flex: .90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyListLabel: {
        fontFamily: GrocenicTheme.fonts.medium,
        fontSize: GrocenicTheme.fontSize.headerTitle,
        color: '#7BC96F99', // primary + opacity
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5, // Android support
        marginTop: GrocenicTheme.spacing.lg
    },
    emptyListStateLabel: {
        fontFamily: GrocenicTheme.fonts.semiBold,
        fontSize: GrocenicTheme.fontSize.medium,
        color: GrocenicTheme.colors.textSecondary,
    }
});