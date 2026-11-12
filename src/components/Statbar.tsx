import { StyleSheet, Text, View } from "react-native";

import { getStatColor, globalStyles, spacing } from "@/constants/theme";
import { detailText } from "@/constants/textStyles";

type Props = {
  label: string;
  value: number;
  /** Value that fills the bar completely. */
  max: number;
  /** Below this the bar is red, otherwise green. */
  threshold?: number;
};

export function StatBar({ label, value, max, threshold }: Props) {
  return (
    <View style={[globalStyles.infoRow, styles.row]}>
      <Text style={[detailText.statLabel, styles.label]}>{label}</Text>
      <Text style={[detailText.statValue, styles.value]}>{value}</Text>
      <View style={globalStyles.statTrack}>
        <View
          style={[
            globalStyles.statFill,
            {
              width: `${Math.min(100, (value / max) * 100)}%`,
              backgroundColor: getStatColor(value, threshold),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingVertical: spacing.md - 2 },
  label: { width: 76 },
  value: { width: 44 },
});