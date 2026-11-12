import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  colors,
  globalStyles,
  radius,
  sizes,
  spacing,
} from "../constants/theme";

import { PokemonRow } from "@/components/PokemonRow";

type Pokemon = {
  name: string;
  url: string;
};

type PokemonList = Pokemon[];

export default function Index() {
  // const [pokemons, setPokemons] = useState<PokemonList>([]);
  const [all, setAll] = useState<PokemonList>([]);
  const [query, setQuery] = useState("");

  function searchPokemon(query: string): PokemonList {
    const q = query.trim().toLowerCase();
    console.log(q);
    if (!q) return all;

    const startsWith = all.filter((p) => p.name.startsWith(q));
    const contains = all.filter(
      (p) => !p.name.startsWith(q) && p.name.includes(q),
    );
    let searchedPokemons = [...startsWith, ...contains]; // best matches first
    return searchedPokemons;
  }

  useEffect(() => {
    // fetch pokemons
    fetchPokemons();
  }, []);

  const pokemons: PokemonList = useMemo(() => {
    return searchPokemon(query);
  }, [query]);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=200",
      );

      const data = await response.json();
      setAll(data.results);
      // console.log(data.results)
    } catch (error) {
      console.log("pokemon api crashed");
    }
  }

  let pokemonsData = pokemons.length == 0 ? all : pokemons;
  return (
    <SafeAreaView style={globalStyles.screen}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={pokemonsData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonRow item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={globalStyles.rowBetween}>
              {/* <Ionicons name="arrow-back" size={24} color={colors.textPrimary} /> */}
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[globalStyles.screenTitle]}>Pokedex</Text>
              </View>
              <View style={styles.listButton}>
                <Ionicons name="list" size={20} color={colors.textPrimary} />
              </View>
            </View>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Pokémon"
                placeholderTextColor={colors.textMuted}
                value={query}
                onChangeText={setQuery}
              />
            </View>
          </View>
        }
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={globalStyles.gapMd} />}
      />

      {/* <View style={[globalStyles.fab, styles.fab]}>
        <Ionicons name="options-outline" size={20} color={colors.textOnColor} />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 96, // room for the floating button
  },
  columnWrapper: {
    gap: spacing.md,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  listButton: {
    width: sizes.iconButton,
    height: sizes.iconButton,
    borderRadius: radius.card,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    height: sizes.iconButton,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.card,
    backgroundColor: colors.surfaceMuted,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    padding: 0,
  },
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
  fab: {
    position: "absolute",
    right: spacing.xl,
    bottom: spacing.xl,
  },
});
