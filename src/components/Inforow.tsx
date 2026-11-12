import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { globalStyles, spacing } from "@/constants/theme";
import { detailText } from "@/constants/textStyles";

type Props = { label: string; children: ReactNode };

/** Label on the left, value on the right. Strings get the default value style. */
export function InfoRow({ label, children }: Props) {
  return (
    <View style={[globalStyles.infoRow, styles.row]}>
      <Text style={[detailText.label, styles.label]}>{label}</Text>
      {typeof children === "string" ? (
        <Text style={detailText.value}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingVertical: spacing.md - 2, alignItems: "flex-start" },
  label: { width: 110 },
});