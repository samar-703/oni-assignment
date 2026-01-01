import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ArticleCard() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderEmoji}>🤰</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Article</Text>
        <Text style={styles.description} numberOfLines={2}>
          Importance of daily fetal movement counting in pregnancy
        </Text>
        <View style={styles.footer}>
          <Text style={styles.readTime}>5 min read</Text>
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
    backgroundColor: "#fff",
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
    backgroundColor: "#FFF0F5",
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
    color: "#E91E8C",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
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
    color: "#888",
  },
  bookmark: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 16,
  },
});
