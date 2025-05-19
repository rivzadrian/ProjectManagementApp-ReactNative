import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import "../../../global.css";
import { loadFonts } from "../../lib/font";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, TextInput } from "react-native";
import { router } from "expo-router";
import api from "../../lib/api";
import Toast from 'react-native-toast-message';

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleRegister = async () => {
    if(!fullName || !email || !password) {
      setError("Please fill in the form")
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: 'Register Fail 👋'
      });
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await api.post("/api/auth/register", {
        "name": fullName,
        email,
        password
      })
      console.log("response register: ", response);
      router.back()
      Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'Register Success 👋'
      });
    } catch (error) {
      setError("Register error please try again")
      console.error("Register error: ", error);
    }finally{
      setLoading(false)
    }
  };

  const handleGoToLogin = () => {
    router.replace('/auth/login')
  };

  return (
    <KeyboardAvoidingView style= {{flex: 1}}
    behavior={Platform.OS === 'ios' ? "padding" : "height"}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-9 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-8 font-circular-bold w-64">
          Sign Up Now! and Starting to Work!
        </Text>
        <View className="space-y-4">
          <TextInput
            className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
          />

          <TextInput
            className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          <View className="flex-row items-center">
            <TextInput
              className="w-full h-14 mb-4 px-4 bg-gray-50 bg-opacity-10 rounded-xl text-base text-gray-900"
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
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
          <Text className="text-center text-gray-700 text-sm mb-1">
            By signing up you agree to our{" "}
            <Text className="font-bold">Term of Use</Text>
            <Text className="font-bold">Privacy Notice</Text>
          </Text>
          <TouchableOpacity
            className="w-full h-14 bg-amber-300 rounded-xl items-center justify-center mb-4
          mt-20"
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-[16px]">
              {loading ? "Registering..." : "Sign Up Now"}
            </Text>
          </TouchableOpacity>
          <Text className="text-center text-gray-800 mt-2">
            Already registered?{" "}
            <Text
              className="text-amber-400 font-semibold"
              onPress={handleGoToLogin}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
