import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { InfoRow } from "@/components/Inforow";
import { PokemonDetail } from "@/constants/pokemon";
import { detailText } from "@/constants/textStyles";
import { colors, globalStyles, spacing, typeColors } from "@/constants/theme";
import { capitalize, formatHeight, formatWeight } from "@/constants/utils";
import { Species } from "@/constants/types";

type Props = { pokemon: PokemonDetail; species: Species | null };

export function AboutTab({ pokemon, species }: Props) {
  const abilities = pokemon.abilities
    .map((a) => capitalize(a.name) + (a.isHidden ? " (hidden)" : ""))
    .join(", ");

  return (
    <View>
      <InfoRow label="Species">{species?.genus || "—"}</InfoRow>
      <InfoRow label="Height">{formatHeight(pokemon.heightM)}</InfoRow>
      <InfoRow label="Weight">{formatWeight(pokemon.weightKg)}</InfoRow>
      <InfoRow label="Abilities">{abilities || "—"}</InfoRow>

      <View style={{ height: spacing.xl }} />
      <Text style={detailText.sectionTitle}>Breeding</Text>
      <View style={globalStyles.gapSm} />

      <InfoRow label="Gender">
        {species?.malePercent == null ? (
          <Text style={detailText.value}>{species ? "Genderless" : "—"}</Text>
        ) : (
          <View style={styles.gender}>
            <View style={styles.genderItem}>
              <Ionicons name="male" size={16} color={colors.accent} />
              <Text style={detailText.value}>
                {species.malePercent.toFixed(1)}%
              </Text>
            </View>
            <View style={styles.genderItem}>
              <Ionicons name="female" size={16} color={typeColors.psychic} />
              <Text style={detailText.value}>
                {species.femalePercent?.toFixed(1)}%
              </Text>
            </View>
          </View>
        )}
      </InfoRow>
      <InfoRow label="Egg Groups">
        {species?.eggGroups.join(", ") || "—"}
      </InfoRow>
      <InfoRow label="Egg Cycle">
        {species ? `${species.eggCycles} cycles` : "—"}
      </InfoRow>
    </View>
  );
}

const styles = StyleSheet.create({
  gender: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  genderItem: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
});
