import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { fetchPokemonDetail, PokemonDetail } from "../constants/pokemon";
import { getTypeColor, globalStyles, sizes, spacing } from "../constants/theme";

export type Pokemon = {
  name: string;
  url: string;
};

const getId = (url: string) => url.split("/").filter(Boolean).pop() as string;
const getSprite = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const PokemonRow = ({ item }: { item: Pokemon }) => {
  const id = getId(item.url);
  const [detail, setDetail] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPokemonDetail(id)
      .then((data) => {
        if (!cancelled) setDetail(data);
      })
      .catch(() => console.log("failed to load", item.name));

    // ignore the result if the row unmounts before the fetch finishes
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Until the detail loads: neutral card, no chips, basic sprite.
  const backgroundColor = getTypeColor(detail?.primaryType ?? "normal");
  const types = detail?.types ?? [];
  const image = detail?.image ?? getSprite(id);

  return (
    <Pressable
      style={[globalStyles.pokemonCard, { backgroundColor }]}
      onPress={() => router.replace(`/pokemon/${id}` as Href)}
    >
      <View style={styles.pokeball} />
      <Text style={globalStyles.cardName}>{capitalize(item.name)}</Text>
      {types.map((type) => (
        <View key={type} style={[globalStyles.chip, styles.chip]}>
          <Text style={globalStyles.chipText}>{capitalize(type)}</Text>
        </View>
      ))}
      <Image source={{ uri: image }} style={styles.sprite} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    marginTop: spacing.xs,
  },
  pokeball: {
    position: "absolute",
    right: -14,
    bottom: -14,
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  sprite: {
    position: "absolute",
    right: spacing.sm,
    bottom: spacing.sm,
    width: sizes.sprite,
    height: sizes.sprite,
  },
});
