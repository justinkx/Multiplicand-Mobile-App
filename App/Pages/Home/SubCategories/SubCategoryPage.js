import React, { useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  StatusBar,
} from 'react-native';
import { general, colors } from '../../../Theme/Global';
import { ThemeContext } from '../../../Theme/ThemeProvider';
import Header from './Header';
import Mathematicians from '../../../Components/Mathematicians/Mathematicians';
import LinearGradient from 'react-native-linear-gradient';
import SubCategoryItem from './SubCategoryItem';
import { isPhoneOrTablet } from '../../../Utils/isTablet';

const PADDING_TOP = 186;

const SubCategoryPage = ({ navigation, route }) => {
  const { isTablet } = isPhoneOrTablet();
  const PADDING_TOP = isTablet ? 250 : 186;

  const { Theme } = useContext(ThemeContext);
  const { category } = route.params;
  const themeValues = Theme.getTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 186],
    outputRange: [PADDING_TOP, 56],
    extrapolate: 'clamp',
  });
  const borderRadus = scrollY.interpolate({
    inputRange: [0, 186],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: themeValues.header }} />
      <SafeAreaView
        forceInset={{ top: '' }}
        style={[
          general.safeArea,
          {
            backgroundColor: themeValues.backgroundColor,
          },
        ]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={themeValues.header}
        />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.lg]}
          colors={[themeValues.header, themeValues.backgroundColor]}>
          <Animated.View
            style={[
              styles.headerContainer,
              {
                height: animatedHeight,
                borderBottomLeftRadius: borderRadus,
                borderBottomRightRadius: borderRadus,
              },
            ]}>
            <Header
              navigation={navigation}
              themeValues={themeValues}
              title={category.name}
            />

            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.lg]}
              colors={[themeValues.header, themeValues.mathematicians]}>
              <Mathematicians
                quoteCardStart={themeValues.quoteCardStart}
                themeValues={themeValues}
                quoteCardEnd={themeValues.quoteCardEnd}
                mathematicians={category.mathematicians}
              />
            </LinearGradient>
          </Animated.View>

          <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  },
                },
              ],
              { useNativeDriver: false },
            )}
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: PADDING_TOP + 8,
            }}>
            {category.subCategories.map((subCategory, index) => (
              <SubCategoryItem
                navigation={navigation}
                themeValues={themeValues}
                subCategory={subCategory}
                key={index}
              />
            ))}
          </Animated.ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default SubCategoryPage;

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    zIndex: 1,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  themeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  lg: {
    flex: 1,
  },
});
