import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useThemeColors } from "../utils/colors";

export default function ArticleCard() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.imageContainer}>
        <View
          style={[
            styles.imagePlaceholder,
            { backgroundColor: colors.surfaceSecondary },
          ]}
        >
          <Text style={styles.placeholderEmoji}>🤰</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textSecondary }]}>
          Article
        </Text>
        <Text
          style={[styles.description, { color: colors.text }]}
          numberOfLines={2}
        >
          Importance of daily fetal movement counting in pregnancy
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.readTime, { color: colors.textTertiary }]}>
            5 min read
          </Text>
          <View style={styles.bookmark}>
            <Text style={styles.bookmarkIcon}>🔖</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderEmoji: {
    fontSize: 36,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    marginVertical: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  readTime: {
    fontSize: 12,
  },
  bookmark: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 16,
  },
});
