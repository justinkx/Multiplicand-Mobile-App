import { StyleSheet } from 'react-native';

export const colors = {
  theme: '#3a2850',
  homeCard: '#ff2d34'
};

export const general = StyleSheet.create({
  theme: {
    backgroundColor: colors.theme
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-start'
  }
});
