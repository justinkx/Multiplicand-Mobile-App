import React, { memo } from 'react';
import Carousel from 'react-native-snap-carousel';
import styles, { sliderWidth, itemWidth } from './SliderEntry.style';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonLoader from '../skeletonLoader';
import { isPhoneOrTablet } from '../../Utils/isTablet';

function MathQuotesCard({ quotes, quoteCardEnd, quoteCardStart }) {
  const { isTablet } = isPhoneOrTablet();
  function _renderItem({ item, index }) {
    const { quote, image, isLoading = false } = item;

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.lg,
          {
            height: isTablet ? 150 : 85,
          },
        ]}
        colors={[quoteCardStart, quoteCardEnd]}>
        <View
          style={[
            styles.slideInnerContainer,
            {
              height: isTablet ? 150 : 85,
            },
          ]}>
          {isLoading ? (
            <SkeletonLoader size={40} type="circle" loading={true} />
          ) : (
            <Image
              source={{
                uri: image,
              }}
              style={{
                width: isTablet ? 80 : 40,
                height: isTablet ? 80 : 40,
                borderRadius: isTablet ? 40 : 20,
                resizeMode: 'cover',
              }}
            />
          )}

          <View style={[styles.textContainer]}>
            {isLoading ? (
              <>
                <SkeletonLoader
                  bottomRadius={3}
                  topRadius={3}
                  marginBottom={15}
                  height={10}
                  type="rectangle"
                  loading={true}
                />
                <SkeletonLoader
                  bottomRadius={3}
                  topRadius={3}
                  marginBottom={0}
                  height={10}
                  type="rectangle"
                  loading={true}
                />
              </>
            ) : (
              <Text
                allowFontScaling={isTablet ? false : true}
                style={[
                  styles.quote,
                  {
                    fontSize: isTablet ? 17 : 12,
                    fontFamily: isTablet
                      ? 'Montserrat-SemiBold'
                      : 'Montserrat-Regular',
                  },
                ]}
                numberOfLines={4}>
                {quote}
              </Text>
            )}
          </View>
        </View>
      </LinearGradient>
    );
  }
  return (
    <Carousel
      data={quotes}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      containerCustomStyle={styles.slider}
      contentContainerCustomStyle={styles.sliderContentContainer}
      layout={'default'}
      loop={true}
      useScrollView={true}
      autoplay={true}
      autoplayDelay={3000}
      autoplayInterval={5000}
      layoutCardOffset={15}
      activeAnimationType={'decay'}
      loopClonesPerSide={2}
    />
  );
}
export default MathQuotesCard = memo(MathQuotesCard);
