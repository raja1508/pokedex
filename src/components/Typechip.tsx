import { StyleSheet, Text, View } from "react-native";

import { globalStyles, spacing } from "@/constants/theme";
import { detailText } from "@/constants/textStyles";

type Props = {
  label: string;
  /** Solid color (e.g. type color). Defaults to the translucent chip on colored headers. */
  backgroundColor?: string;
};

export function TypeChip({ label, backgroundColor }: Props) {
  return (
    <View
      style={[
        globalStyles.chip,
        styles.chip,
        backgroundColor ? { backgroundColor } : null,
      ]}
    >
      <Text style={detailText.chip}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md + 2,
  },
});