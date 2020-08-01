import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../Pages/Home/HomePage";
import SolvePage from "../Pages/Solve/SolvePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Octicons";
import LinearGradient from "react-native-linear-gradient";
import Animated from "react-native-reanimated";
import DrawerScreen from "./Drawer";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { colors } from "../Theme/Global";
import { ThemeContext } from "../Theme/ThemeProvider";
import SideMenuSvg from "../Components/SVG/SideMenu";
import SubCategoryPage from "../Pages/Home/SubCategories/SubCategoryPage";
import Content from "../Pages/Home/TopicContent/Content";
import { TransitionPresets } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const screenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  gestureEnabled: true,
  gestureDirection: "horizontal",
};
function HomeStack({ navigation, route }) {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        options={screenOptions}
        name="HomePage"
        component={HomePage}
      />
      <Stack.Screen
        name="SubCategoryPage"
        options={screenOptions}
        component={SubCategoryPage}
      />
      <Stack.Screen
        options={screenOptions}
        name="ContentPage"
        component={Content}
      />
    </Stack.Navigator>
  );
}

function SolveStack({ navigation, route }) {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SolvePage" component={SolvePage} />
    </Stack.Navigator>
  );
}

function AppTab({}) {
  const { Theme } = useContext(ThemeContext);
  const themeValues = Theme.getTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: themeValues.backgroundColor,
        },
        activeTintColor: themeValues.color,
        inactiveTintColor: themeValues.navIcon,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        name="Solve"
        options={{
          tabBarLabel: "Solve",
          tabBarIcon: ({ color, size }) => (
            <Icon name="project" color={color} size={size} />
          ),
        }}
        component={SolveStack}
      />
    </Tab.Navigator>
  );
}

const Screens = ({ navigation, style, themeValues }) => {
  return (
    <Animated.View useNativeDriver={true} style={[styles.stack, style]}>
      <AppTab />
      <Stack.Screen name="ContentPage" component={Content} />
    </Animated.View>
  );
};

export function AppDrawer() {
  const { Theme } = useContext(ThemeContext);
  const themeValues = Theme.getTheme();
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
      colors={[themeValues.drawerGradientLeft, themeValues.drawerGradientRight]}
    >
      <SideMenuSvg style={{ flex: 1 }} />
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "white",
          inactiveTintColor: "white",
        }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerScreen {...props} />;
        }}
      >
        <Drawer.Screen name="Screens">
          {(props) => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    flexGrow: 1,
    overflow: "hidden",
  },
  drawerStyles: { flex: 1, width: "52%", backgroundColor: "transparent" },
});
