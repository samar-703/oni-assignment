import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

const INFO_STEPS = [
  {
    text: "Choose a ",
    bold: "time",
    rest: " when you are ",
    bold2: "least distracted",
    rest2: " or when you typically ",
    bold3: "feel the fetus move.",
  },
  {
    text: "Get ",
    bold: "comfortable.",
    rest: " Lie on your ",
    bold2: "left side",
    rest2: " or sit with your feet propped up.",
  },
  { text: "Place your ", bold: "hands on your belly." },
  { text: "", bold: "Start a timer", rest: " or watch the clock." },
  {
    text: "",
    bold: "Count",
    rest: " each kick. Keep counting until you get to ",
    bold2: "10 kicks / flutters / swishes/rolls.",
  },
  {
    text: "Once you reach ",
    bold: "10 kicks,",
    rest: " jot down how many ",
    bold2: "minutes",
    rest2: " it took.",
  },
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
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={styles.icon}>☰</Text>
              <Text style={styles.title}>Steps to count fetal kicks</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {INFO_STEPS.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>
                <Text style={styles.stepText}>
                  {step.text}
                  <Text style={styles.boldText}>{step.bold}</Text>
                  {step.rest}
                  {step.bold2 && (
                    <Text style={styles.boldText}>{step.bold2}</Text>
                  )}
                  {step.rest2}
                  {step.bold3 && (
                    <Text style={styles.boldText}>{step.bold3}</Text>
                  )}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sheet: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
    color: "#1a1a1a",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  stepCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 15,
    color: "#1a1a1a",
    fontWeight: "400",
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: "#1a1a1a",
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "700",
  },
});
