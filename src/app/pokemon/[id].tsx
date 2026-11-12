import { Href, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AboutTab,
  DetailHeader,
  EvolutionTab,
  HERO_OVERLAP,
  MovesTab,
  ScreenState,
  StatsTab,
  Tab,
  TabBar,
  usePokemonDetail,
} from "@/components/pokemon-detail"; // adjust path if needed
import { getTypeColor, globalStyles, spacing } from "../../constants/theme"; // adjust path if needed

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { pokemon, species, evolutions, defenses, loading, error, reload } =
    usePokemonDetail(id);

  const [tab, setTab] = useState<Tab>("About");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => setTab("About"), [id]);

  const backgroundColor = getTypeColor(pokemon?.primaryType);

  if (loading || error || !pokemon) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <ScreenState
          backgroundColor={backgroundColor}
          error={error}
          onRetry={reload}
          onBack={() => router.back()}
        />
      </>
    );
  }

  return (
    <View style={[globalStyles.screen, { backgroundColor }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <DetailHeader
          pokemon={pokemon}
          favorite={favorite}
          onBack={() => router.replace("/")}
          onToggleFavorite={() => setFavorite((f) => !f)}
        />

        {/* Pokemon details tabs */}
        <View
          style={[
            globalStyles.sheet,
            styles.sheet,
            { paddingBottom: insets.bottom + spacing.xxl },
          ]}
        >
          <TabBar active={tab} color={backgroundColor} onChange={setTab} />
          <View style={{ height: spacing.xl }} />

          {tab === "About" && <AboutTab pokemon={pokemon} species={species} />}
          {tab === "Base Stats" && (
            <StatsTab pokemon={pokemon} defenses={defenses} />
          )}
          {tab === "Evolution" && (
            <EvolutionTab
              evolutions={evolutions}
              currentId={pokemon.id}
              onSelect={(nextId: any) =>
                router.replace(`/pokemon/${nextId}` as Href)
              }
            />
          )}
          {tab === "Moves" && <MovesTab moves={pokemon.moves} />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1 },
  sheet: { flex: 1, paddingTop: HERO_OVERLAP + spacing.xl, zIndex: 1 },
});
