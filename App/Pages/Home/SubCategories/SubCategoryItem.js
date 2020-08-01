import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { isPhoneOrTablet } from '../../../Utils/isTablet';

const SubCategoryItem = ({ subCategory, themeValues, navigation }) => {
  const { isTablet } = isPhoneOrTablet();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('ContentPage', {
          title: subCategory.topic,
          url: subCategory.url,
        })
      }
      style={[styles.container]}>
      <Image
        resize={'cover'}
        source={categoryIcons[Math.abs(Math.floor(Math.random() * 10) - 1)]}
        style={[
          styles.icon,
          {
            width: isTablet ? 50 : 40,
            height: isTablet ? 50 : 40,
          },
        ]}
      />
      <Text
        allowFontScaling={isTablet ? false : true}
        style={[
          styles.topic,
          {
            color: themeValues.color,
            fontSize: isTablet ? 18 : 15,
          },
        ]}>
        {subCategory.topic}
      </Text>
    </TouchableOpacity>
  );
};

export default SubCategoryItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  topic: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
});
export const categoryIcons = [
  require('../../../Assets/Images/subCategories/category1.png'),
  require('../../../Assets/Images/subCategories/category2.png'),
  require('../../../Assets/Images/subCategories/category3.png'),
  require('../../../Assets/Images/subCategories/category4.png'),
  require('../../../Assets/Images/subCategories/category5.png'),
  require('../../../Assets/Images/subCategories/category6.png'),
  require('../../../Assets/Images/subCategories/category7.png'),
  require('../../../Assets/Images/subCategories/category8.png'),
  require('../../../Assets/Images/subCategories/category9.png'),
  require('../../../Assets/Images/subCategories/category10.png'),
];
