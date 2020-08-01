import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { isPhoneOrTablet } from '../../../Utils/isTablet';

const Header = ({ title = '', themeValues, navigation }) => {
  const { isTablet } = isPhoneOrTablet();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeValues.header,
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}>
        <Icon
          style={[
            styles.icon,
            {
              color: themeValues.color,
            },
          ]}
          name={'chevron-left'}
        />
      </TouchableOpacity>
      <Text
        allowFontScaling={isTablet ? false : true}
        style={[
          styles.title,
          {
            color: themeValues.color,
            fontSize: isTablet ? 22 : 18,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    paddingLeft: 20,
  },
  icon: {
    fontSize: 26,
  },
});
