import { useCallback, useEffect, useState } from "react";

import { PokemonDetail, fetchPokemonDetail } from "./pokemon";
import { fetchDefenses, fetchEvolutions, fetchSpecies } from "./api";
import { Defense, EvolutionStep, Species } from "./types";

/**
 * Loads the main Pokémon first (so the screen can render quickly),
 * then species / evolution / type matchups in the background.
 * Failures in the secondary data never break the screen.
 */
export function usePokemonDetail(id?: string) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<Species | null>(null);
  const [evolutions, setEvolutions] = useState<EvolutionStep[] | null>(null);
  const [defenses, setDefenses] = useState<Defense[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    setLoading(true);
    setError(null);
    setPokemon(null);
    setSpecies(null);
    setEvolutions(null);
    setDefenses(null);

    (async () => {
      try {
        const detail = await fetchPokemonDetail(id);
        if (cancelled) return;
        setPokemon(detail);
        setLoading(false);

        fetchSpecies(detail.speciesUrl)
          .then(async ({ species: s, chainUrl }) => {
            if (cancelled) return;
            setSpecies(s);
            const steps = chainUrl ? await fetchEvolutions(chainUrl) : [];
            if (!cancelled) setEvolutions(steps);
          })
          .catch(() => !cancelled && setEvolutions([]));

        fetchDefenses(detail.types)
          .then((d) => !cancelled && setDefenses(d))
          .catch(() => !cancelled && setDefenses([]));
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Something went wrong");
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  return { pokemon, species, evolutions, defenses, loading, error, reload };
}