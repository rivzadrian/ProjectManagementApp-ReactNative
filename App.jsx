import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import { loadFonts } from "./font";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (error) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-slate-300">
      <Text
        className="bg-red-500 text-white font-circular-black-italic"
      >
        Supreme
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
