import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TypeChip } from "@/components/Typechip";
import { PokemonDetail } from "@/constants/pokemon";
import { detailText } from "@/constants/textStyles";
import {
    colors,
    globalStyles,
    radius,
    sizes,
    spacing,
} from "@/constants/theme";
import { HERO_OVERLAP, capitalize } from "@/constants/utils";

type Props = {
  pokemon: PokemonDetail;
  favorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
};

/** Colored top area: back/heart, name, id, type chips and the hero artwork. */
export function DetailHeader({
  pokemon,
  favorite,
  onBack,
  onToggleFavorite,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.pokeball} pointerEvents="none" />

      <View style={globalStyles.rowBetween}>
        <Pressable style={globalStyles.iconButton} onPress={onBack} hitSlop={8}>
          <Ionicons name="arrow-back" size={26} color={colors.textOnColor} />
        </Pressable>
        <Pressable
          style={globalStyles.iconButton}
          onPress={onToggleFavorite}
          hitSlop={8}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={26}
            color={colors.textOnColor}
          />
        </Pressable>
      </View>

      <View style={styles.titleRow}>
        <Text
          style={[detailText.title, styles.name]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {capitalize(pokemon.name)}
        </Text>
        <Text style={detailText.id}>{pokemon.displayId}</Text>
      </View>

      <View style={[globalStyles.row, styles.chips]}>
        {pokemon.types.map((t) => (
          <TypeChip key={t} label={capitalize(t)} />
        ))}
      </View>

      <View style={styles.hero}>
        <Image
          source={{ uri: pokemon.image }}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.xl, zIndex: 2 },
  pokeball: {
    position: "absolute",
    right: -spacing.xxl * 2,
    top: sizes.heroImage * 0.55,
    width: sizes.heroImage * 1.3,
    height: sizes.heroImage * 1.3,
    borderRadius: radius.chip,
    backgroundColor: colors.chipOnColor,
    opacity: 0.5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  name: { flex: 1 },
  chips: { gap: spacing.sm },
  hero: {
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: -HERO_OVERLAP,
    zIndex: 10,
    elevation: 10,
  },
  heroImage: { width: sizes.heroImage, height: sizes.heroImage },
});
