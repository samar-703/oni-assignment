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

const INFO_STEPS = [
  "Choose a time when you are least distracted or when you typically feel the fetus move.",
  "Get comfortable. Lie on your left side or sit with your feet propped up.",
  "Place your hands on your belly.",
  "Start a timer or watch the clock.",
  "Count each kick. Keep counting until you get to 10 kicks / flutters / swishes/rolls.",
  "Once you reach 10 kicks, jot down how many minutes it took.",
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
              <Text style={styles.title}>Steps to count fetal kicks</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={true}
            >
              {INFO_STEPS.map((step, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>{index + 1}.</Text>
                  <Text style={styles.bulletText}>{step}</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 40,
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
