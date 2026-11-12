import { PokemonType, typeColors } from "./theme";
import {
  ChainLink,
  Defense,
  EvolutionStep,
  Species,
  SpeciesResponse,
  TypeResponse,
} from "./types";
import { capitalize, idFromUrl } from "./utils";

const getJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
};

export async function fetchSpecies(
  url: string
): Promise<{ species: Species; chainUrl?: string }> {
  const s = await getJson<SpeciesResponse>(url);
  const genus = s.genera.find((g) => g.language.name === "en")?.genus ?? "";
  const genderless = s.gender_rate < 0;

  return {
    species: {
      genus: genus.replace(/ Pokémon$/, ""),
      malePercent: genderless ? null : (1 - s.gender_rate / 8) * 100,
      femalePercent: genderless ? null : (s.gender_rate / 8) * 100,
      eggGroups: s.egg_groups.map((g) => capitalize(g.name)),
      eggCycles: s.hatch_counter ?? 0,
    },
    chainUrl: s.evolution_chain?.url,
  };
}

function flattenChain(link: ChainLink, out: EvolutionStep[] = []) {
  link.evolves_to.forEach((next) => {
    out.push({
      from: { id: idFromUrl(link.species.url), name: link.species.name },
      to: { id: idFromUrl(next.species.url), name: next.species.name },
      level: next.evolution_details[0]?.min_level ?? null,
    });
    flattenChain(next, out);
  });
  return out;
}

export async function fetchEvolutions(chainUrl: string): Promise<EvolutionStep[]> {
  const { chain } = await getJson<{ chain: ChainLink }>(chainUrl);
  return flattenChain(chain);
}

/** Damage multipliers taken from each attacking type (dual types are multiplied). */
export async function fetchDefenses(types: PokemonType[]): Promise<Defense[]> {
  const results = await Promise.all(
    types.map((t) => getJson<TypeResponse>(`https://pokeapi.co/api/v2/type/${t}`))
  );

  const all = Object.keys(typeColors) as PokemonType[];
  const mult = Object.fromEntries(all.map((t) => [t, 1])) as Record<string, number>;

  results.forEach(({ damage_relations: d }) => {
    d.double_damage_from.forEach((t) => t.name in mult && (mult[t.name] *= 2));
    d.half_damage_from.forEach((t) => t.name in mult && (mult[t.name] *= 0.5));
    d.no_damage_from.forEach((t) => t.name in mult && (mult[t.name] *= 0));
  });

  return all
    .filter((t) => mult[t] !== 1)
    .map((t) => ({ type: t, multiplier: mult[t] }))
    .sort((a, b) => b.multiplier - a.multiplier);
}