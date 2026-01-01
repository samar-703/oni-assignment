import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DFMSession } from "../types";
import { formatDateForList, formatDurationMins } from "../utils/formatters";

interface SessionItemProps {
  session: DFMSession;
}

export default function SessionItem({ session }: SessionItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDateForList(session.timestamp)}</Text>
      <Text style={styles.duration}>
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
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  date: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  duration: {
    fontSize: 15,
    color: "#666",
  },
});
