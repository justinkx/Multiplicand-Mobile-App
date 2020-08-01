import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Header({
  height,
  alignItems,
  style,
  children,
  paddingVertical = 10,
  paddingLeft = 15,
  shadow = true
}) {
  return (
    <View
      style={[
        styles(height, alignItems, paddingVertical, paddingLeft).HeaderContainer,
        shadow && {
          shadowColor: '#000',
          shadowOffset: {
            width: 5,
            height: 5
          },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 2
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = (height = 56, alignItems = 'flex-start', paddingVertical = 10, paddingLeft = 16) =>
  StyleSheet.create({
    HeaderContainer: {
      backgroundColor: 'white',
      width: '100%',
      paddingVertical: paddingVertical,
      paddingRight: 16,
      paddingLeft: paddingLeft,
      flexDirection: 'row',
      minHeight: height,
      justifyContent: 'flex-start',
      alignItems: alignItems
    }
  });
