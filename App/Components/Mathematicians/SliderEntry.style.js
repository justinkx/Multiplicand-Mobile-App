import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = 80;
const slideWidth = 80;
const itemHorizontalMargin = wp(4);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default StyleSheet.create({
  slideInnerContainer: {
    flexDirection: 'column',
    height: slideHeight,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    paddingTop: 5,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  year: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
  slider: {
    overflow: 'visible',
    // for custom animations
  },
  sliderContentContainer: {
    paddingHorizontal: 20,
  },
});
