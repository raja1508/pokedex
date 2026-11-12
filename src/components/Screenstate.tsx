import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, globalStyles, radius, spacing } from "@/constants/theme";
import { detailText } from "@/constants/textStyles";

type Props = {
  backgroundColor: string;
  error?: string | null;
  onRetry: () => void;
  onBack: () => void;
};

/** Full-screen loading spinner or error with retry. */
export function ScreenState({ backgroundColor, error, onRetry, onBack }: Props) {
  return (
    <View style={[globalStyles.screen, styles.center, { backgroundColor }]}>
      {error ? (
        <>
          <Text style={detailText.stateMessage}>{error}</Text>
          <View style={globalStyles.gapLg} />
          <Pressable style={styles.retry} onPress={onRetry}>
            <Text style={detailText.sectionTitle}>Try again</Text>
          </Pressable>
          <View style={globalStyles.gapLg} />
          <Pressable onPress={onBack} hitSlop={8}>
            <Text style={[detailText.label, { color: colors.textOnColor }]}>
              Go back
            </Text>
          </Pressable>
        </>
      ) : (
        <ActivityIndicator size="large" color={colors.textOnColor} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", padding: spacing.xl },
  retry: {
    backgroundColor: colors.surface,
    borderRadius: radius.chip,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
});