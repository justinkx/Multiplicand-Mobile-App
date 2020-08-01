import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = 85;
const slideWidth = wp(88);
const itemHorizontalMargin = wp(0.5);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  lg: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: 15,
    borderRadius: entryBorderRadius,
    overflow: 'hidden',
  },
  slideInnerContainer: {
    flexDirection: 'row',
    height: slideHeight,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  textContainer: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  quote: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  slider: {
    marginLeft: itemHorizontalMargin * 3,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {},
});
