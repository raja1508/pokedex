# Pokédex Demo App

A small React Native (Expo) app built to **learn by example**. It shows how to call a real API, move between screens with file-based routing, and manage state, using the free [PokéAPI](https://pokeapi.co/).

## Demo

▶️ [Watch the demo video](./assets/demo.webm)

> The video is a local file. Put your recording at `assets/demo.mp4`, or change the path above to wherever you saved it.

## What this project teaches

| Topic | Where to look |
| --- | --- |
| **API calls** (`fetch`, error handling, mapping raw data to a safe type) | `pokemon.ts`, `components/pokemon-detail/api.ts` |
| **Routing** (file-based routes, dynamic route params, navigation) | `app/pokemon/[id].tsx` |
| **State management** (`useState`, `useEffect`, a custom hook) | `components/pokemon-detail/usePokemonDetail.ts` |
| **Theming** (one source of truth for colors, spacing, text) | `theme.ts` |
| **Component structure** (small, reusable pieces) | `components/pokemon-detail/` |

## Features

- Pokédex list screen with cards colored by Pokémon type
- Detail screen with four tabs: **About**, **Base Stats**, **Evolution**, **Moves**
- Type defenses (weaknesses and resistances), including dual types
- Tap an evolution to open that Pokémon
- Loading and error states with a retry button

## Project structure

```
app/
  pokemon/
    [id].tsx                  # Detail screen (dynamic route)
components/
  pokemon-detail/
    usePokemonDetail.ts       # Data loading + state
    api.ts                    # Species, evolution, type-matchup fetches
    types.ts / utils.ts       # Types and formatting helpers
    textStyles.ts             # Text hierarchy for the detail screen
    DetailHeader.tsx          # Colored header + hero image
    TabBar.tsx                # Tab switcher
    AboutTab.tsx, StatsTab.tsx, EvolutionTab.tsx, MovesTab.tsx
    StatBar.tsx, TypeDefenses.tsx, InfoRow.tsx, TypeChip.tsx, ScreenState.tsx
pokemon.ts                    # PokemonDetail type + fetchPokemonDetail()
theme.ts                      # Colors, spacing, typography, shared styles
```

## Concepts, step by step

### 1. API calls

`fetchPokemonDetail(idOrName)` in `pokemon.ts` does three things:

1. Calls `https://pokeapi.co/api/v2/pokemon/{id}`.
2. Throws a readable error if the response is not OK.
3. Maps the raw response into a clean `PokemonDetail` object, so the UI never has to check for missing fields.

The detail screen then makes extra calls (species, evolution chain, type matchups) **in the background**. The main content shows as soon as the first call finishes, and those extra sections fill in when ready. If an extra call fails, the screen still works.

### 2. Routing

The app uses [Expo Router](https://docs.expo.dev/router/introduction/), where **files are routes**:

| File | URL |
| --- | --- |
| `app/index.tsx` | `/` |
| `app/pokemon/[id].tsx` | `/pokemon/25` |

The square brackets make the route **dynamic**. Read the value inside the screen:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
```

Navigate to it from anywhere:

```tsx
import { Href, useRouter } from "expo-router";

const router = useRouter();
router.push(`/pokemon/${pokemon.id}` as Href);
```

> **Typed routes tip:** if TypeScript says the path is not assignable, restart with `npx expo start -c` so Expo regenerates `.expo/types/router.d.ts`. Make sure `tsconfig.json` includes `.expo/types/**/*.ts`.

**Handling missing routes:** Expo Router shows a default screen for unknown URLs. To customize it, add `app/+not-found.tsx`:

```tsx
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/">Go to home</Link>
      </View>
    </>
  );
}
```

### 3. State management

This app uses **local state only**, which is enough for a screen like this.

- `useState` holds the data (`pokemon`, `species`, `evolutions`, `defenses`), plus `loading` and `error`.
- `useEffect` starts the fetch when the `id` changes, and a `cancelled` flag stops an old request from overwriting newer data.
- The logic lives in a **custom hook**, `usePokemonDetail(id)`, so the screen only does `const { pokemon, loading, error } = usePokemonDetail(id)`.
- UI-only state (current tab, favorite heart) stays in the screen with `useState`.

When you need to share state across screens (for example a global favorites list), the next step is React Context or a small library like Zustand.

### 4. Theming

`theme.ts` is the single source of truth for colors, type colors, spacing, radius, typography and shared styles. Components import from it instead of hard-coding values, so a design change happens in one place.

## Getting started

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or scan the QR code with Expo Go.

If routes or types look stale, clear the cache:

```bash
npx expo start -c
```

## Tech used

- React Native + Expo
- Expo Router (file-based routing)
- TypeScript
- [PokéAPI](https://pokeapi.co/) for data and artwork

## Ideas to extend it

- Persist favorites (AsyncStorage) and share them with Context or Zustand
- Cache API responses (for example with TanStack Query)
- Search and filter on the list screen
- Animate the stat bars when the Base Stats tab opens