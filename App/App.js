import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppDrawer } from './Navigation/Navigator';
import { ThemeContextProvider } from './Theme/ThemeProvider';
import { enableAnimation } from './Utils/Animation';
import SplashScreen from 'react-native-splash-screen';
import analytics from '@react-native-firebase/analytics';

const App = () => {
  const routeNameRef = useRef();
  const getActiveRouteName = (state) => {
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

  useEffect(() => {
    enableAnimation();
    SplashScreen.hide();
  }, []);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer
        onStateChange={(state) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);
          if (previousRouteName !== currentRouteName) {
            analytics().setCurrentScreen(currentRouteName, currentRouteName);
          }
          routeNameRef.current = currentRouteName;
        }}>
        <ThemeContextProvider>
          <AppDrawer />
        </ThemeContextProvider>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
