import React, {
  useState,
  useEffect,
  useContext,
  memo,
  useCallback,
} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from "../Theme/ThemeProvider";
import { animate } from "../Utils/Animation";
import MoonComponent from "./SVG/Moon";
import SunComponent from "./SVG/Sun";

function ToggleTheme({}) {
  const {
    Theme: { setTheme, getTheme },
    themeID,
  } = useContext(ThemeContext);
  const [isDark, setDark] = useState(themeID === "Dark Mode" ? true : false);

  useEffect(() => {
    setDark(themeID === "Dark Mode" ? true : false);
  }, [themeID]);

  return (
    <TouchableOpacity
      onPress={() => {
        animate();
        setTheme(themeID === "Dark Mode" ? "Light Mode" : "Dark Mode");
      }}
    >
      <View
        style={[
          styles.switch,
          {
            alignItems: isDark ? "flex-start" : "flex-end",
            backgroundColor: !isDark ? "white" : "black",
          },
        ]}
      >
        <View
          style={[
            styles.circle,
            {
              borderColor: themeID === "Dark Mode" ? "#310E68" : "#3a2850",
              borderWidth: 0.5,
            },
          ]}
        >
          {!isDark ? (
            <MoonComponent width={15} height={15} />
          ) : (
            <SunComponent width={15} height={15} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ToggleTheme = memo(ToggleTheme);

const styles = StyleSheet.create({
  switch: {
    width: 35,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  circle: {
    width: 20,
    height: 20,
    overflow: "hidden",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
