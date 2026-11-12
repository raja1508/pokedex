import { PokemonType, typeColors } from "./theme";

/* -------------------------------------------------------------------------- */
/*  1. Raw API shape: only the fields we actually read                        */
/*     (anything that can be missing or null is marked as such)               */
/* -------------------------------------------------------------------------- */

export type PokemonApiResponse = {
  id: number;
  name: string;
  height: number; // decimetres
  weight: number; // hectograms
  base_experience?: number | null;
  species?: { name: string; url: string };
  types?: { slot: number; type: { name: string } }[];
  abilities?: { is_hidden: boolean; slot: number; ability: { name: string } }[];
  stats?: { base_stat: number; stat: { name: string } }[];
  moves?: { move: { name: string } }[];
  sprites?: {
    front_default?: string | null;
    other?: {
      "official-artwork"?: { front_default?: string | null };
      home?: { front_default?: string | null };
    };
  };
};

/* -------------------------------------------------------------------------- */
/*  2. App shape: every field always exists, so no optional chaining in UI    */
/* -------------------------------------------------------------------------- */

const STAT_NAMES = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
] as const;

export type PokemonStatName = (typeof STAT_NAMES)[number];

export type PokemonAbility = {
  name: string;
  isHidden: boolean;
};

export type PokemonDetail = {
  id: number;
  name: string;
  displayId: string; // "#001"
  types: PokemonType[]; // at least one
  primaryType: PokemonType; // use for background color
  heightM: number; // metres
  weightKg: number; // kilograms
  baseExperience: number;
  abilities: PokemonAbility[];
  stats: Record<PokemonStatName, number>; // all six, 0 if missing
  totalStats: number;
  image: string; // always a valid URL
  moves: string[]; // move names
  speciesUrl: string; // for description, egg groups, gender, etc.
};

/* -------------------------------------------------------------------------- */
/*  3. Mapper: raw -> safe                                                    */
/* -------------------------------------------------------------------------- */

const isPokemonType = (value: string): value is PokemonType =>
  Object.prototype.hasOwnProperty.call(typeColors, value);

export function toPokemonDetail(raw: PokemonApiResponse): PokemonDetail {
  const types = [...(raw.types ?? [])]
    .sort((a, b) => a.slot - b.slot)
    .map((t) => t.type.name)
    .filter(isPokemonType);
  if (types.length === 0) types.push("normal");

  const stats = Object.fromEntries(
    STAT_NAMES.map((name) => [
      name,
      raw.stats?.find((s) => s.stat.name === name)?.base_stat ?? 0,
    ])
  ) as Record<PokemonStatName, number>;

  const totalStats = STAT_NAMES.reduce((sum, name) => sum + stats[name], 0);

  const image =
    raw.sprites?.other?.["official-artwork"]?.front_default ??
    raw.sprites?.other?.home?.front_default ??
    raw.sprites?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${raw.id}.png`;

  return {
    id: raw.id,
    name: raw.name,
    displayId: `#${String(raw.id).padStart(3, "0")}`,
    types,
    primaryType: types[0],
    heightM: (raw.height ?? 0) / 10,
    weightKg: (raw.weight ?? 0) / 10,
    baseExperience: raw.base_experience ?? 0,
    abilities: (raw.abilities ?? []).map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
    stats,
    totalStats,
    image,
    moves: (raw.moves ?? []).map((m) => m.move.name),
    speciesUrl:
      raw.species?.url ?? `https://pokeapi.co/api/v2/pokemon-species/${raw.id}/`,
  };
}

/* -------------------------------------------------------------------------- */
/*  4. Fetch helper                                                           */
/* -------------------------------------------------------------------------- */

export async function fetchPokemonDetail(
  idOrName: string | number
): Promise<PokemonDetail> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  if (!response.ok) {
    throw new Error(`Could not load Pokémon "${idOrName}" (${response.status})`);
  }
  const raw: PokemonApiResponse = await response.json();
  return toPokemonDetail(raw);
}

