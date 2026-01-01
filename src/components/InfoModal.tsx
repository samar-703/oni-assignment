import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

const INFO_POINTS = [
  "Find a comfortable position, either sitting or lying down on your side.",
  "Focus on your baby's movements. Kicks, rolls, and jabs all count as movements.",
  "Each time you feel a movement, tap the counter button.",
  "Continue counting until you reach 10 movements.",
  "Most babies will reach 10 movements within 30 minutes to 2 hours.",
  "If you notice a significant decrease in movement or don't feel 10 movements in 2 hours, contact your healthcare provider.",
  "Track daily, preferably at the same time each day when your baby is typically active.",
];

export default function InfoModal({ visible, onClose }: InfoModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <View style={styles.handle} />
              <Text style={styles.title}>How to track fetal movements</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {INFO_POINTS.map((point, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
  },
  safeArea: {
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 28,
    padding: 4,
  },
  closeText: {
    fontSize: 20,
    color: "#888",
  },
  content: {
    padding: 20,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 16,
    paddingRight: 16,
  },
  bullet: {
    fontSize: 16,
    color: "#E91E8C",
    marginRight: 12,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
});
