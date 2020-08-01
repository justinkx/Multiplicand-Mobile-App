import React from 'react';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const LineComponent = ({ width, height, startColor = '#AA5FFF', stopColor = '#F902B2' }) => (
  <Svg width={width} height={height} viewBox="0 0 500 8" fill="none">
    <Rect width={500} height={8} rx={3} fill="url(#paint0_linear)" />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1={-3.5282e-7}
        y1={3.733}
        x2={500}
        y2={3.73377}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={startColor} />
        <Stop offset={1} stopColor={stopColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default LineComponent;
