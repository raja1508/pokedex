export const TABS = ["About", "Base Stats", "Evolution", "Moves"] as const;
export type Tab = (typeof TABS)[number];

export type SpeciesResponse = {
  genera: { genus: string; language: { name: string } }[];
  gender_rate: number; // -1 = genderless, otherwise female eighths (0-8)
  egg_groups: { name: string }[];
  hatch_counter: number | null;
  evolution_chain?: { url: string };
};

export type ChainLink = {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
  evolution_details: { min_level?: number | null }[];
};

export type TypeResponse = {
  damage_relations: {
    double_damage_from: { name: string }[];
    half_damage_from: { name: string }[];
    no_damage_from: { name: string }[];
  };
};

export type Species = {
  genus: string;
  malePercent: number | null;
  femalePercent: number | null;
  eggGroups: string[];
  eggCycles: number;
};

export type EvolutionStep = {
  from: { id: number; name: string };
  to: { id: number; name: string };
  level: number | null;
};

export type Defense = { type: string; multiplier: number };