import { Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { detailText } from "@/constants/textStyles";
import { colors, spacing } from "@/constants/theme";
import { artworkUrl, capitalize } from "@/constants/utils";
import { EvolutionStep } from "@/constants/types";

type Props = {
  evolutions: EvolutionStep[] | null;
  currentId: number;
  onSelect: (id: number) => void;
};

export function EvolutionTab({ evolutions, currentId, onSelect }: Props) {
  if (evolutions === null)
    return <ActivityIndicator color={colors.textMuted} />;
  if (evolutions.length === 0) {
    return (
      <Text style={detailText.caption}>This Pokémon does not evolve.</Text>
    );
  }

  return (
    <View style={styles.list}>
      {evolutions.map((step) => (
        <View key={`${step.from.id}-${step.to.id}`} style={styles.row}>
          <EvolutionCard
            pokemon={step.from}
            active={step.from.id === currentId}
            onPress={onSelect}
          />
          <View style={styles.arrow}>
            <Ionicons name="arrow-forward" size={20} color={colors.textMuted} />
            <Text style={detailText.small}>
              {step.level ? `Lv. ${step.level}` : "—"}
            </Text>
          </View>
          <EvolutionCard
            pokemon={step.to}
            active={step.to.id === currentId}
            onPress={onSelect}
          />
        </View>
      ))}
    </View>
  );
}

type CardProps = {
  pokemon: { id: number; name: string };
  active: boolean;
  onPress: (id: number) => void;
};

function EvolutionCard({ pokemon, active, onPress }: CardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => !active && onPress(pokemon.id)}
    >
      <Image
        source={{ uri: artworkUrl(pokemon.id) }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        style={active ? detailText.cardNameActive : detailText.cardName}
        numberOfLines={1}
      >
        {capitalize(pokemon.name)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.xl },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: { alignItems: "center", width: 104, gap: spacing.sm },
  image: { width: 88, height: 88 },
  arrow: { alignItems: "center", gap: spacing.xs },
});
