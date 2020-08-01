import React, { memo, useCallback } from "react";
import Carousel from "react-native-snap-carousel";
import styles, {
  sliderWidth,
  itemWidth,
  slideHeight,
} from "./SliderEntryStyle";
import { View, TouchableOpacity, Image, Platform } from "react-native";
import { scrollInterpolators, animatedStyles } from "./animations";
import SkeletonLoader from "../skeletonLoader";
import { useNavigation } from "@react-navigation/native";

function CategoriesCard({ categories, backgroundColor, themeValues }) {
  const navigation = useNavigation();
  const press = useCallback(
    (item) => {
      navigation.push("SubCategoryPage", {
        category: item,
      });
    },
    [categories]
  );
  const _renderItem = useCallback(
    ({ item, index }) => {
      const { image, isConstant = false } = item;

      return (
        <RenderItem
          press={press}
          item={item}
          isConstant={isConstant}
          image={image}
        />
      );
    },
    [categories]
  );
  return (
    <>
      {Platform.OS === "ios" ? (
        <Carousel
          data={categories}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          scrollInterpolator={
            scrollInterpolators[
              `scrollInterpolator${themeValues.key === "Dark Mode" ? "2" : "1"}`
            ]
          }
          slideInterpolatedStyle={animatedStyles[`animatedStyles${"2"}`]}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={5}
          useScrollView={true}
          enableMomentum={true}

          //   autoplay={true}
          //   autoplayDelay={2000}
        />
      ) : (
        <Carousel
          data={categories}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          layout={themeValues.key === "Dark Mode" ? "stack" : "tinder"}
          layoutCardOffset={18}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
        />
      )}
    </>
  );
}
export default CategoriesCard = memo(CategoriesCard);
const RenderItem = memo(function RenderItem({
  isConstant,
  item,
  image,
  press,
}) {
  return (
    <TouchableOpacity
      onPress={() => press(item)}
      activeOpacity={0.8}
      style={[styles.slideInnerContainer]}
    >
      <View style={styles.shadow} />
      {isConstant ? (
        <SkeletonLoader
          height={slideHeight}
          type={"rectangle"}
          bottomRadius={10}
          topRadius={10}
          loading={true}
        />
      ) : (
        <Image
          source={{
            uri: image,
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
});
