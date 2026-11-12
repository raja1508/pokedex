import { TextStyle } from "react-native";
import { colors } from "./theme";

/**
 * Detail-screen text hierarchy.
 * Sizes are larger than the base theme typography so small text stays readable.
 * Everything still pulls colors from theme.ts.
 */
export const detailText = {
  // Header (on colored background)
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: colors.textOnColor,
  },
  id: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textOnColor,
    opacity: 0.85,
  },
  chip: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
    color: colors.textOnColor,
  },

  // Tabs
  tab: { fontSize: 15, fontWeight: "500", color: colors.textMuted },
  tabActive: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },

  // Sheet content
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  label: { fontSize: 15, fontWeight: "400", color: colors.textSecondary },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    flexShrink: 1,
  },
  caption: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: colors.textSecondary,
  },
  action: { fontSize: 15, fontWeight: "700", color: colors.accent },

  // Stats
  statLabel: { fontSize: 15, fontWeight: "400", color: colors.textSecondary },
  statValue: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },

  // Evolution / moves
  cardName: { fontSize: 15, fontWeight: "500", color: colors.textPrimary },
  cardNameActive: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },
  small: { fontSize: 13, fontWeight: "500", color: colors.textMuted },
  move: { fontSize: 14, fontWeight: "500", color: colors.textPrimary },

  // Feedback states
  stateMessage: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: colors.textOnColor,
  },
} satisfies Record<string, TextStyle>;