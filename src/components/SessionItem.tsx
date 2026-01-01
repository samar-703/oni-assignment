import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DFMSession } from "../types";
import { formatDate, formatDuration } from "../utils/formatters";

interface SessionItemProps {
  session: DFMSession;
}

export default function SessionItem({ session }: SessionItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>👶</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.date}>{formatDate(session.timestamp)}</Text>
        <Text style={styles.duration}>
          Time for 10 kicks: {formatDuration(session.durationSeconds)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
});
