import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, getTypeColor, globalStyles, spacing } from "@/constants/theme";
import { TypeChip } from "@/components/Typechip";
import { detailText } from "@/constants/textStyles";
import { Defense } from "@/constants/types";
import { capitalize, multiplierLabel } from "@/constants/utils";

type Props = { pokemonName: string; defenses: Defense[] | null };

export function TypeDefenses({ pokemonName, defenses }: Props) {
  return (
    <View>
      <Text style={detailText.sectionTitle}>Type defenses</Text>
      <View style={globalStyles.gapSm} />
      <Text style={detailText.caption}>
        The effectiveness of each type on {capitalize(pokemonName)}.
      </Text>
      <View style={globalStyles.gapLg} />

      {defenses === null ? (
        <ActivityIndicator color={colors.textMuted} />
      ) : defenses.length === 0 ? (
        <Text style={detailText.caption}>No special weaknesses or resistances.</Text>
      ) : (
        <View style={styles.wrap}>
          {defenses.map((d) => (
            <TypeChip
              key={d.type}
              label={`${capitalize(d.type)}  ${multiplierLabel(d.multiplier)}`}
              backgroundColor={getTypeColor(d.type)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
});