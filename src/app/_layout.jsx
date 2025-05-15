import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { loadFonts } from "../lib/font";

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (error) {
        console.error(error);
      }
    }
    prepare();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["bottom", "top"]}>
          <Stack    
            screenOptions={{
              headerShown: false,
              statusBarBackgroundColor: "#ffffff",
              statusBarStyle: "dark",
              contentStyle: {
                backgroundColor: "#F2F2F2",
              },
            }}
          >
            <StatusBar style="dark"/>
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}