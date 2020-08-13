import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { animate } from '../Utils/Animation';
import LinearGradient from 'react-native-linear-gradient';
import { isPhoneOrTablet } from '../Utils/isTablet';

const DrawerItem = ({ category, themeValues, navigation }) => {
  const [open, setOpen] = useState(false);
  const { isTablet } = isPhoneOrTablet();

  function toggle() {
    animate();
    setOpen((prev) => !prev);
  }
  return (
    <TouchableOpacity style={[styles.container]} onPress={() => toggle()}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.lg]}
        colors={[themeValues.drawerItemLeft, themeValues.drawerItemRight]}>
        <Text
          allowFontScaling={isTablet ? false : true}
          style={[
            styles.category,
            { color: themeValues.color, fontSize: isTablet ? 20 : 13 },
          ]}>
          {category.name}
        </Text>
        {open && (
          <View style={[styles.subCategories]}>
            {category.subCategories.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ContentPage', {
                    title: item.topic,
                    url: item.url,
                  });
                }}
                style={[
                  styles.item,
                  {
                    paddingVertical: isTablet ? 10 : 5,
                  },
                ]}
                key={index}>
                <Text
                  allowFontScaling={isTablet ? false : true}
                  style={[
                    styles.topic,
                    {
                      color: themeValues.color,
                      fontSize: isTablet ? 17 : 13,
                      fontFamily: isTablet
                        ? 'Montserrat-SemiBold'
                        : 'Montserrat-Regular',
                    },
                  ]}>
                  {`${index + 1}. `}
                  {item.topic}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 25,
  },
  lg: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'flex-start',
  },
  subCategories: {
    paddingLeft: 5,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  item: {
    padding: 5,
  },
  category: {
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
  },
  topic: {
    opacity: 0.9,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
});
