import { StyleSheet } from "react-native";
import { GrocenicTheme } from "../../theme/GrocenicTheme";

export default StyleSheet.create({
    listContainer: {
        paddingHorizontal: GrocenicTheme.spacing.md,
        backgroundColor: GrocenicTheme.colors.white,
        borderTopLeftRadius: GrocenicTheme.borderRadius.lg,
        borderTopRightRadius: GrocenicTheme.borderRadius.lg,
    }
});