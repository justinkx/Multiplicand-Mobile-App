import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { general, colors } from '../../../Theme/Global';
import Header from '../SubCategories/Header';
import { ThemeContext } from '../../../Theme/ThemeProvider';
import { WebView } from 'react-native-webview';

const Content = ({ navigation, route }) => {
  const { title, url } = route.params;
  const { Theme } = useContext(ThemeContext);
  const themeValues = Theme.getTheme();
  const ActivityIndicatorLoadingView = () => {
    return (
      <ActivityIndicator
        color="#0000ff"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: themeValues.header }} />
      <SafeAreaView
        forceInset={{ top: 'always' }}
        style={[
          general.safeArea,
          {
            backgroundColor: 'white',
          },
        ]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={themeValues.header}
        />
        <Header
          navigation={navigation}
          themeValues={themeValues}
          title={title}
        />
        <View
          style={{
            flex: 1,
          }}>
          <ActivityIndicator
            color="#009688"
            size="small"
            style={styles.ActivityIndicatorStyle}
          />

          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            renderLoading={ActivityIndicatorLoadingView}
            startInLoadingState={true}
            style={{
              flex: 1,
            }}
            source={{ uri: url }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Content;

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
