import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, globalStyles, radius, spacing } from "@/constants/theme";
import { detailText } from "@/constants/textStyles";
import { capitalize } from "@/constants/utils";

const PREVIEW_COUNT = 30;

type Props = { moves: string[] };

export function MovesTab({ moves }: Props) {
  const [showAll, setShowAll] = useState(false);
  const sorted = useMemo(() => [...moves].sort(), [moves]);
  const visible = showAll ? sorted : sorted.slice(0, PREVIEW_COUNT);

  if (moves.length === 0) {
    return <Text style={detailText.caption}>No moves found.</Text>;
  }

  return (
    <View>
      <Text style={detailText.caption}>{sorted.length} moves available</Text>
      <View style={globalStyles.gapMd} />

      <View style={styles.wrap}>
        {visible.map((move) => (
          <View key={move} style={styles.chip}>
            <Text style={detailText.move}>{capitalize(move)}</Text>
          </View>
        ))}
      </View>

      {sorted.length > PREVIEW_COUNT && (
        <>
          <View style={globalStyles.gapLg} />
          <Pressable onPress={() => setShowAll((s) => !s)} hitSlop={8}>
            <Text style={detailText.action}>
              {showAll ? "Show less" : `Show all ${sorted.length} moves`}
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.chip,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md + 2,
  },
});