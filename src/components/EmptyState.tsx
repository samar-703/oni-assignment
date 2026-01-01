import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "../utils/colors";

export default function EmptyState() {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📋</Text>
      <Text style={[styles.title, { color: colors.text }]}>No records yet</Text>
      <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
        Start tracking fetal movements to see your records here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
