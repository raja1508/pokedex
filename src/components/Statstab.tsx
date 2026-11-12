import { View } from "react-native";

import { PokemonDetail, PokemonStatName } from "@/constants/pokemon";
import { spacing } from "@/constants/theme";
import { StatBar } from "@/components/Statbar";
import { TypeDefenses } from "@/components/Typedefences";
import { Defense } from "@/constants/types";

const STAT_LABELS: Record<PokemonStatName, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};
const STAT_ORDER = Object.keys(STAT_LABELS) as PokemonStatName[];
const STAT_MAX = 180;

type Props = { pokemon: PokemonDetail; defenses: Defense[] | null };

export function StatsTab({ pokemon, defenses }: Props) {
  return (
    <View>
      {STAT_ORDER.map((name) => (
        <StatBar
          key={name}
          label={STAT_LABELS[name]}
          value={pokemon.stats[name]}
          max={STAT_MAX}
        />
      ))}
      <StatBar
        label="Total"
        value={pokemon.totalStats}
        max={STAT_MAX * 6}
        threshold={300}
      />

      <View style={{ height: spacing.xl }} />
      <TypeDefenses pokemonName={pokemon.name} defenses={defenses} />
    </View>
  );
}