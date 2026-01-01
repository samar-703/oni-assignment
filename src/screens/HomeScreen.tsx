import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, DFMSession } from "../types";
import { getSessions } from "../storage/sessions";
import { useThemeColors } from "../utils/colors";
import ArticleCard from "../components/ArticleCard";
import SessionItem from "../components/SessionItem";
import EmptyState from "../components/EmptyState";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [sessions, setSessions] = useState<DFMSession[]>([]);
  const [loading, setLoading] = useState(true);
  const colors = useThemeColors();
  const isDark = useColorScheme() === "dark";

  useFocusEffect(
    useCallback(() => {
      loadSessions();
    }, [])
  );

  async function loadSessions() {
    setLoading(true);
    const data = await getSessions();
    setSessions(data);
    setLoading(false);
  }

  function handleStartTracking() {
    navigation.navigate("Counter");
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: colors.backgroundSecondary },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            DFM (Kick counter)
          </Text>
        </View>

        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SessionItem session={item} />}
          ListHeaderComponent={
            <>
              <ArticleCard />
              <TouchableOpacity
                style={[
                  styles.recordButton,
                  { backgroundColor: colors.accent },
                ]}
                onPress={handleStartTracking}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.recordButtonText,
                    { color: colors.accentText },
                  ]}
                >
                  Record fetal movement
                </Text>
              </TouchableOpacity>
              {sessions.length > 0 && (
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Past records
                </Text>
              )}
            </>
          }
          ListEmptyComponent={!loading ? <EmptyState /> : null}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  listContent: {
    flexGrow: 1,
  },
  recordButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
});
