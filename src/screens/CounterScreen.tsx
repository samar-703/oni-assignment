import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { saveSession, generateId } from "../storage/sessions";
import { formatTime } from "../utils/formatters";
import InfoModal from "../components/InfoModal";
import { useThemeColors } from "../utils/colors";

type CounterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Counter">;
};

export default function CounterScreen({ navigation }: CounterScreenProps) {
  const colors = useThemeColors();
  const isDark = useColorScheme() === "dark";
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  function handleStartStop() {
    setIsRunning((prev) => !prev);
  }

  async function handleSave() {
    if (seconds === 0) {
      Alert.alert("No data", "Please start tracking before saving.");
      return;
    }

    setIsRunning(false);

    await saveSession({
      id: generateId(),
      timestamp: new Date().toISOString(),
      durationSeconds: seconds,
    });

    navigation.goBack();
  }

  function handleBack() {
    if (seconds > 0) {
      Alert.alert(
        "Discard session?",
        "You have an unsaved tracking session. Are you sure you want to go back?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.surface}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={[styles.backText, { color: colors.text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Record DFM
          </Text>
          <TouchableOpacity
            onPress={() => setShowInfo(true)}
            style={styles.infoButton}
          >
            <Text style={[styles.infoText, { color: colors.text }]}>ⓘ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View
            style={[
              styles.instructionContainer,
              { backgroundColor: colors.surfaceSecondary },
            ]}
          >
            <Text style={[styles.instructionText, { color: colors.text }]}>
              Stop recording after{"\n"}10 kicks
            </Text>
          </View>

          <View style={styles.timerContainer}>
            <Text style={[styles.timer, { color: colors.text }]}>
              {formatTime(seconds)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  backgroundColor: isRunning
                    ? colors.buttonSecondary
                    : colors.accent,
                },
              ]}
              onPress={handleStartStop}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.controlButtonText,
                  {
                    color: isRunning
                      ? colors.buttonSecondaryText
                      : colors.accentText,
                  },
                ]}
              >
                {isRunning ? "Stop" : "Start"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor:
                    seconds === 0 ? colors.surfaceSecondary : colors.surface,
                  borderColor:
                    seconds === 0 ? colors.borderLight : colors.accent,
                },
              ]}
              onPress={handleSave}
              activeOpacity={0.8}
              disabled={seconds === 0}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  {
                    color: seconds === 0 ? colors.textDisabled : colors.accent,
                  },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>

            <Text style={[styles.helpLink, { color: colors.accent }]}>
              What if I am not getting{"\n"}enough kicks?
            </Text>
          </View>
        </View>

        <InfoModal visible={showInfo} onClose={() => setShowInfo(false)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  infoButton: {
    padding: 8,
    marginRight: -8,
  },
  infoText: {
    fontSize: 22,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  instructionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  timer: {
    fontSize: 72,
    fontWeight: "200",
    fontVariant: ["tabular-nums"],
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    marginTop: 70,
  },
  controlButton: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  helpLink: {
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 1,
    lineHeight: 20,
  },
});
