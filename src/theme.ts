import { StyleSheet, TextStyle, ViewStyle } from "react-native";

/* -------------------------------------------------------------------------- */
/*  Colors                                                                    */
/* -------------------------------------------------------------------------- */

export const colors = {
  // Surfaces
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F4F5F7", // stat bar tracks, subtle fills
  divider: "#ECECF0",

  // Text
  textPrimary: "#17171B",
  textSecondary: "#747476",
  textMuted: "#A0A0A5", // inactive tabs, labels
  textOnColor: "#FFFFFF",

  // Accent (floating action button)
  accent: "#5A5FD0",

  // Stat bars
  statLow: "#FB6C6C",
  statHigh: "#48C78E",

  // Chips sitting on a colored card
  chipOnColor: "rgba(255, 255, 255, 0.25)",
} satisfies Record<string, string>;

/** Card / header background per Pokémon type. */
export const typeColors = {
  // Taken from the screenshot
  grass: "#48D0B0",
  fire: "#FB6C6C",
  water: "#76BDFE",
  electric: "#FFD76F",

  // Extrapolated to match the same soft, saturated style
  poison: "#A98BE0",
  bug: "#8BD674",
  normal: "#B8BCC4",
  flying: "#9DB7F5",
  ground: "#D9B27C",
  rock: "#C4B68A",
  psychic: "#F985B0",
  ice: "#8EDFE8",
  fighting: "#E8806B",
  ghost: "#8A82C4",
  dragon: "#7A8BEA",
  dark: "#8C8C99",
  steel: "#A8B8C8",
  fairy: "#F4A6D0",
} satisfies Record<string, string>;

/** Spacing, radius and sizes */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} satisfies Record<string, number>;

export const radius = {
  chip: 999, // pill
  card: 14, // Pokémon list cards
  sheet: 28, // large rounded screens / bottom sheets
  fab: 999,
} satisfies Record<string, number>;

export const sizes = {
  fab: 48,
  iconButton: 44,
  sprite: 72,
  heroImage: 220,
  statBarHeight: 3,
} satisfies Record<string, number>;

/* -------------------------------------------------------------------------- */
/*  Typography (clean geometric sans; swap in your loaded font family)        */
/* -------------------------------------------------------------------------- */

export const typography = {
  screenTitle: { fontSize: 32, fontWeight: "700", color: colors.textPrimary },
  detailTitle: { fontSize: 32, fontWeight: "700", color: colors.textOnColor },
  pokemonId: { fontSize: 16, fontWeight: "700", color: colors.textOnColor },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  cardName: { fontSize: 14, fontWeight: "700", color: colors.textOnColor },
  body: { fontSize: 13, fontWeight: "400", color: colors.textPrimary },
  label: { fontSize: 13, fontWeight: "400", color: colors.textSecondary },
  tab: { fontSize: 13, fontWeight: "500", color: colors.textMuted },
  tabActive: { fontSize: 13, fontWeight: "700", color: colors.textPrimary },
  chip: { fontSize: 10, fontWeight: "500", color: colors.textOnColor },
} satisfies Record<string, TextStyle>;

/* -------------------------------------------------------------------------- */
/*  Shadows                                                                   */
/* -------------------------------------------------------------------------- */

export const shadows = {
  // Soft, wide shadow under the big rounded screens
  sheet: {
    shadowColor: "#1C2340",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  // Colored glow under the floating button
  fab: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
} satisfies Record<string, ViewStyle>;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Any known type name gets autocomplete; unknown strings are still accepted. */
export const getTypeColor = (type?: PokemonType | (string & {})): string =>
  (type && typeColors[type.toLowerCase() as PokemonType]) || typeColors.normal;

/** Stat bars are red when low and green when high. */
export const getStatColor = (value: number, threshold = 50): string =>
  value < threshold ? colors.statLow : colors.statHigh;

/* -------------------------------------------------------------------------- */
/*  Shared styles: import { globalStyles } and reuse on any screen            */
/* -------------------------------------------------------------------------- */

export const globalStyles = StyleSheet.create({
  // Layout
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenPadding: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xxl,
  },

  // Text
  screenTitle: typography.screenTitle,
  sectionTitle: typography.sectionTitle,
  body: typography.body,
  label: typography.label,

  // Pokémon card (use with backgroundColor: getTypeColor(type))
  pokemonCard: {
    flex: 1,
    minHeight: 84,
    borderRadius: radius.card,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    overflow: "hidden",
  },
  cardName: typography.cardName,

  // Type chip (sits on a colored background)
  chip: {
    alignSelf: "flex-start",
    backgroundColor: colors.chipOnColor,
    borderRadius: radius.chip,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm + 2,
  },
  chipText: typography.chip,

  // Large rounded sheet (detail screen content area)
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    padding: spacing.xl,
    ...shadows.sheet,
  },

  // Round icon button (back, list toggle, heart)
  iconButton: {
    width: sizes.iconButton,
    height: sizes.iconButton,
    alignItems: "center",
    justifyContent: "center",
  },

  // Floating action button
  fab: {
    width: sizes.fab,
    height: sizes.fab,
    borderRadius: radius.fab,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.fab,
  },

  // Tabs (About / Base Stats / Evolution / Moves)
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    paddingBottom: spacing.md,
  },
  tab: typography.tab,
  tabActive: typography.tabActive,

  // Label / value rows (Species, Height, Weight...)
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    width: 96,
    ...typography.label,
  },
  infoValue: typography.body,

  // Stat bars (HP, Attack, Defense...)
  statTrack: {
    flex: 1,
    height: sizes.statBarHeight,
    borderRadius: radius.chip,
    backgroundColor: colors.surfaceMuted,
    overflow: "hidden",
  },
  statFill: {
    height: "100%",
    borderRadius: radius.chip,
    // set backgroundColor with getStatColor(value) and width as a % of max
  },

  // Gaps
  gapSm: { height: spacing.sm },
  gapMd: { height: spacing.md },
  gapLg: { height: spacing.lg },
});

/* -------------------------------------------------------------------------- */
/*  Types: exported so editors can autocomplete every token name              */
/* -------------------------------------------------------------------------- */

export type ColorName = keyof typeof colors; // "background" | "textPrimary" | ...
export type PokemonType = keyof typeof typeColors; // "grass" | "fire" | ...
export type SpacingName = keyof typeof spacing; // "xs" | "sm" | ...
export type RadiusName = keyof typeof radius; // "chip" | "card" | ...
export type SizeName = keyof typeof sizes;
export type TypographyName = keyof typeof typography; // "screenTitle" | ...
export type ShadowName = keyof typeof shadows; // "sheet" | "fab"
export type GlobalStyleName = keyof typeof globalStyles; // "screen" | "pokemonCard" | ...

/** The whole theme in one object, handy for a context provider later. */
export const theme = {
  colors,
  typeColors,
  spacing,
  radius,
  sizes,
  typography,
  shadows,
};

export type Theme = typeof theme;