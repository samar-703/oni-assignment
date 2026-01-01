import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DFMSession } from "../types";
import { formatDateForList, formatDurationMins } from "../utils/formatters";
import { useThemeColors } from "../utils/colors";

interface SessionItemProps {
  session: DFMSession;
}

export default function SessionItem({ session }: SessionItemProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <Text style={[styles.date, { color: colors.text }]}>
        {formatDateForList(session.timestamp)}
      </Text>
      <Text style={[styles.duration, { color: colors.textSecondary }]}>
        {formatDurationMins(session.durationSeconds)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  date: {
    fontSize: 15,
    fontWeight: "500",
  },
  duration: {
    fontSize: 15,
  },
});
