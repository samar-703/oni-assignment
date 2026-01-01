import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { saveSession, generateId } from "../storage/sessions";
import { formatTime } from "../utils/formatters";
import InfoModal from "../components/InfoModal";

type CounterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Counter">;
};

export default function CounterScreen({ navigation }: CounterScreenProps) {
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Record DFM</Text>
          <TouchableOpacity
            onPress={() => setShowInfo(true)}
            style={styles.infoButton}
          >
            <Text style={styles.infoText}>ⓘ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Stop recording after{"\n"}10 kicks
            </Text>
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{formatTime(seconds)}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                isRunning ? styles.stopButton : styles.startButton,
              ]}
              onPress={handleStartStop}
              activeOpacity={0.8}
            >
              <Text style={styles.controlButtonText}>
                {isRunning ? "Stop" : "Start"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                seconds === 0 && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              activeOpacity={0.8}
              disabled={seconds === 0}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  seconds === 0 && styles.saveButtonTextDisabled,
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backText: {
    fontSize: 24,
    color: "#1a1a1a",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  infoButton: {
    padding: 8,
    marginRight: -8,
  },
  infoText: {
    fontSize: 22,
    color: "#E91E8C",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  instructionContainer: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
    lineHeight: 26,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  timerLabel: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  timer: {
    fontSize: 72,
    fontWeight: "200",
    color: "#1a1a1a",
    fontVariant: ["tabular-nums"],
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    marginTop: 80,
  },
  controlButton: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#E91E8C",
  },
  stopButton: {
    backgroundColor: "#FF6B6B",
  },
  controlButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E91E8C",
  },
  saveButtonDisabled: {
    borderColor: "#ddd",
  },
  saveButtonText: {
    color: "#E91E8C",
    fontSize: 18,
    fontWeight: "600",
  },
  saveButtonTextDisabled: {
    color: "#ccc",
  },
});
