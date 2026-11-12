import { Pressable, StyleSheet, Text, View } from "react-native";

import { globalStyles, radius, spacing } from "@/constants/theme";
import { detailText } from "@/constants/textStyles";
import { TABS, Tab } from "@/constants/types";

type Props = {
  active: Tab;
  /** Underline color, usually the Pokémon's type color. */
  color: string;
  onChange: (tab: Tab) => void;
};

export function TabBar({ active, color, onChange }: Props) {
  return (
    <View style={globalStyles.tabRow}>
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <Pressable key={tab} onPress={() => onChange(tab)} hitSlop={8}>
            <Text style={isActive ? detailText.tabActive : detailText.tab}>{tab}</Text>
            {isActive && <View style={[styles.indicator, { backgroundColor: color }]} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -spacing.md - 1,
    height: 3,
    borderRadius: radius.chip,
  },
});