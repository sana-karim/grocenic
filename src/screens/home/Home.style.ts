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
    }
});