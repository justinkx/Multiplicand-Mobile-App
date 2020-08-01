import React from 'react';
import Svg, { Mask, Path, G, Image } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';

import { StyleSheet, View } from 'react-native';

const SideMenuSvg = props => {
  return (
    <View style={styles.container}>
      <Svg
        width={'100%'}
        height={'100%'}
        viewBox="0 0 530 820"
        fill="none"
        preserveAspectRatio="none"
        xmlSpace="preserve"
        {...props}
      >
        <Path
          d="M212.394 761.234c-19.596-8.964-27.84-48.555-27.84-48.555-14.441-43.32-182.526-8.96-182.526-8.96l-1.026 1.309v90.666c0 12.318 13.667 22.297 30.534 22.297h232.42c11.34-25.414-51.562-56.757-51.562-56.757zM497.351 0H248.804c7.67 2.52 50.056 18.09 56.765 55.99 0 0 12.643 46.328 99.05 33.974 78.474-11.22 100.456-10.977 124.354-12.572V23.165C528.971 10.37 514.81 0 497.351 0z"
          fill="#9E7CB8"
        />
        <Path
          d="M505 0H253.775c7.53 2.325 49.171 16.678 55.755 51.622 0 0 12.423 42.715 97.294 31.324 77.08-10.344 98.676-10.121 122.147-11.592V21.358C528.971 0 536.053 0 505 0zM206.82 763.899c-19.079-8.543-27.108-46.278-27.108-46.278-14.059-41.288-177.715-8.543-177.715-8.543L1 710.331v86.411C1 827-5 817.991 30.727 817.991H257.016c11.048-24.22-50.196-54.092-50.196-54.092z"
          fill="#A488BF"
        />
        <Path
          d="M529 622.513v-490.1l-.005.003s-131.254-23.493-246.316 59.267c0 0-64.253 37.376-80.691 42.715 0 0-116.556 56.598-64.255 136.688l36.611 48.589s42.587 38.977 56.036 91.303c0 0 6.725 107.856 52.299 142.561 0 0 96.383 91.838 210.698-11.212 0 0 15.947-13.736 35.623-19.814z"
          fill="#A383BC"
        />
      </Svg>
    </View>
  );
};

export default SideMenuSvg;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    aspectRatio: 1
  }
});
