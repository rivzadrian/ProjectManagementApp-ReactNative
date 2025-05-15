import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "../../../global.css";
import { loadFonts } from "../../lib/font";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, TextInput } from "react-native";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSingIn = async () => {
    router.replace("/(main)")
  };

  const handleSignUp = () => {
    router.push("/auth/register")
  };

//   useEffect(() => {
//     async function prepare() {
//       try {
//         await loadFonts();
//       } catch (error) {
//         console.warn(e);ßß
//       }
//     }

//     prepare();
//   }, []);

  return (
    <View className="flex-1 px-6 justify-center">
      <Text className="text-3xl font-bold text-gray-900 mt-[67px] font-circular-bold w-64 mb-8">
        Glad to meet you again!
      </Text>
      <View className="space-y-4">
        <TextInput
          className="w-full h-14 mb-3 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
          placeholder="Your email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
        />
        <View className="flex-row items-center">
          <TextInput
            className="w-full h-14 mb-8 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 bottom-1/2"
          >
            {showPassword ? (
              <Ionicons name="eye-off" size={24} color="#9ca3af" />
            ) : (
              <Ionicons name="eye" size={24} color="#9ca3af" />
            )}
          </TouchableOpacity>
        </View>
        {error ? (
          <Text className="text-red-500 text-center mb-2">{error}</Text>
        ) : null}
        <TouchableOpacity
          className="w-full h-14 bg-emerald-900 rounded-xl items-center justify-center mb-4"
          onPress={handleSingIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-[16px]">
              Sign In now
            </Text>
          )}
        </TouchableOpacity>
        <Text className="text-center text-[14px] text-black opacity-20 mb-4">
          or
        </Text>
        <TouchableOpacity
          className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center"
          onPress={handleSignUp}
        >
          <Text className="text-white font-circular-book-italic text-[16px]">
            Sign Up Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}