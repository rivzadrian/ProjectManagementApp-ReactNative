import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("system");
  const { setColorScheme } = useNativeColorScheme();

  // set initial theme when app loads
  useEffect(() => {
    const setInitialTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        const initialTheme = savedTheme || "system";
        setThemeState(initialTheme);

        //set the color scheme based on the initial theme
        if (initialTheme === "system") {
          const currentTheme = Appearance.getColorScheme();
          console.log("Initial system theme:", currentTheme);
          setColorScheme(currentTheme || "light");
        } else {
          setColorScheme(initialTheme);
        }
      } catch (error) {
        console.error("error loading theme:", error);
        //fallback to system theme if theres an error
        const currentTheme = Appearance.getColorScheme();
        setColorScheme(currentTheme || "light");
      }
    };
    setInitialTheme();
  }, []);

  const setTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
      setThemeState(newTheme);

      //set the actual color scheme based on the theme
      if (newTheme === "system") {
        const currentTheme = Appearance.getColorScheme();
        console.log("Setting system theme to:", currentTheme);
        setColorScheme(currentTheme || "light");
      } else {
        setColorScheme(newTheme);
      }
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  //listenm for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      console.log("System theme changed to:", colorScheme);
      if (theme === "system") {
        setColorScheme(colorScheme || "light");
      }
    });
    return () => {
      subscription.remove();
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("UseTheme must be used within a ThemeProvider");
  }
  return context;
};
