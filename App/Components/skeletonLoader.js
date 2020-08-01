import React, { PureComponent } from 'react';

import { View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

const defaultRows = 1;
const defaultColor = '#f2f2f2';
const defaultHighlightColor = '#c3c3c3';
const defaultCircleSize = 100;
const defaultSquareSize = 100;
const defaultRectangleHeight = 15;

export default class SkeletonLoader extends PureComponent {
  constructor() {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
    this.fadeOut = this.fadeOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
  }

  componentDidMount() {
    this.fadeIn();
  }
  componentWillUnmount() {
    Animated.timing(this.state.fadeAnim).stop();
  }
  fadeIn() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(this.fadeOut);
  }

  fadeOut() {
    this.setState({ fadeAnim: new Animated.Value(1) }, () => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0.1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(this.fadeIn);
    });
  }

  UNSAFE_componentWillReceiveProps(next) {
    if (!next.loading) {
      Animated.timing(this.state.fadeAnim).stop();
    }
  }
  render() {
    let { fadeAnim } = this.state;

    let {
      type,
      size,
      color,
      highlightColor,
      height,
      rows,
      loading,
      children,
      topRadius = 0,
      bottomRadius = 0
    } = this.props;

    if (type === 'square') {
      return (
        <Square
          fadeAnim={fadeAnim}
          loading={loading}
          topRadius={topRadius}
          bottomRadius={bottomRadius}
          children={children}
          color={color ? color : defaultColor}
          highlightColor={highlightColor ? highlightColor : defaultHighlightColor}
          size={size ? parseInt(size, 10) : defaultSquareSize}
        />
      );
    }

    if (type === 'circle') {
      return (
        <Circle
          fadeAnim={fadeAnim}
          loading={loading}
          topRadius={topRadius}
          children={children}
          color={color ? color : defaultColor}
          highlightColor={highlightColor ? highlightColor : defaultHighlightColor}
          size={size ? parseInt(size, 10) : defaultCircleSize}
        />
      );
    }

    if (type === 'rectangle') {
      let rowCount = defaultRows;

      if (rows > 0) {
        rowCount = parseInt(rows);
      }

      return (
        <Rectangle
          fadeAnim={fadeAnim}
          loading={loading}
          children={children}
          topRadius={topRadius}
          bottomRadius={bottomRadius}
          rows={rowCount}
          marginBottom={this.props.marginBottom}
          color={color ? color : defaultColor}
          highlightColor={highlightColor ? highlightColor : defaultHighlightColor}
          height={height ? parseInt(height, 10) : defaultRectangleHeight}
        />
      );
    }

    return null;
  }
}

const Square = props => {
  if (props.loading) {
    return (
      <View style={{ backgroundColor: props.color, height: props.size, width: props.size }}>
        <Animated.View style={{ opacity: props.fadeAnim }}>
          <View
            style={{ backgroundColor: props.highlightColor, height: props.size, width: props.size }}
          ></View>
        </Animated.View>
      </View>
    );
  }

  return props.children ? props.children : null;
};

const Rectangle = props => {
  if (props.loading) {
    let rectangles = [];

    for (let i = 0; i < props.rows; i++) {
      rectangles.push(
        <View
          key={i}
          style={{
            backgroundColor: props.color,
            borderTopLeftRadius: props.topRadius,
            borderTopRightRadius: props.topRadius,
            borderBottomLeftRadius: props.bottomRadius,
            borderBottomRightRadius: props.bottomRadius,
            marginLeft: props.marginLeft,
            marginBottom: props.marginBottom,
            width: '100%'
          }}
        >
          <Animated.View style={{ opacity: props.fadeAnim }}>
            <View
              style={{
                backgroundColor: props.highlightColor,
                borderTopLeftRadius: props.topRadius,
                borderTopRightRadius: props.topRadius,
                borderBottomLeftRadius: props.bottomRadius,
                borderBottomRightRadius: props.bottomRadius,
                height: props.height,
                width: '100%'
              }}
            ></View>
          </Animated.View>
        </View>
      );
    }
    return rectangles;
  } else {
    return props.children ? props.children : null;

  }

};

const Circle = props => {
  if (props.loading) {
    return (
      <View
        style={{
          backgroundColor: props.color,
          height: props.size,
          width: props.size,
          borderRadius: parseInt(props.size, 10) / 2
        }}
      >
        <Animated.View style={{ opacity: props.fadeAnim }}>
          <View
            style={{
              backgroundColor: props.highlightColor,
              height: props.size,
              width: props.size,
              borderRadius: parseInt(props.size, 10) / 2
            }}
          ></View>
        </Animated.View>
      </View>
    );
  } else {
    return props.children ? props.children : null;
  }
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(['rectangle', 'square', 'circle']).isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.any,
  marginLeft: PropTypes.number,
  marginBottom: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  highlightColor: PropTypes.string,
  rows: PropTypes.number,
  topRadius: PropTypes.number
};
