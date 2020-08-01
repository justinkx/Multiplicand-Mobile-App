import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { isPhoneOrTablet } from '../../Utils/isTablet';
import { useNavigation } from '@react-navigation/native';

function Mathematicians({ mathematicians, themeValues }) {
  const navigation = useNavigation();
  const { isTablet } = isPhoneOrTablet();

  return (
    <ScrollView
      bouncesZoom
      alwaysBounceHorizontal
      decelerationRate={'fast'}
      contentContainerStyle={{ paddingLeft: 20 }}
      showsHorizontalScrollIndicator={false}
      horizontal={true}>
      {mathematicians.map((item, index) => (
        <View
          key={index}
          style={[
            _styles.avatarContainer,
            {
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
            },
          ]}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('ContentPage', {
                title: item.name,
                url: item.html,
              })
            }
            style={[
              _styles.avatar,
              {
                borderColor: getRandomColor(),
              },
            ]}>
            <Image
              resizeMode={'cover'}
              style={[
                _styles.image,
                {
                  width: isTablet ? 100 : 60,
                  height: isTablet ? 100 : 60,
                  borderRadius: isTablet ? 50 : 30,
                },
              ]}
              source={{ uri: item.image }}
            />
          </TouchableOpacity>
          <Text
            allowFontScaling={isTablet ? false : true}
            style={[
              _styles.name,
              {
                color: themeValues.color,
                fontSize: isTablet ? 13 : 10,
              },
            ]}
            numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
export default Mathematicians = memo(Mathematicians);
const _styles = StyleSheet.create({
  image: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  avatarContainer: {
    width: 100,
    height: 120,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  avatar: {
    width: 71,
    height: 71,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35.5,
    borderWidth: 2,
  },
  name: {
    fontSize: 10,
    paddingTop: 5,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});
export const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
