import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, DFMSession } from "../types";
import { getSessions } from "../storage/sessions";
import ArticleCard from "../components/ArticleCard";
import SessionItem from "../components/SessionItem";
import EmptyState from "../components/EmptyState";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [sessions, setSessions] = useState<DFMSession[]>([]);
  const [loading, setLoading] = useState(true);

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>DFM (Kick counter)</Text>
        </View>

        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SessionItem session={item} />}
          ListHeaderComponent={
            <>
              <ArticleCard />
              <TouchableOpacity
                style={styles.recordButton}
                onPress={handleStartTracking}
                activeOpacity={0.8}
              >
                <Text style={styles.recordButtonText}>
                  Record fetal movement
                </Text>
              </TouchableOpacity>
              {sessions.length > 0 && (
                <Text style={styles.sectionTitle}>Past records</Text>
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
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  listContent: {
    flexGrow: 1,
  },
  recordButton: {
    backgroundColor: "#E91E8C",
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  recordButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
});
