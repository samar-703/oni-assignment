import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  useColorScheme,
} from "react-native";
import { BlurView } from "expo-blur";
import { useThemeColors } from "../utils/colors";

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
  const colors = useThemeColors();
  const isDark = useColorScheme() === "dark";

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <BlurView
        intensity={15}
        tint={isDark ? "dark" : "light"}
        experimentalBlurMethod="dimezisBlurView"
        style={styles.blurContainer}
      >
        <View style={styles.overlay}>
          <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <Text style={[styles.icon, { color: colors.text }]}>☰</Text>
                <Text style={[styles.title, { color: colors.text }]}>
                  Steps to count fetal kicks
                </Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                style={[
                  styles.closeButton,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              >
                <Text
                  style={[styles.closeText, { color: colors.textSecondary }]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              {INFO_STEPS.map((step, index) => (
                <View
                  key={index}
                  style={[
                    styles.stepCard,
                    { backgroundColor: colors.surfaceSecondary },
                  ]}
                >
                  <Text style={[styles.stepNumber, { color: colors.text }]}>
                    {index + 1}.
                  </Text>
                  <Text style={[styles.stepText, { color: colors.text }]}>
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
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sheet: {
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
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  stepCard: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: "400",
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "700",
  },
});
