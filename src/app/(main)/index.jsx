import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeToggle } from "../../component/theme-toggle";
import { useEffect } from "react";
import { getAccessToken, removeAccessToken } from "../../lib/auth";
// import RunningText from "../../component/running-text";

export default function Main() {
  const handleLogout = async () => {
    await removeAccessToken();
    router.replace("/auth/login");
  };

  useEffect(() => {
    const getToken = async () => {
      const currentToken = await getAccessToken();
      console.log("token: ", currentToken);
    };

    getToken();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-gray-900 dark:text-white text-xl mb-4">
        Welcome to Main Page!
      </Text>

      <View className="items-center mt-4">
        <ThemeToggle />
        <TouchableOpacity
          className="mt-4 bg-red-500 px-6 py-3 rounded-xl"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
