import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  useWindowDimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../../Theme/ThemeProvider';
import firestore from '@react-native-firebase/firestore';
import MathQuotesCard from '../../Components/MathQuotes/MathQuotesCard';
import { general, colors } from '../../Theme/Global';
import CategoriesCard from '../../Components/Categories/CategoriesCard';
import { Categories, _Quotes } from '../../Utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { categoryIcons } from './SubCategories/SubCategoryItem';
import Icon from 'react-native-vector-icons/Octicons';
import { DrawerActions } from '@react-navigation/native';
import { isPhoneOrTablet } from '../../Utils/isTablet';

const PADDING_TOP = 165;
function HomePage({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const { isTablet } = isPhoneOrTablet();
  const { Theme } = useContext(ThemeContext);
  const quotesCollection = firestore().collection('HomeQuotes');
  const categoriesCollection = firestore()
    .collection('Categories')
    .orderBy('id', 'asc');
  const [quotes, setQuotes] = useState(_Quotes);
  const [categories, setCategories] = useState(Categories);
  const themeValues = Theme.getTheme();
  useEffect(() => {
    fecthQuotes();
  }, []);
  const fecthQuotes = async () => {
    const _quotesSnapshot = await quotesCollection.get();
    let _quotes = [];
    _quotesSnapshot.forEach((querySnapShot) => {
      _quotes.push({ ...querySnapShot.data(), id: querySnapShot.id });
    });
    setQuotes(_quotes);
    const _categoriesSnapshot = await categoriesCollection.get();
    let _categories = [];
    _categoriesSnapshot.forEach((querySnapShot) => {
      _categories.push({ ...querySnapShot.data(), id: querySnapShot.id });
    });
    setCategories(_categories);
  };
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedHeight = scrollY.interpolate({
    inputRange: [0, isTablet ? 150 : 85],
    outputRange: [isTablet ? PADDING_TOP + 65 : PADDING_TOP, 56],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView
      forceInset={{ top: 'always' }}
      style={[
        general.safeArea,
        {
          backgroundColor: themeValues.header,
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
            },
          ]}>
          <Animated.View
            style={[
              styles.header,
              {
                backgroundColor: themeValues.header,
              },
            ]}>
            <TouchableOpacity
              style={[styles.hamburgerMenu]}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Icon
                style={[
                  {
                    fontSize: 23,
                  },
                  {
                    color: themeValues.color,
                  },
                ]}
                name="three-bars"
              />
            </TouchableOpacity>
            <Animated.Text
              allowFontScaling={isTablet ? false : true}
              style={[
                styles.title,
                {
                  color: themeValues.color,
                  fontSize: isTablet ? 24 : 20,
                },
              ]}>
              Home
            </Animated.Text>
          </Animated.View>

          <MathQuotesCard
            quoteCardStart={themeValues.quoteCardStart}
            quoteCardEnd={themeValues.quoteCardEnd}
            quotes={quotes}
          />
        </Animated.View>

        <ScrollView
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
            paddingTop: isTablet ? PADDING_TOP + 65 : PADDING_TOP,
          }}>
          <Text
            allowFontScaling={isTablet ? false : true}
            style={[
              styles.categories,
              {
                color: themeValues.color,
                fontSize: isTablet ? 22 : 19,
              },
            ]}>
            Categories
          </Text>
          <CategoriesCard
            themeValues={themeValues}
            backgroundColor={themeValues.navIcon}
            categories={categories}
          />
          <Text
            style={[
              styles.categories,
              {
                color: themeValues.color,
                fontSize: isTablet ? 22 : 19,
              },
            ]}>
            Important Topics
          </Text>
          <View style={[styles.topicsContainer]}>
            {categories[0].subCategories &&
              categories.map((category, index) => (
                <View key={index} style={[styles.topicView]}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ContentPage', {
                        subCategory: category.subCategories[0],
                      });
                    }}
                    style={[styles.topicItem]}>
                    <View
                      style={[
                        styles.impTopic,
                        {
                          backgroundColor: themeValues.header,
                        },
                      ]}>
                      <Image
                        resize={'cover'}
                        style={[
                          styles.topicIcon,
                          {
                            width: isTablet ? 50 : 40,
                            height: isTablet ? 50 : 40,
                          },
                        ]}
                        source={categoryIcons[index]}
                      />
                    </View>

                    <Text
                      allowFontScaling={isTablet ? false : true}
                      style={[
                        styles.topicText,
                        {
                          color: themeValues.color,
                          fontSize: isTablet ? 18 : 14,
                          opacity: 1,
                        },
                      ]}>
                      {category.subCategories[0].topic}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default HomePage = React.memo(HomePage);

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    zIndex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  header: {
    height: 56,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  categories: {
    paddingHorizontal: 20,
    fontSize: 19,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    marginBottom: 30,
  },
  lg: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topicsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  topicView: {
    width: '45%',
    marginBottom: 25,
  },
  topicItem: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topicIcon: {
    width: 40,
    height: 40,
  },
  topicText: {
    marginTop: 8,
    fontFamily: 'Montserrat-Regular',
  },
  impTopic: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  hamburgerMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
