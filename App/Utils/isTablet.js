import React, { PixelRatio, Platform, Dimensions } from 'react-native';
const windowSize = Dimensions.get('window');
const pixelDensity = PixelRatio.get();
const width = windowSize.width;
const height = windowSize.height;
const adjustedWidth = width * pixelDensity;
const adjustedHeight = height * pixelDensity;

export const isPhoneOrTablet = () => {
  let isTablet = false;
  let isPhone = false;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    isTablet = true;
    isPhone = false;
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1824 || adjustedHeight >= 1824)
  ) {
    isTablet = true;
    isPhone = false;
  } else {
    isTablet = false;
    isPhone = true;
  }
  return {
    isTablet,
    isPhone,
  };
};
