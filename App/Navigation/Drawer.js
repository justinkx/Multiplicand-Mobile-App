import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../Theme/Global';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { ThemeContext } from '../Theme/ThemeProvider';
import SvgLogo from '../Components/SVG/Logo';
import ToggleTheme from '../Components/ToggleTheme';
import LineComponent from '../Components/SVG/Line';
import firestore from '@react-native-firebase/firestore';
import { Categories } from '../Utils/Constants';
import DrawerItem from './DrawerItem';
import { isPhoneOrTablet } from '../Utils/isTablet';

const DrawerScreen = (props) => {
  const {
    Theme: { setTheme, getTheme },
    themeID,
  } = useContext(ThemeContext);
  const { isTablet } = isPhoneOrTablet();
  const [isDark, setdark] = useState(themeID === 'Dark Mode' ? true : false);
  const categoriesCollection = firestore()
    .collection('Categories')
    .orderBy('id', 'asc');
  const [categories, setCategories] = useState(Categories);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const _categoriesSnapshot = await categoriesCollection.get();
    let _categories = [];
    _categoriesSnapshot.forEach((querySnapShot) => {
      _categories.push({ ...querySnapShot.data(), id: querySnapShot.id });
    });
    setCategories(_categories);
  };
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View style={[styles.header]}>
        <View style={[styles.logoContainer]}>
          <SvgLogo width={35} height={35} />
          <View style={[styles.titleContainer]}>
            <Text
              allowFontScaling={isTablet ? false : true}
              style={[
                styles.appName,
                {
                  color: getTheme().color,
                  fontSize: isTablet ? 24 : 18,
                },
              ]}>
              Multiplicant
            </Text>
            <LineComponent
              startColor={getTheme().color}
              width={'85%'}
              height={10}
            />
          </View>
        </View>
        <View style={[styles.themeContainer]}>
          <Text
            allowFontScaling={isTablet ? false : true}
            style={[
              styles.themeToggle,
              {
                color: getTheme().color,
                fontSize: isTablet ? 20 : 14,
              },
            ]}>
            Theme
          </Text>
          <ToggleTheme />
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={true}
        style={{
          flex: 1,
        }}
        showVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 50,
          paddingRight: 10,
        }}>
        {categories.map((category, index) => (
          <DrawerItem
            navigation={props.navigation}
            themeValues={getTheme()}
            key={index}
            category={category}
          />
        ))}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default DrawerScreen;
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 200,
    overflow: 'hidden',
    paddingLeft: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  titleContainer: {
    paddingLeft: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  appName: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  themeContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: '25%',
    justifyContent: 'space-between',
  },
  themeToggle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
});
